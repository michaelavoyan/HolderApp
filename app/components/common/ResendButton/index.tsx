import React, {useCallback, useRef} from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    FlexStyle,
    Animated,
    Easing
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from 'react-native-elements';
import {fontFamily, isIOS} from 'app/utilities/helpers';
import {SVG} from '../../../assets/icons';

export const ResendButton: React.FC<{
    title: string;
    onPress: () => void;
    containerStyle?: FlexStyle;
}> = ({onPress, title, containerStyle = {}}) => {
    const {
        theme: {
            colors: {primary: color}
        }
    } = useTheme();

    const spinValueRef = useRef(new Animated.Value(0));

    const spin = spinValueRef.current.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    });

    const {t} = useTranslation();

    const press = useCallback(() => {
        Animated.timing(spinValueRef.current, {
            toValue: 1,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true
        }).start(() => spinValueRef.current.setValue(0));

        onPress();
    }, [onPress]);

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={press}
            accessibilityLabel={t('Resend Verification Code')}
            style={[styles.container, containerStyle]}>
            <Animated.View style={[{transform: [{rotate: spin}]}, styles.icon]}>
                {SVG(undefined, undefined)[isIOS ? 'resend' : 'resend-android']}
            </Animated.View>
            <Text style={[{color}, styles.title]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 1,
        marginRight: 1
    },
    title: {
        marginLeft: 5,
        ...fontFamily({size: 13, iosFamily: 'SFProText'})
    }
});
