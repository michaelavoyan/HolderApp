import notifee from '@notifee/react-native';
import {
    all,
    call,
    put,
    select,
    take,
    takeEvery,
    takeLatest
} from 'redux-saga/effects';
import {get, filter, isEmpty, map, getOr} from 'lodash/fp';
import {
    getDeviceToken,
    getPushSeqId,
    getUserId,
    savePushSeqId,
    setDeviceToken,
    setNotificationIds
} from 'app/storage/asyncStorage';
import {PopupScreens} from 'app/navigation/StackParamsList';
import {deleteDeviceToken, getFcmToken} from '../../push/initializePush';
import * as actionTypes from '../actionTypes/push';
import {pushOffers} from '../actions';
import {ERRORS} from './errors/push';
import {
    getVclPushToken,
    getPushes,
    subscribeDeviceToPush
} from '../../api/push';
import {isIOS} from '../../utilities/helpers';
import {getPushEntity, setPushes} from '../../storage/push';
import {notificationIdByType} from '../../utilities/push';
import {
    PushResp,
    PushStorageModel,
    SubscribeDeviceResp,
    UpdateDisclosureNotificationsCounterAction
} from '../types/push';
import {closePopup, openStatusPopup} from '../../utilities/popups';
import {
    newNotificationsLengthSelector,
    notificationIdSelector,
    settingsSelector
} from '../selectors';
import {vclLogger} from '../../utilities/logger';
import {IConfig} from '../types/appConfig';
import {configSelector} from '../selectors/appConfig';
import {NotificationType} from '../types/claim';

import {updateDisclosureNotificationsCounter} from '../actions/push';
import {restoreDataObject} from '../../push/restoreDataObject';
import * as authActionTypes from '../actionTypes/auth';
import {isAccountCreatedEffect} from './auth/effects/isAccountCreatedEffect';

export function* enablePushNotificationsSaga() {
    try {
        const deviceId: string = yield getFcmToken(/* attempts */);

        if (deviceId) {
            yield setDeviceToken(deviceId);

            const config: IConfig = yield select(configSelector);
            const {pushPermissionEnabled} = yield select(settingsSelector);
            const pushTokenResp: SubscribeDeviceResp =
                yield subscribeDeviceToPush(config, {
                    deviceId,
                    deviceType: 'phone',
                    deviceOS: isIOS ? 'ios' : 'android',
                    pushActivated: !!pushPermissionEnabled
                });
            const deviceIdResp: string = get('data.deviceId', pushTokenResp);

            if (!deviceIdResp) {
                openStatusPopup({params: ERRORS.notificationRegisterDevice});
            }
        } else {
            openStatusPopup({params: ERRORS.notificationRegisterDevice});
            closePopup(PopupScreens.LOADING_POPUP);
        }
    } catch (error) {
        vclLogger.error(error);
        openStatusPopup({params: ERRORS.notificationRegisterDevice});
    }
}

function* disablePushNotificationsSaga() {
    try {
        const userId: string | null = yield getUserId();
        if (userId) {
            yield deleteDeviceToken();
            yield setDeviceToken('');
        }
    } catch (error) {
        openStatusPopup({params: ERRORS.notificationRegisterDevice});
    }
}

function* getPushesSaga() {
    try {
        const isAccountAlreadyCreated: boolean = yield call(
            isAccountCreatedEffect
        );

        if (!isAccountAlreadyCreated) {
            yield take(authActionTypes.INIT_BACKEND_ACCOUNT_SUCCESS);
        }

        const deviceToken: string = yield getDeviceToken();
        if (deviceToken) {
            const pushSeqId: string = yield getPushSeqId();
            const config: IConfig = yield select(configSelector);
            const resp: {data: {pushes: PushResp[]}} = yield getPushes(
                config,
                deviceToken,
                pushSeqId
            );
            const data = get('data.pushes', resp);
            const savedPushes: PushStorageModel[] = yield getPushEntity();

            const savedIds = map('notificationId', savedPushes);
            const filtered = filter(
                (item) => !savedIds.includes(item.id),
                data
            );
            if (!isEmpty(filtered)) {
                yield setPushes(
                    map(
                        (item) => ({
                            notificationId: item.id,
                            issuer: item.data.issuer
                        }),
                        filtered
                    )
                );

                yield setNotificationIds(
                    map((push) => {
                        const pushData = restoreDataObject(push);

                        return notificationIdByType({
                            ...pushData.data,
                            notificationId: push.id
                        });
                    }, filtered)
                );
                const notificationId: string = yield select(
                    notificationIdSelector
                );

                yield all(
                    map((push) => {
                        const pushData = restoreDataObject(push);
                        if (!pushData.data.notificationType) {
                            return null;
                        }

                        if (
                            pushData.data.notificationType ===
                            NotificationType.presentationVerified
                        ) {
                            return null;
                        }

                        // ignore if pushOffers effect is already started with the same notificationId
                        if (push.id === notificationId) {
                            return null;
                        }

                        return put(
                            pushOffers({...pushData.data, withoutBadges: true})
                        );
                    }, filtered)
                );
            }
            const nextPushSeqId = getOr('', 'data.nextPushSeqId', resp);
            if (nextPushSeqId) {
                yield savePushSeqId(nextPushSeqId);
            }
        }
    } catch (error) {
        vclLogger.error(`getPushesSaga: ${error}`);
    }
}

export function* pushTokenEffect(includeError?: boolean) {
    try {
        const config: IConfig = yield select(configSelector);
        const pushToken: string = yield getVclPushToken(config);

        return pushToken;
    } catch (e) {
        return includeError ? [e, ''] : '';
    }
}

export function* updateVerificationPushesBadgesSaga({
    incrementValue,
    reset
}: UpdateDisclosureNotificationsCounterAction) {
    yield put(updateDisclosureNotificationsCounter(incrementValue, reset));

    const notificationsLength: number = yield select(
        newNotificationsLengthSelector
    );

    yield notifee.setBadgeCount(notificationsLength);
}

export function* pushSaga() {
    yield takeEvery(
        actionTypes.PUSH_REGISTER_DEVICE,
        enablePushNotificationsSaga
    );
    yield takeEvery(
        actionTypes.PUSH_REMOVE_DEVICE,
        disablePushNotificationsSaga
    );
    yield takeEvery(
        actionTypes.UPDATE_DISCLOSURE_NOTIFICATIONS_BADGE,
        updateVerificationPushesBadgesSaga
    );
    yield takeLatest(actionTypes.GET_PUSHES, getPushesSaga);
}
