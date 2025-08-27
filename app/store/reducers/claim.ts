import {set, assign} from 'lodash/fp';
import {VCLOffers} from '@velocitycareerlabs/vcl-react-native';
import {
    ClaimCredentialWithCheckbox,
    ClaimState,
    CredentialManifestAction,
    PushOffersAction,
    Vendor
} from '../types/claim';
import * as actionTypes from '../actionTypes/claim';
import * as authActionTypes from '../actionTypes/auth';
import {GenericAction, reducingFunction} from '../helpers/createReducer';

const initialState: ClaimState = {
    vendors: [],
    offers: [],
    pushOffers: [],
    progress: 0,
    credentialManifest: null,
    notificationId: '',
    handledOfferNotificationId: ''
};

const organizationsSuccess = ({vendors}: {vendors: Vendor[]}) =>
    set('vendors', vendors);

const logoutSuccess = (_: any, state: ClaimState) =>
    assign(state, initialState);

const vendors = ({clearVendors}: {clearVendors: boolean}, state: ClaimState) =>
    clearVendors ? set('vendors', []) : state;

const clearOffers = (_: any, state: ClaimState) =>
    assign(state, {
        offers: [],
        credentialManifest: null
    });

const clearPushOffers = () => set('pushOffers', []);

const vclOffersSuccess = ({
    offers
}: {
    offers: VCLOffers & {allChanged: ClaimCredentialWithCheckbox[]};
}) => {
    return set('vclOffers', offers);
};

const pushOffersSuccess = ({offers}: {offers: ClaimCredentialWithCheckbox[]}) =>
    set('pushOffers', offers);

const setProgress = ({progress}: {progress: number}) =>
    set('progress', progress);

const setCredentialManifest = ({
    credentialManifest
}: CredentialManifestAction) => set('credentialManifest', credentialManifest);

const pushOffers = ({notificationId}: PushOffersAction) =>
    set('notificationId', notificationId);

const setHandledOfferNotificationId = ({
    handledOfferNotificationId
}: {
    handledOfferNotificationId: string;
}) => set('handledOfferNotificationId', handledOfferNotificationId);

const actionReducers = {
    [actionTypes.VENDORS_SUCCESS]: organizationsSuccess,
    [actionTypes.VENDORS]: vendors,
    [actionTypes.OFFERS]: clearOffers,
    [actionTypes.PUSH_OFFERS_CLEAR]: clearPushOffers,
    [actionTypes.VCLOFFERS_SUCCESS]: vclOffersSuccess,
    [actionTypes.PUSH_OFFERS_SUCCESS]: pushOffersSuccess,
    [actionTypes.SET_PROGRESS]: setProgress,
    [authActionTypes.LOGOUT_SUCCESS]: logoutSuccess,
    [actionTypes.SET_CREDENTIAL_MANIFEST]: setCredentialManifest,
    [actionTypes.PUSH_OFFERS]: pushOffers,
    [actionTypes.SET_HANDLED_OFFER_NOTIFICATION_ID]: setHandledOfferNotificationId
};

export const claimReducer = (
    state = initialState,
    action: GenericAction
): ClaimState => reducingFunction<ClaimState>(actionReducers, state, action);
