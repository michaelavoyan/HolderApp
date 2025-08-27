import VclReactNative, {
    VCLAuthToken,
    VCLAuthTokenDescriptor,
    VCLCountries,
    VCLCredentialManifest,
    VCLCredentialManifestDescriptor,
    VCLCredentialTypes,
    VCLCredentialTypeSchemas,
    VCLCredentialTypesUIFormSchema,
    VCLCredentialTypesUIFormSchemaDescriptor,
    VCLDidJwk,
    VCLDidJwkDescriptor,
    VCLExchange,
    VCLExchangeDescriptor,
    VCLFinalizeOffersDescriptor,
    VCLGenerateOffersDescriptor,
    VCLInitializationDescriptor,
    VCLJwt,
    VCLJwtDescriptor,
    VCLJwtVerifiableCredentials,
    VCLOffers,
    VCLOrganizations,
    VCLOrganizationsSearchDescriptor,
    VCLPresentationRequest,
    VCLPresentationRequestDescriptor,
    VCLPresentationSubmission,
    VCLPublicJwk,
    VCLSubmissionResult,
    VCLToken,
    VCLVerifiedProfile,
    VCLVerifiedProfileDescriptor
} from '@velocitycareerlabs/vcl-react-native';
import {vclLogger} from '../utilities/logger';
import {jsonStringify} from '../utilities/helpers';

export const VclReactNativeSdkWrapper = {
  initialize: async (
      initializationDescriptor: VCLInitializationDescriptor,
      shouldLogToSentry?: boolean
  ): Promise<void> => {
    vclLogger.info(
        {shouldLogToSentry},
        `VclReactNativeSdkWrapper.initialize() with params: \n${jsonStringify(initializationDescriptor)}`
    );
    return await VclReactNative.initialize(initializationDescriptor);
  },

  getCountries: async (shouldLogToSentry?: boolean): Promise<VCLCountries> => {
    vclLogger.info({shouldLogToSentry}, 'VclReactNativeSdkWrapper.getCountries()');
    return await VclReactNative.getCountries();
  },

  getCredentialTypes: async (shouldLogToSentry?: boolean): Promise<VCLCredentialTypes> => {
    vclLogger.info({shouldLogToSentry}, 'VclReactNativeSdkWrapper.getCredentialTypes()');
    return await VclReactNative.getCredentialTypes();
  },

  getCredentialTypeSchemas: async (shouldLogToSentry?: boolean): Promise<VCLCredentialTypeSchemas> => {
    vclLogger.info({shouldLogToSentry}, 'VclReactNativeSdkWrapper.getCredentialTypeSchemas()');
    return await VclReactNative.getCredentialTypeSchemas();
  },

  getPresentationRequest: async (
      presentationRequestDescriptor: VCLPresentationRequestDescriptor,
      shouldLogToSentry?: boolean
  ): Promise<VCLPresentationRequest> => {
    vclLogger.info(
        {shouldLogToSentry},
        `VclReactNativeSdkWrapper.getPresentationRequest() with params: \n${jsonStringify(presentationRequestDescriptor)}`
    );
    return await VclReactNative.getPresentationRequest(
        presentationRequestDescriptor
    );
  },

  submitPresentation: async (
      presentationSubmission: VCLPresentationSubmission,
      authToken?: VCLAuthToken,
      shouldLogToSentry?: boolean
  ): Promise<VCLSubmissionResult> => {
    vclLogger.info(
        {shouldLogToSentry},
        `VclReactNativeSdkWrapper.submitPresentation() with params: \n${jsonStringify(presentationSubmission)}`
    );
    return await VclReactNative.submitPresentation(presentationSubmission, authToken);
  },

  getExchangeProgress: async (
      exchangeDescriptor: VCLExchangeDescriptor,
      shouldLogToSentry?: boolean
  ): Promise<VCLExchange> => {
    vclLogger.info(
        {shouldLogToSentry},
        `VclReactNativeSdkWrapper.getExchangeProgress() with params: \n${jsonStringify(exchangeDescriptor)}`
    );
    return await VclReactNative.getExchangeProgress(exchangeDescriptor);
  },

  searchForOrganizations: async (
      organizationsSearchDescriptor: VCLOrganizationsSearchDescriptor,
      shouldLogToSentry?: boolean
  ): Promise<VCLOrganizations> => {
    vclLogger.info(
        {shouldLogToSentry},
        `VclReactNativeSdkWrapper.searchForOrganizations() with params: \n${jsonStringify(organizationsSearchDescriptor)}`
    );
    return await VclReactNative.searchForOrganizations(
        organizationsSearchDescriptor
    );
  },

  getCredentialManifest: async (
      credentialManifestDescriptor: VCLCredentialManifestDescriptor,
      shouldLogToSentry?: boolean
  ): Promise<VCLCredentialManifest> => {
    vclLogger.info(
        {shouldLogToSentry},
        `VclReactNativeSdkWrapper.getCredentialManifest() with params: \n${jsonStringify(credentialManifestDescriptor)}`
    );
    return await VclReactNative.getCredentialManifest(
        credentialManifestDescriptor
    );
  },

  generateOffers: async (
      generateOffersDescriptor: VCLGenerateOffersDescriptor,
      shouldLogToSentry?: boolean
  ): Promise<VCLOffers> => {
    vclLogger.info(
        {shouldLogToSentry},
        `VclReactNativeSdkWrapper.generateOffers() with params: \n${jsonStringify(generateOffersDescriptor)}`
    );
    return await VclReactNative.generateOffers(generateOffersDescriptor);
  },

  checkForOffers: async (
      generateOffersDescriptor: VCLGenerateOffersDescriptor,
      sessionToken: VCLToken,
      shouldLogToSentry?: boolean
  ): Promise<VCLOffers> => {
    vclLogger.info(
        {shouldLogToSentry},
        `VclReactNativeSdkWrapper.checkForOffers() with params: \n${jsonStringify(generateOffersDescriptor)}, \n${jsonStringify(sessionToken)}`
    );
    return await VclReactNative.checkForOffers(
        generateOffersDescriptor,
        sessionToken
    );
  },

  finalizeOffers: async (
      finalizeOffersDescriptor: VCLFinalizeOffersDescriptor,
      sessionToken: VCLToken,
      shouldLogToSentry?: boolean
  ): Promise<VCLJwtVerifiableCredentials> => {
    vclLogger.info(
        {shouldLogToSentry},
        `VclReactNativeSdkWrapper.finalizeOffers() with params: \n${jsonStringify(finalizeOffersDescriptor)}, \n${jsonStringify(sessionToken)}`
    );
    return await VclReactNative.finalizeOffers(
        finalizeOffersDescriptor,
        sessionToken
    );
  },

    getAuthToken: async (
        authTokenDescriptor: VCLAuthTokenDescriptor,
        shouldLogToSentry?: boolean
    ): Promise<VCLAuthToken> => {
        vclLogger.info(
            {shouldLogToSentry},
            `VclReactNativeSdkWrapper.getAuthToken() with params: \n${jsonStringify(authTokenDescriptor)}`
        );
        return await VclReactNative.getAuthToken(authTokenDescriptor);
    },

  getCredentialTypesUIFormSchema: async (
      credentialTypesUIFormSchemaDescriptor: VCLCredentialTypesUIFormSchemaDescriptor,
      shouldLogToSentry?: boolean
  ): Promise<VCLCredentialTypesUIFormSchema> => {
    vclLogger.info(
        {shouldLogToSentry},
        `VclReactNativeSdkWrapper.getCredentialTypesUIFormSchema() with params: \n${jsonStringify(credentialTypesUIFormSchemaDescriptor)}`
    );
    return await VclReactNative.getCredentialTypesUIFormSchema(
        credentialTypesUIFormSchemaDescriptor
    );
  },

  getVerifiedProfile: async (
      verifiedProfileDescriptor: VCLVerifiedProfileDescriptor,
      shouldLogToSentry?: boolean
  ): Promise<VCLVerifiedProfile> => {
    vclLogger.info(
        {shouldLogToSentry},
        `VclReactNativeSdkWrapper.getVerifiedProfile() with params: \n${jsonStringify(verifiedProfileDescriptor)}`
    );
    return await VclReactNative.getVerifiedProfile(verifiedProfileDescriptor);
  },

  verifyJwt: async (
      jwt: VCLJwt,
      publicJwkMock: VCLPublicJwk,
      remoteCryptoServicesToken?: VCLToken,
      shouldLogToSentry?: boolean
  ): Promise<boolean> => {
    vclLogger.info(
        {shouldLogToSentry},
        `VclReactNativeSdkWrapper.verifyJwt() with params: \n${jsonStringify(jwt)}, \n${jsonStringify(publicJwkMock)}, \n${jsonStringify(remoteCryptoServicesToken)}`
    );
    return await VclReactNative.verifyJwt(
        jwt,
        publicJwkMock,
        remoteCryptoServicesToken
    );

  },

  generateSignedJwt: async (
      jwtDescriptor: VCLJwtDescriptor,
      didJwk: VCLDidJwk,
      remoteCryptoServicesToken?: VCLToken,
      shouldLogToSentry?: boolean
  ): Promise<VCLJwt> => {
    vclLogger.info(
        {shouldLogToSentry},
        `VclReactNativeSdkWrapper.generateSignedJwt() with params: \n${jsonStringify(jwtDescriptor)}, \n${jsonStringify(didJwk)}, \n${jsonStringify(remoteCryptoServicesToken)}`
    );
    return await VclReactNative.generateSignedJwt(
        jwtDescriptor,
        didJwk,
        remoteCryptoServicesToken
    );
  },

  generateDidJwk: async (
      didJwkDescriptor: VCLDidJwkDescriptor,
      shouldLogToSentry?: boolean
  ): Promise<VCLDidJwk> => {
    vclLogger.info(
        {shouldLogToSentry},
        `VclReactNativeSdkWrapper.generateDidJwk() with params: \n${jsonStringify(didJwkDescriptor)}`
    );
    return await VclReactNative.generateDidJwk(didJwkDescriptor);
  },
};
