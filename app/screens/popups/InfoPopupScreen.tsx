import React, {useEffect} from 'react';
import {StackScreenProps, TransitionPresets} from '@react-navigation/stack';
import {View, Text, Platform, StyleSheet, Pressable} from 'react-native';
import {useTheme} from 'react-native-elements';

import {ModalBackground} from 'app/components/common/ModalBackground';
import {RootStackParamList} from '../../navigation/StackParamsList';
import {fontFamily, isIOS} from '../../utilities/helpers';

import {SVG} from '../../assets/icons';
import {closePopup} from '../../utilities/popups';

type Props = StackScreenProps<RootStackParamList, 'InfoPopup'>;

export const InfoPopupScreen: React.FC<Props> = ({
    navigation,
    route: {
        params: {
            title,
            icon,
            onClose,
            children,
            closeOnBackdropPress,
            slideFromBottom,
            canNotClose
        }
    }
}) => {
    const {
        theme: {
            colors: {primaryAndroid, secondaryBg, darkBackdrop, closeButton}
        },
        theme
    } = useTheme();

    useEffect(() => {
        if (slideFromBottom) {
            navigation.setOptions(
                isIOS
                    ? TransitionPresets.ModalSlideFromBottomIOS
                    : TransitionPresets.RevealFromBottomAndroid
            );
        }
    }, [navigation, slideFromBottom]);

    const handleOnClose = () => {
        onClose();
        closePopup();
    };

    const handleOnBackdropPress = () => {
        if (closeOnBackdropPress) {
            handleOnClose();
        }
    };

    return (
        <ModalBackground
            onPress={handleOnBackdropPress}
            style={canNotClose ? {backgroundColor: darkBackdrop} : {}}>
            <View
                style={[
                    styles.popup,
                    {
                        backgroundColor: secondaryBg
                    }
                ]}>
                {!canNotClose && (
                    <Pressable
                        testID="close-icon"
                        onPress={handleOnClose}
                        style={({pressed}) => [
                            styles.close,
                            isIOS && pressed ? styles.opacity : styles.noOpacity
                        ]}
                        android_ripple={{
                            color: primaryAndroid,
                            borderless: true
                        }}>
                        {SVG(closeButton, 18).close}
                    </Pressable>
                )}
                {title && <Text style={styles.title}>{title}</Text>}
                <View style={styles.icon}>
                    {
                        SVG(
                            isIOS
                                ? theme.colors.dark
                                : theme.colors.primaryAndroid,
                            150,
                            undefined,
                            isIOS ? undefined : theme.colors.primaryAndroid
                        )[icon]
                    }
                </View>
                {children}
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
        position: 'absolute',
        bottom: 130,
        borderRadius: 14,
        width: '96.8%',
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            android: {
                borderRadius: 4,
                padding: 24
            }
        })
    },
    close: {
        alignSelf: 'flex-end',
        marginRight: 5
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
            size: 22,
            weight: '600',
            android: {
                size: 20,
                weight: '500'
            }
        }),
        textAlign: 'center',
        marginVertical: 25,
        letterSpacing: 0.4,
        ...Platform.select({
            android: {
                marginBottom: 17,
                letterSpacing: 0.15
            }
        })
    },
    opacity: {
        opacity: 0.7
    },
    noOpacity: {
        opacity: 1
    }
});
