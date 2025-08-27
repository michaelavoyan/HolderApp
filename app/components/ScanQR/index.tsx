import React, {
    ReactNode,
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useState
} from 'react';
import {
    ImageBackground,
    LayoutAnimation,
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {useTranslation} from 'react-i18next';

import {isEmpty} from 'lodash/fp';

import {useTheme} from 'react-native-elements';
import {fontFamily, isIOS, normalize} from 'app/utilities/helpers';
import {NoInternetPopupScreen} from 'app/screens/popups/NoInternetPopupScreen';
import {useNetInfo} from '@react-native-community/netinfo';
import {useOfflineToast} from 'app/utilities/offline/toast';
import {ModalWrapper} from '../common/ModalWrapper';
import {GenericButton} from '../common/GenericButton';
import {TextButton} from '../common/TextButton';
import {QrCodeProps} from '../Profile/typings/types';
import {SVG} from '../../assets/icons';

export const DEFAULT_BAR = {
    bounds: {
        x: 0,
        y: 0,
        width: 100,
        height: 100
    },
    data: {}
};

export const ScanQRScreen = forwardRef<
    {
        setQrImageBounds: (barCode: QrCodeProps['barCode']) => void;
    },
    {
        onCancel: () => void;
        onOpen: () => void;
        onClose: () => void;
        isModalVisible: boolean;
        popup: {
            title?: string;
            subTitle: string;
            caption?: string;
            icon?: string;
        };
        isActive?: boolean;
        children?: ReactNode;
    }
>(
    (
        {children, onCancel, onOpen, onClose, isModalVisible, popup, isActive},
        ref
    ) => {
        const [{data, bounds}, setQrImageBounds] = useState<QrCodeProps['barCode']>(DEFAULT_BAR);

        const {theme} = useTheme();
        const {width, height} = bounds;
        const {x, y} = bounds;
        const {t} = useTranslation();
        const {isConnected} = useNetInfo();
        const [showNoInternetError, setShowNoInternetError] = useState(false);

        useImperativeHandle(
            ref,
            () => {
                return {
                    setQrImageBounds
                };
            },
            []
        );

        useEffect(() => {
            LayoutAnimation.configureNext({
                duration: 100,
                update: {
                    type: LayoutAnimation.Types.linear,
                    property: LayoutAnimation.Properties.opacity
                },
                create: {
                    type: LayoutAnimation.Types.linear,
                    property: LayoutAnimation.Properties.opacity
                }
            });
        }, [isModalVisible]);

        useEffect(() => {
            if (isConnected && showNoInternetError) {
                setShowNoInternetError(false);
            }
        }, [isConnected, showNoInternetError]);

        useOfflineToast(isModalVisible);

        const handleOnOpen = useCallback(() => {
            if (!isConnected) {
                setShowNoInternetError(true);
                return;
            }

            onOpen();
        }, [isConnected, onOpen]);

        return (
            <>
                {children}
                <ModalWrapper
                    isVisible={isModalVisible}
                    onClose={onClose}
                    backdropOpacity={0.00001}
                    autoHeight
                    modalChildren={
                        showNoInternetError ? (
                            <View style={StyleSheet.absoluteFillObject}>
                                <NoInternetPopupScreen />
                            </View>
                        ) : undefined
                    }>
                    {isActive ? (
                        <>
                            {!!popup.icon && (
                                <View style={styles.icon}>
                                    {SVG(undefined, 57)[popup.icon]}
                                </View>
                            )}
                            {!!popup.title && (
                                <Text
                                    style={[
                                        styles.title,
                                        {
                                            color: theme.colors.secondary
                                        }
                                    ]}>
                                    {popup.title}
                                </Text>
                            )}
                            <Text style={styles.subTitle}>
                                {popup.subTitle}
                            </Text>
                            {!!popup.caption && (
                                <Text style={styles.caption}>
                                    {popup.caption}
                                </Text>
                            )}
                            <View style={styles.disclosureButtons}>
                                {isIOS ? (
                                    <>
                                        <GenericButton
                                            title={t('Cancel')}
                                            type="secondary"
                                            onPress={onCancel}
                                            containerStyle={
                                                styles.disclosureButtonsLeft
                                            }
                                        />
                                        <GenericButton
                                            title={t('Open')}
                                            type="primary"
                                            onPress={handleOnOpen}
                                            containerStyle={
                                                styles.disclosureButtonsRight
                                            }
                                        />
                                    </>
                                ) : (
                                    <>
                                        <TextButton
                                            title={t('Cancel')}
                                            onPress={onCancel}
                                            containerStyle={
                                                styles.disclosureButtonsLeft
                                            }
                                        />
                                        <TextButton
                                            title={t('Open')}
                                            onPress={handleOnOpen}
                                            containerStyle={
                                                styles.disclosureButtonsRight
                                            }
                                        />
                                    </>
                                )}
                            </View>
                        </>
                    ) : null}
                </ModalWrapper>
                {bounds && !isEmpty(data) ? (
                    <ImageBackground
                        key={x}
                        source={{uri: 'camera_rectangle'}}
                        style={[
                            styles.cameraRectangle,
                            {
                                width: Number(width),
                                height: Number(height),
                                left: Number(x),
                                top: Number(y)
                            }
                        ]}
                    />
                ) : null}
            </>
        );
    }
);

const styles = StyleSheet.create({
    container: {
        padding: 16,
        height: 300,
        justifyContent: 'space-between'
    },
    subTitle: {
        textAlign: 'center',
        alignSelf: 'center',
        letterSpacing: 0.4,
        marginTop: 12,
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
    caption: {
        letterSpacing: 0.2,
        alignSelf: 'center',
        ...fontFamily({size: 13, weight: '400', android: {size: 13}}),
        ...Platform.select({
            android: {
                opacity: 0.6,
                alignSelf: 'flex-start',
                letterSpacing: 0.2,
                marginTop: 7
            }
        })
    },
    disclosureButtons: {
        flexDirection: 'row',
        marginTop: 19,
        ...Platform.select({
            android: {
                justifyContent: 'flex-end',
                marginBottom: 18
            }
        })
    },
    disclosureButtonsLeft: {
        marginRight: 8,
        ...Platform.select({
            android: {
                marginRight: 13
            }
        })
    },
    disclosureButtonsRight: {
        marginLeft: 8,
        ...Platform.select({
            android: {
                marginRight: 10
            }
        })
    },
    cameraRectangle: {
        position: 'absolute',
        justifyContent: 'center',
        padding: 10
    },
    icon: {
        alignSelf: 'center',
        justifyContent: 'center',
        ...Platform.select({
            android: {
                marginTop: 10,
                alignSelf: 'flex-start',
                justifyContent: 'flex-start'
            }
        })
    }
});
