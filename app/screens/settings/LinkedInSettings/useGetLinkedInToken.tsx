import React from 'react';
import {LINKEDIN_ENDPOINTS} from 'app/api/linkedin.service';
import {GetTokenParams} from './utils';

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
