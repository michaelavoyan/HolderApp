import {VCLService} from '@velocitycareerlabs/vcl-react-native';
import {ClaimCredential, ClaimCredentialWithCheckbox, Vendor} from './claim';

type CommonAction = {
    type: string;
};

export enum DisclosureStatus {
    revoked = 'revoked',
    verified = 'verified'
}

export enum DisclosureSubtype {
    public = 'public',
    linkedin = 'linkedin'
}

export type DisclosureFromPresentation = {
    exchangeId: string;
} & DisclosureRequestObject;

export type SharedCredentials = ClaimCredentialWithCheckbox;

export type DisclosureRequestObject = {
    id: string;
    definitionId: string;
    types: {type: string}[];
    organization: {
        logo: string;
        name: string;
        brandName: string;
        brandImage: string;
    };
    purpose: string;
    name?: string;
    duration?: string;
    termsUrl: string;
    verifier?: string;
    holder?: string;
    subType?: DisclosureSubtype;
    status?: DisclosureStatus;
    exchangeId?: string;
    presentationDefinitionId?: string;
    presentationId?: string;
};

export type AcceptedDisclosureRequestObject = {
    creationDate: string;
    expiresAt?: string;
    credentialIds: string[];
    credentials: ClaimCredential[];
    presentationId: string;
    isOpened?: boolean;
    onDeleted?: () => void;
} & DisclosureRequestObject;

export type DisclosureState = {
    disclosures: AcceptedDisclosureRequestObject[];
    noDisclosuresPopup: boolean;
    disclosureData: DisclosureData;
    issuingSession: null | DisclosureCredentialsToIssuerParams;
    isTempUserFirstIssuingSessionActive: boolean;
    selectedCredentials: SharedCredentials[];
    inspectionSession: null | SelectCredentialToShareParams;
};

export type DisclosureDataRequest = {
    service: VCLService;
    did?: string;
    types?: string[];
    deepLink?: string;
};

export interface IIdCredentials {
    id: string;
    name: string;
    schema: {
        uri: string;
    }[];
    group: string[];
}

export type SubmissionRequirement = {
    rule: string;
    from: string;
    min: string;
};

export type DisclosureData = {
    purpose: string;
    name: string;
    duration?: string;
    termsUrl: string;
    inputDescriptors: IIdCredentials[];
};

export type DisclosureDataRequestSaga = DisclosureDataRequest & CommonAction;

export type navigation = {
    path: string;
    params: object;
};

export interface DisclosureCredentialsToIssuerParams {
    did: string;
    service: VCLService;
    types?: string[];
    issuer?: Vendor;
    acceptNavigation?: navigation;
    deepLink?: string;
    credentialType?: {name: string; id: string; isInitialCredForType?: boolean};
    isMissingCredentialSession?: boolean;
}

export interface SelectCredentialToShareParams {
    type: string;
    types: string[];
    acceptNavigation: {path: string; params: DisclosureRequestParams};
    disclosure?: DisclosureRequestObject;
    disableInfoPopup?: boolean;
    isIdentity?: boolean;
    credentialType?: string;
}

export interface DisclosureRequestParams {
    disclosureId: string;
    agentUrl: string;
    inspectorId: string;
    deepLink: string;
    customTitle?: string;
    credentialId?: string;
}
