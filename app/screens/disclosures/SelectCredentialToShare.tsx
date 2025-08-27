import {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {LayoutAnimation, StyleSheet, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {find, filter} from 'lodash/fp';

import {VCLCountry} from '@velocitycareerlabs/vcl-react-native';
import {ClaimCredentialWithCheckbox} from 'app/components/DisclosureRequest/types';
import {MoreButton} from 'app/components/common/MoreButton';
import EMoreButtonOptions from 'app/constants/moreButtonOptions';
import {startKycSession} from 'app/store/actions';
import {useCategoriesModalOpenClose} from 'app/utilities/hooks/useCategoriesModalOpenClose';
import {useNavigationCredentialsModal} from 'app/utilities/hooks/useNavigationCredentialsModal';
import {CredentialsModalItems} from 'app/constants/credentials';
import {CLAIM_MISSING_CREDENTIALS_MESSAGES} from 'app/utilities/hooks/useClaimingMissingCredential';
import {useDisclosureSelectedCredentials} from 'app/utilities/hooks/useDisclosureSelectedCredentials';

import {credentialsByCategory} from 'app/utilities/credential';
import {useSaveInspection} from 'app/utilities/hooks/useSaveInspection';

import {checkedCredentialsByTypeAndStatusSelector} from 'app/store/selectors/profile';
import {SharedCredentials} from 'app/store/types/disclosure';
import {
    countriesSelector,
    credentialCategoriesSelector,
    regionsSelector
} from 'app/store/selectors';
import {SelectCredentialToShareScreen} from 'app/components/SelectCredentialToShare';
import {GenericButton} from 'app/components/common/GenericButton';
import {isStartAddingCredentialsBtnVisible, VCL_ENVIRONMENT} from 'app/configs';
import {ModalType, ModalTypes} from '../../components/common/typings/types';
import {RootStackParamList} from '../../navigation/StackParamsList';
import {CountryCodes} from '../../store/types/auth';
import {CredentialCategories} from '../../store/types/common';
import {ClaimCredential, CredentialStatus} from '../../store/types/claim';
import {isIOS, normalize} from '../../utilities/helpers';

import {
    closePopup,
    openGenericPopup,
    openInfoPopup
} from '../../utilities/popups';
import i18n from '../../i18n';

export const INFO_POPUP = {
    title: i18n.t('Claim your credentials and power up your career!'),
    icon: 'claim-credentials'
};

type Props = StackScreenProps<RootStackParamList, 'SelectCredentialToShare'>;

export const SelectCredentialToShare: React.FC<Props> = ({
    route: {
        params: {
            type,
            isIdentity = false,
            disableInfoPopup,
            types,
            acceptNavigation
        },
        params
    },
    navigation
}) => {
    const {selectedCredentials: initialCredentials, setSelectedCredentials} =
        useDisclosureSelectedCredentials();

    const [credentials, setCredentials] = useState<
        ClaimCredentialWithCheckbox[]
    >(credentialsByCategory(initialCredentials, types) || []);
    const storedCredentials = useSelector(
        checkedCredentialsByTypeAndStatusSelector({
            types,
            statuses: [
                CredentialStatus.self,
                CredentialStatus.revoked,
                CredentialStatus.verified
            ]
        })
    );

    const [isAllowedToPressAddButton, setAllowedToPressAddButton] =
        useState(false);
    const [modal, setModal] = useState<ModalType>({type: ModalTypes.None});
    const [isEmptyPopupVisible, setEmptyPopupVisible] = useState(
        credentials && credentials.length === 0 && !disableInfoPopup
    );
    const [selectedItems, setSelectedItems] = useState<{[id: string]: boolean}>(
        {}
    );
    const checkedLength = useMemo(
        () => Object.values(selectedItems).filter((checked) => checked).length,
        [selectedItems]
    );

    const selectedInitialCredentialsLength = useMemo(
        () => initialCredentials.filter(({checked}) => checked).length,
        [initialCredentials]
    );

    useEffect(() => {
        if (selectedInitialCredentialsLength) {
            setAllowedToPressAddButton(true);
        }
    }, [selectedInitialCredentialsLength]);

    useEffect(() => {
        const newCredentials =
            credentialsByCategory(storedCredentials, types) || [];

        setCredentials((prev) => {
            return newCredentials.map((item) => {
                const credential = prev.find((cred) => cred.id === item.id);

                return credential || {...item, checked: true};
            });
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storedCredentials.length]);

    const countries: VCLCountry[] = useSelector(countriesSelector);
    const categories: CredentialCategories = useSelector(
        credentialCategoriesSelector
    );
    const regions: CountryCodes = useSelector(regionsSelector);
    const category = find(['icon', type], categories)!;
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const goToKYC = useCallback(() => dispatch(startKycSession()), [dispatch]);

    const {onOpenSelfReportTypes} = useCategoriesModalOpenClose({category});
    const {onModalItemNavigation} = useNavigationCredentialsModal({
        goToKYC,
        navigation,
        category,
        onOpenSelfReportTypes
    });

    const {clearInspectionSession, saveInspectionSession} = useSaveInspection();

    const onClose = useCallback(() => setModal({type: ModalTypes.None}), []);

    const saveSession = useCallback(() => {
        saveInspectionSession({...params, credentialType: category.title});
    }, [params, saveInspectionSession, category]);

    const onModalItemSelect = useCallback(
        async (title: CredentialsModalItems) => {
            setModal({type: ModalTypes.None});

            const titles = {
                [CredentialsModalItems.Email]: 'Email',
                [CredentialsModalItems.Phone]: 'Phone'
            };

            const message =
                CLAIM_MISSING_CREDENTIALS_MESSAGES.startVerification(
                    (titles[title as keyof typeof titles] as string) ||
                        category.title,
                    isIdentity
                );

            openGenericPopup({
                params: {
                    title: message.title,
                    description: message.subTitle,
                    buttonsDirection: 'row',
                    innerTextContainerStyle: {alignItems: 'center'},
                    buttons: [
                        {
                            closePopupOnPress: true,
                            title: i18n.t('OK'),
                            onPress: () => {
                                onClose();
                                saveSession();
                                setTimeout(() => {
                                    onModalItemNavigation(title);
                                }, 200);
                            }
                        },
                        {
                            closePopupOnPress: true,
                            title: i18n.t('Cancel')
                        }
                    ]
                }
            });
        },
        [onModalItemNavigation, onClose, category, isIdentity, saveSession]
    );

    const onCreate = useCallback(() => {
        if (isIdentity) {
            setModal({
                type: ModalTypes.Menu,
                subType: 'identity'
            });
        } else {
            onModalItemSelect(CredentialsModalItems.ClaimIssuer);
        }
    }, [isIdentity, onModalItemSelect]);

    const onStartAdding = useCallback(() => {
        setEmptyPopupVisible(false);
        closePopup();

        // waiting for popup animation
        setTimeout(() => {
            onCreate();
        }, 150);
    }, [onCreate]);

    const hidePopup = useCallback(
        () => setEmptyPopupVisible(false),
        [setEmptyPopupVisible]
    );

    useEffect(() => {
        if (isEmptyPopupVisible) {
            openInfoPopup({
                params: {
                    ...INFO_POPUP,
                    onClose: hidePopup,
                    closeOnBackdropPress: true,
                    children: (
                        isStartAddingCredentialsBtnVisible(VCL_ENVIRONMENT) ? <GenericButton
                            containerStyle={styles.claimButton}
                            width={normalize(isIOS ? 230 : 244)}
                            type="secondary"
                            title={t('Start adding credentials')}
                            onPress={onStartAdding}
                        /> : <Text> {t('Start adding credentials - scan a QR code')} </Text>
                    )
                }
            });
        }
    }, [isEmptyPopupVisible, hidePopup, onStartAdding, t]);

    useEffect(() => {
        if (isIOS) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        }
        setSelectedItems(
            credentials.reduce<{[id: string]: boolean}>(
                (acc, {id, checked}) => {
                    acc[id] = checked;

                    return acc;
                },
                {}
            )
        );
    }, [credentials]);

    const onSelectCallback = useCallback(() => {
        clearInspectionSession();

        setSelectedCredentials(
            initialCredentials.map((item) => ({
                ...item,
                checked:
                    selectedItems[item.id] === undefined
                        ? item.checked
                        : Boolean(selectedItems[item.id])
            }))
        );
        navigation.navigate('DisclosureRequest', acceptNavigation?.params);
    }, [
        initialCredentials,
        navigation,
        selectedItems,
        setSelectedCredentials,
        acceptNavigation,
        clearInspectionSession
    ]);

    const toggleItem = useCallback(
        (item: ClaimCredential) => {
            setSelectedItems({
                ...selectedItems,
                [item.id]: !selectedItems[item.id]
            });
        },
        [selectedItems]
    );

    const onSelectAll = useCallback(() => {
        setSelectedItems(
            credentials.reduce<{[id: string]: boolean}>((acc, {id}) => {
                acc[id] = true;

                return acc;
            }, {})
        );
    }, [credentials]);

    const onDelete = useCallback((id: string) => {
        const filteredCredentials = (prevCredentials: SharedCredentials[]) =>
            filter((credential) => credential.id !== id, prevCredentials);

        setCredentials(filteredCredentials);
    }, []);

    const onCredentialDetails = useCallback(
        (credential: ClaimCredentialWithCheckbox) =>
            navigation.navigate('CredentialDetails', {
                credential,
                onDelete
            }),
        [navigation, onDelete]
    );

    const isAllCredentialsSelected = useCallback(
        () => !Object.values(selectedItems).some((value) => value === false),
        [selectedItems]
    );

    const onUnSelectAll = useCallback(
        () =>
            setSelectedItems(
                credentials.reduce<{[id: string]: boolean}>((acc, {id}) => {
                    acc[id] = false;

                    return acc;
                }, {})
            ),
        [credentials]
    );

    useEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                isAllCredentialsSelected() ? (
                    <MoreButton
                        items={[EMoreButtonOptions.UNSELECT_ALL].map((i) =>
                            t(i)
                        )}
                        onSelect={onUnSelectAll}
                    />
                ) : (
                    <MoreButton
                        items={[EMoreButtonOptions.SELECT_ALL].map((i) => t(i))}
                        onSelect={onSelectAll}
                    />
                )
        });
    }, [isAllCredentialsSelected, navigation, onSelectAll, onUnSelectAll, t]);

    return (
        <SelectCredentialToShareScreen
            primaryTitle={
                isAllowedToPressAddButton && !checkedLength
                    ? t('Save')
                    : undefined
            }
            title={category.title}
            type={type}
            onCreate={onCreate}
            countries={countries}
            regions={regions}
            onCredentialDetails={onCredentialDetails}
            onModalItemSelect={onModalItemSelect}
            items={credentials}
            modal={modal}
            onClose={onClose}
            selectedItems={selectedItems}
            toggleItem={toggleItem}
            selectEnabled={isAllowedToPressAddButton || !!checkedLength}
            onPressPrimary={onSelectCallback}
            onCancel={navigation.goBack}
            isMissingCredentialsIssuingHidden // always hidden in Inspection flow
        />
    );
};

const styles = StyleSheet.create({
    claimButton: {
        marginTop: 14,
        marginBottom: 11
    }
});
