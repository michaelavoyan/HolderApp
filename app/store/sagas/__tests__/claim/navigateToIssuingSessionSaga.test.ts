import {select} from 'redux-saga/effects';
import {
    inspectionSessionSelector,
    savedOriginalIssuingSessionSelector
} from 'app/store/selectors/disclosure';

import {
    ClaimCredentialWithCheckbox,
    CredentialStatus
} from 'app/store/types/claim';
import {navigateToIssuingSessionSaga} from '../../claim/navigateToIssuingSessionSaga';

const offers: ClaimCredentialWithCheckbox[] = [
    {
        checked: true,
        id: 'offer1',
        offerId: 'offerId1',
        type: ['credentialType1'],
        issuer: {
            id: 'issuer1',
            name: 'Issuer 1',
            logo: 'issuer1_logo.png'
        },
        credentialSubject: {
            // credential subject data
        },
        status: CredentialStatus.offered,
        offerExpirationDate: '2023-06-30',
        userId: 'user1',
        additionalInfo: {
            replacedDate: '2023-06-15',
            replacedId: 'credential1'
        },
        hash: 'hash1'
    }
];

describe('navigateToIssuingSessionSaga', () => {
    it('should not navigate if missingCredential is not found', () => {
        const generator = navigateToIssuingSessionSaga({
            type: 'action',
            offers
        });

        expect(generator.next().value).toEqual(
            select(savedOriginalIssuingSessionSelector)
        );
        expect(generator.next().value).toEqual(
            select(inspectionSessionSelector)
        );
        expect(generator.next().done).toBe(true);
    });
});
