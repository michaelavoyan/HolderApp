import React, {
    ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState
} from 'react';
import * as RNLocalize from 'react-native-localize';
import {useDispatch, useSelector} from 'react-redux';
import {AppState, AppStateStatus} from 'react-native';
import {getPushes, setSettings, settings} from 'app/store/actions';

import {checkPermission} from 'app/push/initializePush';
import {SettingsProps} from '../../store/types/profile';
import {settingsSelector} from '../../store/selectors';
import {AppStates} from '../../store/types/common';

const DEFAULT_LOCALE = RNLocalize.getLocales()[0].languageTag;
const DEFAULT_LANGUAGE_TAGS = ['en-US', 'en-GB'];

export const SettingsContext = React.createContext(DEFAULT_LOCALE);

export const SettingsWrapper: React.FC<{
    isConnected: boolean;
    isNavigationReady: boolean;
    children?: ReactNode;
}> = ({children, isConnected, isNavigationReady}) => {
    const appState = useRef(AppState.currentState);
    const [languageTag, changeLanguageTag] = useState<string>(
        DEFAULT_LANGUAGE_TAGS.includes(DEFAULT_LOCALE)
            ? DEFAULT_LOCALE
            : DEFAULT_LANGUAGE_TAGS[0]
    );

    const dispatch = useDispatch();
    const savedSettings = useSelector(settingsSelector);
    const {pushPermissionsEnabled} = savedSettings;

    const getSettings = useCallback(() => dispatch(settings()), [dispatch]);

    const setSettingsCb = useCallback(
        (newSettings: Partial<SettingsProps>) =>
            dispatch(setSettings(newSettings)),
        [dispatch]
    );
    const getPushesCb = useCallback(() => {
        if (isConnected) {
            dispatch(getPushes());
        }
    }, [dispatch, isConnected]);

    const handleLocalizationChange = useCallback(() => {
        const newLanguageTag = RNLocalize.getLocales()[0].languageTag;

        if (DEFAULT_LANGUAGE_TAGS.includes(newLanguageTag)) {
            changeLanguageTag(newLanguageTag);
        }
    }, [changeLanguageTag]);

    useEffect(() => {
        if (isNavigationReady) {
            getSettings();
        }
    }, [getSettings, isNavigationReady]);

    const handleAppStateChange = useCallback(
        async (nextAppState: AppStateStatus) => {
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === AppStates.active
            ) {
                handleLocalizationChange();

                const pushPermissions = await checkPermission();

                if (pushPermissionsEnabled !== pushPermissions) {
                    setSettingsCb({pushPermissionsEnabled});
                }
                getPushesCb();
            }
            appState.current = nextAppState;
        },
        [
            pushPermissionsEnabled,
            getPushesCb,
            setSettingsCb,
            handleLocalizationChange
        ]
    );

    useEffect(() => {
        if (isNavigationReady) {
            // handleAppStateChange open a pop app in setSettingsEffect, so it's needed to wait till navigation is ready
            const subscribe = AppState.addEventListener(
                'change',
                handleAppStateChange
            );

            return () => subscribe.remove();
        }
        return () => {};
    }, [isNavigationReady, handleAppStateChange]);

    return (
        <SettingsContext.Provider value={languageTag}>
            {children}
        </SettingsContext.Provider>
    );
};
