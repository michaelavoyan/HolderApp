import {select} from 'redux-saga/effects';
import {FinalizeOffersSaga} from 'app/store/types/claim';
import {pushOffersSelector} from 'app/store/selectors';
import {timeout} from 'app/navigation/utils';
import {finalizeOffersSaga} from '../../claim/finalizeOffersSaga';
import {
    APPROVED_OFFERS_IDS,
    REJECTED_OFFERS_IDS,
    finalizeOffersSagaAction
} from '../../utils/mocks';

jest.mock('../../claim/finalizeOffersSaga', () => ({
    *finalizeOffersAPICall() {
        yield 'some value';
        return true;
    },
    finalizeOffersSaga: jest.requireActual('../../claim/finalizeOffersSaga')
        .finalizeOffersSaga
}));

describe('finalizeOffersSaga', () => {
    let finalizeOffersSagaGenerator: Generator;

    const mockAction: FinalizeOffersSaga = finalizeOffersSagaAction;

    beforeEach(() => {
        finalizeOffersSagaGenerator = finalizeOffersSaga(mockAction);
    });

    afterEach(() => {
        clearTimeout(timeout);
    });

    it('should select pushOffersSelector state', () => {
        finalizeOffersSagaGenerator.next();
        const selectDescriptor = finalizeOffersSagaGenerator.next().value;
        expect(selectDescriptor).toEqual(select(pushOffersSelector));
    });

    it('should call an finalizeOffersAPICall', () => {
        finalizeOffersSagaGenerator.next();
        finalizeOffersSagaGenerator.next();
        const callDescriptor = finalizeOffersSagaGenerator.next().value;

        expect(callDescriptor.context).toBeUndefined();
        expect(callDescriptor.payload.fn).toEqual(expect.any(Function));
        expect(callDescriptor.payload.args).toEqual([
            {
                credentialManifest: mockAction.credentialManifest,
                approvedOfferIds: APPROVED_OFFERS_IDS,
                rejectedOfferIds: REJECTED_OFFERS_IDS,
                vclToken: mockAction.vclToken,
                offers: mockAction.offers.vclOffers
            }
        ]);
        expect(callDescriptor.payload.fn.name).toBe('finalizeOffersAPICall');
    });
});
