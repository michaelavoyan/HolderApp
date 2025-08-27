import {useStore} from 'react-redux';
import {useCallback, useState} from 'react';
import {get} from 'lodash/fp';
import {updateDisclosureNotificationsBadge} from '../../store/actions/push';

import {vclLogger} from '../logger';
import {NotificationType} from '../../store/types/claim';
import {navigate, navigator} from '../../navigation/utils';
import {NotificationsTab} from '../../components/Notifications/typings';
import {getDisclosures} from '../../storage/disclosure';

export const useNotificationsNavigation = () => {
    const [notificationsActiveTab, setNotificationsActiveTab] = useState<
        NotificationsTab
    >(NotificationsTab.Offers);

    const changeActiveTab = useCallback(
        (tab: NotificationsTab) => setNotificationsActiveTab(tab),
        [setNotificationsActiveTab]
    );

    const store = useStore();

    const navigateToScreen = useCallback(
        async (type: NotificationType, data?: Record<string, string>) => {
            if (type === NotificationType.expiringDisclosure && data) {
                navigate({
                    name: 'PastDisclosureRequestDetails',
                    params: {disclosureId: data.disclosureId}
                });
                return;
            }

            if (type === NotificationType.presentationVerified && data) {
                const disclosures = await getDisclosures();

                const disclosure = disclosures.find(
                    ({exchangeId}: {exchangeId: string}) =>
                        exchangeId === data.notificationId
                );

                navigate({
                    name: 'PastDisclosureRequestDetails',
                    params: {disclosureId: disclosure.id}
                });

                store.dispatch(updateDisclosureNotificationsBadge(-1));

                return;
            }

            try {
                if (
                    type === NotificationType.newOffer ||
                    type === NotificationType.replaced ||
                    type === NotificationType.revoked
                ) {
                    setNotificationsActiveTab(
                        type === NotificationType.revoked
                            ? NotificationsTab.Revocations
                            : NotificationsTab.Offers
                    );
                    const route = navigator.current?.getCurrentRoute();
                    navigate({name: 'NotificationsTab'});
                    // proceed issuing popup on the notification tab
                    if (get('params.issuingInProgress', route)) {
                        navigate(route!);
                    }
                }
            } catch (e) {
                vclLogger.error(`goToOffers: ${e}`);
            }
        },
        [store]
    );

    return {
        notificationsActiveTab,
        changeActiveTab,
        navigateToScreen
    };
};
