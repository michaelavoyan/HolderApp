import {VCLXVnfProtocolVersion} from '@velocitycareerlabs/vcl-react-native';
import {IConfig} from '../store/types/appConfig';

const appconfig: IConfig = {
    ios: {
        isWalletAvailable: true
    },
    android: {
        isWalletAvailable: true
    },
    yotiIDV: true,
    latestAndroidVersion: '1.1.1',
    latestIOSVersion: '1.1.1',
    minAndroidVersion: '1.1.1',
    minIOSVersion: '1.1.1',
    pushUrl: 'https://devwalletapi.velocitycareerlabs.io/api/v0.6/push',
    verificationServiceDeepLink:
        'velocity-network-devnet://inspect?request_uri=https%3A%2F%2Fdevcredverifyagent.velocitycareerlabs.io%2Fapi%2Fholder%2Fv0.6%2Forg%2Fdid%3Aion%3AEiAehWmpX5mHBuc93SIhPXF8bsEx68G6mPcdIaLNGbozPA%2Finspect%2Fget-presentation-request%3Fid%3D63639cbc2ef4ceb24a5adf8e&inspectorDid=did%3Aion%3AEiAehWmpX5mHBuc93SIhPXF8bsEx68G6mPcdIaLNGbozPA',
    verificationServicePresentationLinkTemplate:
        'https://devapp.verifymycreds.com/presentations/{linkCode}',
    emailVerifierDid: 'did:ion:EiAehWmpX5mHBuc93SIhPXF8bsEx68G6mPcdIaLNGbozPA',
    idVerifierDid: 'did:ion:EiAehWmpX5mHBuc93SIhPXF8bsEx68G6mPcdIaLNGbozPA',
    phoneVerifierDid: 'did:ion:EiAehWmpX5mHBuc93SIhPXF8bsEx68G6mPcdIaLNGbozPA',
    yotiNewSessionUrl: 'https://devverifierapi.velocitycareerlabs.io',
    baseUrls: {
        walletApi: 'https://devwalletapi.velocitycareerlabs.io',
        verificationApi: 'https://devverifierapi.velocitycareerlabs.io',
        verificationServiceActionBaseUrl:
            'https://devapi.verifymycreds.com/holder-api/org/did:ion:EiAehWmpX5mHBuc93SIhPXF8bsEx68G6mPcdIaLNGbozPA',
        presentationExtensionPeriodURL:
            'https://devapi.verifymycreds.com/holder-api/org/get-extension-period',
        libVnfUrl: 'https://devlib.velocitynetwork.foundation',
        registrarVnfUrl: 'https://devregistrar.velocitynetwork.foundation'
    },
    commonUrls: {
        supportLink: 'https://www.velocitycareerlabs.com/faq',
        termsAndConditionsLink: 'https://devapp.verifymycreds.com/privacy-policy'
    },
    sdk: {
        cacheSequence: 5,
        isDirectIssuerCheckOn: false,
        isDebugOn: false,
        xVnfProtocolVersion: VCLXVnfProtocolVersion.XVnfProtocolVersion1
    },
    oauth: {
        oauthAudience: 'walletapi.velocitycareerlabs.io',
        clientId: 'ZK2VKezjWNuRVUEMBXjpcp12T46Q91sb'
    },
    linkedinEndpoints: {
        authUrl: 'https://www.linkedin.com/oauth/v2',
        apiUrl: 'https://api.linkedin.com/v2',
        addToProfileUrl: 'https://www.linkedin.com/profile/add',
        addToFeed: 'https://www.linkedin.com/feed/update'
    },
};

export default appconfig;
