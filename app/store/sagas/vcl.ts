import {put, select, takeEvery} from 'redux-saga/effects';
import {filter, find} from 'lodash/fp';
import {pickBy} from 'lodash';
import {
    VCLCredentialType,
    VCLCredentialTypeSchemas,
    VCLCredentialTypesUIFormSchema
} from '@velocitycareerlabs/vcl-react-native';
import * as RNLocalize from 'react-native-localize';
import {vclLogger} from 'app/utilities/logger';
import {displayDescriptorByType} from '../../api/common.service';
import {DisplaySchema} from '../types/claim';
import * as actionTypes from '../actionTypes/vcl';
import * as actions from '../actions';
import {GetPresentationSchemaAction, GetUISchemaFormAction} from '../types/vcl';
import {openOfflineModeAwareErrorPopup} from '../../utilities/popups';

import i18n from '../../i18n';
import {kebabCredentialType} from '../../utilities/helpers';
import {IConfig} from '../types/appConfig';
import {configSelector} from '../selectors';
import {VclReactNativeSdkWrapper} from '../../api/vcl-react-native-sdk-wrapper';

function* getCredentialTypesAndSchemasEffect() {
    try {
        const credentialTypes: {
            all: VCLCredentialType[];
        } = yield VclReactNativeSdkWrapper.getCredentialTypes();
        const recommendedTypes = filter(
            'payload.recommended',
            credentialTypes.all
        );
        yield put(actions.getCredentialTypesSuccess(credentialTypes.all));

        const credentialTypesSchemas: VCLCredentialTypeSchemas = yield VclReactNativeSdkWrapper.getCredentialTypeSchemas();
        const recommendedSchemas = pickBy(
            credentialTypesSchemas.all,
            (val, key) => find(['schemaName', key], recommendedTypes)
        );
        yield put(actions.getCredentialTypesSchemasSuccess(recommendedSchemas));
    } catch (error) {
        vclLogger.error(
            `VCL getCredentialTypesAndSchemasEffect error: ${JSON.stringify(
                error
            )}`
        );
        openOfflineModeAwareErrorPopup({
            title: i18n.t('Error'),
            subTitle: i18n.t('Self-reporting is not available')
        });
    }
}

function* getUISchemaFormEffect({credentialType}: GetUISchemaFormAction) {
    try {
        const countryCode: string = RNLocalize.getCountry();
        const uiSchema: VCLCredentialTypesUIFormSchema = yield VclReactNativeSdkWrapper.getCredentialTypesUIFormSchema(
            {
                credentialType,
                countryCode
            }
        );
        yield put(actions.getUIFormSchemaSuccess(uiSchema.payload));
    } catch (error) {
        vclLogger.error(
            `VCL SDK getUISchemaFormEffect error: ${JSON.stringify(error)}`
        );
        openOfflineModeAwareErrorPopup({
            title: i18n.t('Error'),
            subTitle: i18n.t('Self-reporting is not available')
        });
    }
}

export function* getPresentationSchemaEffect({
    credentialType
}: GetPresentationSchemaAction) {
    const kebabType = kebabCredentialType(credentialType);
    const config: IConfig = yield select(configSelector);
    const credentialSchema: DisplaySchema = yield displayDescriptorByType(
        config,
        kebabType
    );

    yield put(
        actions.getPresentationSchemaSuccess(credentialType, credentialSchema)
    );
}

export function* vclSaga() {
    yield takeEvery(
        actionTypes.GET_CREDENTIAL_TYPES_AND_SCHEMAS,
        getCredentialTypesAndSchemasEffect
    );
    yield takeEvery(actionTypes.GET_UI_FORM_SCHEMA, getUISchemaFormEffect);
    yield takeEvery(
        actionTypes.GET_PRESENTATION_SCHEMA,
        getPresentationSchemaEffect
    );
}
