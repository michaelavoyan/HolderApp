import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {GetStartedStepper} from 'app/components/GetStarted/GetStartedStepper';
import {GenericCodeField} from 'app/components/common/GenericCodeField';
import {ResendButton} from 'app/components/common/ResendButton';

export const CodeVerification: React.FC<{
    value: string;
    setValue: (value: string) => void;
    resend: () => void;
    isFormValid?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    stepHeading: string;
    stepDescription: string;
}> = ({
    value,
    setValue,
    resend,
    isFormValid = true,
    onCancel,
    onConfirm,
    stepHeading,
    stepDescription
}) => {
    const {t} = useTranslation();
    return (
        <GetStartedStepper
            stepsNumber={3}
            currentStepNumber={3}
            stepHeading={stepHeading}
            stepDescription={stepDescription}
            onConfirm={onConfirm}
            onCancel={onCancel}
            isFormValid={isFormValid}>
            <GenericCodeField
                rootStyle={styles.code}
                value={value}
                cellCount={6}
                setValue={setValue}
            />
            <ResendButton
                containerStyle={styles.resend}
                onPress={resend}
                title={t('Resend verification code')}
            />
        </GetStartedStepper>
    );
};

const styles = StyleSheet.create({
    resend: {
        marginTop: 20
    },
    code: {
        marginTop: 45
    }
});
