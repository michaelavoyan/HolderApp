import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {StackScreenProps} from '@react-navigation/stack';
import {View, Text, Platform, StyleSheet, Pressable} from 'react-native';
import {useTheme} from 'react-native-elements';

import {useDispatch} from 'react-redux';
import {RootStackParamList} from '../../navigation/StackParamsList';
import {fontFamily, isIOS, normalize} from '../../utilities/helpers';

import {TextButton} from '../../components/common/TextButton';
import {SVG} from '../../assets/icons';
import {GenericButton} from '../../components/common/GenericButton';
import {setIsTempUserFirstIssuingSessionActiveAction} from '../../store/actions/disclosure';

type Props = StackScreenProps<RootStackParamList, 'DeepLinkPopup'>;

export const DeepLinkPopupScreen: React.FC<Props> = ({
    navigation,
    route: {
        params: {title, subTitle, icon, onOpen, closeOnBackdropPress}
    }
}) => {
    const {
        theme: {
            colors: {secondaryBg, secondary}
        }
    } = useTheme();
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const completeTempUserFirstIssuingSession = useCallback(() => {
        dispatch(setIsTempUserFirstIssuingSessionActiveAction(false));
    }, [dispatch]);

    const onCancel = () => {
        completeTempUserFirstIssuingSession();
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Pressable
                style={[StyleSheet.absoluteFill]}
                onPress={() => {
                    if (closeOnBackdropPress) {
                        onCancel();
                    }
                }}
            />
            <View
                style={[
                    styles.popup,
                    {
                        backgroundColor: secondaryBg
                    }
                ]}>
                {!!icon && (
                    <View style={styles.icon}>{SVG(undefined, 57)[icon]}</View>
                )}
                {!!title && (
                    <Text
                        style={[
                            styles.title,
                            {
                                color: secondary
                            }
                        ]}>
                        {title}
                    </Text>
                )}
                <Text style={styles.subTitle}>{subTitle}</Text>
                <View style={styles.buttons}>
                    {isIOS ? (
                        <>
                            <GenericButton
                                title={t('Cancel')}
                                type="secondary"
                                onPress={onCancel}
                                containerStyle={styles.buttonLeft}
                            />
                            <GenericButton
                                title={t('Open')}
                                type="primary"
                                onPress={onOpen}
                                containerStyle={styles.buttonRight}
                            />
                        </>
                    ) : (
                        <>
                            <TextButton
                                title={t('Cancel')}
                                onPress={onCancel}
                                containerStyle={styles.buttonLeft}
                            />
                            <TextButton
                                title={t('Open')}
                                onPress={onOpen}
                                containerStyle={styles.buttonRight}
                            />
                        </>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    popup: {
        borderRadius: 14,
        width: '100%',
        padding: 16,
        ...Platform.select({
            android: {
                borderRadius: 0
            }
        }),
        marginTop: 'auto'
    },
    popupInnerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        ...Platform.select({
            android: {
                alignItems: 'flex-start'
            }
        })
    },
    subTitle: {
        textAlign: 'center',
        alignSelf: 'center',
        letterSpacing: 0.4,
        marginTop: 12,
        marginBottom: 19,
        ...fontFamily({size: 22, weight: '600', android: {size: 20}}),
        ...Platform.select({
            android: {
                lineHeight: normalize(20),
                alignSelf: 'flex-start',
                textAlign: 'left',
                letterSpacing: 0.25
            }
        })
    },
    title: {
        letterSpacing: 0.24,
        alignSelf: 'center',
        ...fontFamily({size: 17, weight: '600', android: {size: 14}}),
        ...Platform.select({
            android: {
                opacity: 0.6,
                lineHeight: normalize(20),
                marginTop: 15,
                alignSelf: 'flex-start',
                letterSpacing: 0.25
            }
        })
    },
    buttons: {
        flexDirection: 'row',
        paddingBottom: 5,
        ...Platform.select({
            android: {
                justifyContent: 'flex-end'
            }
        })
    },
    buttonLeft: {
        marginRight: 8,
        ...Platform.select({
            android: {
                marginRight: 13
            }
        })
    },
    buttonRight: {
        marginLeft: 8,
        ...Platform.select({
            android: {
                marginRight: 10
            }
        })
    },
    icon: {
        alignSelf: 'center',
        justifyContent: 'center',
        ...Platform.select({
            android: {
                alignSelf: 'flex-start',
                justifyContent: 'flex-start'
            }
        })
    }
});
