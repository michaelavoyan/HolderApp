import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {View, Text, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-elements';
import {ModalBackground} from 'app/components/common/ModalBackground';
import {SVG} from '../../assets/icons';

import {RootStackParamList} from '../../navigation/StackParamsList';
import {fontFamily, isIOS, normalize} from '../../utilities/helpers';
import {IOSButton} from '../../components/Popup/IOSButton';
import {AndroidButton} from '../../components/Popup/AndroidButton';

type Props = StackScreenProps<RootStackParamList, 'ActionPopup'>;

export const ActionPopupScreen: React.FC<Props> = ({
    navigation,
    route: {
        params: {title, description, buttons}
    }
}) => {
    const {
        theme: {
            colors: {
                secondaryBg,
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
                        backgroundColor: secondaryBg
                    }
                ]}>
                <TouchableOpacity style={[styles.popupInnerContainer]}>
                    <View style={[styles.popupInner]}>
                        <View style={styles.icon}>
                            {SVG(undefined, 57)['status-error']}
                        </View>
                        {!!title && <Text style={[styles.title]}>{title}</Text>}
                        {!!description && (
                            <Text style={styles.text}>
                                {description}
                            </Text>
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
                                            btnTitle={btnTitle}
                                            index={index}
                                            onPress={() => {
                                                handleOnPress({
                                                    onPress,
                                                    closePopupOnPress
                                                });
                                            }}
                                            disabled={false}
                                        />
                                    ) : (
                                        <View key={btnTitle}>
                                            <AndroidButton
                                                btnTitle={btnTitle}
                                                onPress={() => {
                                                    handleOnPress({
                                                        onPress,
                                                        closePopupOnPress
                                                    });
                                                }}
                                                disabled={false}
                                            />
                                        </View>
                                    )
                            )}
                        </View>
                    ) : null}
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
        width: normalize(340),
        padding: 10,
        ...Platform.select({
            android: {
                padding: 15,
                borderRadius: 4,
                width: normalize(280),
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
    
});
