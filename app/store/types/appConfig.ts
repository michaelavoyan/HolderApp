import {VCLXVnfProtocolVersion} from '@velocitycareerlabs/vcl-react-native';

export type AppConfigState = {
    config: IConfig;
    isLoaded: boolean;
    isDebugOn: boolean;
};

export interface IConfig {
    ios: {
        isWalletAvailable: boolean;
    };
    android: {
        isWalletAvailable: boolean;
    };
    yotiIDV: boolean;
    minIOSVersion: string;
    minAndroidVersion: string;
    latestIOSVersion: string;
    latestAndroidVersion: string;
    idVerifierDid: string;
    emailVerifierDid: string;
    phoneVerifierDid: string;
    yotiNewSessionUrl: string;
    pushUrl?: string;
    baseUrls?: {
        walletApi: string;
        verificationApi: string;
        verificationServiceActionBaseUrl: string;
        presentationExtensionPeriodURL: string;
        libVnfUrl: string;
        registrarVnfUrl: string;
    };
    oauth?: {
        oauthAudience: string;
        clientId: string;
    };
    verificationServiceDeepLink: string;
    verificationServicePresentationLinkTemplate: string;
    sdk?: {
        cacheSequence: number;
        isDirectIssuerCheckOn: boolean;
        isDebugOn: boolean;
        xVnfProtocolVersion: VCLXVnfProtocolVersion;
    };
    commonUrls?: {
        supportLink: string;
        termsAndConditionsLink: string;
    };
    linkedinEndpoints?: {
        authUrl: string;
        apiUrl: string;
        addToProfileUrl: string;
        addToFeed: string;
    };

    reclaim?: {
        enabled: boolean;
        appId: string;
        secret: string;
    };
}
