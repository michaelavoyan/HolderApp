import {DisplaySchema} from '../store/types/claim';
import {registrarApi, walletApi} from './api';
import {IConfig} from '../store/types/appConfig';

export const credentialCategories = (config: IConfig) =>
    walletApi(config).get('/api/v0.6/credential-categories');

export const displayDescriptorByType = (config: IConfig, kebabType: string) =>
registrarApi(config)
        .get<DisplaySchema>(`/display-descriptors/${kebabType}.descriptor.json`)
        .then(({data}) => data);
