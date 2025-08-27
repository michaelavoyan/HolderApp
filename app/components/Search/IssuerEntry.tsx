import React from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {find, get} from 'lodash/fp';

import {SvgUri} from 'react-native-svg';
import {useTheme} from 'react-native-elements';
import {IssuerEntryProps} from './typings/types';
import {CustomListItem} from '../common/CustomListItem';
import {fontFamily, isIOS, isSVGLink} from '../../utilities/helpers';

import {Icon} from '../common/Icon';

export const IssuerEntry: React.FC<IssuerEntryProps> = ({
    vendor,
    onClaim,
    countries,
    first
}) => {
    const countryCode = get('location.countryCode', vendor);
    const country = find(['code', countryCode], countries)?.name;
    const {theme} = useTheme();

    return isIOS ? (
        <TouchableOpacity
            key={`${vendor.id}_${vendor.name}`}
            activeOpacity={0.7}
            onPress={() => onClaim(vendor.id, vendor.service)}>
            <CustomListItem
                title={vendor.name}
                subTitle={country}
                leftImage={vendor.logo}
                containerStyle={[
                    styles.container,
                    vendor.logo
                        ? styles.containerWithImage
                        : styles.containerWithoutImage
                ]}
                withoutRightElement
            />
        </TouchableOpacity>
    ) : (
        <Pressable
            style={[
                styles.pressable,
                {backgroundColor: theme.colors.secondaryBg}
            ]}
            android_ripple={{
                color: theme.colors.primaryAndroid
            }}
            onPress={() => onClaim(vendor.id, vendor.service)}>
            <Text
                style={[
                    styles.letter,
                    {
                        color: theme.colors.disabledText
                    }
                ]}>
                {first || null}
            </Text>
            <View style={styles.imageWrapper}>
                {isSVGLink(vendor.logo) ? (
                    <SvgUri
                        width="100%"
                        height="100%"
                        style={styles.image}
                        uri={vendor.logo}
                        fallback={<View />}
                    />
                ) : (
                    <Icon styles={styles.image} uri={vendor.logo} />
                )}
            </View>
            <View style={styles.textWrapper}>
                <Text
                    style={[
                        styles.name,
                        {
                            color: theme.colors.grayText
                        }
                    ]}>
                    {vendor.name}
                </Text>
                <Text
                    style={[
                        styles.country,
                        {
                            color: theme.colors.grayLightText
                        }
                    ]}>
                    {country}
                </Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 22,
        paddingVertical: 10
    },
    containerWithImage: {height: 113},
    containerWithoutImage: {height: 63},
    pressable: {
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center'
    },
    letter: {
        ...fontFamily({size: 20, weight: '500'}),
        width: 32
    },
    textWrapper: {
        flex: 1
    },
    name: {
        ...fontFamily({size: 16}),
        lineHeight: 24
    },
    country: {
        ...fontFamily({size: 14}),
        lineHeight: 20
    },
    imageWrapper: {
        width: 40,
        height: 40,
        marginRight: 16
    },
    image: {
        width: '100%',
        height: '100%'
    },
    opacity: {
        opacity: 0.7
    },
    noOpacity: {
        opacity: 1
    }
});
