import {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback, useEffect, useState} from 'react';
import {BackHandler, SafeAreaView, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {find} from 'lodash/fp';
import {useDispatch, useSelector} from 'react-redux';
import {RootStackParamList} from 'app/navigation/StackParamsList';
import {GetStartedStepper} from 'app/components/GetStarted/GetStartedStepper';
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
import {EmailField} from 'app/components/common/EmailField';
import {validateEmail} from 'app/utilities/validation/validate-utils';

import {useSaveInspection} from 'app/utilities/hooks/useSaveInspection';
import {
    DisclosureCredentialsToIssuerParams,
    SelectCredentialToShareParams
} from 'app/store/types/disclosure';
import {useVerificationCodeExpiration} from 'app/utilities/hooks/useVerificationCodeExpiration';
import {useVerificationCode} from '../../utilities/hooks/useVerificationCode';
import {
    inspectionSessionSelector,
    savedOriginalIssuingSessionSelector
} from '../../store/selectors/disclosure';
import {useClaimingMissingCredential} from '../../utilities/hooks/useClaimingMissingCredential';

type Props = StackScreenProps<RootStackParamList, 'AddEmail'>;
const CODE_LENGTH = 6;

export const AddEmail: React.FC<Props> = ({navigation}) => {
    const [email, setEmail] = useState<string>('');
    const [isEmailValid, setEmailValid] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [isConfirmStep, setConfirmStep] = useState<boolean>(false);
    const [valueToConfirm, setValue] = useState<string>('');
    const step: AddIdentityInfoStepE = useSelector(identityStepSelector);
    const existingEmails = useSelector((state: any) =>
        identityCredentialsSelector(state, [IdentityCredentialTypeE.Email])
    );
    const savedIssuingSession: null | DisclosureCredentialsToIssuerParams =
        useSelector(savedOriginalIssuingSessionSelector);

    const savedInspectionSession: null | SelectCredentialToShareParams =
        useSelector(inspectionSessionSelector);

    const {t} = useTranslation();
    const dispatch = useDispatch();

    const {onSecondaryIssuingSuccess, stopSecondaryIssuing} =
        useClaimingMissingCredential(navigation);

    const {clearInspectionSession, onIssuingDuringInspectionSuccess} =
        useSaveInspection(navigation);

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

    const resetIdentityStep = useCallback(
        () => dispatch(changeIdentityStep(AddIdentityInfoStepE.AddInfo)),
        [dispatch]
    );

    useEffect(() => {
        const backAction = () => {
            if (savedIssuingSession) {
                stopSecondaryIssuing(savedIssuingSession?.issuer?.name || '');
                return true;
            }

            if (savedInspectionSession) {
                clearInspectionSession();

                return true;
            }

            return false;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, [
        savedIssuingSession,
        stopSecondaryIssuing,
        savedInspectionSession,
        clearInspectionSession
    ]);

    useEffect(() => {
        if (step === AddIdentityInfoStepE.Success) {
            if (savedIssuingSession) {
                onSecondaryIssuingSuccess(savedIssuingSession);
            } else if (savedInspectionSession) {
                onIssuingDuringInspectionSuccess();
            } else {
                navigation.goBack();
            }

            resetIdentityStep();
        }
    }, [
        navigation,
        onSecondaryIssuingSuccess,
        resetIdentityStep,
        savedIssuingSession,
        step,
        savedInspectionSession,
        onIssuingDuringInspectionSuccess
    ]);

    const onChangeEmail = (value: string): void => {
        setEmail(value);
        setEmailValid(validateEmail(value));
        if (error.length > 0 && isEmailValid) {
            setError('');
        }
    };

    const onConfirm = () => {
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
        if (isConfirmStep) {
            setConfirmStep(false);
        } else {
            if (savedIssuingSession) {
                stopSecondaryIssuing(savedIssuingSession?.issuer?.name || '');
                return;
            }
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

    const getEmailDotted = (str: string): string => {
        const [string, suffix] = str.split(/\.(?=[^.]+$)/);
        return `${string.substring(0, 3)}${'*'.repeat(
            string.length - 3
        )}.${suffix}`;
    };

    return (
        <SafeAreaView style={[styles.container]}>
            <GetStartedStepper
                showStepper={false}
                stepsNumber={3}
                currentStepNumber={3}
                mainHeading={t('Verify your email')}
                stepDescription={
                    isConfirmStep
                        ? t('The verification code was sent to {{email}}', {
                              email: getEmailDotted(email)
                          })
                        : t('A verification code will be sent to this email.')
                }
                onConfirm={checkIsCodeExpired(onConfirm)}
                onCancel={onCancel}
                isFormValid={
                    (isEmailValid && !isConfirmStep) ||
                    valueToConfirm.length === CODE_LENGTH
                }>
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
        marginTop: 50
    }
});
