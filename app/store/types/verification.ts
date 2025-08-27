import {
    VCLCredentialManifest,
    VCLService
} from '@velocitycareerlabs/vcl-react-native';
import {
    AddIdentityInfoStepE,
    AddIdentityInfoTypeE
} from '../../components/Profile/typings/types';

export type VerificationState = {
    identityStep: AddIdentityInfoStepE;
};

type CommonAction = {type: string};

export type VerifyEmailPhone = {
    field: AddIdentityInfoTypeE;
    value: string;
    service: VCLService;
    token: string;
};

export type ClaimEmailPhone = {
    credentialManifest: VCLCredentialManifest;
} & VerifyEmailPhone;

export type StartVerificationAction = {
    field: AddIdentityInfoTypeE;
    value: string;
};

export type StartVerificationSaga = StartVerificationAction & CommonAction;

export type CompleteVerificationAction = {
    field: AddIdentityInfoTypeE;
    verificationCode: string;
    value: string;
};

export type CompleteVerificationSaga = CompleteVerificationAction &
    CommonAction;
