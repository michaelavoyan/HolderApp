import {useCallback, useState} from 'react';
import {vclLogger} from '../logger';

import {DeclineDisclosure, AcceptDisclosure} from '../../api/types';
import {onAcceptDisclosure, onDeclineDisclosure} from '../../api/disclosure';
import {AcceptedDisclosureRequestObject} from '../../store/types/disclosure';
import {openNoInternetPopupIfOffline} from '../popups';

export const useDisclosureActions = (
    onAccept?: (disclosure?: AcceptedDisclosureRequestObject) => void,
    onDecline?: () => void
) => {
    const [error, setError] = useState<unknown>();
    const [loading, setLoading] = useState<boolean>(false);

    const clearError = useCallback(() => {
        setError(undefined);
    }, []);

    const accept = useCallback(
        async ({
            disclosure,
            credentials,
            presentationRequest
        }: AcceptDisclosure) => {
            try {
                setLoading(true);
                const resp = await onAcceptDisclosure({
                    disclosure,
                    credentials,
                    presentationRequest
                });

                setLoading(false);
                if ('error' in resp) {
                    const isOfflinePopupVisible =
                        await openNoInternetPopupIfOffline();
                    if (isOfflinePopupVisible) {
                        return;
                    }

                    setError(resp.error);
                    return;
                }

                if (onAccept) onAccept(resp.disclosure);
            } catch (e) {
                setLoading(false);

                setError(e);
            }
        },
        [onAccept]
    );

    const decline = useCallback(
        async ({
            url,
            token,
            disclosureId,
            inspectorId,
            exchangeId
        }: DeclineDisclosure) => {
            setLoading(true);

            const resp = await onDeclineDisclosure({
                url,
                token,
                disclosureId,
                inspectorId,
                exchangeId
            });

            setLoading(false);

            if (resp.error) {
                vclLogger.error(`/inspect/reject error - ${resp.error}`);
            }
            if (onDecline) {
                onDecline();
            }
        },
        [onDecline]
    );

    return {
        accept,
        decline,
        error,
        loading,
        clearError
    };
};
