import {set} from 'lodash/fp';
import {GenericAction, reducingFunction} from '../helpers/createReducer';
import * as actionTypes from '../actionTypes/push';
import {
    UpdateDisclosureNotificationsCounterAction,
    PushSate,
    UpdateDeviceTokenAction
} from '../types/push';

const initialState: PushSate = {
    deviceToken: '',
    disclosureNotificationsCounter: 0
};

const actionReducers = {
    [actionTypes.PUSH_UPDATE_DEVICE_TOKEN]: ({
        deviceToken
    }: Partial<UpdateDeviceTokenAction>) => set('deviceToken', deviceToken),
    [actionTypes.INCREMENT_DISCLOSURE_NOTIFICATIONS_COUNTER]: (
        {incrementValue, reset}: UpdateDisclosureNotificationsCounterAction,
        state: PushSate
    ) => {
        let counter = state.disclosureNotificationsCounter + incrementValue;

        if (counter < 0 || reset) {
            counter = 0;
        }

        return set('disclosureNotificationsCounter', counter);
    }
};

export const pushReducer = (
    state = initialState,
    action: GenericAction
): PushSate => reducingFunction<PushSate>(actionReducers, state, action);
