import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Text, useTheme} from 'react-native-elements';
import {map} from 'lodash/fp';
import {useSelector} from 'react-redux';
import {isIOS, maybePluralize, normalize} from 'app/utilities/helpers';
import {credentialsCountByCategory} from 'app/utilities/credential';
import {SharedCategoryListProps} from '../DisclosureRequest/types';
import {CustomListItem} from '../common/CustomListItem';
import {credentialCategoriesSelector} from '../../store/selectors';
import {CredentialCategories} from '../../store/types/common';

export const SharedCategoryList: React.FC<SharedCategoryListProps> = ({
    credentials
}) => {
    const {theme} = useTheme();
    const categories: CredentialCategories = useSelector(
        credentialCategoriesSelector
    );
    const {t} = useTranslation();
    return (
        <View>
            <Text style={[styles.title, {color: theme.colors.secondaryText}]}>
                {t('Credentials shared:')}
            </Text>
            {map(item => {
                const count = credentialsCountByCategory(
                    credentials,
                    item.types
                );

                return (
                    Boolean(count) && (
                        <CustomListItem
                            title={item.title}
                            subTitle={maybePluralize(count, 'credential')}
                            chevron
                            withoutBorder
                            containerStyle={styles.itemContainer}
                        />
                    )
                );
            }, categories)}
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        paddingHorizontal: isIOS ? 24 : 16,
        marginVertical: isIOS ? 0 : 4
    },
    title: {
        textTransform: 'uppercase',
        fontSize: normalize(13),
        lineHeight: normalize(17),
        letterSpacing: 0.2,
        paddingBottom: 10,
        paddingLeft: 24,
        ...Platform.select({
            android: {
                paddingLeft: 16,
                paddingBottom: 12
            }
        })
    },
    subTitle: {
        fontSize: normalize(16),
        lineHeight: normalize(22),
        letterSpacing: 0.2,
        fontWeight: '500'
    }
});
