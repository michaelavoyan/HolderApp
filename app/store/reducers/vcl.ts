import {VCLCredentialType} from '@velocitycareerlabs/vcl-react-native';
import {set, assign} from 'lodash/fp';
import {
    GetPresentationSchemaSuccessAction,
    GetCredentialTypesSchemasSuccessAction,
    GetUISchemaFormSuccessAction,
    VCLState
} from '../types/vcl';
import {GenericAction, reducingFunction} from '../helpers/createReducer';
import * as actionTypes from '../actionTypes/vcl';

const initialState: VCLState = {
    credentialTypes: [],
    uiFormSchema: null,
    credentialTypesSchemas: null,
    presentationSchemas: {
        items: {}
    }
};

const getCredentialTypesSuccess = ({
    credentialTypes
}: {
    credentialTypes: VCLCredentialType[];
}) => set('credentialTypes', credentialTypes);

const clearUISchema = () => set('uiFormSchema', null);

const clearCredentialTypesAndSchemas = (_: any, state: VCLState) =>
    assign(state, {credentialTypesSchemas: null, credentialTypes: []});

const getSchemaSuccess = ({schema}: GetUISchemaFormSuccessAction) =>
    set('uiFormSchema', schema);

const getCredentialTypesSchemasSuccess = ({
    credentialTypesSchemas
}: GetCredentialTypesSchemasSuccessAction) =>
    set('credentialTypesSchemas', credentialTypesSchemas);

const getPresentationSchemaSuccess = ({
    credentialSchema,
    credentialType
}: GetPresentationSchemaSuccessAction) => {
    return set(
        ['presentationSchemas', 'items', credentialType],
        credentialSchema
    );
};

const actionReducers = {
    [actionTypes.GET_CREDENTIAL_TYPES_SUCCESS]: getCredentialTypesSuccess,
    [actionTypes.GET_CREDENTIAL_TYPES_AND_SCHEMAS]: clearCredentialTypesAndSchemas,
    [actionTypes.GET_CREDENTIAL_TYPES_SCHEMAS_SUCCESS]: getCredentialTypesSchemasSuccess,
    [actionTypes.GET_UI_FORM_SCHEMA]: clearUISchema,
    [actionTypes.GET_UI_FORM_SCHEMA_SUCCESS]: getSchemaSuccess,
    [actionTypes.GET_PRESENTATION_SCHEMA_SUCCESS]: getPresentationSchemaSuccess
};

export const vclReducer = (
    state = initialState,
    action: GenericAction
): VCLState => reducingFunction<VCLState>(actionReducers, state, action);
