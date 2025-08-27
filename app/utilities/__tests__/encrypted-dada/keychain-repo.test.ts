import {
    setDataToKeyChain,
    getDataFromKeyChain,
    setOptions,
    getOptions
} from 'app/utilities/encrypted-data/keychain-repo';
import { vclLogger } from 'app/utilities/logger';
import * as Keychain from 'react-native-keychain';
import {UserCredentials} from 'react-native-keychain';

const SERVICE_NAME = 'io.velocitycareerlabs.holderapp.dev.keychain';

jest.mock('app/utilities/logger', () => ({
    vclLogger: {
        info: jest.fn(),
        warn: jest.fn(),
        error: jest.fn(),
    },
}));

describe('Keychain Repo', () => {
    const mockUsername = 'test username';
    const mockSecret = 'test secret';

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('setDataToKeyChain', () => {
        it('should save data to keychain successfully', async () => {
            jest.spyOn(Keychain, 'setGenericPassword').mockResolvedValueOnce(false);

            await setDataToKeyChain(mockUsername, mockSecret);

            expect(Keychain.setGenericPassword).toHaveBeenCalledWith(mockUsername, mockSecret, setOptions);

            expect(vclLogger.info).toHaveBeenCalledTimes(1);
            expect(vclLogger.info).toHaveBeenCalledWith(
                expect.stringContaining('VCL Key successfully saved to (keychain setOptions'),
            );
        });


        it('should log and throw an error if saving to keychain fails', async () => {
            const error = new Error('Failed to save');
            jest.spyOn(Keychain, 'setGenericPassword').mockRejectedValueOnce(error);

            await expect(setDataToKeyChain(mockUsername, mockSecret)).rejects.toThrow(error);

            expect(vclLogger.error).toHaveBeenCalledTimes(1);
            expect(vclLogger.error).toHaveBeenCalledWith(
                expect.stringContaining('VCL Failed to save key to keychain'),
            );
        });
    });

    describe('getDataFromKeyChain', () => {
        it('should retrieve data from keychain successfully', async () => {
            const resVal: UserCredentials = {
                username: mockUsername,
                password: mockSecret,
                service: SERVICE_NAME,
                storage: Keychain.STORAGE_TYPE.AES_GCM_NO_AUTH,
            }
            jest.spyOn(Keychain, 'getGenericPassword').mockResolvedValueOnce(resVal);

            const result = await getDataFromKeyChain(mockUsername);

            expect(Keychain.getGenericPassword).toHaveBeenCalledWith({
                service: SERVICE_NAME,
            });

            expect(vclLogger.info).toHaveBeenCalledTimes(1);
            expect(vclLogger.info).toHaveBeenCalledWith(
                expect.stringContaining('VCL Key retrieved successfully from keychain (keychain getOptions'),
            );
            expect(result).toBe(mockSecret);
        });

        it('should return null if no matching username is found', async () => {
            const resVal: UserCredentials = {
                username: 'other username',
                password: 'other secret',
                service: SERVICE_NAME,
                storage: Keychain.STORAGE_TYPE.AES_GCM_NO_AUTH,
            }
            jest.spyOn(Keychain, 'getGenericPassword').mockResolvedValueOnce(resVal);

            const result = await getDataFromKeyChain(mockUsername);

            expect(Keychain.getGenericPassword).toHaveBeenCalledWith(getOptions);

            expect(vclLogger.warn).toHaveBeenCalledTimes(1);
            expect(vclLogger.warn).toHaveBeenCalledWith(
                expect.stringContaining('VCL No key found in keychain for username'),
            );

            expect(result).toBeNull();
        });

        it('should return null if no credentials are found', async () => {
            jest.spyOn(Keychain, 'getGenericPassword').mockResolvedValueOnce(false);

            const result = await getDataFromKeyChain(mockUsername);

            expect(Keychain.getGenericPassword).toHaveBeenCalledWith({ service: SERVICE_NAME });

            expect(vclLogger.warn).toHaveBeenCalledTimes(1);
            expect(vclLogger.warn).toHaveBeenCalledWith(
                expect.stringContaining('VCL No key found in keychain for username'),
            );

            expect(result).toBeFalsy();
        });

        it('should log and throw an error if retrieving from keychain fails', async () => {
            const error = new Error('Failed to retrieve');
            jest.spyOn(Keychain, 'getGenericPassword').mockRejectedValueOnce(error);

            await expect(getDataFromKeyChain(mockUsername)).rejects.toThrow(error);

            expect(vclLogger.error).toHaveBeenCalledTimes(1);
            expect(vclLogger.error).toHaveBeenCalledWith(
                expect.stringContaining('VCL Failed to retrieve key from keychain'),
            );
        });
    });

    describe('keychain config', () => {
        it('setOptions content test', () => {
            const {service, cloudSync, securityLevel, storage, accessible} = setOptions;
            expect(service?.startsWith('io.velocitycareerlabs.holderapp.')).toBeTruthy();
            expect(service?.endsWith('keychain')).toBeTruthy();
            expect(cloudSync).toBeTruthy();
            expect(securityLevel).toBe(Keychain.SECURITY_LEVEL.SECURE_SOFTWARE);
            expect(accessible).toBe(Keychain.ACCESSIBLE.ALWAYS);
            expect(storage).toBe(Keychain.STORAGE_TYPE.AES_GCM_NO_AUTH);
        });
    });
});
