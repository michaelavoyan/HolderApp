import {VCLToken} from '@velocitycareerlabs/vcl-react-native';
import {
    DisclosureData,
    DisclosureRequestObject
} from 'app/store/types/disclosure';
import {ClaimCredential} from 'app/store/types/claim';
import {
    CredentialCategories,
    CredentialCategory
} from '../../store/types/common';

export type Disclosure = {
    disclosure: DisclosureRequestObject | DisclosureData;
};

export type CredentialContainerProps = {
    title: string;
    disabled: boolean;
    credentials: ClaimCredentialWithCheckbox[];
    onChangeCheckedList(credential: ClaimCredentialWithCheckbox): void;
    onCheckAll(isChecked: boolean, types: string[]): void;
    types: string[];
    disclosureState: {
        [key: string]: string;
    };
    isIdentity: boolean;
};

export type ClaimCredentialWithCheckbox = {
    checked: boolean;
} & ClaimCredential;

export type SchemaVersionOneClaimCredentialWithCheckbox = Omit<
    ClaimCredentialWithCheckbox,
    'vclToken'
> & {
    vnfToken?: VCLToken;
};

export type DisclosureHeader = {
    title: string;
    logo?: string;
    subTitle?: string;
    isPublicSharingMode?: boolean;
    isPublicSharingModeSingle?: boolean;
};

export type SharedCredentialsListProps = {
    credentials: ClaimCredentialWithCheckbox[];
    types: string[];
    onPress: (item: CredentialCategory) => void;
    defaultCategories?: CredentialCategories;
    hideEmpty?: boolean;
    categories: CredentialCategories;
};

export type SharedCategoryListProps = {
    credentials: ClaimCredentialWithCheckbox[];
};
