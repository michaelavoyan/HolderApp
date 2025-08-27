import {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {getOr} from 'lodash/fp';
import {useDispatch, useSelector} from 'react-redux';
import {isEmpty, isEqual, map} from 'lodash';
import {NavigationProp, useNavigation} from '@react-navigation/core';
import {VCLCredentialTypeSchema} from '@velocitycareerlabs/vcl-react-native';
import {DisclosureCredentialsToIssuerParams} from 'app/store/types/disclosure';
import {RootStackParamList} from 'app/navigation/StackParamsList';
import {
    ModalItemType,
    ModalSubTypes,
    ModalType,
    ModalTypes
} from '../../components/common/typings/types';
import {CredentialCategory} from '../../store/types/common';
import {CredentialsModalItems} from '../../constants/credentials';
import {VCLState} from '../../store/types/vcl';
import {credentialTypesSchemasByTypesSelector} from '../../store/selectors/vcl';
import {startKycSession} from '../../store/actions';
import {savedOriginalIssuingSessionSelector} from '../../store/selectors/disclosure';
import {
    NewSessionWorkflows,
    useClaimingMissingCredential
} from './useClaimingMissingCredential';

const ADD_SELF_REPORT_TITLE = 'Choose credential type';

export const useProfileModalOpenClose = () => {
    const [modal, setModal] = useState<ModalType>({type: ModalTypes.None});
    const [selectedCategory, setSelectedCategory] =
        useState<Partial<CredentialCategory>>();

    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const savedIssuingSession: null | DisclosureCredentialsToIssuerParams =
        useSelector(savedOriginalIssuingSessionSelector);

    const {startAnotherIssuing} = useClaimingMissingCredential();

    const credentialTypeSchemas: VCLState['credentialTypesSchemas'] =
        useSelector(
            credentialTypesSchemasByTypesSelector(
                getOr([], 'types', selectedCategory)
            ),
            (prev, next) => isEqual(prev, next)
        );

    const showPopupToStopPrevSession = useCallback(
        (onContinueCurrentProcess: () => void) => {
            if (savedIssuingSession) {
                startAnotherIssuing(
                    savedIssuingSession,
                    NewSessionWorkflows.claim,
                    onContinueCurrentProcess
                );
                return;
            }
            onContinueCurrentProcess();
        },
        [savedIssuingSession, startAnotherIssuing]
    );

    const onPressAddCredentialButton = useCallback(() => {
        setModal({
            type: ModalTypes.Menu,
            subType: ModalSubTypes.ProfilePage
        });
    }, [setModal]);

    const onCloseModal = useCallback(() => {
        setModal({type: ModalTypes.None});
        setSelectedCategory(undefined);
    }, [setModal]);

    // TODO: change type of title: string to CredentialsModalItems after Typescript 5 release
    const onSelectModalItem = useCallback(
        async (title: string) => {
            if (title === t(CredentialsModalItems.ClaimIssuer)) {
                navigation.navigate('Issuers', {});
            } else if (title === t(CredentialsModalItems.SelfReport)) {
                setModal({
                    type: ModalTypes.Categories,
                    title: t('Choose credential type')
                });
            } else if (title === t(CredentialsModalItems.Phone)) {
                showPopupToStopPrevSession(() => {
                    navigation.navigate('AddPhone');
                });
            } else if (title === (t(CredentialsModalItems.Email) as never)) {
                showPopupToStopPrevSession(() => {
                    navigation.navigate('AddEmail');
                });
            } else if (title === (t(CredentialsModalItems.Id) as never)) {
                showPopupToStopPrevSession(() => {
                    dispatch(startKycSession());
                });
            }
        },
        [dispatch, navigation, showPopupToStopPrevSession, t]
    );

    const onSelectCategoryItem = useCallback(
        (categoryItem: Partial<CredentialCategory>) => {
            setSelectedCategory(categoryItem);
        },
        []
    );

    const onSelectSelfReportItem = useCallback(
        (modalItems: ModalItemType[]) => {
            if (modalItems.length === 1) {
                modalItems[0].action();
                onCloseModal();
            } else {
                setModal({
                    type: ModalTypes.Menu,
                    subType: ModalSubTypes.SelfReport,
                    title: t(ADD_SELF_REPORT_TITLE),
                    items: modalItems.map((item) => ({
                        ...item,
                        action: () => {
                            item.action();
                            onCloseModal();
                        }
                    }))
                });
            }
        },
        [setModal, onCloseModal, t]
    );

    useEffect(() => {
        if (selectedCategory && !isEmpty(credentialTypeSchemas)) {
            onSelectSelfReportItem(
                map(
                    credentialTypeSchemas,
                    (item: VCLCredentialTypeSchema, key: string) => ({
                        title: getOr('', 'payload.title', item),
                        action: () =>
                            navigation.navigate('SelfReport', {
                                credentialTypeSchema: item,
                                credentialSchemaName: key
                            })
                    })
                )
            );
        }
    }, [
        navigation,
        onSelectSelfReportItem,
        selectedCategory,
        credentialTypeSchemas
    ]);

    return {
        onCloseCategoriesModal: onCloseModal,
        onAdd: onPressAddCredentialButton,
        onCategorySelect: onSelectCategoryItem,
        selectedCategory,
        modal,
        onSelectSelfReportItem,
        onModalItemSelect: onSelectModalItem
    };
};
