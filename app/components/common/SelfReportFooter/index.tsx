import React from 'react';
import {useTranslation} from 'react-i18next';
import {
    StyleSheet,
    Text,
    Pressable,
    View,
    StyleProp,
    ViewStyle
} from 'react-native';
import {useTheme} from 'react-native-elements';
import {SVG} from 'app/assets/icons';
import {isIOS} from 'app/utilities/helpers';

export const SelfReportFooter = (
    {
        onPress = () => {},
        style
    }: {
    onPress(): void;
    style?: StyleProp<ViewStyle>;
}) => {
    const {t} = useTranslation();

    const {
        theme: {
            colors: {primaryAndroid, primary}
        }
    } = useTheme();

    const color = isIOS ? primary : primaryAndroid;

    return (
        <View style={[styles.container, style]} testID="self-report-footer">
            <Pressable
                testID='self-report-button'
                onPress={onPress}
                style={({pressed}) => [
                    styles.touchableContainer,
                    isIOS ? {opacity: pressed ? 0.5 : 1} : {}
                ]}
                android_ripple={{
                    color: primaryAndroid,
                    borderless: false
                }}>
                {SVG(color, 24, undefined)['self-report-file-icon']}
                <Text style={[styles.text, {color}]}>
                    {t(`${isIOS ? 'Self report' : 'SELF REPORT'}`)}
                </Text>
            </Pressable>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
    touchableContainer: {
        flexDirection: 'row',
        borderRadius: 5,
        alignItems: 'center'
    },
    text: {
        fontSize: 14,
        marginLeft: 12,
        fontWeight: '600'
    }
});
