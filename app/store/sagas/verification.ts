import {getOr, isEmpty, get, upperFirst} from 'lodash/fp';
import {call, put, select, takeEvery} from 'redux-saga/effects';
import {
    VCLCredentialManifest,
    VCLCredentialManifestDescriptorByDeepLink,
    VCLError,
    VCLIssuingType,
    VCLJwt,
    VCLOffers,
    VCLOrganizations,
    VCLService,
    VCLToken,
    VCLFinalizeOffersDescriptor
} from '@velocitycareerlabs/vcl-react-native';
import {VclMixpanel} from 'app/mixpanel/VclMixpanel';

import {errorHandlerPopup} from 'app/utilities/error-handler/errorHandlerPopup';
import {NavigateOptions, navigate} from 'app/navigation/utils';
import {HolderAppError} from 'app/utilities/error-handler/HolderAppError';
import {throwVCLError} from 'app/utilities/error-handler/utils';

import {getCampaign} from 'app/mixpanel/utils';
import {localConfigs} from 'app/configs';

import {runWithAccessToken, getAccessToken} from 'app/api/api';
import {getOauthTokens} from 'app/storage/oauth';
import {
    ClaimEmailPhone,
    CompleteVerificationSaga,
    StartVerificationSaga,
    VerifyEmailPhone
} from '../types/verification';

import * as actions from '../actions';
import {
    AddIdentityInfoStepE,
    AddIdentityInfoTypeE
} from '../../components/Profile/typings/types';
import {ERRORS} from './errors/auth';
import {parseVendorObject} from '../helpers/common';
import {completeVerification, startVerification} from '../../api/auth.service';
import * as actionTypes from '../actionTypes/verification';
import {setUsersCredentials} from '../../storage/credential';
import {
    emailVerifierDidSelector,
    phoneVerifierDidSelector,
    userSelector,
    configSelector,
    pushUrlSelector
} from '../selectors';
import {FullUser} from '../types/auth';
import {
    closePopup,
    openGenericPopup,
    openStatusPopup
} from '../../utilities/popups';
import {jwtDecode} from '../../jwt/core';
import {IConfig} from '../types/appConfig';
import i18n from '../../i18n';
import {OrganizationProfile} from '../types/common';
import {issCheck} from './utils/messages';
import {checkVCLError} from './errors/helpers';
import {pushTokenEffect} from './push';
import {VclReactNativeSdkWrapper} from '../../api/vcl-react-native-sdk-wrapper';

const CLAIM_EMAIL_PHONE_TYPES = ['EmailV1.0', 'PhoneV1.0'];

const SUBJECT_FIELD_IDENTITY: {[key: string]: 'email' | 'phone'} = {
    [AddIdentityInfoTypeE.Email]: 'email',
    [AddIdentityInfoTypeE.Phone]: 'phone'
};

const VERIFY_FIELD: {[key: string]: 'email' | 'phone'} = {
    [AddIdentityInfoTypeE.Email]: 'email',
    [AddIdentityInfoTypeE.Phone]: 'phone'
};

export const handleVerificationError = (
    e?: any,
    organizationName: string = '',
    organizationEmail: string = '',
    credentialType: string = ''
) => {
    if (e instanceof HolderAppError) {
        errorHandlerPopup(e, null, true, () =>
            navigate({
                name: '',
                params: {},
                option: NavigateOptions.GoBack
            })
        );
        return;
    }

    if (e instanceof VCLError) {
        checkVCLError(e, organizationName, organizationEmail, credentialType);
    } else {
        const incorrectCode: boolean = e?.message?.includes('404');
        errorHandlerPopup(
            new HolderAppError({
                errorCode: incorrectCode
                    ? 'confirm_incorrect_code'
                    : 'default_verification_error'
            }),
            null,
            true,
            () =>
                incorrectCode
                    ? null
                    : navigate({
                          name: '',
                          params: {},
                          option: NavigateOptions.GoBack
                      })
        );
    }
};

export const finalizeOffers = async (
    credentialManifest: VCLCredentialManifest,
    offers: VCLOffers,
    token: VCLToken
) => {
    const finalizeOffersDescriptor: VCLFinalizeOffersDescriptor = {
        credentialManifest,
        challenge: offers.challenge,
        approvedOfferIds: [offers.all[0].id],
        rejectedOfferIds: [],
    };

    const response: {
        passedCredentials: VCLJwt[];
        failedCredentials: VCLJwt[];
    } = await VclReactNativeSdkWrapper.finalizeOffers(finalizeOffersDescriptor, token);

    if (response.failedCredentials.length) {
        openStatusPopup({
            params: {
                ...issCheck(response.failedCredentials.length),
                buttonTitle: i18n.t('OK'),
                onPress: () => navigate({name: 'Profile'})
            }
        });
        return null;
    }
    return response;
};

export function* claimVerifiedEmailPhoneSaga({
    value,
    field,
    credentialManifest
}: ClaimEmailPhone) {
    try {
        const offersResp: VCLOffers = yield VclReactNativeSdkWrapper.generateOffers({
            credentialManifest,
            types: CLAIM_EMAIL_PHONE_TYPES,
            identificationVerifiableCredentials: []
        });

        const {sessionToken} = offersResp;
        const offer = getOr([], 'all[0]', offersResp);
        if (isEmpty(offer)) {
            const issuerName = getOr(
                '',
                'claimsSet.metadata.client_name',
                jwtDecode(credentialManifest.jwt.encodedJwt)
            );

            throwVCLError({
                errorCode: 'offers_not_found_synch',
                context: {
                    organizationName: issuerName
                }
            });
            return;
        }

        const response: {
            passedCredentials: VCLJwt[];
            failedCredentials: VCLJwt[];
        } | null = yield finalizeOffers(
            credentialManifest,
            offersResp,
            sessionToken
        );
        if (!response) {
            return;
        }

        const jwt: VCLJwt = getOr(false, 'passedCredentials[0]', response);
        if (!jwt) {
            closePopup();
            // TODO replace generic errorCode with specific
            throwVCLError({
                errorCode: 'default_verification_error'
            });
            return;
        }
        const user: FullUser = yield select(userSelector);

        const organizationProfile: OrganizationProfile =
            yield VclReactNativeSdkWrapper.getVerifiedProfile({did: jwt?.payload?.iss});

        yield call(setUsersCredentials, [
            {
                jwt: jwt.encodedJwt,
                userId: user.id,
                type: [field],
                credentialSubject: {
                    [SUBJECT_FIELD_IDENTITY[field]]: value
                },
                credentialManifest,
                default: false,
                issuer: organizationProfile,
                id: `${jwt?.payload?.jti}_${user.id}`
            }
        ]);

        VclMixpanel.trackOffersAccepted({
            CredentialType: field,
            CredentialShared: jwt?.payload?.jti,
            OfferId: offer.id,
            OfferIdCount: 1,
            Campaign: getCampaign(credentialManifest.jwt.encodedJwt),
            SharedWith: credentialManifest.did,
            SharedWithName: organizationProfile.name
        });

        closePopup();
        yield put(actions.changeIdentityStep(AddIdentityInfoStepE.Success));
        yield put(actions.getCredentials());
    } catch (e) {
        closePopup();
        const issuerName = getOr(
            '',
            'claimsSet.metadata.client_name',
            jwtDecode(credentialManifest.jwt.encodedJwt)
        );
        handleVerificationError(
            e,
            issuerName,
            credentialManifest.verifiedProfile.credentialSubject.contactEmail,
            VCLIssuingType.Identity
        );
    }
}

function* credentialManifestEmailPhoneSaga(action: VerifyEmailPhone) {
    try {
        const config: IConfig = yield select(configSelector);
        const pushToken: string = yield pushTokenEffect();
        const pushUrl: string = yield select(pushUrlSelector);
        const {didJwk} = yield getOauthTokens();
        const accessToken: string = yield getAccessToken(config);
        const protocol = localConfigs.velocityProtocol;
        const serviceEndpoint = get('service.serviceEndpoint', action);
        const encodedToken = encodeURIComponent(
            `${serviceEndpoint}?vendorOriginContext=${action.token}`
        );

        const credentialManifestDescriptorByDeepLink: VCLCredentialManifestDescriptorByDeepLink =
            {
                deepLink: {
                    value: `${protocol}issue?request_uri=${encodedToken}`
                },
                issuingType: VCLIssuingType.Identity,
                credentialTypes: CLAIM_EMAIL_PHONE_TYPES,
                pushDelegate: {
                    pushToken,
                    pushUrl
                },
                didJwk,
                remoteCryptoServicesToken: {value: accessToken} as VCLToken
            };
        const credentialManifest: VCLCredentialManifest =
            yield runWithAccessToken(
                config,
                VclReactNativeSdkWrapper.getCredentialManifest,
                credentialManifestDescriptorByDeepLink
            );
        yield claimVerifiedEmailPhoneSaga({
            ...action,
            credentialManifest
        });
    } catch (e) {
        closePopup();
        yield handleVerificationError(e);
    }
}

function* issuerServiceSaga(field: string) {
    try {
        const credentialTypes = [upperFirst(field)];
        const emailVerifierDid: string = yield select(emailVerifierDidSelector);
        const phoneVerifierDid: string = yield select(phoneVerifierDidSelector);
        const response: VCLOrganizations =
            yield VclReactNativeSdkWrapper.searchForOrganizations({
                filter: {
                    did:
                        field === AddIdentityInfoTypeE.Email
                            ? emailVerifierDid
                            : phoneVerifierDid
                }
            });
        const issuersResp = get('all', response);
        if (!isEmpty(issuersResp)) {
            return get(
                '[0]service',
                parseVendorObject(issuersResp, credentialTypes)
            );
        }
        return false;
    } catch (e) {
        return false;
    }
}

const openVerificationErrorPopup = (): void => {
    openStatusPopup({
        params: {
            ...ERRORS.startVerification,
            onPress: () =>
                navigate({
                    name: '',
                    params: {},
                    option: NavigateOptions.GoBack
                })
        }
    });
};

function* startVerificationSaga(action: StartVerificationSaga) {
    try {
        const config: IConfig = yield select(configSelector);
        const resp: {error: string | {}} = yield startVerification(
            config,
            VERIFY_FIELD[action.field],
            action.value
        );
        if ('error' in resp) {
            openVerificationErrorPopup();
        } else {
            yield put(actions.changeIdentityStep(AddIdentityInfoStepE.Confirm));
        }
    } catch (error) {
        openVerificationErrorPopup();
    }
}

function* competeVerificationSaga({
    verificationCode,
    value,
    field
}: CompleteVerificationSaga) {
    try {
        openGenericPopup({
            params: {
                title: i18n.t('Processing'),
                description: i18n.t('Please wait'),
                showSpinner: true
            }
        });
        const config: IConfig = yield select(configSelector);
        const accessToken: string = yield getAccessToken(config);
        const resp: {data: {credential?: string}} = yield completeVerification(
            config,
            verificationCode,
            accessToken
        );
        const token = getOr(false, 'data.token', resp);
        if (!token) {
            closePopup();
            throwVCLError({
                errorCode: 'confirm_incorrect_code'
            });
        }
        const service: VCLService =
            yield issuerServiceSaga(field);
        if (!service) {
            closePopup();
            throwVCLError({
                errorCode: 'confirm_incorrect_code'
            });
        }
        yield credentialManifestEmailPhoneSaga({
            value,
            field,
            token,
            service
        });
    } catch (error) {
        closePopup();
        handleVerificationError(error);
    }
}

export function* verificationSaga() {
    yield takeEvery(actionTypes.START_VERIFICATION, startVerificationSaga);
    yield takeEvery(actionTypes.COMPLETE_VERIFICATION, competeVerificationSaga);
}
