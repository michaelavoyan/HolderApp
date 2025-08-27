import { migrateRealmSecretKeyToSensitiveInfo } from 'app/utilities/encrypted-data/realm-encryption';
import { setDataToSensitiveInfo} from 'app/utilities/encrypted-data/sensitive-info-repo';
import { getDataFromKeyChain, setDataToKeyChain } from 'app/utilities/encrypted-data/keychain-repo';
import { validateKeyFormat } from 'app/utilities/encrypted-data/key-generator';
import { REALM_KEY } from 'app/utilities/encrypted-data/constants';
import { vclLogger } from 'app/utilities/logger';
import {
    mockGetDataFromKeyChain,
    mockSetDataToSensitiveInfo,
    mockValidateKeyFormat
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

describe('migrateRealmSecretKeyToSensitiveInfo', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should migrate the realm secret key successfully when key is valid', async () => {
        mockGetDataFromKeyChain.mockResolvedValue('valid-secret-key');
        mockValidateKeyFormat.mockReturnValue(true);
        mockSetDataToSensitiveInfo.mockResolvedValue(undefined);

        await migrateRealmSecretKeyToSensitiveInfo();

        expect(getDataFromKeyChain).toHaveBeenCalledWith(REALM_KEY);
        expect(validateKeyFormat).toHaveBeenCalledWith('valid-secret-key');
        expect(setDataToSensitiveInfo).toHaveBeenCalledWith(REALM_KEY, 'valid-secret-key');
        expect(vclLogger.info).toHaveBeenCalledWith('VCL Successfully migrated from keychain to sensitive-info.');
    });

    it('should not migrate if the secret key is missing', async () => {
        mockGetDataFromKeyChain.mockResolvedValue(null);

        await migrateRealmSecretKeyToSensitiveInfo();

        expect(getDataFromKeyChain).toHaveBeenCalledWith(REALM_KEY);
        expect(validateKeyFormat).not.toHaveBeenCalled();
        expect(setDataToKeyChain).not.toHaveBeenCalled();
        expect(vclLogger.info).not.toHaveBeenCalled();
    });

    it('should not migrate if the secret key is invalid', async () => {
        mockGetDataFromKeyChain.mockResolvedValue('invalid-key');
        mockValidateKeyFormat.mockReturnValue(false);

        await migrateRealmSecretKeyToSensitiveInfo();

        expect(getDataFromKeyChain).toHaveBeenCalledWith(REALM_KEY);
        expect(validateKeyFormat).toHaveBeenCalledWith('invalid-key');
        expect(setDataToKeyChain).not.toHaveBeenCalled();
        expect(vclLogger.info).not.toHaveBeenCalled();
    });

    it('should log an error if getDataFromKeyChain throws an error', async () => {
        const error = new Error('Failed to get data');
        mockGetDataFromKeyChain.mockRejectedValue(error);

        await migrateRealmSecretKeyToSensitiveInfo();

        expect(vclLogger.error).toHaveBeenCalledWith(
            `VCL Migration from keychain to sensitive-info FAILED: ${JSON.stringify(error)}`
        );
    });

    it('should log an error if setDataToSensitiveInfo throws an error', async () => {
        mockGetDataFromKeyChain.mockResolvedValue('valid-secret-key');
        mockValidateKeyFormat.mockReturnValue(true);
        const error = new Error('Failed to set data');
        mockSetDataToSensitiveInfo.mockRejectedValue(error);

        await migrateRealmSecretKeyToSensitiveInfo();

        expect(vclLogger.error).toHaveBeenCalledWith(
            `VCL Migration from keychain to sensitive-info FAILED: ${JSON.stringify(error)}`
        );
    });
});
