import {put, takeEvery} from 'redux-saga/effects';
import i18n from '../../i18n';
import * as actionTypes from '../actionTypes/appConfig';
import * as actions from '../actions';
import {getAppConfig} from '../../api/config.service';
import {IConfig} from '../types/appConfig';
import {openGenericPopup} from '../../utilities/popups';
import {vclLogger} from '../../utilities/logger';

function* getConfigSaga() {
    try {
        const data: IConfig = yield getAppConfig();
        yield put(actions.getAppConfigSuccess(data));
    } catch (error) {
        openGenericPopup({
            params: {
                title: i18n.t('The application has failed to load.'),
                description: i18n.t('Please try again later.')
            }
        });
        vclLogger.error(error);
    }
}

export function* appConfigSaga() {
    yield takeEvery(actionTypes.GET_APP_CONFIG, getConfigSaga);
}
