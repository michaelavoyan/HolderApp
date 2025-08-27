import {createSelfSignedCredential} from 'app/jwt/vc';

export const signSelfReportedCredential = (credential: object, type: string) =>
    createSelfSignedCredential(credential, type);
