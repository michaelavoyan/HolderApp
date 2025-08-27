import {StackScreenProps} from '@react-navigation/stack';
import PhoneInput, {PhoneInputProps} from 'react-native-phone-number-input';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

import {useTheme} from 'react-native-elements';
import {find} from 'lodash/fp';
import * as RNLocalize from 'react-native-localize';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetStartedStepper} from 'app/components/GetStarted/GetStartedStepper';
import {AuthStackParamList} from 'app/navigation/StackParamsList';

import {
    identityCredentialsSelector,
    identityStepSelector
} from 'app/store/selectors';
import {IdentityCredentialTypeE} from 'app/store/types/claim';
import {GenericCodeField} from 'app/components/common/GenericCodeField';
import {ResendButton} from 'app/components/common/ResendButton';
import {changeIdentityStep, completeVerification} from 'app/store/actions';
import {
    AddIdentityInfoStepE,
    AddIdentityInfoTypeE
} from 'app/components/Profile/typings/types';
import {isIOS} from 'app/utilities/helpers';
import {useVerificationCodeExpiration} from 'app/utilities/hooks/useVerificationCodeExpiration';
import {closePopup, openStatusPopup} from '../../utilities/popups';
import {StatusMessages} from '../popups/type';
import {useVerificationCode} from '../../utilities/hooks/useVerificationCode';

type Props = StackScreenProps<
    AuthStackParamList,
    'GetStartedPhoneVerification'
>;
const CODE_LENGTH = 6;
const DEFAULT_CODE: PhoneInputProps['defaultCode'] =
    RNLocalize.getCountry() as PhoneInputProps['defaultCode'];

export const GetStartedPhoneVerification: React.FC<Props> = ({navigation}) => {
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [countryCode, setCountryCode] = useState<
        PhoneInputProps['defaultCode']
    >(DEFAULT_CODE === 'DO' ? 'DO1' : DEFAULT_CODE);
    const [phoneWithoutCode, setPhoneWithoutCode] = useState<string>('');
    const [isPhoneValid, setPhoneValid] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [isConfirmStep, setConfirmStep] = useState<boolean>(false);
    const phoneInputRef = useRef<PhoneInput | null>(null);
    const [valueToConfirm, setValueToConfirm] = useState<string>('');
    const [autoConfirm, setAutoConfirm] = useState<boolean>(false);
    const step: AddIdentityInfoStepE = useSelector(identityStepSelector);
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {
        theme: {
            colors: {inputBorderDark}
        }
    } = useTheme();

    const onResendCallback = () => {
        confirmIdentityInfo(phoneNumber);
        setValueToConfirm('');
        setAutoConfirm(false);
    };

    const {confirmIdentityInfo, onResendCode} = useVerificationCode(
        onResendCallback,
        AddIdentityInfoTypeE.Phone
    );

    const {checkIsCodeExpired} = useVerificationCodeExpiration(
        isConfirmStep,
        onResendCode
    );

    const resetIdentityStep = useCallback(
        () => dispatch(changeIdentityStep(AddIdentityInfoStepE.AddInfo)),
        [dispatch]
    );

    const onCreateMessageApprove = useCallback(() => {
        navigation.navigate('GetStartedEmailVerification');
        resetIdentityStep();
        setConfirmStep(false);
        setValueToConfirm('');
    }, [navigation, resetIdentityStep]);

    useEffect(() => {
        if (step === AddIdentityInfoStepE.Success) {
            AsyncStorage.setItem('isFirstLogin', '1');
            openStatusPopup({
                params: {
                    title: t('Phone number verified'),
                    text: ' ',
                    fullScreenMode: true,
                    withoutButtons: true,
                    statusType: StatusMessages.Done,
                    onPress: onCreateMessageApprove
                }
            });

            const timeout = setTimeout(() => {
                closePopup();
                onCreateMessageApprove();
            }, 2000);
            return () => clearTimeout(timeout);
        }
        return () => null;
    }, [dispatch, onCreateMessageApprove, step, t]);

    const existingPhones = useSelector((state: any) =>
        identityCredentialsSelector(state, [IdentityCredentialTypeE.Phone])
    );

    const onChangePhoneNumber = (value: string): void => {
        if (phoneInputRef.current?.getCountryCode()) {
            setCountryCode(phoneInputRef.current?.getCountryCode());
            setPhoneWithoutCode(
                value.replace(`+${phoneInputRef.current?.getCallingCode()}`, '')
            );
        }
        setPhoneNumber(value);
        setPhoneValid(!!phoneInputRef?.current?.isValidNumber(value));
        if (error.length > 0 && isPhoneValid) {
            setError('');
        }
    };

    const completeVerificationCb = useCallback(
        (verificationCode: string, value: string) =>
            dispatch(
                completeVerification({
                    value,
                    verificationCode,
                    field: AddIdentityInfoTypeE.Phone
                })
            ),
        [dispatch]
    );

    const addIdentityInfoSuccess = useCallback(
        (code: string) => {
            completeVerificationCb(code, phoneNumber);
        },
        [completeVerificationCb, phoneNumber]
    );

    const onConfirm = useCallback(() => {
        if (isConfirmStep) {
            addIdentityInfoSuccess(valueToConfirm);
        } else {
            const savedPhone = find(
                ['credentialSubject.phone', phoneNumber],
                existingPhones
            );
            if (
                phoneInputRef.current?.isValidNumber(phoneNumber) &&
                !savedPhone
            ) {
                confirmIdentityInfo(phoneNumber);
                setError('');
                setConfirmStep(true);
            } else if (savedPhone) {
                setError(t('Phone number is already exist.') || '');
            } else {
                setError(t('Phone number is not valid.') || '');
            }
        }
    }, [
        addIdentityInfoSuccess,
        confirmIdentityInfo,
        existingPhones,
        isConfirmStep,
        phoneNumber,
        t,
        valueToConfirm
    ]);

    const onSkip = () => {
        onCreateMessageApprove();
    };

    const onCancel = () => {
        if (isConfirmStep) {
            setConfirmStep(false);
        } else {
            navigation.goBack();
        }
    };

    useEffect(() => {
        if (autoConfirm && valueToConfirm.length === CODE_LENGTH) {
            onConfirm();
            setAutoConfirm(false);
        }
    }, [autoConfirm, onConfirm, valueToConfirm.length]);

    return (
        <SafeAreaView style={[styles.container]}>
            <GetStartedStepper
                stepsNumber={3}
                currentStepNumber={2}
                mainHeading={
                    isConfirmStep
                        ? t('Enter verification code')
                        : t('Verify your phone number')
                }
                stepDescription={
                    isConfirmStep
                        ? t(
                              'The verification code was sent to {{phoneNumber}}',
                              {
                                  phoneNumber: `${phoneNumber.substr(
                                      0,
                                      3
                                  )}********${phoneNumber.substr(8)}`
                              }
                          )
                        : t(
                              'Enter a valid phone number.\nA verification code will be sent to this number.'
                          )
                }
                onConfirm={checkIsCodeExpired(onConfirm)}
                onCancel={onCancel}
                isFormValid={
                    (isPhoneValid && !isConfirmStep) ||
                    valueToConfirm.length === CODE_LENGTH
                }
                skipStepText="Verify phone later"
                onSkip={onSkip}>
                {!isConfirmStep ? (
                    <>
                       {/* @ts-ignore */}
                        <PhoneInput
                            ref={phoneInputRef}
                            defaultValue={phoneWithoutCode}
                            defaultCode={countryCode}
                            layout="first"
                            onChangeFormattedText={onChangePhoneNumber}
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
                        />
                        {error.length > 0 && (
                            <Text style={styles.error}>{error}</Text>
                        )}
                    </>
                ) : (
                    <>
                        <GenericCodeField
                            rootStyle={styles.code}
                            value={valueToConfirm}
                            cellCount={CODE_LENGTH}
                            setValue={setValueToConfirm}
                            setAutoConfirm={setAutoConfirm}
                        />
                        <ResendButton
                            containerStyle={styles.resend}
                            onPress={onResendCode}
                            title={t('Resend verification code')}
                        />
                    </>
                )}
            </GetStartedStepper>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
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
    },
    resend: {
        marginTop: 20
    },
    code: {
        marginTop: 45
    }
});
