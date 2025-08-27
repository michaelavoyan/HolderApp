import {merge, get} from 'lodash/fp';
import {select} from 'redux-saga/effects';
import {getUserId} from 'app/storage/asyncStorage';
import {vfCredentialSelector} from 'app/store/selectors';
import {
    PushOffersSaga,
    ClaimCredential,
    CredentialStatus
} from 'app/store/types/claim';

export function* replaceCredentialEffect(action: PushOffersSaga) {
    const userId: string | null = yield getUserId();
    const id = `${action.credentialId}_${userId}`;
    const credential: ClaimCredential = yield select(
        vfCredentialSelector({
            id
        })
    );
    const replacedDate = new Date().toISOString();
    // set revoked status before replacing offer is finalized
    const updatedCredential = merge(credential, {
        status: CredentialStatus.revoked,
        revocationDate: replacedDate,
        isNewRevoked: true
    });
    return {
        updatedCredential,
        newCredential: {
            additionalInfo: {
                replacedDate,
                replacedId: id
            },
            linkCodeCommitment: get(
                'linkCodeCommitment',
                credential
            )
        }
    };
}
