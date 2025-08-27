import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {useTheme} from 'react-native-elements';
import {CredentialTypeIconProps} from './typings/types';

import {SVG} from '../../assets/icons';

export const CredentialTypeIcon: React.FC<CredentialTypeIconProps> = ({
    icon,
    iconSize,
    iconContainerStyle,
    isSVG,
    color
}) => {
    const {theme} = useTheme();

    return isSVG ? (
        <View style={[styles.iconContainer, iconContainerStyle]}>
            {SVG(color || theme.colors.secondaryBg, iconSize)[icon]}
        </View>
    ) : (
        <View style={iconContainerStyle}>
            <Image
                resizeMode="cover"
                source={{
                    uri: icon,
                    width: iconSize || 38,
                    height: iconSize || 38
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        width: 32,
        height: 32,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
