import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {VCLEnvironment} from '@velocitycareerlabs/vcl-react-native';
import {IConfig} from '../../../store/types/appConfig';
import {updateDeviceToken} from '../../push';
import {walletApi} from '../../api';
import {getOauthTokens, initOauthTokens} from '../../../storage/oauth';
import {WALLETAPI_BASE_URL, VCL_ENVIRONMENT} from '../../../configs';

const axiosMock = new MockAdapter(axios);

jest.mock('../../../jwt/core.ts', () => ({
    __esModule: true,
    jwtSign: jest.fn(),
    jwtDecode: () => ({claimsSet: {scope: 'account'}}),
    jwtVerify: jest.fn()
}));

describe('GIVEN I make a request to the wallet API AND access_token verification is enabled on server', () => {
    afterEach(() => {
        axiosMock.reset();
    });

    describe('WHEN isOauthProtectedEndpoint in AxiosConfig is enabled for careewallet endpoint', () => {
        it('THEN the access token should be sent', async () => {
            await initOauthTokens({
                accessToken: 'mockAccessToken',
                refreshToken: 'mockRefreshToken',
                accountId: 'mockAccountId'
            });

            axiosMock
                .onGet(`${WALLETAPI_BASE_URL}/test-endpoint`)
                .reply(200, {});

            const response = await walletApi({
                baseUrls: {walletApi: WALLETAPI_BASE_URL}
            } as IConfig).get('/test-endpoint', {
                isOauthProtectedEndpoint: true
            });

            expect(response.status).toEqual(200);
            expect(response.data).toEqual({});
            expect(response.config.headers?.Authorization).toEqual(
                'Bearer mockAccessToken'
            );
        });
    });

    describe('WHEN isOauthProtectedEndpoint in AxiosConfig is dsiabled for careewallet endpoint', () => {
        it('THEN the access token shouldn`t be sent', async () => {
            await initOauthTokens({
                accessToken: 'mockAccessToken',
                refreshToken: 'mockRefreshToken',
                accountId: 'mockAccountId'
            });

            axiosMock
                .onGet(`${WALLETAPI_BASE_URL}/test-endpoint`)
                .reply(200, {});

            const response = await walletApi({
                baseUrls: {walletApi: WALLETAPI_BASE_URL}
            } as IConfig).get('/test-endpoint');

            expect(response.status).toEqual(200);
            expect(response.data).toEqual({});
            expect(response.config.headers?.Authorization).toBeUndefined();
        });
    });

    describe('WHEN the access_token is valid', () => {
        it('THEN the refresh token action shouldn`t happen, access token should be sent', async () => {
            await initOauthTokens({
                accessToken: 'mockAccessToken',
                refreshToken: 'mockRefreshToken',
                accountId: 'mockAccountId'
            });

            axiosMock
                .onPut('/api/v0.6/devices/oldDeviceId', {
                    deviceId: 'deviceId',
                    pushActivated: true
                })
                .reply(200, {});

            const response = await updateDeviceToken(
                {
                    baseUrls: {
                        walletApi: WALLETAPI_BASE_URL
                    }
                } as IConfig,
                'oldDeviceId',
                'deviceId',
                true
            );

            expect(response.status).toEqual(200);
            expect(response.data).toEqual({});
            expect(response.config.headers?.Authorization).toEqual(
                'Bearer mockAccessToken'
            );
        });
    });

    describe('WHEN the access_token is not saved in realm storage', () => {
        it('THEN access token shouldn`t be sent', async () => {
            await initOauthTokens({
                accessToken: '',
                refreshToken: '',
                accountId: 'mockAccountId'
            });

            axiosMock
                .onPut('/api/v0.6/devices/oldDeviceId', {
                    deviceId: 'deviceId',
                    pushActivated: true
                })
                .reply(200, {});

            const response = await updateDeviceToken(
                {
                    baseUrls: {
                        walletApi: WALLETAPI_BASE_URL
                    }
                } as IConfig,
                'oldDeviceId',
                'deviceId',
                true
            );

            expect(response.status).toEqual(200);
            expect(response.data).toEqual({});
            expect(response.config.headers?.Authorization).toBeUndefined();
        });
    });

    describe('WHEN the access_token is expired', () => {
        it('THEN access and refresh tokens should be refreshed AND call should be repeated', async () => {
            await initOauthTokens({
                accessToken: 'oldAccessToken',
                refreshToken: 'oldRefreshToken',
                accountId: 'mockAccountId'
            });

            axiosMock
                .onPost(`${WALLETAPI_BASE_URL}/api/v0.6/oauth/token`)
                .reply(200, {
                    access_token: 'newAccessToken',
                    refresh_token: 'newRefreshToken'
                });

            axiosMock
                .onPut(
                    '/api/v0.6/devices/oldDeviceId',
                    {deviceId: 'deviceId', pushActivated: true},
                    {
                        headers: {
                            Accept: 'application/json, text/plain, */*',
                            'Content-Type': 'application/json',
                            'x-vnf-protocol-version': '1.0',
                            Authorization: 'Bearer oldAccessToken'
                        }
                    }
                )
                .reply(401, {
                    error: 'invalid_token',
                    error_description: 'The access token expired'
                });

            axiosMock
                .onPut(
                    '/api/v0.6/devices/oldDeviceId',
                    {deviceId: 'deviceId', pushActivated: true},
                    {
                        headers: {
                            Accept: 'application/json, text/plain, */*',
                            'Content-Type': 'application/json',
                            'x-vnf-protocol-version': '1.0',
                            Authorization: 'Bearer newAccessToken'
                        }
                    }
                )
                .reply(200, {deviceId: 'deviceId', pushActivated: true});

            const response = await updateDeviceToken(
                {
                    baseUrls: {
                        walletApi: WALLETAPI_BASE_URL
                    }
                } as IConfig,
                'oldDeviceId',
                'deviceId',
                true
            );

            expect(response.status).toEqual(200);

            // token refresh, POST /api/v0.6/oauth/token should be called once
            expect(axiosMock.history.post.length).toBe(1);

            // devices request should be repeated, PUT /api/v0.6/devices/oldDeviceId should be called twice
            expect(axiosMock.history.put.length).toBe(2);

            // realm should be updated with new tokens
            expect(await getOauthTokens()).toEqual({
                accessToken: 'newAccessToken',
                refreshToken: 'newRefreshToken',
                accountId: 'mockAccountId',
                active: true
            });
        });
    });

    describe('WHEN the access_token is expired AND app sends several requests simultaneously', () => {
        it('THEN only one token refresh request should happen', async () => {
            await initOauthTokens({
                accessToken: 'oldAccessToken',
                refreshToken: 'oldRefreshToken',
                accountId: 'mockAccountId'
            });

            axiosMock
                .onPost(`${WALLETAPI_BASE_URL}/api/v0.6/oauth/token`)
                .reply(200, {
                    access_token: 'newAccessToken',
                    refresh_token: 'newRefreshToken'
                });

            axiosMock
                .onPut(
                    '/api/v0.6/devices/oldDeviceId',
                    {deviceId: 'deviceId', pushActivated: true},
                    {
                        headers: {
                            Accept: 'application/json, text/plain, */*',
                            'Content-Type': 'application/json',
                            'x-vnf-protocol-version': '1.0',
                            Authorization: 'Bearer oldAccessToken'
                        }
                    }
                )
                .reply(401, {
                    error: 'invalid_token',
                    error_description: 'The access token expired'
                });

            axiosMock
                .onPut(
                    '/api/v0.6/devices/oldDeviceId',
                    {deviceId: 'deviceId', pushActivated: true},
                    {
                        headers: {
                            Accept: 'application/json, text/plain, */*',
                            'Content-Type': 'application/json',
                            'x-vnf-protocol-version': '1.0',
                            Authorization: 'Bearer newAccessToken'
                        }
                    }
                )
                .reply(200, {deviceId: 'deviceId'});

            axiosMock
                .onPut(
                    '/api/v0.6/devices/oldDeviceId',
                    {deviceId: 'deviceId2', pushActivated: true},
                    {
                        headers: {
                            Accept: 'application/json, text/plain, */*',
                            'Content-Type': 'application/json',
                            'x-vnf-protocol-version': '1.0',
                            Authorization: 'Bearer oldAccessToken'
                        }
                    }
                )
                .reply(401, {
                    error: 'invalid_token',
                    error_description: 'The access token expired'
                });

            axiosMock
                .onPut(
                    '/api/v0.6/devices/oldDeviceId',
                    {deviceId: 'deviceId2', pushActivated: true},
                    {
                        headers: {
                            Accept: 'application/json, text/plain, */*',
                            'Content-Type': 'application/json',
                            'x-vnf-protocol-version': '1.0',
                            Authorization: 'Bearer newAccessToken'
                        }
                    }
                )
                .reply(200, {deviceId: 'deviceId2'});

            const requests = [
                updateDeviceToken(
                    {
                        baseUrls: {
                            walletApi: WALLETAPI_BASE_URL
                        }
                    } as IConfig,
                    'oldDeviceId',
                    'deviceId',
                    true
                ),
                updateDeviceToken(
                    {
                        baseUrls: {
                            walletApi: WALLETAPI_BASE_URL
                        }
                    } as IConfig,
                    'oldDeviceId',
                    'deviceId2',
                    true
                )
            ];

            const responses = await Promise.all(requests);

            expect(responses[0].status).toEqual(200);
            expect(responses[1].status).toEqual(200);

            // token refresh, POST /api/v0.6/oauth/token should be called once
            expect(axiosMock.history.post.length).toBe(1);

            // realm storage should be updated with new tokens
            expect(await getOauthTokens()).toEqual({
                accessToken: 'newAccessToken',
                refreshToken: 'newRefreshToken',
                accountId: 'mockAccountId',
                active: true
            });
        });
    });
});

describe('VCL_ENVIRONMENT should be one of Dev, Qa, Staging, or Prod', () => {
    expect([
        VCLEnvironment.Dev,
        VCLEnvironment.Qa,
        VCLEnvironment.Staging,
        VCLEnvironment.Prod
    ]).toContain(VCL_ENVIRONMENT);
});
