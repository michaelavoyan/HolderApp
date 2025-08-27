import Realm from 'realm';
import {forEach, filter, includes, get, isEmpty, intersection} from 'lodash/fp';
import {vclLogger} from '../utilities/logger';
import {schema} from './schema';
import {CredentialObject} from './schema/credentialObject';
import {CredentialSigned} from './schema/credentialSigned';
import {Disclosure} from './schema/disclosure';
import {SelfReportedObject} from './schema/selfReportedObject';
import {ClaimCredential} from '../store/types/claim';
import {convertRealmObjectsToArray, prepareObject} from '../utilities/helpers';
import {getUserId} from './asyncStorage';
import {CredentialToUpdate} from '../store/types/profile';
import {getStoredRealmSecretKey} from '../utilities/encrypted-data/realm-encryption';

const REALM_ENCRYPTED_FILE_PATH = 'encrypted.realm';

let vclRealmInstance: Promise<Realm> | undefined;

const isRealmNotInitialized = () => !vclRealmInstance;

const isOldUnencryptedRealmFileExists = () =>
    Realm.exists({
        ...schema
    });

const copyRealmToEncryptedFile = async (encryptionKey: Uint8Array) => {
    const oldRealmInstance = await Realm.open(schema);

    oldRealmInstance.writeCopyTo({
        path: oldRealmInstance.path.replace(
            'default.realm',
            REALM_ENCRYPTED_FILE_PATH
        ),
        encryptionKey
    });

    oldRealmInstance.close();
};

const deleteOldUnencryptedRealmFile = () => Realm.deleteFile(schema);

const getRealm = async () => {
    const encryptionKey = await getStoredRealmSecretKey();
    vclLogger.info(`getRealm - encryptionKey: ${encryptionKey}`);
    if (isOldUnencryptedRealmFileExists()) {
        await copyRealmToEncryptedFile(encryptionKey);

        deleteOldUnencryptedRealmFile();
    }

    return Realm.open({
        ...schema,
        encryptionKey,
        path: REALM_ENCRYPTED_FILE_PATH
    });
};

export const getVCLRealmInstance = async () => {
    if (isRealmNotInitialized()) {
        vclRealmInstance = getRealm();
    }

    const realm = await vclRealmInstance;
    if (realm?.isClosed) {
        return await getRealm();
    }
    return await vclRealmInstance!;
};

export const resetVclRealmInstance = () => {
    vclRealmInstance = undefined;
};

export const setObject = async (
    name: string,
    object: {[prop: string]: any}
) => {
    try {
        const realm = await getVCLRealmInstance();
        realm.write(() => {
            prepareObject(object);
            // Use 'true' as the third parameter to update an existing object if it exists
            realm.create(name, object, true);
        });
        return true;
    } catch (error) {
        vclLogger.error(error);
        return false;
    }
};

export const setObjectsByNames = async <T>(
    objects: (T & {realmSchemaName: string})[]
) => {
    try {
        const realm = await getVCLRealmInstance();
        realm.write(() => {
            forEach((item) => {
                prepareObject(item);

                realm.create(
                    item.realmSchemaName,
                    item,
                    Realm.UpdateMode.Modified
                );
            }, objects);
        });

        return true;
    } catch (error) {
        vclLogger.error(error);
        return false;
    }
};

export const deleteRealmObjectsByUserId = async (
    names: string[],
    exceptDefaultCredentials: boolean = false,
    exceptedCredentialsTypes: string[]
) => {
    try {
        const realm = await getVCLRealmInstance();
        const userId = await getUserId();
        realm.write(() => {
            forEach((name) => {
                const objects = realm.objects(name);
                let filteredObjects: any = objects.filtered(
                    `userId == "${userId}"`
                );
                if (
                    exceptDefaultCredentials &&
                    name === CredentialObject.name
                ) {
                    filteredObjects = objects.filtered(
                        `userId == "${userId}" && default != true`
                    );
                }
                if (
                    !isEmpty(exceptedCredentialsTypes) &&
                    name === CredentialObject.name
                ) {
                    filteredObjects = filter(
                        (item) =>
                            isEmpty(
                                intersection(
                                    exceptedCredentialsTypes,
                                    get('type', item)
                                )
                            ),
                        filteredObjects
                    );
                }
                realm.delete(filteredObjects);
            }, names);
        });

        return true;
    } catch (error) {
        vclLogger.error(error);
        return false;
    }
};

export const deleteRealmObjectsByIds = async (
    names: string[],
    ids: string[]
) => {
    try {
        const realm = await getVCLRealmInstance();
        realm.write(() => {
            forEach((name) => {
                const objects = realm.objects(name);
                const filtered = filter(
                    (obj) => includes(get('id', obj), ids),
                    objects
                );
                if (!isEmpty(filtered)) {
                    realm.delete(filtered);
                }
            }, names);
        });

        return true;
    } catch (error) {
        vclLogger.error(error);
        return false;
    }
};

export const updateCredential = async (
    credential: CredentialToUpdate,
    isVerified: boolean
) => {
    try {
        const realm = await getVCLRealmInstance();
        const {id, credentialSubject, dynamicRootProperties, ...other} = credential;
        const object = realm.objectForPrimaryKey<ClaimCredential>(
            isVerified ? CredentialObject.name : SelfReportedObject.name,
            id
        );
        if (object) {
            realm.write(() => {
                Object.assign(object, {
                    ...other,
                    ...(credentialSubject
                        ? {credentialSubject: JSON.stringify(credentialSubject)}
                        : {}), // credentialSubject could have different formats for all categories therefore should be stored as JSON in the Realm
                    ...(dynamicRootProperties
                        ? {dynamicRootProperties: JSON.stringify(dynamicRootProperties)}
                        : {})
                });
            });
        }
        return true;
    } catch (error) {
        vclLogger.error(error);
        return false;
    }
};

export const getObjectsBySchemaName = async (
    name: string,
    errorValue: any = false
) => {
    try {
        const realm = await getVCLRealmInstance();
        const userId = await getUserId();
        const objects = realm.objects(name);
        const filtered = objects.filtered(`userId = "${userId}"`);
        return convertRealmObjectsToArray(filtered);
    } catch (error) {
        vclLogger.error(error);
        return errorValue;
    }
};

export const resetDataFromRealm = (exceptedCredentialsTypes: string[] = []) =>
    deleteRealmObjectsByUserId(
        [
            Disclosure.name,
            CredentialObject.name,
            CredentialSigned.name,
            SelfReportedObject.name
        ],
        true,
        exceptedCredentialsTypes
    );
