import {IConfig} from 'app/store/types/appConfig';
import {walletApi} from 'app/api/api';
import {sendFeedback} from 'app/api/feedback.service';

jest.mock('app/api/api');

const config = {
    baseUrls: {walletApi: ''}
} as IConfig;
const mockPost = jest.fn();

const feedBack = {
    appVersion: '1.0',
    accountId: '111',
    deviceManufacturer: 'apple',
    deviceModel: 'cool phone',
    deviceOS: 'ios111',
    errorCode: 'some_error',
    feedback: 'Test text.',
    ip: '1.1.1.1'
};

afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
});

describe('feedback.service', () => {
    it('should call walletApi with the correct URL', async () => {
        const expectedPath = '/api/v0.6/feedback';
        (walletApi as jest.Mock).mockReturnValue({post: mockPost});

        await sendFeedback(config, feedBack);

        expect(walletApi).toHaveBeenCalledWith(config);
        expect(mockPost).toHaveBeenCalledWith(expectedPath, feedBack);
    });
});
