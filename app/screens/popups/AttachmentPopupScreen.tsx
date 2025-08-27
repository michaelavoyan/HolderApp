import React, {useCallback} from 'react';
import Pdf from 'react-native-pdf';
import {StackScreenProps} from '@react-navigation/stack';
import {View, Platform, StyleSheet, Dimensions, Pressable} from 'react-native';
import {useTheme} from 'react-native-elements';
import RNBlobUtil from 'react-native-blob-util';
import {WebView} from 'react-native-webview';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ModalBackground} from 'app/components/common/ModalBackground';
import {vclLogger} from 'app/utilities/logger';
import {RootStackParamList} from '../../navigation/StackParamsList';
import {isIOS} from '../../utilities/helpers';
import {closePopup} from '../../utilities/popups';
import {SVG} from '../../assets/icons';

type Props = StackScreenProps<RootStackParamList, 'AttachmentPopup'>;

const getBase64Norm = (base64: string) =>
    !base64.includes(';base64,') ? base64.replace(/;/, ';base64,') : base64;

const getHtml = (base64: string) => {
    return `
        <html lang="">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body>
                <img src="${getBase64Norm(
                    base64
                )}" style="width:100%; height:auto;"  alt=""/>
            </body>
        </html>
    `;
};

export const AttachmentPopupScreen: React.FC<Props> = ({
    route: {
        params: {base64, fileName, mediaType}
    }
}) => {
    const {
        theme: {colors}
    } = useTheme();
    const insets = useSafeAreaInsets();

    const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

    const downloadBase64 = useCallback(async () => {
        try {
            const {dirs} = RNBlobUtil.fs;
            const fileNameNorm = `${fileName.replace(/ /g, '_')}.${
                mediaType.split('/')[1]
            }`;
            const downloadPath = `${
                isIOS ? dirs.DocumentDir : dirs.DownloadDir
            }/${fileNameNorm}`;
            const base64Data = base64.replace(
                /^data:(image\/(?:png|jpeg|svg\+xml)|application\/pdf);(base64,)?/,
                ''
            );
            await RNBlobUtil.fs.writeFile(downloadPath, base64Data, 'base64');
            if (isIOS) {
                const formattedPath = downloadPath.startsWith('file://')
                    ? downloadPath
                    : `file://${downloadPath}`;
                RNBlobUtil.fs.exists(downloadPath).then((exists) => {
                    if (!exists) {
                        console.error('File does not exist:', formattedPath);
                    } else {
                        RNBlobUtil.ios.openDocument(downloadPath);
                    }
                });
            } else {
                await RNBlobUtil.android.actionViewIntent(downloadPath, mediaType);
            }
        } catch (error: any) {
            vclLogger.error('Error downloading base64 file:', error);
        }
    }, [base64, fileName, mediaType]);

    return (
        <ModalBackground>
            <View
                style={[
                    styles.popup,
                    styles.fullScreenMode,
                    {
                        backgroundColor: colors.secondaryBg,
                        paddingTop: insets.top,
                        paddingBottom: insets.bottom,
                        paddingLeft: insets.left + 5,
                        paddingRight: insets.right + 5
                    }
                ]}>
                <View style={styles.buttonContainer}>
                    <Pressable
                        testID="download-icon"
                        onPress={downloadBase64}
                        style={({pressed}) => [
                            isIOS && pressed ? styles.opacity : styles.noOpacity
                        ]}
                        android_ripple={{
                            color: colors.primaryAndroid,
                            borderless: true
                        }}>
                        {SVG(colors.closeButton, 23).open}
                    </Pressable>
                    <Pressable
                        testID="close-icon"
                        onPress={() => closePopup()}
                        style={({pressed}) => [
                            isIOS && pressed ? styles.opacity : styles.noOpacity
                        ]}
                        android_ripple={{
                            color: colors.primaryAndroid,
                            borderless: true
                        }}>
                        {SVG(colors.closeButton, 18).close}
                    </Pressable>
                </View>
                <View style={[styles.popupInnerContainer]}>
                    {mediaType === 'application/pdf' ? (
                        <Pdf
                            source={{uri: getBase64Norm(base64)}}
                            style={[
                                styles.pdfContainer,
                                {
                                    width: screenWidth,
                                    height: screenHeight
                                }
                            ]}
                        />
                    ) : (
                        <WebView
                            testID="attachment-webview"
                            source={{html: getHtml(base64)}}
                            style={[
                                styles.webview,
                                {
                                    width: screenWidth - 10,
                                    height: screenHeight
                                }
                            ]}
                        />
                    )}
                </View>
            </View>
        </ModalBackground>
    );
};

const styles = StyleSheet.create({
    pdfContainer: {
        flex: 1
    },
    container: {
        flex: 1,
        padding: 0
    },
    popup: {
        borderRadius: 0
    },
    fullScreenMode: {
        width: '100%',
        height: '100%',
        alignItems: 'flex-start'
    },
    popupInnerContainer: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flex: 1,
        width: '100%',
        ...Platform.select({
            android: {
                alignItems: 'flex-start'
            }
        })
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 15,
        height: 60,
        width: '100%',
        paddingRight: 10
    },
    opacity: {
        opacity: 0.7
    },
    noOpacity: {
        opacity: 1
    },
    webview: {
        flex: 1,
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    }
});
