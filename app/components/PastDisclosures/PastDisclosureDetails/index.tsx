import React, {useMemo} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {getOr} from 'lodash/fp';

import {useTheme} from 'react-native-elements';
import {PastDisclosureEntry} from '../PastDisclosureEntry';
import {DisclosureDetailsProps} from './typings';
import {DisclosureTermsAndConditions} from '../../common/DisclosureTermsAndConditions';
import {SharedCredentialsList} from '../SharedCredentialsList';
import {CredentialCategories} from '../../../store/types/common';
import {credentialCategoriesSelector} from '../../../store/selectors';

export const DisclosureDetailsScreen: React.FC<DisclosureDetailsProps> = ({
    disclosure,
    credentials,
    openCategory = () => {},
    onDelete = () => {}
}) => {
    const {theme} = useTheme();
    const {t} = useTranslation();
    const categories: CredentialCategories = useSelector(
        credentialCategoriesSelector
    );

    const types = useMemo(() => {
        return Object.keys(
            credentials.reduce<{[type: string]: boolean}>((acc, item) => {
                item.type.forEach((value) => {
                    acc[value] = true;
                });

                return acc;
            }, {})
        );
    }, [credentials]);

    return (
        <ScrollView style={[styles.mainContainer]}>
            {credentials.length && disclosure ? (
                <>
                    <View
                        style={[
                            styles.header,
                            styles.container,
                            {
                                backgroundColor: theme.colors.secondaryBg
                            }
                        ]}>
                        <PastDisclosureEntry
                            disclosure={disclosure}
                            onDelete={onDelete}
                            isOpened
                        />
                    </View>
                    <View style={styles.info}>
                        <SharedCredentialsList
                            types={types as string[]}
                            credentials={credentials}
                            onPress={openCategory}
                            itemStyle={styles.container}
                            hideEmpty
                            title={t('CREDENTIALS SHARED')}
                            categories={categories}
                        />
                        <View
                            style={[styles.footerContainer, styles.container]}>
                            <DisclosureTermsAndConditions
                                isPublicSharingMode
                                link={getOr('', 'termsUrl', disclosure)}
                                text={t(
                                    'The Terms and Conditions you agreed to'
                                )}
                            />
                        </View>
                    </View>
                </>
            ) : null}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginVertical: 5
    },
    container: {
        paddingHorizontal: 24
    },
    header: {
        paddingTop: 20,
        paddingBottom: 20,
        marginBottom: -15
    },
    line: {
        height: 1,
        marginTop: -20,
        marginBottom: 20
    },
    footerContainer: {
        paddingVertical: 30
    },
    info: {
        marginTop: 47
    }
});
