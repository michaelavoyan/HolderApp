import { ReclaimVerification } from '@reclaimprotocol/inapp-rn-sdk';
import { IConfig } from 'app/store/types/appConfig';
import { vclLogger } from 'app/utilities/logger';
import { hasValue } from 'app/utilities/helpers';
import { Dictionary } from 'app/utilities/types';

export const assertReclaimEnabled = (appConfig: IConfig) => {
    const { reclaim } = appConfig;

    if (!reclaim) {
        vclLogger.info('Reclaim config not present, feature is optional');
        return null;
    }

    if (!reclaim.enabled) {
        vclLogger.info('Reclaim feature disabled in this environment');
        return null;
    }

    // Enabled but misconfigured
    if (!hasValue(reclaim.appId) || !hasValue(reclaim.secret)) {
        vclLogger.error('Reclaim credentials are missing or empty');
        throw new Error('Reclaim appId and secret are required when enabled');
    }

    return reclaim;
};

export type ReclaimProofBundle = {
    /**
     * The list of proofs generated during the verification attempt
     */
    proofs?: Dictionary<any>[];
    /**
     * The session ID for the verification attempt
     */
    sessionId?: string;
    /**
     * Whether the proof was submitted manually
     */
    didSubmitManualVerification?: boolean;
    exception?: {
        message?: string;
        innerError?: Error;
        type?: ReclaimVerification.ExceptionType;
        sessionId?: string;
        didSubmitManualVerification?: boolean;
        reason?: string;
    };
};

// For DI purposes
export interface IReclaimVerification {
    startVerification(input: {
        providerId: string;
        appId: string;
        secret: string;
    }): Promise<ReclaimProofBundle>;
}

export class ReclaimSdkWrapper {
    constructor(
        private readonly reclaimVerification: IReclaimVerification = new ReclaimVerification()
    ) {}

    async startVerification(
        providerId: string,
        appId: string,
        secret: string
    ): Promise<ReclaimProofBundle> {
        try {
            return await this.reclaimVerification.startVerification({
                appId,
                secret,
                providerId,
            });
        } catch (ex: any) {
            return {
                exception: {
                    message: ex.message,
                    innerError: ex.innerError,
                    type: ex.type,
                    sessionId: ex.sessionId,
                    didSubmitManualVerification: ex.didSubmitManualVerification,
                    reason: ex.reason,
                },
            };
        }
    }
}

export const reclaimSdkWrapper = new ReclaimSdkWrapper();
