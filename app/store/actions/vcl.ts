import {VCLCredentialType} from '@velocitycareerlabs/vcl-react-native';
import {DisplaySchema} from '../types/claim';
import * as actionTypes from '../actionTypes/vcl';
import {
    CredentialTypesSchemas,
    GetCredentialTypesAction,
    GetCredentialTypesSchemasSuccessAction,
    GetCredentialTypesSuccessAction,
    GetPresentationSchemaSuccessAction,
    GetUISchemaFormAction,
    GetUISchemaFormSuccessAction,
    uiFormSchemaProps
} from '../types/vcl';

export const getCredentialTypesAndSchemas = (): GetCredentialTypesAction => ({
    type: actionTypes.GET_CREDENTIAL_TYPES_AND_SCHEMAS
});

export const getCredentialTypesSuccess = (
    credentialTypes: VCLCredentialType[]
): GetCredentialTypesSuccessAction => ({
    type: actionTypes.GET_CREDENTIAL_TYPES_SUCCESS,
    credentialTypes
});

export const getUIFormSchema = ({
    credentialType
}: {
    credentialType: string;
}): GetUISchemaFormAction => ({
    type: actionTypes.GET_UI_FORM_SCHEMA,
    credentialType
});

export const getUIFormSchemaSuccess = (
    schema: uiFormSchemaProps
): GetUISchemaFormSuccessAction => ({
    type: actionTypes.GET_UI_FORM_SCHEMA_SUCCESS,
    schema
});

export const getCredentialTypesSchemasSuccess = (
    credentialTypesSchemas: CredentialTypesSchemas
): GetCredentialTypesSchemasSuccessAction => ({
    type: actionTypes.GET_CREDENTIAL_TYPES_SCHEMAS_SUCCESS,
    credentialTypesSchemas
});

export const getPresentationSchema = (credentialType: string) => ({
    type: actionTypes.GET_PRESENTATION_SCHEMA,
    credentialType
});

export const getPresentationSchemaSuccess = (
    credentialType: string,
    credentialSchema: DisplaySchema
): GetPresentationSchemaSuccessAction => ({
    type: actionTypes.GET_PRESENTATION_SCHEMA_SUCCESS,
    credentialType,
    credentialSchema
});
