import {createSelector} from 'reselect';
import {find, get} from 'lodash/fp';
import {VCLCredentialManifest} from '@velocitycareerlabs/vcl-react-native';
import {
    ClaimCredentialWithCheckbox,
    GenerateOffers,
    Vendor
} from '../types/claim';
import {Selectors} from './types';

export const vendorsSelector = createSelector<Selectors<Vendor[]>, Vendor[]>(
    get('claim.vendors'),
    (val: Vendor[]) => val
);

export const vclOffersSelector = createSelector<
    Selectors<GenerateOffers>,
    GenerateOffers
>(get('claim.vclOffers'), (val: GenerateOffers) => val);

export const pushOffersSelector = createSelector<
    Selectors<GenerateOffers>,
    GenerateOffers
>(get('claim.pushOffers'), (val: GenerateOffers) => val);

export const offerByIdSelector = ({id}: {id: string}) =>
    createSelector<
        Selectors<ClaimCredentialWithCheckbox[]>,
        ClaimCredentialWithCheckbox
    >(
        get('claim.offers'),
        (offers: ClaimCredentialWithCheckbox[]) =>
            find(['id', id], offers) as ClaimCredentialWithCheckbox
    );

export const vendorSelector = (id: string) =>
    createSelector<Selectors<Vendor[]>, Vendor>(
        get('claim.vendors'),
        (vendors: Vendor[]) => find(['id', id], vendors) as Vendor
    );

export const progressSelector = createSelector<Selectors<number>, number>(
    get('claim.progress'),
    (val: number) => val
);

export const credentialManifestSelector = createSelector<
    Selectors<VCLCredentialManifest | null>,
    VCLCredentialManifest | null
>(get('claim.credentialManifest'), (val: VCLCredentialManifest | null) => val);

export const notificationIdSelector = createSelector<Selectors<string>, string>(
    get('claim.notificationId'),
    (val: string) => val
);

export const handledOfferNotificationIdSelector = createSelector<
    Selectors<string>,
    string
>(get('claim.handledOfferNotificationId'), (val: string) => val);
