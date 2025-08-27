import {t} from 'i18next';
import {StackNavigationProp} from '@react-navigation/stack';
import {Dispatch} from 'redux';
import {HolderAppError} from 'app/utilities/error-handler/HolderAppError';
import {errorHandlerPopup} from 'app/utilities/error-handler/errorHandlerPopup';
import {useCasesErrorsMapItems} from 'app/utilities/error-handler/errorsMap';
import {vclLogger} from 'app/utilities/logger';
import {openStatusPopup} from 'app/utilities/popups';
import {deepLinksOptions} from 'app/utilities/qr';
import {DeepLinkOptions} from 'app/utilities/types';
import {RootStackParamList} from 'app/navigation/StackParamsList';
import {BarData} from 'app/components/Profile/typings/types';
import {jumpNextIssuingSequence} from 'app/store/actions/common';
import {StatusMessages} from '../popups/type';

export const validateLinksArray = async (
    linksArray: string[],
    path: string
) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const queryParams of linksArray) {
        const data = `${path}?${queryParams}`;
        const linkOption = deepLinksOptions[path];

        try {
            // eslint-disable-next-line no-await-in-loop
            await linkOption.popup(data, 'QRcode');
            return true;
        } catch (error) {
            vclLogger.error(`validateLinksArray - ${JSON.stringify(error)}`);
        }
    }
    return false;
};

export const manageMultipleLinks = (
    linksArray: string[],
    path: string,
    isNotFirstStep: boolean,
    skipPopup: boolean,
    navigation: StackNavigationProp<
        RootStackParamList,
        keyof RootStackParamList,
        undefined
    >,
    dispatch: Dispatch<any>
) => {
    if (skipPopup) {
        manageSingleLink(linksArray, path, navigation, dispatch);
    } else {
        openStatusPopup({
            params: {
                title: t(
                    isNotFirstStep
                        ? 'Get ready to receive more credentials'
                        : 'Get ready to receive your credentials'
                ),
                text: t(
                    isNotFirstStep
                        ? 'You have more offers waiting for you'
                        : 'You have offers waiting for you from several issuers '
                ),
                statusType: StatusMessages.Shared,
                onPress: () =>
                    manageSingleLink(linksArray, path, navigation, dispatch),
                buttonTitle: t(isNotFirstStep ? 'Continue' : 'Start')
            }
        });
    }
};

const manageSingleLink = async (
    linksArray: string[],
    path: string,
    navigation: StackNavigationProp<
        RootStackParamList,
        keyof RootStackParamList,
        undefined
    >,
    dispatch: Dispatch<any>
) => {
    try {
        const queryParams = linksArray[0];
        const data = `${path}?${queryParams}`;
        const linkOption = deepLinksOptions[path];
        const params = linkOption.parseParams(queryParams);
        const popupInfo = await linkOption.popup(data, 'QRcode');
        let qrCodeData: BarData['data'] = {};
        if (popupInfo?.issuer) {
            qrCodeData = {
                disclosureId: popupInfo.issuer.id,
                service: popupInfo.issuer.service,
                types: popupInfo.issuer.credentialTypes,
                issuer: popupInfo.issuer,
                deepLink: data,
                vendorOriginContext: params.vendorOriginContext,
                path
            };
        }
        goToDisclosure(qrCodeData, navigation);
    } catch (error) {
        if (
            linksArray.length > 1 &&
            (error as HolderAppError).errorCode === 'exchange_invalid'
        ) {
            dispatch(jumpNextIssuingSequence(true));
        } else {
            const useCase =
                error instanceof HolderAppError &&
                error?.errorCode ===
                    'sdk_verified_profile_wrong_service_type' &&
                path === DeepLinkOptions.inspect
                    ? useCasesErrorsMapItems.inspection
                    : useCasesErrorsMapItems.qrIssuingInspection;

            errorHandlerPopup(
                error,
                `onReadQr - ${JSON.stringify(error)}`,
                true,
                () => {
                    dispatch(jumpNextIssuingSequence());
                    navigation.goBack();
                },
                useCase
            );
        }
    }

    return undefined;
};

const goToDisclosure = async (
    data: BarData['data'],
    navigation: StackNavigationProp<
        RootStackParamList,
        keyof RootStackParamList,
        undefined
    >
) => {
    try {
        // wait for popup animation
        setTimeout(() => {
            navigation.replace(
                'DisclosureCredentialsToIssuer',
                data as RootStackParamList['DisclosureCredentialsToIssuer']
            );
        }, 350);
    } catch (error) {
        errorHandlerPopup(
            error,
            `goToDisclosure - ${JSON.stringify(error)}`,
            undefined,
            undefined,
            useCasesErrorsMapItems.qrIssuingInspection
        );
    }
};
