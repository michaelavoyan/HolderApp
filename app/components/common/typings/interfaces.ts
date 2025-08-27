import {VCLCredentialTypeSchema} from '@velocitycareerlabs/vcl-react-native';
import {uiFormSchemaProps} from '../../../store/types/vcl';

export interface SchemaFormReferenceI {
    reset: () => void;
    clearAll: () => void;
}

export interface SchemaFormI {
    uiSchema: uiFormSchemaProps | null;
    credentialTypeSchema: VCLCredentialTypeSchema;
    onSubmit(event: any): void;
    onChange?(
        isFormEmpty: boolean,
        event?: {params: {values: {[key: string]: string}}}
    ): void;
    onCancel(): void;
    buttonLabel?: string;
    formData?: object;
    customFormTheme?: object;
    type: string;
}
