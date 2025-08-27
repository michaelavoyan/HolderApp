import {URL} from 'react-native-url-polyfill';
import React, {useEffect, useRef, useState} from 'react';
import {WebViewNavigationEvent} from 'react-native-webview/lib/WebViewTypes';
import uuid from 'react-native-uuid';
import {useNavigation} from '@react-navigation/core';
import {IConfig} from 'app/store/types/appConfig';
import {vclLogger} from 'app/utilities/logger';
import {VCL_ENVIRONMENT} from 'app/configs';
import {
    getLinkedinEmail,
    getLinkedinProfile,
    LINKEDIN_ENDPOINTS,
    LinkedInEmail
} from 'app/api/linkedin.service';
import {openNoInternetPopupIfOffline} from '../../../utilities/popups';

export interface GetTokenParams {
    code: string;
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    config: IConfig;
    onError: () => void;
    onSuccess: (token: string) => void;
}

export const useGetLinkedInToken = ({
    code,
    clientSecret,
    clientId,
    redirectUri,
    config,
    onError,
    onSuccess
}: GetTokenParams) => {
    React.useEffect(() => {
        if (!code) {
            return;
        }
        const linkedinEndpoints = config?.linkedinEndpoints;
        const getToken = async () => {
            try {
                if (clientId) {
                    const respToken = await fetch(
                        `${linkedinEndpoints?.authUrl}${LINKEDIN_ENDPOINTS.ACCESS_TOKEN}`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type':
                                    ' application/x-www-form-urlencoded'
                            },
                            body: String(
                                new URLSearchParams({
                                    code,
                                    redirect_uri: redirectUri,
                                    client_id: clientId,
                                    client_secret: clientSecret,
                                    grant_type: 'authorization_code'
                                })
                            )
                        }
                    );
                    const token = await respToken.json();
                    onSuccess(token.access_token);
                }
            } catch (e) {
                onError();
            }
        };

        getToken();
    }, [
        clientId,
        clientSecret,
        code,
        config?.linkedinEndpoints,
        onError,
        onSuccess,
        redirectUri
    ]);
};

interface GetCodeParams {
    clientId: string;
    redirectUri: string;
    config: IConfig;
    onError: (error: string) => void;
    onSuccess: (code: string) => void;
}

export const useGetLinkedInCode = ({
    onError,
    onSuccess,
    clientId,
    config,
    redirectUri
}: GetCodeParams) => {
    const [code, setCode] = useState<string>('');
    const stateRef = useRef<string>(uuid.v4() as string);

    const handleLoadStart = async (e: WebViewNavigationEvent) => {
        if (!e.nativeEvent.url.startsWith(redirectUri)) {
            return;
        }
        const url = new URL(e.nativeEvent.url);
        const error = url.searchParams.get('error');
        const codeValue = url.searchParams.get('code');
        const state = url.searchParams.get('state');

        if (error || !codeValue || state !== stateRef.current) {
            onError(error || '');
            return;
        }

        setCode(codeValue!);
        stateRef.current = uuid.v4() as string;

        onSuccess(codeValue);
    };

    const source = {
        method: 'GET',
        uri: `${config.linkedinEndpoints?.authUrl}${
            LINKEDIN_ENDPOINTS.AUTH
        }?${new URLSearchParams({
            response_type: 'code',
            client_id: clientId,
            redirect_uri: redirectUri,
            state: stateRef.current,
            scope: 'r_liteprofile r_emailaddress w_member_social'
        })}`
    };

    return {code, source, handleLoadStart};
};

interface RevokeTokenParams {
    token: string;
    clientId: string;
    clientSecret: string;
    config: IConfig;
}

export const revokeLinkedInToken = async ({
    token,
    clientId,
    clientSecret,
    config
}: RevokeTokenParams) => {
    await fetch(
        `${config.linkedinEndpoints?.authUrl}${LINKEDIN_ENDPOINTS.REVOKE}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': ' application/x-www-form-urlencoded'
            },
            body: String(
                new URLSearchParams({
                    client_id: clientId,
                    client_secret: clientSecret,
                    token
                })
            )
        }
    );
};

export const getEmailFromLinkedInProfile = (email: LinkedInEmail): string => {
    return email?.elements?.[0]?.['handle~']?.emailAddress || '';
};

export const useLinkedInProfileData = (
    config: IConfig,
    accessToken?: string
) => {
    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [error, setError] = useState<any>(null);
    const [id, setId] = useState<string>();
    const navigation = useNavigation();

    useEffect(() => {
        if (!accessToken) return;
        const timeout = setTimeout(() => {
            openNoInternetPopupIfOffline({
                onPress: navigation.goBack
            });
        }, 5000);

        getLinkedinEmail(config, accessToken)
            .then((res) => {
                if ('serviceErrorCode' in res) {
                    setError(res);
                    return;
                }
                setEmail(getEmailFromLinkedInProfile(res));
            })
            .catch(setError);

        getLinkedinProfile(config, accessToken)
            .then((res) => {
                if ('serviceErrorCode' in res) {
                    setError(res);
                    return;
                }
                setName(`${res.localizedFirstName} ${res.localizedLastName}`);
                setId(res.id);
                clearTimeout(timeout);
            })
            .catch(setError);
    }, [accessToken, config, navigation.goBack]);

    useEffect(() => {
        if (error) {
            vclLogger.error(
                `Linkedin profile data error (${VCL_ENVIRONMENT}) \n ${JSON.stringify(
                    {
                        ...error,
                        env: VCL_ENVIRONMENT
                    }
                )}  
                `
            );
        }
    }, [error]);

    return {name, email, error, id};
};

// https://docs.microsoft.com/en-gb/linkedin/consumer/integrations/self-serve/share-on-linkedin#create-an-image-share
export const publishImagePostOnLinkedIn = async ({
    accessToken,
    text,
    imageAltText,
    imageUri,
    config
}: {
    accessToken: string;
    text: string;
    imageAltText: string;
    imageUri: string;
    config: IConfig;
}): Promise<string> => {
    const timeout = setTimeout(() => {
        openNoInternetPopupIfOffline();
    }, 10000);
    // check if image uri is valid
    const fileToUpload = await fetch(imageUri);

    if (fileToUpload.status !== 200) {
        return '';
    }
    // 1. Get LinkedIn user id
    const userResp = await fetch(
        `${config.linkedinEndpoints?.apiUrl}${LINKEDIN_ENDPOINTS.ME}`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    );
    const {id} = await userResp.json();

    // 2. Register your image to be uploaded.
    const uploadLinkResp = await fetch(
        `${config.linkedinEndpoints?.apiUrl}${LINKEDIN_ENDPOINTS.REGISTER_UPLOAD}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Restli-Protocol-Version': '2.0.0',
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                registerUploadRequest: {
                    recipes: ['urn:li:digitalmediaRecipe:feedshare-image'],
                    owner: `urn:li:person:${id}`,
                    serviceRelationships: [
                        {
                            relationshipType: 'OWNER',
                            identifier: 'urn:li:userGeneratedContent'
                        }
                    ]
                }
            })
        }
    );
    const uploadLinkData = await uploadLinkResp.json();
    const imageData = {
        uploadUrl:
            uploadLinkData.value.uploadMechanism[
                'com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'
            ].uploadUrl,
        asset: uploadLinkData.value.asset
    };

    // 3. Upload your image to LinkedIn.

    const fileToUploadAsBlob = await fileToUpload.blob();
    await fetch(imageData.uploadUrl, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
        body: fileToUploadAsBlob
    });

    // 4. Create the image share.
    const postData = await fetch(
        `${config.linkedinEndpoints?.apiUrl}${LINKEDIN_ENDPOINTS.CREATE_POST}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Restli-Protocol-Version': '2.0.0',
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                author: `urn:li:person:${id}`,
                lifecycleState: 'PUBLISHED',
                specificContent: {
                    'com.linkedin.ugc.ShareContent': {
                        shareCommentary: {
                            text
                        },
                        shareMediaCategory: 'IMAGE',
                        media: [
                            {
                                status: 'READY',
                                description: {
                                    text: imageAltText
                                },
                                media: imageData.asset
                            }
                        ]
                    }
                },
                visibility: {
                    'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
                }
            })
        }
    );
    const postUrn = postData.headers.get('x-restli-id');

    clearTimeout(timeout);

    return getPostUrlByUrn(postUrn as string, config);
};

// https://docs.microsoft.com/en-gb/linkedin/consumer/integrations/self-serve/share-on-linkedin#create-a-text-share
export const publishTextPostOnLinkedIn = async ({
    accessToken,
    text,
    config
}: {
    accessToken: string;
    text: string;
    config: IConfig;
}): Promise<string> => {
    // 1. Get LinkedIn user id
    const userResp = await fetch(
        `${config.linkedinEndpoints?.apiUrl}${LINKEDIN_ENDPOINTS.ME}`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    );
    const {id} = await userResp.json();

    const postData = await fetch(
        `${config.linkedinEndpoints?.apiUrl}${LINKEDIN_ENDPOINTS.CREATE_POST}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Restli-Protocol-Version': '2.0.0',
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                author: `urn:li:person:${id}`,
                lifecycleState: 'PUBLISHED',
                specificContent: {
                    'com.linkedin.ugc.ShareContent': {
                        shareCommentary: {
                            text
                        },
                        shareMediaCategory: 'NONE'
                    }
                },
                visibility: {
                    'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
                }
            })
        }
    );
    const postUrn = postData.headers.get('x-restli-id');
    return getPostUrlByUrn(postUrn as string, config);
};

const getPostUrlByUrn = (urn: string, config: IConfig): string =>
    `${config.linkedinEndpoints?.addToFeed}/${urn}`;

export const getLinkedInAddToProfileLink = (params: {
    organizationName?: string;
    organizationId?: string;
    name?: string;
    issueYear?: string | number;
    issueMonth?: string | number;
    expirationYear?: string | number;
    expirationMonth?: string | number;
    certId?: string | number;
    certUrl?: string;
    config: IConfig;
}) => {
    const url = new URL(
        `${params.config.linkedinEndpoints?.addToProfileUrl}?startTask=CERTIFICATION_NAME`
    );
    (Object.keys(params) as Array<keyof typeof params>).forEach((key) => {
        const value = params[key] as string;
        if (!value) {
            return;
        }

        url.searchParams.set(key, String(value));
    });
    return url.toString();
};
