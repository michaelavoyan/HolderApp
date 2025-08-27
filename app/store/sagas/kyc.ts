import {call, put, select, takeEvery} from 'redux-saga/effects';
import {isEmpty} from 'lodash/fp';
// @ts-ignore
import RNYotiDocScan from '@getyoti/yoti-doc-scan-react-native';
import {
    VCLCredentialManifest,
    VCLCredentialManifestDescriptorByService,
    VCLDidJwk,
    VCLError,
    VCLIssuingType,
    VCLOffers
} from '@velocitycareerlabs/vcl-react-native';
import {startSession} from 'app/api/auth.service';

import {errorHandlerPopup} from 'app/utilities/error-handler/errorHandlerPopup';
import {HolderAppError} from 'app/utilities/error-handler/HolderAppError';
import {throwVCLError} from 'app/utilities/error-handler/utils';

import {vclLogger} from 'app/utilities/logger';

import {getAccessToken, runWithAccessToken} from 'app/api/api';
import {getOauthTokens} from 'app/storage/oauth';
import * as actionTypes from '../actionTypes/kyc';
import * as actions from '../actions';
import {pushTokenEffect} from './push';
import {ERRORS} from './errors/kyc';
import {issuerByDid} from '../../utilities/issuer';
import {Vendor} from '../types/claim';
import {setRegenerateOffersData} from '../../storage/asyncStorage';
import {YotiSessionData, YotiStartSessionResponse} from '../types/kyc';
import {navigate, navigator} from '../../navigation/utils';
import {
    closePopup,
    openGenericPopup,
    openNoInternetPopupIfOffline,
    openStatusPopup,
    updateStatusPopup
} from '../../utilities/popups';
import {StatusMessages} from '../../screens/popups/type';
import {
    configSelector,
    idVerifierDidSelector,
    pushUrlSelector,
    yotiNewSessionUrlSelector
} from '../selectors';
import i18n from '../../i18n';
import {PopupScreens} from '../../navigation/StackParamsList';
import {
    inspectionSessionSelector,
    savedOriginalIssuingSessionSelector
} from '../selectors/disclosure';
import {CLAIM_MISSING_CREDENTIALS_MESSAGES} from '../../utilities/hooks/useClaimingMissingCredential';
import {checkVCLError} from './errors/helpers';
import {
    DisclosureCredentialsToIssuerParams,
    SelectCredentialToShareParams
} from '../types/disclosure';
import {IConfig} from '../types/appConfig';
import {VclReactNativeSdkWrapper} from '../../api/vcl-react-native-sdk-wrapper';

export const KYC_SESSION_COUNTRY_CODE = 'USA';

export const IDENTITY_TYPES = [
    'DriversLicenseV1.0',
    'NationalIdCardV1.0',
    'PassportV1.0',
    'ProofOfAgeV1.0',
    'ResidentPermitV1.0',
    'IdDocumentV1.0',
];

type YotiResult = {
    code: number;
    description: string;
    success: boolean;
};

export const handleStartSessionErrors = (e: unknown) => {
    if (e instanceof HolderAppError) {
        closePopup();
        errorHandlerPopup(e);
        return;
    }

    if (e instanceof VCLError) {
        closePopup();
        checkVCLError(e, '', '', VCLIssuingType.Identity);
    } else {
        errorHandlerPopup(
            new HolderAppError({
                errorCode: 'default_kyc_error'
            })
        );
    }
};

function* getCredentialManifest(
    config: IConfig,
    vendor: Vendor,
    pushToken: string,
    pushUrl: string,
    didJwk: VCLDidJwk,
    accessToken: string
) {
    const credentialManifestDescriptor: VCLCredentialManifestDescriptorByService =
        {
            service: vendor.service,
            issuingType: VCLIssuingType.Identity,
            credentialTypes: IDENTITY_TYPES,
            pushDelegate: {
                pushToken,
                pushUrl
            },
            didJwk,
            did: config.idVerifierDid,
            remoteCryptoServicesToken: {value: accessToken}
        };

    const credentialManifest: VCLCredentialManifest =
        yield runWithAccessToken(
            config,
            VclReactNativeSdkWrapper.getCredentialManifest,
            credentialManifestDescriptor,
            true // Sentry log
        );
    return credentialManifest;
}

function* generateOffers(
    config: IConfig,
    credentialManifest: VCLCredentialManifest,
    sessionData: YotiSessionData,
    didJwk: VCLDidJwk,
) {
    const offers: VCLOffers = yield runWithAccessToken(
        config,
        VclReactNativeSdkWrapper.generateOffers,
        {
            credentialManifest,
            types: IDENTITY_TYPES,
            identificationVerifiableCredentials: [
                {
                    inputDescriptor: IDENTITY_TYPES[0],
                    jwtVc: sessionData.verificationIdentifier
                }
            ],
            offerHashes: []
        },
        didJwk
    );
    return offers;
}

const startYotiAsync = (sessionData: YotiSessionData): Promise<YotiResult> => {
    return new Promise((resolve, reject) => {
        try {
            RNYotiDocScan.start(
                sessionData.sessionId,
                sessionData.sessionToken,
                (code: number, description: string) => {
                    resolve({
                        code,
                        description,
                        success: code === 0,
                    });
                });
        } catch (err) {
            reject(err);
        }
    });
}

export function* startYoti(
    sessionData: YotiSessionData
): Generator<ReturnType<typeof call>, YotiResult, YotiResult> {
    return yield call(startYotiAsync, sessionData);
}

function* onYotiSuccess (
    sessionData: YotiSessionData,
    credentialManifest: VCLCredentialManifest,
    offers: VCLOffers,
    savedIssuingSession: null | DisclosureCredentialsToIssuerParams,
    savedInspectionSession: null | SelectCredentialToShareParams
) {
    yield setRegenerateOffersData([
        {
            verificationIdentifier:
            sessionData.verificationIdentifier,
            credentialManifest,
            vclToken: offers.sessionToken
        }
    ]);

    if (savedIssuingSession) {
        const message =
            CLAIM_MISSING_CREDENTIALS_MESSAGES.offerIsNotReady(
                savedIssuingSession.credentialType?.name?.toLowerCase() ||
                ''
            );
        openStatusPopup({
            params: {
                title: message.title,
                text: message.subTitle,
                statusType: StatusMessages.Success,
                onPress: () => {
                    navigate({name: 'ProfileTab'});
                }
            }
        });

        return;
    }

    if (savedInspectionSession) {
        const message =
            CLAIM_MISSING_CREDENTIALS_MESSAGES.offerIsNotReadyForInspection(
                savedInspectionSession.credentialType?.toLowerCase() ||
                ''
            );

        openStatusPopup({
            params: {
                title: message.title,
                text: message.subTitle,
                statusType: StatusMessages.Success
            }
        });

        return;
    }

    openStatusPopup({
        params: {
            title: i18n.t('A credential offer is being processed'),
            text: i18n.t(
                'You will be notified once offers are available.'
            ),
            statusType: StatusMessages.Success
        }
    });
}

function* onYotiError (
    errorCode: number,
    savedIssuingSession: any
) {
    const isOfflinePopupVisible: boolean =
        yield openNoInternetPopupIfOffline({
            onPress: navigator.goBack
        });

    if (isOfflinePopupVisible) {
        return;
    }

    if (errorCode === 1000) {
        if (savedIssuingSession) {
            yield put(actions.clearOriginalIssuingSession());
            const message =
                CLAIM_MISSING_CREDENTIALS_MESSAGES.stoppedYotiSecondaryIssuingSession(
                    savedIssuingSession?.issuer?.name || ''
                );

            openGenericPopup({
                params: {
                    title: message.title,
                    description: message.subTitle,
                    innerTextContainerStyle: {alignItems: 'center'},
                    buttons: [
                        {
                            closePopupOnPress: true,
                            title: i18n.t('OK'),
                            onPress: () =>
                                navigate({name: 'ProfileTab'})
                        }
                    ]
                }
            });
        }
        // No error occurred - the end-user canceled the session for an unknown reason
        // https://github.com/getyoti/yoti-doc-scan-react-native#usage
        return;
    }
    if (errorCode === 4000) {
        // ignore rejected camera access as it is handled by YOTI flow
        // https://velocitycareerlabs.atlassian.net/browse/VL-1816
        return;
    }

    if (errorCode === 7000) {
        // no error - the end-user doesn't have id docs
        // https://velocitycareerlabs.atlassian.net/browse/VL-6399
        return;
    }

    openStatusPopup({
        params: ERRORS.errorByCode(errorCode)
    });
}

function* startSessionEffect() {
    try {
        const config: IConfig = yield select(configSelector);
        const savedIssuingSession: null | DisclosureCredentialsToIssuerParams =
            yield select(savedOriginalIssuingSessionSelector);

        const savedInspectionSession: null | SelectCredentialToShareParams =
            yield select(inspectionSessionSelector);

        openGenericPopup({
            params: {
                title: i18n.t('Processing'),
                description: i18n.t('Please wait'),
                showSpinner: true
            }
        });
        const yotiNewSessionUrl: string = yield select(
            yotiNewSessionUrlSelector
        );
        const idVerifierDid: string = yield select(idVerifierDidSelector);
        const sessionResp: YotiStartSessionResponse = yield startSession(
            yotiNewSessionUrl,
            KYC_SESSION_COUNTRY_CODE
        );
        const sessionData = sessionResp.data;
        if (isEmpty(sessionData)) {
            updateStatusPopup({params: ERRORS.startSession});
            return;
        }
        const pushToken: string = yield pushTokenEffect();
        const vendor: Vendor = yield issuerByDid(idVerifierDid, IDENTITY_TYPES);

        if (isEmpty(vendor)) {
            updateStatusPopup({params: ERRORS.startSession});
            return;
        }

        const pushUrl: string = yield select(pushUrlSelector);

        const {didJwk} = yield getOauthTokens();
        const accessToken: string = yield getAccessToken(config);

        const credentialManifest: VCLCredentialManifest = yield getCredentialManifest(
            config,
            vendor,
            pushToken,
            pushUrl,
            didJwk,
            accessToken
        )

        if (isEmpty(credentialManifest)) {
            updateStatusPopup({params: ERRORS.startSession});
            return;
        }

        const offers: VCLOffers = yield generateOffers(
            config,
            credentialManifest,
            sessionData,
            didJwk
        );

        closePopup();

        if (offers.responseCode === 202) {
            const result: YotiResult = yield startYoti(sessionData);

            if (result.success) {
                yield onYotiSuccess(
                    sessionData,
                    credentialManifest,
                    offers,
                    savedIssuingSession,
                    savedInspectionSession
                );
                return;
            }

            if (!result.success) {
                vclLogger.error('Yoti error:', JSON.stringify(result));
                yield onYotiError(result.code, savedIssuingSession);
                return;
            }
        }
        throwVCLError({
            errorCode: 'default_kyc_error',
            context: {
                organizationName: 'Issuer'
            }
        });
    } catch (e) {
        closePopup(PopupScreens.STATUS_POPUP);
        handleStartSessionErrors(e);
    }
}

export function* kycSaga() {
    yield takeEvery(actionTypes.START_SESSION, startSessionEffect);
}
