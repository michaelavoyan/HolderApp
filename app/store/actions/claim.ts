import * as actionTypes from '../actionTypes/claim';
import {
    FinalizeOffersAction,
    OffersAction,
    Vendor,
    PushOffersAction,
    CredentialManifestAction,
    FinalizeOffersDiffIssuersAction,
    GenerateOffers
} from '../types/claim';

export const getVendors = (
    query: string = '',
    clearVendors: boolean = false
) => ({
    type: actionTypes.VENDORS,
    query,
    clearVendors
});

export const getVendorsSuccess = (vendors: Array<Vendor>) => ({
    type: actionTypes.VENDORS_SUCCESS,
    vendors
});

export const vcloffersSuccess = (offers: GenerateOffers) => ({
    type: actionTypes.VCLOFFERS_SUCCESS,
    offers
});

export const pushOffersSuccess = (offers: GenerateOffers) => ({
    type: actionTypes.PUSH_OFFERS_SUCCESS,
    offers
});

export const generateOffers = (action: OffersAction) => ({
    ...action,
    type: actionTypes.OFFERS
});

export const setProgress = (progress: number) => ({
    type: actionTypes.SET_PROGRESS,
    progress
});

export const setHandledOfferNotificationId = (
    handledOfferNotificationId: string
) => ({
    type: actionTypes.SET_HANDLED_OFFER_NOTIFICATION_ID,
    handledOfferNotificationId
});

export const finalizeOffers = (action: FinalizeOffersAction) => ({
    ...action,
    type: actionTypes.FINALIZE_OFFERS
});

export const finalizeOffersFromDiffIssuers = (
    action: FinalizeOffersDiffIssuersAction
) => ({
    ...action,
    type: actionTypes.FINALIZE_OFFERS_FROM_DIFF_ISSUERS
});

export const pushOffers = (action: PushOffersAction) => ({
    ...action,
    type: actionTypes.PUSH_OFFERS
});

export const setCredentialManifest = (action: CredentialManifestAction) => ({
    ...action,
    type: actionTypes.SET_CREDENTIAL_MANIFEST
});
