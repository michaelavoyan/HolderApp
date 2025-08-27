import {Consent} from 'app/store/types/auth';

import {IConfig} from 'app/store/types/appConfig';
import {walletApi} from './api';

export const addConsentVersion = async (
    config: IConfig,
    version: number,
    accountId: string
): Promise<{consent: Consent}> =>
    walletApi(config)
        .post('/api/v0.6/careerwallet/consents/add', {
            version,
            accountId
        })
        .then(({data}) => data);

export const getConsentLatestVersion = async (
    config: IConfig,
    token?: string
): Promise<{consent: Consent}> =>
    walletApi(config, token)
        .get('/api/v0.6/careerwallet/consents/latest')
        .then(({data}) => data);
