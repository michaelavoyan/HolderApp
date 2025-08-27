import * as actionTypes from '../actionTypes/appConfig';
import {IConfig} from '../types/appConfig';

export const getAppConfig = () => ({
    type: actionTypes.GET_APP_CONFIG
});

export const getAppConfigSuccess = (config: IConfig) => ({
    type: actionTypes.GET_APP_CONFIG_SUCCESS,
    config
});

export const setIsDebugOn = (isDebugOn: boolean) => ({
    type: actionTypes.SET_IS_DEBUG_ON,
    isDebugOn
});
