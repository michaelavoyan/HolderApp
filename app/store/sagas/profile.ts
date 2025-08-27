import {
    all,
    put,
    select,
    take,
    takeEvery,
    takeLatest
} from 'redux-saga/effects';
import notifee from '@notifee/react-native';
import {
    deleteRevokedCredentials,
    deleteVfCredentialsByIds,
    getCredentials,
    updateCredentials
} from 'app/storage/credential';
import {
    setSelfReported,
    getSelfReported,
    deleteSelfCredentialByIds
} from 'app/storage/selfReported';
import {resetDataFromRealm, updateCredential} from 'app/storage/common';
import {signSelfReportedCredential} from 'app/utilities/verifiable-credentials';
import {navigate} from 'app/navigation/utils';
import {findCredentialType} from 'app/utilities/helpers';
import {vclLogger} from '../../utilities/logger';
import * as actionTypes from '../actionTypes/profile';
import * as actions from '../actions';
import {
    credentialsToReduxAction,
    DeleteCredentialSaga,
    DeleteCredentialsSaga,
    SavedSelfReportCredential,
    SaveSelfReportSaga,
    SettingsProps,
    UpdateCredentialSaga,
    UpdateCredentialsSaga
} from '../types/profile';
import {getSettings, setSettings} from '../../storage/settings';
import {ERRORS} from './errors/profile';
import {
    identityTypesSelector,
    newNotificationsLengthSelector,
    vfCredentialSelector
} from '../selectors';
import {ClaimCredentialWithCheckbox} from '../../components/DisclosureRequest/types';
import {openStatusPopup} from '../../utilities/popups';
import {ClaimCredential, CredentialStatus} from '../types/claim';
import {updateIsVfCredentialsLoading} from '../actions/profile';

function* credentialsToReduxEffect({onlyVerified}: credentialsToReduxAction) {
    try {
        yield put(updateIsVfCredentialsLoading({isLoading: true}));

        const responseVfCredentials: ClaimCredentialWithCheckbox[] =
            yield getCredentials();
        yield put(actions.verifiableCredentialsSuccess(responseVfCredentials));
        if (onlyVerified) {
            yield put(updateIsVfCredentialsLoading({isLoading: false}));
            return;
        }
        const responseSelfCredentials: SavedSelfReportCredential[] =
            yield getSelfReported();

        yield put(
            actions.selfReportedCredentialsSuccess(responseSelfCredentials)
        );

        // recheck notifications length and setBadgeCount because of possible deleting credentials
        const notificationsLength: number = yield select(
            newNotificationsLengthSelector
        );
        yield notifee.setBadgeCount(notificationsLength);
        yield put(updateIsVfCredentialsLoading({isLoading: false}));
    } catch (error) {
        yield put(updateIsVfCredentialsLoading({isLoading: false}));
        vclLogger.error(error);
        openStatusPopup({params: ERRORS.getCredentials});
    }
}

function* saveSelfCredentialEffect({
    credential,
    navigation
}: SaveSelfReportSaga) {
    try {
        yield put(actions.updateIsSelfReportLoading({isLoading: true}));
        const jwt: string = yield signSelfReportedCredential(
            credential.credentialSubject,
            findCredentialType(credential.type) ?? ''
        );

        yield setSelfReported({credential, jwt});
        yield put(actions.getCredentials());
        if (navigation) {
            navigate(navigation);
        }
    } catch (error) {
        openStatusPopup({params: ERRORS.saveSelfReport});
        yield put(actions.updateIsSelfReportLoading({isLoading: false}));
    }
}

function* updateCredentialEffect({
    credentialObject,
    isVerified,
    updateVerified,
    navigation
}: UpdateCredentialSaga) {
    try {
        let newJwt: string = '';

        if (!isVerified) {
            newJwt = yield signSelfReportedCredential(
                credentialObject.credentialSubject!,
                findCredentialType(credentialObject?.type) ?? ''
            );
        }
        const newCredential = {
            ...credentialObject,
            ...(newJwt ? {jwt: newJwt} : {})
        };

        yield updateCredential(newCredential, isVerified);
        if (!isVerified || updateVerified) {
            yield put(
                actions.updateCredentialSuccess(newCredential, isVerified)
            );
        }
        if (navigation) {
            navigate(navigation);
        }
    } catch (error) {
        if (isVerified) {
            yield put(updateIsVfCredentialsLoading({isLoading: false}));
        }

        openStatusPopup({params: ERRORS.updateNote});
    }
}

function* updateCredentialsEffect(action: UpdateCredentialsSaga) {
    try {
        const resp: boolean = yield updateCredentials(action.credentials);
        if (resp) {
            yield put(actions.updateCredentialsSuccess(action.credentials));
            return;
        }
        openStatusPopup({params: ERRORS.updateNote});
    } catch (error) {
        openStatusPopup({params: ERRORS.updateNote});
    }
}

function* updateReplacedCredential({id}: {id: string}) {
    try {
        const credential: ClaimCredential = yield select(
            vfCredentialSelector({id})
        );
        const replacedId = credential?.additionalInfo?.replacedId;
        // credential is not replacer
        if (!replacedId) {
            return;
        }
        const replacedCredential: ClaimCredential = yield select(
            vfCredentialSelector({id: replacedId})
        );

        if (!replacedCredential) {
            return;
        }
        // remove replacerId because of deleting replacing credential
        yield updateCredentials([{...replacedCredential, replacerId: ''}]);
        yield put(actions.getCredentials());
    } catch (e) {
        vclLogger.error(e);
    }
}

function* deleteCredentialEffect({
    isVerified,
    id,
    navigation
}: DeleteCredentialSaga) {
    try {
        const response: boolean = isVerified
            ? yield deleteVfCredentialsByIds([id])
            : yield deleteSelfCredentialByIds([id]);
        if (!response) {
            openStatusPopup({params: ERRORS.deleteCredential});
        } else if (navigation) {
            yield updateReplacedCredential({id});
            yield put(actions.deleteCredentialByIdSuccess({id, isVerified}));
            navigate(navigation);
        }
    } catch (error) {
        vclLogger.error(error);
        openStatusPopup({params: ERRORS.deleteCredential});
    }
}

function* deleteCredentialsEffect({
    credentials,
    navigation
}: DeleteCredentialsSaga) {
    try {
        const {verifiedIds, notVerifiedIds} = credentials.reduce(
            (
                result: {verifiedIds: string[]; notVerifiedIds: string[]},
                current
            ) => {
                if (current.status === CredentialStatus.self) {
                    return {
                        ...result,
                        notVerifiedIds: [...result.notVerifiedIds, current.id]
                    };
                }

                return {
                    ...result,
                    verifiedIds: [...result.verifiedIds, current.id]
                };
            },
            {
                verifiedIds: [],
                notVerifiedIds: []
            }
        );

        const responses: boolean[] = yield all([
            deleteVfCredentialsByIds(verifiedIds),
            deleteSelfCredentialByIds(notVerifiedIds)
        ]);

        const isOk = responses.every((response) => response);

        if (!isOk) {
            openStatusPopup({params: ERRORS.deleteCredential});
        } else if (navigation) {
            yield put(actions.deleteCredentialsSuccess({credentials}));

            navigate(navigation);
        }
    } catch (error) {
        vclLogger.error(error);
        openStatusPopup({params: ERRORS.deleteCredential});
    }
}

function* resetDataEffect() {
    try {
        const identityTypes: string[] = yield select(identityTypesSelector);
        yield resetDataFromRealm(identityTypes);
        yield notifee.cancelAllNotifications();
        yield notifee.setBadgeCount(0);
        yield put(actions.resetDataSuccess(identityTypes));
        yield put(actions.pushOffersSuccess({offers: []}));
        yield put(actions.getCredentials());
    } catch (error) {
        openStatusPopup({params: ERRORS.reset});
    }
}

function* getSettingsEffect() {
    try {
        const resp: SettingsProps = yield getSettings();
        yield put(actions.updateSettings(resp));
    } catch (error) {
        openStatusPopup({params: ERRORS.getSettings});
    }
}

function* setSettingsEffect(action: {type: string; settings: SettingsProps}) {
    try {
        vclLogger.info('setSettingsEffect - START');
        const resp: boolean = yield setSettings(action.settings);
        vclLogger.info(`setSettingsEffect - SET: ${resp}`);
        if (resp) {
            const savedSettings: SettingsProps = yield getSettings();
            yield put(actions.updateSettings(savedSettings));
        } else {
            openStatusPopup({params: ERRORS.saveSettings});
        }
        vclLogger.info('setSettingsEffect - END');
    } catch (error) {
        vclLogger.error(`setSettingsEffect - ERROR: ${JSON.stringify(error)}`);
        openStatusPopup({params: ERRORS.saveSettings});
    }
}

function* deleteRevokedCredentialsEffect() {
    try {
        const resp: boolean = yield deleteRevokedCredentials();

        if (!resp) {
            openStatusPopup({params: ERRORS.deleteRevoked});
        } else {
            yield put(actions.getCredentials());
            yield take([actionTypes.VERIFIABLE_CREDENTIALS_SUCCESS]);
            const badgeCounter: number = yield select(
                newNotificationsLengthSelector
            );
            yield notifee.setBadgeCount(badgeCounter);
        }
    } catch (error) {
        openStatusPopup({params: ERRORS.deleteRevoked});
    }
}

export function* profileSaga() {
    yield takeEvery(actionTypes.GET_CREDENTIALS, credentialsToReduxEffect);
    yield takeLatest(actionTypes.SAVE_SELF_REPORTED, saveSelfCredentialEffect);
    yield takeEvery(
        actionTypes.DELETE_CREDENTIAL_BY_ID,
        deleteCredentialEffect
    );
    yield takeEvery(actionTypes.DELETE_CREDENTIALS, deleteCredentialsEffect);
    yield takeEvery(actionTypes.UPDATE_CREDENTIAL, updateCredentialEffect);
    yield takeEvery(actionTypes.UPDATE_CREDENTIALS, updateCredentialsEffect);
    yield takeEvery(actionTypes.RESET_DATA, resetDataEffect);
    yield takeEvery(actionTypes.SET_SETTINGS, setSettingsEffect);
    yield takeEvery(actionTypes.GET_SETTINGS, getSettingsEffect);
    yield takeEvery(
        actionTypes.DELETE_REVOKED_CREDENTIALS,
        deleteRevokedCredentialsEffect
    );
}
