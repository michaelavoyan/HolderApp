import {AppState} from 'react-native';
import {call} from 'redux-saga/effects';
import {PopupScreens} from 'app/navigation/StackParamsList';
import {isNetworkConnectionError} from 'app/store/helpers/common';
import {OffersSaga} from 'app/store/types/claim';
import {HolderAppError} from 'app/utilities/error-handler/HolderAppError';
import {errorHandlerPopup} from 'app/utilities/error-handler/errorHandlerPopup';
import {closePopup, updateStatusPopup} from 'app/utilities/popups';

import {ERRORS} from '../../errors/claim';
import {pushTokenEffect} from '../../push';
import {getCredentialsError} from '../helpers';
import {credentialManifestEffect} from './credentialManifestEffect';

export function* claimingCredentialEffect(
    action: OffersSaga
): Generator<any, void, any> {
    try {
        const pushToken: string = yield call(pushTokenEffect, true);
        if (Array.isArray(pushToken)) {
            if (isNetworkConnectionError(pushToken[0])) {
                closePopup(PopupScreens.STATUS_POPUP);
                return;
            }
            updateStatusPopup({params: ERRORS.pushToken});
            return;
        }

        yield call(credentialManifestEffect, {
            ...action,
            pushToken
        });
    } catch (error) {
        if (AppState.currentState === 'background') {
            errorHandlerPopup(
                new HolderAppError({
                    errorCode: 'stop_searching_offers'
                })
            );
            return;
        }
        getCredentialsError(error);
    }
}
