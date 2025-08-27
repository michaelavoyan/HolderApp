import React from 'react';
import {useTranslation} from 'react-i18next';
import {
    Image,
    Platform,
    SafeAreaView,
    StyleSheet,
    View,
    Text
} from 'react-native';
import {VCLEnvironment} from '@velocitycareerlabs/vcl-react-native';
import {useNetInfo} from '@react-native-community/netinfo';
import {useTheme} from 'react-native-elements';
import {fontFamily, isIOS} from 'app/utilities/helpers';
import {GenericButton} from 'app/components/common/GenericButton';

import {VCL_ENVIRONMENT} from 'app/configs';

export const WelcomeScreen: React.FC<{
    onGetStarted: () => void;
    onSelectPersona: () => void;
    onTermsAndConditions: () => void;
    isSelectPersonaDisabled: boolean;
}> = ({
    onGetStarted,
    onSelectPersona,
    onTermsAndConditions,
    isSelectPersonaDisabled,
}) => {
    const {t} = useTranslation();
    const {isConnected} = useNetInfo();
    const {theme} = useTheme();
    const singUpButtonTitle = t('Get Started');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logo}>
                <Image
                    resizeMode="contain"
                    testID="logo"
                    style={styles.icon}
                    source={{
                        uri: isIOS
                            ? 'splash-screen'
                            : 'asset:/splash-screen.png'
                    }}
                />
            </View>
            <View style={styles.buttonsContainer}>
                <GenericButton
                    width={253}
                    containerStyle={styles.btnGetStarted}
                    title={
                        isIOS
                            ? singUpButtonTitle
                            : singUpButtonTitle.toUpperCase()
                    }
                    type="primary"
                    onPress={onGetStarted}
                    disabled={!isConnected}
                />
                {!isSelectPersonaDisabled &&
                    VCL_ENVIRONMENT !== VCLEnvironment.Prod && (
                        <GenericButton
                            width={253}
                            title={
                                isIOS
                                    ? t('Select Persona')
                                    : t('Select Persona').toUpperCase()
                            }
                            type="secondary"
                            onPress={onSelectPersona}
                            disabled={!isConnected}
                        />
                    )}
            </View>
            <View style={styles.footerContainer}>
                <Text style={styles.termsText}>
                    {t('By continuing, you agree to our')}{' '}
                    <Text
                        style={[
                            styles.termsText,
                            styles.link,
                            {
                                color: isIOS
                                    ? theme.colors.link
                                    : theme.colors.primaryAndroid
                            }
                        ]}
                        onPress={onTermsAndConditions}>
                        {t('Terms and Conditions')}
                    </Text>
                    .
                </Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 5
    },
    logo: {
        flex: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        width: 251,
        height: 251
    },
    btnGetStarted: {
        marginBottom: 30,
        ...Platform.select({
            android: {
                marginBottom: 20
            }
        })
    },
    buttonsContainer: {
        flex: 2,
        alignItems: 'center'
    },
    footerContainer: {
        paddingHorizontal: 37,
        paddingBottom: 20
    },
    termsText: {textAlign: 'center', ...fontFamily({size: 13})},
    termsTextBold: {
        ...fontFamily({size: 14, weight: '600'}),
        paddingBottom: 23
    },
    link: {
        textDecorationLine: 'underline',
    }
});
