import {publicVerificationApi} from './api';
import {IConfig} from '../store/types/appConfig';

export const revokeSharedDisclosure = async (
    config: IConfig,
    presentationId: string,
    exchangeId: string
) =>
    publicVerificationApi(config).post('/remove-credentials', {
        presentationId,
        exchangeId
    });
