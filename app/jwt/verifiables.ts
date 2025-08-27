import {omit, flow, defaultTo, get, getOr} from 'lodash/fp';
import {jwtSign, jwtDecode, jwtVerify} from './core';
import {basicOptions, notBefore} from './docs';
import {BasicType, Credential, Issuer, Presentation} from './types';

const getIssuerId = (issuer: Issuer): Issuer =>
    flow(
        defaultTo(issuer.vendorOrganizationId),
        defaultTo(issuer)
    )(typeof issuer === 'string' ? issuer : issuer.id);

const generateExpiresIn = (credential: {
    issued: string;
    expirationDate: string;
}) => {
    const startDate = Date.parse(credential.issued);
    const endDate = Date.parse(credential.expirationDate);
    const diff = (endDate - startDate) / 1000;

    return `${diff}s`;
};

const nbf = (verifiable: {issued: string}) =>
    verifiable.issued
        ? {
              now: new Date(verifiable.issued),
              notBefore
          }
        : {};

const exp = (verifiable: {issued: string; expirationDate: string}) =>
    verifiable.expirationDate ? {expiresIn: generateExpiresIn(verifiable)} : {};

const issCredential = (credential: Credential) => {
    const issuerId = getIssuerId(credential.issuer);
    return issuerId ? {issuer: issuerId} : {issuer: ''};
};

const sub = (verifiable: Credential) =>
    get('credentialSubject.id', verifiable)
        ? {subject: get('credentialSubject.id', verifiable)}
        : {};

const issPresentation = (presentation: Presentation) =>
    presentation.holder ? {issuer: presentation.holder} : {};

const aud = (verifiable: {verifier: any}) =>
    verifiable.verifier ? {audience: verifiable.verifier} : {};

const timestampToIsoDateString = (timestamp: number) =>
    new Date(timestamp * 1000).toISOString();

const credentialSubject = (payload: any) => ({
    credentialSubject: {
        ...payload.vc.credentialSubject,
        ...(payload.sub ? {id: payload.sub} : {})
    }
});

const issued = (payload: BasicType & {nbf: number}) =>
    payload.iat || payload.nbf
        ? {issued: timestampToIsoDateString(payload.iat || payload.nbf)}
        : {};

const expirationDate = (payload: {exp: number}) =>
    payload.exp ? {expirationDate: timestampToIsoDateString(payload.exp)} : {};

export const decodePresentationJwt = (presentationJwt: string) => {
    const {header} = jwtDecode(presentationJwt);
    const payload = jwtVerify(presentationJwt, header.jwk);

    return {
        header,
        payload: {
            ...payload.vp,
            id: payload.jti,
            holder: payload.iss,
            verifier: payload.aud,
            ...issued(payload),
            ...expirationDate(payload)
        }
    };
};

// Using presentation structure as defined at: https://w3c.github.io/vc-imp-guide/
// Using JWT structure as defined at: https://www.w3.org/TR/vc-data-model/#json-web-token
export const generatePresentationJwt = (presentation: any) => {
    const payload = {
        vp: {
            ...omit(
                ['holder', 'verifier', 'issued', 'expirationDate'],
                presentation
            )
        }
    };
    const options = {
        ...basicOptions(presentation),
        ...nbf(presentation),
        ...exp(presentation),
        ...issPresentation(presentation),
        ...aud(presentation)
    };

    return jwtSign(payload, options);
};

// Using credential structure as defined at: https://w3c.github.io/vc-imp-guide/
// Using JWT structure as defined at: https://www.w3.org/TR/vc-data-model/#json-web-token
export const generateCredentialJwt = (credential: any) => {
    const payload = {
        vc: {
            ...omit(
                ['credentialSubject', 'issuer', 'issued', 'expirationDate'],
                credential
            ),
            credentialSubject: {
                ...omit('id', credential.credentialSubject)
            }
        }
    };

    const options = {
        ...basicOptions(credential),
        ...nbf(credential),
        ...exp(credential),
        ...issCredential(credential),
        ...sub(credential)
    };

    return jwtSign(payload, options);
};

export const decodeCredentialJwt = (credentialJwt: string) => {
    const {header, claimsSet} = jwtDecode(credentialJwt);
    return {
        header,
        payload: {
            ...claimsSet.vc,
            id: claimsSet.jti,
            issuer: {
                id: claimsSet.iss,
                name: getOr('', 'vc.issuer.name', claimsSet),
                image: getOr('', 'vc.issuer.image', claimsSet)
            },
            ...credentialSubject(claimsSet),
            ...issued(claimsSet),
            ...expirationDate(claimsSet)
        }
    };
};
