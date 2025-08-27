import AsyncStorage from '@react-native-async-storage/async-storage';
import {WALLETAPI_BASE_URL} from 'app/configs';
import {customUrlApi} from './api';
import {CACHED_CONFIG} from '../storage/constants';
import {vclLogger} from '../utilities/logger';
import {IConfig} from '../store/types/appConfig';

export const getAppConfig = async (): Promise<IConfig> => {
    try {
        const {data} = await customUrlApi(WALLETAPI_BASE_URL).get<IConfig>(
            '/api/v0.6/careerwallet/appconfig'
        );

        if (!data.baseUrls) {
            throw new Error('Config has no urls');
        }

        await AsyncStorage.setItem(CACHED_CONFIG, JSON.stringify(data));

        return data;
    } catch (e) {
        const storedValue = await AsyncStorage.getItem(CACHED_CONFIG);
        vclLogger.error(e, undefined, {
            extra: {asyncStorageStoredConfigValue: storedValue}
        });
        if (!storedValue) {
            throw new Error('Config is not cached');
        }
        return JSON.parse(storedValue);
    }
};
