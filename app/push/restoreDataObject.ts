import {flow, getOr, set} from 'lodash/fp';
import {NotificationType} from '../store/types/claim';

export const restoreDataObject = (remoteMessage: any) => {
    const types = JSON.parse(
        getOr('[]', 'data.credentialTypes', remoteMessage)
    );

    const count = flow(getOr(0, 'data.count'), Number)(remoteMessage);

    return flow(
        set('data.types', types),
        set('data.count', count),
        (transformedMessage: any) => {
            if (
                transformedMessage.data.notificationType ===
                NotificationType.presentationVerified
            ) {
                return flow(
                    set('data.id', transformedMessage.data.exchangeId),
                    set(
                        'data.notificationId',
                        transformedMessage.data.exchangeId
                    )
                )(transformedMessage);
            }

            return transformedMessage;
        }
    )(remoteMessage);
};
