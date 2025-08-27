import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {
    Platform,
    Pressable,
    StyleSheet,
    View,
    Text,
    ScrollView
} from 'react-native';
import Share from 'react-native-share';
import Clipboard from '@react-native-clipboard/clipboard';
import {useTheme} from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';

import {ModalBackground} from 'app/components/common/ModalBackground';
import {GenericButton} from 'app/components/common/GenericButton';
import {
    PopupScreens,
    RootStackParamList
} from '../../navigation/StackParamsList';
import {SVG} from '../../assets/icons';
import {fontFamily, isIOS, normalize} from '../../utilities/helpers';

import {closePopup} from '../../utilities/popups';

type Props = StackScreenProps<RootStackParamList, 'ShareDisclosurePopup'>;

export const ShareDisclosurePopupScreen: React.FC<Props> = ({
    route: {
        params: {link, onClose}
    }
}) => {
    const {styles} = useStyles();
    const {
        theme,
        theme: {
            colors: {closeButton}
        }
    } = useTheme();
    const [isLinkCopied, setIsLinkCopied] = React.useState(false);
    const [isImageCopied, setIsImageCopied] = React.useState(false);
    const QrCodeSvgRef = React.useRef(null);
    const {t} = useTranslation();
    const handleClose = () => {
        onClose();
        closePopup(PopupScreens.SHARE_DISCLOSURE_POPUP);
    };

    const handleCopyLink = () => {
        Clipboard.setString(link);
        setIsLinkCopied(true);
        setIsImageCopied(false);
    };

    const handleCopyQr = () => {
        if (!QrCodeSvgRef.current) {
            return;
        }

        const cb = async (base64: string) => {
            if (isIOS) {
                Clipboard.setImage(base64);
                setIsImageCopied(true);
                setIsLinkCopied(false);
            } else {
                try {
                    await Share.open({
                        type: 'image/png',
                        title: t('QR code'),
                        url: `data:image/png;base64,${base64}`
                    });
                    setIsImageCopied(true);
                } catch (e) {
                    // constant error for android devices 'User did not share' even on successfully flow- https://github.com/react-native-share/react-native-share/issues/1112
                    setIsImageCopied(false);
                }
            }
        };
        // @ts-ignore
        QrCodeSvgRef.current.toDataURL(cb);
    };

    return (
        <ModalBackground>
            <View style={styles.popup}>
                <Pressable
                    testID="close-icon"
                    onPress={handleClose}
                    style={({pressed}) => [
                        styles.close,
                        isIOS && pressed ? styles.opacity : styles.noOpacity
                    ]}
                    android_ripple={{
                        color: theme.colors.primaryAndroid,
                        borderless: true
                    }}>
                    {SVG(closeButton, 18).close}
                </Pressable>
                <ScrollView style={styles.scroll}>
                    <View style={styles.infoSection}>
                        <Text style={styles.title}>
                            {t('Share the credentials you selected')}
                        </Text>
                        <Text style={styles.description}>
                            {t(
                                'COPY THE LINK OR QR CODE BELOW AND ADD IT TO YOUR RESUME OR SHARE IT WITH OTHERS.'
                            )}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.title}>{t('Share via link')}</Text>
                        <DisclosureFileLink link={link} />
                        <View style={styles.copyLinkButton}>
                            <GenericButton
                                title={t(
                                    isLinkCopied
                                        ? 'Link is copied!'
                                        : 'Copy link'
                                )}
                                icon={
                                    isLinkCopied
                                        ? SVG(theme.colors.primaryText, 20)[
                                              'check-active'
                                          ]
                                        : undefined
                                }
                                onPress={handleCopyLink}
                            />
                        </View>
                    </View>

                    <View style={styles.shareQrSection}>
                        <Text style={styles.title}>
                            {t('Share via QR code')}
                        </Text>
                        <View style={styles.codeContainer}>
                            <View style={styles.code}>
                                <QRCode
                                    value={link}
                                    size={100}
                                    getRef={(ref: any) => {
                                        QrCodeSvgRef.current = ref;
                                    }}
                                    backgroundColor={theme.colors.primaryBg}
                                />
                            </View>
                        </View>
                        <GenericButton
                            title={t(getQrButtonTitle(isImageCopied))}
                            icon={
                                isImageCopied
                                    ? SVG(theme.colors.primaryText, 20)[
                                          'check-active'
                                      ]
                                    : undefined
                            }
                            onPress={handleCopyQr}
                        />
                    </View>
                </ScrollView>
            </View>
        </ModalBackground>
    );
};

const getQrButtonTitle = (isImageCopied: boolean): string => {
    return isImageCopied ? 'QR code is copied!' : 'Copy QR code';
};

const DisclosureFileLink: React.FC<{link: string}> = ({link}) => {
    const {styles} = useStyles();
    const {theme} = useTheme();

    if (isIOS) {
        return (
            <View style={styles.linkContainer}>
                <View>
                    {SVG(theme.colors.primaryText, 32)['external-link']}
                </View>
                <Text style={styles.link} numberOfLines={1}>
                    {link}
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.linkContainer}>
            <Text style={styles.link} numberOfLines={1}>
                {link}
            </Text>
        </View>
    );
};

const useStyles = () => {
    const {theme} = useTheme();

    const styles = React.useMemo(
        () =>
            StyleSheet.create({
                container: {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 0
                },
                popup: {
                    position: 'absolute',
                    top: 37,
                    bottom: 37,
                    left: 24,
                    right: 24,
                    borderRadius: 14,
                    paddingTop: 50,
                    paddingBottom: 10,
                    paddingHorizontal: 10,
                    flexDirection: 'column',
                    backgroundColor: theme.colors.secondaryBg,
                    ...Platform.select({
                        android: {
                            borderRadius: 4,
                            padding: 24
                        }
                    })
                },
                scroll: {paddingHorizontal: 14},
                close: {
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    padding: 16
                },

                opacity: {
                    opacity: 0.7
                },
                noOpacity: {
                    opacity: 1
                },
                infoSection: {
                    paddingBottom: 4
                },
                title: {
                    ...fontFamily({
                        size: 22,
                        weight: '600',
                        android: {weight: 'bold'}
                    }),
                    lineHeight: normalize(26),
                    letterSpacing: 0.4,
                    paddingBottom: 10,
                    color: theme.colors.primaryText
                },
                description: {
                    ...fontFamily({size: 13}),
                    lineHeight: 17,
                    letterSpacing: 0.2,
                    paddingBottom: 20,
                    color: theme.colors.secondaryText
                },
                linkContainer: {
                    ...Platform.select({
                        android: {
                            paddingVertical: 16,
                            marginBottom: 12,
                            marginTop: 4,
                            borderBottomColor: theme.colors.separatingLine,
                            borderBottomWidth: 1
                        },
                        ios: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: theme.colors.primaryBg,
                            borderRadius: 14,
                            padding: 16,
                            marginBottom: 10
                        }
                    })
                },
                link: {
                    ...Platform.select({
                        android: {
                            fontSize: 16
                        },
                        ios: {
                            flex: 1,
                            paddingLeft: 20,
                            paddingRight: 8
                        }
                    })
                },
                copyLinkButton: {
                    paddingBottom: 25,
                    marginBottom: 25,
                    borderBottomWidth: 1,
                    borderBottomColor: isIOS
                        ? theme.colors.separatingLine
                        : theme.colors.separatingLineAndroid
                },
                copiedButton: {
                    ...Platform.select({
                        android: {
                            backgroundColor: theme.colors.dark
                        }
                    })
                },
                shareQrSection: {
                    paddingBottom: 30
                },
                codeContainer: {
                    flexDirection: 'row',
                    justifyContent: 'center'
                },
                code: {
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: theme.colors.primaryBg,
                    borderRadius: 14,
                    width: 120,
                    height: 120,
                    marginBottom: 20,
                    marginTop: 10
                }
            }),
        [theme]
    );
    return {styles, theme};
};
