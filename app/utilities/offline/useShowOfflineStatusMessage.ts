import {useEffect, useState} from 'react';
import {Linking} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';
import {getUserId as getStoredUserId} from 'app/storage/asyncStorage';
import {waitForForegroundAppState} from '../hooks/waitForForegroundAppState';
import {openNoInternetPopupIfOffline} from '../popups';
import {isAndroid} from '../helpers';

let hideStatusPopup: (() => void) | undefined;

export const useShowOfflineStatusMessage = (isNavigationReady: boolean) => {
    const [initialised, setInitialised] = useState(false);

    useEffect(() => {
        const showInternetPopup = async (deepLinkUrl?: string | null) => {
            const isNotLoggedIn = !(await getStoredUserId());

            if (
                (await waitForForegroundAppState()) &&
                (isNotLoggedIn || deepLinkUrl)
            ) {
                hideStatusPopup = await openNoInternetPopupIfOffline();
            }
        };

        const onOpenUrl = async ({url: deepLinkUrl}: {url: string}) => {
            if (!isNavigationReady) {
                return;
            }

            await showInternetPopup(deepLinkUrl);
        };

        // for first initial android loading, since addEventListener doesn't work
        Linking.getInitialURL().then(async initialUrl => {
            if (!isNavigationReady || initialised || !isAndroid) {
                return;
            }

            await showInternetPopup(initialUrl);

            setInitialised(true);
        });

        return Linking.addEventListener('url', onOpenUrl).remove;
    }, [initialised, isNavigationReady]);

    const {isConnected} = useNetInfo();

    useEffect(() => {
        if (isConnected) {
            if (hideStatusPopup) hideStatusPopup();
        }
    }, [isConnected]);
};
