import {assign, set, map, filter, intersection, isEmpty, find} from 'lodash/fp';
import {uniqBy} from 'lodash';
import {
    ClosePhoneVerifyPopupAction,
    DeleteCredentialsAction,
    ProfileAction,
    ProfileState,
    UpdateSelfReportIsLoadingAction
} from '../types/profile';
import * as actionTypes from '../actionTypes/profile';
import * as authActionTypes from '../actionTypes/auth';
import {GenericAction, reducingFunction} from '../helpers/createReducer';
import {ClaimCredential} from '../types/claim';

const initialState: ProfileState = {
    vfCredentials: [],
    selfReportedCredentials: [],
    vfCredentialsLoaded: false,
    selfReportedCredentialsLoaded: false,
    isSelfReportLoading: false,
    isVfCredentialsLoading: false,
    settings: {
        dateFormat: 'default',
        pushEnabled: false
    },
    phoneVerificationPopupClosed: false,
    showDisclosureTutorial: false
};

const vfCredentialsSuccess = (
    {credentials}: ProfileAction,
    state: ProfileState
) =>
    assign(state, {
        vfCredentials: credentials,
        vfCredentialsLoaded: true
    });

const selfReportedCredentialsSuccess = (
    {credentials}: ProfileAction,
    state: ProfileState
) =>
    assign(state, {
        selfReportedCredentials: credentials,
        selfReportedCredentialsLoaded: true
    });

const updateCredentialSuccess = (
    {isVerified, credentialObject}: ProfileAction,
    state: ProfileState
) =>
    assign(state, {
        [isVerified ? 'vfCredentials' : 'selfReportedCredentials']: map(
            (credential: any) =>
                credential.id === credentialObject?.id
                    ? credentialObject
                    : credential,
            state[isVerified ? 'vfCredentials' : 'selfReportedCredentials']
        ),
        isVfCredentialsLoading: isVerified
            ? false
            : state.isVfCredentialsLoading
    });

const updateCredentialsSuccess = (
    {credentials}: {credentials: ClaimCredential[]},
    state: ProfileState
) =>
    assign(state, {
        vfCredentials: uniqBy([...credentials, ...state.vfCredentials], 'id')
    });

const updateSettings = ({settings}: ProfileAction) => set('settings', settings);

const logoutSuccess = (_: any, state: ProfileState) =>
    assign(state, {
        vfCredentials: [],
        selfReportedCredentials: [],
        vfCredentialsLoaded: false,
        selfReportedCredentialsLoaded: false
    });

const deleteCredentialByIdSuccess = (
    action: ProfileAction,
    state: ProfileState
) => {
    const type = action.isVerified
        ? 'vfCredentials'
        : 'selfReportedCredentials';
    const filteredCredentials = filter(
        (item: {id: string}) => item.id !== action.id,
        state[type]
    );
    return assign(state, {
        [type]: filteredCredentials
    });
};

const resetDataSuccess = (
    {
        exceptedCredentialsTypes
    }: {exceptedCredentialsTypes: string[]; type: string},
    state: ProfileState
) =>
    assign(state, {
        vfCredentials: filter(
            (item) =>
                item.default ||
                !isEmpty(intersection(exceptedCredentialsTypes, item.type)),
            state.vfCredentials
        ), // don't delete default identity credentials and credentials with exceptedCredentialsTypes
        selfReportedCredentials: []
    });

const updateSelfReportLoading = (
    {isLoading}: UpdateSelfReportIsLoadingAction,
    state: ProfileState
) =>
    assign(state, {
        isSelfReportLoading: isLoading
    });

const updateIsVFCredentialsIsLoading = (
    {isLoading}: {isLoading: boolean},
    state: ProfileState
) =>
    assign(state, {
        isVfCredentialsLoading: isLoading
    });

const deleteCredentialsSuccess = (
    action: DeleteCredentialsAction,
    state: ProfileState
) => {
    const filteredVfCredentials = filter(
        (credential) => !find(['id', credential.id], action.credentials),
        state.vfCredentials
    );

    const filteredSelfReportedCredentials = filter(
        (credential) => !find(['id', credential.id], action.credentials),
        state.selfReportedCredentials
    );

    return assign(state, {
        vfCredentials: filteredVfCredentials,
        selfReportedCredentials: filteredSelfReportedCredentials
    });
};

const setPhoneVerificationPopupClosed = (
    action: ClosePhoneVerifyPopupAction,
    state: ProfileState
) =>
    assign(state, {
        phoneVerificationPopupClosed: !!action.isClosed
    });

const setShowDisclosureTutorial = ({
    showDisclosureTutorial
}: {
    showDisclosureTutorial: boolean;
}) => set('showDisclosureTutorial', showDisclosureTutorial);

const actionReducers = {
    [actionTypes.VERIFIABLE_CREDENTIALS_SUCCESS]: vfCredentialsSuccess,
    [actionTypes.SELF_REPORTED_CREDENTIALS_SUCCESS]:
        selfReportedCredentialsSuccess,
    [actionTypes.UPDATE_CREDENTIAL_SUCCESS]: updateCredentialSuccess,
    [actionTypes.UPDATE_CREDENTIALS_SUCCESS]: updateCredentialsSuccess,
    [authActionTypes.LOGOUT_SUCCESS]: logoutSuccess,
    [actionTypes.DELETE_CREDENTIAL_BY_ID_SUCCESS]: deleteCredentialByIdSuccess,
    [actionTypes.RESET_DATA_SUCCESS]: resetDataSuccess,
    [actionTypes.UPDATE_SETTINGS_SUCCESS]: updateSettings,
    [actionTypes.UPDATE_IS_SELF_REPORT_IS_LOADING]: updateSelfReportLoading,
    [actionTypes.UPDATE_IS_VF_CREDENTIALS_IS_LOADING]:
        updateIsVFCredentialsIsLoading,
    [actionTypes.DELETE_CREDENTIALS_SUCCESS]: deleteCredentialsSuccess,
    [actionTypes.SET_PHONE_VERIFICATION_POPUP_CLOSED]:
        setPhoneVerificationPopupClosed,
    [actionTypes.SET_SHOW_DISCLOSURE_TUTORIAL]: setShowDisclosureTutorial
};

export const profileReducer = (
    state = initialState,
    action: GenericAction
): ProfileState =>
    reducingFunction<ProfileState>(actionReducers, state, action);
