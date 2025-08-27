import React, {useCallback, useEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {
    View,
    Text,
    Platform,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Keyboard,
    KeyboardAvoidingView
} from 'react-native';
import {useTheme} from 'react-native-elements';

import {useTranslation} from 'react-i18next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNetInfo} from '@react-native-community/netinfo';
import {getOr, find} from 'lodash/fp';
import {useSelector} from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import * as RNLocalize from 'react-native-localize';
import {VCLCountry} from '@velocitycareerlabs/vcl-react-native';
import LogRocket from '@logrocket/react-native';
import {countriesSelector} from 'app/store/selectors/auth';

import {configSelector, userSelector} from 'app/store/selectors';
import {sendFeedback} from 'app/api/feedback.service';
import {openStatusPopup} from 'app/utilities/popups';
import i18n from 'app/i18n';
import {ContactIssuer} from 'app/components/common/ContactIssuer';
import {validateEmail} from 'app/utilities/validation/validate-utils';
import {AddIdentityInfoTypeE} from 'app/components/Profile/typings/types';
import {IConfig} from 'app/store/types/appConfig';
import {ModalBackground} from 'app/components/common/ModalBackground';
import {VCL_ENVIRONMENT} from 'app/configs';
import PackageJson from '../../../package.json';
import {RootStackParamList} from '../../navigation/StackParamsList';

import {SVG} from '../../assets/icons';
import {fontFamily, isIOS, normalize} from '../../utilities/helpers';
import {StatusMessages} from './type';
import {GenericInput} from '../../components/common/GenericInput';
import {useCredentials} from '../../utilities/hooks/useCredentials';
import {localConfigs} from '../../configs';
import {IOSButton} from '../../components/Popup/IOSButton';
import {AndroidButton} from '../../components/Popup/AndroidButton';
import {isSendReportButtonVisible} from '../../utilities/error-handler/errorsMap';

type Props = StackScreenProps<RootStackParamList, 'ErrorPopup'>;

export type ReportData = {
    accountId: string;
    feedback: string;
    errorCode: string;
    appVersion: string;
    deviceManufacturer: string;
    deviceModel: string;
    deviceOS: string;
    ip: string;
    errorReportId?: string;
};

export const ErrorPopupScreen: React.FC<Props> = ({
    navigation,
    route: {
        params: {title, subTitle, buttons, errorCode, email, errorReportId}
    }
}) => {
    const {
        theme: {
            colors: {
                secondaryBg,
                disabledText,
                popup: {background: buttonBorder}
            }
        }
    } = useTheme();
    const {t} = useTranslation();
    const netInfo = useNetInfo();
    const user = useSelector(userSelector);
    const config: IConfig = useSelector(configSelector);
    const countries: VCLCountry[] = useSelector(countriesSelector);
    const savedEmails = useCredentials([AddIdentityInfoTypeE.Email]);
    
    useEffect(() => {
        if(localConfigs.logRocketEnabled){
            LogRocket.startNewSessionSameConfig();
        }
        localConfigs.updateErrorReportId();
    }, []);


    const [showTextArea, setShowTextArea] = React.useState(false);
    const [userEmail, setUserEmail] = React.useState(
        getOr('', 'credentialSubject.email', savedEmails[0])
    );
    const [userEmailValid, setUserEmailValid] = React.useState(true);
    const [userMsg, setUserMsg] = React.useState('');
    const onClose = buttons![0].onPress;

    const sendReportIsDisabled = useCallback(() => {
        return !(userEmail.length > 0 && userEmailValid && userMsg.length > 0);
    }, [userEmail.length, userEmailValid, userMsg.length]);

    const handleOnPress = useCallback(
        ({
            closePopupOnPress,
            onPress
        }: {
            closePopupOnPress?: boolean;
            onPress?: () => void;
        }) => {
            if (closePopupOnPress) {
                navigation.goBack();
            }
            if (onPress) {
                onPress();
            }
        },
        [navigation]
    );

    const handleTextChange = (value: string) => {
        if (value.length > 1000) return;

        setUserMsg(value);
    };

    const onChangeEmail = useCallback((value: string) => {
        setUserEmail(value);
        setUserEmailValid(validateEmail(value));
    }, []);

    const handleSend = useCallback(async () => {
        const countryName = find(
            ['code', RNLocalize.getCountry()],
            countries
        )?.name;
        const feedback = `${userMsg}\n\n${i18n.t('Country')}: ${
            countryName || ''
        }\n\n${i18n.t('Timestamp')}: ${new Date(
            Date.now()
        ).toString()}\n\n${i18n.t('Email')}: ${userEmail}\n\n${i18n.t('Environment')}: ${VCL_ENVIRONMENT}\n\n${i18n.t('Error report Id')}: ${errorReportId}`;
        const reportData = {
            accountId: getOr('', 'accountId', user),
            feedback,
            errorCode: errorCode || '',
            appVersion: PackageJson.version,
            deviceManufacturer: DeviceInfo.getBrand(),
            deviceModel: DeviceInfo.getModel(),
            deviceOS: `${Platform.OS}${DeviceInfo.getSystemVersion()}`,
            ip: getOr('', 'details.ipAddress', netInfo)
        };
        try {
            await sendFeedback(config, reportData);
            openStatusPopup({
                params: {
                    title: i18n.t('Report sent'),
                    text: i18n.t(
                        'Thanks for helping us improve Velocity Career Wallet'
                    ),
                    statusType: StatusMessages.Done,
                    onPress: onClose
                }
            });
        } catch (e) {
            openStatusPopup({
                params: {
                    title: i18n.t('Report was not sent'),
                    text: i18n.t('Please try again later'),
                    statusType: StatusMessages.Error,
                    onPress: onClose
                }
            });
        }
    }, [
        countries,
        userMsg,
        userEmail,
        errorReportId,
        user,
        errorCode,
        netInfo,
        config,
        onClose
    ]);

    return (
        <ModalBackground onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={0}>
                {!showTextArea && (
                    <View
                        style={[
                            styles.popup,
                            {
                                backgroundColor: secondaryBg
                            }
                        ]}>
                        <TouchableOpacity style={[styles.popupInnerContainer]}>
                            <View style={[styles.popupInner]}>
                                <View style={styles.icon}>
                                    {SVG(undefined, 57)['status-error']}
                                </View>
                                {!!title && (
                                    <Text style={[styles.title]}>{title}</Text>
                                )}
                                {!!subTitle && (
                                    <Text style={styles.text}>{subTitle}</Text>
                                )}
                            </View>

                            {buttons ? (
                                <View style={[styles.buttons]}>
                                    {buttons.map(
                                        (
                                            {
                                                onPress,
                                                title: btnTitle,
                                                closePopupOnPress
                                            },
                                            index
                                        ) =>
                                            isIOS ? (
                                                <IOSButton
                                                    key={btnTitle}
                                                    btnTitle={btnTitle}
                                                    index={index}
                                                    onPress={() => {
                                                        handleOnPress({
                                                            onPress,
                                                            closePopupOnPress
                                                        });
                                                        setShowTextArea(index === 1);
                                                    }}
                                                    disabled={false}
                                                />
                                            ) : (
                                                <View key={btnTitle}>
                                                    <AndroidButton
                                                        key={btnTitle}
                                                        btnTitle={btnTitle}
                                                        onPress={() => {
                                                            handleOnPress({
                                                                onPress,
                                                                closePopupOnPress
                                                            });
                                                            setShowTextArea(
                                                                index === 1
                                                            );
                                                        }}
                                                        disabled={false}
                                                    />
                                                </View>
                                            )
                                    )}
                                </View>
                            ) : null}
                            {email ? (
                                <ContactIssuer
                                    email={email}
                                    style={styles.contact}
                                />
                            ) : null}
                            {!!errorCode && (
                                <Text
                                    style={[
                                        styles.errorCode,
                                        {color: disabledText}
                                    ]}>
                                    {t(
                                        isSendReportButtonVisible(errorCode)                                            ? 'Error code:'
                                            : 'Code:'
                                    )}{' '}
                                    {errorCode}
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                )}

                {showTextArea && (
                    <View
                        style={[
                            styles.textAreaContainer,
                            {
                                backgroundColor: secondaryBg
                            }
                        ]}>
                        <KeyboardAwareScrollView
                            scrollEnabled={false}
                            extraScrollHeight={Platform.OS === 'ios' ? 25 : 0}
                            keyboardOpeningTime={-1}
                            resetScrollToCoords={{x: 0, y: 0}}
                            bounces={false}>
                            {
                                isSendReportButtonVisible(errorCode || '') &&
                                (<Text style={[styles.textAreaTitle]}>
                                    {t('Send report')}
                                </Text>)
                            }
                            <GenericInput
                                onChangeText={onChangeEmail}
                                containerStyle={styles.input}
                                value={userEmail}
                                defaultValue=" "
                                autoFocus
                                label={t('Email*')}
                                autoCapitalize="words"
                                error={
                                    userEmailValid || !userEmail.length
                                        ? ''
                                        : t(
                                              'Please provide a valid email address'
                                          )
                                }
                            />
                            <TextInput
                                multiline
                                numberOfLines={10}
                                textAlignVertical="top"
                                style={[
                                    styles.textArea,
                                    {borderColor: buttonBorder}
                                ]}
                                onChangeText={(value) =>
                                    handleTextChange(value)
                                }
                                value={userMsg}
                                placeholder={t('Describe the issue here')}
                                maxLength={1000}
                            />
                            <View style={[styles.textAreaFooter]}>
                                <Text style={{color: disabledText}}>
                                    {t('{{length}}/1000 characters', {
                                        length: userMsg.length
                                    })}
                                </Text>
                            </View>
                            <View style={[styles.buttons]}>
                                {isIOS ? (
                                    <>
                                    <IOSButton
                                        btnTitle={t('Cancel')}
                                        index={0}
                                        onPress={onClose}
                                        disabled={false}
                                    />
                                    <IOSButton
                                        btnTitle={t('Send')}
                                        index={1}
                                        onPress={handleSend}
                                        disabled={sendReportIsDisabled()}
                                    />
                                    </>
                                ) : (
                                    <>
                                    <AndroidButton
                                        btnTitle={t('Cancel')}
                                        onPress={onClose}
                                        disabled={false}
                                    />
                                    <AndroidButton
                                        btnTitle={t('Send')}
                                        onPress={() => {
                                            handleOnPress({
                                                closePopupOnPress: true,
                                                onPress: handleSend,
                                            });
                                            
                                        }}
                                        disabled={sendReportIsDisabled()}
                                    />
                                    </>
                                )}
                            </View>
                        </KeyboardAwareScrollView>
                    </View>
                )}
            </KeyboardAvoidingView>
        </ModalBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0
    },
    popup: {
        borderRadius: 14,
        width: normalize(270),
        padding: 20,
        ...Platform.select({
            android: {
                borderRadius: 4,
                padding: 15,
                width: normalize(280)
            }
        })
    },
    popupInnerContainer: {
        width: '100%',
        paddingBottom: isIOS ? 0 : 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        ...Platform.select({
            android: {
                alignItems: 'flex-start',
                justifyContent: 'flex-start'
            }
        })
    },
    popupInner: {
        padding: 10,
        paddingBottom: isIOS ? 23 : 24,
        alignItems: isIOS ? 'center' : 'flex-start',
        justifyContent: 'center'
    },
    icon: {
        marginTop: 14,
        marginBottom: 24
    },
    title: {
        ...fontFamily({
            size: 17,
            weight: '500',
            iosFamily: 'SFProText',
            android: {
                size: 20
            }
        }),
        marginBottom: 7,
        letterSpacing: -0.4,
        ...Platform.select({
            android: {
                marginBottom: 17
            },
            ios: {
                textAlign: 'center'
            }
        })
    },
    text: {
        ...fontFamily({size: 15, iosFamily: 'SFProText', android: {size: 16}}),
        letterSpacing: -0.4,
        lineHeight: 22,
        ...Platform.select({
            ios: {
                textAlign: 'center'
            },
            android: {
                letterSpacing: 0.15
            }
        })
    },
    buttons: {
        flexDirection: 'row',
        width: '100%',
        paddingTop: 11,
        ...Platform.select({
            android: {
                justifyContent: 'flex-end'
            }
        })
    },
    button: {
        fontFamily: 'SFProText-Regular',
        fontSize: normalize(14),
        fontWeight: '600'
    },
    errorCode: {
        ...fontFamily({size: 12, iosFamily: 'SFProText', android: {size: 12}}),
        alignSelf: 'center',
        marginTop: 10
    },
    textAreaContainer: {
        borderRadius: 14,
        width: normalize(320),
        padding: 20,
        ...Platform.select({
            android: {
                borderRadius: 4,
                padding: 15,
                width: normalize(300)
            }
        })
    },
    textAreaTitle: {
        ...fontFamily({
            size: 17,
            weight: '600',
            iosFamily: 'SFProText',
            android: {
                size: 20
            }
        }),
        marginBottom: 15,
        letterSpacing: -0.4
    },
    textArea: {
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        paddingBottom: 30,
        ...Platform.select({
            ios: {
                minHeight: 207
            }
        })
    },
    textAreaFooter: {
        marginTop: -30,
        marginLeft: 10
    },
    contact: {
        marginTop: 20,
        marginBottom: 30
    },
    input: {
        marginBottom: 20,
        marginTop: 2,
        flex: 1,
        marginLeft: 1
    }
});
