import {
    getOr,
    map,
    flatten,
    forEach,
    filter,
    find,
    get,
    omit,
    isObject,
    intersection,
    isEmpty
} from 'lodash/fp';
import {v4 as uuidv4} from 'uuid';

import {decodeCredentialJwt} from 'app/jwt/verifiables';
import {convertRealmObjectsToArray} from 'app/utilities/helpers';
import {vclLogger} from '../utilities/logger';
import {CredentialObject} from './schema/credentialObject';
import {CredentialSigned} from './schema/credentialSigned';
import {
    deleteRealmObjectsByIds,
    getObjectsBySchemaName,
    getVCLRealmInstance,
    setObjectsByNames
} from './common';
import {getUserId} from './asyncStorage';
import {ClaimCredentialWithCheckbox} from '../components/DisclosureRequest/types';
import {addIssuerToOffer} from '../utilities/issuer';
import {
    ClaimCredential,
    CredentialStatus,
    SetIdentityCredentialProps,
    SetCredentials
} from '../store/types/claim';
import {SavedSelfReportCredential} from '../store/types/profile';

export const setCredentials = async ({
    vfCredentials,
    vendor,
    additionalInfo,
    credentialManifest,
    vfCredentialsWithOffers
}: SetCredentials) => {
    try {
        const userId = (await getUserId())!;
        const formattedOffers = await Promise.all(
            map(async (item) => {
                let vfCredential = item;
                let manifest = credentialManifest;
                let additional = additionalInfo;
                if (isObject(item) && 'credential' in item) {
                    vfCredential = item.credential;
                    manifest = item.offer.credentialManifest;
                    additional = item.offer.additionalInfo;
                }
                const decryptedCred = decodeCredentialJwt(
                    vfCredential as string
                ) as any;
                const credential = getOr({}, 'payload', decryptedCred);

                const signed = {
                    jwt: vfCredential,
                    id: `${credential.id}_${userId}`,
                    userId,
                    realmSchemaName: CredentialSigned.name
                };
                const credWithIssuer = await addIssuerToOffer(credential);
                const dynamicRootProperties = getDynamicRootProperties(
                    credWithIssuer
                );
                const decrypted = {
                    ...credWithIssuer,
                    id: `${credential.id}_${userId}`,
                    vendorCountry: getOr('', 'country', vendor),
                    userId,
                    hash: getOr('', 'contentHash.value', credWithIssuer),
                    issuanceDate: getOr(
                        new Date().toISOString(),
                        'issuanceDate',
                        credWithIssuer
                    ),
                    realmSchemaName: CredentialObject.name,
                    additionalInfo: additional,
                    status: credWithIssuer.status || CredentialStatus.verified,
                    credentialSubject: JSON.stringify(
                        credWithIssuer.credentialSubject
                    ), // credentialSubject could have different formats for all categories therefore should be stored as JSON in the Realm
                    credentialManifest: manifest,
                    jwt: vfCredential,
                    dynamicRootProperties, // some credentials can have dynamic root properties that should be displayed alongside with credentialSubject
                };

                return [signed, decrypted];
            }, vfCredentialsWithOffers || vfCredentials)
        );
        return setObjectsByNames(flatten(formattedOffers));
    } catch (error) {
        vclLogger.error(error);
        return false;
    }
};

export const setOffers = async (offers: ClaimCredential[]) => {
    const userId = (await getUserId()) as string;

    const formattedOffers = await Promise.all(
        map(async (item) => {
            const credWithIssuer = await addIssuerToOffer(item);
            return {
                ...credWithIssuer,
                id: `${item.offerId}_${userId}`, // use offerId here to avoid of saving duplicates
                userId,
                offerId: item.id,
                hash: getOr('', 'hash', credWithIssuer),
                saveOfferDate: new Date().toISOString(),
                realmSchemaName: CredentialObject.name,
                status: item.status || CredentialStatus.offered,
                credentialSubject: JSON.stringify(
                    credWithIssuer.credentialSubject
                ), // credentialSubject could have different formats for all categories therefore should be stored as JSON in the Realm
                dynamicRootProperties: getDynamicRootProperties(item)
            };
        }, offers)
    );
    return setObjectsByNames(formattedOffers);
};

export const setUsersCredentials = async (
    credentials: (
        | SetIdentityCredentialProps
        | ClaimCredential
        | SavedSelfReportCredential
    )[]
) => {
    return setObjectsByNames(
        map(
            (item) => ({
                ...item,
                realmSchemaName: CredentialObject.name,
                id: ('id' in item && item.id) || `${uuidv4()}_${item.userId}`,
                status:
                    ('status' in item && item.status) ||
                    CredentialStatus.verified
            }),
            credentials
        )
    );
};

export const deleteAllCredentialsForAllUsers = async () => {
    try {
        const realm = await getVCLRealmInstance();
        realm.write(() => {
            const objects = realm.objects(CredentialObject.name);
            realm.delete(objects);
        });

        return true;
    } catch (error) {
        vclLogger.error(error);
        return false;
    }
};

export const getCredentials = () =>
    getObjectsBySchemaName(CredentialObject.name, []) as Promise<
        ClaimCredentialWithCheckbox[]
    >;

export const getCredentialsForAllUsers = async (): Promise<
    ClaimCredential[]
> => {
    try {
        const realm = await getVCLRealmInstance();
        const objects = realm.objects(CredentialObject.name);
        return convertRealmObjectsToArray(objects);
    } catch (error) {
        vclLogger.error(error);
        return [];
    }
};

export const getSignedCredentials = () =>
    getObjectsBySchemaName(CredentialSigned.name) as Promise<
        | {
              jwt: string;
              id: string;
              userId: string;
          }[]
        | false
    >;

export const deleteVfCredentialsByIds = (id: string[] = []) =>
    deleteRealmObjectsByIds([CredentialObject.name, CredentialSigned.name], id);

export const deleteRevokedCredentials = async () => {
    try {
        const realm = await getVCLRealmInstance();
        const userId = (await getUserId()) as string;
        const revoked = realm
            .objects(CredentialObject.name)
            .filtered(
                `userId == "${userId}" && status == "${CredentialStatus.revoked}"`
            );

        const replaced = realm
            .objects(CredentialObject.name)
            .filtered(
                `userId == "${userId}" && status == "${CredentialStatus.replaced}"`
            );
        // OR operator doesn't work in the react-native realm
        const credentials = [...revoked, ...replaced];
        const ids = map('id', credentials);

        realm.write(() => {
            forEach((id) => {
                const object = realm.objectForPrimaryKey(
                    CredentialSigned.name,
                    id
                );
                if (object) {
                    realm.delete(object);
                }
            }, ids);
            realm.delete(credentials);
        });

        return true;
    } catch (e) {
        vclLogger.error(e);
        return false;
    }
};

export const updateCredentials = async (credentials: ClaimCredential[]) => {
    try {
        const realm = await getVCLRealmInstance();
        const objects = realm.objects<ClaimCredential>(CredentialObject.name);
        const filtered = filter(
            (obj) => find(['id', obj.id], credentials),
            objects
        );
        realm.write(() => {
            forEach((obj) => {
                const changedObject = find(
                    ['id', get('id', obj)],
                    credentials
                )!;
                Object.assign(
                    obj,
                    omit('id', {
                        ...changedObject,
                        credentialSubject: JSON.stringify(
                            changedObject.credentialSubject
                        ), // credentialSubject could have different formats for all categories therefore should be stored as JSON in the Realm
                        dynamicRootProperties: JSON.stringify(changedObject.dynamicRootProperties || {}),
                    })
                );
            }, filtered);
        });
        return true;
    } catch (error) {
        vclLogger.error(error);
        return false;
    }
};

export const getCredentialsByTypes = async (types: string[]) => {
    try {
        const realm = await getVCLRealmInstance();
        const userId = await getUserId();
        const objects = realm.objects(CredentialObject.name);
        const filtered = objects.filtered(`userId = "${userId}"`);
        return filter(
            (item) => !isEmpty(intersection(item.type, types)),
            convertRealmObjectsToArray(filtered)
        );
    } catch (error) {
        vclLogger.error(error);
        return [];
    }
};

const getDynamicRootProperties = (credential: ClaimCredential) => {
    const knownProps = Object.keys(CredentialObject.properties);
    const dynamicRootProperties = Object.fromEntries(
        Object.entries(credential).filter(([key]) => !knownProps.includes(key))
    );
    return JSON.stringify(dynamicRootProperties);
};
