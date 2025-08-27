import {AcceptedDisclosureRequestObject} from 'app/store/types/disclosure';
import {trackDisclosureSent} from 'app/mixpanel/utils';

import {Disclosure} from './schema/disclosure';
import {setObject, getObjectsBySchemaName, getVCLRealmInstance} from './common';
import {getUserId} from './asyncStorage';
import {convertRealmObjectToObject} from '../utilities/helpers';
import {vclLogger} from '../utilities/logger';

export const setDisclosure = async (
    disclosure: AcceptedDisclosureRequestObject
) => {
    trackDisclosureSent(disclosure);
    const userId = (await getUserId()) as string;
    return setObject(Disclosure.name, {
        ...disclosure,
        id: `${disclosure.id}_${userId}`,
        userId
    });
};

export const getDisclosures = () => getObjectsBySchemaName(Disclosure.name, []);

export const getDisclosureById = async (id: string) => {
    try {
        const userId = (await getUserId()) as string;
        const realm = await getVCLRealmInstance();
        const object = realm.objectForPrimaryKey<
            AcceptedDisclosureRequestObject
        >(Disclosure.name, `${id}_${userId}`)!;

        if (!object) {
            return false;
        }

        return convertRealmObjectToObject<AcceptedDisclosureRequestObject>(
            object
        );
    } catch (error) {
        vclLogger.error(error);
        return false;
    }
};

export const updateDisclosure = async (
    disclosure: Partial<AcceptedDisclosureRequestObject> & {id: string}
) => {
    try {
        const realm = await getVCLRealmInstance();
        const {id, ...disclosureFields} = disclosure;
        const realmDisclosure = realm.objectForPrimaryKey<
            AcceptedDisclosureRequestObject
        >(Disclosure.name, id);
        if (realmDisclosure) {
            realm.write(() => {
                Object.assign(realmDisclosure, disclosureFields);
            });

            return true;
        }
        return false;
    } catch (error) {
        vclLogger.error(error);
        return false;
    }
};
