import * as actionTypes from '../actionTypes/profile';
import {ClaimCredential} from '../types/claim';
import {
    CredentialToUpdate,
    DeleteCredentialAction,
    DeleteCredentialsAction,
    SavedSelfReportCredential,
    SaveSelfReportAction,
    SettingsProps,
    UpdateCredentialAction,
    UpdateCredentialsAction,
    UpdateSelfReportIsLoadingAction
} from '../types/profile';

export const getCredentials = (onlyVerified: boolean = false) => ({
    type: actionTypes.GET_CREDENTIALS,
    onlyVerified
});

export const verifiableCredentialsSuccess = (
    credentials?: ClaimCredential[]
) => ({
    type: actionTypes.VERIFIABLE_CREDENTIALS_SUCCESS,
    credentials
});

export const selfReportedCredentialsSuccess = (
    credentials: SavedSelfReportCredential[]
) => ({
    type: actionTypes.SELF_REPORTED_CREDENTIALS_SUCCESS,
    credentials
});

export const updateCredentialSuccess = (
    credentialObject: CredentialToUpdate,
    isVerified: boolean
) => ({
    type: actionTypes.UPDATE_CREDENTIAL_SUCCESS,
    credentialObject,
    isVerified
});

export const resetDataSuccess = (exceptedCredentialsTypes: string[] = []) => ({
    type: actionTypes.RESET_DATA_SUCCESS,
    exceptedCredentialsTypes
});

export const updateSettings = (settings: SettingsProps) => ({
    type: actionTypes.UPDATE_SETTINGS_SUCCESS,
    settings
});

export const setSettings = (settings: Partial<SettingsProps>) => ({
    type: actionTypes.SET_SETTINGS,
    settings
});

export const deleteCredentialById = (action: DeleteCredentialAction) => ({
    type: actionTypes.DELETE_CREDENTIAL_BY_ID,
    ...action
});

export const deleteCredentialByIdSuccess = (
    action: DeleteCredentialAction
) => ({
    type: actionTypes.DELETE_CREDENTIAL_BY_ID_SUCCESS,
    ...action
});

export const deleteCredentials = (action: DeleteCredentialsAction) => ({
    type: actionTypes.DELETE_CREDENTIALS,
    ...action
});

export const deleteCredentialsSuccess = (action: DeleteCredentialsAction) => ({
    type: actionTypes.DELETE_CREDENTIALS_SUCCESS,
    ...action
});

export const updateCredential = (action: UpdateCredentialAction) => ({
    type: actionTypes.UPDATE_CREDENTIAL,
    ...action
});

export const settings = () => ({
    type: actionTypes.GET_SETTINGS
});

export const saveSelfReported = (action: SaveSelfReportAction) => ({
    type: actionTypes.SAVE_SELF_REPORTED,
    ...action
});

export const updateIsSelfReportLoading = (
    action: UpdateSelfReportIsLoadingAction
) => ({
    type: actionTypes.UPDATE_IS_SELF_REPORT_IS_LOADING,
    ...action
});

export const updateIsVfCredentialsLoading = (action: {isLoading: boolean}) => ({
    type: actionTypes.UPDATE_IS_VF_CREDENTIALS_IS_LOADING,
    ...action
});

export const resetData = () => ({
    type: actionTypes.RESET_DATA
});

export const deleteRevokedCredentials = () => ({
    type: actionTypes.DELETE_REVOKED_CREDENTIALS
});

export const updateCredentials = (action: UpdateCredentialsAction) => ({
    type: actionTypes.UPDATE_CREDENTIALS,
    ...action
});

export const updateCredentialsSuccess = (credentials: ClaimCredential[]) => ({
    type: actionTypes.UPDATE_CREDENTIALS_SUCCESS,
    credentials
});

export const setPhoneVerificationPopupClosed = (isClosed: boolean) => ({
    type: actionTypes.SET_PHONE_VERIFICATION_POPUP_CLOSED,
    isClosed
});

export const setShowDisclosureTutorial = (showDisclosureTutorial: boolean) => ({
    type: actionTypes.SET_SHOW_DISCLOSURE_TUTORIAL,
    showDisclosureTutorial
});
