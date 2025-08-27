import axios, {AxiosInstance} from 'axios';
import {IConfig} from '../store/types/appConfig';
import {jwtDecode} from '../jwt/core';
import {vclLogger} from '../utilities/logger';
import {getOauthTokens, updateOauthTokens} from '../storage/oauth';

const XVnfProtocolVersionValue = '1.0';
const XVnfProtocolVersionKey = 'x-vnf-protocol-version';
const XVclVerifVersionValue = 'X-VCL-VERIF-VERSION';
const XVclVerifVersionKey = '2';

export enum AccessTokenScopes {
    Account = 'account',
    Inbox = 'inbox',
    KeyCreate = 'key:create',
    Jwt = 'jwt'
}

const ACCESS_TOKEN_EXPIRE_SOON = 30 * 60 * 1000; // 30 minutes

/**
 * Doesn't make an additional request if there is already a refresh token request in progress.
 */
export const refreshTokenRequest = (() => {
    let refreshTokenRequestPromise: Promise<string | null> | null = null;

    return async (
        config: IConfig,
        auth?:
            | {accessToken: string; refreshToken: string; accountId: string}
            | undefined,
        scope?: AccessTokenScopes[]
    ): Promise<string | null> => {
        if (!refreshTokenRequestPromise) {
            refreshTokenRequestPromise = (async () => {
                try {
                    const {
                        accessToken: currentAccessToken,
                        refreshToken: currentRefreshToken,
                        accountId
                    } = auth || (await getOauthTokens());
                    const {
                        claimsSet: {scope: currentScope}
                    } = jwtDecode(currentAccessToken);

                    const {
                        data: {
                            access_token: newAccessToken,
                            refresh_token: newRefreshToken
                        }
                    } = await axios.post<{
                        access_token: string;
                        refresh_token: string;
                    }>(`${config.baseUrls?.walletApi}/api/v0.6/oauth/token`, {
                        grant_type: 'refresh_token',
                        refresh_token: currentRefreshToken,
                        scope: scope?.join(' ') || currentScope,
                        audience: config.oauth?.oauthAudience,
                        client_id: config.oauth?.clientId
                    });

                    await updateOauthTokens(
                        {
                            accessToken: newAccessToken,
                            refreshToken: newRefreshToken
                        },
                        accountId
                    );
                    return newAccessToken;
                } catch (error) {
                    vclLogger.error(
                        `Failed to refresh token ${JSON.stringify(error)}`
                    );
                    return null;
                } finally {
                    refreshTokenRequestPromise = null;
                }
            })();
        }

        return refreshTokenRequestPromise;
    };
})();

const enableOauthAuthorization = (instance: AxiosInstance, config: IConfig) => {
    // send access token with every request
    instance.interceptors.request.use(async (axiosConfig) => {
        if (!axiosConfig.isOauthProtectedEndpoint) {
            return axiosConfig;
        }

        const {accessToken} = await getOauthTokens();

        if (accessToken) {
            axiosConfig.headers.set('Authorization', `Bearer ${accessToken}`);
        }

        return axiosConfig;
    });

    // refresh token if expired
    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const originalRequest = error.config;

            if (
                error.response.status === 401 &&
                !originalRequest.retryRequest
            ) {
                originalRequest.retryRequest = true;
                const {refreshToken} = await getOauthTokens();

                if (refreshToken) {
                    const accessToken = await refreshTokenRequest(config);
                    return instance({
                        ...originalRequest,
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            'Content-Type': 'application/json'
                        }
                    });
                }
            }
            return Promise.reject(error);
        }
    );
};

export const walletApi = (
    config: IConfig,
    token?: string,
    isVerification = false
) => {
    const instance = axios.create({
        baseURL: config.baseUrls?.walletApi,
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
            [XVnfProtocolVersionKey]: XVnfProtocolVersionValue,
            ...(isVerification && {
                [XVclVerifVersionValue]: XVclVerifVersionKey
            })
        }
    });

    enableOauthAuthorization(instance, config);
    return instance;
};

export const verifierApi = (config: IConfig) => {
    const instance = axios.create({
        baseURL: config.baseUrls?.verificationApi,
        headers: {
            [XVnfProtocolVersionKey]: XVnfProtocolVersionValue,
            [XVclVerifVersionValue]: XVclVerifVersionKey
        }
    });

    enableOauthAuthorization(instance, config);

    return instance;
};

export const publicVerificationApi = (config: IConfig) =>
    axios.create({
        baseURL: config.baseUrls?.verificationServiceActionBaseUrl,
        headers: {
            [XVnfProtocolVersionKey]: XVnfProtocolVersionValue
        }
    });

export const libApi = (config: IConfig) =>
    axios.create({
        baseURL: config.baseUrls?.libVnfUrl,
        headers: {
            [XVnfProtocolVersionKey]: XVnfProtocolVersionValue
        }
    });

export const registrarApi = (config: IConfig) =>
    axios.create({
        baseURL: config.baseUrls?.registrarVnfUrl,
        headers: {
            [XVnfProtocolVersionKey]: XVnfProtocolVersionValue,
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache'
        }
    });

export const customUrlApi = (url: string) =>
    axios.create({
        baseURL: url,
        headers: {
            [XVnfProtocolVersionKey]: XVnfProtocolVersionValue
        }
    });

export const jwtApi = (url: string, token: string) =>
    axios.create({
        baseURL: url,
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`,
            [XVnfProtocolVersionKey]: XVnfProtocolVersionValue
        }
    });

const isAccessTokenIsAboutToExpire = (accessToken: string) => {
    const accessTokenExpirtation = jwtDecode(accessToken).claimsSet.exp;
    return (
        accessTokenExpirtation * 1000 - Date.now() < ACCESS_TOKEN_EXPIRE_SOON
    );
};

export const runWithAccessToken = async <
    T extends (...args: any) => Promise<any>
>(
    config: IConfig,
    func: T,
    ...args: any
): Promise<ReturnType<T>> => {
    const handleRefreshTokens = async () => {
        const refreshTokenRequestPromise = await refreshTokenRequest(config);
        const token = await refreshTokenRequestPromise;
        return await func(...args, {value: token});
    };

    try {
        const tokens = await getOauthTokens();
        if (isAccessTokenIsAboutToExpire(tokens.accessToken)) {
            return await handleRefreshTokens();
        }
        return await func(...args, {value: tokens.accessToken});
    } catch (e: any) {
        if (config && e.statusCode === 401 && e.error === 'Unauthorized') {
            return await handleRefreshTokens();
        }

        return Promise.reject(e);
    }
};
// VL-7399 Agreed in order to prevent accessToken experation in the middle of the flow,
// to refresh the token if it's about to expire, with a 30 minutes buffer.

export const getAccessToken = async (
    config: IConfig
): Promise<string | null> => {
    const tokens = await getOauthTokens();
    if (isAccessTokenIsAboutToExpire(tokens.accessToken)) {
        return (await refreshTokenRequest(config)) || '';
    }
    return tokens.accessToken || '';
};
