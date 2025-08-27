import React from 'react';
import {useTranslation} from 'react-i18next';
import {GetStartedStepper} from 'app/components/GetStarted/GetStartedStepper';
import {EmailField} from 'app/components/common/EmailField';

export const EmailVerification: React.FC<{
    onChangeText: (value: string) => void;
    value: string;
    error?: string;
    isFormValid?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    onInputBlur?: () => void;
}> = ({
    onChangeText,
    value,
    isFormValid = true,
    onCancel,
    onConfirm,
    error,
    onInputBlur
}) => {
    const {t} = useTranslation();
    return (
        <GetStartedStepper
            stepsNumber={3}
            currentStepNumber={3}
            stepHeading={t('Verify your email')}
            stepDescription={t(
                'A verification code will be sent to this email.'
            )}
            onConfirm={onConfirm}
            onCancel={onCancel}
            isFormValid={isFormValid}>
            <EmailField
                value={value}
                onChangeText={onChangeText}
                error={error}
                onBlur={onInputBlur}
            />
        </GetStartedStepper>
    );
};
