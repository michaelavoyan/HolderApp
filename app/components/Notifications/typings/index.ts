import {VCLCountry} from '@velocitycareerlabs/vcl-react-native';
import {
    ClaimCredential,
    ClaimCredentialWithCheckbox
} from 'app/store/types/claim';
import {CountryCodes} from 'app/store/types/auth';
import {AcceptedDisclosureRequestObject} from '../../../store/types/disclosure';

export type NotificationsProps = {
    offers: ClaimCredentialWithCheckbox[];
    revocations: ClaimCredential[];
    disclosures: AcceptedDisclosureRequestObject[];
    countries?: VCLCountry[];
    regions?: CountryCodes;
    onCredentialDetails(item: ClaimCredential): void;
    activeTab: NotificationsTab;
    onChangeTab(item: NotificationsTab): void;
    toggleCheckbox?(item: ClaimCredentialWithCheckbox): void;
    onFinalize: ((isAccept?: boolean) => void) | false;
};

export type NotificationContainerProps = {
    offers: ClaimCredentialWithCheckbox[];
    activeTab: NotificationsTab;
    setActiveTab(item: NotificationsTab): void;
    selectMode: boolean;
    onToggleCheckbox(item: ClaimCredentialWithCheckbox): void;
};

export type NotificationTabsProps = {
    activeTab: NotificationsTab;
    onChangeTab(item: NotificationsTab): void;
    disabledRevocationTab: boolean;
    disableDisclosuresTab: boolean;
};

export enum NotificationsTab {
    Offers = 'OffersTab',
    Revocations = 'RevocationTab',
    Disclosures = 'DisclosuresTab'
}

export enum FinalizePopup {
    accept = 'accept',
    reject = 'reject'
}
