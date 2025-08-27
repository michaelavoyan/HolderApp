import React, {useRef} from 'react';
import {
    Pressable,
    Text,
    StyleSheet,
    FlexStyle,
    Animated,
    ViewStyle
} from 'react-native';
import {useTheme} from 'react-native-elements';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import {SVG} from '../../../../assets/icons';

import {fontFamily, isIOS} from '../../../../utilities/helpers';

type ButtonProps = {
    onPress: () => void;
    containerStyles?: FlexStyle;
};

export const ReplayButton: React.FC<ButtonProps> = ({
    containerStyles,
    onPress
}) => {
    const scale = useRef(new Animated.Value(1)).current;

    const onPressCb = () => {
        ReactNativeHapticFeedback.trigger('impactLight');

        const animation = Animated.sequence([
            Animated.timing(scale, {
                toValue: 1.15,
                duration: 125,
                useNativeDriver: true
            }),
            Animated.timing(scale, {
                toValue: 0,
                duration: 20,
                useNativeDriver: true
            })
        ]);

        animation.start(() => {
            onPress();
        });
    };

    return (
        <Pressable onPress={onPressCb} style={containerStyles}>
            {isIOS ? (
                <IosButton
                    containerStyles={{
                        transform: [{scale: (scale as unknown) as number}]
                    }}
                />
            ) : (
                <AndroidButton
                    containerStyles={{
                        transform: [{scale: (scale as unknown) as number}]
                    }}
                />
            )}
        </Pressable>
    );
};

const IosButton: React.FC<{containerStyles?: ViewStyle}> = ({
    containerStyles = {}
}) => {
    const {
        theme: {colors}
    } = useTheme();

    return (
        <Animated.View
            style={[
                containerStyles,
                stylesIos.container,
                {backgroundColor: colors.secondaryBg, shadowColor: colors.dark}
            ]}>
            {SVG().replay}
            <Text style={[stylesIos.text, {color: colors.primary}]}>
                Replay
            </Text>
        </Animated.View>
    );
};

const AndroidButton: React.FC<{containerStyles?: ViewStyle}> = ({
    containerStyles = {}
}) => {
    const {
        theme: {colors}
    } = useTheme();

    return (
        <Animated.View
            style={[
                containerStyles,
                stylesAndroid.container,
                {backgroundColor: colors.secondaryBg}
            ]}>
            {SVG()['replay-android']}
        </Animated.View>
    );
};

const stylesIos = StyleSheet.create({
    container: {
        height: 32,
        paddingHorizontal: 8,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84
    },
    text: {
        ...fontFamily({size: 17, weight: '600'})
    }
});

const stylesAndroid = StyleSheet.create({
    container: {
        padding: 8,
        borderRadius: 4,
        elevation: 10
    },
    text: {
        ...fontFamily({size: 17, weight: '600'})
    }
});
