import { getDataFromSensitiveInfo } from 'app/utilities/encrypted-data/sensitive-info-repo';
import { getDataFromKeyChain } from 'app/utilities/encrypted-data/keychain-repo';
import { retrieveSecretKey } from 'app/utilities/encrypted-data/realm-encryption';
import { REALM_KEY } from 'app/utilities/encrypted-data/constants';
import { mockGetDataFromSensitiveInfo } from 'app/utilities/__mocks__/encrypted-dada/mocks';

jest.mock('react-native-device-info', () => ({
    getBrand: jest.fn(),
}));

jest.mock('app/utilities/encrypted-data/sensitive-info-repo', () => ({
    getDataFromSensitiveInfo: jest.fn(),
}));

jest.mock('app/utilities/encrypted-data/keychain-repo', () => ({
    getDataFromKeyChain: jest.fn(),
}));

jest.mock('app/utilities/logger', () => ({
    vclLogger: {
        info: jest.fn(),
        warn: jest.fn(),
        error: jest.fn(),
    },
}));

jest.mock('app/utilities/encrypted-data/realm-encryption', () => ({
    retrieveSecretKey: jest.requireActual('app/utilities/encrypted-data/realm-encryption').retrieveSecretKey,
}));

describe('retrieveSecretKey', () => {
    const secretKey = 'test-secret-key';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should retrieve secret key from sensitive-info', async () => {
        mockGetDataFromSensitiveInfo.mockResolvedValue(secretKey);

        const result = await retrieveSecretKey();

        expect(getDataFromSensitiveInfo).toHaveBeenCalledWith(REALM_KEY);
        expect(getDataFromKeyChain).not.toHaveBeenCalled();
        expect(result).toBe(secretKey);
    });
});
