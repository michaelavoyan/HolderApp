import {set} from 'lodash/fp';
import {
    CommonState,
    CredentialCategories,
    IssuingSequence,
    JumpNextIssuingSequence,
    OrganizationProfile
} from '../types/common';
import * as actionTypes from '../actionTypes/common';
import {GenericAction, reducingFunction} from '../helpers/createReducer';

const initialState: CommonState = {
    credentialCategories: [],
    organizations: {},
    isSdkInitialized: false,
    issuingSequence: {
        isNotFirstStep: false,
        linksArray: [],
        path: '',
        skipNextPopup: false
    }
};

const credentialCategoriesSuccess = ({
    categories
}: {
    categories: CredentialCategories;
}) => set('credentialCategories', categories);

const sdkInitialized = () => set('isSdkInitialized', true);

const getOrganizationProfileInfoSuccess = ({
    organizationDid,
    organizationProfile
}: {
    organizationDid: string;
    organizationProfile: OrganizationProfile;
}) => {
    return set(['organizations', organizationDid], organizationProfile);
};

const setIssuingSequence = ({linksArray, path}: IssuingSequence) => {
    return set('issuingSequence', {
        isNotFirstStep: false,
        linksArray,
        path,
        skipNextPopup: false
    });
};

const clearIssuingSequence = () => {
    return set('issuingSequence', {
        isNotFirstStep: false,
        linksArray: [],
        path: '',
        skipNextPopup: false
    });
};

const jumpNextIssuingSequence = (
    {skipNextPopup}: JumpNextIssuingSequence,
    state: CommonState
) => {
    if (state.issuingSequence.linksArray.length === 1) {
        return set('issuingSequence', initialState.issuingSequence);
    }
    state.issuingSequence.linksArray.shift();
    return set('issuingSequence', {
        isNotFirstStep: true,
        linksArray: state.issuingSequence.linksArray,
        path: state.issuingSequence.path,
        skipNextPopup: !!skipNextPopup
    });
};

const actionReducers = {
    [actionTypes.CREDENTIAL_CATEGORIES_SUCCESS]: credentialCategoriesSuccess,
    [actionTypes.SDK_INITIALIZED]: sdkInitialized,
    [actionTypes.GET_ORGANIZATION_PROFILE_INFO_SUCCESS]: getOrganizationProfileInfoSuccess,
    [actionTypes.SET_ISSUING_SEQUENCE]: setIssuingSequence,
    [actionTypes.JUMP_NEXT_ISSUING_SEQUENCE]: jumpNextIssuingSequence,
    [actionTypes.CLEAR_ISSUING_SEQUENCE]: clearIssuingSequence
};

export const commonReducer = (
    state = initialState,
    action: GenericAction
): CommonState => reducingFunction<CommonState>(actionReducers, state, action);
