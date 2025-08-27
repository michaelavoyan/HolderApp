import {CredentialStatus} from '../store/types/claim';
import {SavedSelfReportCredential} from '../store/types/profile';

export const STORE_REVIEW_PROFILE_NAME_HASH =
    '91021d88ad3742159031277e37088325';

export const mockedUser = {
    id: 'bdc67ced-01de-4243-8853-114c0c9a57b3',
    image: 'https://docs.velocitycareerlabs.io/personas/adam-smith.png',
    name: 'Review Smith'
};

const mockedUserSelfReportPhoneCredential: SavedSelfReportCredential = {
    type: ['PhoneV1.0'],
    id:
        '00e73cf3-59e2-41b3-a82a-2d88a3e83f76_bdc67ced-01de-4243-8853-114c0c9a57b3',
    credentialSubject: {phone: '(123) 456-78'},
    userId: 'bdc67ced-01de-4243-8853-114c0c9a57b3',
    jwt:
        'eyJqd2siOnsia3R5IjoiRUMiLCJleHQiOnRydWUsImtleV9vcHMiOlsidmVyaWZ5Il0sIngiOiJxVFNlU2wwVmdTeGNjcjkzOHUyQnlJTV9uTXdWcFgxWGE0bHBsREpUSmwwIiwieSI6IkNLNW1SX0gzdmZRSWxHc2JUVmZZTGlOaExuUm5MSHc2cWJjY3p4WERYcnciLCJjcnYiOiJQLTI1NiJ9LCJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJpZCI6ImUxMTU0YTg4LTdlOTAtNGU1ZC05ZjgyLWY3ZjEyMjE2NDJlZiIsInR5cGUiOlsiUGhvbmVWMS4wIiwiVmVyaWZpYWJsZUNyZWRlbnRpYWwiXSwiY3JlZGVudGlhbFN1YmplY3QiOnsicGhvbmUiOiIoMTIzKSA0NTYtNzgifX0sImF1ZCI6IiAiLCJpc3MiOiJlMTE1NGE4OC03ZTkwLTRlNWQtOWY4Mi1mN2YxMjIxNjQyZWYiLCJqdGkiOiJlMTE1NGE4OC03ZTkwLTRlNWQtOWY4Mi1mN2YxMjIxNjQyZWYiLCJpYXQiOjE2NjYyNzI3NjAsIm5iZiI6MTY2NjI3Mjc2MH0.9nbZW8zMgzjtFnZYpwQK-jdkqZXDt8cBewEch1oJ2G060E5zHHC_7t1YhuiK2UOY72VAqSJkm3UO6pBv-osAUg',
    isSelf: true,
    status: 'self-signed' as CredentialStatus.self
};

const mockedUserSelfReportEmailCredential: SavedSelfReportCredential = {
    type: ['EmailV1.0'],
    id:
        '39815e31-7259-4a41-bf79-2066977a84a9_bdc67ced-01de-4243-8853-114c0c9a57b3',
    credentialSubject: {email: 'review.smith@test.com'},
    userId: 'bdc67ced-01de-4243-8853-114c0c9a57b3',
    jwt:
        'eyJqd2siOnsia3R5IjoiRUMiLCJleHQiOnRydWUsImtleV9vcHMiOlsidmVyaWZ5Il0sIngiOiIxRi1GNVBCVWRObnAwTklrUU55Ql83M2FrY19TTDRaUktDbEM0WHhwbk9BIiwieSI6ImZCQWd4WTNrSGFaSlZVNS1IUU0tLUZtRTJmT0daNExWQU5CeGlNTEVWXzAiLCJjcnYiOiJQLTI1NiJ9LCJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJpZCI6IjMyMzcyNzU1LTNmMjgtNDMwZi05ZDJlLTBiMWI4YzVjNjE2ZSIsInR5cGUiOlsiRW1haWxWMS4wIiwiVmVyaWZpYWJsZUNyZWRlbnRpYWwiXSwiY3JlZGVudGlhbFN1YmplY3QiOnsiZW1haWwiOiJyZXZpZXcuc21pdGhAdGVzdC5jb20ifX0sImF1ZCI6IiAiLCJpc3MiOiIzMjM3Mjc1NS0zZjI4LTQzMGYtOWQyZS0wYjFiOGM1YzYxNmUiLCJqdGkiOiIzMjM3Mjc1NS0zZjI4LTQzMGYtOWQyZS0wYjFiOGM1YzYxNmUiLCJpYXQiOjE2NjYzNTIzODEsIm5iZiI6MTY2NjM1MjM4MX0.fhjVmbK84Hc4Pw6CF4LVkaQtEPJ6u07YO_5V7tC1QztgJ9pyvH5YtkxvPh-8vSOQjBpELZotycsdLjsYd1iekA',
    isSelf: true,
    status: 'self-signed' as CredentialStatus.self
};

export const mockedCredentials: Array<SavedSelfReportCredential> = [
    mockedUserSelfReportPhoneCredential,
    mockedUserSelfReportEmailCredential
];
