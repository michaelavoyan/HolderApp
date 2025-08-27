import {sign, verify, decode} from 'jwt-lite';
import {exportKey, generateKey} from 'jwk-lite';
import {secs} from './secs';

export const jwtSign = async (payload: any, options: any) => {
    try {
        const {
            audience,
            expiresIn,
            iat = true,
            issuer,
            jti,
            notBefore,
            subject,
            now
        } = options;
        let unix = 0;
        if (expiresIn || notBefore || iat) {
            unix = Math.floor((now || new Date()).getTime() / 1000);
        }
        const key = await generateKey('ES256');
        const privateKey = await exportKey(key.privateKey);
        const publicKey = await exportKey(key.publicKey);

        const flattedData = {
            ...payload,
            sub: subject || payload.sub,
            aud: audience || payload.aud || ' ',
            iss: issuer || payload.iss || ' ',
            jti: jti || payload.jti,
            iat: iat ? unix : payload.iat,
            exp: expiresIn ? unix + secs(expiresIn) : payload.exp,
            nbf: notBefore ? unix + secs(notBefore) : payload.nbf
        };
        return sign(flattedData, privateKey, {
            jwk: publicKey,
            alg: 'ES256',
            typ: 'JWT'
        });
    } catch (error) /* istanbul ignore next */ {
        if (__DEV__) {
            console.error(
                `Error signing the payload ${JSON.stringify({
                    payload,
                    options
                })}`
            );
            console.error(error);
        }
        throw error;
    }
};

export const jwtDecode = (jwt: string) => decode(jwt);

export const jwtVerify = (jwt: string, key: any) => {
    // @ts-ignore
    return verify(jwt, key, {
        algorithms: ['ES256', 'ES256K']
    });
};
