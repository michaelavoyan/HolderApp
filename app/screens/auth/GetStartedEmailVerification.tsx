import {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {SafeAreaView, StyleSheet} from 'react-native';
import {find} from 'lodash/fp';
import {useDispatch, useSelector} from 'react-redux';
import {AuthStackParamList} from 'app/navigation/StackParamsList';
import {GetStartedStepper} from 'app/components/GetStarted/GetStartedStepper';
import {
    identityCredentialsSelector,
    identityStepSelector,
    userSelector
} from 'app/store/selectors';
import {IdentityCredentialTypeE} from 'app/store/types/claim';
import {GenericCodeField} from 'app/components/common/GenericCodeField';
import {ResendButton} from 'app/components/common/ResendButton';
import {
    addUser,
    completeVerification,
    updateIsBiometryGetStartedError
} from 'app/store/actions';
import {
    AddIdentityInfoStepE,
    AddIdentityInfoTypeE
} from 'app/components/Profile/typings/types';
import {EmailField} from 'app/components/common/EmailField';
import {validateEmail} from 'app/utilities/validation/validate-utils';
import {FullUser} from 'app/store/types/auth';
import {useVerificationCodeExpiration} from 'app/utilities/hooks/useVerificationCodeExpiration';
import {openStatusPopup} from '../../utilities/popups';
import {StatusMessages} from '../popups/type';
import {useVerificationCode} from '../../utilities/hooks/useVerificationCode';
import {isBiometryGetStartedErrorSelector} from '../../store/selectors/auth';

type Props = StackScreenProps<
    AuthStackParamList,
    'GetStartedEmailVerification'
>;
const CODE_LENGTH = 6;

export const GetStartedEmailVerification: React.FC<Props> = ({navigation}) => {
    const [email, setEmail] = useState<string>('');
    const [isEmailValid, setEmailValid] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [isConfirmStep, setConfirmStep] = useState<boolean>(false);
    const [valueToConfirm, setValue] = useState<string>('');
    const [userAddingInProgress, setUserAddingInProgress] =
        useState<boolean>(false);
    const [isEmptyScreen, setIsEmptyScreen] = useState<boolean>(false);
    const isBiometryError: boolean = useSelector(
        isBiometryGetStartedErrorSelector
    );
    const step: AddIdentityInfoStepE = useSelector(identityStepSelector);
    const existingEmails = useSelector((state: any) =>
        identityCredentialsSelector(state, [IdentityCredentialTypeE.Email])
    );
    const dispatch = useDispatch();
    const newUser: FullUser = useSelector(userSelector);

    const {t} = useTranslation();

    const onResendCallback = () => {
        setValue('');
        confirmIdentityInfo(email);
    };

    const {confirmIdentityInfo, onResendCode} = useVerificationCode(
        onResendCallback,
        AddIdentityInfoTypeE.Email
    );

    const {checkIsCodeExpired} = useVerificationCodeExpiration(
        isConfirmStep,
        onResendCode
    );

    const addUserCb = useCallback(
        ({
            fullUser,
            closePopupAfterBiometry
        }: {
            fullUser: FullUser;
            closePopupAfterBiometry?: boolean;
        }) =>
            dispatch(
                addUser({
                    user: fullUser,
                    withSelectPersona: true,
                    getStartedFlow: true,
                    closePopupAfterBiometry
                })
            ),
        [dispatch]
    );

    const onCreateMessageApprove = useCallback(
        ({
            timeout
        }: Partial<{
            timeout: ReturnType<typeof setTimeout>;
        }> = {}) => {
            if (timeout) {
                clearTimeout(timeout);
            }
            addUserCb({fullUser: newUser, closePopupAfterBiometry: true});
        },
        [addUserCb, newUser]
    );

    useEffect(() => {
        if (isEmptyScreen && isBiometryError) {
            setIsEmptyScreen(false);
        }
    }, [isBiometryError, isEmptyScreen]);

    useEffect(() => {
        if (
            email.length &&
            step === AddIdentityInfoStepE.Success &&
            !userAddingInProgress
        ) {
            setUserAddingInProgress(true);
            const timeout = setTimeout(() => {
                onCreateMessageApprove();
            }, 2000);

            openStatusPopup({
                params: {
                    title: t('Email verified'),
                    text: ' ',
                    statusType: StatusMessages.Done,
                    fullScreenMode: true,
                    withoutButtons: true,
                    withoutGoBack: true,
                    onPress: () =>
                        onCreateMessageApprove({
                            timeout
                        }),
                    onUnmount: () => clearTimeout(timeout)
                }
            });
            setIsEmptyScreen(true);
        }
    }, [
        addUserCb,
        dispatch,
        email,
        newUser,
        onCreateMessageApprove,
        step,
        userAddingInProgress,
        t
    ]);

    const onSkip = () => {
        addUserCb({fullUser: newUser});
    };

    const onChangeEmail = (value: string): void => {
        setEmail(value);
        setEmailValid(validateEmail(value));
        if (error.length > 0 && isEmailValid) {
            setError('');
        }
    };

    const onConfirm = () => {
        if (isBiometryError && userAddingInProgress) {
            setIsEmptyScreen(true);
            addUserCb({fullUser: {...newUser, id: ''}});
            return;
        }

        if (isConfirmStep) {
            setEmailValid(false);
            addIdentityInfoSuccess(valueToConfirm);
        } else {
            const savedEmail = find(
                ['credentialSubject.email', email],
                existingEmails
            );
            if (isEmailValid && !savedEmail) {
                confirmIdentityInfo(email);
                setError('');
                setConfirmStep(true);
            } else if (savedEmail) {
                setError(`${t('Email is already exist.')}`);
            } else {
                setError(`${t('Email is not valid.')}`);
            }
        }
    };

    const onCancel = () => {
        if (isBiometryError) {
            dispatch(updateIsBiometryGetStartedError(false));
        }

        if (isConfirmStep) {
            setConfirmStep(false);
        } else {
            navigation.goBack();
        }
    };

    const completeVerificationCb = useCallback(
        (verificationCode: string, value: string) =>
            dispatch(
                completeVerification({
                    value,
                    verificationCode,
                    field: AddIdentityInfoTypeE.Email
                })
            ),
        [dispatch]
    );

    const addIdentityInfoSuccess = (code: string) => {
        completeVerificationCb(code, email);
    };

    return (
        <SafeAreaView style={[styles.container]}>
            {!isEmptyScreen && (
                <GetStartedStepper
                    stepsNumber={3}
                    currentStepNumber={3}
                    mainHeading={
                        isConfirmStep
                            ? t('Enter verification code')
                            : t('Verify your email')
                    }
                    stepDescription={
                        isConfirmStep
                            ? t('The verification code was sent to {{email}}', {
                                  email: `${email.substr(
                                      0,
                                      3
                                  )}********${email.substr(8)}`
                              })
                            : t(
                                  'A verification code will be sent to this email.'
                              )
                    }
                    onConfirm={checkIsCodeExpired(onConfirm)}
                    onCancel={onCancel}
                    isFormValid={
                        (isEmailValid && !isConfirmStep) ||
                        valueToConfirm.length === CODE_LENGTH
                    }
                    skipStepText="Verify email later"
                    onSkip={onSkip}>
                    {!isConfirmStep ? (
                        <EmailField
                            autoFocus
                            value={email}
                            onChangeText={onChangeEmail}
                            error={error}
                            onBlur={() => onChangeEmail(email)}
                            containerStyles={styles.email}
                        />
                    ) : (
                        <>
                            <GenericCodeField
                                rootStyle={styles.code}
                                value={valueToConfirm}
                                cellCount={CODE_LENGTH}
                                setValue={setValue}
                            />
                            <ResendButton
                                containerStyle={styles.resend}
                                onPress={onResendCode}
                                title={t('Resend verification code')}
                            />
                        </>
                    )}
                </GetStartedStepper>
            )}
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
    phoneInput: {
        fontSize: 14,
        letterSpacing: 0.8,
        marginTop: 30,
        paddingBottom: 12,
        borderBottomWidth: 1,
        marginBottom: 25
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
    },
    email: {
        marginTop: 50,
        marginBottom: 50
    }
});
