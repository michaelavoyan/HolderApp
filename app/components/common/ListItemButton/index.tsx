import React from 'react';
import {useTranslation} from 'react-i18next';
import {FlexStyle, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {Text, useTheme} from 'react-native-elements';

import {fontFamily, isIOS} from '../../../utilities/helpers';
import {CredentialTypeIcon} from '../CredentialTypeIcon';

export const ListItemButton: React.FC<{
    title: string;
    onPress: () => void;
    icon?: string;
    isSVG?: boolean;
    iconColor?: string;
    containerStyle?: FlexStyle;
    disabled?: boolean;
}> = ({onPress, title, containerStyle, icon, isSVG, iconColor, disabled=false}) => {
    const {theme} = useTheme();
    const {t} = useTranslation();
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPress}
            disabled={disabled}
            style={[
                styles.container,
                {
                    backgroundColor: isIOS
                        ? theme.colors.primaryBg
                        : theme.colors.primaryBgAndroid
                },
                containerStyle,
                icon ? styles.containerWithIcon : {}
            ]}>
            {icon ? (
                <CredentialTypeIcon
                    iconContainerStyle={styles.icon}
                    icon={icon}
                    isSVG={isSVG}
                    color={iconColor}
                />
            ) : null}
            <Text style={[styles.text, {color: disabled? theme.colors.disabledText : theme.colors.dark}]}>
                {t(title)}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: isIOS ? 64 : 59,
        justifyContent: 'center',
        ...Platform.select({
            ios: {
                paddingHorizontal: 16,
                marginVertical: 5,
                borderRadius: 14
            }
        })
    },
    containerWithIcon: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    text: {
        textAlignVertical: 'center',
        letterSpacing: 0.2,
        ...fontFamily({size: 18, android: {size: 14}}),
        marginRight: 24
    },
    icon: {
        marginLeft: -8,
        ...Platform.select({
            android: {
                marginLeft: -4
            }
        }),
        marginRight: 20
    }
});
