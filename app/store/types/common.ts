type CommonAction = {
    type: string;
};

export enum AppStates {
    inactive = 'inactive',
    background = 'background',
    active = 'active'
}

export type CredentialCategories = CredentialCategory[];

export type CredentialCategory = {
    title: string;
    icon: string;
    types: string[];
    isIdentity?: boolean;
    color: string;
};

export type OrganizationProfile = {
    id: string;
    logo: string;
    name: string;
};

export type IssuingSequence = {
    linksArray: string[];
    path: string;
    skipNextPopup: boolean;
    isNotFirstStep: boolean;
};

export type CommonState = {
    credentialCategories: CredentialCategories;
    isSdkInitialized: boolean;
    organizations: {[organizationDid: string]: OrganizationProfile};
    issuingSequence: IssuingSequence;
};

export type GetOrganizationProfileAction = {
    type: string;
    organizationDid: string;
};

export type GetOrganizationProfileActionSuccess = {
    type: string;
    organizationDid: string;
    organizationProfile: OrganizationProfile;
};

export type SetIssuingSequence = {
    type: string;
    linksArray: string[];
    path: string;
};

export type ClearIssuingSequence = CommonAction;

export type JumpNextIssuingSequence = {
    type: string;
    skipNextPopup?: boolean;
};
