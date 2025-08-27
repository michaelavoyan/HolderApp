import {
    VCLCredentialManifestDescriptorByDeepLink,
    VCLDidJwk,
    VCLOrganizations,
    VCLToken,
    VCLJwt
} from '@velocitycareerlabs/vcl-react-native';
import {get, isEmpty, pick, getOr} from 'lodash/fp';
import {runWithAccessToken, getAccessToken} from 'app/api/api';
import {getReduxStore} from 'app/store/helpers/getStore';
import {getOauthTokens} from 'app/storage/oauth';
import {jwtDecode} from '../jwt/core';
import {ClaimCredential, Vendor} from '../store/types/claim';
import {parseVendorObject} from '../store/helpers/common';
import {getIssuerDid} from './credential';
import {VclReactNativeSdkWrapper} from '../api/vcl-react-native-sdk-wrapper';

export const issuerByDeepLink = async (
    deepLink: string
): Promise<Vendor | null> => {
    const {config} = getReduxStore().getState().appConfig;
    const {didJwk,} = await getOauthTokens();
    const accessToken = await getAccessToken(config);
    const credentialManifestDescriptorByDeepLink: VCLCredentialManifestDescriptorByDeepLink =
        {
            deepLink: {value: deepLink},
            didJwk: didJwk as VCLDidJwk,
            remoteCryptoServicesToken: {value: accessToken} as VCLToken
        };

    const {did, jwt} = await runWithAccessToken(
        config,
        VclReactNativeSdkWrapper.getCredentialManifest,
        credentialManifestDescriptorByDeepLink
    );
    return prepareIssuer(jwt, did);
};

export const issuerByDid = async (
    did: string,
    types?: string[]
): Promise<Vendor | null> => {
    const response: VCLOrganizations =
        await VclReactNativeSdkWrapper.searchForOrganizations({
            filter: {
                did
            }
        });
    const organizations = get('all', response);

    if (isEmpty(organizations)) {
        return null;
    }
    return parseVendorObject(organizations, types)[0];
};

export const prepareIssuer = async (jwt: VCLJwt, did: string): Promise<Vendor | null> => {
    const organization: Vendor|null = await issuerByDid(did);
    const {metadata} = jwtDecode(jwt.encodedJwt).claimsSet;
    return {
        id: did,
        logo: getOr('', 'logo', organization),
        name: getOr('', 'name', organization),
        brandName: getOr('', 'client_name', metadata),
        brandImage: getOr('', 'logo_uri', metadata),
        location: getOr({countryCode:'', }, 'location', organization),
        service: getOr([], 'services', organization),
        credentialTypes: getOr([], 'credentialTypes', organization),
    };

}

export const addIssuerToOffer = async (item: ClaimCredential) => {
    try {
        const did = getIssuerDid(item) || '';

        const issuer = await issuerByDid(did, item.type);
        const brand = {
            brandName: getOr('', 'name', item.issuer),
            brandImage: getOr('', 'image', item.issuer)
        };

        return issuer
            ? {
                  ...item,
                  issuer: {
                      ...item.issuer,
                      ...pick(['id', 'name', 'logo'], issuer),
                      ...brand
                  }
              }
            : item;
    } catch (e) {
        return item;
    }
};
