import React, {useCallback, useRef, useState} from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TextInputProps,
    Animated,
    Easing,
    TouchableOpacity,
    FlexStyle,
    PixelRatio,
    NativeSyntheticEvent,
    TextInputFocusEventData
} from 'react-native';
import {useTheme} from 'react-native-elements';
import {fontFamily, normalize} from '../../../utilities/helpers';

export const GenericInput: React.FC<
    {
        label: string;
        error?: string;
        containerStyle?: FlexStyle;
    } & TextInputProps
> = ({
    error,
    label,
    onBlur,
    onChangeText,
    containerStyle = {},
    defaultValue,
    autoCapitalize = 'none',
    onFocus,
    ...props
}) => {
    const [inputValue, setValue] = useState(defaultValue || '');
    const ref = useRef<TextInput>(null);
    const scale = useRef(new Animated.Value(1.0)).current;
    const translateY = useRef(new Animated.Value(0)).current;
    const translateX = useRef(new Animated.Value(0)).current;
    const {theme} = useTheme();

    const onInputChange = useCallback(
        (text: string) => {
            setValue(text);

            if (onChangeText) {
                onChangeText(text);
            }
        },
        [onChangeText]
    );

    const animateLabel = useCallback(
        (focused: boolean) => {
            if (!focused && inputValue) {
                return;
            }

            Animated.parallel([
                Animated.timing(scale, {
                    toValue: focused ? 0.866 : 1,
                    duration: 400,
                    useNativeDriver: true,
                    easing: Easing.bezier(0.25, 0.8, 0.25, 1.0)
                }),
                Animated.timing(translateY, {
                    toValue: focused ? -26 : 0,
                    duration: 400,
                    useNativeDriver: true,
                    easing: Easing.bezier(0.25, 0.8, 0.25, 1.0)
                }),
                Animated.timing(translateX, {
                    toValue: focused ? -6 : 0,
                    duration: 400,
                    useNativeDriver: true,
                    easing: Easing.bezier(0.25, 0.8, 0.25, 1.0)
                })
            ]).start();
        },
        [inputValue, scale, translateX, translateY]
    );

    const onPressLabel = useCallback(() => {
        ref.current?.focus();
    }, []);

    const handleBlur = useCallback(
        (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
            if (onBlur) {
                onBlur(e);
            }
            if (!props.value) {
                animateLabel(false);
            }
        },
        [animateLabel, onBlur, props.value]
    );

    return (
        <View style={containerStyle}>
            <TextInput
                {...props}
                onChangeText={onInputChange}
                ref={ref}
                style={[
                    styles.input,
                    {
                        borderColor: theme.colors.inputBorder
                    },
                    error ? {borderColor: theme.colors.error} : {}
                ]}
                autoCapitalize={autoCapitalize}
                onFocus={(e) => {
                    animateLabel(true);

                    onFocus?.(e);
                }}
                onBlur={handleBlur}
                defaultValue={defaultValue}
            />
            <Animated.View
                style={[
                    styles.label,
                    {transform: [{scale}, {translateY}, {translateX}]},
                    defaultValue && inputValue
                        ? {
                              transform: [
                                  {translateX: -5.2},
                                  {translateY: -22.5},
                                  {scale: 0.866}
                              ]
                          }
                        : {}
                ]}>
                <TouchableOpacity activeOpacity={1} onPress={onPressLabel}>
                    <Text
                        style={[
                            styles.text,
                            {color: theme.colors.secondaryText},
                            error ? {color: theme.colors.error} : {}
                        ]}>
                        {label}
                    </Text>
                </TouchableOpacity>
            </Animated.View>
            {error ? (
                <Text
                    style={[
                        styles.error,
                        {
                            color: theme.colors.error
                        }
                    ]}>
                    {error}
                </Text>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        ...fontFamily({size: 15, android: {size: 16}}),
        position: 'absolute',
        top: 18
    },
    text: {
        fontFamily: 'SFProDisplay-Regular',
        fontSize: normalize(15),
        textAlignVertical: 'center'
    },
    input: {
        ...fontFamily({size: 15, android: {size: 16}}),
        borderBottomWidth: 1,
        height: 56 * PixelRatio.getFontScale(),
        paddingRight: 44
    },
    error: {
        width: '100%',
        fontSize: normalize(12)
    }
});
