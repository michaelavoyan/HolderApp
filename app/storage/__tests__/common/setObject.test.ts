import * as common from 'app/storage/common';
import { setObject } from 'app/storage/common';
import { vclLogger } from 'app/utilities/logger';

jest.mock('app/utilities/helpers', () => ({
    prepareObject: jest.fn(),
    fontFamily: jest.fn(() => ({})),
}));
jest.mock('app/utilities/logger', () => ({
    vclLogger: {
        info: jest.fn(),
        warn: jest.fn(),
        error: jest.fn(),
    },
}));
describe('setObject', () => {
    let mockRealm: any;

    beforeEach(() => {
        jest.clearAllMocks();
        mockRealm = {
            write: jest.fn(),
            create: jest.fn(),
        };
        jest.spyOn(common, 'getVCLRealmInstance').mockResolvedValue(mockRealm);
    });

    it('should create the object successfully and return true', async () => {
        const name = 'TestObject';
        const object = { id: 1, foo: 'bar' };

        const result = await setObject(name, object);

        if ((vclLogger.error as jest.Mock).mock.calls.length > 0) {
            console.error('Logged error:', (vclLogger.error as jest.Mock).mock.calls);
        }

        expect(result).toBe(true);
        expect(common.getVCLRealmInstance).toHaveBeenCalled();
        expect(mockRealm.write).toHaveBeenCalled();
    });

    it('should catch errors, log them, and return false', async () => {
        const error = new Error('Test error');
        mockRealm.write.mockImplementationOnce(() => {throw error;});

        const name = 'TestObject';
        const object = { id: 1, foo: 'bar' };

        const result = await setObject(name, object);

        expect(result).toBe(false);
        expect(vclLogger.error).toHaveBeenCalledWith(error);
    });
});
