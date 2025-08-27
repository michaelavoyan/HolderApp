import {StyleProp, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {VCLCountry} from '@velocitycareerlabs/vcl-react-native';
import {ClaimCredential} from 'app/store/types/claim';
import {CountryCodes} from 'app/store/types/auth';
import {SavedSelfReportCredential} from '../../../store/types/profile';

export type StatusBlockProps = {
    status?: string;
    expireAt?: string;
};

export type AlertTextProps = {
    title: string;
    subTitle?: string;
    message?: string;
};

export type TermAndConditionsProps = {
    checked?: boolean;
    onCheck?(): void;
    link: string;
    text: string;
    isPublicSharingMode?: boolean;
};

export type CredentialTypeIconProps = {
    icon: string;
    iconSize?: number;
    isSVG?: boolean;
    color?: string;
    iconContainerStyle?: StyleProp<ViewStyle>;
};

export type CheckBoxProps = {
    checked: boolean;
    toggleCheckbox(): void;
};

export type CredentialSummaryProps = {
    checked?: boolean;
    toggleCheckbox?(item: ClaimCredential | SavedSelfReportCredential): void;
} & CredentialInfoProps;

export type CredentialInfoProps = {
    item: ClaimCredential | SavedSelfReportCredential;
    onCredentialDetails(): void;
    isVerified?: boolean;
    countries?: VCLCountry[];
    regions?: CountryCodes;
    hideStatus?: boolean;
    revoked?: boolean;
    hideSummaryDetails?: boolean;
    offerExpirationDate?: string;
    isShareEnabled?: boolean;
    onShare?(callback?: any): void;
    shareToLinkedIn?(callback?: any): void;
};

export type ListItemProps = {
    title: string;
    subTitle?: string;
    subTitleColor?: string;
    subTitles?: React.JSX.Element[];
    checked?: boolean;
    chevron?: boolean;
    onPress?(title?: string): void;
    withoutBorder?: boolean;
    withoutRightElement?: boolean;
    isTransparent?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    leftImage?: string;
    hiddenAddOptionButton?: boolean;
    disabledButton?: boolean;
    shouldAnimateCheckedIcon?: boolean;
    handleSelectAll?(): void;
    selectAll?: boolean;
};

export type ModalItemType = {
    title: string;
    action: () => void;
    icon?: string;
    iconColor?: string;
};

export type ModalType = {
    type: ModalTypes;
    subType?: string;
    title?: string;
    items?: ModalItemType[];
};

export enum ModalTypes {
    Categories = 'categories',
    Menu = 'menu',
    None = 'none'
}

export enum ModalSubTypes {
    Identity = 'identity',
    Category = 'credentials',
    SelfReport = 'self-report',
    ProfilePage = 'profile-page'
}

export enum AlertTypes {
    success = 'success',
    warning = 'warning',
    error = 'error',
    hideButtons = 'hideButtons',
    default = 'default'
}

export type ModalWrapperContainerProps = {
    title?: string;
    isVisible: boolean;
    autoHeight?: boolean;
    onClose(): void;
    backdropOpacity?: number;
    children?: ReactNode;
    modalChildren?: ReactNode;
};

export type ModalWrapperProps = {
    handleOnScroll(event: {
        nativeEvent: {
            contentOffset: {y: React.SetStateAction<number>};
        };
    }): void;
    scrollOffset: number;
};

export enum authorityTypes {
    'LinkedIn' = 'LinkedIn'
}
