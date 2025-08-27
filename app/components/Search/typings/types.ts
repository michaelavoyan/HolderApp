import {
    VCLCountry,
    VCLService
} from '@velocitycareerlabs/vcl-react-native';
import {Vendor} from 'app/store/types/claim';

export type IssuerEntryProps = {
    first?: string;
    onClaim: (id: string, service: VCLService) => void;
    countries: VCLCountry[];
    vendor: Vendor;
};
