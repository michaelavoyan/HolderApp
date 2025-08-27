import {VCLCredentialTypeSchema} from '@velocitycareerlabs/vcl-react-native';
import React from 'react';
import {
    DisclosureCredentialsToIssuerParams,
    DisclosureRequestParams,
    DisclosureSubtype,
    SelectCredentialToShareParams,
    SharedCredentials,
    navigation
} from 'app/store/types/disclosure';
import {
    ClaimCredential,
    ClaimCredentialWithCheckbox,
    CredentialAdditionalInfo
} from '../store/types/claim';
import {SavedSelfReportCredential} from '../store/types/profile';
import {
    DeepLinkPopupProps,
    ErrorPopupProps,
    ForceUpgradePopupProps,
    GenericPopupProps,
    InfoPopupProps,
    LoadingPopupProps,
    ShareDisclosurePopupProps,
    ShareToLinkedInPopupProps,
    StatusPopupProps,
    ActionPopupProps
} from '../screens/popups/type';

export type AuthStackParamList = {
    'Select a persona': undefined;
    Welcome: undefined;
    TermsAndConditions: undefined;
    SelectPersona: undefined;
    GetStartedFirstStep: undefined;
    GetStartedPhoneVerification: undefined;
    GetStartedEmailVerification: undefined;
};

export type ProfileStackParamList = {
    Profile: {
        id?: string; // example of property that can accept screen on open
    };
};

export type DisclosureStackParamList = {
    Disclosure: undefined;
    PastDisclosures: undefined;
};

export type NotificationsStackParamList = {
    Notifications: undefined;
};

export type SettingsStackParamList = {
    Settings: undefined;
    TermsAndConditions: undefined;
    NewContentSettings: {
        isOpenedFromSettings: boolean;
    };
    LinkedIn:
        | {
              onSuccess: () => void;
              fromShare?: boolean;
          }
        | undefined;
    EditProfile: undefined;
};

export interface DisclosureCredentialsToInspectorParams {
    type: string;
    types: string[];
    disableInfoPopup?: boolean;
    acceptNavigation?: navigation;
    isIdentity?: boolean;
}

export type RootStackParamList = {
    NewContentGuide: {
        isOpenedFromSettings: boolean;
    };
    TermsAndConditionsUpdate: undefined;
    TermsAndConditions: undefined;
    Auth: undefined;
    EditProfile: undefined;
    Notifications: undefined;
    Tabs: {
        Profile: React.FC;
        Disclosures: React.FC;
        Notifications: React.FC;
        Settings: React.FC;
        Auth: React.FC;
        initialTabName?: string;
    };
    Category: {
        type: string;
    };
    SelectCredentialToShare: SelectCredentialToShareParams;
    Issuers: {
        type?: string;
        acceptNavigation?: navigation;
        isMissingCredentialSession?: boolean;
    };
    ScanQR: undefined;
    DisclosureRequest: DisclosureRequestParams;
    DisclosureTermsAndConditions: undefined;
    DisclosureCredentialsToIssuer: DisclosureCredentialsToIssuerParams;
    DisclosureSelectCredentialToShare: {
        credentials: ClaimCredentialWithCheckbox[];
        onSelect: (selectedItems: ClaimCredentialWithCheckbox[]) => void;
        type?: string;
        title?: string;
        issuingSessionParams?: DisclosureCredentialsToIssuerParams;
    };
    PastDisclosureRequestDetails: {
        disclosureId?: string;
    };
    PastDisclosureRequestCredentials: {
        type: string;
        credentials: SharedCredentials[];
        deletedCredentials?: {[prop: string]: string};
        disclosureSubtype?: DisclosureSubtype;
    };
    ValidateIssuer: {
        deepLink: string;
        [param: string]: string;
    };
    AddPhone: undefined;
    AddEmail: undefined;
    CredentialDetails: {
        credential: ClaimCredential;
        isShareToLinkedInOpen?: boolean;
        isOffer?: boolean;
        onAcceptOffer?: (offer: ClaimCredentialWithCheckbox[]) => void;
        goBack?: boolean;
        onDelete?: (id: string) => void;
        disclosureSubtype?: DisclosureSubtype;
    };
    SelfReport: {
        credentialTypeSchema?: VCLCredentialTypeSchema;
        credentialSchemaName?: string;
        credential?: SavedSelfReportCredential;
        onDelete?: (id: string) => void;
    };
    AcceptOffers: {
        additionalInfo?: CredentialAdditionalInfo;
        types?: string[];
        issuerId: string;
        acceptNavigation?: navigation;
        withTC?: boolean;
    };
    GenericPopup: GenericPopupProps;
    StatusPopup: StatusPopupProps;
    ErrorPopup: ErrorPopupProps;
    ActionPopup: ActionPopupProps;
    InfoPopup: InfoPopupProps;
    LoadingPopup: LoadingPopupProps;
    ForceUpgradePopup: ForceUpgradePopupProps;
    DeepLinkPopup: DeepLinkPopupProps;
    ShareDisclosurePopup: ShareDisclosurePopupProps;
    ShareToLinkedInPopup: ShareToLinkedInPopupProps;
    WhatsNewGuide: {
        isOpenedFromSettings: boolean;
    };
    LinkedInSelectCredentialToShare?: {
        credentials?: ClaimCredentialWithCheckbox[];
        inProgress?: boolean;
        credentialsInProgress?: ClaimCredentialWithCheckbox[];
    };
    ClaimSuccessPopup: {credentials: ClaimCredentialWithCheckbox[]};
    DisclosureTutorialPopup: undefined;
    AttachmentPopup: {base64: string; fileName: string; mediaType: string};
    SettingsTab: {screen: string; isOpenedFromSettings: boolean};
};

export enum PopupScreens {
    GENERIC_POPUP = 'GenericPopup',
    STATUS_POPUP = 'StatusPopup',
    EROR_POPUP = 'ErrorPopup',
    INFO_POPUP = 'InfoPopup',
    LOADING_POPUP = 'LoadingPopup',
    SHARE_DISCLOSURE_POPUP = 'ShareDisclosurePopup',
    SHARE_TO_LINKEDIN_POPUP = 'ShareToLinkedInPopup',
    FORCE_UPGRADE_POPUP = 'ForceUpgradePopup'
}
