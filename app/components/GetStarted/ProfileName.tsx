import React from 'react';
import {useTranslation} from 'react-i18next';
import {Keyboard, StyleSheet} from 'react-native';
import {GenericInput} from 'app/components/common/GenericInput';
import {GetStartedStepper} from 'app/components/GetStarted/GetStartedStepper';
import {useImagePicker} from 'app/utilities/custom-hooks';
import {AndroidImageModal} from 'app/components/common/AndroidImageModal';
import {ProfileImage} from '../common/ProfileImage/ProfileImage';

export const ProfileName: React.FC<{
    onChangeName: (value: string) => void;
    isFormValid?: boolean;
    showStepper?: boolean;
    stepHeading?: string;
    stepDescription?: string;
    onConfirm: () => void;
    onCancel: () => void;
    onAddPress: (value: string) => void;
    uri: string;
    mainHeading?: string;
    error?: string;
    onFocus?: () => void;
}> = ({
    onCancel,
    onChangeName,
    onConfirm,
    isFormValid = false,
    showStepper = true,
    stepHeading = '',
    stepDescription = 'You can also add a photo.\nYour profile name and photo will never be shared with anyone.',
    mainHeading,
    onAddPress,
    uri,
    error,
    onFocus
}) => {
    const {
        showPicker,
        onCloseAndroidModal,
        options,
        isDeleteAvailable,
        androidModal
    } = useImagePicker(onAddPress);
    const {t} = useTranslation();
    return (
        <>
            <AndroidImageModal
                open={androidModal}
                onClose={onCloseAndroidModal}
                options={options}
                isDeleteAvailable={isDeleteAvailable}
            />
            <GetStartedStepper
                stepsNumber={3}
                currentStepNumber={1}
                showStepper={showStepper}
                stepHeading={stepHeading}
                stepDescription={t(stepDescription)}
                mainHeading={mainHeading}
                onConfirm={() => {
                    Keyboard.dismiss();
                    onConfirm();
                }}
                onCancel={onCancel}
                isFormValid={isFormValid}>
                <GenericInput
                    onChangeText={onChangeName}
                    containerStyle={styles.input}
                    label={t('Profile name*')}
                    autoCapitalize="words"
                    error={error}
                    onFocus={onFocus}
                />
                <ProfileImage onPress={showPicker} imageUrl={uri} />
            </GetStartedStepper>
        </>
    );
};

const styles = StyleSheet.create({
    input: {
        marginBottom: 25
    }
});
