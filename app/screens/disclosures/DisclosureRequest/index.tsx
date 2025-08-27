import {StackScreenProps} from '@react-navigation/stack';
import React, {useState, useCallback, useMemo, useEffect} from 'react';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from 'react-native-elements';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {filter, getOr, isEmpty, isString, map} from 'lodash/fp';
import {noop} from 'lodash';

import {useSelector} from 'react-redux';
import {navigate} from 'app/navigation/utils';
import {useCasesErrorsMapItems} from 'app/utilities/error-handler/errorsMap';
import {HolderAppError} from 'app/utilities/error-handler/HolderAppError';
import {VclMixpanel} from 'app/mixpanel/VclMixpanel';
import {getCredentialsId} from 'app/mixpanel/utils';

import {useDisclosureSelectedCredentials} from 'app/utilities/hooks/useDisclosureSelectedCredentials';
import {useSaveInspection} from 'app/utilities/hooks/useSaveInspection';
import {inspectionSessionSelector} from 'app/store/selectors/disclosure';

import {DisclosureSubtype} from 'app/store/types/disclosure';
import {MoreButton} from 'app/components/common/MoreButton';
import EMoreButtonOptions from 'app/constants/moreButtonOptions';
import {
    PopupScreens,
    RootStackParamList
} from 'app/navigation/StackParamsList';
import {Info} from 'app/components/DisclosureRequest/Info';
import {Header} from 'app/components/DisclosureRequest/Header';
import {DisclosureTermsAndConditions} from 'app/components/common/DisclosureTermsAndConditions';
import {GenericButton} from 'app/components/common/GenericButton';

import {SharedCredentialsList} from 'app/components/PastDisclosures/SharedCredentialsList';
import {CredentialCategory} from 'app/store/types/common';

import {useDisclosureActions} from 'app/utilities/hooks/useDisclosureActions';
import {
    closePopup,
    openGenericPopup,
    openStatusPopup
} from 'app/utilities/popups';
import {usePrevious} from 'app/utilities/custom-hooks';

import {
    verificationServiceDeepLinkSelector,
    verificationServicePresentationLinkTemplateSelector
} from 'app/store/selectors/appConfig';
import {getPublicShareLink} from 'app/utilities/disclosure';
import {Instructions} from 'app/components/DisclosureRequest/Note';
import {errorHandlerPopup} from 'app/utilities/error-handler/errorHandlerPopup';
import {categoriesByTypesSelector} from 'app/store/selectors';
import {findCredentialType} from 'app/utilities/helpers';
import {StatusMessages} from '../../popups/type';
import i18n from '../../../i18n';
import {useDisclosurePresentationRequest} from './useDisclosurePresentationRequest';

const idTitle = (name: string, brandName: string) =>
    i18n.t('{{name}} would like you to share your credentials with them', {
        name: brandName || name
    });

const idSubTitle = (name: string, brandName: string) => {
    let message = i18n.t(
        'Please review the list of requested credentials and make sure you are OK with disclosing them to {{name}}.',
        {name: brandName || name}
    );

    if (brandName && brandName !== name) {
        message += `\n${i18n.t('{{brandName}} is a commercial name of {{name}}.', {brandName, name})}`;
    }
    return message;
};

const publicSharingTitleSingle = i18n.t(
    'CLICK THE DIFFERENT CATEGORIES TO SELECT THE ADDITIONAL CREDENTIALS YOU WISH TO SHARE.'
);
const publicSharingTitleMultiple = i18n.t(
    'CLICK THE DIFFERENT CATEGORIES TO SELECT THE CREDENTIALS YOU WISH TO SHARE.'
);
const sharingTitle = i18n.t('information you will be sharing:');

const NO_CREDENTIALS_POPUP = {
    title: i18n.t('No credentials to share'),
    description: i18n.t('Claim at least one credential before sharing')
};

type Props = StackScreenProps<RootStackParamList, 'DisclosureRequest'>;

export const DisclosureRequest: React.FC<Props> = ({
    route: {params},
    navigation
}) => {
    const {
        disclosureId,
        agentUrl: url,
        inspectorId,
        deepLink,
        credentialId
    } = params;

    const verificationServiceDeepLink = useSelector(
        verificationServiceDeepLinkSelector
    );
    const verificationServicePresentationLinkTemplate = useSelector(
        verificationServicePresentationLinkTemplateSelector
    );
    const isPublicSharingMode = verificationServiceDeepLink === deepLink;
    const isPublicSharingModeSingle = useMemo(() => {
        const routes = navigation.getState()?.routes;
        const prevRoute = routes[routes.length - 2];
        return prevRoute?.name !== 'Tabs';
    }, [navigation]);

    const {selectedCredentials, setSelectedCredentials} =
        useDisclosureSelectedCredentials();
    const {clearInspectionSession} = useSaveInspection();
    const [isCredentialsLoaded, setIsCredentialsLoaded] =
        useState<Boolean>(false);
    const [isTermsChecked, setTermsChecked] = useState(false);
    const {theme} = useTheme();
    const setTermsCheckedCallback = useCallback(
        () => setTermsChecked(!isTermsChecked),
        [isTermsChecked]
    );
    const insets = useSafeAreaInsets();
    const inspectionSession = useSelector(inspectionSessionSelector);

    const options = useMemo(() => {
        if (isPublicSharingMode) {
            return {disclosureSubType: DisclosureSubtype.public};
        }

        return {};
    }, [isPublicSharingMode]);

    const {
        loading,
        error: disclosurePresentationError,
        token,
        disclosure,
        credentials,
        exchangeId,
        disclosurePresentationRequest,
        clearError: clearDisclosurePresentationError
    } = useDisclosurePresentationRequest(url, inspectorId, deepLink, options);

    const {t} = useTranslation();

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', () => {
            clearInspectionSession();
        });

        return unsubscribe;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (credentialId && isPublicSharingModeSingle) {
            setSelectedCredentials(
                credentials.map((item) => ({
                    ...item,
                    checked: item.id === credentialId
                }))
            );
        } else if (isPublicSharingMode) {
            setSelectedCredentials(
                credentials.map((item) => ({...item, checked: true}))
            );
        } else {
            setSelectedCredentials(credentials);
        }
        setIsCredentialsLoaded(true);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [credentials.length]);

    const onUnSelectAll = useCallback(() => {
        setSelectedCredentials(
            selectedCredentials.map((item) => ({...item, checked: false}))
        );
    }, [selectedCredentials, setSelectedCredentials]);

    const onSelectAll = useCallback(() => {
        setSelectedCredentials(
            credentials.map((item) => ({...item, checked: true}))
        );
    }, [credentials, setSelectedCredentials]);

    const isAllCredentialsSelected = useCallback(() => {
        return selectedCredentials.every((item) => item.checked);
    }, [selectedCredentials]);

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

    const types = useMemo(() => {
        return map('type', disclosure.types);
    }, [disclosure.types]);

    const requestedCategories = useSelector((state: any) =>
        categoriesByTypesSelector(state, types)
    );

    const openCategory = useCallback(
        ({
            icon: type,
            types: categoryTypes,
            isIdentity
        }: CredentialCategory) => {
            navigation.navigate('SelectCredentialToShare', {
                type,
                types: categoryTypes,
                disableInfoPopup: true,
                disclosure,
                acceptNavigation: {
                    path: 'DisclosureRequest',
                    params
                },
                isIdentity
            });
        },
        [navigation, params, disclosure]
    );

    const isShareEnabled = useMemo(
        () => !isEmpty(filter('checked', selectedCredentials)),
        [selectedCredentials]
    );

    const onPublicShare = useCallback(
        (presentationExchangeId?: string, presentationId?: string) => {
            const {link, linkCode} = getPublicShareLink({
                iss: disclosurePresentationRequest?.iss,
                exchangeId: presentationExchangeId,
                presentationId,
                template: verificationServicePresentationLinkTemplate
            });

            VclMixpanel.trackSharedToProveBio({
                CredentialShared: getCredentialsId(
                    filter('checked', selectedCredentials)
                ),
                CredentialType: filter('checked', selectedCredentials).map(
                    (i) => i.type.join(',')
                ),
                LinkCode: linkCode,
            });

            navigation.navigate('ShareDisclosurePopup', {link, onClose: noop});
        },
        [
            disclosurePresentationRequest?.iss,
            verificationServicePresentationLinkTemplate,
            selectedCredentials,
            navigation
        ]
    );

    const {
        accept,
        decline,
        loading: actionsLoading,
        error: useDisclosureActionsError,
        clearError: clearDisclosureActionsError
    } = useDisclosureActions(
        (acceptedDisclosure) => {
            navigation.navigate<any>('DisclosuresTab');
            if (isPublicSharingMode) {
                onPublicShare(
                    acceptedDisclosure?.exchangeId,
                    acceptedDisclosure?.presentationId
                );
                return;
            }
            openStatusPopup({
                params: {
                    title: t('Credentials shared'),
                    text: t(
                        'Your credentials were successfully shared with the verifier'
                    ),
                    statusType: StatusMessages.Shared
                }
            });
        },
        () => navigation.navigate<any>('ProfileTab')
    );
    const prevLoading = usePrevious(loading || actionsLoading);

    const onCancel = useCallback(
        () => decline({url, token, disclosureId, inspectorId, exchangeId}),
        [decline, disclosureId, exchangeId, inspectorId, token, url]
    );

    const acceptRequest = useCallback(
        () =>
            accept({
                disclosure,
                credentials: filter('checked', selectedCredentials),
                presentationRequest: disclosurePresentationRequest!
            }),
        [accept, disclosure, disclosurePresentationRequest, selectedCredentials]
    );

    const onShare = useCallback(() => {
        const rejected = selectedCredentials.filter(
            ({checked}) => !checked
        ).length;

        if (rejected) {
            const selected = selectedCredentials.length - rejected;
            const total = selected + rejected;

            Alert.alert(
                t('Disclosure Confirmation'),
                t(
                    'You have selected to disclose {{selected}} credentials out of {{total}}. The credentials you have not selected will not be shared.',
                    {selected, total}
                ),
                [
                    {
                        text: t('Confirm'),
                        onPress: acceptRequest
                    },
                    {
                        text: t('Cancel'),
                        style: 'cancel'
                    }
                ]
            );
        } else {
            acceptRequest();
        }

        clearInspectionSession();
    }, [acceptRequest, selectedCredentials, t, clearInspectionSession]);

    const handleSelectAllinCategory = useCallback(
        (categoryTypes: string[]) => {
            setSelectedCredentials(
                selectedCredentials.map((item) => ({
                    ...item,
                    checked:
                        item.checked || categoryTypes.includes(findCredentialType(item.type) || '')
                }))
            );
        },
        [selectedCredentials, setSelectedCredentials]
    );

    useEffect(() => {
        if (loading || actionsLoading) {
            openGenericPopup({
                params: {
                    title: t('Processing'),
                    description: t('Please wait'),
                    showSpinner: true
                }
            });
        }
        if (prevLoading && !(loading || actionsLoading)) {
            closePopup(PopupScreens.GENERIC_POPUP);
        }
    }, [prevLoading, loading, actionsLoading, t]);

    const handleError = useCallback(
        async (err?: unknown) => {
            if (err) {
                if (isString(err)) {
                    navigation.navigate<any>('ProfileTab');
                } else {
                    const useCase =
                        err instanceof HolderAppError &&
                        err?.errorCode ===
                            'sdk_verified_profile_wrong_service_type'
                            ? useCasesErrorsMapItems.inspection
                            : useCasesErrorsMapItems.linkIssuingInspection;
                    setImmediate(() => {
                        errorHandlerPopup(
                            err,
                            null,
                            true,
                            () => {
                                navigate({name: 'ProfileTab'});
                            },
                            useCase
                        );
                    });
                }
            }
        },
        [navigation]
    );

    useEffect(() => {
        handleError(useDisclosureActionsError || disclosurePresentationError);
        if (useDisclosureActionsError) {
            clearDisclosureActionsError();
        }
        if (disclosurePresentationError) {
            clearDisclosurePresentationError();
        }
    }, [
        useDisclosureActionsError,
        handleError,
        disclosurePresentationError,
        clearDisclosureActionsError,
        clearDisclosurePresentationError
    ]);

    const onNoCredentialsPopupClose = useCallback(() => {
        navigate({name: 'ProfileTab'});
    }, []);

    useEffect(() => {
        if (
            isCredentialsLoaded &&
            !loading &&
            !actionsLoading &&
            selectedCredentials.length === 0 &&
            !inspectionSession
        ) {
            openGenericPopup({
                params: {
                    title: NO_CREDENTIALS_POPUP.title,
                    description: NO_CREDENTIALS_POPUP.description,
                    buttons: [
                        {
                            title: t('OK'),
                            onPress: onNoCredentialsPopupClose
                        }
                    ]
                }
            });
        }
    }, [
        actionsLoading,
        isCredentialsLoaded,
        loading,
        onNoCredentialsPopupClose,
        selectedCredentials,
        inspectionSession,
        t
    ]);

    return (
        <ScrollView
            contentContainerStyle={{paddingBottom: insets.bottom}}
            style={[
                styles.container,
                {
                    backgroundColor: theme.colors.secondaryBg
                }
            ]}>
            <View style={styles.header}>
                <Header
                    isPublicSharingMode={isPublicSharingMode}
                    isPublicSharingModeSingle={isPublicSharingModeSingle}
                    logo={
                        disclosure.organization.brandImage ||
                        disclosure.organization.logo
                    }
                    subTitle={idSubTitle(
                        disclosure.organization.name,
                        disclosure.organization.brandName
                    )}
                    title={t(
                        idTitle(
                            disclosure.organization.name,
                            disclosure.organization.brandName
                        )
                    )}
                />
            </View>
            <View style={styles.info}>
                <SharedCredentialsList
                    types={types as string[]}
                    credentials={selectedCredentials}
                    onPress={openCategory}
                    hideEmpty={isPublicSharingMode}
                    isPublicSharingMode={isPublicSharingMode}
                    title={
                        isPublicSharingMode
                            ? t(
                                  credentialId
                                      ? publicSharingTitleSingle
                                      : publicSharingTitleMultiple
                              )
                            : t(sharingTitle)
                    }
                    categories={requestedCategories}
                    handleSelectAllinCategory={handleSelectAllinCategory}
                />
                <Info disclosure={disclosure} />
                {!!disclosure.name && !isPublicSharingMode && (
                    <Instructions description={disclosure.name} />
                )}
                <View style={styles.footerContainer}>
                    <DisclosureTermsAndConditions
                        isPublicSharingMode={isPublicSharingMode}
                        checked={isTermsChecked}
                        onCheck={setTermsCheckedCallback}
                        link={getOr('', 'termsUrl', disclosure)}
                        text={t('I agree to Terms and Conditions')}
                    />
                </View>
            </View>
            <View style={styles.buttons}>
                <GenericButton
                    containerStyle={styles.leftButton}
                    type="secondary"
                    title={t('Cancel')}
                    onPress={onCancel}
                />
                <GenericButton
                    containerStyle={styles.rightButton}
                    type="primary"
                    title={t('Share')}
                    onPress={onShare}
                    disabled={!isShareEnabled || !isTermsChecked}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 5,
        paddingHorizontal: 24,
        paddingVertical: 20
    },
    header: {
        marginBottom: -50
    },
    footerContainer: {
        paddingTop: 22
    },
    info: {
        marginTop: 25
    },
    buttons: {
        flexDirection: 'row',
        marginBottom: 35,
        marginTop: 22
    },
    leftButton: {
        marginRight: 7
    },
    rightButton: {
        marginLeft: 7
    },
    infoPopupButton: {
        marginTop: 14,
        marginBottom: 11
    }
});
