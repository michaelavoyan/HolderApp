import {
    ClaimCredential,
    CredentialSchema,
    CredentialStatus,
    RelatedResource
} from './claim';
import {NavigateOptions} from '../../navigation/utils';

export type SettingsProps = {
    dateFormat: string;
    pushEnabled: boolean;
    usersGeneratedFlag?: boolean;
    pushPermissionsEnabled?: boolean;
    darkMode?: boolean;
    allowUpgrade?: boolean;
};

export type ProfileState = {
    vfCredentials: ClaimCredential[];
    selfReportedCredentials: SavedSelfReportCredential[];
    settings: SettingsProps;
    vfCredentialsLoaded: boolean;
    selfReportedCredentialsLoaded: boolean;
    isSelfReportLoading: boolean;
    isVfCredentialsLoading: boolean;
    phoneVerificationPopupClosed: boolean;
    showDisclosureTutorial: boolean;
};

type CommonAction = {
    type: string;
};

type Action = {
    type: string;
    id?: string;
    credentialObject?: ClaimCredential;
    types?: string[];
    isVerified?: boolean;
    credentials?: ClaimCredential[];
};

export type ProfileAction = Action & Partial<ProfileState>;

export type SavedSelfReportCredential = {
    type: string[];
    id: string;
    credentialSubject: object;
    status: CredentialStatus;
    isSelf?: boolean;
    credentialSchema?: null | CredentialSchema;
    userId?: string;
    jwt?: string;
    offerExpirationDate?: string;
    relatedResource?: RelatedResource[];
    dynamicRootProperties?: object;
};

export type SaveSelfReportAction = {
    credential: SavedSelfReportCredential;
    navigation?: {name: string};
};

export type UpdateSelfReportIsLoadingAction = {
    isLoading: boolean;
};

export type SaveSelfReportSaga = SaveSelfReportAction & CommonAction;

export type DeleteCredentialAction = {
    isVerified: boolean;
    id: string;
    navigation?: {name: string; option: NavigateOptions};
};

export type DeleteCredentialsAction = {
    credentials: ClaimCredential[];
    navigation?: {name: string; option: NavigateOptions};
};

export type DeleteCredentialSaga = DeleteCredentialAction & CommonAction;
export type DeleteCredentialsSaga = DeleteCredentialsAction & CommonAction;

export type CredentialToUpdate = Partial<
    ClaimCredential | SavedSelfReportCredential
> & {id: string};

export type UpdateCredentialAction = {
    isVerified: boolean;
    credentialObject: CredentialToUpdate;
    updateVerified?: boolean;
    navigation?: {name: string; option?: NavigateOptions};
};

export type UpdateCredentialsAction = {
    credentials: ClaimCredential[];
};

export type UpdateCredentialSaga = UpdateCredentialAction & CommonAction;
export type UpdateCredentialsSaga = UpdateCredentialsAction & CommonAction;
export type credentialsToReduxAction = {onlyVerified: boolean} & CommonAction;
export type ClosePhoneVerifyPopupAction = {
    isClosed: boolean;
};
