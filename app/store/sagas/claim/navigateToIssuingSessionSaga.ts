import {select, take} from 'redux-saga/effects';

import {
    DisclosureCredentialsToIssuerParams,
    SelectCredentialToShareParams
} from 'app/store/types/disclosure';
import {getOr} from 'lodash/fp';
import * as profileActionTypes from '../../actionTypes/profile';

import {NavigateToIssuingSessionEffect} from '../../types/claim';

import {navigate} from '../../../navigation/utils';

import {ClaimCredentialWithCheckbox} from '../../../components/DisclosureRequest/types';

import {
    inspectionSessionSelector,
    savedOriginalIssuingSessionSelector
} from '../../selectors/disclosure';
import {offerWithMissedCredentialReceivedPopup} from '../../../utilities/hooks/useClaimingMissingCredential';
import {credentialsByOfferIdSelector} from '../../selectors/profile';

export function* navigateToIssuingSessionSaga(
    action: NavigateToIssuingSessionEffect
) {
    try {
        const {offers} = action;
        const savedIssuingSession: null | DisclosureCredentialsToIssuerParams = yield select(
            savedOriginalIssuingSessionSelector
        );

        const savedInspectionSession: null | SelectCredentialToShareParams = yield select(
            inspectionSessionSelector
        );

        if (savedIssuingSession) {
            const missingOfferId = offers.find(cred =>
                cred.type.includes(
                    savedIssuingSession?.credentialType?.id || ''
                )
            )?.id;

            if (!missingOfferId) {
                return;
            }

            yield take([profileActionTypes.VERIFIABLE_CREDENTIALS_SUCCESS]);

            const missingCredential: ClaimCredentialWithCheckbox[] = yield select(
                state =>
                    credentialsByOfferIdSelector(<any>state, missingOfferId)
            );

            if (!missingCredential) {
                return;
            }

            offerWithMissedCredentialReceivedPopup(
                savedIssuingSession.issuer?.name || '',
                () => {
                    navigate({
                        name: 'CredentialDetails',
                        params: {
                            credential: missingCredential
                        }
                    });
                }
            );
        }

        if (savedInspectionSession) {
            const missingOfferId = offers.find(cred =>
                cred.type.find(type =>
                    savedInspectionSession.types.includes(type)
                )
            )?.id;

            if (!missingOfferId) {
                return;
            }

            yield take([profileActionTypes.VERIFIABLE_CREDENTIALS_SUCCESS]);

            const missingCredential: ClaimCredentialWithCheckbox[] = yield select(
                state =>
                    credentialsByOfferIdSelector(<any>state, missingOfferId)
            );

            if (!missingCredential) {
                return;
            }

            offerWithMissedCredentialReceivedPopup(
                getOr('', 'disclosure.organization.name', savedInspectionSession),
                () => {
                    navigate({
                        name: 'NotificationsTab'
                    });
                },
                true
            );
        }
    } catch (error) {
        console.error(error);
    }
}
