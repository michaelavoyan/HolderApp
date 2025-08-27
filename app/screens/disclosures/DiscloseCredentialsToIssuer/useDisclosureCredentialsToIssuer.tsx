import React, {useEffect, useState, useMemo, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {filter, includes, unionBy, capitalize} from 'lodash/fp';
import {BackHandler, View} from 'react-native';
import {t} from 'i18next';
import {StackNavigationProp} from '@react-navigation/stack';
import {BackButton} from 'app/components/common/BackButton';
import {RootStackParamList} from 'app/navigation/StackParamsList';
import {
    getDisclosureData,
    clearDisclosureData,
    setProgress,
    clearOriginalIssuingSession,
    generateOffers
} from 'app/store/actions';
import {setIsTempUserFirstIssuingSessionActiveAction} from 'app/store/actions/disclosure';
import {
    vfCredentialsSelector,
    progressSelector,
    vendorSelector
} from 'app/store/selectors';
import {
    disclosureDataSelector,
    savedOriginalIssuingSessionSelector
} from 'app/store/selectors/disclosure';
import {
    Vendor,
    ClaimCredentialWithCheckbox,
    ClaimCredential
} from 'app/store/types/claim';
import {
    DisclosureCredentialsToIssuerParams,
    DisclosureData
} from 'app/store/types/disclosure';
import {openStatusPopup} from 'app/utilities/popups';
import {useClaimingMissingCredential} from 'app/utilities/hooks/useClaimingMissingCredential';
import {ERRORS} from 'app/store/sagas/errors/profile';
import {clearIssuingSequence} from 'app/store/actions/common';
import {styles} from './styles';

interface RequestedCredentialNames {
    missingCredentials: Array<string>;
    notCheckedCredentials: Array<string>;
}

export const useDisclosureCredentialsToIssuer = (
    params: DisclosureCredentialsToIssuerParams,
    navigation: StackNavigationProp<
        RootStackParamList,
        'DisclosureCredentialsToIssuer',
        undefined
    >
) => {
    // State variables
    const [isTermsChecked, setTermsChecked] = useState(false);
    const [vendor, setVendor] = useState<Vendor | undefined>();

    // Destructuring the parameters
    const {
        did,
        service,
        issuer,
        acceptNavigation,
        deepLink,
        types,
        isMissingCredentialSession
    } = params;

    // Redux selectors and dispatch
    const vfCredentials = useSelector(vfCredentialsSelector);
    const [selectedCredentials, setCredentials] = useState<
        ClaimCredentialWithCheckbox[] | undefined
    >();
    const dispatch = useDispatch();
    const progress: number = useSelector(progressSelector);
    const vendorById = useSelector(vendorSelector(did));
    const currentVendor: Vendor = issuer ?? vendorById;
    const disclosureData: DisclosureData = useSelector(disclosureDataSelector);
    const savedIssuingSession: null | DisclosureCredentialsToIssuerParams =
        useSelector(savedOriginalIssuingSessionSelector);

    // Filter the selected credentials based on the requested input descriptors
    const requestedCredentialsToShare = useMemo(() => {
        const inputDescriptors = disclosureData.inputDescriptors.map(
            (item) => item.id
        );
        return selectedCredentials?.filter(
            (credential) =>
                credential.checked &&
                inputDescriptors.filter((type) =>
                    credential.type.includes(type)
                ).length
        );
    }, [disclosureData, selectedCredentials]);

    const {stopSecondaryIssuing, onClaimPress} =
        useClaimingMissingCredential(navigation);

    // Get the vendor credentials when the component mounts or when vfCredentials changes
    useEffect(() => {
        setCredentials(
            vfCredentials.map((cred: ClaimCredential) => ({
                ...cred,
                checked: true
            }))
        );
    }, [vfCredentials]);

    // Fetch disclosure data when the component mounts or when the dependencies change
    useEffect(() => {
        dispatch(getDisclosureData({service, deepLink, did}));
        return () => {
            dispatch(clearDisclosureData());
        };
    }, [deepLink, did, dispatch, service]);

    // Set the current vendor when it changes
    useEffect(() => {
        if (currentVendor) {
            setVendor(currentVendor);
        }
    }, [currentVendor]);

    // Callback function to set the progress value
    const setProgressCb = useCallback(
        (value: number) => dispatch(setProgress(value)),
        [dispatch]
    );

    // Check the progress value and navigate to the next screen if needed
    useEffect(() => {
        if (progress === 1 && vendor) {
            setProgressCb(0);
            setTimeout(
                () =>
                    navigation.navigate('AcceptOffers', {
                        issuerId: did,
                        acceptNavigation,
                        types
                    }),
                500
            );
        }
    }, [
        vendor,
        navigation,
        progress,
        did,
        setProgressCb,
        acceptNavigation,
        types
    ]);

    // Cancel or go back action when there's a saved issuing session
    const cancelOrBackActionInSavedIssuingSession = useCallback(() => {
        if (savedIssuingSession?.issuer?.id !== vendor?.id) {
            stopSecondaryIssuing(savedIssuingSession?.issuer?.name || '');
            return;
        }
        navigation.goBack();
        dispatch(clearOriginalIssuingSession());
    }, [
        dispatch,
        navigation,
        savedIssuingSession?.issuer?.id,
        savedIssuingSession?.issuer?.name,
        stopSecondaryIssuing,
        vendor?.id
    ]);

    // Callback function to complete the temporary user's first issuing session
    const completeTempUserFirstIssuingSession = useCallback(() => {
        dispatch(setIsTempUserFirstIssuingSessionActiveAction(false));
    }, [dispatch]);

    // Cancel action when the cancel button is pressed
    const onCancel = useCallback(() => {
        completeTempUserFirstIssuingSession();

        if (savedIssuingSession) {
            cancelOrBackActionInSavedIssuingSession();
            return;
        }
        dispatch(clearIssuingSequence());
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            navigation.reset({
                index: 0,
                routes: [
                    {
                        name: 'Tabs'
                    }
                ]
            });
        }
    }, [
        cancelOrBackActionInSavedIssuingSession,
        completeTempUserFirstIssuingSession,
        dispatch,
        navigation,
        savedIssuingSession
    ]);

    // Set the screen options and the header left button
    useEffect(() => {
        navigation.setOptions({
            title: 'Disclosure Request',
            headerLeft: () => (
                <View style={styles.backButton}>
                    <BackButton onPress={onCancel} />
                </View>
            )
        });
    }, [navigation, onCancel]);

    // Handle the hardware back button press
    useEffect(() => {
        const backAction = () => {
            completeTempUserFirstIssuingSession();
            if (savedIssuingSession) {
                cancelOrBackActionInSavedIssuingSession();
                return true;
            }
            return false;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, [
        cancelOrBackActionInSavedIssuingSession,
        completeTempUserFirstIssuingSession,
        dispatch,
        savedIssuingSession
    ]);

    // Add an item to the selected credentials
    const onAddItem = useCallback(
        ({
            id,
            name,
            isCredentialAvailable
        }: {
            id: string;
            name: string;
            isCredentialAvailable: boolean;
        }) => {
            if (!name) {
                return;
            }

            if (!isCredentialAvailable && !isMissingCredentialSession) {
                onClaimPress({
                    ...params,
                    issuer: vendor,
                    credentialType: {name, id, isInitialCredForType: true}
                });
                return;
            }

            const credentials = filter(
                (item) => includes(id, item.type),
                selectedCredentials
            );

            navigation.navigate<'DisclosureSelectCredentialToShare'>(
                'DisclosureSelectCredentialToShare',
                {
                    credentials,
                    onSelect: onSelectConfirm,
                    title: name,
                    issuingSessionParams: isMissingCredentialSession
                        ? undefined
                        : {
                              ...params,
                              issuer: vendor,
                              credentialType: {name, id}
                          }
                }
            );
        },
        [
            isMissingCredentialSession,
            navigation,
            onClaimPress,
            params,
            selectedCredentials,
            vendor
        ]
    );

    // Callback function to handle selecting credentials to share
    const onSelectConfirm = (creds: ClaimCredentialWithCheckbox[]) => {
        setCredentials((prevState?: ClaimCredentialWithCheckbox[]) =>
            unionBy('id', creds, prevState)
        );
    };

    // Callback function to generate offers
    const generateOffersCb = useCallback(
        (selectedCredentialsToShare: ClaimCredential[]) => {
            dispatch(
                generateOffers({
                    service,
                    selectedCredentials: selectedCredentialsToShare,
                    deepLink,
                    did,
                    types
                })
            );
        },
        [dispatch, service, deepLink, did, types]
    );

    // Share the selected credentials
    const onShare = () => {
        const requestedCredential: RequestedCredentialNames =
            disclosureData.inputDescriptors.reduce(
                (
                    acc: RequestedCredentialNames,
                    inputDescriptor: {id: string; name: string}
                ) => {
                    const idCredentialByType = filter(
                        (item: ClaimCredentialWithCheckbox) =>
                            includes(inputDescriptor.id, item.type),
                        selectedCredentials
                    );

                    if (!idCredentialByType.length) {
                        return {
                            ...acc,
                            missingCredentials: [
                                ...acc.missingCredentials,
                                inputDescriptor.name
                            ]
                        };
                    }

                    const checkedIdCredentialByType = filter(
                        'checked',
                        idCredentialByType
                    );

                    if (!checkedIdCredentialByType.length) {
                        return {
                            ...acc,
                            notCheckedCredentials: [
                                ...acc.notCheckedCredentials,
                                inputDescriptor.name
                            ]
                        };
                    }

                    return acc;
                },
                {missingCredentials: [], notCheckedCredentials: []}
            );

        const notCheckedCredentialsNumber =
            requestedCredential.notCheckedCredentials.length;

        if (notCheckedCredentialsNumber > 0) {
            openStatusPopup({
                params: {
                    ...ERRORS.missingExistingCredentials(
                        capitalize(
                            requestedCredential.notCheckedCredentials.join(', ')
                        ),
                        notCheckedCredentialsNumber > 1
                    ),
                    buttonTitle: t('Close')
                }
            });
            return;
        }

        const missingCredentialsNumber =
            requestedCredential.missingCredentials.length;

        if (missingCredentialsNumber > 0) {
            openStatusPopup({
                params: {
                    ...ERRORS.noExistingCredentials(
                        capitalize(
                            requestedCredential.missingCredentials.join(', ')
                        ),
                        missingCredentialsNumber > 1
                    ),
                    buttonTitle: t('Go to profile'),
                    onPress: () => navigation.navigate<any>('Profile')
                }
            });
            return;
        }

        if (
            savedIssuingSession &&
            savedIssuingSession?.issuer?.id === vendor?.id
        ) {
            dispatch(clearOriginalIssuingSession());
        }

        if (requestedCredentialsToShare) {
            generateOffersCb(requestedCredentialsToShare);
        }
    };

    return {
        isTermsChecked,
        setTermsChecked,
        vendor,
        selectedCredentials,
        disclosureData,
        onCancel,
        onAddItem,
        onShare
    };
};
