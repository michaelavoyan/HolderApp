import {race} from 'redux-saga/effects';
import {OffersSaga} from 'app/store/types/claim';
import {claimingCredentialSaga} from '../../claim/claimingCredentialSaga';
import {claimingCredentialEffect} from '../../claim/effects/claimingCredentialEffect';
import {progressClaimingCredentialEffect} from '../../claim/effects/progressClaimingCredentialEffect';

jest.mock('../../claim/effects/claimingCredentialEffect', () => ({
    claimingCredentialEffect: jest.fn()
}));

jest.mock('../../claim/effects/progressClaimingCredentialEffect', () => ({
    progressClaimingCredentialEffect: jest.fn()
}));

describe('claimingCredentialSaga', () => {
    let claimingCredentialSagaGenerator: Generator;

    const mockAction: OffersSaga = {} as OffersSaga;

    beforeEach(() => {
        claimingCredentialSagaGenerator = claimingCredentialSaga(mockAction);
    });

    it('should start claiming and progress tasks in parallel', () => {
        const raceDescriptor = claimingCredentialSagaGenerator.next().value;

        expect(raceDescriptor).toEqual(
            race({
                claiming: claimingCredentialEffect(mockAction),
                progress: progressClaimingCredentialEffect()
            })
        );
    });
});
