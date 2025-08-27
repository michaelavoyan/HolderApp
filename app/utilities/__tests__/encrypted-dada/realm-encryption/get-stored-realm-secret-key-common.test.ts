import {
    getStoredRealmSecretKeyCommon,
    retrieveSecretKey,
    saveSecretKey
} from 'app/utilities/encrypted-data/realm-encryption';
import {
    stringToUint8Array,
    validateKeyFormat,
    generateRandomSecretKey
} from 'app/utilities/encrypted-data/key-generator';
import {vclLogger} from 'app/utilities/logger';

jest.mock('app/utilities/encrypted-data/keychain-repo', () => ({
    getDataFromKeyChain: jest.fn(),
    setDataToKeyChain: jest.fn()
}));

jest.mock('app/utilities/encrypted-data/key-generator', () => ({
    stringToUint8Array: jest.fn(),
    validateKeyFormat: jest.fn(),
    generateRandomSecretKey: jest.fn(() => ({
        secretKeyString: 'mockSecretKeyString',
        secretKeyUint8Array: new Uint8Array([1, 2, 3, 4])
    }))
}));

jest.mock('app/utilities/logger', () => ({
    vclLogger: {
        info: jest.fn(),
        warn: jest.fn(),
        error: jest.fn()
    }
}));

const retrieveSecretKeySpy = jest.spyOn(
    require('app/utilities/encrypted-data/realm-encryption'),
    'retrieveSecretKey'
);
const saveSecretKeySpy = jest.spyOn(
    require('app/utilities/encrypted-data/realm-encryption'),
    'saveSecretKey'
);

describe('getStoredRealmSecretKeyCommon', () => {
    const mockSecretKey = 'mockSecretKey';
    const mockSecretKeyUint8Array = new Uint8Array([1, 2, 3, 4]);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return the existing valid secret key', async () => {
        (retrieveSecretKey as jest.Mock).mockResolvedValue(mockSecretKey);
        (validateKeyFormat as jest.Mock).mockReturnValue(true);
        (stringToUint8Array as jest.Mock).mockReturnValue(
            mockSecretKeyUint8Array
        );

        const result = await getStoredRealmSecretKeyCommon();

        expect(retrieveSecretKeySpy).toHaveBeenCalledTimes(1);
        expect(validateKeyFormat).toHaveBeenCalledWith(mockSecretKey);
        expect(stringToUint8Array).toHaveBeenCalledWith(mockSecretKey);
        expect(vclLogger.info).toHaveBeenCalledWith(
            'VCL Existing Realm secret key retrieved successfully.'
        );
        expect(result).toEqual(mockSecretKeyUint8Array);
    });

    it('should generate and return a new secret key if the existing key is invalid', async () => {
        (retrieveSecretKey as jest.Mock).mockResolvedValue(mockSecretKey);
        (validateKeyFormat as jest.Mock).mockReturnValue(false);
        (generateRandomSecretKey as jest.Mock).mockReturnValue({
            secretKeyString: 'newSecretKey',
            secretKeyUint8Array: mockSecretKeyUint8Array
        });

        const result = await getStoredRealmSecretKeyCommon();

        expect(retrieveSecretKeySpy).toHaveBeenCalledTimes(1);
        expect(validateKeyFormat).toHaveBeenCalledWith(mockSecretKey);
        expect(generateRandomSecretKey).toHaveBeenCalledTimes(1);
        expect(saveSecretKeySpy).toHaveBeenCalledWith('newSecretKey');
        expect(result).toEqual(mockSecretKeyUint8Array);
    });

    it('should handle an error when retrieving the secret key and generate a new one', async () => {
        (retrieveSecretKey as jest.Mock).mockRejectedValue(
            new Error('Retrieval failed')
        );
        (generateRandomSecretKey as jest.Mock).mockReturnValue({
            secretKeyString: 'newSecretKey',
            secretKeyUint8Array: mockSecretKeyUint8Array
        });

        const result = await getStoredRealmSecretKeyCommon();

        expect(retrieveSecretKeySpy).toHaveBeenCalledTimes(1);
        expect(vclLogger.error).toHaveBeenCalledWith(
            expect.stringContaining('VCL Failed to retrieve Realm key')
        );
        expect(generateRandomSecretKey).toHaveBeenCalledTimes(1);
        expect(saveSecretKeySpy).toHaveBeenCalledWith('newSecretKey');
        expect(result).toEqual(mockSecretKeyUint8Array);
    });

    it('should generate a new secret key if no key is found', async () => {
        (retrieveSecretKey as jest.Mock).mockResolvedValue(null);
        (generateRandomSecretKey as jest.Mock).mockReturnValue({
            secretKeyString: 'newSecretKey',
            secretKeyUint8Array: mockSecretKeyUint8Array
        });

        const result = await getStoredRealmSecretKeyCommon();

        expect(retrieveSecretKeySpy).toHaveBeenCalledTimes(1);
        expect(vclLogger.warn).toHaveBeenCalledWith(
            'VCL Realm secret key not found in keychain => going to generate a new secret key.'
        );
        expect(generateRandomSecretKey).toHaveBeenCalledTimes(1);
        expect(saveSecretKey).toHaveBeenCalledWith('newSecretKey');
        expect(result).toEqual(mockSecretKeyUint8Array);
    });

    it('should log an error if saving the new secret key fails', async () => {
        (retrieveSecretKey as jest.Mock).mockResolvedValue(null);
        (generateRandomSecretKey as jest.Mock).mockReturnValue({
            secretKeyString: 'newSecretKey',
            secretKeyUint8Array: mockSecretKeyUint8Array
        });
        (saveSecretKey as jest.Mock).mockRejectedValue(
            new Error('Save failed')
        );

        const result = await getStoredRealmSecretKeyCommon();

        expect(retrieveSecretKeySpy).toHaveBeenCalledTimes(1);
        expect(generateRandomSecretKey).toHaveBeenCalledTimes(1);
        expect(saveSecretKeySpy).toHaveBeenCalledWith('newSecretKey');
        expect(vclLogger.error).toHaveBeenCalledWith(
            expect.stringContaining('VCL Failed to save new Realm secret key')
        );
        expect(result).toEqual(mockSecretKeyUint8Array);
    });
});
