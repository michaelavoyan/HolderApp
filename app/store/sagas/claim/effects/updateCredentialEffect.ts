import {merge, take} from 'lodash';
import {put, select} from 'redux-saga/effects';
import notifee from '@notifee/react-native';
import {updateIsVfCredentialsLoading} from 'app/store/actions/profile';
import {
    vfCredentialSelector,
    newNotificationsLengthSelector
} from 'app/store/selectors';
import {
    UpdateCredentialEffect,
    ClaimCredential,
    CredentialStatus
} from 'app/store/types/claim';
import {getUserId} from 'app/storage/asyncStorage';
import * as actions from '../../../actions';
import * as profileActionTypes from '../../../actionTypes/profile';

export function* updateCredentialEffect(action: UpdateCredentialEffect) {
    try {
        yield put(updateIsVfCredentialsLoading({isLoading: true}));
        if ('updatedCredential' in action) {
            yield put(
                actions.updateCredential({
                    credentialObject: action.updatedCredential,
                    isVerified: true,
                    updateVerified: true
                })
            );
            return;
        }
        const userId: string | null = yield getUserId();
        const credential: ClaimCredential = yield select(
            vfCredentialSelector({
                id: `${action.credentialId}_${userId}`
            })
        );
        yield put(
            actions.updateCredential({
                credentialObject: merge(credential, {
                    status: CredentialStatus.revoked,
                    revocationDate: new Date().toISOString(),
                    isNewRevoked: true
                }),
                isVerified: true,
                updateVerified: true
            })
        );
        if (!action.withoutBadges) {
            yield take([profileActionTypes.UPDATE_CREDENTIAL_SUCCESS]);
            const badge: number = yield select(newNotificationsLengthSelector);
            yield notifee.setBadgeCount(badge);
        }
    } catch (e) {
        yield put(updateIsVfCredentialsLoading({isLoading: false}));
        console.error(e);
    }
}
