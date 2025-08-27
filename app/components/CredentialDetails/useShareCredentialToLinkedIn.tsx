import {useCallback} from 'react';
import {useSelector} from 'react-redux';
import {noop} from 'lodash';
import {getOr, intersection} from 'lodash/fp';
import md5 from 'blueimp-md5';
import {useTranslation} from 'react-i18next';

import {VclMixpanel} from 'app/mixpanel/VclMixpanel';
import {getIssuerDid} from 'app/utilities/credential';
import {DisclosureSubtype} from 'app/store/types/disclosure';
import {getLinkedinEmail} from 'app/api/linkedin.service';
import {useDisclosureTutorial} from 'app/utilities/hooks/useDisclosureTutorial';
import {getLinkedInAccessToken} from '../../storage/asyncStorage';
import {
    PopupScreens,
    RootStackParamList
} from '../../navigation/StackParamsList';
import {
    configSelector,
    verificationServiceDeepLinkSelector,
    verificationServicePresentationLinkTemplateSelector
} from '../../store/selectors/appConfig';
import {onAcceptDisclosure} from '../../api/disclosure';
import {
    closePopup,
    openLoadingPopup,
    openShareToLinkedInPopup
} from '../../utilities/popups';
import {ShareToLinkedInItem} from '../../screens/popups/type';
import {AlertTextProps, authorityTypes} from '../common/typings/types';
import {useCredentialSummaries} from '../../utilities/credential-values';
import {ClaimCredential} from '../../store/types/claim';
import {useGetDisclosurePresentationRequest} from '../../utilities/hooks/useGetDisclosurePresentationRequest';
import {jwtDecode} from '../../jwt/core';
import {LinkedInRules} from '../../store/types/vcl';
import {errorHandlerPopup} from '../../utilities/error-handler/errorHandlerPopup';
import {navigate} from '../../navigation/utils';
import {VclReactNativeSdkWrapper} from '../../api/vcl-react-native-sdk-wrapper';

const useShareCredentialToLinkedIn = ({
    credential,
    linkedInRules,
    isOffer,
    onDelete,
    goBack
}: RootStackParamList['CredentialDetails'] & {
    linkedInRules: LinkedInRules;
}) => {
    const deepLink = useSelector(verificationServiceDeepLinkSelector);
    const verificationServicePresentationLinkTemplate = useSelector(
        verificationServicePresentationLinkTemplateSelector
    );
    const {t} = useTranslation();

    const {title, subTitle, logo} = useCredentialSummaries(credential);
    const config = useSelector(configSelector);
    const {setShowDisclosureTutorial} = useDisclosureTutorial();

    const getDisclosurePresentationRequest =
        useGetDisclosurePresentationRequest();

    return useCallback(async () => {
        try {
            const token = await getLinkedInAccessToken();
            const email = await getLinkedinEmail(config, token);

            if (!token || 'serviceErrorCode' in email) {
                navigate({
                    name: 'SettingsTab',
                    params: {
                        screen: 'LinkedIn',
                        params: {
                            onSuccess: () => {
                                navigate({
                                    name: 'CredentialDetails',
                                    params: {
                                        credential,
                                        isOffer,
                                        onDelete,
                                        goBack,
                                        isShareToLinkedInOpen: true
                                    }
                                });
                            },
                            fromShare: true
                        }
                    }
                });
                return;
            }

            openLoadingPopup({
                params: {
                    title: t('Loading...')
                }
            });

            const presentation =
                await getDisclosurePresentationRequest(deepLink);

            const {disclosure, presentationRequest} = presentation;

            closePopup(PopupScreens.LOADING_POPUP);

            openShareToLinkedInPopup({
                params: {
                    onSubmitDisclosure: async () => {
                        const acceptResult = await onAcceptDisclosure({
                            disclosure,
                            credentials: [{...credential, checked: true}],
                            presentationRequest,
                            subType: DisclosureSubtype.linkedin
                        });


                        const hash = md5(
                            `${presentationRequest.iss}?e=${presentationRequest.exchangeId}&p=${acceptResult.disclosure.presentationId}`
                        );

                        return {url: verificationServicePresentationLinkTemplate.replace(
                            '{linkCode}',
                            hash
                        ), hash};
                    },
                    triggerMixpanel: (shareType: string, linkCode: string) => {
                        VclMixpanel.trackShareToLinkedin({
                            CredentialType: credential.type,
                            CredentialShared: credential.id,
                            ShareType: shareType,
                            LinkCode: linkCode,
                        });
                    },
                    onCancel: noop,
                    credential: await getDataForLinkedIn(
                        credential,
                        title,
                        subTitle,
                        logo
                    ),
                    linkedInRules,
                    termsUrl: disclosure.termsUrl
                }
            });
        } catch (error) {
            closePopup(PopupScreens.LOADING_POPUP);
            setShowDisclosureTutorial(true);
            errorHandlerPopup(
                error,
                `Share Linkedin credentials error - ${JSON.stringify(error)}`,
                true
            );
        }
    }, [
        config,
        t,
        getDisclosurePresentationRequest,
        deepLink,
        credential,
        title,
        subTitle,
        logo,
        linkedInRules,
        isOffer,
        onDelete,
        goBack,
        verificationServicePresentationLinkTemplate,
        setShowDisclosureTutorial
    ]);
};

export default useShareCredentialToLinkedIn;

export const getErrorMessage = (error: AlertTextProps | string) =>
    typeof error === 'string' ? error : error.title;

enum CredentialTypes {
    'OpenBadgeV2.0' = 'OpenBadgeV2.0',
    'OpenBadgeV1.0' = 'OpenBadgeV1.0',
    'BadgeV1.1' = 'BadgeV1.1',
    OpenBadgeCredential = 'OpenBadgeCredential',
    'LicenseV1.1' = 'LicenseV1.1',
    'LicenseV1.0' = 'LicenseV1.0',
    'CertificationV1.1' = 'CertificationV1.1',
    'CertificationV1.0' = 'CertificationV1.0'
}

// This feature is supposed to use mainly for category Certification & Licenses,
// So detailed information collection is based on fields from Certification scheme
// for LinkedIn the only required field is 'name'
export const getDataForLinkedIn = async (
    credential: ClaimCredential,
    title?: string,
    subTitle?: string,
    logo?: string
): Promise<ShareToLinkedInItem> => {
    const validFrom = getIssueDate(credential);
    const validUntil = getExpirationDate(credential);

    return {
        issuerName: getIssuerName(credential),
        issuerLinkedInId: await getLinkedInId(credential),
        name: getName(credential) || subTitle,
        imgUrl: logo || credential.logo || credential.issuer.logo || '',
        issueYear: Number(validFrom[0]) || undefined,
        issueMonth: Number(validFrom[1]) || undefined,
        expirationYear: Number(validUntil[0]) || undefined,
        expirationMonth: Number(validUntil[1]) || undefined,
        certId: getCredentialID(credential)
    };
};

const getIssuerName = (credential: ClaimCredential): string => {
    if (
        intersection(credential.type, [
            CredentialTypes['CertificationV1.1'],
            CredentialTypes['LicenseV1.1']
        ]).length
    ) {
        return getOr('', 'credentialSubject.authority.name', credential);
    }

    if (
        intersection(credential.type, [
            CredentialTypes['OpenBadgeV2.0'],
            CredentialTypes['OpenBadgeV1.0'],
            CredentialTypes['BadgeV1.1']
        ]).length
    ) {
        return getOr(
            '',
            'credentialSubject.hasCredential.issuer.name',
            credential
        );
    }

    if (credential.type.includes(CredentialTypes.OpenBadgeCredential)) {
        return getOr('', 'issuer.name', credential);
    }

    return credential.issuer.name || '';
};

const getName = (credential: ClaimCredential): string => {
    if (
        intersection(credential.type, [
            CredentialTypes['CertificationV1.1'],
            CredentialTypes['CertificationV1.0'],
            CredentialTypes['LicenseV1.1'],
            CredentialTypes['LicenseV1.0']
        ]).length
    ) {
        return getOr('', 'credentialSubject.name', credential);
    }

    if (credential.type.includes(CredentialTypes['OpenBadgeV2.0'])) {
        return getOr('', 'credentialSubject.hasCredential.name', credential);
    }

    if (
        intersection(credential.type, [
            CredentialTypes['BadgeV1.1'],
            CredentialTypes['OpenBadgeV1.0']
        ]).length
    ) {
        return getOr('', 'credentialSubject.hasCredential.name', credential);
    }

    if (credential.type.includes(CredentialTypes.OpenBadgeCredential)) {
        return getOr('', 'credentialSubject.achievement.name', credential);
    }

    return '';
};

const getIssueDate = (credential: ClaimCredential): Array<number> => {
    if (
        intersection(credential.type, [
            CredentialTypes['OpenBadgeV2.0'],
            CredentialTypes['BadgeV1.1'],
            CredentialTypes['OpenBadgeV1.0'],
            CredentialTypes.OpenBadgeCredential
        ]).length
    ) {
        // TODO: should be taken from a credential in order not to decode again
        const iat = getOr('', 'claimsSet.iat', jwtDecode(credential.jwt || ''));

        if (!iat) {
            return [];
        }

        const date = new Date(iat * 1000);
        return [date.getUTCFullYear(), date.getUTCMonth() + 1];
    }

    if (
        intersection(credential.type, [
            CredentialTypes['CertificationV1.1'],
            CredentialTypes['CertificationV1.0'],
            CredentialTypes['LicenseV1.1'],
            CredentialTypes['LicenseV1.0']
        ]).length
    ) {
        return getOr(
            '',
            'credentialSubject.validity.firstValidFrom',
            credential
        ).split('-');
    }

    return getOr('', 'credentialSubject.validity.validFrom', credential).split(
        '-'
    );
};

const getExpirationDate = (credential: ClaimCredential): Array<number> => {
    if (
        intersection(credential.type, [
            CredentialTypes['OpenBadgeV2.0'],
            CredentialTypes['BadgeV1.1'],
            CredentialTypes.OpenBadgeCredential
        ]).length
    ) {
        const exp = getOr('', 'claimsSet.exp', jwtDecode(credential.jwt || ''));

        if (!exp) {
            return [];
        }

        const date = new Date(exp * 1000);

        return [date.getUTCFullYear(), date.getUTCMonth() + 1];
    }

    return getOr('', 'credentialSubject.validity.validUntil', credential).split(
        '-'
    );
};

const getCredentialID = (credential: ClaimCredential): string => {
    if (
        intersection(credential.type, [
            CredentialTypes['OpenBadgeV2.0'],
            CredentialTypes['OpenBadgeV1.0'],
            CredentialTypes['BadgeV1.1']
        ]).length
    ) {
        return getOr('', 'credentialSubject.hasCredential.id', credential);
    }

    if (credential.type.includes(CredentialTypes.OpenBadgeCredential)) {
        return '';
    }

    return getOr('', 'credentialSubject.identifier', credential);
};

const getLinkedInId = async (credential: ClaimCredential) => {
    const issuer = await VclReactNativeSdkWrapper.getVerifiedProfile({
        did: getIssuerDid(credential) || ''
    });
    const issuerLinkedInAuthority = getOr(
        [],
        'payload.credentialSubject.registrationNumbers',
        issuer
    ).find((item: any) => item.authority === authorityTypes.LinkedIn);
    return issuerLinkedInAuthority?.number || '';
};
