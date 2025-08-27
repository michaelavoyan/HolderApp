import * as actionTypes from '../actionTypes/common';
import {
    ClearIssuingSequence,
    CredentialCategories,
    GetOrganizationProfileAction,
    GetOrganizationProfileActionSuccess,
    JumpNextIssuingSequence,
    OrganizationProfile,
    SetIssuingSequence
} from '../types/common';

export const credentialCategories = () => ({
    type: actionTypes.CREDENTIAL_CATEGORIES
});

export const credentialCategoriesSuccess = (
    categories: CredentialCategories
) => ({
    type: actionTypes.CREDENTIAL_CATEGORIES_SUCCESS,
    categories
});

export const SDKInitialized = () => ({
    type: actionTypes.SDK_INITIALIZED
});

export const getOrganizationProfileInfo = (
    organizationDid: string
): GetOrganizationProfileAction => ({
    type: actionTypes.GET_ORGANIZATION_PROFILE_INFO,
    organizationDid
});

export const getOrganizationProfileInfoSuccess = (
    organizationDid: string,
    organizationProfile: OrganizationProfile
): GetOrganizationProfileActionSuccess => ({
    type: actionTypes.GET_ORGANIZATION_PROFILE_INFO_SUCCESS,
    organizationDid,
    organizationProfile
});

export const setIssuingSequence = (
    linksArray: string[],
    path: string
): SetIssuingSequence => ({
    type: actionTypes.SET_ISSUING_SEQUENCE,
    linksArray,
    path
});

export const clearIssuingSequence = (): ClearIssuingSequence => ({
    type: actionTypes.CLEAR_ISSUING_SEQUENCE
});

export const jumpNextIssuingSequence = (
    skipNextPopup?: boolean
): JumpNextIssuingSequence => ({
    type: actionTypes.JUMP_NEXT_ISSUING_SEQUENCE,
    skipNextPopup
});
