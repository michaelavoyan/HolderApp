import {VCLError} from '@velocitycareerlabs/vcl-react-native';
import {navigate} from 'app/navigation/utils';
import {HolderAppError} from 'app/utilities/error-handler/HolderAppError';
import {errorHandlerPopup} from 'app/utilities/error-handler/errorHandlerPopup';
import { isVerificationError} from 'app/utilities/helpers';

export const checkVCLError = (
    e: VCLError,
    organizationName: string,
    organizationEmail?: string,
    credentialType?: string
) => {
    if (isVerificationError(e)) {
        const {profileName} = JSON.parse(e.message);
        errorHandlerPopup(
            new HolderAppError({
                errorCode: 'sdk_verified_profile_wrong_service_type',
                context: {organizationName: profileName}
            }),
            null,
            undefined,
            () => {
                navigate({name: 'ProfileTab'});
            }
        );
    } else {
        errorHandlerPopup(
            new HolderAppError({
                errorCode: e.errorCode as any,
                context: {
                    organizationName,
                    organizationEmail,
                    credentialType: credentialType || ''
                }
            }),
            null,
            true,
            () => {
                navigate({name: 'ProfileTab'});
            },
        );
    }
};
