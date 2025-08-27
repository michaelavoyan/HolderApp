import {getDataFromSensitiveInfo, setDataToSensitiveInfo} from 'app/utilities/encrypted-data/sensitive-info-repo';
import { getDataFromKeyChain, setDataToKeyChain } from 'app/utilities/encrypted-data/keychain-repo';
import { stringToUint8Array, generateRandomSecretKey, validateKeyFormat } from 'app/utilities/encrypted-data/key-generator';
import { REALM_KEY } from 'app/utilities/encrypted-data/constants';
import { vclLogger } from 'app/utilities/logger';

export const getStoredRealmSecretKeyCommon = async (): Promise<Uint8Array> => {
    try {
        const realmSecretKey = await retrieveSecretKey();
        if (realmSecretKey && validateKeyFormat(realmSecretKey)) {
            vclLogger.info('VCL Existing Realm secret key retrieved successfully.');
            return stringToUint8Array(realmSecretKey);
        }
        vclLogger.warn('VCL Realm secret key not found in keychain => going to generate a new secret key.');
    } catch (error) {
        vclLogger.error(`VCL Failed to retrieve Realm key: ${JSON.stringify(error)}`);
    }

    const { secretKeyUint8Array, secretKeyString } = generateRandomSecretKey();
    vclLogger.info('VCL New Realm secret key generated successfully.');
    try {
        await saveSecretKey(secretKeyString);
        vclLogger.info('VCL New Realm secret key saved successfully.');
    } catch (error) {
        vclLogger.error(`VCL Failed to save new Realm secret key: ${JSON.stringify(error)}`);
    }
    return secretKeyUint8Array;
};

export const migrateRealmSecretKeyToKeyChain = async (): Promise<void> => {
    try {
        const realmSecretKey = await getDataFromSensitiveInfo(REALM_KEY);
        if (realmSecretKey && validateKeyFormat(realmSecretKey)) {
            await setDataToKeyChain(REALM_KEY, realmSecretKey);
            vclLogger.info('VCL Successfully migrated from sensitive-info to keychain.');
        }
    } catch (error) {
        vclLogger.error(`VCL Migration from sensitive-info to keychain FAILED: ${JSON.stringify(error)}`);
    }
}

export const migrateRealmSecretKeyToSensitiveInfo = async (): Promise<void> => {
    try {
        const realmSecretKey = await getDataFromKeyChain(REALM_KEY);
        if (realmSecretKey && validateKeyFormat(realmSecretKey)) {
            await setDataToSensitiveInfo(REALM_KEY, realmSecretKey);
            vclLogger.info('VCL Successfully migrated from keychain to sensitive-info.');
        }
    } catch (error) {
        vclLogger.error(`VCL Migration from keychain to sensitive-info FAILED: ${JSON.stringify(error)}`);
    }
}

export const saveSecretKey = async (realmSecretKey: string) => {
    vclLogger.info('VCL saves secret key in sensitive-info');
    await setDataToSensitiveInfo(REALM_KEY, realmSecretKey);
}

export const retrieveSecretKey = async () => {
    vclLogger.info('VCL retrieves secret key from sensitive-info.');
    return await getDataFromSensitiveInfo(REALM_KEY);
}

/**
 * Externally invoked.
 *
 * Migrated to `sensitive-info` and retrieves the stored Realm secret key, using `getStoredRealmSecretKeyCommon()`
 *
 * @returns {Promise<Uint8Array>} A promise that resolves to the stored Realm secret key.
 */
export const getStoredRealmSecretKey = async (): Promise<Uint8Array> => {
    vclLogger.info('VCL migrates from keychain to sensitive-info.');
    await migrateRealmSecretKeyToSensitiveInfo();
    return await getStoredRealmSecretKeyCommon();
};
