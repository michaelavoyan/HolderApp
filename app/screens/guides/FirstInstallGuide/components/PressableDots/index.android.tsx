import React from 'react';
import {Pressable, View, StyleSheet, Text} from 'react-native';
import {useTheme} from 'react-native-elements';

import {PressableDotsProps} from '.';

import {fontFamily, normalizeHeight} from '../../../../../utilities/helpers';

export const PressableDots: React.FC<PressableDotsProps> = ({
    onPress,
    length,
    selectedIndex,
    containerStyles,
    onSkip,
    onFinish
}) => {
    const {
        theme: {colors}
    } = useTheme();

    const getDotOpacity = (index: number) =>
        selectedIndex === index ? 1 : 0.4;

    return (
        <View
            style={[
                styles.container,
                containerStyles,
                {
                    backgroundColor: colors.androidLightBackground
                }
            ]}>
            <Button onPress={onSkip} title="SKIP" />
            <View style={styles.dots}>
                {Array.from({length})
                    .map((_, i) => i)
                    .map((value, i) => (
                        <Pressable
                            key={value}
                            style={styles.button}
                            onPress={() => onPress(i)}>
                            <View
                                style={[
                                    styles.dot,
                                    {
                                        backgroundColor:
                                            colors.primaryBgAndroid,
                                        opacity: getDotOpacity(i)
                                    }
                                ]}
                            />
                        </Pressable>
                    ))}
            </View>
            <Button
                onPress={() => {
                    if (selectedIndex + 1 <= length - 1) {
                        onPress(selectedIndex + 1);
                    } else {
                        onFinish?.();
                    }
                }}
                title="NEXT"
            />
        </View>
    );
};

const Button: React.FC<{
    title: string;
    onPress?: () => void;
}> = ({onPress, title}) => {
    const {
        theme: {
            colors: {primaryBgAndroid: color, separatingLine}
        }
    } = useTheme();

    return (
        <Pressable
            onPress={onPress}
            style={styles.buttonContainer}
            android_ripple={{
                color: separatingLine
            }}>
            <Text style={[styles.buttonText, {color}]}>{title}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        height: normalizeHeight(50),
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    dots: {
        flexDirection: 'row'
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    dot: {
        width: 7,
        height: 7,
        borderRadius: 10
    },
    buttonContainer: {
        height: '100%',
        paddingHorizontal: 16,
        justifyContent: 'center'
    },
    buttonText: {
        ...fontFamily({size: 14, weight: '500'})
    }
});
