import {
    UpdateDisclosureNotificationsCounterAction,
    RegisterDeviceAction,
    DeRegisterDeviceAction,
    UpdateDeviceTokenAction,
    GetPushAction
} from '../types/push';
import * as actionTypes from '../actionTypes/push';

export const removeDevice = (): DeRegisterDeviceAction => ({
    type: actionTypes.PUSH_REMOVE_DEVICE
});

export const registerDevice = (): RegisterDeviceAction => ({
    type: actionTypes.PUSH_REGISTER_DEVICE
});

export const updateDeviceToken = (
    deviceToken: string
): UpdateDeviceTokenAction => ({
    type: actionTypes.PUSH_UPDATE_DEVICE_TOKEN,
    deviceToken
});

export const getPushes = (): GetPushAction => ({
    type: actionTypes.GET_PUSHES
});

export const updateDisclosureNotificationsCounter = (
    incrementValue: number,
    reset?: boolean
): UpdateDisclosureNotificationsCounterAction => ({
    type: actionTypes.INCREMENT_DISCLOSURE_NOTIFICATIONS_COUNTER,
    incrementValue,
    reset
});

export const updateDisclosureNotificationsBadge = (
    incrementValue: number,
    reset?: boolean
): UpdateDisclosureNotificationsCounterAction => ({
    type: actionTypes.UPDATE_DISCLOSURE_NOTIFICATIONS_BADGE,
    incrementValue,
    reset
});
