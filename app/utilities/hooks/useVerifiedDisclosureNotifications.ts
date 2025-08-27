import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {disclosuresSelector} from '../../store/selectors';
import {AcceptedDisclosureRequestObject} from '../../store/types/disclosure';
import {getNotificationIds} from '../../storage/asyncStorage';
import {NotificationType} from '../../store/types/claim';
import {getDisclosures} from '../../store/actions';
import {disclosureNotificationsCounterSelector} from '../../store/selectors/push';

export const useVerifiedDisclosureNotifications = () => {
    const dispatch = useDispatch();

    const [disclosureNotifications, setDisclosuresNotifications] = useState<
        AcceptedDisclosureRequestObject[]
    >([]);
    const disclosures = useSelector(disclosuresSelector);
    const notificationsCount = useSelector(
        disclosureNotificationsCounterSelector
    );

    useEffect(() => {
        dispatch(getDisclosures());
    }, [dispatch]);

    useEffect(() => {
        (async () => {
            const ids = await getNotificationIds();

            setDisclosuresNotifications(
                ids
                    .filter(id =>
                        id.startsWith(NotificationType.presentationVerified)
                    )
                    .map(id =>
                        id.replace(
                            `${NotificationType.presentationVerified}_`,
                            ''
                        )
                    )
                    .map(
                        id =>
                            disclosures.find(
                                ({exchangeId}) => exchangeId === id
                            )!
                    )
                    .filter(Boolean)
            );
        })();
    }, [disclosures, notificationsCount]);

    return disclosureNotifications;
};
