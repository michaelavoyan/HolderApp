import React from 'react';
import {
    StyleSheet,
    Pressable,
    PressableProps,
    Text,
    ViewStyle,
    View,
    TextStyle
} from 'react-native';

import {useTheme} from 'react-native-elements';
import {fontFamily, isIOS} from 'app/utilities/helpers';

import {SVG} from '../../../assets/icons';

export const NextButton: React.FC<Omit<PressableProps, 'children'> & {
    title?: string;
    containerStyle?: ViewStyle | ViewStyle[];
    textStyle?: TextStyle | TextStyle[];
    chevronStyle?: ViewStyle | ViewStyle[];
    border?: 'top' | 'bottom' | 'both';
    children?: React.ReactNode;
    withoutChevron?: boolean;
    withoutOpacity?: boolean;
}> = ({
    title,
    containerStyle,
    chevronStyle,
    border,
    children,
    textStyle,
    withoutChevron,
    withoutOpacity,
    ...props
}) => {
    const {
        theme: {
            colors: {
                dark,
                primaryAndroid,
                inputBorder,
                secondaryText,
                disabledText
            }
        }
    } = useTheme();

    let borderStyles: ViewStyle = {borderColor: inputBorder};

    switch (border) {
        case 'both':
            borderStyles = {
                ...borderStyles,
                borderTopWidth: 1,
                borderBottomWidth: 1
            };
            break;
        case 'top':
            borderStyles = {...borderStyles, borderTopWidth: 1};
            break;
        case 'bottom':
            borderStyles = {...borderStyles, borderBottomWidth: 1};
            break;
        default:
            break;
    }

    return (
        <Pressable
            {...props}
            style={({pressed}) => [
                styles.touchableContainer,
                containerStyle,
                isIOS ? {opacity: pressed ? 0.5 : 1} : {},
                borderStyles,
                withoutOpacity ? {opacity: 1} : {}
            ]}
            android_ripple={{
                color: primaryAndroid
            }}>
            <View style={styles.content}>
                {title ? (
                    <Text
                        style={[
                            styles.text,
                            {
                                color: dark
                            },
                            textStyle
                        ]}>
                        {title}
                    </Text>
                ) : null}
                {children}
            </View>

            {!withoutChevron && (
                <View style={chevronStyle}>
                    {
                        SVG(props.disabled ? disabledText : secondaryText, 14)[
                            'chevron-right'
                        ]
                    }
                </View>
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    touchableContainer: {
        paddingVertical: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1
    },
    text: {
        marginRight: 30,
        flexShrink: 5,
        ...fontFamily({size: 11, iosFamily: 'SFProText'})
    },
    content: {
        flexDirection: 'column'
    }
});
