import messaging from '@react-native-firebase/messaging';
import {isEmpty} from 'lodash/fp';
import {getPushById, setPushEntity} from 'app/storage/push';
import {DisclosureStatus} from 'app/store/types/disclosure';
import {updateDisclosure} from 'app/storage/disclosure';
import notifee from '@notifee/react-native';
import {updateDisclosureNotificationsBadge} from '../store/actions/push';
import {notificationIdByType} from '../utilities/push';
import {restoreDataObject} from './restoreDataObject';
import {pushOffers, setDisclosureDataVerified} from '../store/actions';
import {store} from '../store/store';
import {setNotificationIds} from '../storage/asyncStorage';
import {NotificationType} from '../store/types/claim';
import {backgroundEventListener} from './initializePush';

export const processPushesInBackground = () => {
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        const message = restoreDataObject(remoteMessage);
        const pushes = await getPushById(message.data.notificationId);
        const id = notificationIdByType(message.data);
        notifee.incrementBadgeCount();
        if (isEmpty(pushes)) {
            await setNotificationIds([id]);

            if (
                message.data.notificationType ===
                NotificationType.presentationVerified
            ) {
                store.dispatch(updateDisclosureNotificationsBadge(1));
                store.dispatch(
                    setDisclosureDataVerified(message.data.exchangeId)
                );

                await setPushEntity({
                    notificationId: message.data.notificationId,
                    issuer: ''
                });

                const {disclosures} = store.getState().disclosure;

                await updateDisclosure({
                    id:
                        disclosures.find(
                            (item: any) =>
                                item.exchangeId === message.data.exchangeId
                        )?.id || '',
                    status: DisclosureStatus.verified
                });

                return Promise.resolve();
            }

            store.dispatch(
                pushOffers({...message.data, isFromBackground: true})
            );
        }

        // free up device resources in 30 seconds
        return new Promise((resolve) => setTimeout(resolve, 30 * 1000));
    });
    backgroundEventListener(store);
};
