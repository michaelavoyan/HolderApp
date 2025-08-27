import * as Keychain from 'react-native-keychain';
import { vclLogger } from 'app/utilities/logger';
import { localConfigs } from 'app/configs';

export const SERVICE_NAME = `${localConfigs.appPackageName}.keychain`;

export const setOptions: Keychain.SetOptions = {
    service: SERVICE_NAME,
    cloudSync: true,
    securityLevel: Keychain.SECURITY_LEVEL.SECURE_SOFTWARE,
    accessible: Keychain.ACCESSIBLE.ALWAYS,
    storage: Keychain.STORAGE_TYPE.AES_GCM_NO_AUTH,
};

export const getOptions: Keychain.GetOptions = {
    service: SERVICE_NAME,
};

/**
 * Saves the encryption key securely in the keychain.
 * @param username The identifier for the stored value (e.g. realm_key).
 * @param secret The encryption key to store.
 */
export const setDataToKeyChain = async (username: string, secret: string): Promise<void> => {
    try {
        await Keychain.setGenericPassword(username, secret, setOptions);
        vclLogger.info(
            `VCL Key successfully saved to (keychain setOptions: ${JSON.stringify(setOptions)}, username: ${username}).`
        );
    } catch (error) {
        vclLogger.error(
            `VCL Failed to save key to keychain (keychain setOptions: ${JSON.stringify(setOptions)}, username: ${username}): ${JSON.stringify(error)}`
        );
        throw error;
    }
};

/**
 * Retrieves the encryption key securely from the keychain.
 * @param username The identifier for the stored value (e.g. realm_key).
 * @returns The encryption key, or null if not found.
 */
export const getDataFromKeyChain = async (username: string): Promise<string | null> => {
    try {
        const credentials = await Keychain.getGenericPassword(getOptions);
        if (credentials && credentials?.username === username) {
            vclLogger.info(
                `VCL Key retrieved successfully from keychain (keychain getOptions: ${JSON.stringify(getOptions)}, USERNAME: ${username}).`
            );
            return credentials?.password;
        }
        vclLogger.warn(`VCL No key found in keychain for username "${username}".`);
        return null;
    } catch (error) {
        vclLogger.error(`VCL Failed to retrieve key from keychain: ${JSON.stringify(error)}`);
        throw error;
    }
};
