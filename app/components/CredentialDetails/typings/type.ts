import {
    NativeSyntheticEvent,
    TextInputContentSizeChangeEventData
} from 'react-native';
import {VCLCountry} from '@velocitycareerlabs/vcl-react-native';
import {ClaimCredential} from 'app/store/types/claim';
import {SavedSelfReportCredential} from '../../../store/types/profile';

export type CredentialFilter = {
    id: string;
    types?: string[];
};

export type CredentialVerifiedProps = {
    note?: string;
    toggleSaveVisibility?(): void;
    credentialObject: ClaimCredential | SavedSelfReportCredential;
    changeNotes?(note: string): void;
    hideNote?: boolean;
    countries?: VCLCountry[];
    scrollToInput?(
        event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>
    ): void;
    revocation?: Partial<{
        title: string;
    }>;
    onFinalize?(isAccept?: boolean): void;
    onAcceptOffer?: (offer: any) => void;
    scrollToField?: (offset: number) => void;
    onLinkedInShare?: () => void;
};

export type CredentialItemContainerProps = {
    label: string;
    note?: string;
    info: string | number | string[] | object[];
    withoutBorder: boolean;
    inputItem: boolean;
    toggleSaveVisibility?(): void;
    changeNotes?(note: string): void;
    scrollToInput?(
        event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>
    ): void;
    isImage?: boolean;
    smallText?: boolean;
    withoutMargin?: boolean;
    scrollToField?: (offset: number) => void;
};

export type CredentialItemProps = {
    inputMode: boolean;
    onToggleMode: () => void;
} & CredentialItemContainerProps;

export type AdditionalInfoProps = {
    credentialObject: ClaimCredential | SavedSelfReportCredential;
};
