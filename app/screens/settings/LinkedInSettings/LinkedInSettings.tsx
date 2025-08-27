import React, {useCallback, useEffect, useState} from 'react';
import {
    ActivityIndicator,
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {StackScreenProps} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from 'react-native-elements';

import {useSelector} from 'react-redux';
import {LIKED_IN_CONFIG} from 'app/api/linkedin-config';
import {StatusMessages} from 'app/screens/popups/type';
import {configSelector} from 'app/store/selectors/appConfig';
import {warnUserAboutLinkedinApp} from 'app/utilities/linkedin';
import { IConfig } from 'app/store/types/appConfig';
import i18n from '../../../i18n';
import {SettingsStackParamList} from '../../../navigation/StackParamsList';
import {GenericButton} from '../../../components/common/GenericButton';
import {LinkedInGenerateToken} from './LinkedInGenerateToken';
import {
    getLinkedInAccessToken,
    removeLinkedInAccessToken,
    saveLinkedInAccessToken
} from '../../../storage/asyncStorage';
import {revokeLinkedInToken, useLinkedInProfileData} from './utils';
import {fontFamily, isIOS, normalize} from '../../../utilities/helpers';
import {
    closeGenericPopup,
    openGenericPopup,
    openNoInternetPopupIfOffline,
    openStatusPopup
} from '../../../utilities/popups';
import {SVG} from '../../../assets/icons';

type Props = StackScreenProps<SettingsStackParamList, 'LinkedIn'>;

const LinkedInErrors = {
    canceledByUser: 'user_cancelled_login'
};

export const LinkedInSettings: React.FC<Props> = ({route: {params}}) => {
    const navigation = useNavigation();
    const [accessToken, setAccessToken] = useState<string>();
    const [isRevoking, setIsRevoking] = useState<boolean>(false);
    const config: IConfig = useSelector(configSelector);
    const {email, name, error} = useLinkedInProfileData(config, accessToken);
    const openCodeErrorPopup = useCodeErrorPopup();
    const {t} = useTranslation();
    const openConnectSuccessPopup = useConnectSuccessPopup(
        params ? params.onSuccess : undefined
    );
    const openTryAgainLaterPopup = useTryAgainLaterPopup();
    const [hideGenerateToken, setGenerateToken] = useState(false);
    const [isWarningShown, setIsWarningShown] = useState(false);

    const {
        theme: {
            colors: {secondaryBg, primaryBgIOS}
        }
    } = useTheme();

    const handleGetCodeSuccess = useCallback(async () => {
        setGenerateToken(true);
        openGenericPopup({
            params: {
                title: t('Connecting...'),
                description: '',
                showSpinner: true
            }
        });
    }, [t]);

    const handleGetCodeError = useCallback(
        async (linkedInError: string) => {
            const isOfflinePopupVisible = await openNoInternetPopupIfOffline({
                onPress: navigation.goBack
            });

            if (isOfflinePopupVisible) {
                return;
            }

            navigation.goBack();

            if (linkedInError === LinkedInErrors.canceledByUser) {
                return;
            }

            openCodeErrorPopup();
        },
        [navigation, openCodeErrorPopup]
    );

    const handleGetTokenSuccess = useCallback(
        async (token: string) => {
            await saveLinkedInAccessToken(token);
            setAccessToken(token);
            openConnectSuccessPopup();
            closeGenericPopup();
        },
        [openConnectSuccessPopup]
    );

    const handleGetTokenError = useCallback(async () => {
        openNoInternetPopupIfOffline({
            onPress: navigation.goBack
        });

        closeGenericPopup();
    }, [navigation.goBack]);

    useEffect(() => {
        getLinkedInAccessToken()
            .then((token) => setAccessToken(token || ''))
            .catch();
    }, []);

    useEffect(() => {
        (async () => {
            if (!error) {
                return;
            }

            const isOfflinePopupVisible = await openNoInternetPopupIfOffline({
                onPress: navigation.goBack
            });

            if (isOfflinePopupVisible) {
                return;
            }

            await removeLinkedInAccessToken();

            setAccessToken('');
        })();
    }, [error, navigation, openTryAgainLaterPopup]);

    useEffect(() => {
        if (error && error.status === 401) {
            openStatusPopup({
                params: {
                    statusType: StatusMessages.Error,
                    title: i18n.t('Check your LinkedIn privacy settings'),
                    text: i18n.t(
                        'In your LinkedIn account, make sure Velocity Career Wallet is listed under Permitted Services in Data Privacy'
                    )
                }
            });
        }
    }, [error]);

    useEffect(() => {
        if (accessToken && !name) {
            return;
        }

        if (
            !params?.fromShare &&
            !error &&
            !isWarningShown &&
            accessToken !== undefined
        ) {
            warnUserAboutLinkedinApp(() => setIsWarningShown(true));
        }
    }, [params?.fromShare, accessToken, name, isWarningShown, error]);

    if (accessToken === '') {
        return (
            <View style={[styles.root, styles.generateTokenContainer]}>
                <LinkedInGenerateToken
                    clientId={LIKED_IN_CONFIG.CLIENT_ID}
                    clientSecret={LIKED_IN_CONFIG.CLIENT_SECRET}
                    redirectUri={LIKED_IN_CONFIG.REDIRECT_URI}
                    onGetTokenSuccess={handleGetTokenSuccess}
                    onGetTokenError={handleGetTokenError}
                    onGetCodeSuccess={handleGetCodeSuccess}
                    onGetCodeError={handleGetCodeError}
                />
                {hideGenerateToken ? (
                    <View
                        style={[
                            StyleSheet.absoluteFillObject,
                            {backgroundColor: secondaryBg}
                        ]}
                    />
                ) : null}
            </View>
        );
    }

    if (!accessToken || !name || error) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    const handleRevoke = async () => {
        setIsRevoking(true);
        try {
            await revokeLinkedInToken({
                token: accessToken,
                clientId: LIKED_IN_CONFIG.CLIENT_ID,
                clientSecret: LIKED_IN_CONFIG.CLIENT_SECRET,
                config
            });
            await removeLinkedInAccessToken();
            openStatusPopup({
                params: {
                    title: t('Success'),
                    text: t('Linkedin connection was revoked'),
                    statusType: StatusMessages.Done,
                    onPress: () => navigation.goBack()
                }
            });
        } catch (e) {
            const isOfflinePopupVisible = await openNoInternetPopupIfOffline({
                onPress: navigation.goBack
            });

            if (isOfflinePopupVisible) {
                return;
            }

            openTryAgainLaterPopup();
        } finally {
            setIsRevoking(false);
        }
    };

    return (
        <View
            style={[
                styles.root,
                isIOS && {
                    backgroundColor: secondaryBg
                }
            ]}>
            <Text style={styles.title}>{t('Connected account')}</Text>
            <View
                style={[
                    styles.cardWrapper,
                    {backgroundColor: isIOS ? primaryBgIOS : secondaryBg}
                ]}>
                <View style={styles.profile}>
                    <View>
                        <Text style={styles.name}>{name}</Text>
                        <Text>{email}</Text>
                    </View>
                    <View style={styles.imageWrapper}>
                        {SVG(undefined, 32)['linkedin-account']}
                    </View>
                </View>
                {isRevoking ? (
                    <ActivityIndicator size="large" />
                ) : (
                    <GenericButton
                        containerStyle={styles.revoke}
                        width={isIOS ? 143 : 130}
                        type="secondary"
                        title={t('Remove')}
                        onPress={handleRevoke}
                    />
                )}
            </View>
        </View>
    );
};

const useTryAgainLaterPopup = () => {
    const navigation = useNavigation();
    return useCallback(
        () =>
            openStatusPopup({
                params: {
                    title: i18n.t('Error'),
                    text: i18n.t('Please try again later'),
                    statusType: StatusMessages.Error,
                    onPress: () => navigation.goBack()
                }
            }),
        [navigation]
    );
};

const useConnectSuccessPopup = (onSuccess?: () => void) => {
    const navigation = useNavigation();
    return useCallback(() => {
        openStatusPopup({
            params: {
                title: i18n.t('Great!'),
                statusType: StatusMessages.Done,
                text: i18n.t(
                    'You have successfully connected your LinkedIn account'
                ),
                onPress: onSuccess || navigation.goBack
            }
        });
    }, [navigation, onSuccess]);
};

const useCodeErrorPopup = () => {
    return useCallback(() => {
        openStatusPopup({
            params: {
                statusType: StatusMessages.Error,
                title: i18n.t('Error'),
                text: i18n.t(
                    'We were unable to establish a connection with your LinkedIn profile. Please try to re-establish the connection.'
                )
            }
        });
    }, []);
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        flexDirection: 'column',
        paddingVertical: 20,
        paddingHorizontal: 16
    },
    generateTokenContainer: {padding: 0},
    loader: {
        flex: 1,
        justifyContent: 'center'
    },
    name: {
        ...fontFamily({size: 17, weight: '600'}),
        paddingBottom: 4
    },
    title: {
        ...fontFamily({size: 22, weight: '600', android: {weight: 'bold'}}),
        lineHeight: normalize(26),
        letterSpacing: 0.4,
        ...Platform.select({
            ios: {
                paddingBottom: 22
            },
            android: {
                paddingBottom: 14
            }
        })
    },
    cardWrapper: {
        padding: 20,
        ...Platform.select({
            ios: {
                borderRadius: 10
            },
            android: {
                borderRadius: 4
            }
        })
    },
    profile: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 30,
        flexWrap: 'wrap'
    },
    imageWrapper: {
        paddingBottom: 10
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 50,
        marginRight: 16
    },
    revoke: {flex: 0}
});
