import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {filter, find, values} from 'lodash/fp';
import {VCLEnvironment} from '@velocitycareerlabs/vcl-react-native';
import {VCL_ENVIRONMENT} from '../configs';
import * as constants from './constants';
import {RegenerateOffersData, UserAction} from './type';
import {items as guideContentItems} from '../screens/guides/FirstInstallGuide/data/guide-items';
import i18n from '../i18n';

// Log async storage methods
// DON't remove this logging, as it affects DEV ONLY
const logAsyncStorageData = (...args: unknown[]) => {
    if (!__DEV__ && VCL_ENVIRONMENT === VCLEnvironment.Dev) {
        // eslint-disable-next-line no-console
        console.log(`AsyncStorage: ${JSON.stringify(args)}`);
    }
};

const decorateByLogsAsyncStorageMethod = (method: unknown) => {
    return async (...args: unknown[]) => {
        try {
            const result = await (method as Function)(...args);

            logAsyncStorageData({
                name: (method as Function).name,
                args,
                result
            });

            return result;
        } catch (error) {
            logAsyncStorageData({
                error,
                name: (method as Function).name,
                args
            });

            throw error;
        }
    };
};

export const AsyncStorage = Object.create(ReactNativeAsyncStorage, {
    getItem: {
        value: decorateByLogsAsyncStorageMethod(ReactNativeAsyncStorage.getItem)
    },
    setItem: {
        value: decorateByLogsAsyncStorageMethod(ReactNativeAsyncStorage.setItem)
    },
    removeItem: {
        value: decorateByLogsAsyncStorageMethod(
            ReactNativeAsyncStorage.removeItem
        )
    },
    multiRemove: {
        value: decorateByLogsAsyncStorageMethod(
            ReactNativeAsyncStorage.multiRemove
        )
    }
});

const {
    USER_ID,
    DEVICE_TOKEN,
    PUSH_SEQ_ID,
    NOTIFICATION_IDS,
    REGENERATE_OFFERS_DATA,
    WAS_PHONE_PASSCODE_ALERT_SHOWN,
    LINKED_IN_ACCESS_TOKEN
} = constants;

const ERRORS = {
    saveUserId: {
        title: i18n.t('The user could not be selected.'),
        subTitle: i18n.t('Please try again later'),
        message: 'select.save'
    },
    removeUserId: {
        title: i18n.t('The user could not be selected.'),
        subTitle: i18n.t('Please try again later'),
        message: 'select.remove'
    },
    setDeviceToken: {
        title: i18n.t('Cannot store device token'),
        subTitle: i18n.t('Please try again later'),
        message: 'select.deviceToken'
    }
};

export const getUserId = async (): Promise<string | null> =>
    AsyncStorage.getItem(USER_ID);

export const saveUserId = async (userId: string): Promise<UserAction> => {
    try {
        await AsyncStorage.setItem(USER_ID, userId);
        return {result: true};
    } catch (error) {
        return {error: ERRORS.saveUserId};
    }
};

export const removeUserId = async (): Promise<UserAction> => {
    try {
        await AsyncStorage.removeItem(USER_ID);
        return {result: true};
    } catch (error) {
        return {error: ERRORS.removeUserId};
    }
};

export const setDeviceToken = async (
    deviceToken: string
): Promise<UserAction> => {
    try {
        await AsyncStorage.setItem(DEVICE_TOKEN, deviceToken);
        return {result: true};
    } catch (error) {
        return {error: ERRORS.setDeviceToken};
    }
};

export const getDeviceToken = (): Promise<string | null> =>
    AsyncStorage.getItem(DEVICE_TOKEN);

export const removeAllKeysFromAsyncStorage = async () => {
    const keys = values(constants);
    try {
        await AsyncStorage.multiRemove(keys);
    } catch (e) {
        console.error(e);
    }
};

export const getPushSeqId = async (): Promise<string> => {
    try {
        return (await AsyncStorage.getItem(PUSH_SEQ_ID)) || '';
    } catch (error) {
        return '';
    }
};

export const savePushSeqId = async (id: string) => {
    try {
        await AsyncStorage.setItem(PUSH_SEQ_ID, id);
        return {result: true};
    } catch (error) {
        return null;
    }
};

export const getRegenerateOffersData = async (): Promise<RegenerateOffersData[]> => {
    try {
        const resp =
            (await AsyncStorage.getItem(REGENERATE_OFFERS_DATA)) || '[]';
        return JSON.parse(resp);
    } catch (error) {
        return [];
    }
};

export const getRegenerateOffersDataByExchangeId = async ({
    exchangeId
}: {
    exchangeId: string;
}): Promise<RegenerateOffersData | {}> => {
    try {
        const saved = await getRegenerateOffersData();
        return find(['credentialManifest.exchangeId', exchangeId], saved) || {};
    } catch (error) {
        return {};
    }
};

export const setRegenerateOffersData = async (
    items: RegenerateOffersData[]
): Promise<true | null> => {
    try {
        const saved = await getRegenerateOffersData();
        await AsyncStorage.setItem(
            REGENERATE_OFFERS_DATA,
            JSON.stringify([...saved, ...items])
        );

        return true;
    } catch (error) {
        return null;
    }
};

export const removeRegenerateOffersDataByExchangeId = async ({
    exchangeId
}: {
    exchangeId: string;
}): Promise<true | null> => {
    try {
        const saved = await getRegenerateOffersData();
        await AsyncStorage.setItem(
            REGENERATE_OFFERS_DATA,
            JSON.stringify(
                filter(
                    item => item.credentialManifest.exchangeId !== exchangeId,
                    saved
                )
            )
        );

        return true;
    } catch (error) {
        return null;
    }
};

export const getNotificationIds = async (): Promise<string[]> => {
    try {
        const resp = (await AsyncStorage.getItem(NOTIFICATION_IDS)) || '[]';
        return JSON.parse(resp);
    } catch (error) {
        return [];
    }
};

export const removeNotificationId = async (notificationId: string) => {
    try {
        const resp = (await AsyncStorage.getItem(NOTIFICATION_IDS)) || '[]';
        const notificationIds: string[] = JSON.parse(resp);

        return await AsyncStorage.setItem(
            NOTIFICATION_IDS,
            JSON.stringify(notificationIds.filter(id => id !== notificationId))
        );
    } catch (error) {
        return [];
    }
};

export const setNotificationIds = async (
    ids: string[],
    isUpdate: boolean = false
) => {
    try {
        const saved = await getNotificationIds();
        const result = isUpdate ? ids : [...ids, ...saved];
        await AsyncStorage.setItem(NOTIFICATION_IDS, JSON.stringify(result));
        return {result: true};
    } catch (error) {
        return null;
    }
};

export const setWasPhonePasscodeAlertShown = async (wasShown: boolean) => {
    try {
        await AsyncStorage.setItem(
            WAS_PHONE_PASSCODE_ALERT_SHOWN,
            wasShown.toString()
        );
        return {result: true};
    } catch (error) {
        return null;
    }
};

export const getWasPhonePasscodeAlertShown = async (): Promise<boolean> => {
    try {
        const wasShown =
            (await AsyncStorage.getItem(WAS_PHONE_PASSCODE_ALERT_SHOWN)) ||
            'false';
        return wasShown === 'true';
    } catch (error) {
        return false;
    }
};

export const saveLinkedInAccessToken = async (
    token: string
): Promise<true | null> => {
    try {
        await AsyncStorage.setItem(LINKED_IN_ACCESS_TOKEN, token);
        return true;
    } catch (error) {
        return null;
    }
};

export const getLinkedInAccessToken = async (): Promise<string | null> => {
    try {
        const token = await AsyncStorage.getItem(LINKED_IN_ACCESS_TOKEN);
        return typeof token === 'string' ? token : null;
    } catch (error) {
        return null;
    }
};

export const removeLinkedInAccessToken = async (): Promise<true | null> => {
    try {
        await AsyncStorage.removeItem(LINKED_IN_ACCESS_TOKEN);
        return true;
    } catch (error) {
        return null;
    }
};

export const isNewContentGuidePassed = async () => {
    const lastViewedGuideItem = await AsyncStorage.getItem(
        constants.LAST_VIEWED_GUIDE_ITEM
    );

    return (
        lastViewedGuideItem &&
        lastViewedGuideItem ===
            guideContentItems[guideContentItems.length - 1].id
    );
};

export enum GuideContentItemType {
    FirstInstall = 'first-install',
    NewRelease = 'new-release'
}

export const getNewContentGuideType = async () => {
    const lastViewedGuideItem = await AsyncStorage.getItem(
        constants.LAST_VIEWED_GUIDE_ITEM
    );

    if (!lastViewedGuideItem) {
        return GuideContentItemType.FirstInstall;
    }

    if (
        lastViewedGuideItem !==
        guideContentItems[guideContentItems.length - 1].id
    ) {
        return GuideContentItemType.NewRelease;
    }

    // no new content in "What is new" Guide
    return null;
};

export const setNewContentGuidPassed = () =>
    AsyncStorage.setItem(
        constants.LAST_VIEWED_GUIDE_ITEM,
        guideContentItems[guideContentItems.length - 1].id
    );

export const getLatestViewedGuideItem = () =>
    AsyncStorage.getItem(constants.LAST_VIEWED_GUIDE_ITEM);

export const setWasCreateProfilePopupShown = async (value: boolean) => {
    try {
        await AsyncStorage.setItem(
            constants.WAS_CREATE_PROFILE_POPUP_SHOWN,
            JSON.stringify(value)
        );
        return {result: true};
    } catch (error) {
        return null;
    }
};

export const getWasCreateProfilePopupShown = async () => {
    const wasShown =
        (await AsyncStorage.getItem(
            constants.WAS_CREATE_PROFILE_POPUP_SHOWN
        )) || 'false';
    return wasShown === 'true';
};

export const setGuideSkipped = async (skipGuide: Boolean) => {
    await AsyncStorage.setItem(constants.GUIDE_SKIPPED, String(skipGuide));
};

export const getGuideSkipped = async (): Promise<boolean> => {
    const response = await AsyncStorage.getItem(constants.GUIDE_SKIPPED);

    return response ? JSON.parse(response) : true;
};
