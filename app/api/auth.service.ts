import {toLower} from 'lodash/fp';
import {AxiosResponse} from 'axios';
import {VCLDidJwk} from '@velocitycareerlabs/vcl-react-native';
import {customUrlApi, walletApi} from './api';
import {IConfig} from '../store/types/appConfig';
import {initOauthTokens} from '../storage/oauth';


/**
 * Request a verification code sent via SMS or email
 * @param {IConfig} config - app config
 * @param {string} field - email or phone as field name
 * @param {string} value  - email or phone value provided by user
 * @returns - ''
 * // documentation can be not up to date
 * @see https://velocitycareerlabs.stoplight.io/docs/velocity-apis/60e56a84aba77-request-a-verification-code-sent-via-sms
 * @see https://velocitycareerlabs.stoplight.io/docs/velocity-apis/c90e84f683e18-request-a-verification-code-sent-via-email
 */
export const startVerification = (
    config: IConfig,
    field: string,
    value: string
) =>
    walletApi(config).post(
        `/api/v0.6/verify/${toLower(field)}/request-code`,
        {
            value
        },
        {
            isOauthProtectedEndpoint: true
        }
    );
/**
 * Confirm a verification code sent via SMS or email
 * @param {IConfig} config - app config
 * @param {string} verificationCode - verification code provided by user
 * @returns {object} Returns an object with token property, where token is VendorOriginContext
 * @example
 * // returns {token: "123456"}
 */
export const completeVerification = (
    config: IConfig,
    verificationCode: string,
    token: string
) =>
    walletApi(config, token, true).post(
        '/api/v0.6/verify/confirm',
        {
            verificationCode
        },
        {
            isOauthProtectedEndpoint: true
        }
    );

/**
 * Request a mock personas for testing/demo purposes
 * @param {IConfig} config - app config
 * @returns {PersonsData} Returns an array with mock personas {PersonData}
 */

export const getPersons = (config: IConfig) =>
    walletApi(config).get('/reference/personas');

/**
 * Request a token and identifier to start KYC session
 * @param {string} yotiNewSessionUrl - yotiNewSessionUrl is a property off app config
 * @param {string} defaultCountryCode - "USA", constant KYC_SESSION_COUNTRY_CODE hardcoded in Application
 * @returns {StartSessionResp}
 */
export const startSession = (
    yotiNewSessionUrl: string,
    defaultCountryCode: string
) =>
    customUrlApi(yotiNewSessionUrl).post('/id-verify/start-session', {
        defaultCountryCode
    });

type DeviceRequest = {
    deviceId: string;
    deviceType: string;
    deviceOS: string;
};

type AccountRequest = {
    accountType: 'perm' | 'temp';
    device: DeviceRequest;
};

export type AccountResponse = AxiosResponse<{
    account: {
        accountType: string;
        id: string;
        device: {
            id: string;
            deviceId: string;
            deviceType: string;
            deviceOS: string;
            createdAt: string;
            updatedAt: string;
        };
        createdAt: string;
        updatedAt: string;
        didKeyMetadatum: VCLDidJwk[];
    };
    access_token: string;
    refresh_token: string;
}>;

/**
 * Protected careerwallet routes require an OAuth access token to be present in request headers.
 * This function creates a new account and sets the access token in AsyncStorage
 * only key:create scope available for this token
 * @param {IConfig} config - app config
 * @param {object} device - device info
 * @param {string} device.deviceId -
 * @param {string} device.deviceType - "phone" - hardcoded in Application
 * @param {string} device.deviceOS - 'ios' || 'android'
 * @param {string} personaEmail - optional, email of Test persona
 * to create account with constant persona's DID
 * @returns {string} Returns account id
 * @see https://velocitycareerlabs.stoplight.io/docs/velocity-apis/b510ab7e35316-create-account
 */
export const createAccount = async (
    config: IConfig,
    device: {
        deviceId: string;
        deviceType: string;
        deviceOS: string;
    },
    personaEmail?: string
) => {
    const {
        data: {
            access_token: accessToken,
            refresh_token: refreshToken,
            account: {id}
        }
    } = await walletApi(config).post<AccountRequest, AccountResponse>(
        '/api/v0.6/accounts',
        {
            account: {
                accountType: 'perm',
                device
            },
            ...(personaEmail ? {personaEmail} : {})
        }
    );
    await initOauthTokens({
        accessToken,
        refreshToken,
        accountId: id
    });

    return {accountId: id, accessToken, refreshToken};
};

/**
 * Get info about specific account
 * @param {IConfig} config
 * @param {string} accountId
 * @param {string} token - is an accessToken, stored in realm as a result of createAccount
 * @returns {AccountResponse}
 */
export const getAccount = async (
    config: IConfig,
    accountId: string,
    token: string
) => {
    const {data} = await walletApi(config, token).get<
        undefined,
        AccountResponse
    >(`/api/v0.6/accounts/${accountId}`);
    return data;
};
