import {get, map, pick, find, intersection, isEmpty} from 'lodash/fp';
import {
    VCLOrganization,
    VCLService
} from '@velocitycareerlabs/vcl-react-native';
import {LocationCodes, Vendor} from '../types/claim';
import i18n from '../../i18n';

export const parseVendorObject = (
    data: VCLOrganization[],
    types?: string[]
): Vendor[] =>
    map((item) => {
        const service = find(
            (val) =>
                !types ||
                !isEmpty(intersection(types, get('credentialTypes', val))),
            item.serviceCredentialAgentIssuers
        ) as VCLService;

        return {
            ...pick(['id', 'name', 'logo'], item.payload),
            location: get('payload.location', item) as LocationCodes,
            credentialTypes: get('credentialTypes', service),
            service
        };
    }, data);

export const GENERIC_NETWORK_ERROR_MESSAGES = [
    i18n.t('Network Error'),
    i18n.t('Unable to resolve host'),
    i18n.t('Software caused connection abort'),
    i18n.t('Software cause connection abort'),
    i18n.t('Failed to connect to')
];
export const isNetworkConnectionError = (error: any): boolean => {
    // In some cases error NetInfo is still returning isConnected=true while
    // connection is already interrupted but requests will be ended by OS immediately
    // and error popup will be shown, so in this case we have to
    // try to define is it network connection error by heuristic check
    if (typeof error !== 'object') {
        return false;
    }
    return GENERIC_NETWORK_ERROR_MESSAGES.some((message) =>
        !error.message
            ? false
            : error.message.toLowerCase().startsWith(message.toLowerCase())
    );
};
