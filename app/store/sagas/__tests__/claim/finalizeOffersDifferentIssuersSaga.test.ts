import {testSaga} from 'redux-saga-test-plan';

import {
    VCLJwtVerifiableCredentials,
    VCLServiceType
} from '@velocitycareerlabs/vcl-react-native';
import {
    CredentialStatus,
    FinalizeOffersDifferentIssuersSaga
} from 'app/store/types/claim';

import * as credentialService from 'app/storage/credential';
import * as finalizeOffersDifferentIssuersSagaModule from 'app/store/sagas/claim/finalizeOffersDifferentIssuersSaga';
import {timeout} from 'app/navigation/utils';
import * as actions from '../../../actions';
import {vclOffers} from '../../utils/mocks';

const mockedFinalizeOffersDifferentIssuersSaga: FinalizeOffersDifferentIssuersSaga = {
    type: 'mockedAction',
    offers: {
        offers: [
            {
                id: 'mockedId',
                offerId: 'mockedOfferId',
                type: ['mockedType'],
                issuer: {
                    id: 'mockedIssuerId',
                    name: 'mockedIssuerName'
                },
                issued: '2023-07-10',
                credentialSubject: {
                    subjectId: 'mockedSubjectId',
                    subjectType: 'mockedSubjectType'
                },
                status: CredentialStatus.offered,
                offerExpirationDate: '2023-07-20',
                additionalInfo: {
                    replacedDate: '2023-07-10',
                    replacedId: 'mockedReplacedId'
                },
                userId: 'mockedUserId',
                hash: 'mockedHash',
                credentialSchema: {
                    id: 'mockedSchemaId',
                    type: 'mockedSchemaType'
                },
                vclToken: {
                    value: 'mockedVclTokenValue',
                    expiresIn: BigInt(1111111)
                },
                credentialManifest: {
                    jwt: {
                        encodedJwt: 'mockedJwt'
                    },
                    iss: 'mockedIssuer',
                    did: 'mockedDid',
                    exchangeId: 'mockedExchangeId',
                    presentationDefinitionId: 'mockedPresentationDefinitionId',
                    verifiedProfile: {
                        payload: {},
                        credentialSubject: {},
                        name: '',
                        logo: '',
                        id: '',
                        serviceTypes: {
                            payload: [VCLServiceType.CareerIssuer]
                        }
                    },
                    didJwk: {did: '', publicJwk: {valueStr: ''}, kid: '', keyId: '',}
                },
                linkedCredentials: [
                    {
                        linkType: 'mockedLinkType',
                        linkCode: 'mockedLinkCode'
                    }
                ],
                checked: true
            }
        ],
        vclOffers
    },
    isAccept: true,
    navigation: {
        name: 'mockedNavigationName'
    },
    offerIdsToDelete: ['mockedOfferIdToDelete']
};

const mockedFinalizeOffersDifferentIssuersSagaExpired: FinalizeOffersDifferentIssuersSaga = {
    type: 'mockedAction',
    offers: {
        offers: [
            {
                id: 'mockedId',
                offerId: 'mockedOfferId',
                type: ['mockedType'],
                issuer: {
                    id: 'mockedIssuerId',
                    name: 'mockedIssuerName'
                },
                issued: '2023-07-10',
                credentialSubject: {
                    subjectId: 'mockedSubjectId',
                    subjectType: 'mockedSubjectType'
                },
                status: CredentialStatus.offered,
                offerExpirationDate: '2023-07-10',
                additionalInfo: {
                    replacedDate: '2023-07-10',
                    replacedId: 'mockedReplacedId'
                },
                userId: 'mockedUserId',
                hash: 'mockedHash',
                credentialSchema: {
                    id: 'mockedSchemaId',
                    type: 'mockedSchemaType'
                },
                vclToken: {
                    value: 'mockedVclTokenValue',
                    expiresIn: BigInt(1111111)
                },
                credentialManifest: {
                    jwt: {
                        encodedJwt: 'mockedJwt'
                    },
                    iss: 'mockedIssuer',
                    did: 'mockedDid',
                    exchangeId: 'mockedExchangeId',
                    presentationDefinitionId: 'mockedPresentationDefinitionId',
                    verifiedProfile: {
                        payload: {},
                        credentialSubject: {},
                        name: '',
                        logo: '',
                        id: '',
                        serviceTypes: {
                            payload: [VCLServiceType.CareerIssuer]
                        }
                    },
                    didJwk: {did: '', publicJwk: {valueStr: ''}, kid: '', keyId: '',}
                },
                linkedCredentials: [
                    {
                        linkType: 'mockedLinkType',
                        linkCode: 'mockedLinkCode'
                    }
                ],
                checked: true
            }
        ],
        vclOffers
    },
    isAccept: false,
    navigation: {
        name: 'mockedNavigationName'
    },
    offerIdsToDelete: ['mockedOfferIdToDelete']
};

const mockedFinalizeOffersDifferentIssuersSagaEmptyOffers: FinalizeOffersDifferentIssuersSaga = {
    type: 'mockedAction',
    offers: {
        offers: [],
        vclOffers: {
            payload: {offers: []},
            all: [{payload: {}, issuerId: '', id: ''}],
            responseCode: 200,
            sessionToken: {value: 'token', expiresIn: BigInt(1111111)},
            challenge: ''
        }
    },
    isAccept: true,
    navigation: {
        name: 'mockedNavigationName'
    },
    offerIdsToDelete: ['mockedOfferIdToDelete']
};

const mockedVCLJwtVerifiableCredentials: VCLJwtVerifiableCredentials = {
    passedCredentials: [
        {
            encodedJwt: 'mockedPassedJwt1'
        },
        {
            encodedJwt: 'mockedPassedJwt2'
        }
    ],
    failedCredentials: [
        {
            encodedJwt: 'mockedFailedJwt1'
        },
        {
            encodedJwt: 'mockedFailedJwt2'
        }
    ]
};

describe('finalizeOffersDifferentIssuersSaga saga', () => {
    beforeEach(() => {
        jest.spyOn(
            credentialService,
            'deleteVfCredentialsByIds'
        ).mockImplementation(jest.fn());
    });
    afterEach(() => {
        clearTimeout(timeout);
    });
    it('should handle flow when there are no activePushOffers', () => {
        testSaga(
            finalizeOffersDifferentIssuersSagaModule.finalizeOffersDifferentIssuersSaga,
            mockedFinalizeOffersDifferentIssuersSaga
        )
            .next()
            .put(actions.getCredentials())
            .next(mockedVCLJwtVerifiableCredentials)
            .isDone();
    });

    it('should handle flow when there are no offers', () => {
        testSaga(
            finalizeOffersDifferentIssuersSagaModule.finalizeOffersDifferentIssuersSaga,
            mockedFinalizeOffersDifferentIssuersSagaEmptyOffers
        )
            .next()
            .put(actions.getCredentials())
            .next()
            .isDone();
    });

    it('should handle flow when there are expired offers', () => {
        testSaga(
            finalizeOffersDifferentIssuersSagaModule.finalizeOffersDifferentIssuersSaga,
            mockedFinalizeOffersDifferentIssuersSagaExpired
        )
            .next()
            .call(credentialService.deleteVfCredentialsByIds, ['mockedId'])
            .next()
            .put(actions.getCredentials())
            .next()
            .isDone();
    });
});
