import {useCallback, useEffect, useState} from 'react';

import {useSelector} from 'react-redux';
import md5 from 'blueimp-md5';
import {VCLError} from '@velocitycareerlabs/vcl-react-native';

import {DisclosureSubtype} from 'app/store/types/disclosure';
import {getDataForLinkedIn} from 'app/components/CredentialDetails/useShareCredentialToLinkedIn';
import {HolderAppError} from 'app/utilities/error-handler/HolderAppError';
import {VCL_ENVIRONMENT} from 'app/configs';
import {
    configSelector,
    verificationServiceDeepLinkSelector,
    verificationServicePresentationLinkTemplateSelector
} from '../../store/selectors/appConfig';
import {onAcceptDisclosure} from '../../api/disclosure';
import {useCredentialSummaries} from '../../utilities/credential-values';
import {ClaimCredential} from '../../store/types/claim';
import {useGetDisclosurePresentationRequest} from '../../utilities/hooks/useGetDisclosurePresentationRequest';
import {errorHandlerPopup} from '../../utilities/error-handler/errorHandlerPopup';

export const useGetPostToLikedInDescripror = ({
    credential,
    accessToken,
    message
}: {
    credential: ClaimCredential;
    accessToken: string;
    message: string;
}) => {
    const {title, subTitle, logo} = useCredentialSummaries(credential);
    const config = useSelector(configSelector);

    const [postToLikedInDescripror, setPostToLikedInDescripror] =
        useState<any>(null);
    const [termsUrl, setTermsUrl] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<any>(true);
    const [error, sethasError] = useState<any>(false);

    const getDisclosurePresentationRequest =
        useGetDisclosurePresentationRequest();
    const deepLink = useSelector(verificationServiceDeepLinkSelector);
    const verificationServicePresentationLinkTemplate = useSelector(
        verificationServicePresentationLinkTemplateSelector
    );
    const fetchData = useCallback(async () => {
        return await getDataForLinkedIn(credential, title, subTitle, logo);
    }, [credential, logo, subTitle, title]);

    useEffect(() => {
        (async () => {
            try{
            const {disclosure, presentationRequest} =
                await getDisclosurePresentationRequest(deepLink);

            const acceptResult = await onAcceptDisclosure({
                disclosure,
                credentials: [{...credential, checked: true}],
                presentationRequest,
                subType: DisclosureSubtype.linkedin
            });

            const hash = md5(
                `${presentationRequest.iss}?e=${presentationRequest.exchangeId}&p=${acceptResult.disclosure.presentationId}`
            );
            const presentationUrl =
                verificationServicePresentationLinkTemplate.replace(
                    '{linkCode}',
                    hash
                );
            const credentialData = await fetchData();

            const descriptor = {
                accessToken,
                text: presentationUrl
                    ? `${message}\n${presentationUrl}`
                    : message,
                imageAltText: credentialData.issuerName,
                imageUri: credentialData.imgUrl,
                config
            };
            setTermsUrl(disclosure.termsUrl);
            setPostToLikedInDescripror(descriptor);
            setIsLoading(false);
        } catch (e) {
            if (e instanceof HolderAppError || e instanceof VCLError) {
                errorHandlerPopup(
                    e,
                    `Share to linkedin error (${VCL_ENVIRONMENT})\n${JSON.stringify(
                        {
                            ...(e as any),
                            env: VCL_ENVIRONMENT
                        }
                    )}`
                );
            } else {
                setIsLoading(false);
                sethasError(true);
            }
        }
        })();
    }, [
        credential,
        title,
        subTitle,
        logo,
        accessToken,
        message,
        verificationServicePresentationLinkTemplate,
        deepLink,
        getDisclosurePresentationRequest,
        config,
        fetchData
    ]);

    return {postToLikedInDescripror, isLoading, termsUrl, error};
};
