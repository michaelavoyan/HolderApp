import {IConfig} from 'app/store/types/appConfig';

export interface LinkedInEmail {
    elements: Array<{
        'handle~': {
            emailAddress: string;
        };
    }>;
}

export interface LinkedInProfile {
    id: string;
    localizedFirstName: string;
    localizedLastName: string;
    profilePicture: {
        'displayImage~': {
            elements: Array<{identifiers: Array<{identifier: string}>}>;
        };
    };
}

export const LINKEDIN_ENDPOINTS = {
    AUTH: '/authorization',
    ACCESS_TOKEN: '/accessToken',
    REVOKE: '/revoke',
    ME: '/me?projection=(id,localizedFirstName,localizedLastName,profilePicture(displayImage~digitalmediaAsset:playableStreams))',
    EMAIL: '/emailAddress?q=members&projection=(elements*(handle~))',
    REGISTER_UPLOAD: '/assets?action=registerUpload',
    CREATE_POST: '/ugcPosts'
};

export const getLinkedinEmail = (
    config: IConfig,
    accessToken: string | null
) => {
    return fetch(
        `${config.linkedinEndpoints?.apiUrl}${LINKEDIN_ENDPOINTS.EMAIL}`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    ).then<LinkedInEmail>((res) => res.json());
};

export const getLinkedinProfile = (
    config: IConfig,
    accessToken: string | null
) => {
    return fetch(
        `${config.linkedinEndpoints?.apiUrl}${LINKEDIN_ENDPOINTS.ME}`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    ).then<LinkedInProfile>((res) => res.json());
};
