import React, {ReactNode, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
    Dimensions,
    LayoutAnimation,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {useTheme} from 'react-native-elements';
import {fontFamily, isIOS} from '../../utilities/helpers';
import {GenericButton} from '../common/GenericButton';
import {Steps} from '../common/Steps';
import {KeyboardAwareScrollWrapper} from '../common/KeyboardAwareScrollWrapper';

export interface GetStartedStepperProps {
    currentStepNumber: number;
    stepsNumber: number;
    mainHeading?: string;
    stepHeading?: string;
    showStepper?: boolean;
    stepDescription: string;
    onConfirm: () => void;
    onCancel: () => void;
    isFormValid: boolean;
    skipStepText?: string;
    children?: ReactNode;
    onSkip?: () => void;
}

export const DEFAULT_GET_STARTED_HEADER = 'Enter your profile name';
const FOOTER_HEIGHT = 75;

const layoutAnimation = {
    ...LayoutAnimation.Presets.linear,
    duration: 200
};

export const GetStartedStepper: React.FC<GetStartedStepperProps> = ({
    children,
    currentStepNumber,
    stepsNumber,
    stepHeading,
    showStepper = true,
    stepDescription,
    onConfirm,
    onCancel,
    isFormValid,
    skipStepText,
    onSkip,
    mainHeading = DEFAULT_GET_STARTED_HEADER
}) => {
    const {
        theme,
        theme: {
            colors: {primary: color}
        }
    } = useTheme();

    const {t} = useTranslation();

    const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

    const handleKeyboardDidShow = (frames: any) => {
        const height = frames?.endCoordinates?.height;
        if (height) {
            LayoutAnimation.configureNext(layoutAnimation);
            setKeyboardHeight(height);
        }
    };
    const handleKeyboardDidHide = () => {
        LayoutAnimation.configureNext(layoutAnimation);
        setKeyboardHeight(0);
    };

    return (
        <KeyboardAwareScrollWrapper
            contentContainerStyle={[
                styles.keyboardContainer,
                keyboardHeight && !isIOS
                    ? {
                          height:
                              Dimensions.get('screen').height - FOOTER_HEIGHT
                      }
                    : undefined
            ]}
            keyboardShouldPersistTaps="handled"
            onKeyboardWillShow={isIOS ? handleKeyboardDidShow : undefined}
            onKeyboardWillHide={isIOS ? handleKeyboardDidHide : undefined}
            onKeyboardDidHide={isIOS ? undefined : handleKeyboardDidHide}
            onKeyboardDidShow={isIOS ? undefined : handleKeyboardDidShow}
            extraScrollHeight={FOOTER_HEIGHT}>
            <View style={[styles.container, {marginBottom: keyboardHeight}]}>
                <View>
                    {!!showStepper && (
                        <Text style={styles.step}>
                            {t('Step {{currentStep}} of {{stepsNumber}}', {
                                currentStep: currentStepNumber,
                                stepsNumber
                            })}
                        </Text>
                    )}
                    <Text style={styles.title}>{t(mainHeading)}</Text>
                    {!!stepHeading && (
                        <Text
                            style={[
                                styles.subTitle,
                                {
                                    color: theme.colors.secondaryText
                                }
                            ]}>
                            {stepHeading}
                        </Text>
                    )}
                    <Text
                        style={[
                            styles.description,
                            {
                                color: theme.colors.secondaryText
                            }
                        ]}>
                        {stepDescription}
                    </Text>
                    {children}
                </View>
                <View style={styles.bottomBlock}>
                    <View style={styles.buttonsBlock}>
                        <GenericButton
                            containerStyle={styles.buttonContainerLeft}
                            title={t('Back')}
                            type="secondary"
                            onPress={onCancel}
                        />
                        <GenericButton
                            containerStyle={styles.buttonContainerRight}
                            title={t('Next')}
                            type="primary"
                            disabled={!isFormValid}
                            onPress={onConfirm}
                        />
                    </View>
                    {!!skipStepText && (
                        <View style={styles.skipContainer}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={onSkip}>
                                <Text style={[{color}, styles.skipText]}>
                                    {skipStepText}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    {!!showStepper && (
                        <Steps
                            containerStyle={styles.steps}
                            steps={stepsNumber}
                            selected={currentStepNumber}
                        />
                    )}
                </View>
            </View>
        </KeyboardAwareScrollWrapper>
    );
};

const styles = StyleSheet.create({
    keyboardContainer: {
        height: '100%'
    },

    container: {
        padding: 16,
        justifyContent: 'space-between',
        flexGrow: 1
    },
    input: {
        marginBottom: 5
    },
    step: {
        ...fontFamily({size: 14, weight: '600', iosFamily: 'SFProText'})
    },
    title: {
        ...fontFamily({size: 28, weight: 'bold'}),
        letterSpacing: 0.35,
        marginVertical: 20
    },
    subTitle: {
        ...fontFamily({size: 13}),
        textTransform: 'uppercase',
        letterSpacing: 0.2,
        marginBottom: 8
    },
    description: {
        ...fontFamily({size: 13}),
        letterSpacing: 0.2,
        marginBottom: 10
    },
    buttonsBlock: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 25
    },
    buttonContainerLeft: {
        marginRight: 5
    },
    buttonContainerRight: {
        marginLeft: 5
    },
    bottomBlock: {
        marginTop: 50,
        marginBottom: 16,
        justifyContent: 'space-between'
    },
    steps: {
        marginTop: 25
    },
    skipText: {
        ...fontFamily({size: 17})
    },
    skipContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end'
    }
});
