import React, {useCallback} from 'react';
import {View, StyleSheet, Pressable, Platform, FlexStyle} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Text, useTheme} from 'react-native-elements';
import {useNavigation} from '@react-navigation/core';
import {map, filter, intersection} from 'lodash/fp';
import {useSelector} from 'react-redux';
import {normalize} from 'app/utilities/helpers';

import {SharedCredentialsListProps} from '../DisclosureRequest/types';
import {CustomListItem} from '../common/CustomListItem';
import {credentialsCountByCategory} from '../../utilities/credential';
import {allCredentialsSelector} from '../../store/selectors';

export const SharedCredentialsList: React.FC<
    SharedCredentialsListProps & {
        itemStyle?: FlexStyle;
        title: string;
        handleSelectAllinCategory?: (types: Array<string>) => void;
        isPublicSharingMode?: boolean;
    }
> = ({
    credentials,
    types,
    onPress,
    defaultCategories,
    itemStyle,
    title,
    hideEmpty,
    categories,
    handleSelectAllinCategory,
    isPublicSharingMode
}) => {
    const {theme} = useTheme();
    const allCredentials = useSelector(allCredentialsSelector);
    const {t} = useTranslation();
    const navigation = useNavigation();
    const routes = navigation.getState()?.routes;
    const subTitle = useCallback(
        (count: number, countOf: number) => {
            let subTitleColor = theme.colors.secondaryText;
            let subTitleText = `${count} of ${countOf} credentials`;

            if (
                routes &&
                routes[routes.length - 1].name ===
                    'PastDisclosureRequestDetails'
            ) {
                subTitleText = `${count} ${count === 1 ? 'credential' : 'credentials'}`;
            } else if (count === 0) {
                subTitleColor = theme.colors.disabledText;
            } else if (count === countOf) {
                subTitleColor = theme.colors.success;
            } else {
                subTitleColor = theme.colors.dark;
            }

            return {
                subTitleColor: isPublicSharingMode ? subTitleColor:  theme.colors.secondaryText,
                subTitle: subTitleText
            };
        },
        [isPublicSharingMode, routes, theme.colors.dark, theme.colors.disabledText, theme.colors.secondaryText, theme.colors.success]
    );

    return (
        <View>
            {title && (
                <Text
                    style={[
                        itemStyle,
                        styles.title,
                        {color: theme.colors.secondaryText}
                    ]}>
                    {t(title)}
                </Text>
            )}
            {map((item) => {
                const intersectionTypes = intersection(item.types, types);

                const credentialsInCategory = credentialsCountByCategory(
                    allCredentials,
                    item.types
                );
                // Number of shared credentials
                const count = credentialsCountByCategory(
                    filter('checked', credentials),
                    item.types
                );
                if (hideEmpty) {
                    if (!credentialsInCategory && !count) {
                        return null;
                    }
                }
                // Number of credentials we had on sharing moment VL-5183
                const countOf = credentialsCountByCategory(
                    credentials,
                    item.types
                );

                const selectAll = count !== countOf && handleSelectAllinCategory !== undefined && isPublicSharingMode;

                return (
                    <Pressable
                        key={item.title}
                        style={({pressed}) => [
                            itemStyle,
                            Platform.select({
                                ios: {
                                    ...(pressed
                                        ? styles.opacity
                                        : styles.noOpacity)
                                }
                            }),
                            {backgroundColor: theme.colors.secondaryBg}
                        ]}
                        android_ripple={{
                            color: theme.colors.primaryAndroid
                        }}
                        onPress={() =>
                            onPress({...item, types: intersectionTypes})
                        }>
                        <CustomListItem
                            title={item.title}
                            {...subTitle(count, countOf)}
                            chevron
                            withoutBorder
                            containerStyle={itemStyle}
                            isTransparent
                            selectAll={selectAll}
                            {...(handleSelectAllinCategory
                                ? {
                                      handleSelectAll: () =>
                                          handleSelectAllinCategory(intersectionTypes)
                                  }
                                : {})}
                        />
                    </Pressable>
                );
            }, defaultCategories || categories)}
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        textTransform: 'uppercase',
        fontSize: normalize(13),
        lineHeight: normalize(17),
        letterSpacing: 0.2,
        paddingBottom: 10,
        paddingTop: 10
    },
    subTitle: {
        fontSize: normalize(16),
        lineHeight: normalize(22),
        letterSpacing: 0.2,
        fontWeight: '500'
    },
    opacity: {
        opacity: 0.7
    },
    noOpacity: {
        opacity: 1
    }
});
