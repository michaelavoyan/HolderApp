import AsyncStorage from '@react-native-async-storage/async-storage';
import appConfig from 'app/mocks/appConfig';
import axios from 'axios';
import * as api from 'app/api/api';
import {getAppConfig} from 'app/api/config.service';

jest.mock('@react-native-async-storage/async-storage');

const data = appConfig;
const setItemSpy = jest.spyOn(AsyncStorage, 'setItem');
const getItemSpy = jest.spyOn(AsyncStorage, 'getItem');
const customUrlApiMock = jest.spyOn(api, 'customUrlApi');
const customUrlApiGetMock = jest.spyOn(axios, 'get');
jest.mock('axios');

describe('getAppConfig', () => {
    beforeAll(() => {
        (axios.create as jest.Mock).mockReturnThis();
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return appConfig and cache it', async () => {
        setItemSpy.mockResolvedValue(undefined);

        getItemSpy.mockResolvedValue(JSON.stringify(data));

        (axios.get as jest.Mock).mockResolvedValueOnce({data});

        const result = await getAppConfig();

        expect(result).toEqual(data);
        expect(setItemSpy).toHaveBeenCalled();
    });

    it('should call API with correct urls', async () => {
        const result = await getAppConfig();

        expect(result).toEqual(data);
        expect(customUrlApiMock).toHaveBeenCalledWith(
            'https://devwalletapi.velocitycareerlabs.io'
        );
        expect(customUrlApiGetMock).toHaveBeenCalledWith(
            '/api/v0.6/careerwallet/appconfig'
        );
    });

    it('should throw error ifConfig has no urls', async () => {
        getItemSpy.mockResolvedValue(null);
        customUrlApiGetMock.mockRejectedValueOnce(
            new Error('Something went wrong')
        );
        await expect(getAppConfig()).rejects.toThrow('Config is not cached');
    });
    it('should throw error if API call fails and no cache exists', async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({});
        await expect(getAppConfig()).rejects.toThrow('Config is not cached');
    });
});
