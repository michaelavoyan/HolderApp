import {isIOS} from 'app/utilities/helpers';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Platform, Pressable, StyleSheet, Text} from 'react-native';
import {useTheme} from 'react-native-elements';

interface Props {
    onPress: () => void;
}

export const ShareNowButton = ({onPress}: Props) => {
    const {t} = useTranslation();
    const {
        theme: {
            colors: {primary, primaryAndroid}
        }
    } = useTheme();

    return (
        <Pressable
            style={({pressed}) => [
                styles.container,
                {opacity: isIOS && pressed ? 0.8 : 1}
            ]}
            android_ripple={{color: primaryAndroid, borderless: false}}
            onPress={onPress}>
            <Text
                style={[
                    styles.text,
                    {
                        color: Platform.select({
                            ios: primary,
                            android: primaryAndroid
                        })
                    }
                ]}>
                {t('Share now')}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 12,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#7676801A',
        marginTop: 20,
        borderRadius: 20
    },
    text: {
        fontSize: 17,
        lineHeight: 19
    }
});
