import messaging, {
    FirebaseMessagingTypes
} from '@react-native-firebase/messaging';
import {Store} from 'redux';
import notifee, {EventType} from '@notifee/react-native';
import {get, getOr, isEmpty} from 'lodash/fp';
import {
    checkNotifications,
    PERMISSIONS,
    requestMultiple,
    RESULTS
} from 'react-native-permissions';
import {getPushById, setPushEntity} from 'app/storage/push';
import {isAndroid} from 'app/utilities/helpers';
import {navigate} from 'app/navigation/utils';
import {setDisclosureDataVerified} from 'app/store/actions/disclosure';
import {DisclosureStatus} from 'app/store/types/disclosure';
import {updateDisclosure} from 'app/storage/disclosure';
import {Platform} from 'react-native';
import {updateDisclosureNotificationsCounter} from '../store/actions/push';
import {NotificationType} from '../store/types/claim';
import {setNotificationIds} from '../storage/asyncStorage';
import {notificationIdByType} from '../utilities/push';
import {vclLogger} from '../utilities/logger';
import {restoreDataObject} from './restoreDataObject';
import {openNoInternetPopupIfOffline} from '../utilities/popups';

// intervals for retrying APNs token fetching
const retryInterval = 500

export const checkAndroidNotificationPermission = async () => {
    try {
        if (isAndroid) {
            await requestMultiple([PERMISSIONS.ANDROID.POST_NOTIFICATIONS]);
            const result = await checkNotifications();
            return (
                result.status === RESULTS.GRANTED ||
                result.status === RESULTS.LIMITED
            );
        }
        return false;
    } catch (error) {
        vclLogger.error('checkAndroidNotificationPermission error:', error);
        return false;
    }
};

export const requestUserPermission = async () =>
    await messaging().requestPermission();

export const checkPermission = async () => {
    const enabled = await messaging().hasPermission();
    return (
        enabled === messaging.AuthorizationStatus.AUTHORIZED ||
        enabled === messaging.AuthorizationStatus.PROVISIONAL
    );
};

export const deleteDeviceToken = () => messaging().deleteToken();

export const getFcmToken = async (retries: number = 3): Promise<string> => {
    try {
        // On iOS, ensure an APNs token is available before proceeding.
        if (Platform.OS === 'ios') {
            const apnsToken = await messaging().getAPNSToken();
            if (!apnsToken && retries) {
                console.info('Failed', 'No token received');
                return await new Promise(resolve => {
                    setTimeout(
                        () => resolve(getFcmToken(retries - 1)),
                        retryInterval
                    );
                });
            }
            if (!apnsToken) {
                vclLogger.error(
                    'APNs token not available after retries. Cannot fetch FCM token.'
                );
            } else {
                console.info('Your APNS Token is:', apnsToken);
            }
        }

        const fcmToken = await messaging().getToken();
        // if (!fcmToken && retries) {
        //     console.info('Failed', 'No token received');
        //     return await new Promise(resolve => {
        //         setTimeout(
        //             () => resolve(getFcmToken(retries - 1)),
        //             retryInterval
        //         );
        //     });
        // }
        console.info('Your Firebase Token is:', fcmToken);
        return fcmToken;
    } catch (e) {
        vclLogger.error(e);
        return '';
    }
};

export const displayNotificationInForeground = async (
    message: {},
    id: string = ''
) => {
    await setNotificationIds([id]);
    const channel = await notifee.getChannel('default');
    const channelId =
        get('id', channel) ||
        (await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
            sound: 'default'
        }));

    await notifee.displayNotification({
        id,
        title: get('notification.title', message),
        body: get('notification.body', message),
        data: get('data', message),
        android: {
            channelId,
            sound: 'default'
        },
        ios: {
            sound: 'default'
        }
    });
};

export const lookUpForPushesToShow = async (
    remoteMessage: FirebaseMessagingTypes.RemoteMessage,
    store: Store,
    showNotification: boolean,
    cb?: (remoteMessage: FirebaseMessagingTypes.Notification) => void
) => {
    const message = restoreDataObject(remoteMessage);
    const pushes = await getPushById(message.data.notificationId);
    const id = notificationIdByType(message.data);

    if (isEmpty(pushes)) {
        if (showNotification) {
            displayNotificationInForeground(remoteMessage, id);
        }

        if (
            message.data.notificationType ===
            NotificationType.presentationVerified
        ) {
            const {disclosures} = store.getState().disclosure;

            store.dispatch(updateDisclosureNotificationsCounter(1));
            store.dispatch(setDisclosureDataVerified(message.data.exchangeId));
            await updateDisclosure({
                id:
                    disclosures.find(
                        (disclosure: any) =>
                            disclosure.exchangeId === message.data.exchangeId
                    )?.id || '',
                status: DisclosureStatus.verified
            });
            return;
        }

        await setPushEntity({
            notificationId: message.data.notificationId,
            issuer: message.data.issuer
        });
        cb?.({...message.data});
    }
};

export const showOfflinePopupForSpecificPushesTypes = async (
    preparedMessage: any
) => {
    if (
        ![
            NotificationType.presentationVerified,
            NotificationType.expiringDisclosure
        ].includes(preparedMessage.data.notificationType)
    ) {
        return openNoInternetPopupIfOffline();
    }

    return undefined;
};

export const backgroundEventListener = (
    store: Store,
    navigateToScreen?: (
        type: NotificationType,
        data?: Record<string, string>
    ) => void
) => {
    let timeout: ReturnType<typeof setTimeout>;
    notifee.onBackgroundEvent(async ({type, detail}) => {
        if (type === EventType.PRESS || type === EventType.ACTION_PRESS) {
            const remoteMessage = detail.notification || {};
            const preparedMessage = restoreDataObject(remoteMessage);

            const isOfflinePopupVisible =
                await showOfflinePopupForSpecificPushesTypes(preparedMessage);

            if (isOfflinePopupVisible) {
                return;
            }
            const notificationType = getOr(
                NotificationType.newOffer,
                notificationTypePath,
                preparedMessage
            );
            // if comes from push notifications
            if (navigateToScreen) {
                navigateToScreen(notificationType, preparedMessage.data);
            } else if (
                notificationType === NotificationType.expiringDisclosure
            ) {
                // if comes from local notifications when app in killed state
                if (timeout) {
                    clearTimeout(timeout);
                }
                timeout = setTimeout(() => {
                    navigate({
                        name: 'PastDisclosureRequestDetails',
                        params: {
                            disclosureId: preparedMessage.data.disclosureId
                        }
                    });
                }, 1000);
            }
        }
    });
};

const notificationTypePath = 'data.notificationType';
export const createNotificationListeners = async (
    goTo: (remoteMessage: FirebaseMessagingTypes.Notification) => void,
    navigateToScreen: (
        type: NotificationType,
        data?: Record<string, string>
    ) => void,
    store: Store
) => {
    // Android doesn't call messaging().onNotificationOpenedApp for local scheduled events (notifee triggers)
    // so we have to set additional listener
    backgroundEventListener(store, navigateToScreen);

    messaging().onMessage(async (remoteMessage) => {
        const preparedMessage = restoreDataObject(remoteMessage);

        const isOfflinePopupVisible =
            await showOfflinePopupForSpecificPushesTypes(preparedMessage);

        if (isOfflinePopupVisible) {
            return;
        }

        lookUpForPushesToShow(remoteMessage, store, true, goTo);
    });

    // triggered when the app starts from the background through the notification banner
    messaging().onNotificationOpenedApp(async (remoteMessage) => {
        const preparedMessage = restoreDataObject(remoteMessage);

        const isOfflinePopupVisible =
            await showOfflinePopupForSpecificPushesTypes(preparedMessage);

        if (isOfflinePopupVisible) {
            return;
        }

        navigateToScreen(
            getOr(
                NotificationType.newOffer,
                notificationTypePath,
                preparedMessage
            ),
            preparedMessage?.data
        );
    });

    messaging()
        .getInitialNotification()
        .then(async (remoteMessage) => {
            if (remoteMessage) {
                const preparedMessage = restoreDataObject(remoteMessage);

                const isOfflinePopupVisible =
                    await showOfflinePopupForSpecificPushesTypes(
                        preparedMessage
                    );

                if (isOfflinePopupVisible) {
                    return;
                }

                // triggered when the app is first launched through the notification banner
                navigateToScreen(
                    getOr(
                        NotificationType.newOffer,
                        notificationTypePath,
                        preparedMessage
                    ),
                    preparedMessage?.data
                );
            }
        });
};
