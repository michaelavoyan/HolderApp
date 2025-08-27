import {put, select, call} from 'redux-saga/effects';
import {isEmpty, map, reduce} from 'lodash/fp';
import {
    VCLCredentialManifest,
    VCLFinalizeOffersDescriptor,
    VCLOffers,
    VCLToken,
    VCLJwt
} from '@velocitycareerlabs/vcl-react-native';
import {setCredentials} from 'app/storage/credential';
import {getCredentialTypes, getCampaign} from 'app/mixpanel/utils';
import {VclMixpanel} from 'app/mixpanel/VclMixpanel';
import {throwVCLError} from 'app/utilities/error-handler/utils';

import {savedOriginalIssuingSessionSelector} from 'app/store/selectors/disclosure';
import {DisclosureCredentialsToIssuerParams} from 'app/store/types/disclosure';
import {CLAIM_MISSING_CREDENTIALS_MESSAGES} from 'app/utilities/hooks/useClaimingMissingCredential';
import {StatusMessages} from 'app/screens/popups/type';
import {updateCredential} from '../../../storage/common';
import {
    openNoInternetPopupIfOffline,
    openStatusPopup,
    closeGenericPopup,
    openGenericPopup
} from '../../../utilities/popups';
import {navigate, resetNavigation} from '../../../navigation/utils';
import {errorHandlerPopup} from '../../../utilities/error-handler/errorHandlerPopup';
import * as actions from '../../actions';
import {pushOffersSelector} from '../../selectors';
import {
    FinalizeOffersSaga,
    ClaimCredential,
    CredentialAdditionalInfo,
    ClaimCredentialWithCheckbox
} from '../../types/claim';
import {issCheck} from '../utils/messages';
import {
    PROCESSING_TITLE,
    PLEASE_WAIT_DESCRIPTION,
    DEFAULT_ERROR_CODE,
    SAVE_CREDENTIAL_ERROR,
    OK_BUTTON_TITLE
} from '../utils/constants';
import {CredentialToUpdate} from '../../types/profile';
import {VclReactNativeSdkWrapper} from '../../../api/vcl-react-native-sdk-wrapper';

// Extracted function to handle API call
export function* finalizeOffersAPICall({
    credentialManifest,
    offers,
    approvedOfferIds,
    rejectedOfferIds,
    vclToken
}: {
    credentialManifest: VCLCredentialManifest;
    offers: VCLOffers;
    approvedOfferIds: string[];
    rejectedOfferIds: string[];
    vclToken: VCLToken;
}): Generator<any, any, any> {
    return yield call(
        VclReactNativeSdkWrapper.finalizeOffers,
        {
            credentialManifest,
            challenge: offers.challenge,
            approvedOfferIds,
            rejectedOfferIds
        } as VCLFinalizeOffersDescriptor,
        vclToken
    );
}

// Extracted function to update credentials
export function* updateCredentials({
    vfCredentials,
    vendor,
    additionalInfo,
    credentialManifest
}: {
    vfCredentials: string[];
    vendor: {logo: string; country?: string};
    additionalInfo: CredentialAdditionalInfo;
    credentialManifest: VCLCredentialManifest;
}): Generator<any, boolean, any> {
    return yield setCredentials({
        vfCredentials,
        vendor,
        additionalInfo,
        credentialManifest
    });
}

// Extracted function to update the credential status
export function* updateCredentialStatus(
    updatedOffer: CredentialToUpdate
): Generator<any, boolean, any> {
    return yield updateCredential(updatedOffer, true);
}

const getClaimSuccessCredentialsFormatted = (
    passCredentialsArray: VCLJwt[],
    credentialManifest: VCLCredentialManifest
): ClaimCredentialWithCheckbox[] => {
    return passCredentialsArray.map((passCredential) => {
        const credential = passCredential.payload?.vc;
        const issuerProfile =
            credentialManifest?.verifiedProfile?.credentialSubject;
        return {
            ...credential,
            issuer: {
                name: credential?.issuer?.name || issuerProfile?.name,
                logo: credential?.issuer?.image || issuerProfile?.logo,
                id: credential?.issuer?.id || issuerProfile?.id
            },
            jwt: passCredential.encodedJwt,
            checked: true
        } as ClaimCredentialWithCheckbox;
    });
};

// Extracted function to handle tracking offers
export const trackOffers = ({
    offers,
    approvedOfferIds,
    rejectedOfferIds,
    credentialManifest,
    response
}: {
    offers: ClaimCredentialWithCheckbox[];
    approvedOfferIds: string[];
    rejectedOfferIds: string[];
    credentialManifest: VCLCredentialManifest;
    response: {
        passedCredentials: VCLJwt[];
        failedCredentials: VCLJwt[];
    };
}) => {
    if (approvedOfferIds.length) {
        VclMixpanel.trackOffersAccepted({
            CredentialType: getCredentialTypes(offers, true),
            Campaign: getCampaign(credentialManifest.jwt.encodedJwt),
            Issuer: credentialManifest.did,
            OfferId: approvedOfferIds,
            OfferIdCount: approvedOfferIds.length,
            CredentialShared: response.passedCredentials.map(
                (credential) => credential?.payload?.vc.id || ''
            )
        });
    }

    if (rejectedOfferIds.length) {
        VclMixpanel.trackOffersRejected({
            CredentialType: getCredentialTypes(offers, false),
            Campaign: getCampaign(credentialManifest.jwt.encodedJwt),
            Issuer: credentialManifest.did,
            OfferId: rejectedOfferIds,
            OfferIdCount: rejectedOfferIds.length
        });
    }
};

export function* finalizeOffersSaga(action: FinalizeOffersSaga) {
    const {
        credentialManifest,
        offers,
        vendor,
        updatedOffer,
        navigation,
        additionalInfo,
        offerIdToDelete,
        vclToken
    } = action;
    let closeAwaitPopup = () => {};
    const savedIssuing: DisclosureCredentialsToIssuerParams = yield select(
        savedOriginalIssuingSessionSelector
    );

    try {
        closeAwaitPopup = openGenericPopup({
            params: {
                title: PROCESSING_TITLE,
                description: PLEASE_WAIT_DESCRIPTION,
                showSpinner: true
            }
        });

        const pushOffers: ClaimCredential[] = yield select(pushOffersSelector);
        const pushOfferHashes: string[] = map('hash', pushOffers);

        const rejectedOfferIds = reduce(
            (acc: string[], curr) => (!curr.checked ? [...acc, curr.id] : acc),
            [],
            offers.offers
        );
        const approvedOfferIds = reduce(
            (acc: string[], curr) =>
                // don't approve offers which have been saved as push-offers under the Notifications tab
                curr.checked && !pushOfferHashes.includes(curr.hash)
                    ? [...acc, curr.id]
                    : acc,
            [],
            offers.offers
        );

        const response: {
            passedCredentials: VCLJwt[];
            failedCredentials: VCLJwt[];
        } = yield call(finalizeOffersAPICall, {
            credentialManifest,
            offers: offers.vclOffers as VCLOffers,
            approvedOfferIds,
            rejectedOfferIds,
            vclToken
        });

        if (
            (!response?.passedCredentials && !response?.failedCredentials) ||
            (!response?.passedCredentials.length && !response?.failedCredentials.length)
        ) {
            throwVCLError({ errorCode: DEFAULT_ERROR_CODE });
        }

        if (!isEmpty(response.passedCredentials)) {
            const resp: boolean = yield call(updateCredentials, {
                vfCredentials: response.passedCredentials.map(
                    (item) => item.encodedJwt
                ),
                vendor,
                additionalInfo: additionalInfo as CredentialAdditionalInfo,
                credentialManifest
            });

            let updatingResp = true;
            if (updatedOffer) {
                updatingResp = yield call(updateCredentialStatus, updatedOffer);
            }

            closeGenericPopup();

            if (resp || updatingResp) {
                yield put(actions.getCredentials());
                yield call(trackOffers, {
                    offers: offers.offers as ClaimCredentialWithCheckbox[],
                    approvedOfferIds,
                    rejectedOfferIds,
                    credentialManifest,
                    response
                });
            } else {
                const isOfflinePopupVisible: boolean =
                    yield openNoInternetPopupIfOffline();

                if (isOfflinePopupVisible) {
                    closeAwaitPopup();
                    return;
                }

                openStatusPopup({params: SAVE_CREDENTIAL_ERROR});
            }
        }

        if (offerIdToDelete) {
            yield put(
                actions.deleteCredentialById({
                    id: offerIdToDelete,
                    isVerified: true
                })
            );
        }

        yield put(actions.jumpNextIssuingSequence());
        if (response.failedCredentials.length) {
            openStatusPopup({
                params: {
                    ...issCheck(response.failedCredentials.length),
                    buttonTitle: OK_BUTTON_TITLE,
                    onPress: () => {
                        if (savedIssuing && navigation) {
                            navigate({...navigation, name: navigation.path});

                            return;
                        }

                        navigate({name: 'Profile'});
                    }
                }
            });
        } else if (navigation) {
            if (navigation.path === 'Profile') {
                resetNavigation();
                navigate({
                    name: 'ClaimSuccessPopup',
                    params: {
                        credentials: getClaimSuccessCredentialsFormatted(
                            response.passedCredentials,
                            credentialManifest
                        )
                    }
                });
            } else {
                if (savedIssuing) {
                    const message =
                        CLAIM_MISSING_CREDENTIALS_MESSAGES.returnToOriginalIssuingSession(
                            savedIssuing.issuer?.name || ''
                        );

                    openStatusPopup({
                        params: {
                            title: message.title,
                            text: message.subTitle,
                            onPress: () =>
                                navigate({
                                    ...navigation,
                                    name: navigation.path
                                }),
                            statusType: StatusMessages.Done
                        }
                    });

                    return;
                }

                navigate({...navigation, name: navigation.path});
            }
        }
    } catch (error) {
        closeAwaitPopup();
        errorHandlerPopup(
            error,
            `Failed to finalize offers ${JSON.stringify(error)}`,
            true,
            async () => {
            put(actions.jumpNextIssuingSequence());

            if (savedIssuing && navigation) {
                navigate({...navigation, name: navigation.path});

                return;
            }

            navigate({name: 'Profile'});
        });
    }
}
