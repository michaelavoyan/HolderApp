import 'react-native-elements';
import {AlertTypes} from 'app/components/common/typings/types';
import {CredentialStatus} from 'app/store/types/claim';

declare module 'react-native-elements' {
    export interface Colors {
        primaryBg: string;
        primaryBgIOS: string;
        primaryBgAndroid: string;
        secondaryBg: string;
        secondaryText: string;
        additionalText: string;
        grayText: string;
        grayLightText: string;
        active: string;
        shadowColor: string;
        separatingLine: string;
        separatingLineAndroid: string;
        searchContainer: string;
        searchText: string;
        inputBorder: string;
        inputBorderDark: string;
        profileImageActionBg: string;
        profileImageActionText: string;
        link: string;
        iconBg: string;
        dark: string;
        status: {
            [CredentialStatus.verified]: string;
            [CredentialStatus.offered]: string;
            [CredentialStatus.self]: string;
            [CredentialStatus.revoked]: string;
            [CredentialStatus.deleted]: string;
            [CredentialStatus.replaced]: string;
            [CredentialStatus.expired]: string;
        };
        androidStatus: {
            [CredentialStatus.verified]: string;
            [CredentialStatus.offered]: string;
            [CredentialStatus.self]: string;
            [CredentialStatus.revoked]: string;
            [CredentialStatus.deleted]: string;
            [CredentialStatus.replaced]: string;
            [CredentialStatus.expired]: string;
        };
        newDisclosureIndication: string;
        reject: string;
        rejectDisabled: string;
        primaryText: string;
        progressUnfilled: string;
        primaryAndroid: string;
        lightPrimaryAndroid: string;
        disabledAndroid: string;
        searchIcon: string;
        tooltipBg: string;
        newItemBg: string;
        confirmCodeBg: string;
        imageBg: string;
        label: string;
        infoBg: string;
        lightActive: string;
        disabledText: string;
        disabledTab: string;
        additionalBg: string;
        lightPrimaryText: string;
        alertType: {
            [AlertTypes.success]: string;
            [AlertTypes.warning]: string;
            [AlertTypes.error]: string;
            default: string;
        };
        highlighted: string;
        replacing: string;
        titleBg: string;
        popup: {
            background: string;
            buttonBorder: string;
        };
        pickerBackground: string;
        pickerButton: string;
        popupBackground: string;
        forceUpgradePopupBackground: string;
        grayLight: string;
        androidLightBackground: string;
        toastBackground: string;
        toastBackgroundAndroid: string;
        toastText: string;
        darkBackdrop: string;
        transparent: string;
        closeButton: string;
    }

    export interface FullTheme {
        colors: Colors;
    }
}
