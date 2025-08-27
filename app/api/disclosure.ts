import {
    VCLCredentialManifestDescriptorByDeepLink,
    VCLCredentialManifest,
    VCLDidJwk,
    VCLError,
    VCLPresentationRequest,
    VCLPresentationRequestDescriptor,
    VCLPushDelegate,
    VCLVerifiableCredential,
    VCLToken
} from '@velocitycareerlabs/vcl-react-native';

import {v4 as uuidv4} from 'uuid';
import {get, reduce, map, getOr, find} from 'lodash/fp';
import {vclLogger} from 'app/utilities/logger';
import {getSignedCredentials} from 'app/storage/credential';
import {declineDisclosure} from 'app/api/disclosure.service';
import {getDisclosureById, setDisclosure} from 'app/storage/disclosure';

import {ClaimCredentialWithCheckbox} from 'app/components/DisclosureRequest/types';
import {findCredentialType, isVerificationError} from 'app/utilities/helpers';

import {store} from 'app/store/store';
import {getOauthTokens} from 'app/storage/oauth';
import {throwVCLError} from '../utilities/error-handler/utils';

import {
    AcceptDisclosure,
    DeclineDisclosure,
    PresentationResponse
} from './types';
import {AlertTextProps} from '../components/common/typings/types';
import {parsePresentationRequest} from '../jwt/vc';
import {
    AcceptedDisclosureRequestObject,
    DisclosureSubtype
} from '../store/types/disclosure';
import i18n from '../i18n';
import {jwtDecode} from '../jwt/core';
import {linkHandler} from '../utilities/qr';
import {DeepLinkOptions} from '../utilities/types';
import {runWithAccessToken, getAccessToken} from './api';
import {HolderAppError} from '../utilities/error-handler/HolderAppError';
import {VclReactNativeSdkWrapper} from './vcl-react-native-sdk-wrapper';

export const ERRORS: {[key: string]: AlertTextProps} = {
    getDisclosure: {
        title: i18n.t('The credentials could not be disclosed.'),
        subTitle: i18n.t('Please try again later.'),
        message: 'disclosure.get'
    },
    accept: {
        title: i18n.t('The credentials could not be disclosed.'),
        subTitle: i18n.t('Please try again later.'),
        message: 'disclosure.accept'
    },
    decline: {
        title: i18n.t('The credentials could not be disclosed.'),
        subTitle: i18n.t('Please try again later.'),
        message: 'disclosure.decline'
    },
    auth: {
        title: i18n.t('The credentials could not be disclosed.'),
        subTitle: i18n.t('Please try again later.'),
        message: 'disclosure.authorization'
    },
    sameDisclosure: {
        title: i18n.t(
            'You have already disclosed these credentials with this organization.'
        ),
        subTitle: i18n.t('You may select other credentials.'),
        message: 'disclosure.already'
    },
    emptyDisclosureTypes: {
        title: i18n.t('The credentials could not be disclosed.'),
        subTitle: i18n.t('Please try again later.'),
        message: 'disclosure.types'
    },
    validateAgent: {
        title: i18n.t('The credentials could not be disclosed.'),
        subTitle: i18n.t('Please try again later.'),
        message: 'qr.security_check'
    },
    linkedinShare: {
        title: i18n.t('The credentials could not be disclosed.'),
        subTitle: i18n.t('Please try again later.'),
        message: 'disclosure.linkedin_share'
    }
};

export const getDisclosurePresentationRequest = async (
    deepLink: string,
    pushDelegate?: VCLPushDelegate
): Promise<PresentationResponse> => {
    try {
        const {didJwk} = await getOauthTokens();
        const accessToken = await getAccessToken(
            store.getState().appConfig.config
        );
        const presentationRequestDescriptor: VCLPresentationRequestDescriptor =
            {
                deepLink: {value: deepLink},
                pushDelegate,
                didJwk: didJwk as VCLDidJwk,
                remoteCryptoServicesToken: {value: accessToken} as VCLToken
            };

        const presentationRequest: VCLPresentationRequest =
            await runWithAccessToken(
                store.getState().appConfig.config,
                VclReactNativeSdkWrapper.getPresentationRequest,
                presentationRequestDescriptor
            );

        const {jwt, verifiedProfile} = presentationRequest;

        if (jwt && verifiedProfile) {
            const parsed = parsePresentationRequest(
                jwt.encodedJwt,
                verifiedProfile
            );
            const types = getOr([], 'types', parsed);

            if (!types.length) {
                return throwVCLError({errorCode: 'invalid_presentation'});
            }

            return {
                disclosure: parsed,
                exchangeId: get('exchangeId', parsed),
                presentationRequest
            };
        }

        return throwVCLError({errorCode: 'invalid_presentation'});
    } catch (error) {
        if (error instanceof VCLError && isVerificationError(error)) {
            const {profileName} = JSON.parse(error.message);
            throwVCLError({
                errorCode: 'sdk_verified_profile_wrong_service_type',
                context: {organizationName: profileName}
            });
        }
        throw error;
    }
};

const getVerifiableCredentialsByIds = async (
    credentials: ClaimCredentialWithCheckbox[]
) => {
    // TODO spit this function into smaller functions
    const signedCredentials = await getSignedCredentials();

    const verifiableCredentials = reduce(
        (acc: VCLVerifiableCredential[], curr) => {
            const jwtVc = get('jwt', curr);
            const inputDescriptor = findCredentialType(curr.type) ?? '';
            if (jwtVc) {
                return [
                    ...acc,
                    {
                        inputDescriptor,
                        jwtVc
                    }
                ];
            }
            const signedCredential =
                signedCredentials && find(['id', curr.id], signedCredentials);
            return signedCredential
                ? [...acc, {jwtVc: signedCredential.jwt, inputDescriptor}]
                : acc;
        },
        [],
        credentials || []
    );

    if (!verifiableCredentials.length) {
        vclLogger.error(
            `getVerifiableCredentialsByIds() method's input: ${credentials
                .map((i) => i.id)
                .join(', ')}, but the output is []`
        );
    }

    return verifiableCredentials;
};

export const onAcceptDisclosure = async (
    action: AcceptDisclosure
): Promise<{result: true; disclosure: AcceptedDisclosureRequestObject}> => {
    try {
        const {credentials, disclosure, presentationRequest, subType} = action;
        const id = uuidv4();
        const savedDisclosure = await getDisclosureById(id);
        if (savedDisclosure) {
            throw new HolderAppError({
                errorCode: 'share_same_disclosure_error'
            });
        }

        const verifiableCredentials = await getVerifiableCredentialsByIds(
            credentials
        );

        if (
            !verifiableCredentials.length &&
            subType === DisclosureSubtype.linkedin
        ) {
            throw new HolderAppError({
                errorCode: 'linkedin_submit_presentation_error'
            });
        }

        let authToken = null;
        if (presentationRequest.feed) {
            authToken = await VclReactNativeSdkWrapper.getAuthToken({presentationRequest})
        }

        const response = await runWithAccessToken(
            store.getState().appConfig.config,
            VclReactNativeSdkWrapper.submitPresentation,
            {
                presentationRequest,
                verifiableCredentials
            },
            authToken
        );

        const currentDate = new Date();

        if (get('exchange', response)) {
            const presentationId = response.jti;
            const acceptedDisclosure = {
                ...disclosure,
                id,
                creationDate: currentDate.toString(),
                credentialIds: map('id', credentials),
                credentials,
                presentationId,
                ...(action.subType
                    ? {subType: DisclosureSubtype.linkedin}
                    : null)
            };
            await setDisclosure(acceptedDisclosure);
            return {result: true, disclosure: acceptedDisclosure};
        }

        throw new HolderAppError({
            errorCode: 'default_submit_presentation_error'
        });
    } catch (error) {
        if (error instanceof HolderAppError || error instanceof VCLError) {
            throw error;
        }
        throw new HolderAppError({
            errorCode: 'default_submit_presentation_error'
        });
    }
};

export const onDeclineDisclosure = async (action: DeclineDisclosure) => {
    try {
        const {url, token, disclosureId, inspectorId, exchangeId} = action;
        await declineDisclosure(
            url,
            token,
            disclosureId,
            inspectorId,
            exchangeId
        );
        return {result: true};
    } catch (error) {
        return {error: ERRORS.decline};
    }
};

export const checkIfIssuingNotRequireSharingIdCredentials = async (
    deepLink: string,
    vendorOriginContext?: string
): Promise<{
    isShouldSkipIdentityDisclosureStep: boolean;
    credentialManifest: VCLCredentialManifest | null;
}> => {
    const {path} = linkHandler(deepLink);

    if (path !== DeepLinkOptions.issue) {
        return Promise.resolve({
            isShouldSkipIdentityDisclosureStep: false,
            credentialManifest: null
        });
    }
    const {didJwk} = await getOauthTokens();
    const accessToken = await getAccessToken(store.getState().appConfig.config);

    const credentialManifestDescriptorByDeepLink: VCLCredentialManifestDescriptorByDeepLink =
        {
            deepLink: {value: deepLink},
            didJwk: didJwk as VCLDidJwk,
            remoteCryptoServicesToken: {value: accessToken} as VCLToken
        };

    const response = await runWithAccessToken(
        store.getState().appConfig.config,
        VclReactNativeSdkWrapper.getCredentialManifest,
        credentialManifestDescriptorByDeepLink
    );

    const {
        claimsSet: {presentation_definition: presentationDefinition}
    } = jwtDecode(response.jwt.encodedJwt);

    if (
        !vendorOriginContext &&
        !presentationDefinition?.input_descriptors?.length
    ) {
        throwVCLError({errorCode: 'preauth_vendorOriginContext_missing'});
    }

    return {
        isShouldSkipIdentityDisclosureStep: Boolean(
            vendorOriginContext &&
            !(
                presentationDefinition &&
                presentationDefinition?.input_descriptors?.length
            )
        ),
        credentialManifest: response
    };
};
