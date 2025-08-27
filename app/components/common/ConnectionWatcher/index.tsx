import React, {useEffect, useState, useMemo, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {View, StyleSheet} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';
import {
    VCLCryptoServiceType,
    VCLInitializationDescriptor,
} from '@velocitycareerlabs/vcl-react-native';
import {useDispatch, useSelector} from 'react-redux';

import {isIOS} from 'app/utilities/helpers';
import {needToCheckBiometrySelector, userIdSelector} from 'app/store/selectors';
import {
    configSelector,
    isAppConfigLoadedSelector,
    minAndroidVersionConfigSelector,
    minIOSVersionConfigSelector,
    sdkCacheSequenceSelector,
    isDirectIssuerCheckOnSelector,
    xVnfProtocolVersionSelector
} from 'app/store/selectors/appConfig';

import {useCheckBiometry} from 'app/utilities/hooks/useCheckBiometry';
import {useAppBackgroundState} from 'app/utilities/hooks/useAppBackgroundState';
import {useSplashScreen} from 'app/utilities/hooks/useSplashScreen';
import {useSdkDebug} from 'app/utilities/hooks/useSdkDebug';
import {usePrevious} from 'app/utilities/custom-hooks';
import {PopupScreens} from 'app/navigation/StackParamsList';
import {getAppConfig, getUserId, SDKInitialized} from '../../../store/actions';
import PackageJson from '../../../../package.json';
import {
    closePopup,
    openGenericPopup,
    openLoadingPopup
} from '../../../utilities/popups';
import {vclLogger} from '../../../utilities/logger';
import {
    getGuideSkipped,
    setGuideSkipped,
    isNewContentGuidePassed as isNewContentGuidePassedStoredValue,
    setNewContentGuidPassed as setNewContentGuidPassedStoredValue
} from '../../../storage/asyncStorage';
import {isShouldUpdateVersion} from './ConnectionWatcher.utils';
import SplashScreen from '../SplashScreen';
import {VCL_ENVIRONMENT} from '../../../configs';
import {useInitBackendAccountIfNotExist} from './useInitBackendAccountIfNotExist';
import {VclReactNativeSdkWrapper} from '../../../api/vcl-react-native-sdk-wrapper';

const SDK_RETRIES_TIMEOUT = 1000;
const BACKGROUND_STATES = ['background', 'inactive'];

export const ConnectionContext = React.createContext<{
    isConnected: boolean;
    isNewContentGuidePassed?: boolean;
    isMustUpgrade: boolean | null;
    isGuideSkipped: boolean;
    setIsNewContentGuidePassed: () => void;
    setIsGuideSkipped: (skipped: boolean) => void;
    enablePopups: () => void;
}>({
    isConnected: false,
    isMustUpgrade: null,
    isGuideSkipped: false,
    setIsNewContentGuidePassed: () => {},
    setIsGuideSkipped: (_skipped: boolean) => {},
    enablePopups: () => {}
});

export const ConnectionWatcher: React.FC<{
    children: React.ReactNode;
    isNavigationReady: boolean;
}> = ({children, isNavigationReady}) => {
    const [isMustUpgrade, setIsMustUpgrade] = useState<boolean | null>(null);
    const [isNewContentGuidePassed, setIsNewContentGuidePassedState] = useState<
        boolean | undefined
    >();
    const [isGuideSkipped, setIsGuideSkipped] = useState<boolean>(false);

    useEffect(() => {
        isNewContentGuidePassedStoredValue().then((isPassed) =>
            setIsNewContentGuidePassedState(isPassed)
        );

        getGuideSkipped().then((isSkipped: boolean) => {
            setIsGuideSkipped(isSkipped);
        });
    }, []);

    const minIOSVersionConfig: string = useSelector(
        minIOSVersionConfigSelector
    );
    const minAndroidVersionConfig: string = useSelector(
        minAndroidVersionConfigSelector
    );

    const isAppConfigLoaded = useSelector(isAppConfigLoadedSelector);

    useEffect(() => {
        const appVersion = PackageJson.version;

        if (isIOS) {
            setIsMustUpgrade(
                isShouldUpdateVersion(minIOSVersionConfig, appVersion)
            );
        } else {
            setIsMustUpgrade(
                isShouldUpdateVersion(minAndroidVersionConfig, appVersion)
            );
        }
    }, [minIOSVersionConfig, minAndroidVersionConfig]);

    const userId: string = useSelector(userIdSelector);
    const netInfo = useNetInfo();
    const [isConnectedToNetwork, setIsConnectedToNetwork] = useState<
        boolean | null
    >(null);
    const [isSDKInitialized, setIsSDKInitialized] = useState<boolean | null>(
        null
    );
    const [isSDKTimeoutExceeded, setIsSDKTimeoutExceeded] = useState<
        boolean | null
    >(null);
    const [initSDKInProgress, setInitSDKInProgress] = useState<boolean>(false);
    const [isPopupsEnabled, setIsPopupEnabled] = useState(false);
    const isUserChecked = userId !== null;
    const dispatch = useDispatch();

    const {t} = useTranslation();

    const sdkCacheSequenceConfig = useSelector(sdkCacheSequenceSelector);
    const isDirectIssuerCheckOn = useSelector(isDirectIssuerCheckOnSelector);

    const xVnfProtocolVersion = useSelector(xVnfProtocolVersionSelector);

    const {isDebugOn} = useSdkDebug();
    const prevIsDebugOn = usePrevious(isDebugOn);
    const {appState, prevState} = useAppBackgroundState();
    const needToCheckBiometry = useSelector(needToCheckBiometrySelector);
    const {isShownSplashScreen} = useSplashScreen();
    const config = useSelector(configSelector);

    useCheckBiometry(appState, prevState);

    useEffect(() => {
        let timeoutID: ReturnType<typeof setTimeout> | undefined;
        if (
            isSDKInitialized === false &&
            prevState &&
            !BACKGROUND_STATES.includes(prevState)
        ) {
            timeoutID = setTimeout(() => {
                setIsSDKTimeoutExceeded(true);
            }, SDK_RETRIES_TIMEOUT);
        }

        if (isSDKInitialized && timeoutID) {
            clearTimeout(timeoutID);
        }
        return () => {
            if (timeoutID) {
                clearTimeout(timeoutID);
            }
        };
    }, [isSDKInitialized, prevState]);

    useEffect(() => {
        if (
            isSDKInitialized === false &&
            isSDKTimeoutExceeded &&
            !initSDKInProgress
        ) {
            openGenericPopup({
                params: {
                    title: t('The application has failed to load.'),
                    description: t('Please try again later.')
                }
            });
        }
    }, [isSDKInitialized, isSDKTimeoutExceeded, t, initSDKInProgress]);

    useEffect(() => {
        setIsConnectedToNetwork(netInfo.isConnected);
    }, [isConnectedToNetwork, netInfo]);

    useEffect(() => {
        if (
            userId === null &&
            needToCheckBiometry === false &&
            isAppConfigLoaded
        ) {
            dispatch(getUserId()); // it's not possible to connect userId to isNavigationReady, since it triggers rendering of Navigation
        }
    }, [needToCheckBiometry, isAppConfigLoaded, dispatch, userId]);

    const isTempIssuingUser = /temp_issuing_user/.test(userId);

    const initializeSdk = useCallback(() => {
        setInitSDKInProgress(true);
        const initializationDescriptor: VCLInitializationDescriptor = {
            environment: VCL_ENVIRONMENT,
            xVnfProtocolVersion,
            cacheSequence: sdkCacheSequenceConfig,
            cryptoServicesDescriptor: {
                cryptoServiceType: VCLCryptoServiceType.Remote,
                remoteCryptoServicesUrlsDescriptor: {
                    keyServiceUrls: {
                        createDidKeyServiceUrl: `${config.baseUrls?.walletApi}/api/v0.6/create_did_key`
                    },
                    jwtServiceUrls: {
                        jwtSignServiceUrl: `${config.baseUrls?.walletApi}/api/v0.6/jwt/sign`
                    }
                }
            },
            isDebugOn,
            isDirectIssuerCheckOn
        };

        VclReactNativeSdkWrapper.initialize(initializationDescriptor).then(
            () => {
                setIsSDKInitialized(true);
                setInitSDKInProgress(false);
                dispatch(SDKInitialized());
            },
            (error) => {
                vclLogger.error(
                    `VCL SDK initialization error: ${JSON.stringify(error)}`
                );

                setIsSDKInitialized(false);
                setInitSDKInProgress(false);
            }
        );
    }, [
        dispatch,
        isDebugOn,
        isDirectIssuerCheckOn,
        sdkCacheSequenceConfig,
        config,
        xVnfProtocolVersion
    ]);

    useEffect(() => {
        if (
            (isNewContentGuidePassed || isTempIssuingUser) && // start fetching schemas in background (without loading spinner)
            isConnectedToNetwork &&
            !initSDKInProgress &&
            !isSDKInitialized &&
            isMustUpgrade === false &&
            isNavigationReady &&
            !isSDKTimeoutExceeded &&
            config.baseUrls?.walletApi
        ) {
            initializeSdk();
        }
    }, [
        isNewContentGuidePassed,
        initSDKInProgress,
        isSDKInitialized,
        isConnectedToNetwork,
        isMustUpgrade,
        isNavigationReady,
        dispatch,
        sdkCacheSequenceConfig,
        isSDKTimeoutExceeded,
        isTempIssuingUser,
        config,
        initializeSdk
    ]);

    useEffect(() => {
        if (isSDKInitialized && isDebugOn !== prevIsDebugOn) {
            initializeSdk();
        }
    }, [isSDKInitialized, isDebugOn, prevIsDebugOn, initializeSdk]);

    useEffect(() => {
        dispatch(getAppConfig());
    }, [dispatch]);

    useEffect(() => {
        const isVisible =
            (isConnectedToNetwork === false || isSDKInitialized === null) &&
            isMustUpgrade === false;
        if (isVisible && isNavigationReady && isPopupsEnabled) {
            if (
                (isNewContentGuidePassed || isTempIssuingUser) &&
                isConnectedToNetwork &&
                (isSDKInitialized === null || !isUserChecked)
            ) {
                // TODO: add a ticket to show loading popup after the info guide
                openLoadingPopup({params: {title: t('Loading...')}});
            }
        }
    }, [isNewContentGuidePassed, isConnectedToNetwork, isMustUpgrade, isSDKInitialized, isUserChecked, isNavigationReady, isTempIssuingUser, isPopupsEnabled, t]);

    useEffect(() => {
        if (isNavigationReady && isSDKInitialized) {
            closePopup(PopupScreens.LOADING_POPUP);
        }
    }, [isNavigationReady, isSDKInitialized]);

    const isAppInitialized = Boolean(
        isConnectedToNetwork &&
            isSDKInitialized &&
            isUserChecked &&
            isAppConfigLoaded &&
            isNewContentGuidePassed !== undefined
    );

    useInitBackendAccountIfNotExist(isAppInitialized);

    const handleIsPopupsEnabled = useCallback(() => {
        if (!isPopupsEnabled) {
            setIsPopupEnabled(true);
        }
    }, [isPopupsEnabled]);

    return (
        <ConnectionContext.Provider
            value={useMemo(
                () => ({
                    isConnected: isAppInitialized,
                    isMustUpgrade,
                    isGuideSkipped,
                    isNewContentGuidePassed,
                    setIsNewContentGuidePassed: () => {
                        setNewContentGuidPassedStoredValue().then(() =>
                            setIsNewContentGuidePassedState(true)
                        );
                    },
                    setIsGuideSkipped: (isSkipped: boolean) => {
                        setGuideSkipped(isSkipped).then(() =>
                            setIsGuideSkipped(isSkipped)
                        );
                    },
                    enablePopups: handleIsPopupsEnabled
                }),
                [
                    isAppInitialized,
                    isNewContentGuidePassed,
                    isMustUpgrade,
                    isGuideSkipped,
                    handleIsPopupsEnabled
                ]
            )}>
            {children}
            {isShownSplashScreen ? (
                <View style={StyleSheet.absoluteFillObject}>
                    <SplashScreen />
                </View>
            ) : null}
        </ConnectionContext.Provider>
    );
};
