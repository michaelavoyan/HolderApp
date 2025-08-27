import {VCLCountry, VCLDidJwk} from '@velocitycareerlabs/vcl-react-native';

export type User = {
    id: string;
    name: string;
    image?: string;
    isRetained?: boolean;
    accountId?: string;
};

export type FullUser = User;

export type Users = User[];

export type CountryCodes = {[key: string]: string};

export type AuthState = {
    users: Users;
    user: FullUser;
    userId: string | null;
    countries: VCLCountry[];
    regions: CountryCodes;
    needToCheckBiometry: boolean;
    isBiometryGetStartedError: boolean;
    disableSelectPersona: boolean;
    savedInitialDeeplink: string;
    isShownSplashScreen: boolean;
    isBiometryDisabled: boolean;
    termsAndConditionsAgreedVersion?: number;
    termsAndConditionsLatestVersion?: number;
    didJwk: VCLDidJwk | null;
};

type CommonAction = {type: string};

export type LogoutAction = {
    type: string;
    user?: User;
};

export type AddUserAction = {
    user: FullUser;
    withSelectPersona?: boolean;
    getStartedFlow?: boolean;
    closePopupAfterBiometry?: boolean;
};

export type AddUserSaga = CommonAction & AddUserAction;

export type UserToUpdate = Partial<FullUser> & {id: string};

export type UpdateUserAction = {
    user: UserToUpdate;
    verifyIdDocument?: boolean;
} & Omit<AddUserAction, 'user'>;

export type UpdateUserSaga = CommonAction & UpdateUserAction;

export type SetUserIdAction = {
    type: string;
    id: string;
    withoutCheckingBiometry: boolean;
    authResp?: boolean;
};

export type GenerateTempIssuingUserAction = {
    onUserCreated: () => void;
};

export type GenerateTempIssuingUserSaga = CommonAction &
    GenerateTempIssuingUserAction;

export type AddTermsAndConditionsConsentAction = {
    type: string;
    version: number;
    accountId: string;
};

export interface Consent {
    id: string;
    version: number;
    userId: string;
    createdAt: string;
}
