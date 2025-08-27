import appConfig from 'app/mocks/appConfig';
import {credentialCategories, displayDescriptorByType} from 'app/api/common.service';
import {walletApi, registrarApi} from 'app/api/api';

jest.mock('app/api/api');

const config = appConfig;
const mockGet = jest.fn();

afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
});

describe('common.service', () => {
    describe('credentialCategories', () => {
        it('should call walletApi with the correct URL', async () => {
            const expectedPath = '/api/v0.6/credential-categories';
            (walletApi as jest.Mock).mockReturnValue({get: mockGet});

            await credentialCategories(config);

            expect(walletApi).toHaveBeenCalledWith(config);
            expect(mockGet).toHaveBeenCalledWith(expectedPath);
        });
    });

    describe('displayDescriptorByType', () => {
        it('should call libApi with the correct URL', async () => {
            const kebabType = 'some-type';
            const expectedPath = `/display-descriptors/${kebabType}.descriptor.json`;
            const expectedData = {some: 'data'};
            (registrarApi as jest.Mock).mockReturnValue({get: mockGet});
            mockGet.mockResolvedValueOnce({
                data: expectedData
            });
            const result = await displayDescriptorByType(config, kebabType);

            expect(registrarApi(config).get).toHaveBeenCalledWith(expectedPath);
            expect(mockGet).toHaveBeenCalledWith(expectedPath);
            expect(result).toEqual(expectedData);
        });
    });
});
