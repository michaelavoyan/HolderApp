import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {
    StyleSheet,
    Text,
    Pressable,
    StyleProp,
    ViewStyle,
    View,
    Linking,
    ActivityIndicator
} from 'react-native';
import {useTheme} from 'react-native-elements';
import {SVG} from 'app/assets/icons';
import {isIOS} from 'app/utilities/helpers';

export const ContactIssuer = ({
    email,
    loading,
    style
}: {
    email?: string;
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
}) => {
    const {t} = useTranslation();

    const {
        theme: {
            colors: {primaryAndroid, primary}
        }
    } = useTheme();

    const color = isIOS ? primary : primaryAndroid;

    const handlePress = useCallback(() => {
        if (email) {
            Linking.openURL(`mailto:${email}`);
        }
    }, [email]);

    if (loading) {
        return <ActivityIndicator color={color} />;
    }

    return email ? (
        <View style={[styles.container, style]}>
            <Pressable
                onPress={handlePress}
                style={({pressed}) => [
                    styles.touchableContainer,
                    isIOS ? {opacity: pressed ? 0.5 : 1} : {}
                ]}
                android_ripple={{
                    color: primaryAndroid,
                    borderless: false
                }}>
                {SVG(color, 24, undefined, color).contact}
                <Text style={[styles.text, {color}]}>
                    {t(`${isIOS ? 'Contact issuer' : 'CONTACT ISSUER'}`)}
                </Text>
            </Pressable>
        </View>
    ) : null;
};

const styles = StyleSheet.create({
    container: {alignItems: 'center', overflow: 'hidden', width: '100%'},
    touchableContainer: {flexDirection: 'row', borderRadius: 5},
    text: {
        fontSize: 14,
        marginLeft: 12,
        fontWeight: '600'
    }
});
