import {VCLErrorCode} from '@velocitycareerlabs/vcl-react-native';

export const genericErrorsMap = {
    name: 'genericErrorsMap',
    cases: {
        unauthorized: {
            title: 'Authorization is invalid or has expired',
            subTitle: 'Contact the issuer for a new link or QR code.',
        },
        wrong_deeplink_protocol: {
            title: 'This link is not valid.'
        },
        disclosure_not_found: {
            title: 'Disclosures', // message will be updated in VL-4171
            subTitle: 'Disclosure is not found' // message will be updated in VL-4171
        },
        tenant_not_found: {
            title: 'The issuing service is currently unavailable.',
            subTitle: 'Please try again later.'
        },
        tenant_exchanges_key_missing: {
            title: 'The issuer is currently unavailable.',
            subTitle: 'Please try again later.'
        },
        invalid_presentation: {
            title: 'The issuing service is currently unavailable.',
            subTitle: 'Please try again later.'
        },
        upstream_offers_offer_id_missing: {
            title: 'Your credential offers could not be presented.',
            subTitle: 'Please try again later.'
        },
        vendor_error: {
            title: 'The {{organizationName}} issuing service is currently unavailable.',
            subTitle: 'Please try again later.',
            titleFallback: 'The issuing service is currently unavailable.'
        },
        upstream_offers_invalid: {
            title: 'Your credential offers could not be presented.',
            subTitle: 'Please try again later.'
        },
        upstream_user_not_found: {
            title: '{{organizationName}} could not identify you.',
            subTitle:
                'Try sharing other identity credentials (i.e., email, ID, phone, etc.).',
            titleFallback: 'The Issuer could not identify you'
        },
        integrated_identification_user_not_found: {
            title: '{{organizationName}} could not identify you.',
            subTitle:
                'Try sharing other identity credentials (i.e., email, ID, phone, etc.).',
            titleFallback: 'The Issuer could not identify you'
        },
        // Text message in holder app is diff Ask Nimrod for default value;
        exchange_invalid: {
            title: 'No offers found',
            subTitle: 'No credential offers were found by {{issuerName}}.',
            subTitleFallback: 'No credential offers were found.'
        },
        offers_not_found_synch: {
            title: 'No offers found',
            subTitle: '{{organizationName}} has no credential offers for you.',
            subTitleFallback: 'The Issuer has no credential offers for you.'
        },
        default_generate_offers: {
            title: '{{organizationName}} could not identify you',
            subTitle:
                'Please double-check your identity credentials and try again or contact the issuer directly.',
            titleFallback: 'The Issuer could not identify you'
        },
        default_kyc_error: {
            title: 'ID Verification could not be launched.',
            subTitle: 'Please try again later.'
        },
        // Add to Excel the file
        stop_searching_offers: {
            title: 'Searching for offers has stopped.',
            subTitle: 'Please search again.'
        },
        upstream_unexpected_error: {
            title: 'The {{organizationName}} issuing service is currently unavailable.',
            subTitle: 'Please try again later.',
            titleFallback: 'The issuing service is currently unavailable.'
        },
        upstream_webhook_not_implemented: {
            title: 'The {{organizationName}} issuing service is currently unavailable.',
            subTitle: 'Please try again later.',
            titleFallback: 'The issuing service is currently unavailable.'
        },
        upstream_unauthorized: {
            title: 'The {{organizationName}} issuing service is currently unavailable.',
            subTitle: 'Please try again later.',
            titleFallback: 'The issuing service is currently unavailable.'
        },
        upstream_response_invalid: {
            title: 'The {{organizationName}} issuing service is currently unavailable.',
            subTitle: 'Please try again later.',
            titleFallback: 'The issuing service is currently unavailable.'
        },
        upstream_network_error: {
            title: 'The {{organizationName}} issuing service is currently unavailable.',
            subTitle: 'Please try again later.',
            titleFallback: 'The issuing service is currently unavailable.'
        },
        upstream_network_dns_error: {
            title: 'The {{organizationName}} issuing service is currently unavailable.',
            subTitle: 'Please try again later.',
            titleFallback: 'The issuing service is currently unavailable.'
        },
        offers_already_claimed_synch: {
            title: 'No new offers found',
            subTitle:
                'You have already claimed your credentials from {{organizationName}}',
            subTitleFallback: 'You have already claimed your credential/s.'
        },
        default_verification_error: {
            title: 'Validation service is not available now.',
            subTitle: 'Please try again later.'
        },
        sdk_verified_profile_wrong_service_type: {
            title: 'The {{organizationName}} issuing service is unavailable.',
            titleFallback: 'The issuing service is unavailable.'
        },
        issuing_get_manifest_error: {
            title: 'Empty Credential Manifest'
        },
        invalid_vendor_id: {
            title: 'Your credential offers could not be presented.',
            subTitle: 'Please try again later.'
        },
        integrated_identification_rules_invalid: {
            title: 'The issuing service is currently unavailable. ',
            subTitle: 'Please try again later.'
        },
        default_generate_offers_error: {
            title: 'The list of credential offers could not be retrieved.',
            subTitle: 'Please try again later.'
        },
        default_finalize_offers_error: {
            title: 'The credentials could not be saved',
            subTitle: 'Try searching for credential offers again.'
        },
        linkedin_submit_presentation_error: {
            title: 'The credentials could not be disclosed.',
            subTitle: 'Please try again later.'
        },
        default_submit_presentation_error: {
            title: 'The credentials could not be disclosed.',
            subTitle: 'Please try again later.'
        },
        share_same_disclosure_error: {
            title: 
                'You have already disclosed these credentials with this organization.',
            subTitle: 'You may select other credentials.',
        },
        presentation_request_invalid: {
            title: 'This link is not valid.'
        },
        confirm_incorrect_code: {
            title: 'You entered an incorrect code.',
            subTitle: 'Please try again.'
        },
        invalid_credential_subject_context: {
            title: 'The credential offer could not be presented',
            subTitle:
                'We could not verify that the issuer is authorized to offer this credential.'
        },
        invalid_credential_subject_type: {
            title: 'The credential offer could not be presented',
            subTitle:
                'We could not verify that the issuer is authorized to offer this credential.'
        },
        issuer_requires_notary_permission: {
            title: 'The credential offer could not be presented ',
            subTitle: 'The issuer is not authorized to offer this credential'
        },
        presentation_credential_bad_issuer: {
            title: 'The {{credentialType}} credential you are trying to share is not valid.',
            subTitle:
                'Please try verifying it again or use another ID credential'
        },
        sdk_error: {
            title: 'An unexpected error has occurred.',
            subTitle: 'Please try again or let us know.'
        },
        presentation_credential_bad_holder: {
            title: 'The {{credentialType}} credential you are trying to share is not valid.',
            subTitle:
                'Please try verifying it again or use another ID credential'
        },
        preauth_vendorOriginContext_missing: {
            title: 'This link is not valid.'
        },
        [VCLErrorCode.MismatchedCredentialIssuerDid]: {
            title: 'This link is not valid.'
        },
        [VCLErrorCode.MismatchedOfferIssuerDid]: {
            title: 'This link is not valid.'
        },
        [VCLErrorCode.MismatchedPresentationRequestInspectorDid]: {
            title: 'This link is not valid.'
        },
        [VCLErrorCode.MismatchedRequestIssuerDid]: {
            title: 'This link is not valid.'
        },

        /**
         * This Error message is displayed by default, can be overridden for each particular use case
         */
        career_wallet_error: {
            title: 'An unexpected error has occurred.',
            subTitle: 'Please try again or let us know.'
        }
    }
};

type GenericErrorCodes = typeof genericErrorsMap;

export const useCasesErrorsMapItems = {
    qrIssuingInspection: {
        name: 'qrIssuingInspection',
        cases: {
            wrong_deeplink_protocol: {
                title: 'This QR code is not valid.'
            },
            tenant_not_found: {
                title: 'This QR code is not valid.'
            },
            // TODO: copy should be updated by Nimrod
            invalid_presentation: {
                title: 'This QR code is not valid.'
            },
            exchange_not_found: {
                title: 'This QR code is not valid.'
            },
            exchange_invalid: {
                title: 'This QR code has already been used.'
            },
            tenant_exchanges_key_missing: {
                title: 'This QR code is not valid.'
            },
            career_wallet_error: {
                title: 'This QR code is not valid.'
            },
            presentation_request_invalid: {
                title: 'This QR code is not valid.'
            },
            preauth_vendorOriginContext_missing: {
                title: 'This QR code is not valid.'
            },
            [VCLErrorCode.MismatchedCredentialIssuerDid]: {
                title: 'This QR code is not valid.'
            },
            [VCLErrorCode.MismatchedOfferIssuerDid]: {
                title: 'This QR code is not valid.'
            },
            [VCLErrorCode.MismatchedPresentationRequestInspectorDid]: {
                title: 'This QR code is not valid.'
            },
            [VCLErrorCode.MismatchedRequestIssuerDid]: {
                title: 'This QR code is not valid.'
            }
        }
    },
    linkIssuingInspection: {
        name: 'linkIssuingInspection',
        cases: {
            wrong_deeplink_protocol: {
                title: 'This link is not valid.'
            },
            tenant_not_found: {
                title: 'This link is not valid.'
            },
            // TODO: copy should be updated by Nimrod
            invalid_presentation: {
                title: 'This link is not valid.'
            },
            exchange_not_found: {
                title: 'This link is not valid.'
            },
            exchange_invalid: {
                title: 'This link has already been used.'
            },
            tenant_exchanges_key_missing: {
                title: 'This link is not valid.'
            },
            career_wallet_error: {
                title: 'This link is not valid.'
            },
            presentation_request_invalid: {
                title: 'This link is not valid.'
            },
            preauth_vendorOriginContext_missing: {
                title: 'This link is not valid.'
            },
            [VCLErrorCode.MismatchedCredentialIssuerDid]: {
                title: 'This link is not valid.'
            },
            [VCLErrorCode.MismatchedOfferIssuerDid]: {
                title: 'This link is not valid.'
            },
            [VCLErrorCode.MismatchedPresentationRequestInspectorDid]: {
                title: 'This link is not valid.'
            },
            [VCLErrorCode.MismatchedRequestIssuerDid]: {
                title: 'This link is not valid.'
            }
        }
    },
    inspection: {
        name: 'inspection',
        cases: {
            sdk_verified_profile_wrong_service_type: {
                title: 'The service is unavailable.'
            }
        }
    }
} as const;

export const ErrorCodesWithoutSendReportButton = [
    'offers_not_found_synch',
    'offers_already_claimed_synch',
    'integrated_identification_user_not_found',
    'upstream_offers_offer_id_missing',
    'upstream_user_not_found',
    'confirm_incorrect_code',
    'offers_not_found_asynch',
    'unauthorized',
];

export const isSendReportButtonVisible = (errorCode: string) => {
    return !ErrorCodesWithoutSendReportButton.includes(errorCode);
};

type UseCasesErrorCodes =
    (typeof useCasesErrorsMapItems)[keyof typeof useCasesErrorsMapItems]['cases'];

export type ErrorMapCases = Partial<
    Record<
        keyof GenericErrorCodes['cases'] | keyof UseCasesErrorCodes,
        {
            title: string;
            subTitle?: string;
        }
    >
>;

export type ErrorMapItems = {name?: string; cases?: ErrorMapCases};
