import React from 'react';
import {useTranslation} from 'react-i18next';
import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    Platform,
    TouchableOpacity
} from 'react-native';
import {map, isEmpty} from 'lodash/fp';
import {PastDisclosureEntry} from '../PastDisclosureEntry';
import {CardWrapper} from '../../common/CardWrapper';
import {DisclosureListProps} from './typings';

export const EMPTY_TEXT = 'No disclosures yet';

export const DisclosureListScreen: React.FC<DisclosureListProps> = ({
    onDisclosurePress,
    disclosures
}) => {
    const {t} = useTranslation();
    return (
        <ScrollView contentContainerStyle={[styles.container]}>
            {!isEmpty(disclosures) ? (
                map(
                    (item) => (
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => onDisclosurePress(item.id)}>
                            <CardWrapper customStyles={styles.item}>
                                <PastDisclosureEntry disclosure={item} />
                            </CardWrapper>
                        </TouchableOpacity>
                    ),
                    disclosures
                )
            ) : (
                <View style={styles.container}>
                    <Text>{t(EMPTY_TEXT)}</Text>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingVertical: 20,
        display: 'flex',
        flexDirection: 'column',
        ...Platform.select({
            android: {paddingHorizontal: 16}
        })
    },
    item: {
        marginBottom: 10,
        ...Platform.select({
            android: {marginBottom: 8}
        })
    }
});
