import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import {Text, useTheme} from 'react-native-elements';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {filter, map} from 'lodash/fp';

import {DisclosureData} from 'app/store/types/disclosure';
import {isIOS, normalize} from 'app/utilities/helpers';
import {Header} from './Header';
import {Info} from './Info';
import {CredentialListItem} from './CredentialListItem';
import {DisclosureTermsAndConditions} from '../common/DisclosureTermsAndConditions';
import {ClaimCredentialWithCheckbox, DisclosureHeader} from './types';
import {GenericButton} from '../common/GenericButton';

import {Instructions} from './Note';

export const DisclosureRequestScreen: React.FC<{
    header: DisclosureHeader;
    credentials: ClaimCredentialWithCheckbox[];
    disclosureData: DisclosureData;
    isTermsChecked: boolean;
    onCheckTerms: () => void;
    onCancel: () => void;
    onShare: () => void;
    onAddItem: (item: {
        name: string;
        id: string;
        isCredentialAvailable: boolean;
    }) => void;
}> = ({
    header,
    credentials,
    disclosureData,
    isTermsChecked,
    onCheckTerms,
    onCancel,
    onShare,
    onAddItem
}) => {
    const {theme} = useTheme();
    const insets = useSafeAreaInsets();
    const {inputDescriptors} = disclosureData;
    const {t} = useTranslation();

    return (
        <ScrollView
            contentContainerStyle={{
                paddingBottom: insets.bottom
            }}
            style={[
                styles.container,
                {
                    backgroundColor: theme.colors.secondaryBg
                }
            ]}>
            <View>
                <Header {...header} />
            </View>
            <View>
                <Text
                    style={[styles.title, {color: theme.colors.secondaryText}]}>
                    {t('Required information')}
                </Text>
                {inputDescriptors.length > 0 ? (
                    map(
                        ({id, name}) => (
                            <CredentialListItem
                                id={id}
                                name={name}
                                credentials={credentials}
                                onAddItem={onAddItem}
                                key={id}
                            />
                        ),
                        inputDescriptors
                    )
                ) : (
                    <ActivityIndicator
                        color={
                            isIOS
                                ? theme.colors.secondary
                                : theme.colors.primaryAndroid
                        }
                        size={isIOS ? 'large' : 54}
                        style={styles.spinner}
                    />
                )}
            </View>
            <View style={styles.info}>
                <Info disclosure={disclosureData} />
                {!!disclosureData.name && (
                    <Instructions description={disclosureData.name} />
                )}
                <View style={styles.footerContainer}>
                    <DisclosureTermsAndConditions
                        checked={isTermsChecked}
                        onCheck={onCheckTerms}
                        link={disclosureData.termsUrl}
                        text={t('I agree to the Terms and Conditions')}
                    />
                </View>
            </View>
            <View style={styles.buttons}>
                <GenericButton
                    containerStyle={styles.leftButton}
                    type="secondary"
                    title={t('Cancel')}
                    onPress={onCancel}
                />
                <GenericButton
                    containerStyle={styles.rightButton}
                    type="primary"
                    title={t('Share')}
                    disabled={
                        !inputDescriptors.length ||
                        !isTermsChecked ||
                        !filter('checked', credentials).length
                    }
                    onPress={onShare}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 5,
        paddingHorizontal: 24,
        paddingVertical: 20
    },
    footerContainer: {
        paddingTop: 22
    },
    info: {
        marginTop: 32
    },
    buttons: {
        flexDirection: 'row',
        marginBottom: 35,
        marginTop: 22
    },
    leftButton: {
        marginRight: 7
    },
    rightButton: {
        marginLeft: 7
    },
    title: {
        textTransform: 'uppercase',
        fontSize: normalize(13),
        lineHeight: normalize(17),
        letterSpacing: 0.2,
        paddingBottom: 10,
        fontFamily: 'SFProDisplay-Regular'
    },
    spinner: {
        marginVertical: 20
    }
});
