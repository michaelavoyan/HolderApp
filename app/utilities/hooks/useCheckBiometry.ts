import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateStatus} from 'react-native';
import VclAuthReactNative from '@velocitycareerlabs/vcl-auth-react-native';
import {checkBiometry, updateBiometryFlag} from 'app/store/actions';
import {needToCheckBiometrySelector} from 'app/store/selectors';
import {isAppConfigLoadedSelector} from 'app/store/selectors/appConfig';
import {isBiometryDisabledSelector} from 'app/store/selectors/auth';
import {useSplashScreen} from './useSplashScreen';
import {invokeBiometryAlertOnce} from '../biometry';
import {isAndroid} from '../helpers';

export const useCheckBiometry = (
    appState: AppStateStatus,
    prevState: AppStateStatus | null
) => {
    const dispatch = useDispatch();
    const {setShowSplashScreen} = useSplashScreen();
    const needToCheckBiometry = useSelector(needToCheckBiometrySelector);
    const isAppConfigLoaded = useSelector(isAppConfigLoadedSelector);
    const biometryRunningRef = useRef(false);
    const isBiometryDisabled = useSelector(isBiometryDisabledSelector);

    useEffect(() => {
        const handleAppState = async () => {
            const isAvailable =
                await VclAuthReactNative.isAuthenticationAvailable();

            if (
                appState === 'background' &&
                isAvailable &&
                !isBiometryDisabled
            ) {
                setShowSplashScreen(true);
            }
        };

        handleAppState();
    }, [setShowSplashScreen, appState, dispatch, isBiometryDisabled]);

    const handleCheckBiometry = async () => {
        try {
            const isAvailable =
                await VclAuthReactNative.isAuthenticationAvailable();

            if (isAvailable) {
                const result = await invokeBiometryAlertOnce();

                if (!result) {
                    handleCheckBiometry();
                } else {
                    setShowSplashScreen(false);
                    dispatch(checkBiometry());
                }
            } else {
                dispatch(updateBiometryFlag(false));
                setShowSplashScreen(false);
            }
        } catch (e) {
            if (isAndroid) {
                handleCheckBiometry();
            }
        }
    };

    useEffect(() => {
        if (!biometryRunningRef.current && !isBiometryDisabled && needToCheckBiometry) {
            if (

                isAppConfigLoaded &&
                appState === 'active'
            ) {
                biometryRunningRef.current = true;
                handleCheckBiometry?.().then(() => {
                    biometryRunningRef.current = false;
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        needToCheckBiometry,
        appState,
        prevState,
        isAppConfigLoaded,
        isBiometryDisabled
    ]);
};
