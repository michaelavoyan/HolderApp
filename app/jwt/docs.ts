export const notBefore = '0s';

export const basicOptions = (doc: any) => ({
    algorithm: 'ES256K',
    iat: true,
    kid: false,
    jti: doc.id
});
