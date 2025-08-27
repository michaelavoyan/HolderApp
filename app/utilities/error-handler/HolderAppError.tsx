import {ErrorMapCases} from './errorsMap';

export class HolderAppError extends Error {
    errorCode?: keyof ErrorMapCases;

    context?: {organizationName?: string};

    constructor(error: {
        errorCode: keyof ErrorMapCases;
        context?: {
            organizationName?: string;
            organizationEmail?: string;
            credentialType?: string;
            sentryMessage?: string;
        };
    }) {
        super(error.errorCode);

        this.context = error.context;
        this.errorCode = error.errorCode;
        this.message = error.errorCode;
    }
}
