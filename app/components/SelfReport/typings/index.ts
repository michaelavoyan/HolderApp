import {VCLCredentialTypeSchema} from '@velocitycareerlabs/vcl-react-native';
import {uiFormSchemaProps} from 'app/store/types/vcl';
import {SavedSelfReportCredential} from '../../../store/types/profile';

export type SelfReportScreenProps = {
    onSubmit(event: {params: {values: {[key: string]: string}}}): void;
    onChange?(
        isFormEmpty: boolean,
        event?: {params: {values: {[key: string]: string}}}
    ): void;
    onCancel(): void;
    uiSchema: uiFormSchemaProps | null;
    credentialTypeSchema?: VCLCredentialTypeSchema;
    type: string;
    isEditMode: boolean;
    credential?: SavedSelfReportCredential;
};
