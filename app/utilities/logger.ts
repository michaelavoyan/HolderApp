import * as Sentry from '@sentry/react-native';
import LogRocket from '@logrocket/react-native';
import {VCLEnvironment, VCLError} from '@velocitycareerlabs/vcl-react-native';
import {localConfigs, VCL_ENVIRONMENT} from '../configs';

/**
 * If you want to send the log message to Sentry, please provide shouldLogToSentry boolean parameter
 */
export const vclLogger = {
    info: (...args: unknown[]) => {
        if (
            __DEV__ ||
            VCL_ENVIRONMENT === VCLEnvironment.Dev ||
            VCL_ENVIRONMENT === VCLEnvironment.Qa
        ) {
            console.info(...args);
        }

        // @ts-ignore
        const {shouldLogToSentry = false, ...subsetArgs} = args;
        if (shouldLogToSentry) {
            trackMessageSentry(subsetArgs);
        }
    },
    warn: (...args: unknown[]) => {
        if (
            __DEV__ ||
            VCL_ENVIRONMENT === VCLEnvironment.Dev ||
            VCL_ENVIRONMENT === VCLEnvironment.Qa
        ) {
            console.warn(...args);
        }

        // @ts-ignore
        const {shouldLogToSentry = false, ...subsetArgs} = args;
        if (shouldLogToSentry) {
            trackMessageSentry(subsetArgs);
        }
    },
    /**
     * @param error error object for both, console. error and Sentry
     * @param consoleError overrides error object for console. error if should be different
     * @param sentryCaptureContext sentry context config
     */
    error: (
        error: unknown,
        consoleError?: unknown,
        sentryCaptureContext?: any
    ) => {
        if (__DEV__) {
            // debug builds
            console.error(`VCL ${consoleError || error || 'Unknown error'}`);
        } else {
            // release builds
            LogRocket.getSessionURL((sessionURL) => {
                Sentry.setExtra('sessionURL', sessionURL);
            });

            trackErrorSentry(sentryCaptureContext, error);

            trackLogRocket(consoleError, error);
        }
    }
};

const trackErrorSentry = (sentryCaptureContext: any, error: any) => {
    const extra = sentryCaptureContext?.extra
        ? {
            ...sentryCaptureContext.extra,
            ...getExtras(error, localConfigs.errorReportId)
        }
        : getExtras(error, localConfigs.errorReportId);

    Sentry.captureException(error, {
        ...sentryCaptureContext,
        extra,
        tags: {
            ...getExtras(error, localConfigs.errorReportId)
        }
    });
};

const trackMessageSentry = (...args: unknown[]) => {
    Sentry.captureMessage(JSON.stringify(args));
};

const trackLogRocket = (consoleError: any, error: any) => {
    if (localConfigs.logRocketEnabled) {
        console.error(consoleError || error);

        LogRocket.captureException(error, {
            extra: {...getExtras(error, localConfigs.errorReportId)}
        });
    }
};

export const getExtras = (error: Error | VCLError, defaultErrorReportId: string) => {
    const {requestId} = error as VCLError;
    return {
        errorReportId: requestId || defaultErrorReportId
    };
};
