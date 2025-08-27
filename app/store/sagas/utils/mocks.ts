import {
    VCLOffers,
    VCLOrganization,
    VCLServiceType,
    VCLToken
} from '@velocitycareerlabs/vcl-react-native';
import {
    ClaimCredential,
    CredentialStatus,
    FinalizeOffersSaga
} from 'app/store/types/claim';

export const credentialManifest = {
    iss: 'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
    did: 'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
    exchangeId: '63c7c6fa66f61354359aa23f',
    jwt: {
        encodedJwt:
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksiLCJraWQiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHcjZXhjaGFuZ2Uta2V5LTEifQ.eyJleGNoYW5nZV9pZCI6IjYzYzdjNmZhNjZmNjEzNTQzNTlhYTIzZiIsIm1ldGFkYXRhIjp7ImNsaWVudF9uYW1lIjoiTWljcm9zb2Z0IENvcnBvcmF0aW9uIGlvbiIsImxvZ29fdXJpIjoiaHR0cHM6Ly9hZ3NvbC5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMTgvMDkvbmV3LW1pY3Jvc29mdC1sb2dvLVNJWkVELVNRVUFSRS5qcGciLCJ0b3NfdXJpIjoiaHR0cHM6Ly93d3cudmVsb2NpdHlleHBlcmllbmNlY2VudGVyLmNvbS90ZXJtcy1hbmQtY29uZGl0aW9ucy12bmYiLCJtYXhfcmV0ZW50aW9uX3BlcmlvZCI6IiIsInByb2dyZXNzX3VyaSI6Imh0dHBzOi8vZGV2YWdlbnQudmVsb2NpdHljYXJlZXJsYWJzLmlvL2FwaS9ob2xkZXIvdjAuNi9vcmcvZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3L2dldC1leGNoYW5nZS1wcm9ncmVzcyIsInN1Ym1pdF9wcmVzZW50YXRpb25fdXJpIjoiaHR0cHM6Ly9kZXZhZ2VudC52ZWxvY2l0eWNhcmVlcmxhYnMuaW8vYXBpL2hvbGRlci92MC42L29yZy9kaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHcvaXNzdWUvc3VibWl0LWlkZW50aWZpY2F0aW9uIiwiY2hlY2tfb2ZmZXJzX3VyaSI6Imh0dHBzOi8vZGV2YWdlbnQudmVsb2NpdHljYXJlZXJsYWJzLmlvL2FwaS9ob2xkZXIvdjAuNi9vcmcvZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3L2lzc3VlL2NyZWRlbnRpYWwtb2ZmZXJzIiwiZmluYWxpemVfb2ZmZXJzX3VyaSI6Imh0dHBzOi8vZGV2YWdlbnQudmVsb2NpdHljYXJlZXJsYWJzLmlvL2FwaS9ob2xkZXIvdjAuNi9vcmcvZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3L2lzc3VlL2ZpbmFsaXplLW9mZmVycyJ9LCJwcmVzZW50YXRpb25fZGVmaW5pdGlvbiI6eyJpZCI6IjYzYzdjNmZhNjZmNjEzNTQzNTlhYTIzZi42MjFjOWJlZWM4ZmEzNGI4ZTcyZDVmYzciLCJwdXJwb3NlIjoiIiwibmFtZSI6IlNoYXJlIHlvdXIgSWQsIEVtYWlsIGFuZCBQaG9uZSBOdW1iZXIgdG8gZmFjaWxpdGF0ZSB0aGUgc2VhcmNoIGZvciB5b3VyIGNhcmVlciBjcmVkZW50aWFscyIsImZvcm1hdCI6eyJqd3RfdnAiOnsiYWxnIjpbInNlY3AyNTZrMSJdfX0sImlucHV0X2Rlc2NyaXB0b3JzIjpbeyJpZCI6IlBhc3Nwb3J0VjEuMCIsIm5hbWUiOiJQYXNzcG9ydCIsInNjaGVtYSI6W3sidXJpIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9wYXNzcG9ydC12MS4wLnNjaGVtYS5qc29uIn1dLCJncm91cCI6WyJBIl19LHsiaWQiOiJFbWFpbFYxLjAiLCJuYW1lIjoiRW1haWwiLCJzY2hlbWEiOlt7InVyaSI6Imh0dHBzOi8vZGV2cmVnaXN0cmFyLnZlbG9jaXR5bmV0d29yay5mb3VuZGF0aW9uL3NjaGVtYXMvZW1haWwtdjEuMC5zY2hlbWEuanNvbiJ9XSwiZ3JvdXAiOlsiQSJdfSx7ImlkIjoiUGhvbmVWMS4wIiwibmFtZSI6IlBob25lIiwic2NoZW1hIjpbeyJ1cmkiOiJodHRwczovL2RldnJlZ2lzdHJhci52ZWxvY2l0eW5ldHdvcmsuZm91bmRhdGlvbi9zY2hlbWFzL3Bob25lLXYxLjAuc2NoZW1hLmpzb24ifV0sImdyb3VwIjpbIkEiXX0seyJpZCI6IkRyaXZlcnNMaWNlbnNlVjEuMCIsIm5hbWUiOiJEcml2ZXIncyBsaWNlbnNlIiwic2NoZW1hIjpbeyJ1cmkiOiJodHRwczovL2RldnJlZ2lzdHJhci52ZWxvY2l0eW5ldHdvcmsuZm91bmRhdGlvbi9zY2hlbWFzL2RyaXZlcnMtbGljZW5zZS12MS4wLnNjaGVtYS5qc29uIn1dLCJncm91cCI6WyJBIl19LHsiaWQiOiJOYXRpb25hbElkQ2FyZFYxLjAiLCJuYW1lIjoiTmF0aW9uYWwgSUQgY2FyZCIsInNjaGVtYSI6W3sidXJpIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9uYXRpb25hbC1pZC1jYXJkLXYxLjAuc2NoZW1hLmpzb24ifV0sImdyb3VwIjpbIkEiXX1dLCJzdWJtaXNzaW9uX3JlcXVpcmVtZW50cyI6W3sicnVsZSI6ImFsbCIsImZyb20iOiJBIiwibWluIjo1fV19LCJvdXRwdXRfZGVzY3JpcHRvcnMiOltdLCJpc3N1ZXIiOnsiaWQiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHcifSwibmJmIjoxNjc0MDM2OTg2LCJpc3MiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHciLCJleHAiOjE2NzQ2NDE3ODYsImlhdCI6MTY3NDAzNjk4Nn0.9npU5Iqp4J8YHgwhI4yOtstGbFy8yAmbcqkBy1GGIbYbseFkPx7SIwDgIEdgjGHsCDDrumMSPAtifh-2O_MSoA'
    },
    presentationDefinitionId: '123',
    verifiedProfile: {
        payload: {},
        credentialSubject: {},
        name: 'vendor-name',
        logo: 'vendor-logo',
        id: 'vendor-id',
        serviceTypes: {payload: [VCLServiceType.Issuer]}
    },
    didJwk: {did: '', publicJwk: {valueStr: ''}, kid: '', keyId: '',}
};

export const vclOffers: VCLOffers = {
    payload: {},
    all: [
        {
            payload: {},
            id: 'your-id',
            issuerId: 'your-issuer-id'
        }
    ],
    responseCode: 200,
    sessionToken: {value: 'your-token', expiresIn: BigInt(1111111)},
    challenge: 'your-challenge'
};

export const token: VCLToken = {
    value: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJqdGkiOiI2NDc1MTg2Y2Y2Y2ZjYTAyZWM1MzRiOWEiLCJpc3MiOiJkaWQ6aW9uOkVpQVE0UDh1NGgwY054UGkyUzlqU19oUE1jSmktVURlcWZqNFRoQzhpWnU4RnciLCJhdWQiOiJkaWQ6aW9uOkVpQVE0UDh1NGgwY054UGkyUzlqU19oUE1jSmktVURlcWZqNFRoQzhpWnU4RnciLCJleHAiOjE2ODc5ODc1NjUsInN1YiI6IjY0NzUxODZkMDBjYmZhNDkyZjMxOGJkNiIsImlhdCI6MTY4NTM5NTU2NX0.tNKjwWqcuVJwUGxmpaOX7mind3oKyRUz3zh0P-vcSTJBSbpdNG6cghRzP_7D_VN9zmo6AUJt_WkRdowc9G4fyQ',
    expiresIn: BigInt(1111111)
};

export const vclOrganizationsList: VCLOrganization[] = [
    {
        payload: {
            losed: '2020-01-01',
            contactEmail: 'velocity@abchealth.com',
            description: 'some lorem',
            founded: '1965-01-01',
            id: 'did:ion:EiB7Gb9aMhbwJN6VKfWeOo30iUK9R3T0-wGXUIbAgoeY5g',
            location: {regionCode: 'NY', countryCode: 'US'},
            logo: 'https://mkttpmba.s3.eu-west-1.amazonaws.com/ThePower+Business+School/Brand/TPBS(LOGOS)/DIGITAL/svg/Digital-negativo.svg',
            name: 'denis_test_3',
            permittedVelocityServiceCategory: ['Issuer'],
            service: [
                {
                    serviceEndpoint:
                        'https://devagent.velocitycareerlabs.ioapi/holder/v…9R3T0-wGXUIbAgoeY5g/issue/get-credential-manifest',
                    id: '#issuer-1',
                    type: 'VlcCareerIssuer_v1'
                }
            ],
            supportsSecureMessages: false,
            technicalEmail: 'velocity@abchealth.com',
            type: 'company',
            updatedAt: '2023-06-09T06:52:45.676Z',
            verifiableCredentialJwt:
                'https://devregistrar.velocitynetwork.foundation/api/v0.6/organizations/did:ion:EiB7Gb9aMhbwJN6VKfWeOo30iUK9R3T0-wGXUIbAgoeY5g/resolve-vc/fa3…',
            website: 'https://www.abchealth.com'
        },
        serviceCredentialAgentIssuers: [
            {
                payload: {
                    serviceEndpoint:
                        'https://devagent.velocitycareerlabs.ioapi/holder/v…9R3T0-wGXUIbAgoeY5g/issue/get-credential-manifest',
                    id: '#issuer-1',
                    type: 'VlcCareerIssuer_v1'
                }
            }
        ],
        did: 'did:ion:EiB7Gb9aMhbwJN6VKfWeOo30iUK9R3T0-wGXUIbAgoeY5g',
    }
];

export const vclOrganizationsListVendorsFormatted = [
    {
        credentialTypes: undefined,
        id: 'did:ion:EiB7Gb9aMhbwJN6VKfWeOo30iUK9R3T0-wGXUIbAgoeY5g',
        location: {countryCode: 'US', regionCode: 'NY'},
        logo: 'https://mkttpmba.s3.eu-west-1.amazonaws.com/ThePower+Business+School/Brand/TPBS(LOGOS)/DIGITAL/svg/Digital-negativo.svg',
        name: 'denis_test_3',
        service: undefined
    }
];

export const claimMockAction = {
    deepLink: undefined,
    selectedCredentials: [
        {
            additionalInfo: null,
            checked: true,
            credentialManifest: null,
            credentialSchema: null,
            credentialStatus: null,
            credentialSubject: {email: 'olivia.hafez@example.com'},
            default: true,
            hash: null,
            id: 'bd2e28af-5f74-4e3d-8530-0d8f5da525bc_olivia.hafez@example.com',
            isNewRevoked: null,
            isNewWaiting: null,
            issuanceDate: null,
            issuer: {
                country: null,
                id: 'did:ion:EiAehWmpX5mHBuc93SIhPXF8bsEx68G6mPcdIaLNGbozPA',
                logo: 'https://media-exp1.licdn.com/dms/image/C4E0BAQGb2hBaIfTLMw/company-logo_200_200/0/1579081568902?e=2147483647&v=beta&t=MOjIM-esL1fgn8sq-Sb-m_…',
                name: 'Velocity Career Labs'
            },
            jwt: 'eyJ0eXAiOiJKV1QiLCJraWQiOiJkaWQ6dmVsb2NpdHk6djI6MHg2MjU2YjE4OTIxZWFiZDM5MzUxZWMyM2YxYzk0Zjg4MDYwNGU3MGU3OjIxMTQ4ODcxODM1NTAwODo5MTA1I2tleS0xIiwiYWxnIjoiRVMyNTZLIn0.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIkVtYWlsVjEuMCIsIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdGF0dXMiOnsidHlwZSI6IlZlbG9jaXR5UmV2b2NhdGlvbkxpc3RKYW4yMDIxIiwiaWQiOiJldGhlcmV1bToweEQ4OTBGMkQ2MEI0MjlmOWUyNTdGQzBCYzU4RWYyMjM3Nzc2REQ5MUIvZ2V0UmV2b2tlZFN0YXR1cz9hZGRyZXNzPTB4MDMwMThFM2EzODk3MzRhRTEyZjE0RTQ0NTQwZkFlYTM1NzkxZkVDNyZsaXN0SWQ9MTYzNTc4ODY2Mjk2NjUzJmluZGV4PTkxOTgiLCJzdGF0dXNMaXN0SW5kZXgiOjkxOTgsInN0YXR1c0xpc3RDcmVkZW50aWFsIjoiZXRoZXJldW06MHhEODkwRjJENjBCNDI5ZjllMjU3RkMwQmM1OEVmMjIzNzc3NkREOTFCL2dldFJldm9rZWRTdGF0dXM_YWRkcmVzcz0weDAzMDE4RTNhMzg5NzM0YUUxMmYxNEU0NDU0MGZBZWEzNTc5MWZFQzcmbGlzdElkPTE2MzU3ODg2NjI5NjY1MyIsImxpbmtDb2RlQ29tbWl0IjoiRWlCWk51OWdpUE00RHEwZGswNlB5Y2R6WkY4TnpNSDhzQURtc3RHQm13UlN6dz09In0sImNvbnRlbnRIYXNoIjp7InR5cGUiOiJWZWxvY2l0eUNvbnRlbnRIYXNoMjAyMCIsInZhbHVlIjoiMjY2YTVhMTMyYjU0YjdmZmFlZGIxMWUxZTk4MmEzMjI2YWM2NjMwMGJkYWFiNTc3OWM2YmFiOThjMTRlZjkzYiJ9LCJjcmVkZW50aWFsU2NoZW1hIjp7ImlkIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9lbWFpbC12MS4wLnNjaGVtYS5qc29uIiwidHlwZSI6Ikpzb25TY2hlbWFWYWxpZGF0b3IyMDE4In0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImVtYWlsIjoib2xpdmlhLmhhZmV6QGV4YW1wbGUuY29tIn19LCJpc3MiOiJkaWQ6aW9uOkVpQWVoV21wWDVtSEJ1YzkzU0loUFhGOGJzRXg2OEc2bVBjZElhTE5HYm96UEEiLCJqdGkiOiJkaWQ6dmVsb2NpdHk6djI6MHg2MjU2YjE4OTIxZWFiZDM5MzUxZWMyM2YxYzk0Zjg4MDYwNGU3MGU3OjIxMTQ4ODcxODM1NTAwODo5MTA1IiwiaWF0IjoxNjU4NDA2NTAxLCJuYmYiOjE2NTg0MDY1MDF9.DEVGN4HNFmLMMbIAD7xAYEoT_9A9d03YztkykKQX7ty__hsdB5-Idtr37X9tg3d6Y3r23eCT_Vi6V9w6VjRgpA',
            logo: null,
            note: null,
            offerId: null,
            output_descriptors:
                '[{"id":"EmailV1.0","display":{"title":{"text":"Email"},"description":{"text":"Email"},"subtitle":{"path":["$.email"],"schema":{"type":"string","format":"email"},"fallback":"-"}}}]',
            replacerId: null,
            revocationDate: null,
            revocationReason: null,
            saveOfferDate: null,
            status: 'verified',
            type: ['EmailV1.0'],
            userId: 'olivia.hafez@example.com',
            vclToken: null,
            vendor: null,
            vendorCountry: null,
            withoutAccept: null
        }
    ],
    service: {
        credentialTypes: [
            'EducationDegree',
            'EducationDegreeRegistrationV1.0',
            'EducationDegreeStudyV1.0',
            'EducationDegreeGraduationV1.0',
            'EducationDegreeRegistrationV1.1',
            'EducationDegreeStudyV1.1',
            'EducationDegreeGraduationV1.1',
            'PastEmploymentPosition',
            'CurrentEmploymentPosition',
            'EmploymentCurrentV1.0',
            'EmploymentPastV1.0',
            'EmploymentCurrentV1.1',
            'EmploymentPastV1.1',
            'Certification',
            'CertificationV1.0',
            'LicenseV1.0',
            'CertificationV1.1',
            'LicenseV1.1',
            'Course',
            'CourseRegistrationV1.0',
            'CourseCompletionV1.0',
            'CourseAttendanceV1.0',
            'CourseRegistrationV1.1',
            'CourseCompletionV1.1',
            'CourseAttendanceV1.1',
            'AssessmentDec2020',
            'AssessmentV1.0',
            'AssessmentV1.1',
            'Badge',
            'OpenBadgeV1.0'
        ],
        id: '#velocity-issuer-1',
        payload: {
            credentialTypes: [
                'EducationDegree',
                'EducationDegreeRegistrationV1.0',
                'EducationDegreeStudyV1.0',
                'EducationDegreeGraduationV1.0',
                'EducationDegreeRegistrationV1.1',
                'EducationDegreeStudyV1.1',
                'EducationDegreeGraduationV1.1',
                'PastEmploymentPosition',
                'CurrentEmploymentPosition',
                'EmploymentCurrentV1.0'
            ],
            id: '#velocity-issuer-1',
            serviceEndpoint:
                'https://devagent.velocitycareerlabs.io/api/holder/v0.6/org/did:ion:EiApMLdMb4NPb8sae9-hXGHP79W1gisApVSE80USPEbtJA/issue/get-credential-manifest',
            type: 'VlcCareerIssuer_v1'
        },
        serviceEndpoint:
            'https://devagent.velocitycareerlabs.io/api/holder/v0.6/org/did:ion:EiApMLdMb4NPb8sae9-hXGHP79W1gisApVSE80USPEbtJA/issue/get-credential-manifest',
        type: 'VlcCareerIssuer_v1'
    },
    types: [
        'EducationDegree',
        'EducationDegreeRegistrationV1.0',
        'EducationDegreeStudyV1.0',
        'EducationDegreeGraduationV1.0',
        'EducationDegreeRegistrationV1.1',
        'EducationDegreeStudyV1.1',
        'EducationDegreeGraduationV1.1'
    ]
};

export const finalizeOffersSagaAction: FinalizeOffersSaga = {
    type: 'your-action-type', // replace with your actual action type
    credentialManifest: {
        jwt: {encodedJwt: 'your-encoded-jwt'},
        iss: 'your-iss',
        did: 'your-did',
        exchangeId: 'your-exchange-id',
        presentationDefinitionId: 'your-presentation-definition-id',
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
    offers: {
        offers: [
            {
                checked: true,
                id: 'your-id',
                offerId: 'your-offer-id',
                type: ['your-type'],
                issuer: {id: 'issuer-id', name: 'issuer-name'},
                status: CredentialStatus.verified,
                offerExpirationDate: 'your-offer-expiration-date',
                userId: 'your-user-id',
                additionalInfo: {
                    replacedDate: 'your-replaced-date',
                    replacedId: 'your-replaced-id'
                },
                credentialSubject: {
                    // credential subject data
                },
                hash: 'your-hash'
            }
        ],
        vclOffers
    },
    vendorsLocation: {name: 'your-vendors-location-name'},
    vendor: {logo: 'your-vendor-logo'},
    additionalInfo: {
        replacedDate: 'your-replaced-date',
        replacedId: 'your-replaced-id'
    },
    updatedOffer: undefined, // add if needed
    offerIdToDelete: undefined, // add if needed
    vclToken: {value: 'your-token-value', expiresIn: BigInt(1111111)},
    navigation: {path: 'your-path'}
};

export const APPROVED_OFFERS_IDS = ['your-id'];
export const REJECTED_OFFERS_IDS = [];

export const mockedClaimCredential: ClaimCredential = {
    id: 'your-credential-id_user-id',
    offerId: 'offer-id',
    type: ['EmailV1.0'],
    issuer: {
        id: 'issuer-id',
        name: 'Velocity Career Labs'
    },
    issued: '2023-06-30T12:00:00Z',
    credentialSchema: {
        id: 'credential-schema-id',
        type: 'schema-type'
    },
    credentialSubject: {email: 'olivia.hafez@example.com'},
    logo: 'https://example.com/logo.png',
    vendorCountry: 'vendor-country',
    note: 'credential-note',
    status: CredentialStatus.verified,
    revocationDate: '2023-07-01T12:00:00Z',
    revocationReason: 'revocation-reason',
    expirationDate: '2024-06-30T12:00:00Z',
    credentialManifest: {
        jwt: {
            encodedJwt: 'credential-manifest-jwt'
        },
        iss: 'issuer',
        did: 'credential-manifest-did',
        exchangeId: 'exchange-id',
        presentationDefinitionId: 'presentation-definition-id',
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
    vclToken: {
        value: 'vcl-token-value',
        expiresIn: BigInt(1111111)
    },
    isNewRevoked: true,
    offerExpirationDate: '2024-06-30T12:00:00Z',
    saveOfferDate: '2023-06-30T12:00:00Z',
    vendor: {
        id: 'vendor-id',
        name: 'Vendor Name',
        logo: 'https://example.com/vendor-logo.png'
    },
    isNewWaiting: true,
    withoutAccept: false,
    userId: 'olivia.hafez@example.com',
    replacerId: 'replacer-id',
    additionalInfo: {
        replacedDate: '2023-06-30T12:00:00Z',
        replacedId: 'replaced-id'
    },
    linkedCredentials: [
        {
            linkType: 'link-type',
            linkCode: 'link-code'
        }
    ],
    default: true,
    jwt: 'credential-jwt',
    hash: 'credential-hash'
};
