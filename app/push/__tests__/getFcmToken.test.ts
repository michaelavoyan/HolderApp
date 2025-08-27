import messaging from '@react-native-firebase/messaging';

import {Platform} from 'react-native';
import { getFcmToken } from '../initializePush';

jest.mock('@react-native-firebase/messaging', () => ({
    __esModule: true,
    default: jest.fn(() => ({
        getAPNSToken: jest.fn(),
        getToken: jest.fn(),
    })),
}));

const getAPNSTokenMock = jest.fn();
const getTokenMock = jest.fn();

((messaging as unknown) as jest.Mock).mockImplementation(() => ({
    getAPNSToken: getAPNSTokenMock,
    getToken: getTokenMock,
}));

describe('getFcmToken', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        getAPNSTokenMock.mockResolvedValue('apns_token');
        getTokenMock.mockResolvedValue('firebase_token');
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should return the firebase token on non-iOS (skipping APNs)', async () => {
        Platform.OS = 'android';

        const token = await getFcmToken();

        expect(token).toBe('firebase_token');
        expect(getAPNSTokenMock).not.toHaveBeenCalled();
        expect(getTokenMock).toHaveBeenCalled();
    });

    it('should fetch APNs token and then firebase token on iOS when APNs token exists', async () => {
        Platform.OS = 'ios';

        const token = await getFcmToken();
        expect(token).toBe('firebase_token');
        expect(getAPNSTokenMock).toHaveBeenCalled();
        expect(getTokenMock).toHaveBeenCalled();
    });

    it('should retry when APNs token is missing on iOS and eventually succeed', async () => {
        Platform.OS = 'ios';

        getAPNSTokenMock.mockResolvedValueOnce(null).mockResolvedValueOnce('apns_token');
        const promise = getFcmToken(2);

        // Advance timers to trigger the setTimeout callback used for retrying
        jest.runAllTimers();

        const token = await promise;
        expect(token).toBe('firebase_token');
        expect(getAPNSTokenMock).toHaveBeenCalledTimes(2);
        expect(getTokenMock).toHaveBeenCalled();
    });

    it('should return an empty string and log error when getToken throws an error', async () => {
        Platform.OS = 'ios';

        getTokenMock.mockRejectedValue(new Error('Test error'));
        const token = await getFcmToken();
        expect(token).toBe('');
    });
});
