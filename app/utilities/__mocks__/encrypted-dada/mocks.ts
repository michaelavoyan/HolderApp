import {
    generateRandomSecretKey,
    stringToUint8Array,
    validateKeyFormat
} from 'app/utilities/encrypted-data/key-generator';
import {getDataFromKeyChain, setDataToKeyChain} from 'app/utilities/encrypted-data/keychain-repo';
import {getDataFromSensitiveInfo, setDataToSensitiveInfo} from 'app/utilities/encrypted-data/sensitive-info-repo';
import {saveSecretKey} from 'app/utilities/encrypted-data/realm-encryption';

export const mockGetDataFromKeyChain = getDataFromKeyChain as jest.Mock;
export const mockValidateKeyFormat = validateKeyFormat as jest.Mock;
export const mockStringToUint8Array = stringToUint8Array as jest.Mock;
export const mockSetDataToKeyChain = setDataToKeyChain as jest.Mock;
export const mockGenerateRandomSecretKey = generateRandomSecretKey as jest.Mock;
export const mockGetDataFromSensitiveInfo = getDataFromSensitiveInfo as jest.Mock;
export const mockSetDataToSensitiveInfo = setDataToSensitiveInfo as jest.Mock;
export const mockSaveSecretKey = saveSecretKey as jest.Mock;
