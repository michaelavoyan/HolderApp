import {put, select, takeEvery} from 'redux-saga/effects';
import {map} from 'lodash/fp';
import {getOrganizationProfileInfoSuccess} from '../actions/common';
import {
    GetOrganizationProfileAction,
    OrganizationProfile,
    CredentialCategories
} from '../types/common';
import * as actions from '../actions';
import * as actionTypes from '../actionTypes/common';
import {credentialCategories} from '../../api/common.service';
import {IConfig} from '../types/appConfig';
import {configSelector} from '../selectors';
import {VclReactNativeSdkWrapper} from '../../api/vcl-react-native-sdk-wrapper';

export function* credentialCategoriesSaga() {
    try {
        const config: IConfig = yield select(configSelector);
        const resp: {data: CredentialCategories} = yield credentialCategories(
            config
        );
        yield put(
            actions.credentialCategoriesSuccess(
                map(
                    item => ({
                        ...item,
                        icon: `${config.baseUrls?.walletApi}/category-icons/${item.icon}.png`
                    }),
                    resp.data
                )
            )
        );
    } catch (error) {
        // TODO: add alert
        console.error(error);
    }
}

export function* getOrganizationProfileSaga({
    organizationDid
}: GetOrganizationProfileAction) {
    try {
        const organization: OrganizationProfile = yield VclReactNativeSdkWrapper.getVerifiedProfile(
            {did: organizationDid}
        );

        yield put(
            getOrganizationProfileInfoSuccess(organizationDid, organization)
        );
    } catch (e) {
        console.error(e);
    }
}

export function* commonSaga() {
    yield takeEvery(
        actionTypes.CREDENTIAL_CATEGORIES,
        credentialCategoriesSaga
    );

    yield takeEvery(
        actionTypes.GET_ORGANIZATION_PROFILE_INFO,
        getOrganizationProfileSaga
    );
}
