import {spawn, take} from 'redux-saga/effects';
import {REHYDRATE} from 'redux-persist/lib/constants';
import {authSaga} from './auth';
import {profileSaga} from './profile';
import {disclosureSaga} from './disclosure';
import {pushSaga} from './push';
import {verificationSaga} from './verification';
import {vclSaga} from './vcl';
import {commonSaga} from './common';
import {kycSaga} from './kyc';
import {appConfigSaga} from './appConfig';
import {claimSaga} from './claim';

export function* rootSaga() {
    // tests doesn't use redux persist so awaiting REHYDRATE is not required
    if (!process.env.JEST_WORKER_ID) {
        yield take(REHYDRATE);
    }

    yield spawn(authSaga);
    yield spawn(profileSaga);
    yield spawn(disclosureSaga);
    yield spawn(pushSaga);
    yield spawn(claimSaga);
    yield spawn(verificationSaga);
    yield spawn(vclSaga);
    yield spawn(commonSaga);
    yield spawn(kycSaga);
    yield spawn(appConfigSaga);
}
