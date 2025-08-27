import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {
    Image,
    Platform,
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    BackHandler
} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';
import {useTheme} from 'react-native-elements';
import {fontFamily, isIOS} from 'app/utilities/helpers';
import {GenericButton} from 'app/components/common/GenericButton';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from 'app/navigation/StackParamsList';
import {useDispatch, useSelector} from 'react-redux';
import {addTermsAndConditionsVersionSuccess} from 'app/store/actions';
import {termsAndConditionsLatestVersionSelector} from 'app/store/selectors/auth';

type Props = StackScreenProps<RootStackParamList, 'TermsAndConditionsUpdate'>;

export const TermsAndConditionsUpdateScreen: React.FC<Props> = ({
    navigation
}) => {
    const {t} = useTranslation();
    const {isConnected} = useNetInfo();
    const {theme} = useTheme();
    const dispatch = useDispatch();
    const termsAndConditionsLatestVersion: number | undefined = useSelector(
        termsAndConditionsLatestVersionSelector
    );

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => true
        );

        return () => backHandler.remove();
    }, []);

    const onContinue = () => {
        dispatch(
            addTermsAndConditionsVersionSuccess(
                termsAndConditionsLatestVersion as number
            )
        );

        navigation.goBack();
    };

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
                    title="Continue"
                    type="primary"
                    onPress={onContinue}
                    disabled={!isConnected}
                />
            </View>
            <View style={styles.footerContainer}>
                <Text style={[styles.termsText, styles.termsTextBold]}>
                    {t('The Terms and Conditions have been updated')}
                </Text>
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
                        onPress={() => {
                            navigation.navigate('TermsAndConditions');
                        }}>
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
        textDecorationLine: 'underline'
    }
});
