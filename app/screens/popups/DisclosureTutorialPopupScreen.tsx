import React, {useCallback, useEffect} from 'react';
import {
    View,
    StyleSheet,
    Platform,
    Pressable,
    Text,
    TouchableOpacity
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {StackScreenProps} from '@react-navigation/stack/src/types';
import {useTheme} from 'react-native-elements';
import {useSelector} from 'react-redux';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

import {ModalBackground} from 'app/components/common/ModalBackground';
import {RootStackParamList} from 'app/navigation/StackParamsList';
import {ShareButton} from 'app/components/common/ShareButton';
import {verificationServiceDeepLinkSelector} from 'app/store/selectors/appConfig';
import {deepLinksOptions, linkHandler} from 'app/utilities/qr';
import {DeepLinkOptions} from 'app/utilities/types';
import {SVG} from 'app/assets/icons';
import {isIOS} from 'app/utilities/helpers';
import {useDisclosureTutorial} from 'app/utilities/hooks/useDisclosureTutorial';

type Props = StackScreenProps<RootStackParamList, 'DisclosureTutorialPopup'>;

export const DisclosureTutorialPopup = ({navigation}: Props) => {
    const {
        theme: {
            colors: {primaryAndroid, primary, dark}
        }
    } = useTheme();

    const color = Platform.select({
        ios: primary,
        android: primaryAndroid
    });

    const {t} = useTranslation();

    const verificationServiceDeepLink = useSelector(
        verificationServiceDeepLinkSelector
    );
    const {setShowDisclosureTutorial} = useDisclosureTutorial();

    useEffect(() => {
        setShowDisclosureTutorial(false);
    }, [setShowDisclosureTutorial]);

    const handleShare = useCallback(() => {
        navigation.goBack();

        const url = verificationServiceDeepLink;
        const {path, queryParams} = linkHandler(url);
        const linkOption = deepLinksOptions[path];
        if (!path || !linkOption) {
            return;
        }

        const params = linkOption.parseParams(queryParams);

        if (path === DeepLinkOptions.inspect) {
            const navigationParams = {
                ...params,
                deepLink: url,
                customTitle: t('Select credentials to share')
            } as RootStackParamList['DisclosureRequest'];

            navigation.navigate('DisclosureRequest', navigationParams);
        }
    }, [verificationServiceDeepLink, t, navigation]);

    const handleLearnMore = () => {
        navigation.goBack();

        navigation.navigate({
            name: 'SettingsTab',
            params: {
                screen: 'NewContentSettings',
                isOpenedFromSettings: true
            }
        });
    };

    return (
        <ModalBackground onPress={navigation.goBack} style={styles.modal}>
            <View style={styles.container}>
                <View
                    style={[
                        styles.shareButton,
                        {
                            borderColor: color
                        }
                    ]}>
                    <ShareButton onPress={handleShare} />
                </View>
                <ReanimatedSwipeable>
                    <TouchableOpacity
                        style={[styles.message, {borderColor: color}]}
                        activeOpacity={1}
                        onPress={handleShare}>
                        <Pressable
                            onPress={navigation.goBack}
                            style={({pressed}) => [
                                styles.close,
                                isIOS && pressed
                                    ? styles.opacity
                                    : styles.noOpacity
                            ]}
                            android_ripple={{
                                color: primaryAndroid,
                                borderless: true
                            }}>
                            {SVG(dark, 24).close}
                        </Pressable>
                        <Text style={styles.title}>
                            {t(
                                'Add credentials to your resume to prove your qualifications'
                            )}
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={handleLearnMore}>
                            <Text style={[{color}]}>
                                {t(
                                    'Learn more about what you can do with your credentials'
                                )}
                            </Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </ReanimatedSwipeable>
            </View>
        </ModalBackground>
    );
};

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-start'
    },
    container: {
        width: '100%',
        paddingTop: 15.5,
        paddingLeft: 16,
        paddingRight: 16
    },
    shareButton: {
        width: 58,
        height: 58,
        borderRadius: 100,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        alignSelf: 'flex-end',
        marginRight: 41,
        marginBottom: 18
    },
    message: {
        borderWidth: 2,
        borderRadius: 16,
        width: '100%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingBottom: 30,
        paddingTop: 35
    },
    close: {
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        position: 'absolute',
        top: 10,
        right: 10
    },
    opacity: {
        opacity: 0.7
    },
    noOpacity: {
        opacity: 1
    },
    title: {
        fontWeight: '600',
        fontSize: 17,
        lineHeight: 22,
        letterSpacing: -0.41,
        marginBottom: 12,
        paddingRight: 20
    },
    subtitle: {
        fontSize: 13,
        lineHeight: 17,
        letterSpacing: 0.2
    }
});
