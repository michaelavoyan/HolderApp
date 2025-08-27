import {get} from 'lodash/fp';
import {createSelector} from 'reselect';
import {VCLXVnfProtocolVersion} from '@velocitycareerlabs/vcl-react-native';
import {Dictionary} from 'app/utilities/types';
import {Selectors} from './types';
import {IConfig} from '../types/appConfig';

export const isAppConfigLoadedSelector = createSelector<
    Selectors<boolean>,
    boolean
>(get('appConfig.isLoaded'), (val: boolean) => val);

export const configSelector = createSelector<Selectors<IConfig>, IConfig>(
    get('appConfig.config'),
    (val: IConfig) => val
);
export const yotiConfigSelector = createSelector<Selectors<boolean>, boolean>(
    get('appConfig.config.yotiIDV'),
    (val: boolean) => val
);

export const sdkCacheSequenceSelector = createSelector<
    Selectors<number>,
    number
>(get('appConfig.config.sdk.cacheSequence'), (val: number) => val);

export const isDirectIssuerCheckOnSelector = createSelector<
    Selectors<boolean>,
    boolean
>(get('appConfig.config.sdk.isDirectIssuerCheckOn'), (val: boolean) => val);

export const xVnfProtocolVersionSelector = createSelector<
    Selectors<VCLXVnfProtocolVersion>,
    VCLXVnfProtocolVersion
>(
    get('appConfig.config.sdk.xVnfProtocolVersion'),
    (val: VCLXVnfProtocolVersion) => val
);

export const minIOSVersionConfigSelector = createSelector<
    Selectors<string>,
    string
>(get('appConfig.config.minIOSVersion'), (val: string) => val);

export const minAndroidVersionConfigSelector = createSelector<
    Selectors<string>,
    string
>(get('appConfig.config.minAndroidVersion'), (val: string) => val);

export const latestIOSVersionConfigSelector = createSelector<
    Selectors<string>,
    string
>(get('appConfig.config.latestIOSVersion'), (val: string) => val);

export const latestAndroidVersionConfigSelector = createSelector<
    Selectors<string>,
    string
>(get('appConfig.config.latestAndroidVersion'), (val: string) => val);

export const pushUrlSelector = createSelector<Selectors<string>, string>(
    get('appConfig.config.pushUrl'),
    (val: string) => val
);

export const idVerifierDidSelector = createSelector<Selectors<string>, string>(
    get('appConfig.config.idVerifierDid'),
    (val: string) => val
);

export const emailVerifierDidSelector = createSelector<
    Selectors<string>,
    string
>(get('appConfig.config.emailVerifierDid'), (val: string) => val);

export const phoneVerifierDidSelector = createSelector<
    Selectors<string>,
    string
>(get('appConfig.config.phoneVerifierDid'), (val: string) => val);

export const yotiNewSessionUrlSelector = createSelector<
    Selectors<string>,
    string
>(get('appConfig.config.yotiNewSessionUrl'), (val: string) => val);

export const supportLinkSelector = createSelector<Selectors<string>, string>(
    get('appConfig.config.commonUrls.supportLink'),
    (val: string) => val
);

export const termsAndConditionsLinkSelector = createSelector<
    Selectors<string>,
    string
>(
    get('appConfig.config.commonUrls.termsAndConditionsLink'),
    (val: string) => val
);

export const verificationServiceDeepLinkSelector = createSelector<
    Selectors<string>,
    string
>(get('appConfig.config.verificationServiceDeepLink'), (val: string) => val);

export const verificationServicePresentationLinkTemplateSelector =
    createSelector<Selectors<string>, string>(
        get('appConfig.config.verificationServicePresentationLinkTemplate'),
        (val: string) => val
    );

export const configIsDebugOnSelector = createSelector<
    Selectors<boolean>,
    boolean
>(get('appConfig.config.sdk.isDebugOn'), (val: boolean) => val);

export const isDebugOnSelector = createSelector<Selectors<boolean>, boolean>(
    get('appConfig.isDebugOn'),
    (val: boolean) => val
);

export const reclaimSelector =
    createSelector<Selectors<Dictionary<any>>, Dictionary<any>>(
        get('appConfig.reclaim'),
        (val: Dictionary<any>) => val
    );
