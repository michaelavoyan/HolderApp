import {VCLError, VCLErrorCode} from '@velocitycareerlabs/vcl-react-native';
import * as popups from '../../popups';
import {errorHandlerPopup, errorHandlerPopupLogger} from '../errorHandlerPopup';
import {throwVCLError} from '../utils';
import i18n from '../../../i18n';
import {
    genericErrorsMap, isSendReportButtonVisible,
    useCasesErrorsMapItems
} from '../errorsMap';

jest.spyOn(errorHandlerPopupLogger, 'logError');
jest.spyOn(popups, 'openErrorPopup').mockImplementation();

const formButtons = (errorCode: string) => {
    return [
        {onPress: expect.any(Function), title: i18n.t('Close'), closePopupOnPress: true},
        ...(isSendReportButtonVisible(errorCode) ? [{title: i18n.t('Send report')}] : [])
    ];
};

describe('Test errorHandlerPopup', () => {
    beforeEach(async () => {
        jest.clearAllMocks();
    });

    it('Should return correct message from errors map for SDK VCLErrorCode.SdkError', () => {
        try {
            throw new VCLError({
                message: JSON.stringify({
                    errorCode: VCLErrorCode.SdkError
                })
            });
        } catch (error) {
            errorHandlerPopup(error);

            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledTimes(1);
            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledWith(error, null);
        }

        expect(popups.openErrorPopup).toHaveBeenCalledWith({
            params: {
                title: i18n.t(genericErrorsMap.cases.sdk_error.title),
                subTitle: i18n.t(genericErrorsMap.cases.sdk_error.subTitle),
                errorCode: VCLErrorCode.SdkError,
                buttons: formButtons(VCLErrorCode.SdkError),
                email: '',
                errorReportId: expect.any(String)
            }
        });
    });

    it('Should return correct message from errors map for SDK VCLError exception', () => {
        try {
            throw new VCLError({
                message: JSON.stringify({
                    errorCode: 'upstream_offers_offer_id_missing'
                })
            });
        } catch (error) {
            errorHandlerPopup(error);

            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledTimes(1);
            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledWith(error, null);
        }

        expect(popups.openErrorPopup).toHaveBeenCalledWith({
            params: {
                title: i18n.t(
                    genericErrorsMap.cases.upstream_offers_offer_id_missing
                        .title
                ),
                subTitle: i18n.t(
                    genericErrorsMap.cases.upstream_offers_offer_id_missing
                        .subTitle
                ),
                errorCode: 'upstream_offers_offer_id_missing',
                buttons: formButtons('upstream_offers_offer_id_missing'),
                email: '',
                errorReportId: expect.any(String)
            }
        });
    });

    it('Should return correct message from errors map for VCLError exception in case default error message is overridden in Use Case', () => {
        try {
            throw new VCLError({
                message: JSON.stringify({
                    errorCode: 'upstream_offers_offer_id_missing'
                })
            });
        } catch (error) {
            errorHandlerPopup(error, null, false, undefined, {
                name: 'Overridden',
                cases: {
                    upstream_offers_offer_id_missing: {
                        title: 'Overridden title',
                        subTitle: 'Overridden subtitle'
                    }
                }
            });

            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledTimes(1);
            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledWith(error, null);
        }

        expect(popups.openErrorPopup).toHaveBeenCalledWith({
            params: {
                title: i18n.t('Overridden title'),
                subTitle: i18n.t('Overridden subtitle'),
                errorCode: 'upstream_offers_offer_id_missing',
                buttons: formButtons('upstream_offers_offer_id_missing'),
                email: '',
                errorReportId: expect.any(String)
            }
        });
    });

    it('Should return correct message from errors map for HolderAppError exception that has translation token', () => {
        try {
            throwVCLError({
                errorCode: 'vendor_error',
                context: {
                    organizationName: 'TestOrg',
                    organizationEmail: 'TestEmail'
                }
            });
        } catch (error) {
            errorHandlerPopup(error);

            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledTimes(1);
            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledWith(error, null);
        }

        expect(popups.openErrorPopup).toHaveBeenCalledWith({
            params: {
                title: i18n.t(genericErrorsMap.cases.vendor_error.title, {
                    organizationName: 'TestOrg'
                }),
                subTitle: i18n.t(genericErrorsMap.cases.vendor_error.subTitle, {
                    organizationName: 'TestOrg'
                }),
                errorCode: 'vendor_error',
                buttons: formButtons('vendor_error'),
                email: '',
                errorReportId: expect.any(String)
            }
        });
    });

    it('Should return text from career_wallet_error in case of unknown Exception', () => {
        try {
            throw new Error('Error');
        } catch (error) {
            errorHandlerPopup(error);

            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledTimes(1);
            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledWith(error, null);
        }

        expect(popups.openErrorPopup).toHaveBeenCalledWith({
            params: {
                title: i18n.t(genericErrorsMap.cases.career_wallet_error.title),
                subTitle: i18n.t(
                    genericErrorsMap.cases.career_wallet_error.subTitle
                ),
                errorCode: 'career_wallet_error',
                buttons: formButtons(''),
                email: '',
                errorReportId: expect.any(String)
            }
        });
    });

    it('Should return text from career_wallet_error in case of unknown VCLError error', () => {
        try {
            throw new VCLError({
                message: JSON.stringify({
                    errorCode: 'career_wallet_error'
                })
            });
        } catch (error) {
            errorHandlerPopup(error);

            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledTimes(1);
            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledWith(error, null);
        }

        expect(popups.openErrorPopup).toHaveBeenCalledWith({
            params: {
                title: i18n.t(genericErrorsMap.cases.career_wallet_error.title),
                subTitle: i18n.t(
                    genericErrorsMap.cases.career_wallet_error.subTitle
                ),
                errorCode: 'career_wallet_error',
                buttons: formButtons('career_wallet_error'),
                email: '',
                errorReportId: expect.any(String)
            }
        });
    });

    it('Should return text from career_wallet_error in case of unknown HolderAppError error', () => {
        try {
            throwVCLError({
                // @ts-ignore
                errorCode: 'career_wallet_error',
                context: {
                    organizationName: 'TestOrg',
                    organizationEmail: 'TestEmail'
                }
            });
        } catch (error) {
            errorHandlerPopup(error);

            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledTimes(1);
            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledWith(error, null);
        }

        expect(popups.openErrorPopup).toHaveBeenCalledWith({
            params: {
                title: i18n.t(genericErrorsMap.cases.career_wallet_error.title),
                subTitle: i18n.t(
                    genericErrorsMap.cases.career_wallet_error.subTitle
                ),
                errorCode: 'career_wallet_error',
                buttons: formButtons('career_wallet_error'),
                email: '',
                errorReportId: expect.any(String)
            }
        });
    });

    it('Should return text from UseCase career_wallet_error in case of unknown Exception', () => {
        try {
            throw new Error('Error');
        } catch (error) {
            errorHandlerPopup(error, null, false, undefined, {
                name: 'Overriden',
                cases: {
                    career_wallet_error: {
                        title: "Use Case's overridden title",
                        subTitle: "Use Case's overridden subTitle"
                    }
                }
            });

            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledTimes(1);
            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledWith(error, null);
        }

        expect(popups.openErrorPopup).toHaveBeenCalledWith({
            params: {
                title: i18n.t("Use Case's overridden title"),
                subTitle: i18n.t("Use Case's overridden subTitle"),
                errorCode: 'career_wallet_error',
                buttons: formButtons(''),
                email: '',
                errorReportId: expect.any(String)
            }
        });
    });

    it('Should return text from UseCase career_wallet_error in case of unknown VCLError error', () => {
        try {
            throw new VCLError({
                message: JSON.stringify({
                    errorCode: 'career_wallet_error'
                })
            });
        } catch (error) {
            errorHandlerPopup(error, null, false, undefined, {
                name: 'Overriden',
                cases: {
                    career_wallet_error: {
                        title: "Use Case's overridden title",
                        subTitle: "Use Case's overridden subTitle"
                    }
                }
            });

            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledTimes(1);
            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledWith(error, null);
        }

        expect(popups.openErrorPopup).toHaveBeenCalledWith({
            params: {
                title: i18n.t("Use Case's overridden title"),
                subTitle: i18n.t("Use Case's overridden subTitle"),
                errorCode: 'career_wallet_error',
                buttons: formButtons('career_wallet_error'),
                email: '',
                errorReportId: expect.any(String)
            }
        });
    });

    it('Should return text from UseCase career_wallet_error in case of unknown HolderAppError error', () => {
        try {
            throwVCLError({
                // @ts-ignore
                errorCode: 'career_wallet_error',
                context: {
                    organizationName: 'TestOrg',
                    organizationEmail: 'TestEmail'
                }
            });
        } catch (error) {
            errorHandlerPopup(error, null, false, undefined, {
                name: 'Overriden',
                cases: {
                    career_wallet_error: {
                        title: "Use Case's overridden title",
                        subTitle: "Use Case's overridden subTitle"
                    }
                }
            });

            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledTimes(1);
            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledWith(error, null);
        }

        expect(popups.openErrorPopup).toHaveBeenCalledWith({
            params: {
                title: i18n.t("Use Case's overridden title"),
                subTitle: i18n.t("Use Case's overridden subTitle"),
                errorCode: 'career_wallet_error',
                buttons: formButtons('career_wallet_error'),
                email: '',
                errorReportId: expect.any(String)
            }
        });
    });

    it('Should return text from upstream_unexpected_error exception', () => {
        try {
            throwVCLError({
                // @ts-ignore
                errorCode: 'upstream_unexpected_error',
                context: {
                    organizationName: 'TestOrg',
                    organizationEmail: 'TestEmail'
                }
            });
        } catch (error) {
            errorHandlerPopup(error, null, false, undefined);

            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledTimes(1);
            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledWith(error, null);
        }

        expect(popups.openErrorPopup).toHaveBeenCalledWith({
            params: {
                title: i18n.t(
                    'The TestOrg issuing service is currently unavailable.'
                ),
                subTitle: i18n.t('Please try again later.'),
                errorCode: 'upstream_unexpected_error',
                buttons: formButtons('upstream_unexpected_error'),
                email: '',
                errorReportId: expect.any(String)
            }
        });
    });

    it('Should return text from upstream_webhook_not_implemented exception', () => {
        try {
            throwVCLError({
                // @ts-ignore
                errorCode: 'upstream_webhook_not_implemented',
                context: {
                    organizationName: 'TestOrg',
                    organizationEmail: 'TestEmail'
                }
            });
        } catch (error) {
            errorHandlerPopup(error, null, false, undefined);

            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledTimes(1);
            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledWith(error, null);
        }

        expect(popups.openErrorPopup).toHaveBeenCalledWith({
            params: {
                title: i18n.t(
                    'The TestOrg issuing service is currently unavailable.'
                ),
                subTitle: i18n.t('Please try again later.'),
                errorCode: 'upstream_webhook_not_implemented',
                buttons: formButtons('upstream_webhook_not_implemented'),
                email: '',
                errorReportId: expect.any(String)
            }
        });
    });

    it('Should return text from upstream_unauthorized exception', () => {
        try {
            throwVCLError({
                // @ts-ignore
                errorCode: 'upstream_unauthorized',
                context: {
                    organizationName: 'TestOrg',
                    organizationEmail: 'TestEmail'
                }
            });
        } catch (error) {
            errorHandlerPopup(error, null, false, undefined);

            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledTimes(1);
            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledWith(error, null);
        }

        expect(popups.openErrorPopup).toHaveBeenCalledWith({
            params: {
                title: i18n.t(
                    'The TestOrg issuing service is currently unavailable.'
                ),
                subTitle: i18n.t('Please try again later.'),
                errorCode: 'upstream_unauthorized',
                buttons: formButtons('upstream_unauthorized'),
                email: '',
                errorReportId: expect.any(String)
            }
        });
    });

    it('Should return text from upstream_response_invalid exception', () => {
        try {
            throwVCLError({
                // @ts-ignore
                errorCode: 'upstream_response_invalid',
                context: {
                    organizationName: 'TestOrg',
                    organizationEmail: 'TestEmail'
                }
            });
        } catch (error) {
            errorHandlerPopup(error, null, false, undefined);

            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledTimes(1);
            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledWith(error, null);
        }

        expect(popups.openErrorPopup).toHaveBeenCalledWith({
            params: {
                title: i18n.t(
                    'The TestOrg issuing service is currently unavailable.'
                ),
                subTitle: i18n.t('Please try again later.'),
                errorCode: 'upstream_response_invalid',
                buttons: formButtons('upstream_response_invalid'),
                email: '',
                errorReportId: expect.any(String)
            }
        });
    });

    it('Should return text from upstream_network_error exception', () => {
        try {
            throwVCLError({
                // @ts-ignore
                errorCode: 'upstream_network_error',
                context: {
                    organizationName: 'TestOrg',
                    organizationEmail: 'TestEmail'
                }
            });
        } catch (error) {
            errorHandlerPopup(error, null, false, undefined);

            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledTimes(1);
            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledWith(error, null);
        }

        expect(popups.openErrorPopup).toHaveBeenCalledWith({
            params: {
                title: i18n.t(
                    'The TestOrg issuing service is currently unavailable.'
                ),
                subTitle: i18n.t('Please try again later.'),
                errorCode: 'upstream_network_error',
                buttons: formButtons('upstream_network_error'),
                email: '',
                errorReportId: expect.any(String)
            }
        });
    });

    it('Should return text from upstream_network_dns_error exception', () => {
        try {
            throwVCLError({
                // @ts-ignore
                errorCode: 'upstream_network_dns_error',
                context: {
                    organizationName: 'TestOrg',
                    organizationEmail: 'TestEmail'
                }
            });
        } catch (error) {
            errorHandlerPopup(error, null, false, undefined);

            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledTimes(1);
            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledWith(error, null);
        }

        expect(popups.openErrorPopup).toHaveBeenCalledWith({
            params: {
                title: i18n.t(
                    'The TestOrg issuing service is currently unavailable.'
                ),
                subTitle: i18n.t('Please try again later.'),
                errorCode: 'upstream_network_dns_error',
                buttons: formButtons('upstream_network_dns_error'),
                email: '',
                errorReportId: expect.any(String)
            }
        });
    });

    it('Should return text from offers_not_found_synch exception', () => {
        try {
            throwVCLError({
                // @ts-ignore
                errorCode: 'offers_not_found_synch',
                context: {
                    organizationName: 'TestOrg',
                    organizationEmail: 'TestEmail'
                }
            });
        } catch (error) {
            errorHandlerPopup(error, null, false, undefined);

            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledTimes(1);
            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledWith(error, null);
        }

        expect(popups.openErrorPopup).toHaveBeenCalledWith({
            params: {
                title: i18n.t('No offers found'),
                subTitle: i18n.t('TestOrg has no credential offers for you.'),
                errorCode: 'offers_not_found_synch',
                buttons: formButtons('offers_not_found_synch'),
                email: 'TestEmail',
                errorReportId: expect.any(String)
            }
        });
    });

    it('Should return text from upstream_user_not_found exception', () => {
        try {
            throwVCLError({
                // @ts-ignore
                errorCode: 'upstream_user_not_found',
                context: {
                    organizationName: 'TestOrg',
                    organizationEmail: 'TestEmail'
                }
            });
        } catch (error) {
            errorHandlerPopup(error, null, false, undefined);

            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledTimes(1);
            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledWith(error, null);
        }

        expect(popups.openErrorPopup).toHaveBeenCalledWith({
            params: {
                title: i18n.t('TestOrg could not identify you.'),
                subTitle: i18n.t(
                    'Try sharing other identity credentials (i.e., email, ID, phone, etc.).'
                ),
                errorCode: 'upstream_user_not_found',
                buttons: formButtons('upstream_user_not_found'),
                email: 'TestEmail',
                errorReportId: expect.any(String)
            }
        });
    });

    it('Should return text from offers_already_claimed_synch exception', () => {
        try {
            throwVCLError({
                // @ts-ignore
                errorCode: 'offers_already_claimed_synch',
                context: {
                    organizationName: 'TestOrg',
                    organizationEmail: 'TestEmail'
                }
            });
        } catch (error) {
            errorHandlerPopup(error, null, false, undefined);

            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledTimes(1);
            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledWith(error, null);
        }

        expect(popups.openErrorPopup).toHaveBeenCalledWith({
            params: {
                title: i18n.t('No new offers found'),
                subTitle: i18n.t(
                    'You have already claimed your credentials from TestOrg'
                ),
                errorCode: 'offers_already_claimed_synch',
                email: 'TestEmail',
                buttons: formButtons('offers_already_claimed_synch'),
                errorReportId: expect.any(String)
            }
        });
    });

    it('Should return text from integrated_identification_user_not_found exception', () => {
        try {
            throwVCLError({
                // @ts-ignore
                errorCode: 'integrated_identification_user_not_found',
                context: {
                    organizationName: 'TestOrg',
                    organizationEmail: 'TestEmail'
                }
            });
        } catch (error) {
            errorHandlerPopup(error, null, false, undefined);

            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledTimes(1);
            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledWith(error, null);
        }

        expect(popups.openErrorPopup).toHaveBeenCalledWith({
            params: {
                title: i18n.t('TestOrg could not identify you.'),
                subTitle: i18n.t(
                    'Try sharing other identity credentials (i.e., email, ID, phone, etc.).'
                ),
                errorCode: 'integrated_identification_user_not_found',
                email: 'TestEmail',
                buttons: formButtons('integrated_identification_user_not_found'),
                errorReportId: expect.any(String)
            }
        });
    });

    it('Should return text from presentation_credential_bad_issuer exception with credential type', () => {
        try {
            throwVCLError({
                // @ts-ignore
                errorCode: 'presentation_credential_bad_issuer',
                context: {
                    organizationName: 'TestOrg',
                    organizationEmail: 'TestEmail',
                    credentialType: 'Identity'
                }
            });
        } catch (error) {
            errorHandlerPopup(error, null, false, undefined);

            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledTimes(1);
            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledWith(error, null);
        }

        expect(popups.openErrorPopup).toHaveBeenCalledWith({
            params: {
                email: '',
                errorCode: 'presentation_credential_bad_issuer',
                subTitle:
                    'Please try verifying it again or use another ID credential',
                title: 'The Identity credential you are trying to share is not valid.',
                buttons: formButtons('presentation_credential_bad_issuers'),
                errorReportId: expect.any(String)
            }
        });
    });

    it('Should return text from presentation_credential_bad_issuer exception without credential type', () => {
        try {
            throwVCLError({
                // @ts-ignore
                errorCode: 'presentation_credential_bad_issuer',
                context: {
                    organizationName: 'TestOrg',
                    organizationEmail: 'TestEmail'
                }
            });
        } catch (error) {
            errorHandlerPopup(error, null, false, undefined);

            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledTimes(1);
            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledWith(error, null);
        }

        expect(popups.openErrorPopup).toHaveBeenCalledWith({
            params: {
                email: '',
                errorCode: 'presentation_credential_bad_issuer',
                subTitle:
                    'Please try verifying it again or use another ID credential',
                title: 'The credential you are trying to share is not valid.',
                buttons: formButtons('presentation_credential_bad_issuers'),
                errorReportId: expect.any(String)
            }
        });
    });

    it('Should return default title and subtitle when no usecases provided', () => {
        try {
            throwVCLError({
                // @ts-ignore
                errorCode: VCLErrorCode.MismatchedCredentialIssuerDid
            });
        } catch (error) {
            errorHandlerPopup(error, null, false, undefined);

            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledTimes(1);
            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledWith(error, null);
        }

        expect(popups.openErrorPopup).toHaveBeenCalledWith({
            params: {
                email: '',
                errorCode: VCLErrorCode.MismatchedCredentialIssuerDid,
                subTitle: '',
                title: 'This link is not valid.',
                buttons: formButtons(VCLErrorCode.MismatchedCredentialIssuerDid),
                errorReportId: expect.any(String)
            }
        });
    });

    it('Should return title and subtitle for deeplink usecase of mismatched_credential_issuer_did', () => {
        try {
            throwVCLError({
                // @ts-ignore
                errorCode: VCLErrorCode.MismatchedCredentialIssuerDid
            });
        } catch (error) {
            errorHandlerPopup(
                error,
                null,
                false,
                undefined,
                useCasesErrorsMapItems.linkIssuingInspection
            );

            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledTimes(1);
            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledWith(error, null);
        }

        expect(popups.openErrorPopup).toHaveBeenCalledWith({
            params: {
                email: '',
                errorCode: VCLErrorCode.MismatchedCredentialIssuerDid,
                title: 'This link is not valid.',
                subTitle: '',
                buttons: formButtons(VCLErrorCode.MismatchedCredentialIssuerDid),
                errorReportId: expect.any(String)
            }
        });
    });

    it('Should return title and subtitle for scan qr usecase of mismatched_credential_issuer_did', () => {
        try {
            throwVCLError({
                // @ts-ignore
                errorCode: VCLErrorCode.MismatchedCredentialIssuerDid
            });
        } catch (error) {
            errorHandlerPopup(
                error,
                null,
                false,
                undefined,
                useCasesErrorsMapItems.qrIssuingInspection
            );

            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledTimes(1);
            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledWith(error, null);
        }

        expect(popups.openErrorPopup).toHaveBeenCalledWith({
            params: {
                email: '',
                errorCode: VCLErrorCode.MismatchedCredentialIssuerDid,
                title: 'This QR code is not valid.',
                subTitle: '',
                buttons: formButtons(VCLErrorCode.MismatchedCredentialIssuerDid),
                errorReportId: expect.any(String)
            }
        });
    });

    it('Should return title and subtitle for deeplink usecase of mismatched_request_issuer_did', () => {
        try {
            throwVCLError({
                // @ts-ignore
                errorCode: VCLErrorCode.MismatchedRequestIssuerDid
            });
        } catch (error) {
            errorHandlerPopup(
                error,
                null,
                false,
                undefined,
                useCasesErrorsMapItems.linkIssuingInspection
            );

            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledTimes(1);
            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledWith(error, null);
        }

        expect(popups.openErrorPopup).toHaveBeenCalledWith({
            params: {
                email: '',
                errorCode: VCLErrorCode.MismatchedRequestIssuerDid,
                title: 'This link is not valid.',
                subTitle: '',
                buttons: formButtons(VCLErrorCode.MismatchedRequestIssuerDid),
                errorReportId: expect.any(String)
            }
        });
    });

    it('Should return title and subtitle for scan qr usecase of mismatched_request_issuer_did', () => {
        try {
            throwVCLError({
                // @ts-ignore
                errorCode: VCLErrorCode.MismatchedRequestIssuerDid
            });
        } catch (error) {
            errorHandlerPopup(
                error,
                null,
                false,
                undefined,
                useCasesErrorsMapItems.qrIssuingInspection
            );

            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledTimes(1);
            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledWith(error, null);
        }

        expect(popups.openErrorPopup).toHaveBeenCalledWith({
            params: {
                email: '',
                errorCode: VCLErrorCode.MismatchedRequestIssuerDid,
                title: 'This QR code is not valid.',
                subTitle: '',
                buttons: formButtons(VCLErrorCode.MismatchedRequestIssuerDid),
                errorReportId: expect.any(String)
            }
        });
    });

    it('Should return title and subtitle for deeplink usecase of mismatched_offer_issuer_did', () => {
        try {
            throwVCLError({
                // @ts-ignore
                errorCode: VCLErrorCode.MismatchedOfferIssuerDid
            });
        } catch (error) {
            errorHandlerPopup(
                error,
                null,
                false,
                undefined,
                useCasesErrorsMapItems.linkIssuingInspection
            );

            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledTimes(1);
            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledWith(error, null);
        }

        expect(popups.openErrorPopup).toHaveBeenCalledWith({
            params: {
                email: '',
                errorCode: VCLErrorCode.MismatchedOfferIssuerDid,
                title: 'This link is not valid.',
                subTitle: '',
                buttons: formButtons(VCLErrorCode.MismatchedOfferIssuerDid),
                errorReportId: expect.any(String)
            }
        });
    });

    it('Should return title and subtitle for scan qr usecase of mismatched_offer_issuer_did', () => {
        try {
            throwVCLError({
                // @ts-ignore
                errorCode: VCLErrorCode.MismatchedOfferIssuerDid
            });
        } catch (error) {
            errorHandlerPopup(
                error,
                null,
                false,
                undefined,
                useCasesErrorsMapItems.qrIssuingInspection
            );

            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledTimes(1);
            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledWith(error, null);
        }

        expect(popups.openErrorPopup).toHaveBeenCalledWith({
            params: {
                email: '',
                errorCode: VCLErrorCode.MismatchedOfferIssuerDid,
                title: 'This QR code is not valid.',
                subTitle: '',
                buttons: formButtons(VCLErrorCode.MismatchedOfferIssuerDid),
                errorReportId: expect.any(String)
            }
        });
    });

    it('Should return title and subtitle for deeplink usecase of mismatched_presentation_request_inspector_did', () => {
        try {
            throwVCLError({
                // @ts-ignore
                errorCode:
                    VCLErrorCode.MismatchedPresentationRequestInspectorDid
            });
        } catch (error) {
            errorHandlerPopup(
                error,
                null,
                false,
                undefined,
                useCasesErrorsMapItems.linkIssuingInspection
            );

            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledTimes(1);
            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledWith(error, null);
        }

        expect(popups.openErrorPopup).toHaveBeenCalledWith({
            params: {
                email: '',
                errorCode:
                    VCLErrorCode.MismatchedPresentationRequestInspectorDid,
                title: 'This link is not valid.',
                subTitle: '',
                buttons: formButtons(
                    VCLErrorCode.MismatchedPresentationRequestInspectorDid
                ),
                errorReportId: expect.any(String)
            }
        });
    });

    it('Should return title and subtitle for scan qr usecase of mismatched_presentation_request_inspector_did', () => {
        try {
            throwVCLError({
                // @ts-ignore
                errorCode:
                    VCLErrorCode.MismatchedPresentationRequestInspectorDid
            });
        } catch (error) {
            errorHandlerPopup(
                error,
                null,
                false,
                undefined,
                useCasesErrorsMapItems.qrIssuingInspection
            );

            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledTimes(1);
            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledWith(error, null);
        }

        expect(popups.openErrorPopup).toHaveBeenCalledWith({
            params: {
                email: '',
                errorCode:
                    VCLErrorCode.MismatchedPresentationRequestInspectorDid,
                title: 'This QR code is not valid.',
                subTitle: '',
                buttons: formButtons(
                    VCLErrorCode.MismatchedPresentationRequestInspectorDid
                ),
                errorReportId: expect.any(String)
            }
        });
    });
    it('Should return text from presentation_credential_bad_holder exception with credential type', () => {
        try {
            throwVCLError({
                // @ts-ignore
                errorCode: 'presentation_credential_bad_holder',
                context: {
                    organizationName: 'TestOrg',
                    organizationEmail: 'TestEmail',
                    credentialType: 'Identity'
                }
            });
        } catch (error) {
            errorHandlerPopup(error, null, false, undefined);

            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledTimes(1);
            expect(errorHandlerPopupLogger.logError).toHaveBeenCalledWith(error, null);
        }

        expect(popups.openErrorPopup).toHaveBeenCalledWith({
            params: {
                email: '',
                errorCode: 'presentation_credential_bad_holder',
                subTitle:
                    'Please try verifying it again or use another ID credential',
                title: 'The Identity credential you are trying to share is not valid.',
                buttons: formButtons('presentation_credential_bad_holder'),
                errorReportId: expect.any(String)
            }
        });
    });

});
