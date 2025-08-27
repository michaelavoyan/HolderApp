export const DidJwk = {
    name: 'DidJwk',
    properties: {
        did: 'string',
        keyId: 'string',
        kid: 'string',
        publicJwk: 'PublicJwk'
    }
};

export const PublicJwk = {
    name: 'PublicJwk',
    properties: {
        valueStr: 'string'
    }
};
