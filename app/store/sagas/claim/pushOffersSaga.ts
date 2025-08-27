import {call, put, select, take} from 'redux-saga/effects';

import {get, getOr, isEmpty, map, pick, find} from 'lodash/fp';
import {VCLCountry} from '@velocitycareerlabs/vcl-react-native';
import notifee from '@notifee/react-native';
import {issuerByDid} from 'app/utilities/issuer';
import {getCredentialsByTypes, setOffers} from 'app/storage/credential';

import {DisclosureCredentialsToIssuerParams} from 'app/store/types/disclosure';
import {CredentialStatus} from 'app/store/types/claim';
import * as commonActionTypes from '../../actionTypes/common';
import * as profileActionTypes from '../../actionTypes/profile';
import * as actions from '../../actions';
import {
    ClaimCredential,
    CredentialAdditionalInfo,
    GenerateOffers,
    LinkCodeCommitment,
    NotificationType,
    PushOffersSaga,
    Vendor
} from '../../types/claim';
import {NO_OFFERS} from '../errors/claim';

import {
    countriesSelector,
    pushOffersSelector,
    newNotificationsLengthSelector,
    handledOfferNotificationIdSelector
} from '../../selectors';

import {
    getRegenerateOffersDataByExchangeId,
    getUserId
} from '../../../storage/asyncStorage';

import {CredentialCategories} from '../../types/common';
import {credentialCategories} from '../../../api/common.service';

import {RegenerateOffersData} from '../../../storage/type';
import {openStatusPopup} from '../../../utilities/popups';

import {configSelector} from '../../selectors/appConfig';
import {isSdkInitializedSelector} from '../../selectors/common';

import {IConfig} from '../../types/appConfig';

import {savedOriginalIssuingSessionSelector} from '../../selectors/disclosure';
import {CLAIM_MISSING_CREDENTIALS_MESSAGES} from '../../../utilities/hooks/useClaimingMissingCredential';
import {claimingCredentialSaga} from './claimingCredentialSaga';
import {updateCredentialEffect} from './effects/updateCredentialEffect';
import {replaceCredentialEffect} from './effects/replaceCredentialEffect';

export function* pushOffersSaga(action: PushOffersSaga) {
    try {
        const {
            issuer,
            exchangeId,
            types: credentialTypes,
            notificationType,
            isFromBackground,
            notificationId
        } = action;
        const handledOfferNotificationId: string = yield select(
            handledOfferNotificationIdSelector
        );
        // If user get offers from push offer when application is opened he won't get an error if tap notification after this VL-5953
        if (notificationId === handledOfferNotificationId) return;

        if (isFromBackground) {
            const isSdkInitialized: boolean = yield select(
                isSdkInitializedSelector
            );
            if (!isSdkInitialized) {
                yield take([commonActionTypes.SDK_INITIALIZED]);
            }
        }

        if (notificationType === NotificationType.revoked) {
            yield call(updateCredentialEffect, action);
            return;
        }

        const vendor: Vendor | null = yield call(
            issuerByDid,
            issuer,
            credentialTypes
        );
        if (!vendor) {
            return;
        }
        const isReplacing = notificationType === NotificationType.replaced;
        let additionalInfo: CredentialAdditionalInfo;
        let linkCodeCommitment: LinkCodeCommitment = {value: ''};
        let updatedCredential: ClaimCredential;
        let {types} = action;

        if (notificationType === NotificationType.noOffers) {
            const savedIssuingSession: null | DisclosureCredentialsToIssuerParams =
                yield select(savedOriginalIssuingSessionSelector);
            if (savedIssuingSession) {
                yield put(actions.clearOriginalIssuingSession());
                call(openStatusPopup, {
                    params: {
                        ...CLAIM_MISSING_CREDENTIALS_MESSAGES.noOffersFound(
                            vendor.name
                        )
                    }
                });

                return;
            }
            call(openStatusPopup, {
                params: NO_OFFERS(vendor.name)
            });
            return;
        }

        if (isReplacing) {
            ({
                newCredential: {linkCodeCommitment, additionalInfo},
                updatedCredential
            } = yield replaceCredentialEffect(action));
            types = [action.replacementCredentialType];
        }

        const countries: VCLCountry[] = yield select(countriesSelector);
        const config: IConfig = yield select(configSelector);
        const categories: {
            data: CredentialCategories;
        } = yield call(credentialCategories, config);
        const identityTypes = getOr(
            [],
            'types',
            find('isIdentity', categories.data)
        );
        const identityCredentials: ClaimCredential[] = yield call(
            getCredentialsByTypes,
            identityTypes
        );
        const regenerateOffersData: RegenerateOffersData = isReplacing
            ? {}
            : yield call(getRegenerateOffersDataByExchangeId, {
                  exchangeId
              });
        yield call(claimingCredentialSaga, {
            selectedCredentials: identityCredentials.filter(
                (credential) => credential.status === CredentialStatus.verified
            ),
            isNewWaiting: true,
            types,
            service: get('service', vendor),
            linkCodeCommitment,
            type: '',
            withoutProgress: false,
            did: vendor.id,
            ...regenerateOffersData
        });
        yield put(actions.setProgress(0));

        const {offers}: GenerateOffers = yield select(pushOffersSelector);
        if (isReplacing && updatedCredential! && !isEmpty(offers)) {
            const userId: string | null = yield getUserId();

            yield updateCredentialEffect({
                updatedCredential: {
                    ...updatedCredential,
                    replacerId: `${offers[0].offerId}_${userId}` // replacerId should be updated after finalizing
                }
            });
        }

        const countryCode = getOr('', 'location.countryCode', vendor);

        yield call(
            setOffers,
            map(
                (item: ClaimCredential) => ({
                    ...item,
                    withoutAccept: true,
                    isNewWaiting: true,
                    vendor: {
                        ...pick(['id', 'name'], vendor),
                        country: find(['code', countryCode], countries)?.name
                    },
                    ...(additionalInfo ? {additionalInfo} : {})
                }),
                offers
            )
        );

        yield put(actions.getCredentials(true));
        if (!action.withoutBadges) {
            yield take([profileActionTypes.VERIFIABLE_CREDENTIALS_SUCCESS]);
            const badge: number = yield select(newNotificationsLengthSelector);
            yield notifee.setBadgeCount(badge);
        }
    } catch (error) {
        console.error(error);
    } finally {
        yield put(actions.setHandledOfferNotificationId(action.notificationId));
    }
}
