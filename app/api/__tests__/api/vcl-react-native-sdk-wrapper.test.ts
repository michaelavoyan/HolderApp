import VclReactNative, {
    VCLAuthTokenDescriptor,
    VCLCountryCodes,
    VCLCredentialManifest,
    VCLCredentialManifestDescriptor,
    VCLCredentialTypesUIFormSchemaDescriptor,
    VCLDeepLink,
    VCLDidJwk,
    VCLDidJwkDescriptor,
    VCLExchangeDescriptor,
    VCLFinalizeOffersDescriptor,
    VCLGenerateOffersDescriptor,
    VCLInitializationDescriptor,
    VCLJwtDescriptor,
    VCLOrganizationsSearchDescriptor,
    VCLPresentationRequest,
    VCLPresentationRequestDescriptor,
    VCLPresentationSubmission,
    VCLSignatureAlgorithm,
    VCLToken,
    VCLVerifiedProfileDescriptor
} from '@velocitycareerlabs/vcl-react-native';
import type {VCLPublicJwk} from '@velocitycareerlabs/vcl-react-native/src/api/entities/VCLPublicJwk';
import type {VCLJwt} from '@velocitycareerlabs/vcl-react-native/src/api/entities/VCLJwt';
import type {VCLVerifiedProfile} from '@velocitycareerlabs/vcl-react-native/src/api/entities/VCLVerifiedProfile';
import type {VCLServiceTypes} from '@velocitycareerlabs/vcl-react-native/src/api/entities/VCLServiceTypes';

import type {VCLSubmissionResult} from '@velocitycareerlabs/vcl-react-native/src/api/entities/VCLSubmissionResult';
import type {VCLExchange} from '@velocitycareerlabs/vcl-react-native/src/api/entities/VCLExchange';
import {jsonStringify} from 'app/utilities/helpers';
import {vclLogger} from 'app/utilities/logger';
import {VclReactNativeSdkWrapper} from '../../vcl-react-native-sdk-wrapper';

jest.spyOn(vclLogger, 'info').mockImplementation(jest.fn());

jest.spyOn(VclReactNative, 'initialize').mockImplementation(jest.fn());
jest.spyOn(VclReactNative, 'getCountries').mockImplementation(jest.fn());
jest.spyOn(VclReactNative, 'getCredentialTypes').mockImplementation(jest.fn());
jest.spyOn(VclReactNative, 'getCredentialTypeSchemas').mockImplementation(
    jest.fn()
);
jest.spyOn(VclReactNative, 'getPresentationRequest').mockImplementation(
    jest.fn()
);
jest.spyOn(VclReactNative, 'submitPresentation').mockImplementation(jest.fn());
jest.spyOn(VclReactNative, 'getExchangeProgress').mockImplementation(jest.fn());
jest.spyOn(VclReactNative, 'searchForOrganizations').mockImplementation(
    jest.fn()
);
jest.spyOn(VclReactNative, 'getCredentialManifest').mockImplementation(
    jest.fn()
);
jest.spyOn(VclReactNative, 'generateOffers').mockImplementation(jest.fn());
jest.spyOn(VclReactNative, 'checkForOffers').mockImplementation(jest.fn());
jest.spyOn(VclReactNative, 'finalizeOffers').mockImplementation(jest.fn());
jest.spyOn(VclReactNative, 'getAuthToken').mockImplementation(jest.fn());
jest.spyOn(VclReactNative, 'getCredentialTypesUIFormSchema').mockImplementation(
    jest.fn()
);
jest.spyOn(VclReactNative, 'getVerifiedProfile').mockImplementation(jest.fn());
jest.spyOn(VclReactNative, 'verifyJwt').mockImplementation(jest.fn());
jest.spyOn(VclReactNative, 'generateSignedJwt').mockImplementation(jest.fn());
jest.spyOn(VclReactNative, 'generateDidJwk').mockImplementation(jest.fn());

describe('vcl-react-native-sdk tests', () => {
    const deepLinkMock: VCLDeepLink = {value: 'some deep link'};
    const publicJwkMock: VCLPublicJwk = {valueStr: 'some public key'};
    const didJwkMock: VCLDidJwk = {
        did: '',
        publicJwk: publicJwkMock,
        kid: '',
        keyId: ''
    };
    const tokenMock: VCLToken = {value: 'some token'};
    const jwtMock: VCLJwt = {encodedJwt: 'some jwt'};
    const serviceTypesMock: VCLServiceTypes = {payload: []};
    const verifiedProfileMock: VCLVerifiedProfile = {
        payload: {},
        credentialSubject: {},
        name: '',
        logo: '',
        id: '',
        serviceTypes: serviceTypesMock
    };
    const presentationRequestMock: VCLPresentationRequest = {
        exchangeId: '',
        jwt: jwtMock,
        verifiedProfile: verifiedProfileMock,
        keyID: '',
        presentationDefinitionId: '',
        iss: '',
        didJwk: didJwkMock,
        remoteCryptoServicesToken: tokenMock
    };
    const presentationSubmissionMock: VCLPresentationSubmission = {
        presentationRequest: presentationRequestMock,
        verifiableCredentials: []
    };
    const exchangeMock: VCLExchange = {
        id: '',
        type: '',
        disclosureComplete: true,
        exchangeComplete: true
    };
    const submissionResultMock: VCLSubmissionResult = {
        sessionToken: tokenMock,
        exchange: exchangeMock,
        jti: '',
        submissionId: ''
    };
    const credentialManifestMock: VCLCredentialManifest = {
        jwt: jwtMock,
        verifiedProfile: verifiedProfileMock,
        iss: '',
        did: '',
        exchangeId: '',
        presentationDefinitionId: '',
        didJwk: didJwkMock,
        remoteCryptoServicesToken: tokenMock
    };

    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    describe('VclReactNativeSdkWrapper test', () => {

        it('should call VclReactNative.initialize', async () => {
            const param: VCLInitializationDescriptor = {};

            await VclReactNativeSdkWrapper.initialize(param, true);

            expect(vclLogger.info).toHaveBeenCalledTimes(1);
            expect(vclLogger.info).toHaveBeenCalledWith(
                {shouldLogToSentry: true},
                `VclReactNativeSdkWrapper.initialize() with params: \n${jsonStringify(param)}`
            );

            expect(VclReactNative.initialize).toHaveBeenCalledTimes(1);
            expect(VclReactNative.initialize).toHaveBeenCalledWith(param);
        });

        it('should call VclReactNative.getCountries', async () => {
            await VclReactNativeSdkWrapper.getCountries(true);

            expect(vclLogger.info).toHaveBeenCalledTimes(1);
            expect(vclLogger.info).toHaveBeenCalledWith(
                {shouldLogToSentry: true},
                'VclReactNativeSdkWrapper.getCountries()'
            );

            expect(VclReactNative.getCountries).toHaveBeenCalledTimes(1);
            expect(VclReactNative.getCountries).toHaveBeenCalledWith();
        });

        it('should call VclReactNative.getCredentialTypes', async () => {
            await VclReactNativeSdkWrapper.getCredentialTypes(true);

            expect(vclLogger.info).toHaveBeenCalledTimes(1);
            expect(vclLogger.info).toHaveBeenCalledWith(
                {shouldLogToSentry: true},
                'VclReactNativeSdkWrapper.getCredentialTypes()'
            );

            expect(VclReactNative.getCredentialTypes).toHaveBeenCalledTimes(1);
            expect(VclReactNative.getCredentialTypes).toHaveBeenCalledWith();
        });

        it('should call VclReactNative.getCredentialTypeSchemas', async () => {
            await VclReactNativeSdkWrapper.getCredentialTypeSchemas(true);

            expect(vclLogger.info).toHaveBeenCalledTimes(1);
            expect(vclLogger.info).toHaveBeenCalledWith(
                {shouldLogToSentry: true},
                'VclReactNativeSdkWrapper.getCredentialTypeSchemas()'
            );

            expect(VclReactNative.getCredentialTypeSchemas).toHaveBeenCalledTimes(
                1
            );
            expect(VclReactNative.getCredentialTypeSchemas).toHaveBeenCalledWith();
        });

        it('should call VclReactNative.getPresentationRequest', async () => {
            const param: VCLPresentationRequestDescriptor = {
                deepLink: deepLinkMock,
                didJwk: didJwkMock,
                remoteCryptoServicesToken: tokenMock
            };

            await VclReactNativeSdkWrapper.getPresentationRequest(param, true);

            expect(vclLogger.info).toHaveBeenCalledTimes(1);
            expect(vclLogger.info).toHaveBeenCalledWith(
                {shouldLogToSentry: true},
                `VclReactNativeSdkWrapper.getPresentationRequest() with params: \n${jsonStringify(param)}`
            );

            expect(VclReactNative.getPresentationRequest).toHaveBeenCalledTimes(1);
            expect(VclReactNative.getPresentationRequest).toHaveBeenCalledWith(
                param
            );
        });

        it('should call VclReactNative.submitPresentation', async () => {
            const param: VCLPresentationSubmission = {
                presentationRequest: presentationRequestMock,
                verifiableCredentials: []
            };

            await VclReactNativeSdkWrapper.submitPresentation(
                param,
                undefined,
                true
            );

            expect(vclLogger.info).toHaveBeenCalledTimes(1);
            expect(vclLogger.info).toHaveBeenCalledWith(
                {shouldLogToSentry: true},
                `VclReactNativeSdkWrapper.submitPresentation() with params: \n${jsonStringify(param)}`
            );

            expect(VclReactNative.submitPresentation).toHaveBeenCalledTimes(1);
            expect(VclReactNative.submitPresentation).toHaveBeenCalledWith(param, undefined);
        });

        it('should call VclReactNative.getExchangeProgress', async () => {
            const param: VCLExchangeDescriptor = {
                presentationSubmission: presentationSubmissionMock,
                submissionResult: submissionResultMock
            };

            await VclReactNativeSdkWrapper.getExchangeProgress(param, true);

            expect(vclLogger.info).toHaveBeenCalledTimes(1);
            expect(vclLogger.info).toHaveBeenCalledWith(
                {shouldLogToSentry: true},
                `VclReactNativeSdkWrapper.getExchangeProgress() with params: \n${jsonStringify(param)}`
            );

            expect(VclReactNative.getExchangeProgress).toHaveBeenCalledTimes(1);
            expect(VclReactNative.getExchangeProgress).toHaveBeenCalledWith(param);
        });

        it('should call VclReactNative.searchForOrganizations', async () => {
            const param: VCLOrganizationsSearchDescriptor = {
                filter: {did: 'some did'}
            };

            await VclReactNativeSdkWrapper.searchForOrganizations(param, true);

            expect(vclLogger.info).toHaveBeenCalledTimes(1);
            expect(vclLogger.info).toHaveBeenCalledWith(
                {shouldLogToSentry: true},
                `VclReactNativeSdkWrapper.searchForOrganizations() with params: \n${jsonStringify(param)}`
            );

            expect(VclReactNative.searchForOrganizations).toHaveBeenCalledTimes(1);
            expect(VclReactNative.searchForOrganizations).toHaveBeenCalledWith(
                param
            );
        });

        it('should call VclReactNative.getCredentialManifest', async () => {
            const param: VCLCredentialManifestDescriptor = {
                didJwk: didJwkMock,
                remoteCryptoServicesToken: tokenMock
            };

            await VclReactNativeSdkWrapper.getCredentialManifest(param, true);

            expect(vclLogger.info).toHaveBeenCalledTimes(1);
            expect(vclLogger.info).toHaveBeenCalledWith(
                {shouldLogToSentry: true},
                `VclReactNativeSdkWrapper.getCredentialManifest() with params: \n${jsonStringify(param)}`
            );

            expect(VclReactNative.getCredentialManifest).toHaveBeenCalledTimes(1);
            expect(VclReactNative.getCredentialManifest).toHaveBeenCalledWith(
                param
            );
        });

        it('should call VclReactNative.generateOffers', async () => {
            const param: VCLGenerateOffersDescriptor = {
                credentialManifest: credentialManifestMock
            };

            await VclReactNativeSdkWrapper.generateOffers(param, true);

            expect(vclLogger.info).toHaveBeenCalledTimes(1);
            expect(vclLogger.info).toHaveBeenCalledWith(
                {shouldLogToSentry: true},
                `VclReactNativeSdkWrapper.generateOffers() with params: \n${jsonStringify(param)}`
            );

            expect(VclReactNative.generateOffers).toHaveBeenCalledTimes(1);
            expect(VclReactNative.generateOffers).toHaveBeenCalledWith(param);
        });

        it('should call VclReactNative.checkForOffers', async () => {
            const param: VCLGenerateOffersDescriptor = {
                credentialManifest: credentialManifestMock
            };

            await VclReactNativeSdkWrapper.checkForOffers(param, tokenMock, true);

            expect(vclLogger.info).toHaveBeenCalledTimes(1);
            expect(vclLogger.info).toHaveBeenCalledWith(
                {shouldLogToSentry: true},
                `VclReactNativeSdkWrapper.checkForOffers() with params: \n${jsonStringify(param)}, \n${jsonStringify(tokenMock)}`
            );

            expect(VclReactNative.checkForOffers).toHaveBeenCalledTimes(1);
            expect(VclReactNative.checkForOffers).toHaveBeenCalledWith(
                param,
                tokenMock
            );
        });

        it('should call VclReactNative.finalizeOffers', async () => {
            const param: VCLFinalizeOffersDescriptor = {
                credentialManifest: credentialManifestMock,
                rejectedOfferIds: [],
                approvedOfferIds: []
            };

            await VclReactNativeSdkWrapper.finalizeOffers(param, tokenMock, true);

            expect(vclLogger.info).toHaveBeenCalledTimes(1);
            expect(vclLogger.info).toHaveBeenCalledWith(
                {shouldLogToSentry: true},
                `VclReactNativeSdkWrapper.finalizeOffers() with params: \n${jsonStringify(param)}, \n${jsonStringify(tokenMock)}`
            );

            expect(VclReactNative.finalizeOffers).toHaveBeenCalledTimes(1);
            expect(VclReactNative.finalizeOffers).toHaveBeenCalledWith(
                param,
                tokenMock
            );
        });

        it('should call VclReactNative.getAuthToken', async () => {
            const param: VCLAuthTokenDescriptor = {
                authTokenUri: 'https://example.com',
                refreshToken: tokenMock,
                walletDid: 'some wallet did',
                relyingPartyDid: 'some relying party did',
                authorizationCode: 'some vendor origin context'
            };

            await VclReactNativeSdkWrapper.getAuthToken(param, true);

            expect(vclLogger.info).toHaveBeenCalledTimes(1);
            expect(vclLogger.info).toHaveBeenCalledWith(
                {shouldLogToSentry: true},
                `VclReactNativeSdkWrapper.getAuthToken() with params: \n${jsonStringify(param)}`
            );

            expect(VclReactNative.getAuthToken).toHaveBeenCalledTimes(1);
            expect(VclReactNative.getAuthToken).toHaveBeenCalledWith(param);
        });

        it('should call VclReactNative.getCredentialTypesUIFormSchema', async () => {
            const param: VCLCredentialTypesUIFormSchemaDescriptor = {
                credentialType: 'some type',
                countryCode: VCLCountryCodes.IL
            };

            await VclReactNativeSdkWrapper.getCredentialTypesUIFormSchema(param, true);

            expect(vclLogger.info).toHaveBeenCalledTimes(1);
            expect(vclLogger.info).toHaveBeenCalledWith(
                {shouldLogToSentry: true},
                `VclReactNativeSdkWrapper.getCredentialTypesUIFormSchema() with params: \n${jsonStringify(param)}`
            );

            expect(
                VclReactNative.getCredentialTypesUIFormSchema
            ).toHaveBeenCalledTimes(1);
            expect(
                VclReactNative.getCredentialTypesUIFormSchema
            ).toHaveBeenCalledWith(param);
        });

        it('should call VclReactNative.getVerifiedProfile', async () => {
            const param: VCLVerifiedProfileDescriptor = {did: 'some did'};

            await VclReactNativeSdkWrapper.getVerifiedProfile(param, true);

            expect(vclLogger.info).toHaveBeenCalledTimes(1);
            expect(vclLogger.info).toHaveBeenCalledWith(
                {shouldLogToSentry: true},
                `VclReactNativeSdkWrapper.getVerifiedProfile() with params: \n${jsonStringify(param)}`
            );

            expect(VclReactNative.getVerifiedProfile).toHaveBeenCalledTimes(1);
            expect(VclReactNative.getVerifiedProfile).toHaveBeenCalledWith(param);
        });

        it('should call VclReactNative.verifyJwt', async () => {
            await VclReactNativeSdkWrapper.verifyJwt(
                jwtMock,
                publicJwkMock,
                tokenMock,
                true
            );

            expect(vclLogger.info).toHaveBeenCalledTimes(1);
            expect(vclLogger.info).toHaveBeenCalledWith(
                {shouldLogToSentry: true},
                `VclReactNativeSdkWrapper.verifyJwt() with params: \n${jsonStringify(jwtMock)}, \n${jsonStringify(publicJwkMock)}, \n${jsonStringify(tokenMock)}`
            );

            expect(VclReactNative.verifyJwt).toHaveBeenCalledTimes(1);
            expect(VclReactNative.verifyJwt).toHaveBeenCalledWith(
                jwtMock,
                publicJwkMock,
                tokenMock
            );
        });

        it('should call VclReactNative.generateSignedJwt', async () => {
            const jwtDescriptor: VCLJwtDescriptor = {
                payload: {key: 'value'},
                jti: 'some jti',
                iss: 'some iss'
            };
            await VclReactNativeSdkWrapper.generateSignedJwt(
                jwtDescriptor,
                didJwkMock,
                tokenMock,
                true
            );

            expect(vclLogger.info).toHaveBeenCalledTimes(1);
            expect(vclLogger.info).toHaveBeenCalledWith(
                {shouldLogToSentry: true},
                `VclReactNativeSdkWrapper.generateSignedJwt() with params: \n${jsonStringify(jwtDescriptor)}, \n${jsonStringify(didJwkMock)}, \n${jsonStringify(tokenMock)}`
            );

            expect(VclReactNative.generateSignedJwt).toHaveBeenCalledTimes(1);
            expect(VclReactNative.generateSignedJwt).toHaveBeenCalledWith(
                jwtDescriptor,
                didJwkMock,
                tokenMock
            );
        });

        it('should call VclReactNative.generateDidJwk', async () => {
            const param: VCLDidJwkDescriptor = {
                signatureAlgorithm: VCLSignatureAlgorithm.SECP256k1,
                remoteCryptoServicesToken: tokenMock
            };

            await VclReactNativeSdkWrapper.generateDidJwk(param, true);

            expect(vclLogger.info).toHaveBeenCalledTimes(1);
            expect(vclLogger.info).toHaveBeenCalledWith(
                {shouldLogToSentry: true},
                `VclReactNativeSdkWrapper.generateDidJwk() with params: \n${jsonStringify(param)}`
            );

            expect(VclReactNative.generateDidJwk).toHaveBeenCalledTimes(1);
            expect(VclReactNative.generateDidJwk).toHaveBeenCalledWith(param);
        });
    });
});
