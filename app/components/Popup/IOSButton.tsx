import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-elements';
import {normalize} from '../../utilities/helpers';



type IOSButtonProps = {
    btnTitle: string;
    index: number;
    onPress?: () => void;
    disabled?: boolean;
};

export const IOSButton: React.FC<IOSButtonProps> = (
    {
        btnTitle,
        index,
        onPress,
        disabled
    }) => {
        const {
            theme: {
                colors: {
                    dark,
                    profileImageActionText,
                    disabledText,
                    popup: {background: buttonBorder}
                }
            }
        } = useTheme();
        const backgroundColor = index === 0 ? 'transparent' : dark;
        return (
            <Pressable
                key={btnTitle}
                style={({pressed}) => [
                    styles.buttonContainer,
                    {
                        borderColor: buttonBorder,
                        backgroundColor
                    },
                    styles.buttonContainerRow,
                    pressed && styles.opacity,
                    {
                        backgroundColor: disabled
                            ? disabledText
                            : backgroundColor
                    }
                ]}
                disabled={disabled}
                onPress={onPress}
                >
                <Text
                    style={[
                        styles.button,
                        {
                            color:
                                index === 0 ? dark : profileImageActionText
                        }
                    ]}>
                    {btnTitle}
                </Text>
            </Pressable>
        );
    };

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: 'transparent',
        height: normalize(43),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 20,
        marginHorizontal: 5,
        marginVertical: 10,
        paddingHorizontal: 2
    },
    button: {
        fontFamily: 'SFProText-Regular',
        fontSize: normalize(14),
        fontWeight: '600'
    },
    buttonContainerRow: {
        flex: 1
    },
    opacity: {
        opacity: 0.7
    },
});