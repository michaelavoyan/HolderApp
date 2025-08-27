import {isSendReportButtonVisible} from '../errorsMap';

describe('utils test', () => {
    it('confirm_incorrect_code return true', () => {
        expect(isSendReportButtonVisible('confirm_incorrect_code')).toBe(false);
    });

    it('upstream_user_not_found return true', () => {
        expect(isSendReportButtonVisible('upstream_user_not_found')).toBe(false);
    });

    it('integrated_identification_user_not_found return true', () => {
        expect(isSendReportButtonVisible('integrated_identification_user_not_found')).toBe(false);
    });

    it('offers_not_found_asynch return true', () => {
        expect(isSendReportButtonVisible('integrated_identification_user_not_found')).toBe(false);
    });

    it('offers_not_found_synch return true', () => {
        expect(isSendReportButtonVisible('integrated_identification_user_not_found')).toBe(false);
    });

    it('unauthorized return true', () => {
        expect(isSendReportButtonVisible('unauthorized')).toBe(false);
    });

    it('some string return false', () => {
        expect(isSendReportButtonVisible('some string')).toBe(true);
    });
});