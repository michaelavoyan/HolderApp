import {put, select, takeEvery} from 'redux-saga/effects';
import {getOr, isEmpty} from 'lodash/fp';
import {
    VCLCredentialManifest,
    VCLCredentialManifestDescriptorByDeepLink,
    VCLCredentialManifestDescriptorByService,
    VCLError
} from '@velocitycareerlabs/vcl-react-native';
import {getDisclosures} from 'app/storage/disclosure';

import {jwtDecode} from 'app/jwt/core';
import {navigateBack, navigate} from 'app/navigation/utils';

import {isVerificationError} from 'app/utilities/helpers';
import {HolderAppError} from 'app/utilities/error-handler/HolderAppError';

import {runWithAccessToken, getAccessToken} from 'app/api/api';
import {getOauthTokens} from 'app/storage/oauth';
import {throwVCLError} from 'app/utilities/error-handler/utils';
import {
    AcceptedDisclosureRequestObject,
    DisclosureDataRequestSaga
} from '../types/disclosure';
import * as actions from '../actions';
import * as actionTypes from '../actionTypes/disclosure';
import {ERRORS} from './errors/disclosure';
import {pushTokenEffect} from './push';
import {SubmissionRequirementsRules} from '../../utilities/types';
import {openStatusPopup} from '../../utilities/popups';
import {inputDescriptors} from '../../jwt/vc';
import {vclLogger} from '../../utilities/logger';
import {configSelector, pushUrlSelector} from '../selectors';
import {errorHandlerPopup} from '../../utilities/error-handler/errorHandlerPopup';
import {useCasesErrorsMapItems} from '../../utilities/error-handler/errorsMap';
import {IConfig} from '../types/appConfig';
import {VclReactNativeSdkWrapper} from '../../api/vcl-react-native-sdk-wrapper';

function* disclosuresEffect() {
    try {
        const disclosures: AcceptedDisclosureRequestObject[] =
            yield getDisclosures();
        if (disclosures && disclosures.length) {
            const sortedDisclosures = disclosures.sort(
                (
                    a: AcceptedDisclosureRequestObject,
                    b: AcceptedDisclosureRequestObject
                ) => {
                    const aDate = a.creationDate;
                    const bDate = b.creationDate;

                    return (
                        new Date(bDate || 0).getTime() -
                        new Date(aDate || 0).getTime()
                    );
                }
            );
            yield put(actions.getDisclosuresSuccess(sortedDisclosures));
            if (isEmpty(sortedDisclosures)) {
                yield put(actions.setNoDisclosuresPopup(true));
            }
            return;
        }
        yield put(actions.setNoDisclosuresPopup(true));
    } catch (error) {
        openStatusPopup({params: ERRORS.disclosures});
    }
}

function* getDisclosureDataSaga(action: DisclosureDataRequestSaga) {
    const {service, did, deepLink} = action;

    try {
        const config: IConfig = yield select(configSelector);
        const pushToken: string = yield pushTokenEffect();

        const pushUrl: string = yield select(pushUrlSelector);

        const {didJwk} = yield getOauthTokens();
        const accessToken: string = yield getAccessToken(config);

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
            remoteCryptoServicesToken: {value: accessToken}
        }

        const credentialManifest: VCLCredentialManifest =
            yield runWithAccessToken(
                config,
                VclReactNativeSdkWrapper.getCredentialManifest,
                credentialManifestDescriptor
            );

        const {claimsSet} = jwtDecode(credentialManifest.jwt.encodedJwt);
        const issuingInputDescriptors = inputDescriptors({
            rule: SubmissionRequirementsRules.Issuing,
            claimsSet
        });

        if (!issuingInputDescriptors.length) {
            throwVCLError({
                errorCode: 'preauth_vendorOriginContext_missing'
            });
        }

        yield put(
            actions.setDisclosureData({
                purpose: getOr(
                    '',
                    'presentation_definition.purpose',
                    claimsSet
                ),
                name: getOr('', 'presentation_definition.name', claimsSet),
                duration: getOr('', 'metadata.max_retention_period', claimsSet),
                inputDescriptors: issuingInputDescriptors,
                termsUrl: getOr('', 'metadata.tos_uri', claimsSet)
            })
        );
    } catch (error) {
        vclLogger.error(error);

        if (error instanceof VCLError && isVerificationError(error)) {
            const {profileName} = JSON.parse(error.message);
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
            navigateBack();
            errorHandlerPopup(
                error,
                null,
                undefined,
                undefined,
                deepLink ? useCasesErrorsMapItems.linkIssuingInspection : {}
            );
        }
    }
}

export function* disclosureSaga() {
    yield takeEvery(actionTypes.DISCLOSURES, disclosuresEffect);
    yield takeEvery(actionTypes.GET_DISCLOSURE_DATA, getDisclosureDataSaga);
}
