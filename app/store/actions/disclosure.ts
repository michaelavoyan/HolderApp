import * as actionTypes from '../actionTypes/disclosure';
import {
    AcceptedDisclosureRequestObject,
    DisclosureCredentialsToIssuerParams,
    DisclosureData,
    DisclosureDataRequest,
    SelectCredentialToShareParams,
    SharedCredentials
} from '../types/disclosure';

export const getDisclosuresSuccess = (
    disclosures: AcceptedDisclosureRequestObject[]
) => ({
    type: actionTypes.DISCLOSURES_SUCCESS,
    disclosures
});

export const getDisclosures = () => ({
    type: actionTypes.DISCLOSURES
});

export const setNoDisclosuresPopup = (noDisclosuresPopup: boolean) => ({
    type: actionTypes.SET_NO_DISCLOSURES_POPUP,
    noDisclosuresPopup
});

export const getDisclosureData = (data: DisclosureDataRequest) => ({
    type: actionTypes.GET_DISCLOSURE_DATA,
    ...data
});

export const clearDisclosureData = () => ({
    type: actionTypes.CLEAR_DISCLOSURE_DATA
});

export const setDisclosureData = (disclosureData: DisclosureData) => ({
    type: actionTypes.SET_DISCLOSURE_DATA,
    disclosureData
});
export const setDisclosureDataVerified = (exchangeId: string) => ({
    type: actionTypes.SET_DISCLOSURE_DATA_VERIFIED,
    exchangeId
});

export const saveOriginalIssuingSession = (
    disclosureData: DisclosureCredentialsToIssuerParams
) => ({
    type: actionTypes.SAVE_ORIGINAL_ISSUING_SESSION,
    disclosureData
});

export const clearOriginalIssuingSession = () => ({
    type: actionTypes.CLEAR_ORIGINAL_ISSUING_SESSION
});

export const setIsTempUserFirstIssuingSessionActiveAction = (
    isActive: boolean
) => ({
    type: actionTypes.SET_IS_TEMP_USER_FIRST_ISSUING_SESSION,
    isActive
});

export const setDisclosureSelectedCredentials = (
    selectedCredentials: SharedCredentials[]
) => ({type: actionTypes.SET_SELECTED_CREDENTIALS, selectedCredentials});

export const saveOriginalInspectionSessionAction = (
    sessionData: SelectCredentialToShareParams
) => ({type: actionTypes.SAVE_ORIGINAL_INSPECTION_SESSION, sessionData});

export const clearOriginalInspectionSessionAction = () => ({
    type: actionTypes.CLEAR_ORIGINAL_INSPECTION_SESSION
});
