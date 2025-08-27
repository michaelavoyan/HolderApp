import React from 'react';
import {useTranslation} from 'react-i18next';
import {StackScreenProps} from '@react-navigation/stack';
import {
    View,
    Text,
    Platform,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import {useTheme} from 'react-native-elements';

import {TextButton} from 'app/components/common/TextButton';
import {LinkedInRules} from 'app/store/types/vcl';
import {useSelector} from 'react-redux';
import {linkedInByCredentialTypeSelector} from 'app/store/selectors/vcl';
import {getOr} from 'lodash/fp';
import useShareCredentialToLinkedIn from 'app/components/CredentialDetails/useShareCredentialToLinkedIn';
import {useDisclosureTutorial} from 'app/utilities/hooks/useDisclosureTutorial';
import {ModalBackground} from 'app/components/common/ModalBackground';
import {RootStackParamList} from '../../navigation/StackParamsList';
import {fontFamily, isIOS, normalize} from '../../utilities/helpers';

import {SVG} from '../../assets/icons';
import {GenericButton} from '../../components/common/GenericButton';
import {StatusMessages} from './type';

type Props = StackScreenProps<RootStackParamList, 'ClaimSuccessPopup'>;

export const ClaimSuccessPopupScreen: React.FC<Props> = ({
    navigation,
    route: {
        params: {credentials}
    }
}) => {
    const {
        theme: {
            colors,
            colors: {primary}
        }
    } = useTheme();

    const {t} = useTranslation();
    const linkedInRules: LinkedInRules = useSelector((state: any) =>
        linkedInByCredentialTypeSelector(
            state,
            getOr([], 'type', credentials[0])
        )
    );

    const {setShowDisclosureTutorial} = useDisclosureTutorial();

    const shareToLinkedIn = useShareCredentialToLinkedIn({
        credential: credentials[0],
        linkedInRules
    });

    const handleOnPress = () => {
        navigation.goBack();

        if (credentials.length > 1) {
            requestAnimationFrame(() => {
                navigation.navigate('LinkedInSelectCredentialToShare', {
                    credentials
                });

                setShowDisclosureTutorial(true);
            });
        } else {
            shareToLinkedIn();
        }
    };

    const handleOnBackdropPress = () => {
        navigation.goBack();
        setShowDisclosureTutorial(true);
    };

    return (
        <ModalBackground onPress={handleOnBackdropPress}>
            <View
                style={[
                    styles.popup,
                    {
                        backgroundColor: colors.secondaryBg
                    }
                ]}>
                <View style={[styles.popupInnerContainer]}>
                    <View style={styles.icon}>
                        {SVG(undefined, 57)[`status-${StatusMessages.Done}`]}
                    </View>

                    <Text style={styles.title}>
                        {t(
                            credentials.length > 1
                                ? 'Congratulations on claiming your credentials!'
                                : 'Congratulations on claiming your credential!'
                        )}
                    </Text>

                    <Text style={styles.text}>
                        {t(
                            credentials.length > 1
                                ? 'Share your credentials with friends and colleagues to celebrate your achievement.'
                                : 'Share your credential with friends and colleagues to celebrate your achievement.'
                        )}
                    </Text>

                    {isIOS ? (
                        <View style={styles.buttonWrapper}>
                            <GenericButton
                                icon={SVG(undefined, 20)['shared-via-linkedin']}
                                title={t('Share on LinkedIn')}
                                type="secondary"
                                onPress={handleOnPress}
                                width="100%"
                            />
                            <TouchableOpacity onPress={handleOnBackdropPress}>
                                <Text
                                    style={[
                                        styles.skipButton,
                                        {color: primary}
                                    ]}>
                                    {t('Skip')}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.androidButtons}>
                            <View style={[styles.androidButton]}>
                                <TextButton
                                    title={t('Skip')}
                                    onPress={handleOnBackdropPress}
                                />
                            </View>
                            <View style={[styles.androidButton]}>
                                <TextButton
                                    title={t('Share on LinkedIn')}
                                    onPress={handleOnPress}
                                />
                            </View>
                        </View>
                    )}
                </View>
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
                alignItems: 'flex-start'
            }
        })
    },
    icon: {
        marginTop: 14,
        marginBottom: 20,
        ...Platform.select({
            android: {
                marginBottom: 29,
                alignSelf: 'flex-start'
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
                marginBottom: 17,
                textAlign: 'left'
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
    },
    skipButton: {
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 16
    },
    androidButton: {
        marginLeft: 15
    },
    androidButtons: {
        flexDirection: 'row',
        marginTop: 50
    }
});
