import {get, getOr, mapValues, omit, split} from 'lodash/fp';

import {
    VCLDidJwk,
    VCLError,
    VCLPresentationRequestDescriptor,
    VCLCredentialManifest
} from '@velocitycareerlabs/vcl-react-native';
import {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {localConfigs} from 'app/configs';
import {runWithAccessToken} from 'app/api/api';
import {getReduxStore} from 'app/store/helpers/getStore';
import {getOauthTokens} from 'app/storage/oauth';
import {throwVCLError} from './error-handler/utils';
import {StatusMessages} from '../screens/popups/type';
import {DeepLinkOptions} from './types';
import {issuerByDeepLink, prepareIssuer} from './issuer';
import {openDeepLinkPopup, openNoInternetPopupIfOffline} from './popups';
import {navigate, NavigateOptions} from '../navigation/utils';
import {parsePresentationRequest} from '../jwt/vc';
import {Vendor} from '../store/types/claim';
import i18n from '../i18n';
import {errorHandlerPopup} from './error-handler/errorHandlerPopup';
import {useCasesErrorsMapItems} from './error-handler/errorsMap';
import {isVerificationError} from './helpers';
import {vclLogger} from './logger';
import {generateOffers, setProgress} from '../store/actions';
import {progressSelector} from '../store/selectors';
import {VclReactNativeSdkWrapper} from '../api/vcl-react-native-sdk-wrapper';

const ISSUING_SUCCESS = {
    subTitle: i18n.t('The issuer was validated successfully'),
    icon: `status-${StatusMessages.Success}`
};

export const VELOCITY_URL_REGEX = new RegExp(
    localConfigs.velocityProtocol,
    'g'
);

export const linkHandler = (url: string) => {
    const isCorrectProtocol = url.includes(localConfigs.velocityProtocol);
    const route = split('?', url.replace(VELOCITY_URL_REGEX, ''));
    const path = route[0];
    const queryParams = route[1];
    return {
        path,
        queryParams,
        isCorrectProtocol
    };
};

export const parseLinkQueryParams = (url: string) => {
    const parameters: {
        [key: string]: string;
    } = {};
    url.replace(/([^=&]+)=([^&]*)/gi, (m, key, value): string => {
        parameters[key] = value;
        return '';
    });
    return parameters;
};

const parseUrl = (url: string) => get(0, url.match(/^https?:\/\/[^/]+/));

const parseParamsInspect = (params: string) => {
    const inspectParams = mapValues(
        decodeURIComponent,
        parseLinkQueryParams(params)
    );
    const {queryParams} = linkHandler(inspectParams.request_uri);
    const searchParams = parseLinkQueryParams(queryParams);

    const agentUrl = parseUrl(inspectParams.request_uri);
    const inspectorId = inspectParams.inspectorDid;
    const disclosureId = get('id', searchParams);

    if (!(agentUrl && inspectorId && disclosureId)) {
        return throwVCLError({errorCode: 'wrong_deeplink_protocol'});
    }

    return {
        ...omit(['inspectorDid, request_uri'], inspectParams),
        agentUrl,
        inspectorId,
        disclosureId
    };
};

const issuingNavigation = async (deepLink: string) => {
    try {
        const issuer = await issuerByDeepLink(deepLink);
        if (issuer) {
            openDeepLinkPopup({
                params: {
                    ...ISSUING_SUCCESS,
                    onOpen: () => {
                        navigate({
                            name: 'DisclosureCredentialsToIssuer',
                            params: {
                                disclosureId: issuer.id,
                                service: issuer.service,
                                types: issuer.credentialTypes,
                                issuer,
                                deepLink
                            },
                            option: NavigateOptions.Replace
                        });
                    }
                }
            });
            return;
        }

        throwVCLError({errorCode: 'tenant_not_found'});
    } catch (error) {
        errorHandlerPopup(
            error,
            null,
            true,
            undefined,
            useCasesErrorsMapItems.linkIssuingInspection
        );
    }
};

const getOrganizationName = async (
    deepLink: string
): Promise<{
    organizationName: string;
    organizationBrandName: string;
}> => {
    let organizationName = '';
    let organizationBrandName = '';
    try {
        const {didJwk} = await getOauthTokens();

        const presentationRequestDescriptor: VCLPresentationRequestDescriptor =
            {
                deepLink: {value: deepLink},
                didJwk: didJwk as VCLDidJwk
                // pushDelegate: {} TODO: provide some push delegate - not nessesary?
            };

        const {jwt, verifiedProfile} = await runWithAccessToken(
            getReduxStore().getState().appConfig.config,
            VclReactNativeSdkWrapper.getPresentationRequest,
            presentationRequestDescriptor
        );

        if (jwt && verifiedProfile) {
            const parsed = parsePresentationRequest(
                jwt.encodedJwt,
                verifiedProfile
            );
            organizationName = getOr('', 'organization.name', parsed);
            organizationBrandName = getOr('', 'organization.brandName', parsed);
        }
        // TODO: will not show on a disclosure bottom popup an organisation name
        // should be discussed with Nimrod https://velocitycareerlabs.atlassian.net/browse/VL-4087?focusedCommentId=31099
        return {organizationName, organizationBrandName};
    } catch (e) {
        if (e instanceof VCLError && isVerificationError(e)) {
            const {profileName} = JSON.parse(e.message);
            throwVCLError({
                errorCode: 'sdk_verified_profile_wrong_service_type',
                context: {organizationName: profileName}
            });
        }
        return {organizationName, organizationBrandName};
    }
};

const inspectionPopup = async (
    deepLink: string
): Promise<{
    title: string;
    subTitle: string;
    icon?: string;
    caption?: string;
} | null> => {
    const {organizationName, organizationBrandName} =
        await getOrganizationName(deepLink);

    if (!organizationName) {
        return null;
    }
    return {
        title: i18n.t('Disclosure request from'),
        subTitle: organizationBrandName || organizationName,
        ...(organizationBrandName !== organizationName && {
            caption: i18n.t('A commercial name of {{organizationName}}', {
                organizationName
            })
        })
    };
};

const issuingPopup = async (
    deepLink: string
): Promise<{subTitle: string; icon: string; issuer: Vendor} | null> => {
    try {
        const issuer = await issuerByDeepLink(deepLink);
        if (issuer) {
            return {
                ...ISSUING_SUCCESS,
                issuer
            };
        }
        return null;
    } catch (e) {
        const isOfflinePopupVisible = await openNoInternetPopupIfOffline();

        if (isOfflinePopupVisible) {
            return null;
        }
        if (e instanceof VCLError && isVerificationError(e)) {
            const {profileName} = JSON.parse(e.message);
            throwVCLError({
                errorCode: 'sdk_verified_profile_wrong_service_type',
                context: {organizationName: profileName}
            });
        }
        throw e;
    }
};

export const deepLinksOptions: {
    [key: string]: {
        parseParams: (params: string) => {[key: string]: string};
        navigation?(deepLink: string): void;
        popup(
            deepLink: string,
            deepLinkSource: 'QRcode' | 'link'
        ): Promise<{
            title?: string;
            subTitle: string;
            icon?: string;
            issuer?: Vendor;
        } | null>;
    };
} = {
    [DeepLinkOptions.inspect]: {
        parseParams: parseParamsInspect,
        popup: inspectionPopup
    },
    [DeepLinkOptions.issue]: {
        parseParams: parseLinkQueryParams,
        navigation: issuingNavigation,
        popup: issuingPopup
    }
};

export const TEMP_USER_NAME = 'Your Name';

export const TEMP_USER_IMAGE =
    'data:image/png;base64,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';

export const generateTemporaryUserToCompleteIssuing = () => ({
    id: `temp_issuing_user_${new Date().getTime()}`,
    name: TEMP_USER_NAME,
    isRetained: true,
    image: TEMP_USER_IMAGE
});

export const useGenerateOffersByDeepLink = () => {
    const dispatch = useDispatch();
    const searchOffersProgress = useSelector(progressSelector);
    const [withTC, setWithTC] = useState(false);

    const issuerIdRef = useRef<string>('');
    const isSearchStarted = useRef(false);

    useEffect(() => {
        if (isSearchStarted.current && searchOffersProgress === 1) {
            dispatch(setProgress(0));

            navigate({
                name: 'AcceptOffers',
                params: {
                    issuerId: issuerIdRef.current,
                    withTC
                }
            });
            setWithTC(false);
            isSearchStarted.current = false;
        }
    }, [dispatch, searchOffersProgress, withTC]);

    const generateOffersByDeepLinkWithRedirect = useCallback(
        async (url: string, credentialManifest: VCLCredentialManifest) => {
            setWithTC(true);
            const issuer = await prepareIssuer(credentialManifest.jwt, credentialManifest.did)

            if (!issuer?.service) {
                vclLogger.error('generateOffersByDeepLink: issuer not found');

                return;
            }

            issuerIdRef.current = issuer.id;

            isSearchStarted.current = true;

            dispatch(
                generateOffers({
                    service: issuer?.service,
                    selectedCredentials: [],
                    deepLink: url,
                    did: issuerIdRef.current
                })
            );
        },
        [dispatch]
    );

    return {
        generateOffersByDeepLinkWithRedirect
    };
};
