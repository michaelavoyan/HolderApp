import {
    VCLOffers,
    VCLCredentialManifest,
    VCLError
} from '@velocitycareerlabs/vcl-react-native';
import {getOr, isEmpty} from 'lodash/fp';
import {eventChannel, END} from 'redux-saga';
import {put, select, call} from 'redux-saga/effects';
import {AppState} from 'react-native';
import {jwtDecode} from 'app/jwt/core';
import {setIsTempUserFirstIssuingSessionActiveAction} from 'app/store/actions/disclosure';
import {getReduxStore} from 'app/store/helpers/getStore';
import {savedOriginalIssuingSessionSelector} from 'app/store/selectors/disclosure';
import {errorHandlerPopup} from 'app/utilities/error-handler/errorHandlerPopup';
import {HolderAppError} from 'app/utilities/error-handler/HolderAppError';
import {throwVCLError} from 'app/utilities/error-handler/utils';

import {closePopup} from 'app/utilities/popups';
import {DisclosureCredentialsToIssuerParams} from 'app/store/types/disclosure';
import * as actions from '../../actions';
import {checkVCLError} from '../errors/helpers';

export const closeOpenedTempUserFirstIssuingSession = () => {
    getReduxStore().dispatch(
        setIsTempUserFirstIssuingSessionActiveAction(false)
    );
};

export const getCredentialsError = (e?: any) => {
    errorHandlerPopup(
        new HolderAppError({
            errorCode: 'default_generate_offers_error'
        }),
        JSON.stringify(e),
        undefined,
        closeOpenedTempUserFirstIssuingSession
    );
};

export const countdown = (secs: number) =>
    eventChannel((emitter) => {
        const interval = setInterval(() => {
            secs -= 1;
            if (secs > 0) {
                emitter(secs);
            } else {
                // this causes the channel to close
                emitter(END);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    });

// eslint-disable-next-line func-names
export const handleEmptyResponse = function* (
    savedIssuingSession: null | DisclosureCredentialsToIssuerParams,
    issuerName: string,
    issuerEmail?: string
) {
    if (savedIssuingSession) {
        yield put(actions.clearOriginalIssuingSession());
    }

    throwVCLError({
        errorCode: 'offers_not_found_synch',
        context: {
            organizationName: issuerName,
            organizationEmail: issuerEmail
        }
    });
};

// eslint-disable-next-line func-names
export const validateOffersResponse = function* (
    response: VCLOffers,
    credentialManifest: VCLCredentialManifest
) {
    if (response.responseCode === 200 && isEmpty(response.all)) {
        const savedIssuingSession: null | DisclosureCredentialsToIssuerParams =
            yield select(savedOriginalIssuingSessionSelector);

        const issuerName = getOr(
            '',
            'claimsSet.metadata.client_name',
            jwtDecode(credentialManifest.jwt.encodedJwt)
        );

        yield call(
            handleEmptyResponse,
            savedIssuingSession,
            issuerName,
            credentialManifest.verifiedProfile.credentialSubject.contactEmail
        );
    }

    if (
        response.all.some(
            (item) =>
            item.issuerId !== credentialManifest.did
        )
    ) {
        throwVCLError({errorCode: 'invalid_vendor_id'});
    }
};

export const handleOffersError = (
    e: unknown,
    credentialManifest: VCLCredentialManifest,
    categoryTitle?: string
) => {
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
        return;
    }

    if (e instanceof HolderAppError) {
        setTimeout(
            () =>
                errorHandlerPopup(
                    e,
                    null,
                    undefined,
                    closeOpenedTempUserFirstIssuingSession
                ),
            0
        );
        return;
    }

    const issuerName = getOr(
        '',
        'claimsSet.metadata.client_name',
        jwtDecode(credentialManifest.jwt.encodedJwt)
    );

    const issuerEmail =
        credentialManifest.verifiedProfile.credentialSubject.contactEmail || '';

    if (e instanceof VCLError) {
        checkVCLError(e, issuerName, issuerEmail, categoryTitle);
        return;
    }

    errorHandlerPopup(
        new HolderAppError({
            errorCode: 'default_generate_offers',
            context: {
                organizationName: issuerName
            }
        }),
        null,
        undefined,
        closeOpenedTempUserFirstIssuingSession
    );
};
