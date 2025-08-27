import {
    saveSecretKey
} from 'app/utilities/encrypted-data/realm-encryption';
import { setDataToSensitiveInfo } from 'app/utilities/encrypted-data/sensitive-info-repo';
import { setDataToKeyChain } from 'app/utilities/encrypted-data/keychain-repo';
import { vclLogger } from 'app/utilities/logger';
import { REALM_KEY } from 'app/utilities/encrypted-data/constants';

jest.mock('react-native-device-info', () => ({
    getBrand: jest.fn(),
}));

jest.mock('app/utilities/encrypted-data/sensitive-info-repo', () => ({
    setDataToSensitiveInfo: jest.fn(),
}));

jest.mock('app/utilities/encrypted-data/keychain-repo', () => ({
    setDataToKeyChain: jest.fn(),
}));

jest.mock('app/utilities/logger', () => ({
    vclLogger: {
        info: jest.fn(),
        warn: jest.fn(),
        error: jest.fn(),
    },
}));

jest.mock('app/utilities/encrypted-data/realm-encryption', () => ({
    isSamsungDevice: jest.fn(),
    saveSecretKey: jest.requireActual('app/utilities/encrypted-data/realm-encryption').saveSecretKey,
}));

describe('saveSecretKey', () => {
    const secretKey = 'test-secret-key';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should save secret key in sensitive-info only', async () => {
        await saveSecretKey(secretKey);

        expect(vclLogger.info).toHaveBeenCalledWith('VCL saves secret key in sensitive-info');
        expect(setDataToSensitiveInfo).toHaveBeenCalledWith(REALM_KEY, secretKey);
        expect(setDataToKeyChain).not.toHaveBeenCalled();
    });
});
