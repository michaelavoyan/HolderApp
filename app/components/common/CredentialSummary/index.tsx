import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {CustomCheckBox} from '../CheckBox';
import {CredentialInfo} from '../CredentialInfo';
import {CredentialSummaryProps} from '../typings/types';

export const CredentialSummary: React.FC<CredentialSummaryProps> = ({
    checked,
    toggleCheckbox,
    ...props
}) => {
    const toggleCheckboxCallback = useCallback(() => {
        if (toggleCheckbox) {
            toggleCheckbox(props.item);
        }
    }, [props.item, toggleCheckbox]);

    const onCredentialDetailsCallback = useCallback(() => {
        props.onCredentialDetails();
    }, [props]);
    return (
        <View style={styles.container}>
            {toggleCheckbox ? (
                <View style={styles.checkBoxContainer}>
                    <CustomCheckBox
                        checked={Boolean(checked)}
                        toggleCheckbox={toggleCheckboxCallback}
                    />
                </View>
            ) : null}
            <View style={styles.credentialContainer}>
                <CredentialInfo
                    {...props}
                    onCredentialDetails={onCredentialDetailsCallback}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5
    },
    checkBoxContainer: {
        marginRight: 8
    },
    credentialContainer: {
        flex: 1
    }
});
