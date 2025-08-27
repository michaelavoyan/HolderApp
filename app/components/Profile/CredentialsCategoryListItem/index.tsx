import React, {useCallback} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Platform} from 'react-native';

import {useSelector} from 'react-redux';
import {useTheme} from 'react-native-elements';
import {fontFamily, normalize} from 'app/utilities/helpers';
import {credentialsCountByTypeSelector} from 'app/store/selectors';
import {CredentialTypeIcon} from '../../common/CredentialTypeIcon';
import {CredentialCategory} from '../../../store/types/common';

export const CredentialsCategoryListItem: React.FC<{
    item: CredentialCategory;
    onPress: (item: CredentialCategory) => void;
}> = ({item, onPress}) => {
    const {icon, types, title} = item;
    const credentialsNumber: number = useSelector(
        credentialsCountByTypeSelector({types})
    );
    const {theme} = useTheme();

    const press = useCallback(() => {
        if (onPress) onPress(item);
    }, [item, onPress]);

    return (
        <View style={styles.item}>
            <TouchableOpacity
                onPress={press}
                activeOpacity={0.7}
                style={styles.itemInner}>
                <View style={styles.logoBlock}>
                    <CredentialTypeIcon
                        iconContainerStyle={styles.icon}
                        icon={icon}
                    />
                    <Text style={styles.credentialsNumber}>
                        {credentialsNumber}
                    </Text>
                </View>
                <Text
                    style={[styles.title, {color: theme.colors.secondaryText}]}>
                    {title}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 14,
        paddingHorizontal: 8
    },
    item: {
        width: '50%',
        padding: 8,
        ...Platform.select({
            android: {
                padding: 4
            }
        }),
        minHeight: 118
    },
    itemInner: {
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 20,
        ...Platform.select({
            android: {borderRadius: 4}
        }),
        justifyContent: 'space-between',
        flex: 1
    },
    logoBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    icon: {
        width: 38,
        height: 38
    },
    credentialsNumber: {
        ...fontFamily({size: 30, weight: '600'}),
        lineHeight: normalize(36)
    },
    title: {
        ...fontFamily({size: 18, weight: '600'})
    }
});
