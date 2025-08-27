import {omit, get} from 'lodash/fp';
import i18 from 'i18next';
import {
    fetch as getNetworkInfo,
    refresh as getNetworkInfoRefresh
} from '@react-native-community/netinfo';

import {Platform} from 'react-native';
import {
    cleanRoute,
    NavigateOptions,
    navigate,
    navigateBack
} from '../navigation/utils';
import {PopupScreens, RootStackParamList} from '../navigation/StackParamsList';
import {PopupProps} from './types';
import {
    DeepLinkPopupProps,
    ErrorPopupProps,
    ForceUpgradePopupProps,
    GenericPopupProps,
    InfoPopupProps,
    LoadingCallbackProps,
    LoadingPopupProps,
    StatusMessages,
    StatusPopupProps,
    ShareToLinkedInPopupProps,
    ActionPopupProps,
    AttachmentPopupProps,
} from '../screens/popups/type';

export const openPopup = <T extends object>({
    popupName,
    params
}: {
    popupName: keyof RootStackParamList;
} & PopupProps<T>) => {
    navigate({name: popupName, params});
};

export const closePopup = (name?: PopupScreens) => {
    if (name) {
        cleanRoute(name);

        return;
    }

    navigateBack();
};

export const updatePopup = <T extends object>({
    popupName,
    params
}: {
    popupName: keyof RootStackParamList;
} & PopupProps<T>) =>
    navigate({name: popupName, params, option: NavigateOptions.Replace});

export const openGenericPopup = (props: PopupProps<GenericPopupProps>) => {
    openPopup({popupName: 'GenericPopup', ...props});

    // allows close exactly this popup
    return () => cleanRoute('GenericPopup', props.params);
};

export const updateGenericPopup = (props: PopupProps<GenericPopupProps>) =>
    updatePopup({popupName: 'GenericPopup', ...props});

export const closeGenericPopup = () => closePopup(PopupScreens.GENERIC_POPUP);

export const openStatusPopup = (props: PopupProps<StatusPopupProps>) => {
    openPopup({popupName: 'StatusPopup', ...props});

    // allows close exactly this popup
    return () => cleanRoute('StatusPopup', props.params);
};
export const openErrorPopup = (props: PopupProps<ErrorPopupProps>) => {
    openPopup({popupName: 'ErrorPopup', ...props});

    // allows close exactly this popup
    return () => cleanRoute('StatusPopup', props.params);
};

export const updateStatusPopup = (props: PopupProps<StatusPopupProps>) =>
    updatePopup({popupName: 'StatusPopup', ...props});

export const openInfoPopup = (props: PopupProps<InfoPopupProps>) =>
    openPopup({popupName: 'InfoPopup', ...props});

export const openLoadingPopup = (props: PopupProps<LoadingPopupProps>) => {
    openPopup({popupName: 'LoadingPopup', ...props});
};
export const openShareToLinkedInPopup = (props: PopupProps<ShareToLinkedInPopupProps>) => {
    openPopup({popupName: 'ShareToLinkedInPopup', ...props});
};

export const openActionPopup = (props: PopupProps<ActionPopupProps>) => {
    openPopup({popupName: 'ActionPopup', ...props});
};

export const openAttachmentsPopup = (props: PopupProps<AttachmentPopupProps>) => {
    openPopup({popupName: 'AttachmentPopup', ...props});
};

const updateIssuingGenericPopup = ({
    navigator,
    params
}: LoadingCallbackProps) => {
    const route = navigator.current?.getCurrentRoute();
    if (get('params.issuingInProgress', route)) {
        updatePopup({
            popupName: 'LoadingPopup',
            params: omit(['callback'], params)
        });
        return;
    }
    openPopup({
        popupName: 'LoadingPopup',
        params: omit(['callback'], params)
    });
};

export const openNetworkConnectionPopup = (
    props: PopupProps<LoadingPopupProps>
) =>
    openPopup({
        popupName: 'LoadingPopup',
        params: {...props.params, callback: updateIssuingGenericPopup}
    });

export const openForceUpgradePopup = (
    props: PopupProps<ForceUpgradePopupProps>
) => openPopup({popupName: 'ForceUpgradePopup', ...props});

export const openDeepLinkPopup = (props: PopupProps<DeepLinkPopupProps>) =>
    openPopup({popupName: 'DeepLinkPopup', ...props});

export const openNoInternetPopupIfOffline = async (
    params: Partial<StatusPopupProps> = {}
) => {
    const {isConnected: isConnectedFetch} = await getNetworkInfo();
    const isAndroidNetworkConnected =
        Platform.OS === 'android'
            ? (await getNetworkInfoRefresh()).isConnected
            : undefined;

    if (!isConnectedFetch || isAndroidNetworkConnected === false) {
        return openStatusPopup({
            params: {
                title: i18.t('No internet connection'),
                text: i18.t('Close the app and \ntry again later'),
                statusType: StatusMessages.ConnectionBroken,
                ...params
            }
        });
    }

    return undefined;
};

export const openOfflineModeAwareErrorPopup = async (
    {
        title,
        subTitle = ''
    }: {
        title: string;
        subTitle?: string;
    },
    onPress?: () => void
) => {
    const isOfflinePopupVisible = await openNoInternetPopupIfOffline({onPress});

    if (isOfflinePopupVisible) {
        return;
    }

    openStatusPopup({
        params: {
            title,
            text: subTitle,
            statusType: StatusMessages.Error
        }
    });
};
