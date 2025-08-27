import {VCLPresentationRequest} from '@velocitycareerlabs/vcl-react-native';
import {
    DisclosureRequestObject,
    DisclosureSubtype,
    SharedCredentials
} from 'app/store/types/disclosure';

export type PresentationResponse = {
    disclosure: DisclosureRequestObject;
    exchangeId: any;
    presentationRequest: VCLPresentationRequest;
};

export type AcceptDisclosure = {
    credentials: SharedCredentials[];
    disclosure: DisclosureRequestObject;
    presentationRequest: VCLPresentationRequest;
    subType?: DisclosureSubtype;
};

export type DeclineDisclosure = {
    url: string;
    token: string;
    disclosureId: string;
    inspectorId: string;
    exchangeId: string;
};

export type AgentAuthDisclosure = {
    url: string;
    inspectorId: string;
};
