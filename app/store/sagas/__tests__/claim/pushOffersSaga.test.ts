import {testSaga} from 'redux-saga-test-plan';

import {AxiosResponse} from 'axios';
import {RaceEffect} from 'redux-saga/effects';
import {get} from 'lodash/fp';
import {
    VCLCountry,
    VCLServiceType,
    VCLXVnfProtocolVersion
} from '@velocitycareerlabs/vcl-react-native';
import {
    LinkCodeCommitment,
    NotificationType,
    PushOffersSaga,
    UpdateCredentialEffect,
    Vendor
} from 'app/store/types/claim';
import * as utilities from 'app/utilities/issuer';
import {countriesSelector, pushOffersSelector} from 'app/store/selectors';
import {configSelector} from 'app/store/selectors/appConfig';
import * as commonApi from 'app/api/common.service';
import * as credentialStorage from 'app/storage/credential';
import * as asyncStorage from 'app/storage/asyncStorage';
import {IConfig} from 'app/store/types/appConfig';
import {CredentialCategory} from 'app/store/types/common';
import {RegenerateOffersData} from 'app/storage/type';
import {isSdkInitializedSelector} from 'app/store/selectors/common';
import {savedOriginalIssuingSessionSelector} from 'app/store/selectors/disclosure';
import {DisclosureCredentialsToIssuerParams} from 'app/store/types/disclosure';
import * as actions from '../../../actions';
import {pushOffersSaga} from '../../claim/pushOffersSaga';
import {mockedClaimCredential} from '../../utils/mocks';
import * as claimSaga from '../../claim/claimingCredentialSaga';
import * as commonActionTypes from '../../../actionTypes/common';
import * as CredentialEffect from '../../claim/effects/updateCredentialEffect';
import {handledOfferNotificationIdSelector} from '../../../selectors';

const mockedPushOffersSaga: PushOffersSaga = {
    type: 'MOCKED_ACTION_TYPE',
    issuer: 'MockedIssuer',
    notificationType: NotificationType.newOffer,
    notificationId: 'MockedNotificationId',
    credentialId: 'MockedCredentialId',
    exchangeId: 'MockedExchangeId',
    types: ['MockedType1', 'MockedType2'],
    replacementCredentialType: 'MockedReplacementCredentialType',
    withoutBadges: true,
    isFromBackground: false
};

const mockedPushOffersSagaFromBackground: PushOffersSaga = {
    type: 'MOCKED_ACTION_TYPE',
    issuer: 'MockedIssuer',
    notificationType: NotificationType.newOffer,
    notificationId: 'MockedNotificationId',
    credentialId: 'MockedCredentialId',
    exchangeId: 'MockedExchangeId',
    types: ['MockedType1', 'MockedType2'],
    replacementCredentialType: 'MockedReplacementCredentialType',
    withoutBadges: true,
    isFromBackground: true
};

const mockedPushOffersSagaRevoked: PushOffersSaga = {
    type: 'MOCKED_ACTION_TYPE',
    issuer: 'MockedIssuer',
    notificationType: NotificationType.revoked,
    notificationId: 'MockedNotificationId',
    credentialId: 'MockedCredentialId',
    exchangeId: 'MockedExchangeId',
    types: ['MockedType1', 'MockedType2'],
    replacementCredentialType: 'MockedReplacementCredentialType',
    withoutBadges: true,
    isFromBackground: false
};

const mockedPushOffersSagaNoOffers: PushOffersSaga = {
    type: 'MOCKED_ACTION_TYPE',
    issuer: 'MockedIssuer',
    notificationType: NotificationType.noOffers,
    notificationId: 'MockedNotificationId',
    credentialId: 'MockedCredentialId',
    exchangeId: 'MockedExchangeId',
    types: ['MockedType1', 'MockedType2'],
    replacementCredentialType: 'MockedReplacementCredentialType',
    withoutBadges: true,
    isFromBackground: false
};

const mockedVendor: Vendor = {
    name: 'MockedVendor',
    id: 'MockedVendorId',
    credentialTypes: ['MockedCredentialType1', 'MockedCredentialType2'],
    logo: 'path/to/mock/logo.png',
    service: {
        payload: {}
    },
    location: {
        countryCode: 'US',
        regionCode: 'NY'
    }
};

const mockedConfig: IConfig = {
    ios: {
        isWalletAvailable: true
    },
    android: {
        isWalletAvailable: true
    },
    yotiIDV: true,
    minIOSVersion: '1.0.0',
    minAndroidVersion: '1.0.0',
    latestIOSVersion: '2.0.0',
    latestAndroidVersion: '2.0.0',
    idVerifierDid: 'MockedIDVerifierDid',
    emailVerifierDid: 'MockedEmailVerifierDid',
    phoneVerifierDid: 'MockedPhoneVerifierDid',
    yotiNewSessionUrl: 'https://mocked-yoti-new-session-url.com',
    baseUrls: {
        walletApi: 'https://mocked-wallet-api-url.com',
        verificationApi: 'https://mocked-verification-api-url.com',
        verificationServiceActionBaseUrl:
            'https://mocked-verification-service-action-base-url.com',
        presentationExtensionPeriodURL:
            'https://mocked-presentation-extension-period-url.com',
        libVnfUrl: '',
        registrarVnfUrl: ''
    },
    verificationServiceDeepLink: 'mocked-verification-service-deep-link',
    verificationServicePresentationLinkTemplate:
        'mocked-verification-service-presentation-link-template',
    sdk: {
        cacheSequence: 123,
        isDirectIssuerCheckOn: true,
        isDebugOn: false,
        xVnfProtocolVersion: VCLXVnfProtocolVersion.XVnfProtocolVersion1
    },
};

const mockedCredentialCategory: CredentialCategory = {
    title: 'string',
    icon: 'string',
    types: ['type1'],
    isIdentity: true,
    color: 'string'
};

const mockedRegenerateOffersData: RegenerateOffersData = {
    credentialManifest: {
        jwt: {
            encodedJwt: 'mockedEncodedJwt'
        },
        iss: 'mockedIss',
        did: 'mockedDid',
        exchangeId: 'mockedExchangeId',
        presentationDefinitionId: 'mockedPresentationDefinitionId',
        verifiedProfile: {
            payload: {},
            credentialSubject: {},
            name: 'vendor-name',
            logo: 'vendor-logo',
            id: 'vendor-id',
            serviceTypes: {payload: [VCLServiceType.Issuer]}
        },
        didJwk: {did: '', publicJwk: {valueStr: ''}, kid: '', keyId: '',}
    },
    verificationIdentifier: 'mockedVerificationIdentifier',
    vclToken: {
        value: 'mockedVclTokenValue',
        expiresIn: BigInt(1111111)
    }
};

const mockedVCLCountries: VCLCountry[] = [
    {
        payload: {},
        code: 'US',
        name: 'Mocked Country 1',
        regions: {
            all: {
                mockedRegionCode1: {
                    payload: {},
                    code: 'mockedRegionCode1',
                    name: 'Mocked Region 1'
                },
                mockedRegionCode2: {
                    payload: {},
                    code: 'mockedRegionCode2',
                    name: 'Mocked Region 2'
                }
            }
        }
    }
];

const mockedlinkCodeCommitment: LinkCodeCommitment = {value: ''};
const mockedDifferentNotificationId: string = 'MockedDifferentNotificationId';

describe('pushOffersSaga test', () => {
    beforeEach(() => {
        jest.spyOn(utilities, 'issuerByDid').mockImplementation(() =>
            Promise.resolve(mockedVendor)
        );
        jest.spyOn(
            commonApi,
            'credentialCategories'
            // eslint-disable-next-line unused-imports/no-unused-vars-ts
        ).mockImplementation((config: IConfig) =>
            Promise.resolve({data: [mockedCredentialCategory]} as AxiosResponse<
                any,
                any
            >)
        );
        jest.spyOn(
            credentialStorage,
            'getCredentialsByTypes'
        ).mockImplementation(() => Promise.resolve([mockedClaimCredential]));
        jest.spyOn(
            asyncStorage,
            'getRegenerateOffersDataByExchangeId'
        ).mockImplementation(() => Promise.resolve(mockedRegenerateOffersData));
        jest.spyOn(asyncStorage, 'getUserId').mockImplementation(() =>
            Promise.resolve('mockedUserId')
        );
        jest.spyOn(claimSaga, 'claimingCredentialSaga').mockImplementation(
            () => null as unknown as Generator<RaceEffect<any>, void, unknown>
        );
        jest.spyOn(credentialStorage, 'setOffers').mockImplementation(() =>
            Promise.resolve(true)
        );
        jest.spyOn(
            CredentialEffect,
            'updateCredentialEffect'
        ).mockImplementation(
            (_action: UpdateCredentialEffect) =>
                Promise.resolve() as unknown as Generator<
                    string[] | Promise<string | null> | Promise<void>,
                    void,
                    never
                >
        );
    });
    it('should handle positive flow', () => {
        testSaga(pushOffersSaga, mockedPushOffersSaga)
            .next()
            .select(handledOfferNotificationIdSelector)
            .next(mockedDifferentNotificationId)
            .call(
                utilities.issuerByDid,
                mockedPushOffersSaga.issuer,
                mockedPushOffersSaga.types
            )
            .next(mockedVendor)
            .select(countriesSelector)
            .next(mockedVCLCountries)
            .select(configSelector)
            .next(mockedConfig)
            .call(commonApi.credentialCategories, mockedConfig)
            .next({data: [mockedCredentialCategory]})
            .call(
                credentialStorage.getCredentialsByTypes,
                mockedCredentialCategory.types
            )
            .next([mockedClaimCredential])
            .call(asyncStorage.getRegenerateOffersDataByExchangeId, {
                exchangeId: mockedPushOffersSaga.exchangeId
            })
            .next(mockedRegenerateOffersData)
            .call(claimSaga.claimingCredentialSaga, {
                selectedCredentials: [mockedClaimCredential],
                isNewWaiting: true,
                types: mockedPushOffersSaga.types,
                service: get('service', mockedVendor),
                linkCodeCommitment: mockedlinkCodeCommitment,
                type: '',
                withoutProgress: false,
                did: mockedVendor.id,
                ...mockedRegenerateOffersData
            })
            .next()
            .put(actions.setProgress(0))
            .next()
            .select(pushOffersSelector)
            .next([mockedClaimCredential])
            .next()
            .put(actions.getCredentials(true))
            .next()
            .next()
            .isDone();
    });

    it('should stop flow when notificationId === handledOfferNotificationId', () => {
        testSaga(pushOffersSaga, mockedPushOffersSaga)
            .next()
            .select(handledOfferNotificationIdSelector)
            .next('MockedNotificationId')
            .next()
            .isDone();
    });

    it('should handle flow when application returned from background state', () => {
        testSaga(pushOffersSaga, mockedPushOffersSagaFromBackground)
            .next()
            .select(handledOfferNotificationIdSelector)
            .next(mockedDifferentNotificationId)
            .select(isSdkInitializedSelector)
            .next(false)
            .take([commonActionTypes.SDK_INITIALIZED]);
    });

    it('should stop flow when notificationType is Revoked', () => {
        testSaga(pushOffersSaga, mockedPushOffersSagaRevoked)
            .next()
            .select(handledOfferNotificationIdSelector)
            .next(mockedDifferentNotificationId)
            .call(
                CredentialEffect.updateCredentialEffect,
                mockedPushOffersSagaRevoked
            )
            .next()
            .put(
                actions.setHandledOfferNotificationId(
                    mockedPushOffersSaga.notificationId
                )
            )
            .next()
            .isDone();
    });

    it('should stop flow when vendor not found', () => {
        testSaga(pushOffersSaga, mockedPushOffersSaga)
            .next()
            .select(handledOfferNotificationIdSelector)
            .next(mockedDifferentNotificationId)
            .call(
                utilities.issuerByDid,
                mockedPushOffersSaga.issuer,
                mockedPushOffersSaga.types
            )
            .next()
            .put(
                actions.setHandledOfferNotificationId(
                    mockedPushOffersSaga.notificationId
                )
            )
            .next()
            .isDone();
    });

    it('should stop flow when notificationType === NotificationType.noOffers and there is no savedIssuingSession found', () => {
        testSaga(pushOffersSaga, mockedPushOffersSagaNoOffers)
            .next()
            .select(handledOfferNotificationIdSelector)
            .next(mockedDifferentNotificationId)
            .call(
                utilities.issuerByDid,
                mockedPushOffersSaga.issuer,
                mockedPushOffersSaga.types
            )
            .next(mockedVendor)
            .select(savedOriginalIssuingSessionSelector)
            .next(null)
            .next()
            .isDone();
    });

    it('should stop flow when notificationType === NotificationType.noOffers and the savedIssuingSession found', () => {
        testSaga(pushOffersSaga, mockedPushOffersSagaNoOffers)
            .next()
            .select(handledOfferNotificationIdSelector)
            .next(mockedDifferentNotificationId)
            .call(
                utilities.issuerByDid,
                mockedPushOffersSaga.issuer,
                mockedPushOffersSaga.types
            )
            .next(mockedVendor)
            .select(savedOriginalIssuingSessionSelector)
            .next({} as DisclosureCredentialsToIssuerParams)
            .put(actions.clearOriginalIssuingSession())
            .next()
            .put(
                actions.setHandledOfferNotificationId(
                    mockedPushOffersSaga.notificationId
                )
            )
            .next()
            .isDone();
    });
});
