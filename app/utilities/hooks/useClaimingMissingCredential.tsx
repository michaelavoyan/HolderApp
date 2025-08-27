import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {useTheme} from 'react-native-elements';

import {RootStackParamList} from 'app/navigation/StackParamsList';
import {DisclosureCredentialsToIssuerParams} from 'app/store/types/disclosure';
import {
    startKycSession,
    clearOriginalIssuingSession,
    saveOriginalIssuingSession
} from '../../store/actions';
import i18n from '../../i18n';
import {openGenericPopup, openStatusPopup} from '../popups';
import {isIOS} from '../helpers';

import {StatusMessages} from '../../screens/popups/type';
import {identityTypesSelector} from '../../store/selectors';

export enum NewSessionWorkflows {
    claim = 'claim',
    share = 'share'
}

export const CLAIM_MISSING_CREDENTIALS_MESSAGES = {
    startVerification: (type: string, isIdType: boolean) => {
        const credentialName =
            ['Phone', 'Email'].includes(type) || !isIdType
                ? i18n.t(type.toLowerCase())
                : i18n.t('ID document');

        return {
            title: isIdType
                ? i18n.t(
                      'You are about to start the verification process of your {{credentialName}}',
                      {credentialName}
                  )
                : i18n.t(
                      'You are about to start the process for claiming a {{credentialName}} credential',
                      {credentialName}
                  ),
            subTitle: i18n.t('When completed, you will be redirected back here')
        };
    },
    returnToOriginalIssuingSession: (vendorName: string) => ({
        title: i18n.t('Done'),
        subTitle: i18n.t(
            'You will now go back to the process of claiming credentials from {{vendorName}}',
            {vendorName}
        )
    }),
    offerIsNotReady: (credentialType: string) => ({
        title: i18n.t('Done'),
        subTitle: i18n.t(
            "When the credential offer of your {{credentialType}} is ready, you'll get a notification with the next steps",
            {credentialType}
        )
    }),
    offerIsNotReadyForInspection: (credentialType: string) => ({
        title: i18n.t('Done'),
        subTitle: i18n.t(
            "When the credential offer of your {{credentialType}} is ready, you'll get a notification",
            {credentialType}
        )
    }),
    stopSecondaryIssuingSession: (vendorName: string) => ({
        title: i18n.t('Are you sure you want to quit?'),
        subTitle: i18n.t(
            'This will stop the process of claiming credentials from {{vendorName}}',
            {vendorName}
        )
    }),
    stoppedYotiSecondaryIssuingSession: (vendorName: string) => ({
        title: i18n.t('Verifying the ID document has stopped'),
        subTitle: i18n.t(
            'The process of claiming credentials from {{vendorName}} will stop as well',
            {vendorName}
        )
    }),
    stopSecondaryIssuingSessionByOfferReject: (vendorName: string) => ({
        title: i18n.t('Are you sure you want to reject the offer?'),
        subTitle: i18n.t(
            'This will stop the process of claiming credentials from {{vendorName}}',
            {vendorName}
        )
    }),
    newProcess: (vendorName: string, workflow: NewSessionWorkflows) => ({
        title: i18n.t(
            'You are currently in the process of claiming credentials from another issuer.'
        ),
        subTitle: i18n.t(
            'If you start a new process to {{workflow}} credentials, the process with {{vendorName}} will stop.',
            {vendorName, workflow}
        )
    }),
    newProcessSameIssuer: {
        title: i18n.t(
            'You are already in a process of claiming credentials from this issuer'
        ),
        subTitle: i18n.t(
            'Please wait until you receive a notification to continue'
        )
    },
    noOffersFound: (vendorName: string) => ({
        title: i18n.t('No offers found'),
        text: i18n.t(
            'The process of claiming credentials from {{vendorName}} has stopped.',
            {
                vendorName
            }
        ),
        statusType: StatusMessages.Error
    }),
    offerReady: (vendorName: string) => ({
        title: i18n.t('Your id document has been verified'),
        subTitle: i18n.t(
            "Once you accept the offer, you'll go back to the process of claiming credentials from {{vendorName}}",
            {
                vendorName
            }
        )
    }),
    offerReadyForInspection: (vendorName: string) => ({
        title: i18n.t('Your id document has been verified'),
        subTitle: i18n.t(
            "Once you accept the offer, you'll go back to the process of sharing credentials from {{vendorName}}",
            {
                vendorName
            }
        )
    })
};

export const useClaimingMissingCredential = (
    navigation?: StackNavigationProp<
        RootStackParamList,
        | 'DisclosureSelectCredentialToShare'
        | 'DisclosureCredentialsToIssuer'
        | 'CredentialDetails'
        | 'AddPhone'
        | 'AddEmail'
        | 'Issuers'
        | 'AcceptOffers',
        undefined
    >
) => {
    const {
        theme: {
            colors: {reject}
        }
    } = useTheme();
    const dispatch = useDispatch();
    const identityTypes: string[] = useSelector(identityTypesSelector);

    const onClaimPress = useCallback(
        (sessionParams: DisclosureCredentialsToIssuerParams) => {
            const {credentialType} = sessionParams;
            if (!credentialType) {
                return;
            }
            const isIdType = identityTypes.includes(credentialType.id);

            const startSessionCallback = () => {
                dispatch(saveOriginalIssuingSession(sessionParams));

                if (credentialType.name === 'Phone') {
                    navigation?.navigate('AddPhone');
                } else if (credentialType.name === 'Email') {
                    navigation?.navigate('AddEmail');
                } else if (isIdType) {
                    dispatch(startKycSession());
                } else {
                    navigation?.navigate('Issuers', {
                        isMissingCredentialSession: true
                    });
                }
            };

            const message = CLAIM_MISSING_CREDENTIALS_MESSAGES.startVerification(
                credentialType.name,
                isIdType
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
                            onPress: startSessionCallback
                        },
                        {
                            closePopupOnPress: true,
                            title: i18n.t('Cancel')
                        }
                    ]
                }
            });
        },
        [dispatch, identityTypes, navigation]
    );

    const startAnotherIssuing = useCallback(
        (
            sessionParams: DisclosureCredentialsToIssuerParams,
            workflow: NewSessionWorkflows,
            callbackOnStartANewSession: () => void
        ) => {
            const message = CLAIM_MISSING_CREDENTIALS_MESSAGES.newProcess(
                sessionParams?.issuer?.name || '',
                i18n.t(workflow) as NewSessionWorkflows
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
                            title: i18n.t('Start'),
                            onPress: () => {
                                dispatch(clearOriginalIssuingSession());
                                callbackOnStartANewSession();
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
        [dispatch]
    );

    const onSecondaryIssuingSuccess = useCallback(
        (
            sessionParams: DisclosureCredentialsToIssuerParams,
            callback?: () => void
        ) => {
            const returnToSessionCallback = () => {
                navigation?.navigate(
                    'DisclosureCredentialsToIssuer',
                    sessionParams
                );
                if (callback) {
                    callback();
                }
            };

            const message = CLAIM_MISSING_CREDENTIALS_MESSAGES.returnToOriginalIssuingSession(
                sessionParams.issuer?.name || ''
            );

            openStatusPopup({
                params: {
                    title: message.title,
                    text: message.subTitle,
                    onPress: returnToSessionCallback,
                    statusType: StatusMessages.Done
                }
            });
        },
        [navigation]
    );

    const stopSessionsCallback = useCallback(
        (callback?: () => void) => {
            dispatch(clearOriginalIssuingSession());
            if (callback) {
                callback();
            }
            navigation?.navigate<any>({name: 'ProfileTab'});
        },
        [dispatch, navigation]
    );

    const stopSecondaryIssuing = useCallback(
        (vendorName: string) => {
            const message = CLAIM_MISSING_CREDENTIALS_MESSAGES.stopSecondaryIssuingSession(
                vendorName
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
                            title: i18n.t('Quit'),
                            onPress: stopSessionsCallback,
                            textStyle: isIOS ? {color: reject} : undefined
                        },
                        {
                            closePopupOnPress: true,
                            title: i18n.t('Cancel')
                        }
                    ]
                }
            });
        },
        [reject, stopSessionsCallback]
    );

    const stopSecondaryIssuingSessionByOfferReject = useCallback(
        (vendorName: string, onQuit: () => void) => {
            const message = CLAIM_MISSING_CREDENTIALS_MESSAGES.stopSecondaryIssuingSessionByOfferReject(
                vendorName
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
                            title: i18n.t('Quit'),
                            onPress: () => stopSessionsCallback(onQuit),
                            textStyle: isIOS ? {color: reject} : undefined
                        },
                        {
                            closePopupOnPress: true,
                            title: i18n.t('Cancel')
                        }
                    ]
                }
            });
        },
        [reject, stopSessionsCallback]
    );

    return {
        onClaimPress,
        onSecondaryIssuingSuccess,
        stopSecondaryIssuing,
        stopSecondaryIssuingSessionByOfferReject,
        startAnotherIssuing
    };
};

export const startAnotherIssuingWithSameIssuer = () => {
    const message = CLAIM_MISSING_CREDENTIALS_MESSAGES.newProcessSameIssuer;
    openGenericPopup({
        params: {
            title: message.title,
            description: message.subTitle,
            innerTextContainerStyle: {alignItems: 'center'},
            buttons: [
                {
                    closePopupOnPress: true,
                    title: i18n.t('OK')
                }
            ]
        }
    });
};

export const offerWithMissedCredentialReceivedPopup = (
    vendorName: string,
    onPress: () => void,
    isInspection?: boolean
) => {
    const message = isInspection
        ? CLAIM_MISSING_CREDENTIALS_MESSAGES.offerReadyForInspection(vendorName)
        : CLAIM_MISSING_CREDENTIALS_MESSAGES.offerReady(vendorName);
    openGenericPopup({
        params: {
            title: message.title,
            description: message.subTitle,
            innerTextContainerStyle: {alignItems: 'center'},
            buttons: [
                {
                    closePopupOnPress: true,
                    title: i18n.t('OK'),
                    onPress
                }
            ]
        }
    });
};
