import React, {useCallback, useEffect, useState} from 'react';
import {View, ScrollView, StyleSheet, ActivityIndicator} from 'react-native';
import {useTheme} from 'react-native-elements';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {CredentialSummary} from 'app/components/common/CredentialSummary';
import {CountryCodes} from 'app/store/types/auth';
import {VCLCountry} from '@velocitycareerlabs/vcl-react-native';
import {findCredentialType, isIOS} from 'app/utilities/helpers';
import {GenericButton} from 'app/components/common/GenericButton';
import {ClaimCredentialWithCheckbox} from 'app/components/DisclosureRequest/types';
import {regionsSelector, countriesSelector} from 'app/store/selectors';
import {credentialsByCategory} from '../../utilities/credential';

const CredentialsInCategoryList = ({
    credentials,
    onCancel,
    onSelect,
    types,
    defaultCredentials
}: {
    credentials: ClaimCredentialWithCheckbox[];
    onCancel: () => void;
    onSelect: (credentials: any) => void;
    types: string[];
    defaultCredentials?: ClaimCredentialWithCheckbox[];
}) => {
    const regions: CountryCodes = useSelector(regionsSelector);
    const countries: VCLCountry[] = useSelector(countriesSelector);
    const {t} = useTranslation();
    const {theme} = useTheme();

    const [credentialsInSelectedCategory, setCredentialsInSelectedCategory] =
        useState<ClaimCredentialWithCheckbox[]>(defaultCredentials || []);
    const [isLoadingCredentials, setIsLoadingCredentials] = useState(
        !defaultCredentials?.length
    );

    useEffect(() => {
        if (types && !defaultCredentials) {
            setCredentialsInSelectedCategory(
                credentialsByCategory(credentials, types)
            );
        }
    }, [credentials, types, defaultCredentials]);

    useEffect(() => {
        if (credentialsInSelectedCategory.length) {
            setIsLoadingCredentials(false);
        }
    }, [credentialsInSelectedCategory]);

    const handleToggleItem = useCallback(
        (item: ClaimCredentialWithCheckbox) => {
            setCredentialsInSelectedCategory((prevState) => {
                return prevState.map((i) =>
                    i.id === item.id && findCredentialType(i.type) === findCredentialType(item.type)
                        ? {...i, checked: !item.checked}
                        : i
                );
            });
        },
        []
    );

    return (
        <ScrollView
            contentContainerStyle={[
                styles.constainerStyle,
                {
                    backgroundColor: theme.colors.primaryBg
                }
            ]}
            style={[styles.container]}
            showsVerticalScrollIndicator={false}>
            {!isLoadingCredentials && (
                <View>
                    {credentialsInSelectedCategory.map((item) => (
                        <CredentialSummary
                            key={`${item.id}_${item.jwt}`}
                            onCredentialDetails={() => {}}
                            countries={countries}
                            regions={regions}
                            item={item}
                            checked={item.checked}
                            toggleCheckbox={() => handleToggleItem(item)}
                        />
                    ))}
                </View>
            )}
            {isLoadingCredentials && (
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
                    title={t('Select')}
                    onPress={() => onSelect(credentialsInSelectedCategory)}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    constainerStyle: {
        justifyContent: 'space-between'
    },
    container: {
        flex: 1,
        marginTop: 5,
        paddingHorizontal: 24,
        paddingVertical: 20
    },
    buttons: {
        flexDirection: 'row',
        marginBottom: 35,
        marginTop: 50
    },
    leftButton: {
        marginRight: 7
    },
    rightButton: {
        marginLeft: 7
    },
    spinner: {
        marginVertical: 20
    }
});

export default CredentialsInCategoryList;
