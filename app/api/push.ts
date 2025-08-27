import {get} from 'lodash/fp';
import {getOauthTokens} from 'app/storage/oauth';
import {walletApi, getAccessToken} from './api';
import {IConfig} from '../store/types/appConfig';
import {getDeviceToken} from '../storage/asyncStorage';

declare module 'axios' {
    export interface AxiosRequestConfig {
        isOauthProtectedEndpoint?: boolean;
    }
}

export const subscribeDeviceToPush = (
    config: IConfig,
    params: {
        deviceId: string;
        deviceType: string;
        deviceOS: string;
        pushActivated: boolean;
    }
) => walletApi(config).post('/api/v0.6/devices', params);

export const getPushes = (
    config: IConfig,
    deviceId: string,
    pushSeqId: string = ''
) =>
    walletApi(config).get(`/api/v0.6/devices/${deviceId}/pushes`, {
        params: {pushSeqId},
        isOauthProtectedEndpoint: true
    });

export const updateDeviceToken = (
    config: IConfig,
    oldDeviceId: string,
    deviceId: string,
    pushActivated: boolean
) =>
    walletApi(config).put(
        `/api/v0.6/devices/${oldDeviceId}`,
        {deviceId, pushActivated},
        {isOauthProtectedEndpoint: true}
    );

export const getPushToken = ({
    config,
    accountId,
    did,
    token
}: {
    config: IConfig;
    accountId: string;
    did: string;
    token: string;
}) =>
    walletApi(config, token).post(
        `/api/v0.6/accounts/${accountId}/push_token`,
        {did}
    );

export const getVclPushToken = async (config: IConfig) => {
    const deviceToken = await getDeviceToken();
    const account = await getOauthTokens();
    const accessToken = await getAccessToken(config);

    if (!deviceToken && !account.accountId && !account?.didJwk?.did) {
        throw Error('Failed to get Vcl push token');
    }

    const pushTokenResp = await getPushToken({
        config,
        accountId: account.accountId,
        did: account?.didJwk?.did || '',
        token: accessToken || ''
    });

    return get('data.pushToken', pushTokenResp);
};
