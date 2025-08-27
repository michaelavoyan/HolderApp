import {CredentialSchema} from 'app/store/types/claim';

export type BasicType = {
    algorithm: string;
    iat: number;
    kid: boolean;
    jti: string;
};

export type NBF =
    | {
          now: Date;
          notBefore: string;
      }
    | {};

export type Verifiable = {
    expirationDate?: string;
    credentialSubject: object;
    verifier?: string;
    issued: string;
};

export type EXP = {
    expiresIn: string;
};

export type Issuer = {
    vendorOrganizationId?: string;
    id?: string;
    issuerId?: string;
};

export type Credential = {
    expirationDate: string;
    credentialSchema: CredentialSchema;
    credentialSubject: object;
    verifier: string;
    issued: string;
    issuer: Partial<Issuer>;
    [key: string]: any;
};

export type Presentation = {
    holder: string;
    issued: string;
    id: string;
    type: string;
    verifier: string;
    expirationDate: string;
    [key: string]: any;
};
