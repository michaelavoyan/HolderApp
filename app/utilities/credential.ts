import {
    isBoolean,
    map,
    merge,
    filter,
    isEmpty,
    intersection,
    get
} from 'lodash/fp';
import {SavedSelfReportCredential} from 'app/store/types/profile';
import {findCredentialType} from 'app/utilities/helpers';
import {
    ClaimCredential,
    ClaimCredentialWithCheckbox
} from '../store/types/claim';

export const checkedCredentials = (credentials: ClaimCredential[]) =>
    map(
        item => ({
            ...item,
            checked: true
        }),
        credentials
    );

export const toggleCredentialsToShare = (
    item: ClaimCredentialWithCheckbox,
    val: ClaimCredentialWithCheckbox | boolean
) => {
    if (isBoolean(val)) {
        return merge(item, {
            checked: !val
        });
    }
    return item.id === val.id && findCredentialType(item.type) === findCredentialType(val.type)
        ? merge(item, {
              checked: !val.checked
          })
        : item;
};

export const credentialsByCategory = <T extends {type: string[]}>(
    credentials: T[],
    types: string[]
) =>
    filter(
        credential => !isEmpty(intersection(types, credential.type)),
        credentials
    );

export const credentialsCountByCategory = (
    credentials: (ClaimCredential | SavedSelfReportCredential)[],
    types: string[]
) => credentialsByCategory(credentials, types).length;

export const isCredentialExpired = ({
    offerExpirationDate
}: {offerExpirationDate?: string} & object): boolean => {
    if (!offerExpirationDate) {
        return false;
    }
    try {
        return Number(new Date(offerExpirationDate)) < Date.now();
    } catch (e) {
        return false;
    }
};

export const getIssuerDid = (credential: ClaimCredential) => {
    return get('issuer.id', credential) || get('issuer', credential);
};
