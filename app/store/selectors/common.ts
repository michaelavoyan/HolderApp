import {get, find, getOr, isEmpty, intersection, filter} from 'lodash/fp';
import {createSelector} from 'reselect';
import {Selectors} from './types';
import {
    CommonState,
    CredentialCategories,
    CredentialCategory,
    IssuingSequence
} from '../types/common';
import {RootState} from '../reducers';

export const credentialCategoriesSelector = createSelector<
    Selectors<CredentialCategories>,
    CredentialCategories
>(get('common.credentialCategories'), (val: CredentialCategories) => val);

export const issuingSequenceSelector = createSelector<
    Selectors<IssuingSequence>,
    IssuingSequence
>(get('common.issuingSequence'), (val: IssuingSequence) => val);

export const isSdkInitializedSelector = createSelector<
    Selectors<boolean>,
    boolean
>(get('common.isSdkInitialized'), (val: boolean) => val);

export const identityTypesSelector = createSelector<
    Selectors<CredentialCategories>,
    string[]
>(get('common.credentialCategories'), (val: CredentialCategories) =>
    getOr([], 'types', find('isIdentity', val))
);

const categoriesFilter = (
    types: Array<string>,
    categories: CredentialCategories
): CredentialCategory =>
    find(
        (item) => !isEmpty(intersection(item.types, types)),
        categories
    ) as CredentialCategory;

export const credentialColorSelector = (credTypes: Array<string>) =>
    createSelector<Selectors<CredentialCategories>, string>(
        credentialCategoriesSelector,
        (categories: CredentialCategories) =>
            getOr('', 'color', categoriesFilter(credTypes, categories))
    );

export const categoriesByTypesSelector = createSelector(
    (state: RootState) => state?.common.credentialCategories,
    (_: any, types: Array<string>) => types,
    (categories: CredentialCategories, types: Array<string>) =>
        filter(
            (category) => !isEmpty(intersection(types, category.types)),
            categories
        )
);

export const organizationProfileSelector = createSelector(
    (state: RootState) => state?.common?.organizations,
    (_: any, organizationDid: string) => organizationDid,
    (organizations: CommonState['organizations'], organizationDid: string) =>
        organizations && organizations[organizationDid]
);

export const isIdentitySelector = (types: Array<string>) =>
    createSelector(
        identityTypesSelector,
        (identityTypes: Array<string>) => 
          !isEmpty(intersection(types, identityTypes))
    );
