import {VCLServiceType} from '@velocitycareerlabs/vcl-react-native';
import {getSignedBy} from '../CredentialContainer';

const issuer = 'Issuer Name';
describe('getSignedBy', () => {
    it('returns correct string for notary issuer with brand', () => {
        const brand = 'Brand Name';
        const service = [VCLServiceType.NotaryIssuer];
        const result = getSignedBy(issuer, brand, service);
        expect(result).toEqual(
            'Signed by Issuer Name as notary issuer, under the commercial name Brand Name'
        );
    });

    it('returns correct string for notary issuer without brand', () => {
        const brand = '';
        const service = [VCLServiceType.NotaryIssuer];
        const result = getSignedBy(issuer, brand, service);
        expect(result).toEqual('Signed by Issuer Name as notary issuer');
    });

    it('returns correct string for non-notary issuer with brand', () => {
        const brand = 'Brand Name';
        const service = [VCLServiceType.Issuer];
        const result = getSignedBy(issuer, brand, service);
        expect(result).toEqual(
            'Signed by Issuer Name, under the commercial name Brand Name'
        );
    });

    it('returns correct string for non-notary issuer with brand equals issuer name', () => {
        const brand = 'Issuer Name';
        const service = [VCLServiceType.Issuer];
        const result = getSignedBy(issuer, brand, service);
        expect(result).toEqual('Signed by Issuer Name');
    });

    it('returns correct string for non-notary issuer without brand', () => {
        const brand = '';
        const service = [VCLServiceType.Issuer];
        const result = getSignedBy(issuer, brand, service);
        expect(result).toEqual('Signed by Issuer Name');
    });
});
