import {get} from 'lodash/fp';
import VclReactNative from '@velocitycareerlabs/vcl-react-native';
import {ClaimCredential} from 'app/store/types/claim';
import {getDataForLinkedIn} from '../useShareCredentialToLinkedIn';
import {credentials} from './data/credentials';

const getCredentialByType = (credentialType: string) => {
    return (credentials.find(({type}) =>
        type.includes(credentialType)
    ) as unknown) as ClaimCredential;
};
jest.spyOn(VclReactNative, 'getVerifiedProfile').mockImplementation(() =>
    Promise.resolve({
        payload: {},
        credentialSubject: {},
        name: '',
        logo: '',
        id: '',
        serviceTypes: {payload: []}
    })
);

const formattedCredentialResult = ({
    issuerName,
    issuerLinkedInId,
    name,
    issueYear,
    issueMonth,
    expirationYear,
    expirationMonth,
    certId
}: {
    issuerName: string;
    issuerLinkedInId: string;
    name: string;
    issueYear: number | undefined;
    issueMonth: number | undefined;
    expirationYear: number | undefined;
    expirationMonth: number | undefined;
    certId: string;
}) => ({
    issuerName,
    issuerLinkedInId,
    name,
    imgUrl: expect.any(String),
    issueYear,
    issueMonth,
    expirationYear,
    expirationMonth,
    certId
});

describe('Given credentials data are converted before share to Linkedin using getDataForLinkedIn', () => {
    describe('When Certification credential is converted', () => {
        it('Then CertificationV1.1 credential should be formatted properly', async () => {
            const credential = getCredentialByType('CertificationV1.1');

            const formattedCredential = await getDataForLinkedIn(credential);

            expect(formattedCredential).toEqual(
                formattedCredentialResult({
                    name: get('credentialSubject.name', credential),
                    issuerName: get(
                        'credentialSubject.authority.name',
                        credential
                    ),
                    issuerLinkedInId: '',
                    issueYear: 2015,
                    issueMonth: 1,
                    expirationYear: 2025,
                    expirationMonth: 1,
                    certId: get('credentialSubject.identifier', credential)
                })
            );
        });

        it('Then CertificationV1.0 credential should be formatted properly', async () => {
            const credential = getCredentialByType('CertificationV1.0');

            const formattedCredential = await getDataForLinkedIn(credential);

            expect(formattedCredential).toEqual(
                formattedCredentialResult({
                    name: get('credentialSubject.name', credential),
                    issuerName: get(
                        'credentialSubject.authority.name',
                        credential
                    ),
                    issuerLinkedInId: '',
                    issueYear: 2015,
                    issueMonth: 1,
                    expirationYear: 2025,
                    expirationMonth: 1,
                    certId: get('credentialSubject.identifier', credential)
                })
            );
        });
    });

    describe('When License credential is converted', () => {
        it('Then LicenseV1.1 credential should be formatted properly', async () => {
            const credential = getCredentialByType('LicenseV1.1');

            const formattedCredential = await getDataForLinkedIn(credential);

            expect(formattedCredential).toEqual(
                formattedCredentialResult({
                    name: get('credentialSubject.name', credential),
                    issuerName: get(
                        'credentialSubject.authority.name',
                        credential
                    ),
                    issuerLinkedInId: '',
                    issueYear: 2015,
                    issueMonth: 1,
                    expirationYear: 2025,
                    expirationMonth: 1,
                    certId: get('credentialSubject.identifier', credential)
                })
            );
        });

        it('Then LicenseV1.0 credential should be formatted properly', async () => {
            const credential = getCredentialByType('LicenseV1.0');

            const formattedCredential = await getDataForLinkedIn(credential);

            expect(formattedCredential).toEqual(
                formattedCredentialResult({
                    name: get('credentialSubject.name', credential),
                    issuerName: get(
                        'credentialSubject.authority.name',
                        credential
                    ),
                    issuerLinkedInId: '',
                    issueYear: 2015,
                    issueMonth: 1,
                    expirationYear: 2025,
                    expirationMonth: 1,
                    certId: get('credentialSubject.identifier', credential)
                })
            );
        });
    });

    describe('When Badge credential is converted', () => {
        it('Then OpenBadgeV2.0 credential should be formatted properly', async () => {
            const credential = getCredentialByType('OpenBadgeV2.0');

            const formattedCredential = await getDataForLinkedIn(credential);

            expect(formattedCredential).toEqual(
                formattedCredentialResult({
                    name: get(
                        'credentialSubject.hasCredential.name',
                        credential
                    ),
                    issuerName: get(
                        'credentialSubject.hasCredential.issuer.name',
                        credential
                    ),
                    issuerLinkedInId: '',
                    issueYear: 2023,
                    issueMonth: 1,
                    expirationYear: undefined,
                    expirationMonth: undefined,
                    certId: get(
                        'credentialSubject.hasCredential.id',
                        credential
                    )
                })
            );
        });

        it('Then OpenBadgeV1.0 credential should be formatted properly', async () => {
            const credential = getCredentialByType('OpenBadgeV1.0');

            const formattedCredential = await getDataForLinkedIn(credential);

            expect(formattedCredential).toEqual(
                formattedCredentialResult({
                    name: get(
                        'credentialSubject.hasCredential.name',
                        credential
                    ),
                    issuerName: get(
                        'credentialSubject.hasCredential.issuer.name',
                        credential
                    ),
                    issuerLinkedInId: '',
                    issueYear: 2023,
                    issueMonth: 1,
                    expirationYear: undefined,
                    expirationMonth: undefined,
                    certId: get(
                        'credentialSubject.hasCredential.id',
                        credential
                    )
                })
            );
        });

        it('Then BadgeV1.1 credential should be formatted properly', async () => {
            const credential = getCredentialByType('BadgeV1.1');

            const formattedCredential = await getDataForLinkedIn(credential);

            expect(formattedCredential).toEqual(
                formattedCredentialResult({
                    name: get(
                        'credentialSubject.hasCredential.name',
                        credential
                    ),
                    issuerName: get(
                        'credentialSubject.hasCredential.issuer.name',
                        credential
                    ),
                    issuerLinkedInId: '',
                    issueYear: 2023,
                    issueMonth: 1,
                    expirationYear: undefined,
                    expirationMonth: undefined,
                    certId: get(
                        'credentialSubject.hasCredential.id',
                        credential
                    )
                })
            );
        });

        it('Then OpenBadgeCredential credential should be formatted properly', async () => {
            const credential = getCredentialByType('OpenBadgeCredential');

            const formattedCredential = await getDataForLinkedIn(credential);

            expect(formattedCredential).toEqual(
                formattedCredentialResult({
                    name: get('credentialSubject.achievement.name', credential),
                    issuerName: get('issuer.name', credential),
                    issuerLinkedInId: '',
                    issueYear: 2023,
                    issueMonth: 1,
                    expirationYear: undefined,
                    expirationMonth: undefined,
                    certId: ''
                })
            );
        });
    });
});
