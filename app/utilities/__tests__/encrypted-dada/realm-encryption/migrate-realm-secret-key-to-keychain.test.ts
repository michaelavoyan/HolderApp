import { migrateRealmSecretKeyToKeyChain } from 'app/utilities/encrypted-data/realm-encryption';
import { getDataFromSensitiveInfo } from 'app/utilities/encrypted-data/sensitive-info-repo';
import { setDataToKeyChain } from 'app/utilities/encrypted-data/keychain-repo';
import { validateKeyFormat } from 'app/utilities/encrypted-data/key-generator';
import { REALM_KEY } from 'app/utilities/encrypted-data/constants';
import { vclLogger } from 'app/utilities/logger';
import {
    mockGetDataFromSensitiveInfo,
    mockSetDataToKeyChain, mockValidateKeyFormat
} from 'app/utilities/__mocks__/encrypted-dada/mocks';

jest.mock('react-native-device-info', () => ({
    getBrand: jest.fn(),
}));

jest.mock('app/utilities/encrypted-data/sensitive-info-repo');
jest.mock('app/utilities/encrypted-data/keychain-repo');
jest.mock('app/utilities/encrypted-data/key-generator');
jest.mock('app/utilities/logger', () => ({
    vclLogger: {
        info: jest.fn(),
        warn: jest.fn(),
        error: jest.fn(),
    },
}));

describe('migrateRealmSecretKeyToKeyChain', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should migrate the realm secret key successfully when key is valid', async () => {
        mockGetDataFromSensitiveInfo.mockResolvedValue('valid-secret-key');
        mockValidateKeyFormat.mockReturnValue(true);
        mockSetDataToKeyChain.mockResolvedValue(undefined);

        await migrateRealmSecretKeyToKeyChain();

        expect(getDataFromSensitiveInfo).toHaveBeenCalledWith(REALM_KEY);
        expect(validateKeyFormat).toHaveBeenCalledWith('valid-secret-key');
        expect(setDataToKeyChain).toHaveBeenCalledWith(REALM_KEY, 'valid-secret-key');
        expect(vclLogger.info).toHaveBeenCalledWith('VCL Successfully migrated from sensitive-info to keychain.');
    });

    it('should not migrate if the secret key is missing', async () => {
        mockGetDataFromSensitiveInfo.mockResolvedValue(null);

        await migrateRealmSecretKeyToKeyChain();

        expect(getDataFromSensitiveInfo).toHaveBeenCalledWith(REALM_KEY);
        expect(validateKeyFormat).not.toHaveBeenCalled();
        expect(setDataToKeyChain).not.toHaveBeenCalled();
        expect(vclLogger.info).not.toHaveBeenCalled();
    });

    it('should not migrate if the secret key is invalid', async () => {
        mockGetDataFromSensitiveInfo.mockResolvedValue('invalid-key');
        mockValidateKeyFormat.mockReturnValue(false);

        await migrateRealmSecretKeyToKeyChain();

        expect(getDataFromSensitiveInfo).toHaveBeenCalledWith(REALM_KEY);
        expect(validateKeyFormat).toHaveBeenCalledWith('invalid-key');
        expect(setDataToKeyChain).not.toHaveBeenCalled();
        expect(vclLogger.info).not.toHaveBeenCalled();
    });

    it('should log an error if getDataFromSensitiveInfo throws an error', async () => {
        const error = new Error('Failed to get data');
        mockGetDataFromSensitiveInfo.mockRejectedValue(error);

        await migrateRealmSecretKeyToKeyChain();

        expect(vclLogger.error).toHaveBeenCalledWith(
            `VCL Migration from sensitive-info to keychain FAILED: ${JSON.stringify(error)}`
        );
    });

    it('should log an error if setDataToKeyChain throws an error', async () => {
        mockGetDataFromSensitiveInfo.mockResolvedValue('valid-secret-key');
        mockValidateKeyFormat.mockReturnValue(true);
        const error = new Error('Failed to set data');
        mockSetDataToKeyChain.mockRejectedValue(error);

        await migrateRealmSecretKeyToKeyChain();

        expect(vclLogger.error).toHaveBeenCalledWith(
            `VCL Migration from sensitive-info to keychain FAILED: ${JSON.stringify(error)}`
        );
    });
});
