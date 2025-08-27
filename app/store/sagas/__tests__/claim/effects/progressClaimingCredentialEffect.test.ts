import {call} from 'redux-saga/effects';
import {cloneableGenerator} from '@redux-saga/testing-utils';
import {progressClaimingCredentialEffect} from 'app/store/sagas/claim/effects/progressClaimingCredentialEffect';
import {countdown} from 'app/store/sagas/claim/helpers';

describe('progressClaimingCredentialEffect saga', () => {
    const generator = cloneableGenerator(progressClaimingCredentialEffect)();

    it('should call countdown for 60 seconds', () => {
        const clone = generator.clone();
        expect(clone.next().value).toEqual(call(countdown, 60));
    });
});
