import {WALLET_LINKEDIN_CLIENT_SECRET, WALLET_LINKEDIN_CLIENT_ID} from '@env';

export const LIKED_IN_CONFIG = {
    REDIRECT_URI: 'https://vnf-dev.us.auth0.com/u/login',
    CLIENT_SECRET: WALLET_LINKEDIN_CLIENT_SECRET || '',
    CLIENT_ID: WALLET_LINKEDIN_CLIENT_ID || ''
};

const initLinkedInLocalCredsIfNeeded = () => {
    if (
        LIKED_IN_CONFIG.CLIENT_ID === '' ||
        LIKED_IN_CONFIG.CLIENT_SECRET === ''
    ) {
        try {
            // eslint-disable-next-line import/extensions
            import('../../secrets.js')
                .then((secrets) => {
                    LIKED_IN_CONFIG.CLIENT_ID =
                        secrets.default.WALLET_LINKEDIN_CLIENT_ID;
                    LIKED_IN_CONFIG.CLIENT_SECRET =
                        secrets.default.WALLET_LINKEDIN_CLIENT_SECRET;
                })
                .catch(() => {});
        } catch (e) {
            console.error(e);
        }
    }
};

initLinkedInLocalCredsIfNeeded();
