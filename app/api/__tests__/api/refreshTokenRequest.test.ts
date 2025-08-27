import axios, {AxiosResponse, InternalAxiosRequestConfig} from 'axios';

import {refreshTokenRequest} from '../../api';
import {vclLogger} from '../../../utilities/logger';
import {IConfig} from '../../../store/types/appConfig';
import {getOauthTokens, initOauthTokens} from '../../../storage/oauth';
import {WALLETAPI_BASE_URL} from '../../../configs';

jest.mock('axios', () => ({
    post: jest.fn()
}));

jest.mock('../../../jwt/core.ts', () => ({
    __esModule: true,
    jwtSign: jest.fn(),
    jwtDecode: () => ({claimsSet: {scope: 'account'}}),
    jwtVerify: jest.fn()
}));

describe('refreshTokenRequest service Test Suite', () => {
    const config = {
        baseUrls: {
            walletApi: WALLETAPI_BASE_URL
        }
    } as IConfig;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should refresh the token, update access/refresh tokens', async () => {
        await initOauthTokens({
            accessToken: 'mockAccessToken',
            refreshToken: 'mockRefreshToken',
            accountId: 'mockAccountId'
        });

        const mockResponse: AxiosResponse<{
            access_token: string;
            refresh_token: string;
        }> = {
            data: {
                access_token: 'mockNewAccessToken',
                refresh_token: 'mockNewRefreshToken'
            },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {} as InternalAxiosRequestConfig
        };

        (
            axios.post as jest.MockedFunction<typeof axios.post>
        ).mockResolvedValue(mockResponse);

        await refreshTokenRequest(config);

        expect(axios.post).toHaveBeenCalledWith(
            `${WALLETAPI_BASE_URL}/api/v0.6/oauth/token`,
            {
                grant_type: 'refresh_token',
                refresh_token: 'mockRefreshToken',
                scope: 'account'
            }
        );

        const {
            data: {access_token: accessToken, refresh_token: refreshToken}
        } = mockResponse;

        expect(await getOauthTokens()).toEqual({
            accessToken,
            refreshToken,
            accountId: 'mockAccountId',
            active: true
        });
    });

    it('should handle token refresh errors', async () => {
        (
            axios.post as jest.MockedFunction<typeof axios.post>
        ).mockRejectedValueOnce(new Error());
        vclLogger.error = jest.fn();

        await refreshTokenRequest(config);

        expect(vclLogger.error).toHaveBeenCalledWith(
            expect.stringMatching(/Failed to refresh token/)
        );
    });

    it('should be called only once in case of several simultaneous requests', async () => {
        await Promise.all([
            refreshTokenRequest(config),
            refreshTokenRequest(config),
            refreshTokenRequest(config)
        ]);

        expect(axios.post).toHaveBeenCalledTimes(1);
    });
});
