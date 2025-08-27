import React from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme} from 'react-native-elements';
import {isIOS} from 'app/utilities/helpers';
import {SVG} from '../../../assets/icons';

export const BackIcon: React.FC<{
    color?: string;
    withoutPaddings?: boolean;
}> = ({color, withoutPaddings = false}) => {
    const {theme} = useTheme();

    return (
        <View
            style={[styles.icon, withoutPaddings ? null : styles.extendedIcon]}>
            {
                SVG(color || theme.colors.primary, 16)[
                    isIOS ? 'back' : 'back-android'
                ]
            }
        </View>
    );
};

export const BackButton: React.FC<{
    onPress?: () => void;
    color?: string;
}> = ({onPress, color}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <BackIcon color={color} withoutPaddings />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: 44,
        height: 44,
        ...Platform.select({
            android: {
                marginLeft: 24,
                marginRight: -24
            }
        })
    },
    icon: {
        marginLeft: -3
    },
    extendedIcon: {
        ...Platform.select({
            ios: {
                left: -26,
                paddingLeft: 26,
                paddingVertical: 14,
                paddingRight: 14
            }
        })
    }
});
