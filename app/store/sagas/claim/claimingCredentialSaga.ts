import {race} from 'redux-saga/effects';
import {OffersSaga} from 'app/store/types/claim';

import {claimingCredentialEffect} from './effects/claimingCredentialEffect';
import {progressClaimingCredentialEffect} from './effects/progressClaimingCredentialEffect';

export function* claimingCredentialSaga(action: OffersSaga) {
    // start multiple tasks in parallel
    yield race(
        action?.withoutProgress
            ? {
                  claiming: claimingCredentialEffect(action)
              }
            : {
                  claiming: claimingCredentialEffect(action),
                  progress: progressClaimingCredentialEffect()
              }
    );
}
