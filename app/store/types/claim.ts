import {
    VCLCredentialManifest,
    VCLGenerateOffersDescriptor,
    VCLOffers,
    VCLService,
    VCLToken
} from '@velocitycareerlabs/vcl-react-native';
import {NavigateOptions} from '../../navigation/utils';

// TODO: remove after https://velocitycareerlabs.atlassian.net/browse/VL-1402 is completed
export enum IdentityCredentialTypeE {
    IdDocument = 'IdDocument',
    Phone = 'Phone',
    Email = 'Email'
}

export type LocationCodes = {
    countryCode: string;
    regionCode?: string;
};

export type Vendor = {
    id: string;
    name: string;
    logo: string;
    brandName?: string;
    brandImage?: string;
    credentialTypes: string[];
    service: VCLService;
    location: LocationCodes;
};

export type CredentialSchema = {id: string; type: string};

export type SetIdentityCredentialProps = {
    jwt: string;
    userId: string;
    default: boolean;
    type: string[];
    credentialSubject: object;
    credentialManifest?: VCLCredentialManifest;
    output_descriptors?: string;
    issuer?: {id: string};
};

type Issuer = {
    id: string;
    name: string;
    logo?: string;
};

export type ClaimCredential = {
    id: string;
    offerId: string;
    type: string[];
    issuer: Issuer;
    issued?: string;
    credentialSchema?: CredentialSchema;
    credentialSubject: object;
    logo?: string;
    vendorCountry?: string;
    note?: string;
    status: CredentialStatus;
    revocationDate?: string;
    revocationReason?: string;
    expirationDate?: string;
    credentialManifest?: VCLCredentialManifest;
    vclToken?: VCLToken;
    isNewRevoked?: boolean;
    offerExpirationDate: string;
    saveOfferDate?: string;
    vendor?: Issuer;
    isNewWaiting?: boolean;
    withoutAccept?: boolean;
    userId: string;
    replacerId?: string;
    additionalInfo: CredentialAdditionalInfo;
    linkedCredentials?: LinkedCredential[];
    default?: boolean;
    jwt?: string;
    hash: string;
    relatedResource?: RelatedResource[];
    dynamicRootProperties?: object;
};

export type DisplaySchemaItem = {
    path: string[];
    schema: {
        type?: string;
        format?: string;
    };
    fallback?: string;
};

export type DisplaySchemaProp = {
    label: string;
} & DisplaySchemaItem;

export type DisplaySchema = {
    title: DisplaySchemaItem;
    subtitle: DisplaySchemaItem;
    summary_detail: DisplaySchemaItem;
    logo?: DisplaySchemaItem;
    description: {
        text: string;
    };
    properties: DisplaySchemaProp[];
};

export type LinkedCredential = {linkType: string; linkCode: string};

export type Vendors = {
    vendors: Vendor[];
};

export type RelatedResource = {id: string; name?: string; mediaType: string};

export type ClaimCredentialWithCheckbox = {
    checked: boolean;
} & ClaimCredential;

export type ClaimState = Vendors & {
    offers: ClaimCredentialWithCheckbox[];
    pushOffers: ClaimCredentialWithCheckbox[];
    progress: number;
    credentialManifest: VCLCredentialManifest | null;
    notificationId: string;
    handledOfferNotificationId: string;
};

type Action = {type: string};

export type LinkCodeCommitment = {
    value: string;
};

export type OffersAction = {
    service: VCLService;
    types?: string[];
    selectedCredentials: ClaimCredential[];
    isNewWaiting?: boolean;
    linkCodeCommitment?: LinkCodeCommitment;
    deepLink?: string;
    did?: string;
    verificationIdentifier?: string;
    credentialManifest?: VCLCredentialManifest;
    withoutProgress?: boolean;
};

export type OffersSaga = OffersAction & Action;

export type CredentialManifestEffect = {
    pushToken: string;
} & OffersAction;

export type GenerateOffersEffect = {
    credentialManifest: VCLCredentialManifest;
} & CredentialManifestEffect;

export type CheckOffersEffect = {
    credentialManifest: VCLCredentialManifest;
    vclToken: VCLToken;
} & CredentialManifestEffect &
    Pick<VCLGenerateOffersDescriptor, 'credentialManifest' | 'types'>;

export type VendorsAction = {
    types: string[];
    type: string;
    query: string;
};

export type GenerateOffers = {
    offers: ClaimCredentialWithCheckbox[];
    vclOffers?: VCLOffers;
};

export type FinalizeOffersAction = {
    credentialManifest: VCLCredentialManifest;
    offers: GenerateOffers;
    vendorsLocation?: {name: string; params?: object};
    vendor: {logo: string; country?: string};
    additionalInfo?: CredentialAdditionalInfo;
    updatedOffer?: ClaimCredential;
    offerIdToDelete?: string;
    vclToken: VCLToken;
    navigation?: {
        path: string;
        params?: object;
    };
};

export type FinalizeOffersDiffIssuersAction = {
    offers: GenerateOffers;
    isAccept: boolean;
    navigation?: {name: string; option?: NavigateOptions};
    offerIdsToDelete?: string[];
};

export type SetCredentials = {
    vfCredentials: string[];
    vfCredentialsWithOffers?: {
        credential: string;
        offer: ClaimCredential;
    }[];
    vendor?: {logo: string; country?: string};
    additionalInfo?: CredentialAdditionalInfo;
    credentialManifest?: VCLCredentialManifest;
};

export type CredentialAdditionalInfo = {
    replacedDate: string;
    replacedId: string;
};

export type FinalizeOffersSaga = Action & FinalizeOffersAction;
export type FinalizeOffersDifferentIssuersSaga = Action &
    FinalizeOffersDiffIssuersAction;

export enum NotificationType {
    revoked = 'CredentialRevoked',
    replaced = 'CredentialReplaced',
    newOffer = 'NewOffersReady',
    noOffers = 'NoOffersFound',
    expiringDisclosure = 'ExpiringDisclosure',
    presentationVerified = 'PresentationVerified'
}

export enum CredentialStatus {
    revoked = 'CredentialRevoked',
    verified = 'verified',
    self = 'self-signed',
    offered = 'offered',
    replaced = 'replaced',
    deleted = 'deleted',
    expired = 'expired'
}

export type PushOffersAction = {
    issuer: string;
    notificationType: NotificationType;
    notificationId: string;
    credentialId: string;
    exchangeId: string;
    types: string[];
    replacementCredentialType: string;
    withoutBadges?: boolean;
    isFromBackground?: boolean;
};
export type PushOffersSuccessAction = {
    offers: ClaimCredentialWithCheckbox[];
};

export type PushOffersSaga = Action & PushOffersAction;
export type NavigateToIssuingSessionEffect = Action & PushOffersSuccessAction;

export type UpdateCredentialEffect =
    | PushOffersSaga
    | {
          updatedCredential: ClaimCredential;
      };

export enum LinkType {
    replace = 'REPLACE'
}

export type CredentialManifestAction = {
    credentialManifest: VCLCredentialManifest;
};
