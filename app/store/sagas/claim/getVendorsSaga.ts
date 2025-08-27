import {get, isEmpty} from 'lodash/fp';
import {put, call} from 'redux-saga/effects';
import {
    VCLServiceType,
    VCLOrganizations,
    VCLOrganization
} from '@velocitycareerlabs/vcl-react-native';
import {parseVendorObject} from 'app/store/helpers/common';
import {VendorsAction} from 'app/store/types/claim';
import {openStatusPopup} from 'app/utilities/popups';
import {ERRORS} from '../errors/claim';
import * as actions from '../../actions';
import {VclReactNativeSdkWrapper} from '../../../api/vcl-react-native-sdk-wrapper';

export function* fetchOrganizations(
    query: string
): Generator<any, VCLOrganizations, any> {
    return yield call(VclReactNativeSdkWrapper.searchForOrganizations, {
        filter: {
            serviceTypes: [VCLServiceType.Issuer, VCLServiceType.NotaryIssuer]
        },
        sort: [['profile.name,ASC']],
        query,
        page: {
            // fix for https://velocitycareerlabs.atlassian.net/browse/VL-1283
            size: '250'
        }
    });
}

export function* handleGetVendorsSuccess(
    organizations: VCLOrganization[],
    types: string[]
): Generator<any, void, any> {
    if (isEmpty(organizations)) {
        return;
    }

    const formattedVendors = parseVendorObject(organizations, types);

    yield put(actions.getVendorsSuccess(formattedVendors));
}

export function* handleGetVendorsError(): Generator<any, void, any> {
    yield call(openStatusPopup, {params: ERRORS.getVendors});
}

export function* getVendorsSaga({
    types,
    query
}: VendorsAction): Generator<any, void, any> {
    try {
        const response: VCLOrganizations = yield call(
            fetchOrganizations,
            query
        );
        const organizations = get('all', response);
        yield call(handleGetVendorsSuccess, organizations, types);
    } catch (error) {
        yield call(handleGetVendorsError);
    }
}
