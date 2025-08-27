import {put, select, call} from 'redux-saga/effects';
import {AppState} from 'react-native';
import {
    VCLCredentialManifestDescriptorByService,
    VCLCredentialManifestDescriptorByDeepLink,
    VCLCredentialManifest,
    VCLError,
    VCLToken
} from '@velocitycareerlabs/vcl-react-native';
import {isEmpty} from 'lodash/fp';
import {HolderAppError} from 'app/utilities/error-handler/HolderAppError';
import {errorHandlerPopup} from 'app/utilities/error-handler/errorHandlerPopup';
import {closePopup} from 'app/utilities/popups';

import {configSelector, pushUrlSelector} from 'app/store/selectors';
import {throwVCLError} from 'app/utilities/error-handler/utils';
import {isIOS} from 'app/utilities/helpers';

import {CredentialManifestEffect} from 'app/store/types/claim';
import {runWithAccessToken, getAccessToken} from 'app/api/api';
import {IConfig} from 'app/store/types/appConfig';
import {getOauthTokens} from 'app/storage/oauth';
import * as actions from '../../../actions';
import {
    closeOpenedTempUserFirstIssuingSession,
    getCredentialsError
} from '../helpers';
import {generateOffersEffect} from './generateOffersEffect';
import {checkVCLError} from '../../errors/helpers';
import {VclReactNativeSdkWrapper} from '../../../../api/vcl-react-native-sdk-wrapper';

export function* credentialManifestEffect(action: CredentialManifestEffect) {
    try {
        const {
            service,
            pushToken,
            deepLink,
            did,
            credentialManifest: defaultCredentialManifest
        } = action;
        const config: IConfig = yield select(configSelector);
        // TODO: temp fix, remove it when Android SDK is updated
        if (!deepLink && !service && !isIOS) {
            throwVCLError({errorCode: 'issuing_get_manifest_error'});
        }

        const pushUrl: string = yield select(pushUrlSelector);
        const {didJwk} = yield call(getOauthTokens);
        const accessToken: string = yield call(getAccessToken, config);

        const credentialManifestDescriptor:
        | VCLCredentialManifestDescriptorByService
        | VCLCredentialManifestDescriptorByDeepLink = {
            ...(deepLink? {deepLink: {value: deepLink}} : {service}),
            pushDelegate: {
                pushToken,
                pushUrl
            },
            didJwk,
            did: did ?? '',
            remoteCryptoServicesToken: {value: accessToken} as VCLToken
        };
        // `defaultCredentialManifest` was used in Yoti flow in order to get offers according to the appropriate `exchangeId`
        // a call of `getCredentialManifest` creates a new `exchangeId` and cause 202 response in `checkOffers`

        const credentialManifest: VCLCredentialManifest =
            defaultCredentialManifest ||
            (yield runWithAccessToken(
                config,
                VclReactNativeSdkWrapper.getCredentialManifest,
                credentialManifestDescriptor
            ));

        if (isEmpty(credentialManifest)) {
            throwVCLError({errorCode: 'issuing_get_manifest_error'});
        }

        if (!action.isNewWaiting) {
            yield put(actions.setCredentialManifest({credentialManifest}));
        }

        yield call(generateOffersEffect, {...action, credentialManifest});
    } catch (e) {
        closePopup();
        if (AppState.currentState === 'background') {
            errorHandlerPopup(
                new HolderAppError({
                    errorCode: 'stop_searching_offers'
                }),
                null,
                undefined,
                closeOpenedTempUserFirstIssuingSession
            );
        } else if (e instanceof VCLError) {
            checkVCLError(e, '');
        } else {
            yield getCredentialsError(e);
        }
    }
}
