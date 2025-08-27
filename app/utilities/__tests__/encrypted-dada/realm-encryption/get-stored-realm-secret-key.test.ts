import { getStoredRealmSecretKey } from 'app/utilities/encrypted-data/realm-encryption';

jest.mock('react-native-device-info', () => ({
    getBrand: jest.fn(),
}));

jest.mock('app/utilities/encrypted-data/sensitive-info-repo');
jest.mock('app/utilities/encrypted-data/keychain-repo');

jest.mock('app/utilities/encrypted-data/key-generator', () => ({
    stringToUint8Array: jest.fn(),
    generateRandomSecretKey: jest.fn().mockReturnValue({
        secretKeyUint8Array: new Uint8Array([1, 2, 3, 4]),
        secretKeyString: 'mockKeyString',
    }),
    validateKeyFormat: jest.fn(),
}));

jest.mock('app/utilities/logger', () => ({
    vclLogger: {
        info: jest.fn(),
        warn: jest.fn(),
        error: jest.fn(),
    },
}));

const migrateRealmSecretKeyToKeyChainSpy =
    jest.spyOn(require('app/utilities/encrypted-data/realm-encryption'), 'migrateRealmSecretKeyToKeyChain');
const migrateRealmSecretKeyToSensitiveInfoSpy =
    jest.spyOn(require('app/utilities/encrypted-data/realm-encryption'), 'migrateRealmSecretKeyToSensitiveInfo');


describe('getStoredRealmSecretKey', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call migrateRealmSecretKeyToSensitiveInfo', async () => {
        await getStoredRealmSecretKey();

        expect(migrateRealmSecretKeyToSensitiveInfoSpy).toHaveBeenCalledTimes(1);
        expect(migrateRealmSecretKeyToKeyChainSpy).not.toHaveBeenCalled();
    });
});
