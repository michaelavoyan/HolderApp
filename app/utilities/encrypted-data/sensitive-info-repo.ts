import { localConfigs } from 'app/configs';
import RNSInfo, {RNSensitiveInfoOptions} from 'react-native-sensitive-info';
import { vclLogger } from 'app/utilities/logger';

export const sensitiveInfoConfig: RNSensitiveInfoOptions = {
    keychainService: localConfigs.appPackageName,
    kSecAttrSynchronizable: true,
    sharedPreferencesName: localConfigs.appPackageName
};

/**
 * Saves a key-value pair securely using react-native-sensitive-info.
 * @param username The identifier for the stored value (e.g. realm_key).
 * @param secret The value to store securely.
 */
export const setDataToSensitiveInfo = async (username: string, secret: string): Promise<void> => {
    try {
        await RNSInfo.setItem(username, secret, sensitiveInfoConfig);
        vclLogger.info(`VCL Data successfully saved to sensitive info (username: ${username})`);
    } catch (error) {
        vclLogger.error(`VCL Failed to save data to sensitive info (username: ${username}): ${JSON.stringify(error)}`);
        throw error;
    }
};

/**
 * Retrieves a value securely stored using react-native-sensitive-info.
 * @param username The identifier for the stored value (e.g. realm_key)
 * @returns The stored value or null if not found.
 */
export const getDataFromSensitiveInfo = async (username: string): Promise<string | null> => {
    try {
        const data = await RNSInfo.getItem(username, sensitiveInfoConfig);
        if (data) {
            vclLogger.info(`VCL Data retrieved from sensitive info (username: ${username}).`);
            return data;
        }
        vclLogger.warn(`VCL No data found in sensitive info (username: ${username})`);
        return null;
    } catch (error) {
        vclLogger.error(`VCL Failed to retrieve data from sensitive info (username: ${username}): ${JSON.stringify(error)}`);
        throw error;
    }
};
