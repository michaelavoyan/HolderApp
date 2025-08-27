import Realm from 'realm';
import {forEach} from 'lodash/fp';
import {FullUser, Users, UserToUpdate} from 'app/store/types/auth';

import {User} from './schema/user';
import {getVCLRealmInstance, setObject} from './common';
import {getUserId} from './asyncStorage';
import {
    convertRealmObjectsToArray,
    convertRealmObjectToObject
} from '../utilities/helpers';
import {vclLogger} from '../utilities/logger';

export const addUser = (user: FullUser) => {
    return setObject(User.name, user);
};

export const addUsers = async (users: Users) => {
    try {
        const realm = await getVCLRealmInstance();
        realm.write(() => {
            forEach(
                item =>
                    realm.create(User.name, item, Realm.UpdateMode.Modified),
                users
            );
        });

        return true;
    } catch (error) {
        vclLogger.error(error);
        return false;
    }
};

export const deleteUsers = async (users: Users) => {
    try {
        const realm = await getVCLRealmInstance();
        realm.write(() => {
            users.forEach(user => {
                const object = realm.objectForPrimaryKey(User.name, user.id);
                realm.delete(object);
            });
        });

        return true;
    } catch (error) {
        vclLogger.error(error);
        return false;
    }
};

export const updateUser = async (user: UserToUpdate) => {
    try {
        const realm = await getVCLRealmInstance();
        const {id, ...userDetails} = user;
        const realmUser = realm.objectForPrimaryKey<FullUser>(User.name, id);
        if (realmUser) {
            realm.write(() => {
                Object.assign(realmUser, userDetails);
            });

            return true;
        }
        return false;
    } catch (error) {
        vclLogger.error(error);
        return false;
    }
};

export const getUser = async (): Promise<FullUser | false> => {
    try {
        const userId = await getUserId();
        if (userId === null) {
            return false;
        }
        const realm = await getVCLRealmInstance();
        const realmUser = realm.objectForPrimaryKey<FullUser>(
            User.name,
            userId
        );
        if (realmUser) {
            return convertRealmObjectToObject<FullUser>(realmUser);
        }

        return false;
    } catch (error) {
        vclLogger.error(error);
        return false;
    }
};

export const getUsers = async (): Promise<FullUser[]> => {
    try {
        const realm = await getVCLRealmInstance();
        const users = realm.objects<FullUser>(User.name);
        return convertRealmObjectsToArray<FullUser>(users);
    } catch (error) {
        vclLogger.error(error);
        return [];
    }
};

export const deleteAllUsers = async () => {
    try {
        const realm = await getVCLRealmInstance();
        realm.write(() => {
            const objects = realm.objects(User.name);
            realm.delete(objects);
        });

        return true;
    } catch (error) {
        vclLogger.error(error);
        return false;
    }
};
