import {StackScreenProps} from '@react-navigation/stack';
import {find} from 'lodash/fp';
import React, {useCallback, useState} from 'react';
import {useSelector} from 'react-redux';
import {VCLCountry} from '@velocitycareerlabs/vcl-react-native';
import {ClaimCredentialWithCheckbox} from 'app/components/DisclosureRequest/types';
import {CredentialCategoryScreen} from '../../components/CredentialCategory';
import {RootStackParamList} from '../../navigation/StackParamsList';
import {
    countriesSelector,
    credentialCategoriesSelector,
    regionsSelector
} from '../../store/selectors';
import {CountryCodes} from '../../store/types/auth';
import {CredentialCategories} from '../../store/types/common';
import {CredentialStatus} from '../../store/types/claim';

type Props = StackScreenProps<
    RootStackParamList,
    'PastDisclosureRequestCredentials'
>;

export const PastDisclosureRequestCredentials: React.FC<Props> = ({
    route: {
        params: {credentials, type, deletedCredentials, disclosureSubtype}
    },
    navigation
}) => {
    const [deletedItems, setDeletedItems] = useState<{[prop: string]: string}>(
        deletedCredentials || {}
    );

    const countries: VCLCountry[] = useSelector(countriesSelector);
    const categories: CredentialCategories = useSelector(
        credentialCategoriesSelector
    );
    const regions: CountryCodes = useSelector(regionsSelector);
    const category = find(['icon', type], categories)!;
    const onCredentialDetails = useCallback(
        (credential: ClaimCredentialWithCheckbox) =>
            navigation.navigate('CredentialDetails', {
                credential,
                disclosureSubtype,
                onDelete: id => setDeletedItems({...deletedItems, [id]: id})
            }),
        [deletedItems, disclosureSubtype, navigation]
    );

    return (
        <CredentialCategoryScreen
            title={category.title}
            type={type}
            size={credentials.length}
            countries={countries}
            regions={regions}
            onCredentialDetails={onCredentialDetails}
            items={credentials.map(item => ({
                ...item,
                status: deletedItems[item.id]
                    ? CredentialStatus.deleted
                    : item.status
            }))}
            isIdentityCredential={false}
        />
    );
};
