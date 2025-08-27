import {View, Image, StyleSheet} from 'react-native';
import React, { useEffect } from 'react';
import {useTheme} from 'react-native-elements';
import Splash from 'react-native-splash-screen';
import {isIOS} from '../../utilities/helpers';

const SplashScreen = () => {
    const {
        theme: {
            colors: {white}
        }
    } = useTheme();

    useEffect(() => {
        requestAnimationFrame(() => {
            Splash.hide();
        });
    }, [])
    return (
        <View style={[styles.container, {backgroundColor: white}]}>
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
        </View>
    );
};
export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0
    },
    logo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        width: 166,
        height: 166
    }
});
