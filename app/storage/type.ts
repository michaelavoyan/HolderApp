import {
    VCLCredentialManifest,
    VCLToken
} from '@velocitycareerlabs/vcl-react-native';
import {AlertTextProps} from '../components/common/typings/types';

export type RegenerateOffersData = {
    credentialManifest: VCLCredentialManifest;
    verificationIdentifier: string;
    vclToken: VCLToken;
};

export type UserAction = {result: true} | {error: AlertTextProps};
