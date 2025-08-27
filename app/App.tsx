import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector, useStore} from 'react-redux';
import {ThemeProvider} from 'react-native-elements';

import messaging, {
    FirebaseMessagingTypes
} from '@react-native-firebase/messaging';
import {useTranslation} from 'react-i18next';
// import {Adjust} from 'react-native-adjust';
import {
    needToCheckBiometrySelector,
    settingsSelector,
    userIdSelector,
    userSelector
} from 'app/store/selectors';
import {theme} from 'app/assets/theme';
import {ConnectionContext} from 'app/components/common/ConnectionWatcher';
import {getDeviceToken, setDeviceToken} from 'app/storage/asyncStorage';

import {
    getUserId,
    registerDevice,
    pushOffers,
    getPushes,
    getCredentialTypesAndSchemas,
    credentialCategories,
    setSettings,
    getCountries
} from 'app/store/actions';
import {
    checkPermission,
    createNotificationListeners,
    checkAndroidNotificationPermission,
    requestUserPermission,
    getFcmToken
} from 'app/push/initializePush';
import {AppState, StatusBar, StyleSheet} from 'react-native';
import {VCLEnvironment} from '@velocitycareerlabs/vcl-react-native';
import {SettingsWrapper} from './components/common/SettingsWrapper';
import {DeepLinkingWrapper} from './components/common/DeepLinkingWrapper';
import {useOnForegroundNotifee} from './utilities/custom-hooks';
import {Navigation} from './navigation';
import {ProfileStack} from './navigation/stacks/ProfileStack';
import {DisclosureStack} from './navigation/stacks/DisclosureStack';
import {NotificationsStack} from './navigation/stacks/NotificationsStack';
import {SettingsStack} from './navigation/stacks/SettingsStack';
import {SelectPersonaStack} from './navigation/stacks/SelectPersonaStack';
import {useNotificationsNavigation} from './utilities/hooks/useNotificationsNavigation';
import {NotificationsContext} from './screens/notifications/Main';
import {openForceUpgradePopup, openStatusPopup} from './utilities/popups';
import {StatusMessages} from './screens/popups/type';
import {updateDeviceToken} from './api/push';
import {configSelector} from './store/selectors';
import {IConfig} from './store/types/appConfig';

import {useShowOfflineStatusMessage} from './utilities/offline/useShowOfflineStatusMessage';
import {useOfflineToast} from './utilities/offline/toast';
// import {adjustConfig, VclAdjust} from './adjust/VclAdjust';
import {VCL_ENVIRONMENT} from './configs';
import {setPhoneVerificationPopupClosed} from './store/actions/profile';
import {PushOffersAction} from './store/types/claim';
import {disableBiometry} from './store/actions/auth';
import {isIOS} from './utilities/helpers';

export const App: React.FC<{
    setIsNavigationReady: React.Dispatch<React.SetStateAction<boolean>>;
    isNavigationReady: boolean;
}> = ({setIsNavigationReady, isNavigationReady}) => {
    const {t} = useTranslation();

    const [getPushesInterval, setGetPushesInterval] = useState<
        NodeJS.Timeout | undefined
    >();
    const [appStateTimeout, setAppStateTimeout] = useState<
        NodeJS.Timeout | undefined
    >();
    const [appState, setAppState] = useState<string>(AppState.currentState);

    // useEffect(() => {
    // TODO: remove IOS condition after VL-5635
    //     if (isIOS) {
    //         Adjust.create(adjustConfig);
    //         VclAdjust.adjustTest();
    //     }
    //     return Adjust.componentWillUnmount();
    // }, []);

    const {isNewContentGuidePassed, enablePopups} =
        useContext(ConnectionContext);
    const userId: string = useSelector(userIdSelector);
    const {accountId} = useSelector(userSelector);
    const config: IConfig = useSelector(configSelector);
    const needToCheckBiometry = useSelector(needToCheckBiometrySelector);
    const {pushPermissionsEnabled} = useSelector(settingsSelector);
    const dispatch = useDispatch();

    const registerDeviceToPush = useCallback(
        () => dispatch(registerDevice()),
        [dispatch]
    );

    useShowOfflineStatusMessage(isNavigationReady);

    const {isConnected, isMustUpgrade} = useContext(ConnectionContext);

    const {notificationsActiveTab, changeActiveTab, navigateToScreen} =
        useNotificationsNavigation();
    useOnForegroundNotifee(navigateToScreen);

    const getPushesCb = useCallback(() => dispatch(getPushes()), [dispatch]);

    const getUserIdCb = useCallback(() => dispatch(getUserId()), [dispatch]);

    const getCredentialTypesAndSchemasCb = useCallback(
        () => dispatch(getCredentialTypesAndSchemas()),
        [dispatch]
    );

    const credentialCategoriesCb = useCallback(
        () => dispatch(credentialCategories()),
        [dispatch]
    );

    const countiesCb = useCallback(() => dispatch(getCountries()), [dispatch]);

    useEffect(() => {
        getUserIdCb();
    }, [getUserIdCb]);

    useEffect(() => {
        if (isConnected && !needToCheckBiometry && Boolean(accountId)) {
            // isConnected is true only when isNavigationReady has been true already
            getCredentialTypesAndSchemasCb();
            credentialCategoriesCb();
            getPushesCb();
            countiesCb();
        }
    }, [
        needToCheckBiometry,
        isConnected,
        getUserIdCb,
        getPushesCb,
        getCredentialTypesAndSchemasCb,
        credentialCategoriesCb,
        countiesCb,
        accountId
    ]);

    const updateDeviceToPush = useCallback(
        async (storedDeviceToken: string, fcmToken: string) => {
            await updateDeviceToken(
                config,
                storedDeviceToken,
                fcmToken,
                !!pushPermissionsEnabled
            );
            await setDeviceToken(fcmToken);

            getPushesCb();
        },
        [config, getPushesCb, pushPermissionsEnabled]
    );

    const processPushCallback = useCallback(
        (data: FirebaseMessagingTypes.Notification) =>
            dispatch(pushOffers(data as PushOffersAction)),
        [dispatch]
    );

    const store = useStore();
    const isReadyToInitPush = isConnected && !needToCheckBiometry;
    const notificationListenerCreatedRef = useRef(false);

    useEffect(() => {
        const initPush = async () => {
            dispatch(disableBiometry(true));

            await requestUserPermission();

            const hasPermission =
                (await checkPermission()) ||
                (await checkAndroidNotificationPermission());

            dispatch(disableBiometry(false));
            dispatch(setSettings({pushPermissionsEnabled: hasPermission}));

            const fcmToken = await getFcmToken();
            const storedDeviceToken = await getDeviceToken();

            if (!storedDeviceToken) {
                registerDeviceToPush();
            } else if (fcmToken !== storedDeviceToken) {
                await updateDeviceToPush(storedDeviceToken, fcmToken);
            }

            await createNotificationListeners(
                processPushCallback,
                navigateToScreen,
                store
            );
        };

        if (isReadyToInitPush && !notificationListenerCreatedRef.current) {
            // isConnected is true only when isNavigationReady has been true already
            initPush().then((_) => {
                notificationListenerCreatedRef.current = true;
            });
        }
    }, [
        processPushCallback,
        registerDeviceToPush,
        updateDeviceToPush,
        isReadyToInitPush,
        navigateToScreen,
        dispatch,
        store
    ]);

    // for testing purposes, DEV only, refresh FCM token each 15 minutes
    // useFCMTokenDebugRefreshInterval(isConnected);

    useEffect(() => {
        StatusBar.setBarStyle('dark-content');
    }, []);

    useEffect(() => {
        const subscription = AppState.addEventListener(
            'change',
            (nextAppState) => {
                setAppState(nextAppState);
            }
        );

        return () => {
            subscription.remove();
        };
    }, []);

    useEffect(() => {
        clearTimeout(appStateTimeout);
        const comparePermissions = async () => {
            const hasPermission = await checkPermission();
            if (hasPermission !== pushPermissionsEnabled) {
                dispatch(setSettings({pushPermissionsEnabled: hasPermission}));
            }
        };
        // Need this timeout, cause when switch notification on and back to application there are a lot of changes of AppState
        // This timeout fix was done in scope of VL-3523
        const timeOut = setTimeout(() => {
            if (appState === 'active') {
                comparePermissions();
            }
        }, 2000);
        setAppStateTimeout(timeOut);
        return () => {
            clearTimeout(appStateTimeout);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [appState]);

    useEffect(() => {
        return messaging().onTokenRefresh(async (token) => {
            const storedToken = await getDeviceToken();

            if (
                storedToken &&
                token &&
                token !== storedToken &&
                config.baseUrls
            ) {
                await updateDeviceToPush(storedToken, token);
            }
        });
    }, [getPushesCb, config, pushPermissionsEnabled, updateDeviceToPush]);

    useEffect(() => {
        const clearGetPushesInterval = () => {
            if (getPushesInterval) {
                clearInterval(getPushesInterval);
            }
        };
        const updateNotificationsActive = async () => {
            const storedToken = await getDeviceToken();
            if (storedToken && config.baseUrls) {
                await updateDeviceToken(
                    config,
                    storedToken,
                    storedToken,
                    !!pushPermissionsEnabled
                );
            }
        };

        clearGetPushesInterval();
        if (!needToCheckBiometry && Boolean(accountId)) {
            updateNotificationsActive();
            if (!pushPermissionsEnabled) {
                const interval = setInterval(() => {
                    getPushesCb();
                }, 30000); /* 30 seconds polling */
                setGetPushesInterval(interval);
            } else {
                clearGetPushesInterval();
            }
        }

        return () => {
            clearGetPushesInterval();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [config, pushPermissionsEnabled, needToCheckBiometry, accountId]);

    useEffect(() => {
        if (isMustUpgrade && isNavigationReady) {
            openForceUpgradePopup({
                params: {
                    env: VCL_ENVIRONMENT as VCLEnvironment
                }
            });
        }
    }, [isMustUpgrade, isNavigationReady, t]);

    useEffect(() => {
        dispatch(setPhoneVerificationPopupClosed(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const openWalletNotAvailablePopup = () => {
            openStatusPopup({
                params: {
                    title: t(
                        'We apologize that the service is currently not available. We are working to resolve this.'
                    ),
                    text: 'Please try again in a few hours',
                    fullScreenMode: true,
                    withoutButtons: true,
                    statusType: StatusMessages.Error,
                    onPress: () => {}
                }
            });
        };
        if (config) {
            const isWalletAvailable = isIOS
                ? config.ios.isWalletAvailable
                : config.android.isWalletAvailable;
            if (!isWalletAvailable) {
                openWalletNotAvailablePopup();
            }
        }
    }, [config, t]);

    useOfflineToast();

    const contextValue = useMemo(
        () => ({
            activeTab: notificationsActiveTab,
            changeActiveTab
        }),
        [notificationsActiveTab, changeActiveTab]
    );

    return (
        <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
            <ThemeProvider theme={theme}>
                <SettingsWrapper
                    isConnected={isConnected}
                    isNavigationReady={isNavigationReady}>
                    <DeepLinkingWrapper userId={userId}>
                        {userId === null ? null : (
                            <NotificationsContext.Provider value={contextValue}>
                                <Navigation
                                    isNewContentGuidePassed={
                                        isNewContentGuidePassed
                                    }
                                    isUserLoggedIn={Boolean(userId)}
                                    Profile={ProfileStack}
                                    Disclosures={DisclosureStack}
                                    Notifications={NotificationsStack}
                                    Settings={SettingsStack}
                                    Auth={SelectPersonaStack}
                                    setIsNavigationReady={setIsNavigationReady}
                                    enablePopups={enablePopups}
                                />
                            </NotificationsContext.Provider>
                        )}
                    </DeepLinkingWrapper>
                </SettingsWrapper>
            </ThemeProvider>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
