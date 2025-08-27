import {
    VCLError,
    VCLErrorCode,
    VCLIssuingType
} from '@velocitycareerlabs/vcl-react-native';

import * as errorPopup from 'app/utilities/error-handler/errorHandlerPopup';
import {HolderAppError} from 'app/utilities/error-handler/HolderAppError';

import {checkVCLError} from '../../errors/helpers';

jest.spyOn(errorPopup, 'errorHandlerPopup').mockImplementation();

// jest.mock('LogRocket', () => ({
//     getSessionURL: jest.fn((callback) => callback('mocked_session_url')),
//   }));

describe('Test checkVCLError', () => {
    beforeEach(async () => {
        jest.clearAllMocks();
    });

    it('Should run errorHandlerPopup with upstream_unexpected_error code, no organization', () => {
        const errorCode = 'upstream_unexpected_error';

        try {
            throw new VCLError({
                message: JSON.stringify({
                    errorCode
                })
            });
        } catch (error) {
            checkVCLError(error as VCLError, '');

            expect(errorPopup.errorHandlerPopup).toHaveBeenCalledWith(
                new HolderAppError({errorCode}),
                null,
                true,
                expect.any(Function)
            );
        }
    });

    it('Should run errorHandlerPopup with upstream_webhook_not_implemented code', () => {
        const errorCode = 'upstream_webhook_not_implemented';
        const organization = 'TestOrg';

        try {
            throw new VCLError({
                message: JSON.stringify({
                    errorCode
                })
            });
        } catch (error) {
            checkVCLError(error as VCLError, organization);

            expect(errorPopup.errorHandlerPopup).toHaveBeenCalledWith(
                new HolderAppError({
                    errorCode,
                    context: {organizationName: organization}
                }),
                null,
                true,
                expect.any(Function)
            );
        }
    });

    it('Should run errorHandlerPopup with upstream_unauthorized code', () => {
        const errorCode = 'upstream_unauthorized';
        const organization = 'TestOrg';

        try {
            throw new VCLError({
                message: JSON.stringify({
                    errorCode
                })
            });
        } catch (error) {
            checkVCLError(error as VCLError, organization);

            expect(errorPopup.errorHandlerPopup).toHaveBeenCalledWith(
                new HolderAppError({
                    errorCode,
                    context: {organizationName: organization}
                }),
                null,
                true,
                expect.any(Function)
            );
        }
    });

    it('Should run errorHandlerPopup with sdk_verified_profile_wrong_service_type code', () => {
        const organization = 'TestOrg';

        try {
            throw new VCLError({
                message: JSON.stringify({
                    statusCode: 403,
                    message: JSON.stringify({profileName: 'profileName'})
                })
            });
        } catch (error) {
            checkVCLError(error as VCLError, organization);

            expect(errorPopup.errorHandlerPopup).toHaveBeenCalledWith(
                new HolderAppError({
                    errorCode: 'sdk_verified_profile_wrong_service_type',
                    context: {organizationName: organization}
                }),
                null,
                undefined,
                expect.any(Function)
            );
        }
    });

    it('Should run errorHandlerPopup with presentation_credential_bad_issuer code', () => {
        const credentialType = VCLIssuingType.Identity;
        const errorCode = 'sdk_verified_profile_wrong_service_type';

        try {
            throw new VCLError({
                message: JSON.stringify({
                    statusCode: 401,
                    errorCode
                })
            });
        } catch (error) {
            checkVCLError(error as VCLError, '', '', credentialType);

            expect(errorPopup.errorHandlerPopup).toHaveBeenCalledWith(
                new HolderAppError({
                    errorCode,
                    context: {credentialType}
                }),
                null,
                true,
                expect.any(Function)
            );
        }
    });

    it('Should run errorHandlerPopup with offers_not_found_synch code', () => {
        const organizationEmail = 'test@email.com';
        const errorCode = 'offers_not_found_synch';

        try {
            throw new VCLError({
                message: JSON.stringify({
                    statusCode: 401,
                    errorCode
                })
            });
        } catch (error) {
            checkVCLError(error as VCLError, '', organizationEmail);

            expect(errorPopup.errorHandlerPopup).toHaveBeenCalledWith(
                new HolderAppError({
                    errorCode,
                    context: {organizationEmail}
                }),
                null,
                true,
                expect.any(Function)
            );
        }
    });

    it('Should run errorHandlerPopup with mismatched_request_issuer_did code', () => {
        const errorCode = VCLErrorCode.MismatchedRequestIssuerDid;

        try {
            throw new VCLError({
                message: JSON.stringify({
                    statusCode: 401,
                    errorCode
                })
            });
        } catch (error) {
            checkVCLError(error as VCLError, '');

            expect(errorPopup.errorHandlerPopup).toHaveBeenCalledWith(
                new HolderAppError({errorCode}),
                null,
                true,
                expect.any(Function)
            );
        }
    });

    it('Should run errorHandlerPopup with mismatched_credential_issuer_did code', () => {
        const errorCode = VCLErrorCode.MismatchedCredentialIssuerDid;

        try {
            throw new VCLError({
                message: JSON.stringify({
                    statusCode: 401,
                    errorCode
                })
            });
        } catch (error) {
            checkVCLError(error as VCLError, '');

            expect(errorPopup.errorHandlerPopup).toHaveBeenCalledWith(
                new HolderAppError({errorCode}),
                null,
                true,
                expect.any(Function)
            );
        }
    });

    it('Should run errorHandlerPopup with mismatched_offer_issuer_did code', () => {
        const errorCode = VCLErrorCode.MismatchedOfferIssuerDid;

        try {
            throw new VCLError({
                message: JSON.stringify({
                    statusCode: 401,
                    errorCode
                })
            });
        } catch (error) {
            checkVCLError(error as VCLError, '');

            expect(errorPopup.errorHandlerPopup).toHaveBeenCalledWith(
                new HolderAppError({errorCode}),
                null,
                true,
                expect.any(Function),
            );
        }
    });

    it('Should run errorHandlerPopup with mismatched_presentation_request_inspector_did code', () => {
        const errorCode = VCLErrorCode.MismatchedPresentationRequestInspectorDid;

        try {
            throw new VCLError({
                message: JSON.stringify({
                    statusCode: 401,
                    errorCode
                })
            });
        } catch (error) {
            checkVCLError(error as VCLError, '');

            expect(errorPopup.errorHandlerPopup).toHaveBeenCalledWith(
                new HolderAppError({errorCode}),
                null,
                true,
                expect.any(Function)
            );
        }
    });
});
