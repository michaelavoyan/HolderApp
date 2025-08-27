import {SelfReportedObject} from './schema/selfReportedObject';
import {
    deleteRealmObjectsByIds,
    setObject,
    getObjectsBySchemaName
} from './common';
import {getUserId} from './asyncStorage';
import {SavedSelfReportCredential} from '../store/types/profile';

export const setSelfReported = async ({
    credential,
    jwt
}: {
    credential: SavedSelfReportCredential;
    jwt: string;
}) => {
    const userId = await getUserId();
    return setObject(SelfReportedObject.name, {
        ...credential,
        id: `${credential.id}_${userId}`,
        userId,
        jwt,
        credentialSubject: JSON.stringify(credential.credentialSubject) // credentialSubject could have different formats for all categories therefore should be stored as JSON in the Realm
    });
};

export const getSelfReported = () =>
    getObjectsBySchemaName(SelfReportedObject.name, []) as Promise<
        SavedSelfReportCredential[]
    >;

export const deleteSelfCredentialByIds = (ids: string[]) =>
    deleteRealmObjectsByIds([SelfReportedObject.name], ids);
