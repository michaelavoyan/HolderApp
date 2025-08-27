import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {Camera, useCameraDevice, useCodeScanner} from 'react-native-vision-camera';
import {StackScreenProps} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {isIOS} from 'app/utilities/helpers';

import {SVG} from 'app/assets/icons';
import {HolderAppError} from 'app/utilities/error-handler/HolderAppError';
import {DisclosureCredentialsToIssuerParams} from 'app/store/types/disclosure';

import {setIssuingSequence} from 'app/store/actions/common';
import {useSplashScreen} from 'app/utilities/hooks/useSplashScreen';
import {
    PERMISSIONS,
    RESULTS,
    openSettings,
    request
} from 'react-native-permissions';
import {disableBiometry} from 'app/store/actions/auth';
import {openGenericPopup} from 'app/utilities/popups';
import {useTranslation} from 'react-i18next';
import {Code} from 'react-native-vision-camera/src/types/CodeScanner';
import {DEFAULT_BAR, ScanQRScreen} from 'app/components/ScanQR';
import { BarData} from 'app/components/Profile/typings/types';
import {RootStackParamList} from 'app/navigation/StackParamsList';

import {DeepLinkOptions} from 'app/utilities/types';
import {savedOriginalIssuingSessionSelector} from 'app/store/selectors/disclosure';
import {
    deepLinksOptions,
    linkHandler,
    useGenerateOffersByDeepLink
} from '../../utilities/qr';
import {
    NewSessionWorkflows,
    startAnotherIssuingWithSameIssuer,
    useClaimingMissingCredential
} from '../../utilities/hooks/useClaimingMissingCredential';

import {errorHandlerPopup} from '../../utilities/error-handler/errorHandlerPopup';
import {useCasesErrorsMapItems} from '../../utilities/error-handler/errorsMap';
import {throwVCLError} from '../../utilities/error-handler/utils';
import {checkIfIssuingNotRequireSharingIdCredentials} from '../../api/disclosure';
import {validateLinksArray} from './utils';

const DEFAULT_POPUP = {data: {subTitle: ''}, isVisible: false};
const INSPECTION_PATH = 'DisclosureRequest';
const ISSUING_PATH = 'DisclosureCredentialsToIssuer';

type Props = StackScreenProps<RootStackParamList, 'ScanQR'>;

const POPUP_ANIMATION_TIME = 350;

export const ScanQR: React.FC<Props> = ({navigation}) => {
    const scanQRScreenRef = useRef<React.ElementRef<typeof ScanQRScreen>>(null);
    const dispatch = useDispatch();

    const qrCodeData = useRef<BarData['data']>(DEFAULT_BAR.data);

    const setQrCodeData = (data: BarData['data']) => {
        qrCodeData.current = data;
    };

    const setQrCodeInfo = (info: BarData) => {
        scanQRScreenRef.current?.setQrImageBounds(info);
    };

    const [showFrame, setShowFrame] = useState(true);
    const [qrReadFinish, setQrReadFinish] = useState(false);

    const [popup, setPopup] = useState<{
        data: {
            title?: string;
            subTitle: string;
            icon?: string;
        };
        isVisible: boolean;
    }>(DEFAULT_POPUP);
    const savedIssuingSession: null | DisclosureCredentialsToIssuerParams =
        useSelector(savedOriginalIssuingSessionSelector);

    const {startAnotherIssuing} = useClaimingMissingCredential();

    const {generateOffersByDeepLinkWithRedirect} =
        useGenerateOffersByDeepLink();
    const {isShownSplashScreen} = useSplashScreen();
    const [isCameraReady, setIsCameraReady] = useState(false);
    const {t} = useTranslation();

    useEffect(() => {
        (async () => {
            try {
                dispatch(disableBiometry(true));
                const permission = await request(
                    isIOS ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA
                );

                if (permission === RESULTS.GRANTED) {
                    setIsCameraReady(true);
                }

                if (
                    permission === RESULTS.BLOCKED ||
                    permission === RESULTS.DENIED
                ) {
                    openGenericPopup({
                        params: {
                            title: t('Warning'),
                            description: t(
                                'Access to the camera has been denied, please enable it in the Settings to continue'
                            ),
                            buttons: [
                                {
                                    title: t('Ok'),
                                    onPress: navigation.goBack,
                                    closePopupOnPress: true
                                },
                                {
                                    title: t('Open setting'),
                                    onPress: openSettings
                                }
                            ]
                        }
                    });
                }
            } catch {
                setIsCameraReady(false);
            } finally {
                dispatch(disableBiometry(false));
            }
        })();
    }, [dispatch, t, navigation]);

    const onCancel = useCallback(() => {
        setQrReadFinish(false);
        setPopup(DEFAULT_POPUP);
        navigation.goBack();
    }, [navigation]);

    const goToDisclosure = useCallback(async () => {
        try {
            const {path, ...params} = qrCodeData.current;
            setPopup(DEFAULT_POPUP);

            const {isShouldSkipIdentityDisclosureStep, credentialManifest} =
                await checkIfIssuingNotRequireSharingIdCredentials(
                    params.deepLink,
                    params.vendorOriginContext
                );

            if (isShouldSkipIdentityDisclosureStep && credentialManifest) {
                generateOffersByDeepLinkWithRedirect(params.deepLink, credentialManifest);

                return;
            }

            // wait for popup animation
            setTimeout(() => {
                navigation.replace(
                    path === DeepLinkOptions.inspect
                        ? INSPECTION_PATH
                        : ISSUING_PATH,
                    params as
                        | RootStackParamList['DisclosureRequest']
                        | RootStackParamList['DisclosureCredentialsToIssuer']
                );
            }, POPUP_ANIMATION_TIME);
        } catch (error) {
            setQrReadFinish(false);
            await errorHandlerPopup(
                error,
                `goToDisclosure - ${JSON.stringify(error)}`,
                undefined,
                undefined,
                useCasesErrorsMapItems.qrIssuingInspection
            );
        }
    }, [generateOffersByDeepLinkWithRedirect, navigation]);

    const onReadQr = useCallback(
        async (code: Code) => {
            setQrReadFinish(true);
            try {
                if (code.value) {
                    setShowFrame(false);
                    setQrCodeInfo({
                        bounds: code.frame || DEFAULT_BAR.bounds,
                        data: qrCodeData.current
                    });
                }

                // the same QR code
                if (code.value === qrCodeData.current.deepLink) {
                    return undefined;
                }
                const {queryParams, path, isCorrectProtocol} = linkHandler(code.value || '');

                if (!isCorrectProtocol) {
                    return throwVCLError({
                        errorCode: 'wrong_deeplink_protocol'
                    });
                }
                const splitStrings = queryParams.split('&request_uri=');
                const resultArray = splitStrings.map((str) => {
                    return str.startsWith('request_uri=')
                        ? str
                        : `request_uri=${str}`;
                });
                if (resultArray.length > 1) {
                    const haveValidLink = await validateLinksArray(
                        resultArray,
                        path
                    );
                    if (!haveValidLink) {
                        return throwVCLError({
                            errorCode: 'wrong_deeplink_protocol'
                        });
                    }
                    dispatch(setIssuingSequence(resultArray, path));
                } else {
                    setQrCodeData({deepLink: code.value, path});

                    const linkOption = deepLinksOptions[path];

                    if (!queryParams || !linkOption) {
                        return throwVCLError({
                            errorCode: 'wrong_deeplink_protocol'
                        });
                    }
                    const params = linkOption.parseParams(queryParams);
                    const popupInfo = await linkOption.popup(
                        code.value || '',
                        'QRcode'
                    );

                    if (popupInfo === null) {
                        return throwVCLError({
                            errorCode: 'wrong_deeplink_protocol'
                        });
                    }

                    if (path === DeepLinkOptions.inspect) {
                        setQrCodeData({
                            ...params,
                            deepLink: code.value,
                            path
                        });
                    }
                    if (popupInfo.issuer) {
                        setQrCodeData({
                            disclosureId: popupInfo.issuer.id,
                            service: popupInfo.issuer.service,
                            types: popupInfo.issuer.credentialTypes,
                            issuer: popupInfo.issuer,
                            deepLink: code.value,
                            vendorOriginContext: params.vendorOriginContext,
                            path
                        });
                    }

                    if (savedIssuingSession) {
                        if (
                            path === DeepLinkOptions.issue &&
                            popupInfo?.issuer?.id &&
                            popupInfo?.issuer?.id ===
                            savedIssuingSession?.issuer?.id
                        ) {
                            startAnotherIssuingWithSameIssuer();
                            return undefined;
                        }
                        startAnotherIssuing(
                            savedIssuingSession,
                            path === DeepLinkOptions.issue
                                ? NewSessionWorkflows.claim
                                : NewSessionWorkflows.share,
                            () => {
                                setPopup({data: popupInfo, isVisible: true});
                            }
                        );
                        return undefined;
                    }

                    setPopup({data: popupInfo, isVisible: true});
                }
            } catch (error) {
                const {path} = linkHandler(code.value || '');
                const useCase =
                    error instanceof HolderAppError &&
                    error?.errorCode ===
                    'sdk_verified_profile_wrong_service_type' &&
                    path === DeepLinkOptions.inspect
                        ? useCasesErrorsMapItems.inspection
                        : useCasesErrorsMapItems.qrIssuingInspection;

                await errorHandlerPopup(
                    error,
                    `onReadQr - ${JSON.stringify(error)}`,
                    true,
                    navigation.goBack,
                    useCase
                );
            }

            return undefined;
        },
        [dispatch, navigation.goBack, savedIssuingSession, startAnotherIssuing]
    );

    const device = useCameraDevice('back')
    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: (codes) => {
            if (!qrReadFinish && codes?.length > 0) {
                onReadQr(codes[0]);
            }
        }
    })
    return (
        <>
            <StatusBar barStyle="dark-content" hidden/>
            <ScanQRScreen
                onCancel={onCancel}
                onClose={onCancel}
                onOpen={goToDisclosure}
                isModalVisible={popup.isVisible}
                popup={popup.data}
                ref={scanQRScreenRef}
                isActive={!isShownSplashScreen}>
                {isCameraReady && device ? (
                    <Camera
                        codeScanner={codeScanner}
                        style={styles.cameraContainer}
                        device={device}
                        isActive
                    >
                        {showFrame && SVG('', 180)[isIOS ? 'qr-ios' : 'qr-android']}
                    </Camera>
                ) : null}
            </ScanQRScreen>
        </>
    );
};

const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
