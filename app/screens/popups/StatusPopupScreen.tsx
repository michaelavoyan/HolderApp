import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {StackScreenProps} from '@react-navigation/stack';
import {View, Text, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-elements';

import {ModalBackground} from 'app/components/common/ModalBackground';
import {RootStackParamList} from '../../navigation/StackParamsList';
import {fontFamily, normalize} from '../../utilities/helpers';

import {SVG} from '../../assets/icons';
import {GenericButton} from '../../components/common/GenericButton';
import {isSendReportButtonVisible} from '../../utilities/error-handler/errorsMap';

type Props = StackScreenProps<RootStackParamList, 'StatusPopup'>;

export const StatusPopupScreen: React.FC<Props> = ({
    navigation,
    route: {
        params: {
            title,
            text,
            statusType,
            fullScreenMode,
            withoutButtons,
            onPress,
            closeOnBackdropPress,
            withoutGoBack,
            onUnmount,
            buttonTitle,
            errorCode
        }
    }
}) => {
    const {
        theme: {colors}
    } = useTheme();

    const {t} = useTranslation();

    useEffect(() => {
        return () => {
            if (onUnmount) {
                onUnmount();
            }
        };
    });

    const handleOnPress = () => {
        if (!withoutGoBack) {
            navigation.goBack();
        }
        if (onPress) {
            onPress();
        }
    };

    const handleOnBackdropPress = () => {
        if (closeOnBackdropPress) {
            navigation.goBack();
        }
    };

    const errorCodeText = (isSendReportButtonVisible(errorCode || '') ? 'Error code: ' : 'Code: ') + errorCode

    return (
        <ModalBackground onPress={handleOnBackdropPress}>
            <View
                style={[
                    styles.popup,
                    {
                        backgroundColor: colors.secondaryBg
                    },
                    fullScreenMode && styles.fullScreenMode
                ]}>
                <TouchableOpacity
                    onPress={() => {
                        if (withoutButtons) {
                            handleOnPress();
                        }
                    }}
                    style={[
                        styles.popupInnerContainer,
                        fullScreenMode && styles.fullScreenMode
                    ]}
                    disabled={!withoutButtons}>
                    <View style={styles.icon}>
                        {
                            SVG(undefined, fullScreenMode ? 50 : 57)[
                                `status-${statusType}`
                            ]
                        }
                    </View>
                    {!!title && (
                        <Text
                            style={[
                                styles.title,
                                fullScreenMode ? styles.fullScreenModeTitle : {}
                            ]}>
                            {title}
                        </Text>
                    )}
                    {!!text && <Text style={styles.text}>{text}</Text>}
                    {!withoutButtons && (
                        <View style={styles.buttonWrapper}>
                            <GenericButton
                                title={buttonTitle || t('OK')}
                                type="secondary"
                                onPress={handleOnPress}
                                width="100%"
                            />
                        </View>
                    )}
                    {!!errorCode && (
                        <Text
                            style={[
                                styles.errorCode,
                                {color: colors.disabledText}
                            ]}>
                            {errorCodeText}
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
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
        padding: 16,
        ...Platform.select({
            android: {
                borderRadius: 4,
                padding: 24,
                width: normalize(280)
            }
        })
    },
    fullScreenMode: {
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    popupInnerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        ...Platform.select({
            android: {
                alignItems: 'center'
            }
        })
    },
    icon: {
        marginTop: 14,
        marginBottom: 20,
        ...Platform.select({
            android: {
                marginBottom: 29
            }
        })
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
    fullScreenModeTitle: {
        ...fontFamily({
            size: 28,
            android: {
                size: 28
            }
        }),
        ...Platform.select({
            android: {
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
    buttonWrapper: {
        width: '100%',
        paddingTop: 37,
        paddingHorizontal: 6,
        paddingBottom: 12,
        ...Platform.select({
            android: {
                paddingTop: 50,
                paddingBottom: 0,
                flexDirection: 'row',
                justifyContent: 'center'
            }
        })
    },
    errorCode: {
        ...fontFamily({size: 12, iosFamily: 'SFProText', android: {size: 12}}),
        marginTop: 22
    }
});
