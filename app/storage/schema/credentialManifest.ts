export const CredentialManifest = {
    name: 'CredentialManifest',
    properties: {
        iss: 'string?',
        did: 'string?',
        exchangeId: 'string?',
        vendorOriginContext: 'string?',
        verifiedProfile: 'VerifiedProfile?',
        jwt: 'JWT?',
        remoteCryptoServicesToken: 'VCLToken?',
        didJwk: 'DidJwk?',
    }
};
