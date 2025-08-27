import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, StyleSheet, FlexStyle, TouchableOpacity} from 'react-native';
import {Text, useTheme} from 'react-native-elements';

import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import {fontFamily, normalize} from 'app/utilities/helpers';

import {RootStackParamList} from '../../../navigation/StackParamsList';

type EditProfileProps = StackNavigationProp<RootStackParamList, 'EditProfile'>;

export const AvatarsBlock: React.FC<{
    uri?: string;
    name?: string;
    size?: number;
    containerStyle?: FlexStyle;
    color?: string;
    disabled?: boolean;
}> = ({uri, name, size, containerStyle = {}, color, disabled}) => {
    const {
        theme: {
            colors: {dark, primary}
        }
    } = useTheme();
    const navigation = useNavigation<EditProfileProps>();

    const goToProfile = () => {
        navigation.navigate('EditProfile');
    };

    const {t} = useTranslation();

    const formatProfileName = (profileName: string | undefined): string =>  {
        if (profileName) {
            const words = profileName.split(' ');
        
            if (words.length === 1) {
                return words[0].charAt(0).toUpperCase();
            }
            
            return words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
        } 
        
        return ''; 
    };


    return (
        <TouchableOpacity
            onPress={goToProfile}
            disabled={disabled}
            accessibilityLabel={t('User avatar')}>
            <View style={[styles.avatarBlock, containerStyle]}>
                {uri ? (
                    <FastImage
                        style={{
                            ...styles.avatar,
                            ...(size ? {width: size, height: size} : {})
                        }}
                        source={{uri}}
                        resizeMode="cover"
                    />
                ) : (
                    <View
                        style={{
                            ...styles.avatar,
                            ...(size ? {width: size, height: size} : {}),
                            ...styles.emptyAvatar,
                            borderColor: primary
                        }}
                    >
                        <Text 
                            style={{
                                ...fontFamily({size: 20, weight: '600'}),
                                color: primary
                            }}
                        >
                            {formatProfileName(name)}
                        </Text>
                    </View>
                )}
                {!!name && (
                    <View style={styles.titleBlock}>
                        <Text
                            numberOfLines={1}
                            style={[styles.title, {color: color || dark}]}>
                            {name}
                        </Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    avatarBlock: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    avatar: {
        width: 54,
        height: 54,
        marginRight: 12,
        borderRadius: 27
    },
    emptyAvatar: {
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleBlock: {
        flex: 1
    },
    title: {
        ...fontFamily({size: 16, weight: '600'}),
        lineHeight: normalize(26),
        letterSpacing: 0.4
    }
});
