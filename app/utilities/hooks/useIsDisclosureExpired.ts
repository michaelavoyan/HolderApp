import {useState, useCallback} from 'react';

import {
    AcceptedDisclosureRequestObject,
    DisclosureStatus
} from 'app/store/types/disclosure';
import {IntervalInstance, useInterval} from './useInterval';

export const useIsDisclosureExpired = (
    disclosure?: AcceptedDisclosureRequestObject
) => {
    const [isDisclosureExpired, setIsDisclosureExpired] = useState(false);

    const checkExpiration = useCallback(
        (interval: IntervalInstance) => {
            if (disclosure?.status === DisclosureStatus.revoked) {
                clearInterval(interval);
            }

            if (
                disclosure?.expiresAt &&
                new Date() > new Date(disclosure?.expiresAt)
            ) {
                setIsDisclosureExpired(true);

                clearInterval(interval);
            }
        },
        [disclosure?.expiresAt, disclosure?.status]
    );

    useInterval(checkExpiration, 5000);

    return isDisclosureExpired;
};
