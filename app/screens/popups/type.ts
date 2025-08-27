import {TextStyle, ViewStyle} from 'react-native';
import {ReactElement} from 'react';
import {NavigationContainerRefWithCurrent} from '@react-navigation/core';
import {VCLEnvironment} from '@velocitycareerlabs/vcl-react-native';
import {LinkedInRules} from '../../store/types/vcl';

export type PopupButtonProps = {
    title: string;
    onPress?: () => void;
    textStyle?: TextStyle;
    closePopupOnPress?: boolean;
};

export type GenericPopupProps = {
    showSpinner?: boolean;
    title: string;
    description: string;
    buttonsDirection?: 'row' | 'column';
    buttons?: PopupButtonProps[];
    issuingInProgress?: boolean;
    innerTextContainerStyle?: ViewStyle;
};

export enum StatusMessages {
    Done = 'done',
    Error = 'error',
    Shared = 'shared',
    Success = 'success',
    ConnectionBroken = 'connection-broken'
}

export type StatusPopupProps = {
    title: string;
    text?: string;
    statusType: StatusMessages;
    fullScreenMode?: boolean;
    withoutButtons?: boolean;
    onPress?: () => void;
    onUnmount?: () => void;
    closeOnBackdropPress?: boolean;
    withoutGoBack?: boolean;
    buttonTitle?: string;
    errorCode?: string;
};
export type ErrorPopupProps = {
    title: string;
    subTitle?: string;
    buttons?: {
        title: string;
        onPress?: () => void;
        textStyle?: TextStyle;
        closePopupOnPress?: boolean;
    }[];
    errorCode?: string;
    email?: string;
    errorReportId?: string;
};

export type InfoPopupProps = {
    title: string;
    icon: string;
    onClose(): void;
    children: ReactElement;
    closeOnBackdropPress?: boolean;
    slideFromBottom?: boolean;
    canNotClose?: boolean;
};

export type LoadingCallbackProps = {
    navigator: NavigationContainerRefWithCurrent<any>;
    name: string;
    params?: object;
};

export type LoadingPopupProps = {
    title?: string;
    callback?(props: LoadingCallbackProps): void;
};

export type ForceUpgradePopupProps = {
    env: VCLEnvironment;
};

export type DeepLinkPopupProps = {
    title?: string;
    subTitle: string;
    icon?: string;
    onOpen(): void;
    closeOnBackdropPress?: boolean;
};

export type ShareDisclosurePopupProps = {
    link: string;
    onClose(): void;
};

export interface ShareToLinkedInItem {
    imgUrl: string;
    issuerName: string;
    issuerLinkedInId?: string;
    name?: string;
    issueYear?: number;
    issueMonth?: number;
    expirationYear?: number;
    expirationMonth?: number;
    certId?: string;
    certUrl?: string;
}

type onSubmitDisclosureResponce = {
    url: string;
    hash: string;
}

export type ShareToLinkedInPopupProps = {
    credential: ShareToLinkedInItem;
    onCancel(): void;
    onSubmitDisclosure?(): Promise<onSubmitDisclosureResponce>;
    termsUrl: string;
    linkedInRules: LinkedInRules;
    triggerMixpanel?: (shareType: string, linkCode: string) => void;
    onShareMultiple?: () => void;
};

export type ActionPopupProps = {
    title: string;
    description?: string;
    buttons: PopupButtonProps[];
};

export type AttachmentPopupProps = {
    base64: string;
    fileName: string;
    mediaType: string;
};