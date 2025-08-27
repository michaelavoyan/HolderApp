import {testSaga} from 'redux-saga-test-plan';
import {VCLServiceType} from '@velocitycareerlabs/vcl-react-native';
import {GENERIC_NETWORK_ERROR_MESSAGES} from 'app/store/helpers/common';
import {PopupScreens} from 'app/navigation/StackParamsList';

import {claimingCredentialEffect} from 'app/store/sagas/claim/effects/claimingCredentialEffect';
import {pushTokenEffect} from 'app/store/sagas/push';
import {credentialManifestEffect} from 'app/store/sagas/claim/effects/credentialManifestEffect';

import {CredentialStatus, OffersSaga} from 'app/store/types/claim';
import * as popupUtils from 'app/utilities/popups';
import {HolderAppError} from 'app/utilities/error-handler/HolderAppError';
import {closeOpenedTempUserFirstIssuingSession} from 'app/store/sagas/claim/helpers';
import * as errorHandlerUtils from 'app/utilities/error-handler/errorHandlerPopup';
import * as helperUtils from 'app/store/sagas/claim/helpers';
import {timeout} from 'app/navigation/utils';

// Mock actions
const mockAction: OffersSaga = {
    type: 'OffersSaga',
    service: {
        payload: {
            key1: 'value1',
            key2: 'value2'
        }
    },
    types: ['type1', 'type2'],
    selectedCredentials: [
        {
            id: '1',
            offerId: 'offer1',
            type: ['type1'],
            issuer: {
                id: 'issuer1',
                name: 'Issuer 1'
            },
            credentialSubject: {},
            status: CredentialStatus.verified,
            offerExpirationDate: '2023-12-31',
            userId: 'user1',
            additionalInfo: {
                replacedDate: '2022-12-31',
                replacedId: 'replaced1'
            },
            linkedCredentials: [
                {
                    linkType: 'linkType1',
                    linkCode: 'linkCode1'
                }
            ],
            hash: 'hash1'
        }
    ],
    isNewWaiting: true,
    linkCodeCommitment: {
        value: 'commitmentValue'
    },
    deepLink: 'deepLink',
    verificationIdentifier: 'verificationIdentifier',
    credentialManifest: {
        jwt: {
            encodedJwt: 'encodedJwt'
        },
        iss: 'iss',
        did: 'did',
        exchangeId: 'exchangeId',
        presentationDefinitionId: 'presentationDefinitionId',
        verifiedProfile: {
            payload: {},
            credentialSubject: {},
            name: 'vendor-name',
            logo: 'vendor-logo',
            id: 'vendor-id',
            serviceTypes: {payload: [VCLServiceType.Issuer]}
        },
        didJwk: {did: '', publicJwk: {valueStr: ''}, kid: '', keyId: '',}
    }
};

describe('claimingCredentialEffect saga', () => {
    afterEach(() => {
        clearTimeout(timeout);
    });

    it('should handle claimingCredentialEffect when not network connection error', () => {
        testSaga(claimingCredentialEffect, mockAction)
            .next()
            .call(pushTokenEffect, true)
            .next('mockedPushToken')
            .call(credentialManifestEffect, {
                ...mockAction,
                pushToken: 'mockedPushToken'
            })
            .next()
            .isDone();
    });

    it('should handle claimingCredentialEffect when there is a network connection error', () => {
        const networkError = new Error(GENERIC_NETWORK_ERROR_MESSAGES[0]);
        const closePopupMock = jest.spyOn(popupUtils, 'closePopup');

        testSaga(claimingCredentialEffect, mockAction)
            .next()
            .call(pushTokenEffect, true)
            .next([networkError, '']) // simulate pushTokenEffect returning an error
            .next()
            .isDone();

        expect(closePopupMock).toHaveBeenCalledWith(PopupScreens.STATUS_POPUP);
    });

    it('should handle claimingCredentialEffect when pushTokenEffect returns a non-array value', () => {
        testSaga(claimingCredentialEffect, mockAction)
            .next()
            .call(pushTokenEffect, true)
            .next('mockedPushToken')
            .call(credentialManifestEffect, {
                ...mockAction,
                pushToken: 'mockedPushToken'
            })
            .next()
            .isDone();
    });

    it('should handle error in claimingCredentialEffect', () => {
        const error = new Error('Error');
        const errorHandlerPopupMock = jest.spyOn(
            errorHandlerUtils,
            'errorHandlerPopup'
        );
        const getCredentialsErrorMock = jest.spyOn(
            helperUtils,
            'getCredentialsError'
        );

        testSaga(claimingCredentialEffect, mockAction)
            .next()
            .throw(error)
            .next()
            .isDone();

        expect(errorHandlerPopupMock).toHaveBeenCalledWith(
            new HolderAppError({errorCode: 'default_generate_offers_error'}),
            '{}',
            undefined,
            closeOpenedTempUserFirstIssuingSession
        );
        expect(getCredentialsErrorMock).toHaveBeenCalledWith(error);
    });
});
