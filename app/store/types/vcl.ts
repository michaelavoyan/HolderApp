import {
    VCLCredentialType,
    VCLCredentialTypeSchemas,
    VCLCredentialTypesUIFormSchema
} from '@velocitycareerlabs/vcl-react-native';
import {DisplaySchema} from './claim';

export type VCLState = {
    credentialTypes: VCLCredentialType[];
    uiFormSchema: uiFormSchemaProps | null;
    credentialTypesSchemas: CredentialTypesSchemas | null;
    presentationSchemas: {items: {[schemaName: string]: DisplaySchema}};
};

export type GetCredentialTypesAction = {
    type: string;
};

export type GetCredentialTypesSchemasSuccessAction = {
    type: string;
    credentialTypesSchemas: CredentialTypesSchemas;
};

export type GetUISchemaFormAction = {
    type: string;
    credentialType: string;
};

export type GetUISchemaFormSuccessAction = {
    type: string;
    schema: uiFormSchemaProps;
};

export type GetCredentialTypesSuccessAction = {
    type: string;
    credentialTypes: VCLCredentialType[];
};

export type uiFormSchemaProps = VCLCredentialTypesUIFormSchema['payload'];

export type CredentialTypesSchemas = VCLCredentialTypeSchemas['all'];

export type GetPresentationSchemaAction = {
    type: string;
    credentialType: string;
};

export type GetPresentationSchemaSuccessAction = {
    type: string;
    credentialType: string;
    credentialSchema: DisplaySchema;
};

export interface LinkedInRules {
    shareInProfile: boolean;
    shareInFeed: boolean;
}
