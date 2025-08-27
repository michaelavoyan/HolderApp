import React, { useCallback, useMemo, useState } from 'react';
import {useTranslation} from 'react-i18next';
import {Text, Icon, useTheme} from 'react-native-elements';
import {StyleSheet, ScrollView, View, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {VCLCountry} from '@velocitycareerlabs/vcl-react-native';

import {ClaimCredentialWithCheckbox} from 'app/components/DisclosureRequest/types';
import {termsAndConditionsLinkSelector} from 'app/store/selectors/appConfig';
import {useSelector} from 'react-redux';
import {colors} from '../../assets/colors';
import {CountryCodes} from '../../store/types/auth';
import {CredentialSummary} from '../common/CredentialSummary';
import {GenericButton} from '../common/GenericButton';
import {fontFamily, isIOS} from '../../utilities/helpers';
import {DisclosureTermsAndConditions} from '../common/DisclosureTermsAndConditions';
import {isIdentitySelector} from '../../store/selectors';

const VERTICAL_PADDING = 20;

export const SelectCredentialScreen: React.FC<{
    items: ClaimCredentialWithCheckbox[];
    onPressItem: (credential: ClaimCredentialWithCheckbox) => void;
    countries?: VCLCountry[];
    regions?: CountryCodes;
    onCancel: () => void;
    onPressPrimary: () => void;
    toggleItem: (item: ClaimCredentialWithCheckbox) => void;
    selectEnabled: boolean;
    primaryTitle?: string;
    onClaimLinkPress?: () => void;
    withTC?: boolean;
}> = ({
    items,
    onPressItem,
    regions,
    countries,
    onCancel,
    onPressPrimary,
    toggleItem,
    selectEnabled,
    primaryTitle,
    onClaimLinkPress,
    withTC,
}) => {
    const insets = useSafeAreaInsets();
    const {t} = useTranslation();
    const {theme} = useTheme();
    const termsAndConditionsLink = useSelector(termsAndConditionsLinkSelector);
    const [isTermsChecked, setTermsChecked] = useState(false);
    const setTermsCheckedCallback = useCallback(
        () => setTermsChecked(!isTermsChecked),
        [isTermsChecked]
    );

    const isButtonDisabled = useMemo(() => {
        const isSelectDisabled = !selectEnabled;
        const isTermsUnchecked = withTC && !isTermsChecked;
        return (isSelectDisabled && !withTC) || (isSelectDisabled || isTermsUnchecked);
      }, [selectEnabled, withTC, isTermsChecked]);

    // The basic assumption is that all credentials are from the same type
    const credentialType = (items && items.length) ? items[0]?.type : [''];
    const isIdentityCredential =  useSelector(isIdentitySelector(credentialType));

    return (
        <ScrollView
            contentContainerStyle={{
                ...styles.contentContainerStyle,
                paddingBottom: VERTICAL_PADDING + insets.bottom
            }}>
            <View>
                {items?.map(item => (
                    <CredentialSummary
                        key={`${item.id}_${item.jwt}`}
                        onCredentialDetails={() => onPressItem(item)}
                        countries={countries}
                        regions={regions}
                        item={item}
                        checked={item.checked}
                        toggleCheckbox={toggleItem}
                    />
                ))}
                {!!onClaimLinkPress && isIdentityCredential && (
                    <View style={styles.infoBlock}>
                        <View style={styles.infoBlockTitle}>
                            <Icon
                                name="info-circle"
                                type="font-awesome"
                                size={16}
                                color={
                                    isIOS
                                        ? theme.colors.active
                                        : theme.colors.primaryAndroid
                                }
                            />
                            <Text style={styles.boldInfoText}>
                                {t('Missing the required credential')}?
                            </Text>
                        </View>
                        <View style={styles.infoSubTitleBlock}>
                            <TouchableOpacity onPress={onClaimLinkPress}>
                                <Text
                                    style={[
                                        styles.infoText,
                                        {
                                            color: isIOS
                                                ? theme.colors.active
                                                : theme.colors.primaryAndroid
                                        }
                                    ]}>
                                    {t('Click here')}{' '}
                                </Text>
                            </TouchableOpacity>
                            <Text style={styles.infoText}>
                                {t('to claim it now')}.
                            </Text>
                        </View>
                        <Text style={styles.infoText}>
                            {t('When done, you will be directed back here')}.
                        </Text>
                    </View>
                )}
            </View>
            <View style={styles.bottomBlock}>
                {withTC && <DisclosureTermsAndConditions
                    isPublicSharingMode
                    checked={isTermsChecked}
                    onCheck={setTermsCheckedCallback}
                    link={termsAndConditionsLink}
                    text={t('I agree to the Terms and Conditions')}
                />}
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
                        title={primaryTitle || t('Select')}
                        onPress={onPressPrimary}
                        disabled={isButtonDisabled}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    contentContainerStyle: {
        justifyContent: 'space-between',
        flexGrow: 1,
        marginVertical: 5,
        paddingHorizontal: 24,
        paddingVertical: VERTICAL_PADDING,
        backgroundColor: colors.primaryBg
    },
    bottomBlock: {
        marginTop: 22
    },
    buttons: {
        marginTop: 30,
        flexDirection: 'row'
    },
    leftButton: {
        marginRight: 7
    },
    rightButton: {
        marginLeft: 7
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
