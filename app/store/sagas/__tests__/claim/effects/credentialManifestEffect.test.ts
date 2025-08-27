import {call, select} from 'redux-saga/effects';
import {VCLService, VCLServiceType} from '@velocitycareerlabs/vcl-react-native';
import {expectSaga} from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

import {configSelector, pushUrlSelector} from 'app/store/selectors';
import {
    CredentialManifestEffect,
    GenerateOffersEffect
} from 'app/store/types/claim';

import {credentialManifestEffect} from 'app/store/sagas/claim/effects/credentialManifestEffect';
import * as authStorage from 'app/storage/oauth';
import {runWithAccessToken, getAccessToken} from 'app/api/api';
import {generateOffersEffect} from 'app/store/sagas/claim/effects/generateOffersEffect';
import appConfig from 'app/mocks/appConfig';

describe('credentialManifestEffect positive flow without deepLink', () => {
    let action: CredentialManifestEffect;

    beforeEach(() => {
        jest.mock('app/store/sagas/claim/effects/generateOffersEffect', () => ({
            generateOffersEffect: jest.fn()
        }));

        action = {
            service: {payload: {}} as VCLService,
            pushToken: 'pushToken',
            deepLink: '',
            credentialManifest: {
                jwt: {
                    encodedJwt: ''
                },
                iss: 'string',
                did: 'string',
                exchangeId: 'string',
                presentationDefinitionId: 'string',
                verifiedProfile: {
                    payload: {},
                    credentialSubject: {},
                    name: 'vendor-name',
                    logo: 'vendor-logo',
                    id: 'vendor-id',
                    serviceTypes: {payload: [VCLServiceType.Issuer]}
                },
                didJwk: {did: '', publicJwk: {valueStr: ''}, kid: '', keyId: ''}
            },
            isNewWaiting: true,
            types: [],
            selectedCredentials: []
        } as CredentialManifestEffect;
    });

    it('generator runs without errors', () => {
        expectSaga(credentialManifestEffect as any, action)
            .provide([
                [
                    call(authStorage.getOauthTokens),
                    {
                        accessToken: 'accessToken',
                        refreshToken: 'refreshToken',
                        accountId: 'accountId',
                        didJwk: {
                            did: '',
                            publicJwk: {valueStr: ''},
                            kid: '',
                            keyId: ''
                        }
                    }
                ],
                [
                    matchers.call.fn(runWithAccessToken),
                    action.credentialManifest
                ],
                [matchers.call.fn(generateOffersEffect), {done: true}],
                [call(getAccessToken, appConfig), 'accessToken'],
                [select(configSelector), appConfig]
            ])
            .select(configSelector)
            .select(pushUrlSelector)
            .call(authStorage.getOauthTokens)
            .call(generateOffersEffect, {...(action as GenerateOffersEffect)})
            .run();
    });
});

describe('credentialManifestEffect positive flow with deepLink', () => {
    let generator: Generator;
    let action: CredentialManifestEffect;

    beforeEach(() => {
        action = {
            service: {payload: {}} as VCLService,
            pushToken: 'pushToken',
            deepLink: '',
            isNewWaiting: true,
            types: [],
            selectedCredentials: []
        } as CredentialManifestEffect;

        generator = credentialManifestEffect(action);
    });

    it('should get pushUrl from the state', () => {
        generator.next();
        expect(generator.next().value).toEqual(select(pushUrlSelector));
    });
});
