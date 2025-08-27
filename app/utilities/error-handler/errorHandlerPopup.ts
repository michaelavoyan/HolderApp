import {VCLError} from '@velocitycareerlabs/vcl-react-native';
import {isEmpty} from 'lodash';
import {getOr} from 'lodash/fp';
import {VclMixpanel} from 'app/mixpanel/VclMixpanel';
import {navigate} from 'app/navigation/utils';
import i18n from '../../i18n';
import {localConfigs} from '../../configs';
import {openErrorPopup, openNoInternetPopupIfOffline} from '../popups';
import {
    ErrorMapItems,
    ErrorCodesWithoutSendReportButton,
    genericErrorsMap
} from './errorsMap';
import {HolderAppError} from './HolderAppError';
import {vclLogger} from '../logger';

export const errorHandlerPopup = async (
    error: HolderAppError | VCLError | any,
    /**
     * The above error stringified with additional information
     */
    stringifiedErrorToLog?: string | undefined | null,
    /**
     * Show offline mode popup if app is offline instead of actual error
     */
    isOfflineModeAware?: boolean,
    onPress?: () => void,
    /**
     * Override or add errors map for specific use-cases
     */
    useCasesErrorsMap: ErrorMapItems = {}
) => {
    errorHandlerPopupLogger.logError(error, stringifiedErrorToLog || null);

    const mergedErrorsMap = {...genericErrorsMap, ...useCasesErrorsMap};

    if (isOfflineModeAware) {
        const isOfflinePopupVisible = await openNoInternetPopupIfOffline({
            onPress
        });

        if (isOfflinePopupVisible) {
            return;
        }
    }

    const defaultMessage =
        useCasesErrorsMap?.cases?.career_wallet_error ||
        genericErrorsMap.cases.career_wallet_error;

    let errorMessage: {
        title: string;
        subTitle?: string;
        titleFallback?: string;
        subTitleFallback?: string;
    } = {
        title: i18n.t(defaultMessage.title),
        subTitle: defaultMessage.subTitle
            ? i18n.t(defaultMessage.subTitle)
            : undefined
    };

    if (
        (error instanceof VCLError || error instanceof HolderAppError) &&
        error.errorCode &&
        mergedErrorsMap.cases[error.errorCode as keyof ErrorMapItems['cases']]
    ) {
        errorMessage =
            mergedErrorsMap.cases[
                error.errorCode as keyof ErrorMapItems['cases']
            ]!;
    }

    if (error.context) {
        error.context.credentialType = error?.context?.credentialType || '';
    }

    const getTextTranslated = () => {
        if (error instanceof HolderAppError) {
            let title;
            let subTitle;
            if (isEmpty(error.context)) {
                title = errorMessage.titleFallback
                    ? i18n.t(errorMessage.titleFallback)
                    : i18n.t(errorMessage.title);
                subTitle = errorMessage.subTitleFallback
                    ? i18n.t(errorMessage.subTitleFallback)
                    : i18n.t(errorMessage.subTitle || '');
            } else {
                title = i18n
                    .t(errorMessage.title, error.context || {})
                    .replace('  ', ' ');
                subTitle = errorMessage.subTitle
                    ? i18n
                          .t(errorMessage.subTitle, error.context || {})
                          .replace('  ', ' ')
                    : undefined;
            }

            return {
                title,
                subTitle
            };
        }
        return {
            title: i18n.t(errorMessage.titleFallback || errorMessage.title),
            subTitle: errorMessage.subTitle
                ? i18n.t(errorMessage.subTitleFallback || errorMessage.subTitle)
                : undefined
        };
    };

    if (error?.errorCode) {
        VclMixpanel.trackAppError({
            ErrorCode: error?.errorCode,
            ErrorReportId: error?.requestId || localConfigs.errorReportId,
            ...(useCasesErrorsMap && {
                Overload: useCasesErrorsMap.name
            })
        });
    }

    const errorCode = getOr('', 'errorCode', error);
    const isSendReportButtonVisible =
        !ErrorCodesWithoutSendReportButton.includes(errorCode);
    const onClose = onPress || (() => navigate({name: 'Profile'}));

    openErrorPopup({
        params: {
            ...getTextTranslated(),
            buttons: [
                {
                    onPress: onClose,
                    title: i18n.t('Close'),
                    closePopupOnPress: true
                },
                ...(isSendReportButtonVisible
                    ? [{title: i18n.t('Send report')}]
                    : [])
            ],
            errorCode: errorCode || 'career_wallet_error',
            errorReportId: error?.requestId || localConfigs.errorReportId,
            email: errorCodesWithEmailSet.has(errorCode)
                ? error?.context?.organizationEmail
                : ''
        }
    });
};

export const errorHandlerPopupLogger = {
    logError: (
        error: HolderAppError | VCLError | any,
        stringifiedErrorToLog?: string | undefined | null
    ) => {
        vclLogger.error(
            stringifiedErrorToLog ||
                error?.context?.sentryMessage ||
                JSON.stringify(error)
        );
    }
};
const errorCodesWithEmailSet = new Set([
    'offers_not_found_synch',
    'upstream_user_not_found',
    'offers_already_claimed_synch',
    'integrated_identification_user_not_found'
]);
