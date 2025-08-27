import React from 'react';
import {
    Text,
    FlexStyle,
    StyleSheet,
    Pressable,
    Platform,
    ViewStyle,
    TextStyle,
    View,
    DimensionValue
} from 'react-native';
import {isNumber} from 'lodash/fp';
import {useTheme} from 'react-native-elements';

import {isIOS} from 'app/utilities/helpers';

const MIN_HEIGHT = 38;
const ANDROID_BORDER_RADIUS = 4;

const calculateBorderRadius = (height: DimensionValue) => {
    if (!isIOS) {
        return ANDROID_BORDER_RADIUS;
    }
    return (isNumber(height) ? height : MIN_HEIGHT) / 2;
};

export const GenericButton: React.FC<{
    title: string;
    onPress: () => void;
    type?: 'primary' | 'secondary' | 'reject';
    disabled?: boolean;
    width?: DimensionValue;
    height?: DimensionValue;
    containerStyle?: FlexStyle;
    textStyle?: TextStyle;
    flex?: 0 | 1;
    icon?: React.ReactNode;
}> = ({
    onPress,
    type = 'primary',
    disabled = false,
    title,
    width = 'auto',
    height = 'auto',
    containerStyle = {},
    textStyle = {},
    flex = 1,
    icon
}) => {
    const {theme} = useTheme();

    const commonStylesByType: {[key: string]: ViewStyle} = {
        primary: {
            backgroundColor: isIOS
                ? theme.colors.dark
                : theme.colors.primaryAndroid,
            ...(disabled
                ? {
                      backgroundColor: isIOS
                          ? theme.colors.disabledText
                          : theme.colors.disabledAndroid
                  }
                : {})
        },
        secondary: {
            borderWidth: 1,
            borderColor: isIOS
                ? theme.colors.primaryText
                : theme.colors.primaryAndroid,
            ...(disabled
                ? {
                      borderColor: isIOS
                          ? theme.colors.disabledText
                          : theme.colors.disabledAndroid
                  }
                : {})
        },
        reject: {
            borderWidth: 1,
            borderColor: disabled
                ? theme.colors.rejectDisabled
                : theme.colors.reject
        }
    };

    const commonStyles = {
        width,
        height,
        minHeight: isNumber(height) ? height : MIN_HEIGHT,
        borderRadius: calculateBorderRadius(height),
        ...commonStylesByType[type],
        flex,
        ...(width !== 'auto'
            ? {
                  flex: 0
              }
            : {})
    };

    const textTypeStylesByType: {[key: string]: TextStyle} = {
        primary: {
            color: theme.colors.secondaryBg
        },
        secondary: {
            color: isIOS
                ? theme.colors.primaryText
                : theme.colors.primaryAndroid,
            ...(disabled
                ? {
                      color: isIOS
                          ? theme.colors.disabledText
                          : theme.colors.disabledAndroid
                  }
                : {})
        },
        reject: {
            color: disabled ? theme.colors.rejectDisabled : theme.colors.reject
        }
    };

    const rippleColorByType: {[key: string]: string} = {
        secondary: theme.colors.primaryAndroid,
        primary: theme.colors.primaryText,
        reject: theme.colors.reject
    };

    return (
        <Pressable
            accessibilityRole="button"
            style={({pressed}) => [
                styles.container,
                commonStyles,
                containerStyle,
                Platform.select({
                    ios: {
                        ...(pressed ? styles.opacity : styles.noOpacity)
                    }
                })
            ]}
            android_ripple={{
                color: rippleColorByType[type]
            }}
            disabled={disabled}
            onPress={onPress}>
            {icon ? (
                <View style={styles.textWithIcon}>
                    <View style={styles.icon}>{icon}</View>
                    <Text style={[textTypeStylesByType[type], styles.text]}>
                        {title}
                    </Text>
                </View>
            ) : (
                <Text
                    style={[
                        textTypeStylesByType[type],
                        styles.text,
                        textStyle
                    ]}>
                    {title}
                </Text>
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 14,
        fontWeight: '600',
        textTransform: isIOS ? 'none' : 'uppercase'
    },
    textWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        paddingRight: 8
    },
    opacity: {
        opacity: 0.7
    },
    noOpacity: {
        opacity: 1
    }
});
