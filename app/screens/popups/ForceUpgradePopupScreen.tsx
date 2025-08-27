import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StackScreenProps} from '@react-navigation/stack';
import {View, Text, StyleSheet, Platform, Linking} from 'react-native';
import {useTheme} from 'react-native-elements';
import {VCLEnvironment} from '@velocitycareerlabs/vcl-react-native';

import {APPLE_CONNECT_URL, GOOGLE_PLAY_URL} from 'app/configs';
import {ModalBackground} from 'app/components/common/ModalBackground';
import {RootStackParamList} from '../../navigation/StackParamsList';
import {fontFamily, normalize} from '../../utilities/helpers';

import {GenericButton} from '../../components/common/GenericButton';
import SplashScreen from '../../components/common/SplashScreen';

type Props = StackScreenProps<RootStackParamList, 'ForceUpgradePopup'>;

const nonProdDescription =
    'An update to the application is required to continue. \nPlease close the app and download a new version.';
const prodDescription = 'An update to the application is required to continue';

export const ForceUpgradePopupScreen: React.FC<Props> = ({
    route: {
        params: {env}
    }
}) => {
    const {
        theme: {
            colors: {secondaryBg}
        }
    } = useTheme();
    const [showPopup, setShowPopup] = useState(true);
    const {t} = useTranslation();
    const goToStore = () => {
        Linking.openURL(
            Platform.OS === 'ios' ? APPLE_CONNECT_URL : GOOGLE_PLAY_URL
        );
    };
    const handleOnClose = () => setShowPopup(false);
    const productionEnviroment = env === VCLEnvironment.Prod;

    return showPopup ? (
        <ModalBackground>
            <View
                style={[
                    styles.popup,
                    {
                        backgroundColor: secondaryBg
                    }
                ]}>
                <Text style={styles.title}>{t('Update Required')}</Text>
                <Text style={styles.description}>
                    {t(
                        productionEnviroment
                            ? prodDescription
                            : nonProdDescription
                    )}
                </Text>
                <GenericButton
                    width={253}
                    containerStyle={styles.btnGoToStore}
                    title={t(productionEnviroment ? 'Update' : 'OK')}
                    type="primary"
                    onPress={productionEnviroment ? goToStore : handleOnClose}
                />
            </View>
        </ModalBackground>
    ) : (
        <SplashScreen />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0
    },
    popup: {
        position: 'absolute',
        borderRadius: 14,
        width: '96.8%',
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            android: {
                borderRadius: 4,
                padding: 24
            }
        })
    },
    title: {
        ...fontFamily({
            size: 20,
            weight: '600'
        }),
        textAlign: 'center',
        marginVertical: 20,
        letterSpacing: 0.4,
        ...Platform.select({
            android: {
                marginBottom: 17,
                letterSpacing: 0.15
            }
        })
    },
    description: {
        textAlign: 'center',
        paddingTop: 10,
        fontWeight: '600',
        fontFamily: 'SFProText-Regular',
        fontSize: normalize(17),
        lineHeight: normalize(22),
        letterSpacing: -0.408,
        ...Platform.select({
            ios: {
                fontWeight: '400'
            }
        })
    },
    btnGoToStore: {
        margin: 30,
        ...Platform.select({
            android: {
                marginBottom: 20
            }
        })
    }
});
