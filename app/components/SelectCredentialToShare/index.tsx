import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {VCLCountry} from '@velocitycareerlabs/vcl-react-native';
import {useTheme} from 'react-native-elements';
import {GenericButton} from 'app/components/common/GenericButton';
import {SVG} from 'app/assets/icons';

import {CountryCodes} from '../../store/types/auth';
import {ClaimCredential} from '../../store/types/claim';
import {fontFamily, isIOS} from '../../utilities/helpers';
import {CredentialsModal} from '../common/CredentialsModal';
import {CredentialSummary} from '../common/CredentialSummary';
import {ModalType} from '../common/typings/types';
import {CredentialCategoryHeader} from '../Profile/CredentialCategoryHeader';

export const SelectCredentialToShareScreen: React.FC<{
    type: string;
    onCreate: () => void; // plus button click
    onCredentialDetails(credential: ClaimCredential): void;
    onModalItemSelect(title: string): void;
    title: string;
    countries: VCLCountry[];
    regions: CountryCodes;
    items: ClaimCredential[];
    onClose: () => void;
    modal: ModalType;
    onCancel: () => void;
    onPressPrimary: () => void;
    selectedItems: {[itemId: string]: boolean};
    toggleItem: (item: ClaimCredential) => void;
    selectEnabled: boolean;
    primaryTitle?: string;
    isMissingCredentialsIssuingHidden?: boolean;
}> = ({
    type,
    onCreate,
    onCredentialDetails,
    title,
    items,
    countries,
    regions,
    onClose,
    modal,
    onModalItemSelect,
    onCancel,
    onPressPrimary,
    selectedItems,
    toggleItem,
    selectEnabled,
    primaryTitle,
    isMissingCredentialsIssuingHidden,
}) => {
    const {theme} = useTheme();
    const insets = useSafeAreaInsets();
    const {t} = useTranslation();

    return (
        <ScrollView
            contentContainerStyle={{paddingBottom: insets.bottom}}
            style={styles.container}>
            <CredentialCategoryHeader
                type={type}
                title={title}
                onCreate={onCreate}
                credentialsNumber={items.length}
                containerStyle={styles.header}
            />
            <View>
                {items.map(item => (
                    <CredentialSummary
                        key={`${item.id}_${item.jwt}`}
                        onCredentialDetails={() => onCredentialDetails(item)}
                        countries={countries}
                        regions={regions}
                        item={item}
                        checked={selectedItems[item.id]}
                        toggleCheckbox={toggleItem}
                    />
                ))}
            </View>
            {!isMissingCredentialsIssuingHidden && (
                <View style={styles.infoBlock}>
                    <View style={styles.infoBlockTitle}>
                        {SVG(theme.colors.primary)['info-filled']}
                        <Text style={styles.boldInfoText}>
                            {t('Missing credentials')}?
                        </Text>
                    </View>
                    <View style={styles.infoSubTitleBlock}>
                        <TouchableOpacity onPress={onCreate}>
                            <Text
                                style={[
                                    styles.infoText,
                                    {
                                        color: isIOS
                                            ? theme.colors.active
                                            : theme.colors.primaryAndroid
                                    }
                                ]}>
                                {t('Check here')}{' '}
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.infoText}>
                            {t('if you can claim them now')}.
                        </Text>
                    </View>
                    <Text style={styles.infoText}>
                        {t('When done, you will be directed back here')}.
                    </Text>
                </View>
            )}
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
                    title={primaryTitle || t('Add')}
                    onPress={onPressPrimary}
                    disabled={!selectEnabled}
                />
            </View>

            <CredentialsModal
                onClose={onClose}
                modal={modal}
                onModalItemSelect={onModalItemSelect}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        ...Platform.select({
            ios: {
                paddingHorizontal: 24
            },
            android: {
                paddingHorizontal: 16
            }
        })
    },
    header: {
        marginTop: 5,
        ...Platform.select({
            android: {
                marginTop: 24
            }
        })
    },
    buttons: {
        flexDirection: 'row',
        marginTop: 22,
        marginBottom: 20
    },
    leftButton: {
        marginRight: 7
    },
    rightButton: {
        marginLeft: 7
    },
    noCredentials: {
        ...fontFamily({size: 13}),
        marginTop: 20,
        alignSelf: 'center'
    },
    infoBlock: {
        alignItems: 'center',
        paddingVertical: 33
    },
    infoSubTitleBlock: {flexDirection: 'row'},
    infoBlockTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10
    },
    boldInfoText: {
        ...fontFamily({size: 16, weight: '600'}),
        left: 9
    },
    infoText: {
        ...fontFamily({size: 13, weight: '400'})
    }
});
