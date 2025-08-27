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

export const ShareCredentialButton = ({
    isShareEnabled,
    onPress = () => {},
    style
}: {
    isShareEnabled: boolean;
    onPress(): void;
    style?: StyleProp<ViewStyle>;
}) => {
    const {t} = useTranslation();

    const {
        theme: {
            colors: {primaryAndroid, primary, transparent}
        }
    } = useTheme();

    const color = isIOS ? primary : primaryAndroid;

    return isShareEnabled ? (
        <View style={[styles.container, style]}>
            <Pressable
                testID='share-credential-button'
                onPress={onPress}
                style={({pressed}) => [
                    styles.touchableContainer,
                    isIOS ? {opacity: pressed ? 0.5 : 1} : {}
                ]}
                android_ripple={{
                    color: primaryAndroid,
                    borderless: false
                }}>
                {SVG(transparent, 24, undefined, color)['share-square']}
                <Text style={[styles.text, {color}]}>
                    {t(`${isIOS ? 'Share' : 'SHARE'}`)}
                </Text>
            </Pressable>
        </View>
    ) : null;
};

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
    touchableContainer: {flexDirection: 'row', borderRadius: 5},
    text: {
        fontSize: 14,
        marginLeft: 12,
        fontWeight: '600'
    }
});
