import {map} from 'lodash/fp';

import {PushStorageModel} from 'app/store/types/push';
import {Push} from './schema/push';
import {
    setObject,
    getObjectsBySchemaName,
    setObjectsByNames,
    getVCLRealmInstance
} from './common';
import {convertRealmObjectToObject} from '../utilities/helpers';
import {getUserId} from './asyncStorage';
import {vclLogger} from '../utilities/logger';

export const setPushEntity = async (push: PushStorageModel) => {
    const userId = await getUserId();

    return setObject(Push.name, {
        ...push,
        userId
    });
};

export const setPushes = async (pushes: PushStorageModel[]) => {
    const userId = await getUserId();

    return setObjectsByNames(
        map(
            push => ({
                realmSchemaName: Push.name,
                ...push,
                userId
            }),
            pushes
        )
    );
};

export const getPushEntity = () => getObjectsBySchemaName(Push.name);

export const getPushById = async (id: string) => {
    try {
        const realm = await getVCLRealmInstance();
        const realmObject = realm.objectForPrimaryKey<PushStorageModel>(
            Push.name,
            id
        );
        if (realmObject) {
            return convertRealmObjectToObject<PushStorageModel>(realmObject);
        }
        return false;
    } catch (error) {
        vclLogger.error(error);
        return false;
    }
};
