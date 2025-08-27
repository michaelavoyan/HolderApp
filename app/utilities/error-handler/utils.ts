import {ErrorMapCases} from './errorsMap';
import {HolderAppError} from './HolderAppError';

export const throwVCLError = (error: {
    errorCode: keyof ErrorMapCases;
    context?: {
        organizationName?: string;
        organizationEmail?: string;
        credentialType?: string;
        sentryMessage?: string;
    };
}) => {
    throw new HolderAppError(error);
};
