import {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback, useEffect, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {difference, filter, intersection, isEmpty, map} from 'lodash/fp';
import {noop} from 'lodash';
import {useNetInfo} from '@react-native-community/netinfo';

import {useTheme} from 'react-native-elements';

import i18n from 'app/i18n';
import {shareProcessStart} from 'app/utilities/sharingCredentials';
import {CredentialCategory} from 'app/store/types/common';
import {
    PopupScreens,
    RootStackParamList
} from '../../navigation/StackParamsList';
import {RootState} from '../../store/reducers';
import {
    AcceptedDisclosureRequestObject,
    DisclosureStatus,
    DisclosureSubtype
} from '../../store/types/disclosure';
import {
    credentialsByIdsSelector,
    disclosureByIdSelector,
    revokedCredentialsSelector
} from '../../store/selectors';
import {ClaimCredential} from '../../store/types/claim';
import {MoreButton} from '../../components/common/MoreButton';
import {
    closeGenericPopup,
    closePopup,
    openGenericPopup,
    openNoInternetPopupIfOffline,
    openStatusPopup,
    updateGenericPopup
} from '../../utilities/popups';
import {
    GenericPopupProps,
    StatusMessages,
    StatusPopupProps
} from '../popups/type';
import {updateDisclosure} from '../../storage/disclosure';
import {getDisclosures} from '../../store/actions';
import EMoreButtonOptions from '../../constants/moreButtonOptions';
import {
    configSelector,
    verificationServiceDeepLinkSelector,
    verificationServicePresentationLinkTemplateSelector
} from '../../store/selectors/appConfig';
import {
    getPublicShareLink
} from '../../utilities/disclosure';
import {vclLogger} from '../../utilities/logger';
import {DisclosureDetailsScreen} from '../../components/PastDisclosures/PastDisclosureDetails';
import {revokeSharedDisclosure} from '../../api/public-verification.service';
import {IConfig} from '../../store/types/appConfig';
import {useGetDisclosurePresentationRequest} from '../../utilities/hooks/useGetDisclosurePresentationRequest';
import {errorHandlerPopup} from '../../utilities/error-handler/errorHandlerPopup';

type Props = StackScreenProps<
    RootStackParamList,
    'PastDisclosureRequestDetails'
>;

const popupProps: GenericPopupProps = {
    title: i18n.t('Delete Disclosure'),
    description: i18n.t(
        'Are you sure you want to delete your disclosure? Your personal information will no longer be accessible via the link/QR code associated with this disclosure.'
    ),
    buttonsDirection: 'row'
};

const canNotSharePopupProps: StatusPopupProps = {
    title: i18n.t('You cannot share this disclosure again'),
    text: i18n.t('The credentials included in this disclosure were deleted'),
    statusType: StatusMessages.Error
};

const showCancelDisclosureError = () => {
    openGenericPopup({
        params: {
            title: i18n.t('Delete Disclosure'),
            description: i18n.t("Disclosure can't be deleted."),
            buttons: [
                {
                    title: i18n.t('Close'),
                    closePopupOnPress: true
                }
            ]
        }
    });
};

export const PastDisclosureRequestDetails: React.FC<Props> = ({
    route: {
        params: {disclosureId}
    },
    navigation
}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {isConnected} = useNetInfo();
    const verificationServiceDeepLink = useSelector(
        verificationServiceDeepLinkSelector
    );
    const verificationServicePresentationLinkTemplate = useSelector(
        verificationServicePresentationLinkTemplateSelector
    );
    const disclosure = useSelector<
        RootState,
        AcceptedDisclosureRequestObject | undefined
    >(disclosureByIdSelector(disclosureId!));
    const credentials = useSelector<RootState, ClaimCredential[]>(
        credentialsByIdsSelector(disclosure ? disclosure.credentialIds : [])
    );

    const getDisclosurePresentationRequest =
        useGetDisclosurePresentationRequest();

    const revocations: ClaimCredential[] = useSelector(
        revokedCredentialsSelector
    );

    const storedCredentials = useMemo(() => {
        if (!disclosure) {
            return [];
        }

        return credentials
            .filter(({id}) => disclosure.credentialIds.includes(id))
            .map((item) => ({...item, checked: true}));
    }, [credentials, disclosure]);

    const deletedCredentialsIds = useMemo(() => {
        if (!disclosure) {
            return {};
        }
        return difference(
            disclosure.credentialIds,
            map('id', storedCredentials)
        ).reduce<{[prop: string]: string}>(
            (acc, id) => ({...acc, [id]: id}),
            {}
        );
    }, [disclosure, storedCredentials]);

    const selectedCredentials = useMemo(() => {
        if (!disclosure) {
            return [];
        }
        return [
            ...storedCredentials, // active credentials
            ...disclosure.credentials // deleted credentials
                .filter(({id}) => deletedCredentialsIds[id])
                .map((item) => ({...item, checked: true}))
        ];
    }, [deletedCredentialsIds, disclosure, storedCredentials]);

    const config: IConfig = useSelector(configSelector);

    const sendRevokeRequest = useCallback(async () => {
        if (!disclosure) {
            return;
        }

        if (!disclosure.presentationId || !disclosure.exchangeId) {
            showCancelDisclosureError();

            return;
        }

        try {
            updateGenericPopup({
                params: {
                    ...popupProps,
                    showSpinner: true
                }
            });

            await revokeSharedDisclosure(
                config,
                disclosure.presentationId,
                disclosure.exchangeId
            );

            await updateDisclosure({
                id: disclosure.id,
                status: DisclosureStatus.revoked
            });

            dispatch(getDisclosures());

            closeGenericPopup();

            openStatusPopup({
                params: {
                    title: t('Done!'),
                    text: t(
                        'Your disclosure and the link/QR code associated with it have been deleted.'
                    ),
                    statusType: StatusMessages.Done,
                    onPress: () => navigation.goBack()
                }
            });
        } catch (e) {
            const isOfflinePopupVisible = await openNoInternetPopupIfOffline();

            if (isOfflinePopupVisible) {
                closeGenericPopup();
                return;
            }

            showCancelDisclosureError();
            vclLogger.error(e);
        }
    }, [config, disclosure, dispatch, navigation, t]);

    const onShare = useCallback(async () => {
        try {
            openGenericPopup({
                params: {
                    title: t('Processing'),
                    description: t('Please wait'),
                    showSpinner: true
                }
            });
            const disclosureResp = await getDisclosurePresentationRequest(
                verificationServiceDeepLink
            );

            closePopup(PopupScreens.GENERIC_POPUP);

            const disclosurePresentationRequest =
                disclosureResp?.presentationRequest;

            const {link} = getPublicShareLink({
                iss: disclosurePresentationRequest?.iss,
                exchangeId: disclosure?.exchangeId,
                presentationId: disclosure?.presentationId,
                template: verificationServicePresentationLinkTemplate
            });

            navigation.navigate('ShareDisclosurePopup', {
                link,
                onClose: noop
            });
        } catch (error) {
            closePopup(PopupScreens.GENERIC_POPUP);

            errorHandlerPopup(
                error,
                `Share disclosure - ${JSON.stringify(error)}`,
                true
            );
        }
    }, [
        disclosure?.exchangeId,
        disclosure?.presentationId,
        getDisclosurePresentationRequest,
        navigation,
        t,
        verificationServiceDeepLink,
        verificationServicePresentationLinkTemplate
    ]);

    const {theme} = useTheme();

    const handleDelete = useCallback(async () => {
        openGenericPopup({
            params: {
                ...popupProps,
                buttons: [
                    {
                        title: t('Cancel'),
                        closePopupOnPress: true
                    },
                    {
                        onPress: sendRevokeRequest,
                        title: t('Delete'),
                        textStyle: {color: theme.colors.error}
                    }
                ]
            }
        });
    },[sendRevokeRequest, t, theme.colors.error]);

    const onMoreMenuSelect = useCallback(
        (option: EMoreButtonOptions) => {
            if (option === EMoreButtonOptions.EDIT_PROFILE) {
                navigation.navigate('EditProfile');
            }

            if (option === EMoreButtonOptions.SHARE_DISCLOSURE) {
                const notDeletedCredentialsLength = selectedCredentials.filter(
                    (cred) => !deletedCredentialsIds[cred.id]
                ).length;
                const deletedCredentialsLength =
                    selectedCredentials.length - notDeletedCredentialsLength;
                const revokedCredentials = revocations.filter((revocation) => {
                    return selectedCredentials.some(
                        (credential) => credential.id === revocation.id
                    );
                }).length;
                if (notDeletedCredentialsLength === 0) {
                    openStatusPopup({
                        params: canNotSharePopupProps
                    });
                } else if (!!deletedCredentialsLength || !!revokedCredentials) {
                    shareProcessStart(verificationServiceDeepLink, navigation);
                } else {
                    onShare();
                }
            }

            if (option === EMoreButtonOptions.DELETE_DISCLOSURE) {
                handleDelete()
            }
        },
        [navigation, selectedCredentials, revocations, deletedCredentialsIds, verificationServiceDeepLink, onShare, handleDelete]
    );

    const isDisclosureInactive = disclosure?.status === DisclosureStatus.revoked;

    useEffect(() => {
        if (disclosure?.subType === DisclosureSubtype.public) {
            navigation.setOptions({
                headerRight: () => (
                    <MoreButton
                        items={
                            isConnected && !isDisclosureInactive
                                ? [
                                      EMoreButtonOptions.DELETE_DISCLOSURE,
                                      EMoreButtonOptions.SHARE_DISCLOSURE
                                  ]
                                : [EMoreButtonOptions.EDIT_PROFILE]
                        }
                        onSelect={onMoreMenuSelect as (item: string) => void}
                        destructiveButtonIndex={
                            isDisclosureInactive ? undefined : 1
                        }
                    />
                )
            });
        }
    }, [
        disclosure,
        isConnected,
        isDisclosureInactive,
        navigation,
        onMoreMenuSelect
    ]);

    useEffect(() => {
        if (!disclosure) {
            dispatch(getDisclosures());
        }
    }, [disclosure, dispatch, disclosureId]);

    const openCategory = useCallback(
        ({types: categoryTypes, icon: type}: CredentialCategory) => {
            navigation.navigate('PastDisclosureRequestCredentials', {
                type,
                credentials: filter(
                    (item) => !isEmpty(intersection(categoryTypes, item.type)),
                    selectedCredentials
                ),
                deletedCredentials: deletedCredentialsIds,
                disclosureSubtype: disclosure?.subType
            });
        },
        [deletedCredentialsIds, disclosure, navigation, selectedCredentials]
    );

    return (
        <DisclosureDetailsScreen
            disclosure={disclosure}
            credentials={selectedCredentials}
            openCategory={openCategory}
            onDelete={handleDelete}
        />
    );
};
