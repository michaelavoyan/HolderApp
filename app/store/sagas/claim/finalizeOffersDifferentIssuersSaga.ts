import {put, select, call} from 'redux-saga/effects';
import {
    getOr,
    isEmpty,
    map,
    flatten,
    groupBy,
    mapValues,
    toArray,
    filter,
    partition,
    get,
    find
} from 'lodash/fp';
import {
    VCLFinalizeOffersDescriptor,
    VCLJwtVerifiableCredentials,
    VCLOffers,
    VCLJwt
} from '@velocitycareerlabs/vcl-react-native';
import {
    deleteVfCredentialsByIds,
    setCredentials,
    updateCredentials
} from 'app/storage/credential';

import {errorHandlerPopup} from 'app/utilities/error-handler/errorHandlerPopup';
import {throwVCLError} from 'app/utilities/error-handler/utils';
import {trackOffers} from 'app/mixpanel/utils';
import {decodeCredentialJwt} from 'app/jwt/verifiables';

import {vclLogger} from 'app/utilities/logger';
import {getUserId} from 'app/storage/asyncStorage';

import * as actions from '../../actions';
import {
    ClaimCredential,
    CredentialStatus,
    FinalizeOffersDifferentIssuersSaga,
    GenerateOffers
} from '../../types/claim';

import {credentialsByIdsSelector, pushOffersSelector} from '../../selectors';

import {navigate} from '../../../navigation/utils';

import {closeGenericPopup, openGenericPopup} from '../../../utilities/popups';

import {isCredentialExpired} from '../../../utilities/credential';

import i18n from '../../../i18n';
import {VclReactNativeSdkWrapper} from '../../../api/vcl-react-native-sdk-wrapper';

export function* finalizeOffers(
    items: ClaimCredential[],
    isAccept: boolean,
    offers?: VCLOffers
) {
    try {
        // vclToken is the same for all items with the same issuer
        const vclToken = get('[0].vclToken', items);
        if (!vclToken) {
            return Promise.resolve();
        }

        if (!offers) {
            throwVCLError({
                errorCode: 'default_finalize_offers_error',
                context: {
                    sentryMessage: `No offers passed to finalize ${JSON.stringify(
                        {
                            errorCode: 'default_finalize_offers_error'
                        }
                    )}`
                }
            });
        }

        const approvedOfferIds = isAccept ? map('offerId', items) : [];
        const rejectedOfferIds = !isAccept ? map('offerId', items) : [];

        const jwtVerifiableCredentials: VCLJwtVerifiableCredentials =
            yield call(
                VclReactNativeSdkWrapper.finalizeOffers,
                {
                    // credentialManifest is the same for all items with the same issuer
                    credentialManifest: items[0].credentialManifest!,
                    challenge: offers ? offers.challenge : null,
                    approvedOfferIds,
                    rejectedOfferIds
                } as VCLFinalizeOffersDescriptor,
                vclToken
            );
        return jwtVerifiableCredentials;
    } catch (e) {
        if (e) {
            errorHandlerPopup(
                e,
                `finalizeOffers - ${JSON.stringify(e)}`,
                true,
                () => {
                    navigate({name: 'ProfileTab'});
                }
            );
        }

        return Promise.reject(e);
    }
}

// update replacerId and status in the revoked credentials
export function* updateRevokedCredentials({
    vfCredentialsWithOffers
}: {
    vfCredentialsWithOffers: {
        credential: string;
        offer: ClaimCredential;
    }[];
}) {
    const userId: string | null = yield getUserId();
    const replacers = filter(
        'offer.additionalInfo.replacedId',
        vfCredentialsWithOffers
    );
    if (isEmpty(replacers) || !userId) {
        return;
    }
    const ids = map('offer.additionalInfo.replacedId', replacers);
    const revokedCredentials: ClaimCredential[] = yield select(
        credentialsByIdsSelector(ids)
    );
    const updatedRevokedCredentials = map((cred) => {
        const replacer = find(
            ['offer.additionalInfo.replacedId', cred.id],
            replacers
        )!;
        const decodedReplaced = decodeCredentialJwt(replacer.credential);
        const newReplacerId = getOr('', 'payload.id', decodedReplaced);
        return {
            ...cred,
            replacerId: `${newReplacerId}_${userId}`,
            status: CredentialStatus.replaced
        };
    }, revokedCredentials);

    yield updateCredentials(updatedRevokedCredentials);
}

export function* finalizeOffersDifferentIssuersSaga({
    offers: allOffers,
    isAccept,
    navigation,
    offerIdsToDelete
}: // Need Generator<any, any, any> to solve typescript problem in tests
FinalizeOffersDifferentIssuersSaga): Generator<any, any, any> {
    let closeAwaitPopup = () => {};

    try {
        const [expiredOffers, offers] = partition(
            isCredentialExpired,
            allOffers?.offers || []
        );
        if (!isAccept && !isEmpty(expiredOffers)) {
            yield call(deleteVfCredentialsByIds, map('id', expiredOffers));
        }

        if (isEmpty(offers)) {
            yield put(actions.getCredentials());
            closeGenericPopup();
            if (navigation) {
                navigate(navigation);
            }
            return;
        }

        if (isEmpty(allOffers.vclOffers)) {
            throwVCLError({
                errorCode: 'default_finalize_offers_error',
                context: {
                    sentryMessage: `No vclOffers stored ${JSON.stringify({
                        errorCode: 'default_finalize_offers_error'
                    })}`
                }
            });
            return;
        }

        const groupByCredentialManifestPath = 'credentialManifest.exchangeId';
        closeAwaitPopup = openGenericPopup({
            params: {
                title: i18n.t('Processing'),
                description: i18n.t('Please wait'),
                showSpinner: true
            }
        });

        const groupedOffersByCredentialManifest: {
            [key: string]: ClaimCredential[];
        } = groupBy(groupByCredentialManifestPath, allOffers.offers);

        const responseArr: {all: VCLJwt[]}[] = [];
        const calls = mapValues(
            (items: ClaimCredential[]) =>
                call(finalizeOffers, items, isAccept, allOffers.vclOffers),
            groupedOffersByCredentialManifest
        );
        if (calls instanceof Error) {
            closeAwaitPopup();
            errorHandlerPopup(calls, null, true, () =>
                navigate({name: 'Profile'})
            );
        }

        // call finalize offers sequentially, don't use yield all because of: https://twist.com/a/102855/ch/332957/t/3237549/c/73900024
        // eslint-disable-next-line no-restricted-syntax
        for (const c of toArray(calls)) {
            responseArr.push(yield c);
        }

        const passedCredentials: VCLJwt[] = flatten(
            map('passedCredentials', responseArr)
        );
        const failedCredentials: VCLJwt[] = flatten(
            map('failedCredentials', responseArr)
        );

        const response = {
            passedCredentials,
            failedCredentials
        };

        if (
            !response?.passedCredentials ||
            !response?.failedCredentials ||
            (isAccept &&
                !response?.passedCredentials.length &&
                !response?.failedCredentials.length)
        ) {
            throwVCLError({
                errorCode: 'default_finalize_offers_error',
                context: {
                    sentryMessage: `Empty finalizeOffers response ${JSON.stringify(
                        {errorCode: 'default_finalize_offers_error'}
                    )}`
                }
            });
        }

        const pushOffers: GenerateOffers = yield select(pushOffersSelector);

        const offersHashes: string[] = map('hash', offers);
        const activePushOffers = filter(
            (offer) => !offersHashes.includes(offer.hash),
            pushOffers.offers
        );
        yield put(
            actions.pushOffersSuccess({
                offers: activePushOffers,
                vclOffers: allOffers.vclOffers as VCLOffers
            })
        );

        const credentialsId = response.passedCredentials.map(
            (item) => item?.payload?.jti
        );

        trackOffers(offers, isAccept, credentialsId);

        if (!isAccept) {
            if (offerIdsToDelete) {
                yield deleteVfCredentialsByIds(offerIdsToDelete);
            }
            yield put(actions.getCredentials());
            closeGenericPopup();
            if (navigation) {
                navigate(navigation);
            }
            return;
        }

        const vfCredentialsWithOffers = response.passedCredentials.map(
            (item, index) => ({
                credential: item.encodedJwt,
                offer: offers[index] // need offer data to save it with decrypted credentials
            })
        );

        const resp: boolean = yield setCredentials({
            vfCredentialsWithOffers,
            vfCredentials: []
        });

        if (!resp) {
            throwVCLError({
                errorCode: 'default_finalize_offers_error',
                context: {
                    sentryMessage: `Failed to store credentials ${JSON.stringify(
                        {errorCode: 'default_finalize_offers_error'}
                    )}`
                }
            });
        }

        // used to update replacer ids if finalizing offers were replacers of the revoked credentials
        // also update status from 'Revoked' to 'Replaced' due to offers are finalized
        yield updateRevokedCredentials({vfCredentialsWithOffers});

        if (offerIdsToDelete) {
            yield deleteVfCredentialsByIds(offerIdsToDelete); // replace offers with decrypted credentials(setCredentials func)
        }

        yield put(actions.getCredentials());
        closeGenericPopup();
        if (navigation) {
            navigate(navigation);
        }
    } catch (error) {
        vclLogger.error(
            error,
            `Offers: ${JSON.stringify(allOffers)}`,
            allOffers
        );
        closeAwaitPopup();
        errorHandlerPopup(error, null, true);
    }
}
