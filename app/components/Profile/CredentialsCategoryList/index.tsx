import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {CredentialsCategoryListItem} from '../CredentialsCategoryListItem';
import {
    CredentialCategories,
    CredentialCategory
} from '../../../store/types/common';

export const CredentialsCategoryList: React.FC<{
    categories: CredentialCategories;
    onSelect: (item: CredentialCategory) => void;
}> = ({categories, onSelect}) => {
    return (
        <View style={styles.container}>
            {categories.map(item => {
                return (
                    <CredentialsCategoryListItem
                        item={item}
                        key={item.icon}
                        onPress={onSelect}
                    />
                );
            })}
        </View>
    );
};

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 14,
        ...Platform.select({
            android: {marginTop: 8, paddingBottom: 20}
        }),
        paddingHorizontal: 8
    }
});
