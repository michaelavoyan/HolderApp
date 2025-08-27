import {runWithAccessToken} from 'app/api/api';
import * as authStorage from 'app/storage/oauth';
import * as api from 'app/api/api';
import {
    VCLError,
    VCLXVnfProtocolVersion
} from '@velocitycareerlabs/vcl-react-native';

const config = {
    ios: {
        isWalletAvailable: true
    },
    android: {
        isWalletAvailable: true
    },
    commonUrls: {
        termsAndConditionsLink: 'https://devapp.verifymycreds.com/privacy-policy',
        supportLink: 'https://www.velocitycareerlabs.com/faq'
    },
    oauth: {
        clientId: 'ZK2VKezjWNuRVUEMBXjpcp12T46Q91sb',
        oauthAudience: 'walletapi.velocitycareerlabs.io'
    },
    sdk: {
        cacheSequence: 5,
        isDirectIssuerCheckOn: false,
        isDebugOn: false,
        xVnfProtocolVersion: VCLXVnfProtocolVersion.XVnfProtocolVersion1
    },
    linkedinEndpoints: {
        addToFeed: 'https://www.linkedin.com/feed/update',
        addToProfileUrl: 'https://www.linkedin.com/profile/add',
        apiUrl: 'https://api.linkedin.com/v2',
        authUrl: 'https://www.linkedin.com/oauth/v2'
    },
    baseUrls: {
        presentationExtensionPeriodURL:
            'https://devapi.verifymycreds.com/holder-api/org/get-extension-period',
        libVnfUrl: 'https://devlib.velocitynetwork.foundation',
        verificationServiceActionBaseUrl:
            'https://devapi.verifymycreds.com/holder-api/org/did:ion:EiAehWmpX5mHBuc93SIhPXF8bsEx68G6mPcdIaLNGbozPA',
        verificationApi: 'https://devverifierapi.velocitycareerlabs.io',
        walletApi: 'https://devwalletapi.velocitycareerlabs.io',
        registrarVnfUrl: ''
    },
    minIOSVersion: '1.15.0',
    emailVerifierDid: 'did:ion:EiAehWmpX5mHBuc93SIhPXF8bsEx68G6mPcdIaLNGbozPA',
    phoneVerifierDid: 'did:ion:EiAehWmpX5mHBuc93SIhPXF8bsEx68G6mPcdIaLNGbozPA',
    minAndroidVersion: '1.15.0',
    verificationServiceDeepLink:
        'velocity-network-devnet://inspect?request_uri=https%3A%2F%2Fdevcredverifyagent.velocitycareerlabs.io%2Fapi%2Fholder%2Fv0.6%2Forg%2Fdid%3Aion%3AEiAehWmpX5mHBuc93SIhPXF8bsEx68G6mPcdIaLNGbozPA%2Finspect%2Fget-presentation-request%3Fid%3D63639cbc2ef4ceb24a5adf8e&inspectorDid=did%3Aion%3AEiAehWmpX5mHBuc93SIhPXF8bsEx68G6mPcdIaLNGbozPA',
    yotiNewSessionUrl: 'https://devverifierapi.velocitycareerlabs.io',
    idVerifierDid: 'did:ion:EiAehWmpX5mHBuc93SIhPXF8bsEx68G6mPcdIaLNGbozPA',
    verificationServicePresentationLinkTemplate:
        'https://devapp.verifymycreds.com/presentations/{linkCode}',
    latestAndroidVersion: '1.15.0',
    pushUrl: 'https://devwalletapi.velocitycareerlabs.io/api/v0.6/push',
    latestIOSVersion: '1.15.0',
    yotiIDV: true,
};

const tokensResponse = {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    accountId: 'accountId'
};

jest.spyOn(authStorage, 'getOauthTokens').mockImplementation(() =>
    Promise.resolve(tokensResponse)
);

jest.spyOn(api, 'refreshTokenRequest').mockImplementation(() =>
    Promise.resolve('')
);

jest.mock('axios', () => ({
    post: jest.fn()
}));

jest.mock('../../../jwt/core.ts', () => ({
    __esModule: true,
    jwtDecode: jest.fn().mockReturnValueOnce({claimsSet: {exp: (Date.now()/1000)+60*60}})
    .mockReturnValueOnce({claimsSet: {exp: (Date.now()/1000)+20*60}}),
}));


describe('runWithAccessToken service Test Suite', () => {
    it('refreshTokenRequest should NOT be called when access token is ok', async () => {


        const func = async () => {
            // access token is ok
        };

        await runWithAccessToken(config, func);
        expect(api.refreshTokenRequest).not.toHaveBeenCalled();
    });

    it('refreshTokenRequest should be called when access token is expire soon', async () => {

        const func = async () => {
            // access token is expire soon
        };

        await runWithAccessToken(config, func);
        expect(api.refreshTokenRequest).toHaveBeenCalled();
    });

    it('refreshTokenRequest should be called when access token is not ok', async () => {
        try {
            const func = async () => {
                // access token is not ok
                throw new VCLError({
                    message: JSON.stringify({
                        statusCode: 401,
                        error: 'Unauthorized'
                    })
                });
            };

            await runWithAccessToken(config, func);
        } catch (e) {
            Promise.resolve(e);
        }
        expect(api.refreshTokenRequest).toHaveBeenCalled();
    });
});
