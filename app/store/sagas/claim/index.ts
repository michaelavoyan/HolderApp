import {takeEvery, takeLatest} from 'redux-saga/effects';
import * as actionTypes from '../../actionTypes/claim';
import {claimingCredentialSaga} from './claimingCredentialSaga';
import {getVendorsSaga} from './getVendorsSaga';
import {finalizeOffersSaga} from './finalizeOffersSaga';
import {finalizeOffersDifferentIssuersSaga} from './finalizeOffersDifferentIssuersSaga';
import {pushOffersSaga} from './pushOffersSaga';
import {navigateToIssuingSessionSaga} from './navigateToIssuingSessionSaga';

export function* claimSaga() {
    yield takeEvery(actionTypes.VENDORS, getVendorsSaga);
    yield takeEvery(actionTypes.OFFERS, claimingCredentialSaga);
    yield takeEvery(actionTypes.FINALIZE_OFFERS, finalizeOffersSaga);
    yield takeEvery(
        actionTypes.FINALIZE_OFFERS_FROM_DIFF_ISSUERS,
        finalizeOffersDifferentIssuersSaga
    );
    yield takeLatest(actionTypes.PUSH_OFFERS, pushOffersSaga);
    yield takeEvery(
        actionTypes.PUSH_OFFERS_SUCCESS,
        navigateToIssuingSessionSaga
    );
}
