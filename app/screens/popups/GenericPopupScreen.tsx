import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {
    View,
    Text,
    Platform,
    StyleSheet,
    ActivityIndicator,
    Pressable
} from 'react-native';
import {useTheme} from 'react-native-elements';

import { ModalBackground } from 'app/components/common/ModalBackground';
import {RootStackParamList} from '../../navigation/StackParamsList';
import {fontFamily, isIOS, normalize} from '../../utilities/helpers';

import {TextButton} from '../../components/common/TextButton';

type Props = StackScreenProps<RootStackParamList, 'GenericPopup'>;

export const GenericPopupScreen: React.FC<Props> = ({
    navigation,
    route: {
        params: {
            showSpinner = false,
            title,
            description,
            buttons,
            buttonsDirection,
            innerTextContainerStyle
        }
    }
}) => {
    const {
        theme: {
            colors: {
                secondaryBg,
                primary,
                secondary,
                primaryAndroid,
                popup: {background: popupBg, buttonBorder}
            }
        }
    } = useTheme();

    const handleOnPress = ({
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
    };

    return (
        <ModalBackground>
            <View
                style={[
                    styles.popup,
                    {
                        backgroundColor: popupBg,
                        ...Platform.select({
                            android: {
                                backgroundColor: secondaryBg
                            }
                        })
                    }
                ]}>
                <View style={[styles.popupInner, innerTextContainerStyle]}>
                    {showSpinner ? (
                        <ActivityIndicator
                            color={isIOS ? secondary : primaryAndroid}
                            size={isIOS ? 'large' : 54}
                            style={styles.spinner}
                        />
                    ) : null}
                    <Text
                        style={[
                            styles.popupTitle,
                            showSpinner ? {} : styles.marginBottom
                        ]}>
                        {title}
                    </Text>
                    <Text style={styles.popupSubtitle}>{description}</Text>
                </View>

                {buttons ? (
                    <View
                        style={[
                            styles.buttons,
                            {flexDirection: buttonsDirection}
                        ]}>
                        {buttons.map(
                            (
                                {
                                    onPress,
                                    title: btnTitle,
                                    textStyle,
                                    closePopupOnPress
                                },
                                index
                            ) =>
                                isIOS ? (
                                    <Pressable
                                        key={btnTitle}
                                        style={({pressed}) => [
                                            styles.buttonContainer,
                                            {
                                                borderColor: buttonBorder
                                            },
                                            !!(
                                                buttonsDirection === 'row' &&
                                                index
                                            ) && styles.borderLeftWidth,
                                            buttonsDirection === 'column' &&
                                                styles.flex,
                                            buttonsDirection === 'row' &&
                                                styles.buttonContainerRow,
                                            isIOS && pressed && styles.opacity
                                        ]}
                                        onPress={() =>
                                            handleOnPress({
                                                onPress,
                                                closePopupOnPress
                                            })
                                        }>
                                        <Text
                                            style={[
                                                styles.button,
                                                {
                                                    color: primary
                                                },
                                                textStyle
                                            ]}>
                                            {btnTitle}
                                        </Text>
                                    </Pressable>
                                ) : (
                                    <View
                                        key={btnTitle}
                                        style={[
                                            styles.androidButton,
                                            buttonsDirection === 'column' &&
                                                styles.androidColumnBtn
                                        ]}>
                                        <TextButton
                                            title={btnTitle}
                                            onPress={() =>
                                                handleOnPress({
                                                    onPress,
                                                    closePopupOnPress
                                                })
                                            }
                                        />
                                    </View>
                                )
                        )}
                    </View>
                ) : null}
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
        padding: 0,
        ...Platform.select({
            android: {
                borderRadius: 4,
                width: normalize(280)
            }
        })
    },
    popupInner: {
        padding: isIOS ? 19 : 24,
        paddingBottom: isIOS ? 23 : 24,
        alignItems: isIOS ? 'center' : 'flex-start',
        justifyContent: 'center'
    },
    spinner: {
        marginBottom: 5,
        ...Platform.select({
            android: {
                marginLeft: -3,
                marginTop: 7,
                marginBottom: 22
            }
        })
    },
    popupTitle: {
        paddingBottom: 5,
        lineHeight: normalize(22),
        letterSpacing: -0.408,
        textAlign: 'center',
        ...fontFamily({
            size: 17,
            weight: '600',
            iosFamily: 'SFProText',
            android: {size: 20, weight: '500'}
        }),
        ...Platform.select({
            android: {
                lineHeight: normalize(23),
                letterSpacing: 0.15
            }
        })
    },
    popupSubtitle: {
        fontFamily: 'SFProText-Regular',
        fontSize: normalize(15),
        lineHeight: normalize(22),
        letterSpacing: -0.408,
        textAlign: 'center',
        ...fontFamily({size: 15, iosFamily: 'SFProText', android: {size: 14}}),
        ...Platform.select({
            android: {
                letterSpacing: 0.25,
                lineHeight: 20,
                marginBottom: 15,
                textAlign: 'auto'
            }
        })
    },
    buttonContainerRow: {
        flex: 1
    },
    buttonContainer: {
        backgroundColor: 'transparent',
        height: normalize(43),
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 0.5
    },
    button: {
        fontFamily: 'SFProText-Regular',
        fontSize: normalize(17),
        fontWeight: '600'
    },
    androidButton: {
        marginLeft: 15
    },
    androidColumnBtn: {
        marginVertical: 4
    },
    buttons: {
        ...Platform.select({
            android: {
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                alignContent: 'flex-end',
                paddingHorizontal: 19,
                paddingBottom: 11
            }
        })
    },
    marginBottom: {
        marginBottom: isIOS ? 5 : 15
    },
    flex: {
        flex: 0
    },
    borderLeftWidth: {
        borderLeftWidth: 0.5
    },
    opacity: {
        opacity: 0.7
    }
});
