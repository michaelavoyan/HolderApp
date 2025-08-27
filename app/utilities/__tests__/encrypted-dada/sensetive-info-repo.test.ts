import {
    setDataToSensitiveInfo,
    getDataFromSensitiveInfo,
    sensitiveInfoConfig
} from 'app/utilities/encrypted-data/sensitive-info-repo';
import RNSInfo from 'react-native-sensitive-info';
import { vclLogger } from 'app/utilities/logger';

jest.mock('app/utilities/logger', () => ({
    vclLogger: {
        info: jest.fn(),
        warn: jest.fn(),
        error: jest.fn(),
    },
}));
jest.mock('react-native-sensitive-info');

describe('Sensitive Info Repo', () => {

    const mockUsername = 'test username';
    const mockSecret = 'test secret';
    const mockError = new Error('Mock Error');

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('setDataToSensitiveInfo', () => {

        it('should save data successfully', async () => {
            (RNSInfo.setItem as jest.Mock).mockResolvedValueOnce(undefined);

            await expect(setDataToSensitiveInfo(mockUsername, mockSecret)).resolves.toBeUndefined();

            expect(RNSInfo.setItem).toHaveBeenCalledWith(mockUsername, mockSecret, sensitiveInfoConfig);
            expect(vclLogger.info).toHaveBeenCalledWith(
                `VCL Data successfully saved to sensitive info (username: ${mockUsername})`
            );
        });

        it('should log error and throw when saving fails', async () => {
            (RNSInfo.setItem as jest.Mock).mockRejectedValueOnce(mockError);

            await expect(setDataToSensitiveInfo(mockUsername, mockSecret)).rejects.toThrow(mockError);

            expect(RNSInfo.setItem).toHaveBeenCalledWith(mockUsername, mockSecret, sensitiveInfoConfig);
            expect(vclLogger.error).toHaveBeenCalledWith(
                `VCL Failed to save data to sensitive info (username: ${mockUsername}): ${JSON.stringify(mockError)}`
            );
        });

    });

    describe('getDataFromSensitiveInfo', () => {

        it('should retrieve data successfully', async () => {
            (RNSInfo.getItem as jest.Mock).mockResolvedValueOnce(mockSecret);

            await expect(getDataFromSensitiveInfo(mockUsername)).resolves.toBe(mockSecret);

            expect(RNSInfo.getItem).toHaveBeenCalledWith(mockUsername, sensitiveInfoConfig);
            expect(vclLogger.info).toHaveBeenCalledWith(
                `VCL Data retrieved from sensitive info (username: ${mockUsername}).`
            );
        });

        it('should return null when no data is found', async () => {
            (RNSInfo.getItem as jest.Mock).mockResolvedValueOnce(null);

            await expect(getDataFromSensitiveInfo(mockUsername)).resolves.toBeNull();

            expect(RNSInfo.getItem).toHaveBeenCalledWith(mockUsername, sensitiveInfoConfig);
            expect(vclLogger.warn).toHaveBeenCalledTimes(1);
            expect(vclLogger.warn).toHaveBeenCalledWith(
                `VCL No data found in sensitive info (username: ${mockUsername})`
            );
        });

        it('should log error and throw when retrieval fails', async () => {
            (RNSInfo.getItem as jest.Mock).mockRejectedValueOnce(mockError);

            await expect(getDataFromSensitiveInfo(mockUsername)).rejects.toThrow(mockError);

            expect(RNSInfo.getItem).toHaveBeenCalledWith(mockUsername, sensitiveInfoConfig);
            expect(vclLogger.error).toHaveBeenCalledTimes(1);
            expect(vclLogger.error).toHaveBeenCalledWith(
                `VCL Failed to retrieve data from sensitive info (username: ${mockUsername}): ${JSON.stringify(mockError)}`
            );
        });

    });

    describe('Edge Cases', () => {

        it('should handle special characters in username and secret', async () => {
            const specialUsername = 'user!@#';
            const specialSecret = 'secret$%^';
            (RNSInfo.setItem as jest.Mock).mockResolvedValueOnce(undefined);
            (RNSInfo.getItem as jest.Mock).mockResolvedValueOnce(specialSecret);

            await expect(setDataToSensitiveInfo(specialUsername, specialSecret)).resolves.toBeUndefined();
            await expect(getDataFromSensitiveInfo(specialUsername)).resolves.toBe(specialSecret);

            expect(RNSInfo.setItem).toHaveBeenCalledWith(specialUsername, specialSecret, sensitiveInfoConfig);
            expect(RNSInfo.getItem).toHaveBeenCalledWith(specialUsername, sensitiveInfoConfig);
        });

        it('should handle empty strings as username and secret', async () => {
            const emptyUsername = '';
            const emptySecret = '';
            (RNSInfo.setItem as jest.Mock).mockResolvedValueOnce(undefined);
            (RNSInfo.getItem as jest.Mock).mockResolvedValueOnce(emptySecret);

            await expect(setDataToSensitiveInfo(emptyUsername, emptySecret)).resolves.toBeUndefined();
            await expect(getDataFromSensitiveInfo(emptyUsername)).resolves.toBe(null);

            expect(RNSInfo.setItem).toHaveBeenCalledWith(emptyUsername, emptySecret, sensitiveInfoConfig);
            expect(RNSInfo.getItem).toHaveBeenCalledWith(emptyUsername, sensitiveInfoConfig);
        });

    });

    describe('sensitive info config', () => {
        it('sensitiveInfoConfig test', () => {
            const { keychainService, kSecAttrSynchronizable, sharedPreferencesName } = sensitiveInfoConfig;
            expect(keychainService?.startsWith('io.velocitycareerlabs.holderapp.')).toBeTruthy();
            expect(kSecAttrSynchronizable).toBeTruthy();
            expect(sharedPreferencesName?.startsWith('io.velocitycareerlabs.holderapp.')).toBeTruthy();
        });
    });
});
