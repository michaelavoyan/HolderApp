import {isEmpty, getOr} from 'lodash/fp';

import {SettingsProps} from 'app/store/types/profile';
import {Settings} from './schema/settings';
import {getVCLRealmInstance, setObject} from './common';
import {convertRealmObjectsToArray} from '../utilities/helpers';
import {vclLogger} from '../utilities/logger';

export const getSettings = async () => {
    try {
        vclLogger.info('getSettings - START');
        const realm = await getVCLRealmInstance();
        const settingsObjects = realm.objects<SettingsProps>(Settings.name);
        vclLogger.info(
            `getSettings - realm.objects: ${JSON.stringify(settingsObjects)}`
        );
        return getOr(
            {},
            '[0]',
            convertRealmObjectsToArray<SettingsProps>(settingsObjects)
        );
    } catch (error) {
        vclLogger.error(
            `Failed to GET settings with error: ${JSON.stringify(error)}`
        );
        return {};
    }
};

export const setSettings = async (settings: Partial<SettingsProps>) => {
    try {
        // TODO: REMOVE LOGGING AFTER VL-3519 is resolved

        vclLogger.info(`setSettings - START: ${JSON.stringify(settings)}`);

        const realm = await getVCLRealmInstance();
        const savedSettings = realm.objects<SettingsProps>(Settings.name);

        vclLogger.info(
            `setSettings - REALM STORED: ${JSON.stringify(savedSettings)}`
        );

        if (!isEmpty(savedSettings)) {
            vclLogger.info(
                `setSettings - ASSIGN: ${JSON.stringify({
                    savedSettings,
                    settings
                })}`
            );

            realm.write(() => {
                Object.assign(savedSettings[0], settings);
            });

            return true;
        }

        vclLogger.info(`setSettings - END: ${JSON.stringify(settings)}`);

        return setObject(Settings.name, settings);
    } catch (error) {
        vclLogger.error(
            `Failed to SET settings with error: ${JSON.stringify(error)}`
        );
        return false;
    }
};
