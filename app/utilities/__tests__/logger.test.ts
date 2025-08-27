import {VCLError} from '@velocitycareerlabs/vcl-react-native';
import {getExtras} from '../logger';

describe('test logger', () => {

    describe('getExtras', () => {
        const DefaultErrorReportId = 'default-error-report-id';

        it('should return the requestId from the error object', async () => {
            const error = { requestId: '12345' } as VCLError;
            const result = getExtras(error, DefaultErrorReportId);

            expect(result).toEqual({
                errorReportId: '12345'
            });
        });

        it('should return the default errorReportId when requestId is not present', async () => {
            const error = {} as Error;
            const result = getExtras(error, DefaultErrorReportId);

            expect(result).toEqual({
                errorReportId: DefaultErrorReportId
            });
        });
    });
});