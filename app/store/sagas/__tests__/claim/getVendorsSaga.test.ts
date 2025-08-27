import {call, put} from 'redux-saga/effects';
import {
    VCLOrganization,
    VCLOrganizations
} from '@velocitycareerlabs/vcl-react-native';
import {Vendor} from 'app/store/types/claim';
import * as VendorsSaga from '../../claim/getVendorsSaga';
import {
    vclOrganizationsList,
    vclOrganizationsListVendorsFormatted
} from '../../utils/mocks';
import * as actions from '../../../actions';

// eslint-disable-next-line func-names
jest.spyOn(VendorsSaga, 'fetchOrganizations').mockImplementation(function*() {
    yield call(() => {}); // Mock call effect
    return {all: vclOrganizationsList};
});

const types: string[] = [];
const type: string = '';
const query: string = '';

describe('getVendorsSaga positive and negative flows', () => {
    beforeEach(() => {
        jest.restoreAllMocks(); // Restore all mocks before each test case
    });

    it('getVendorsSaga should handle successful vendor fetch', () => {
        const generator = VendorsSaga.getVendorsSaga({types, type, query});

        expect(generator.next().value).toEqual(
            call(VendorsSaga.fetchOrganizations, query)
        );

        expect(
            generator.next({all: vclOrganizationsList} as VCLOrganizations)
                .value
        ).toEqual(
            call(
                VendorsSaga.handleGetVendorsSuccess,
                vclOrganizationsList,
                types
            )
        );

        expect(generator.next().done).toBe(true);
    });

    it('getVendorsSaga should handle vendor fetch error', () => {
        const error: Error = new Error('Failed to fetch vendors');

        const generator = VendorsSaga.getVendorsSaga({types, type, query});

        expect(generator.next().value).toEqual(
            call(VendorsSaga.fetchOrganizations, query)
        );

        expect(generator.throw(error).value).toEqual(
            call(VendorsSaga.handleGetVendorsError)
        );

        expect(generator.next().done).toBe(true);
    });

    describe('handleGetVendorsSuccess', () => {
        it('should dispatch getVendorsSuccess action with formatted vendors', () => {
            const getVendorsSuccessAction = actions.getVendorsSuccess(
                (vclOrganizationsListVendorsFormatted as unknown) as Vendor[]
            );

            const generator = VendorsSaga.handleGetVendorsSuccess(
                vclOrganizationsList,
                types
            );

            expect(generator.next().value).toEqual(
                put(getVendorsSuccessAction)
            );
            expect(generator.next().done).toBe(true);
        });

        it('should return early if organizations are empty', () => {
            const organizations: VCLOrganization[] = [];
            const emptyTypes: string[] = [];

            const generator = VendorsSaga.handleGetVendorsSuccess(
                organizations,
                emptyTypes
            );

            expect(generator.next().done).toBe(true);
        });
    });
});
