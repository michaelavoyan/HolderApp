import React from 'react';
import {StyleSheet, Keyboard} from 'react-native';
import {KeyboardAwareScrollWrapper} from 'app/components/common/KeyboardAwareScrollWrapper';
import {SchemaFormContainer} from '../common/SchemaForm/SchemaFormContainer';
import {SelfReportScreenProps} from './typings';
import {CredentialContainer} from '../CredentialDetails/CredentialContainer';
import {SchemaFormReferenceI} from '../common/typings/interfaces';

export const SelfReportScreen = React.forwardRef<
    SchemaFormReferenceI,
    SelfReportScreenProps
>(({isEditMode, credential, credentialTypeSchema, ...props}, ref) => (
    <KeyboardAwareScrollWrapper
        onScrollBeginDrag={Keyboard.dismiss}
        enableResetScrollToCoords={false}
        contentContainerStyle={styles.contentContainer}>
        {!isEditMode && credential && (
            <CredentialContainer
                credentialObject={credential}
                toggleSaveVisibility={() => undefined}
            />
        )}
        {(isEditMode || !credential) && credentialTypeSchema && (
            <SchemaFormContainer
                ref={ref}
                formData={credential?.credentialSubject}
                credentialTypeSchema={credentialTypeSchema}
                buttonLabel={isEditMode ? 'Update' : 'Add'}
                {...props}
            />
        )}
    </KeyboardAwareScrollWrapper>
));

const styles = StyleSheet.create({
    contentContainer: {
        paddingVertical: 20,
        paddingHorizontal: 24
    }
});
