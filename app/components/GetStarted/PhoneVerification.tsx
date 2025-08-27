import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import PhoneInput, {PhoneInputProps} from 'react-native-phone-number-input';
import * as RNLocalize from 'react-native-localize';
import {useTheme} from 'react-native-elements';
import {GetStartedStepper} from 'app/components/GetStarted/GetStartedStepper';
import {isIOS} from 'app/utilities/helpers';

const DEFAULT_CODE: PhoneInputProps['defaultCode'] = RNLocalize.getCountry() as PhoneInputProps['defaultCode'];

export const PhoneVerification: React.FC<{
    onChangePhoneNumber: (value: string, valid?: boolean) => void;
    isFormValid?: boolean;
    error?: string;
    onConfirm: () => void;
    onCancel: () => void;
}> = ({
    onChangePhoneNumber,
    onCancel,
    onConfirm,
    isFormValid = true,
    error = ''
}) => {
    const {
        theme: {
            colors: {inputBorderDark}
        }
    } = useTheme();

    const [countryCode, setCountryCode] = useState<
        PhoneInputProps['defaultCode']
    >(DEFAULT_CODE);
    const phoneInputRef = useRef<PhoneInput | null>(null);
    const {t} = useTranslation();

    const onChangePhoneNumberCallback = useCallback(
        (value: string) => {
            if (phoneInputRef.current?.getCountryCode()) {
                setCountryCode(phoneInputRef.current?.getCountryCode());
            }
            onChangePhoneNumber(
                value,
                phoneInputRef?.current?.isValidNumber(value)
            );
        },
        [onChangePhoneNumber]
    );

    return (
        <GetStartedStepper
            stepsNumber={3}
            currentStepNumber={2}
            stepHeading={t('Verify your phone number')}
            stepDescription={t(
                'Enter a valid phone number.\nA verification code will be sent to this number.'
            )}
            onConfirm={onConfirm}
            onCancel={onCancel}
            isFormValid={isFormValid}>
            {/* @ts-ignore */}
            <PhoneInput
                ref={phoneInputRef}
                defaultCode={countryCode}
                layout="first"
                onChangeFormattedText={onChangePhoneNumberCallback}
                containerStyle={{
                    ...styles.phoneInput
                }}
                textContainerStyle={{
                    ...styles.textContainerStyle,
                    borderBottomColor: inputBorderDark
                }}
                countryPickerButtonStyle={{
                    ...styles.countryPickerButtonStyle,
                    borderBottomColor: inputBorderDark
                }}
                codeTextStyle={styles.codeTextStyle}
                textInputStyle={styles.textInputStyle}
                autoFocus
            />
            {error.length > 0 && <Text style={styles.error}>{error}</Text>}
        </GetStartedStepper>
    );
};

const styles = StyleSheet.create({
    input: {
        marginBottom: 10
    },
    inputStyle: {
        fontSize: 14,
        paddingHorizontal: 15,
        letterSpacing: 0.8
    },
    codeTextStyle: {
        fontWeight: 'normal'
    },
    textInputStyle: {
        fontWeight: 'normal'
    },
    phoneInput: {
        width: '100%',
        fontSize: 14,
        letterSpacing: 0.8,
        marginTop: 30,
        marginBottom: 25,
        backgroundColor: 'transparent'
    },
    textContainerStyle: {
        borderBottomWidth: 1,
        paddingVertical: isIOS ? 17 : 0,
        marginLeft: 10,
        backgroundColor: 'transparent'
    },
    countryPickerButtonStyle: {
        borderBottomWidth: 1
    },
    phoneStyle: {
        paddingHorizontal: 0
    },
    flagStyle: {
        height: 16,
        width: 25
    },
    error: {
        color: 'red',
        marginTop: -15
    }
});
