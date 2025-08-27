import React, {useEffect, useMemo, useRef, useState} from 'react';
import {View, Text, StyleSheet, Platform, Linking} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {colors} from '../../assets/colors';
import {SVG} from '../../assets/icons';
import {fontFamily, isIOS} from '../helpers';
import {getNavigatorAsync} from '../../navigation/utils';
import {getUserId} from '../../storage/asyncStorage';

export const useOfflineToast = (isFocused: boolean = true) => {
    const {isConnected} = useNetInfo();
    const prevNetInfo = useRef<boolean | null>(null);
    const {bottom: bottomInsetsOffset} = useSafeAreaInsets();
    const [canDisplayOfflinePopup, setCanDisplayOfflinePopup] = useState(true);
    const [currentRoute, setRoute] = useState<string | undefined>();

    useEffect(() => {
        getNavigatorAsync().then((navigatorInstance) => {
            navigatorInstance.addListener('state', ({data: {state}}) => {
                setRoute(state?.routes[state.routes.length - 1].name || '');
            });

            setRoute(
                navigatorInstance.getCurrentRoute()?.name === 'Profile'
                    ? 'Tabs'
                    : navigatorInstance.getCurrentRoute()?.name
            );
        });
    }, []);

    const hasBottomBar =
        currentRoute !== undefined ? currentRoute === 'Tabs' : undefined;

    const bottomOffset = useMemo(() => {
        // calculate offset after all dependencies are initialized
        if (bottomInsetsOffset === undefined || hasBottomBar === undefined) {
            return undefined;
        }

        let offset = bottomInsetsOffset + 10;

        if (hasBottomBar) {
            offset += Platform.select({ios: 49, android: 56})!;
        }

        return offset;
    }, [bottomInsetsOffset, hasBottomBar]);

    useEffect(() => {
        (async () => {
            const isUserLoggedIn = Boolean(await getUserId());

            if (
                isUserLoggedIn &&
                prevNetInfo.current === false &&
                isConnected === true
            ) {
                Toast.hide();

                Toast.show({
                    type: 'internetAvailable',
                    position: 'bottom',
                    autoHide: true,
                    visibilityTime: 5000,
                    bottomOffset
                });
            }

            prevNetInfo.current = isConnected;
        })();
    }, [bottomOffset, isConnected]);

    useEffect(() => {
        if (!isConnected) setCanDisplayOfflinePopup(true);
    }, [isConnected]);

    useEffect(() => {
        (async () => {
            const isUserLoggedIn = Boolean(await getUserId());
            const isOpenedNotFromDeepLink = !(await Linking.getInitialURL());

            if (
                isOpenedNotFromDeepLink &&
                isUserLoggedIn &&
                isConnected === false &&
                bottomOffset !== undefined &&
                canDisplayOfflinePopup && // display offline popup only in case isConnected has changed
                isFocused
            ) {
                Toast.show({
                    type: 'internetNotAvailable',
                    position: 'bottom',
                    autoHide: true,
                    visibilityTime: 5000,
                    bottomOffset
                });

                setCanDisplayOfflinePopup(false);
            }
        })();
    }, [isConnected, bottomOffset, canDisplayOfflinePopup, isFocused]);
};

const InternetNotAvailable = () => {
    const {t} = useTranslation();

    return (
        <View style={internetAvailabilityToastStyles.container}>
            <View style={internetAvailabilityToastStyles.toastBlock}>
                {
                    SVG(
                        undefined,
                        undefined,
                        internetAvailabilityToastStyles.icon
                    )['connection-broken']
                }
                <View>
                    <Text style={internetAvailabilityToastStyles.text}>
                        {t('No internet connection')}
                    </Text>
                    <Text
                        allowFontScaling={false}
                        style={internetAvailabilityToastStyles.description}>
                        {t('Some options are not available offline.')}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const InternetAvailable = () => {
    const {t} = useTranslation();

    return (
        <View style={internetAvailabilityToastStyles.container}>
            <View style={internetAvailabilityToastStyles.toastBlock}>
                {
                    SVG(
                        undefined,
                        undefined,
                        internetAvailabilityToastStyles.icon
                    )['connection-restored']
                }
                <View>
                    <Text style={internetAvailabilityToastStyles.text}>
                        {t('Internet connection is restored')}
                    </Text>
                    <Text />
                </View>
            </View>
        </View>
    );
};

export const toastConfig = {
    internetNotAvailable: () => <InternetNotAvailable />,
    internetAvailable: () => <InternetAvailable />
};

const internetAvailabilityToastStyles = StyleSheet.create({
    container: {
        height: 62,
        width: '100%',
        paddingHorizontal: 15
    },
    toastBlock: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                backgroundColor: colors.toastBackground,
                borderRadius: 13
            },
            android: {
                backgroundColor: colors.toastBackgroundAndroid
            }
        })
    },
    icon: {
        paddingHorizontal: 35
    },
    text: {
        color: colors.toastText,
        ...fontFamily({
            size: isIOS ? 15 : 14,
            weight: '600',
            iosFamily: 'SFProText'
        })
    },
    description: {
        color: colors.toastText,
        ...fontFamily({
            size: isIOS ? 15 : 14,
            weight: '400',
            iosFamily: 'SFProText'
        }),
        letterSpacing: -0.244
    }
});
