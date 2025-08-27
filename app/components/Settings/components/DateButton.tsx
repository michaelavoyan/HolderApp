import React from 'react';
import {useTranslation} from 'react-i18next';
import {Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import {useTheme} from 'react-native-elements';
import {fontFamily} from '../../../utilities/helpers';

export const DateButton: React.FC<{
    onPress: () => void;
    value: string;
}> = ({onPress, value}) => {
    const {t} = useTranslation();
    const DATE_FORMATS: {[key: string]: string} = {
        default: t('Default'),
        'en-US': t('US'),
        'en-GB': t('Europe')
    };
    const {
        theme: {
            colors: {secondaryBg, primaryAndroid, secondaryText, inputBorder}
        }
    } = useTheme();

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
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{t('Select date format')}</Text>
            </View>

            <View style={styles.valueContainer}>
                <Text
                    style={[
                        styles.value,
                        {
                            color: secondaryText
                        }
                    ]}>
                    {DATE_FORMATS[value]}
                </Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 34,
        ...Platform.select({
            ios: {
                paddingRight: 24
            }
        }),
        paddingVertical: 17
    },
    opacity: {
        opacity: 0.7
    },
    noOpacity: {
        opacity: 1
    },
    titleContainer: {
        flexShrink: 5,
        marginRight: 10
    },
    title: {
        ...fontFamily({size: 15})
    },
    valueContainer: {
        alignItems: 'flex-end',
        flexGrow: 2
    },
    value: {
        ...fontFamily({size: 14, iosFamily: 'SFProText'})
    }
});
