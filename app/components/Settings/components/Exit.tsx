import React from 'react';
import {useTranslation} from 'react-i18next';
import {Platform, Pressable, StyleSheet, Text} from 'react-native';
import {useTheme} from 'react-native-elements';
import {fontFamily} from '../../../utilities/helpers';

export const Exit: React.FC<{
    onPress: () => void;
}> = ({onPress}) => {
    const {
        theme: {
            colors: {secondaryBg, primaryAndroid, inputBorder, error}
        }
    } = useTheme();
    const {t} = useTranslation();
    return (
        <Pressable
            style={({pressed}) => [
                styles.container,
                Platform.select({
                    ios: {
                        ...(pressed ? styles.opacity : styles.noOpacity)
                    }
                }),
                {backgroundColor: secondaryBg, borderColor: inputBorder}
            ]}
            android_ripple={{
                color: primaryAndroid
            }}
            onPress={onPress}>
            <Text style={[styles.title, {color: error}]}>{t('Exit')}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 48,
        flex: 1,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    opacity: {
        opacity: 0.7
    },
    noOpacity: {
        opacity: 1
    },
    title: {
        ...fontFamily({size: 16})
    }
});
