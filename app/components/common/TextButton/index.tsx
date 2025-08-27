import React from 'react';
import {
    StyleSheet,
    Pressable,
    PressableProps,
    Text,
    Platform,
    FlexStyle,
    TextStyle
} from 'react-native';
import {useTheme} from 'react-native-elements';
import {fontFamily, isIOS} from 'app/utilities/helpers';

export const TextButton: React.FC<
    Omit<PressableProps, 'children'> & {
        title: string;
        containerStyle?: FlexStyle;
        textStyle?: TextStyle;
    }
> = ({title, containerStyle, textStyle, ...props}) => {
    const {
        theme: {
            colors: {primaryAndroid, primary, disabledAndroid}
        }
    } = useTheme();

    const androidColor = props.disabled ? disabledAndroid : primaryAndroid;

    return (
        <Pressable
            {...props}
            onPress={props.disabled ? () => {} : props.onPress}
            style={({pressed}) => [
                styles.touchableContainer,
                containerStyle,
                isIOS ? {opacity: pressed ? 0.5 : 1} : {}
            ]}
            android_ripple={{
                color: primaryAndroid,
                borderless: true,
                ...props.android_ripple
            }}>
            <Text
                style={[
                    styles.text,
                    textStyle,
                    {
                        color: isIOS ? primary : androidColor
                    }
                ]}>
                {title}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    touchableContainer: {
        padding: 8
    },
    text: {
        ...fontFamily({size: 14, weight: '500'}),
        ...Platform.select({
            android: {
                textTransform: 'uppercase'
            }
        })
    }
});
