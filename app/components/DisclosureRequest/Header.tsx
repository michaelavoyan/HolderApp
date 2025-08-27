import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Text, useTheme} from 'react-native-elements';

import {fontFamily, normalize} from 'app/utilities/helpers';
import {DisclosureHeader} from './types';
import {Icon} from '../common/Icon';

const publicSharingTitle = 'Select the credentials you would like to share';
const publicSharingTitleSingle = 'Do you wish to share more credentials?';

export const Header: React.FC<DisclosureHeader> = ({
    logo,
    title,
    subTitle,
    isPublicSharingMode,
    isPublicSharingModeSingle = false
}) => {
    const {theme} = useTheme();
    const {t} = useTranslation();

    if (isPublicSharingMode) {
        return (
            <View style={[styles.container]}>
                <Text style={styles.name}>
                    {t(
                        isPublicSharingModeSingle
                            ? publicSharingTitleSingle
                            : publicSharingTitle
                    )}
                </Text>
            </View>
        );
    }

    return (
        <View style={[styles.container]}>
            {React.isValidElement(logo)
                ? logo
                : !!logo && <Icon uri={logo} styles={styles.logo} width={44} />}
            <Text style={styles.name}>{title}</Text>
            {!!subTitle && (
                <Text
                    style={[
                        styles.subTitle,
                        {color: theme.colors.secondaryText}
                    ]}>
                    {subTitle}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingBottom: 23
    },
    logo: {
        height: 44,
        marginBottom: 9
    },
    name: {
        paddingBottom: 12,
        lineHeight: normalize(26),
        letterSpacing: 0.4,
        ...fontFamily({
            size: 22,
            weight: '600',
            iosFamily: 'SFProDisplay'
        })
    },
    subTitle: {
        fontFamily: 'SFProDisplay-Regular',
        fontSize: normalize(13),
        lineHeight: normalize(16.9),
        letterSpacing: 0.2
    }
});
