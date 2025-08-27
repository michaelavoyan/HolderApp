import React, {useRef, useEffect} from 'react';
import {
    Pressable,
    View,
    StyleSheet,
    FlexStyle,
    Animated,
    Platform
} from 'react-native';
import {useTheme} from 'react-native-elements';

export type PressableDotsProps = {
    onPress: (index: number) => void;
    length: number;
    selectedIndex: number;
    containerStyles?: FlexStyle | FlexStyle[];
    isBackgroundHidden: boolean;
    // IOS component doesn't have skip button but Android does
    // eslint-disable-next-line react/no-unused-prop-types
    onSkip?: () => void;
    // eslint-disable-next-line react/no-unused-prop-types
    onFinish?: () => void;
};

export const PressableDots: React.FC<PressableDotsProps> = ({
    onPress,
    length,
    selectedIndex,
    containerStyles,
    isBackgroundHidden = false
}) => {
    const {
        theme: {colors}
    } = useTheme();

    const opacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const animation = Animated.timing(opacity, {
            toValue: isBackgroundHidden ? 0 : 1,
            duration: 100,
            useNativeDriver: true
        });

        animation.start();

        return () => animation.stop();
    }, [isBackgroundHidden, opacity]);

    const getDotColor = (index: number) =>
        Platform.select({
            ios: selectedIndex === index ? colors.dark : colors.disabledText
        });

    const getButtonStyles = (index: number) => {
        if (index === 0) {
            return styles.firstDot;
        }

        if (index === length - 1) {
            return styles.lastDot;
        }

        return undefined;
    };

    return (
        <View style={[styles.container, containerStyles]}>
            <Animated.View
                style={[
                    StyleSheet.absoluteFill,
                    styles.background,
                    {backgroundColor: colors.grayLight, opacity}
                ]}
            />

            {Array.from({length})
                .map((_, i) => i)
                .map((value, i) => (
                    <Pressable
                        key={value}
                        style={[styles.button, getButtonStyles(i)]}
                        onPress={() => onPress(i)}>
                        <View
                            style={[
                                styles.dot,
                                {backgroundColor: getDotColor(i)}
                            ]}
                        />
                    </Pressable>
                ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    background: {
        borderRadius: 15
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    dot: {
        width: 7,
        height: 7,
        borderRadius: 4
    },
    firstDot: {
        paddingLeft: 17
    },
    lastDot: {
        paddingRight: 17
    }
});
