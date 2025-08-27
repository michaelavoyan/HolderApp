import {createSelector} from 'reselect';
import {find, get} from 'lodash/fp';
import {
    AcceptedDisclosureRequestObject,
    DisclosureCredentialsToIssuerParams,
    DisclosureData,
    SelectCredentialToShareParams,
    SharedCredentials,
    DisclosureStatus,
} from '../types/disclosure';
import {Selectors} from './types';

export const disclosuresSelector = createSelector<
    Selectors<AcceptedDisclosureRequestObject[]>,
    AcceptedDisclosureRequestObject[]
>(
    get('disclosure.disclosures'),
    (val: AcceptedDisclosureRequestObject[]) => val.filter(item => item.status !== DisclosureStatus.revoked)
);

export const disclosuresCountSelector = () =>
    createSelector(disclosuresSelector, credentials => credentials.length);

export const noDisclosuresPopupSelector = createSelector<
    Selectors<boolean>,
    boolean
>(get('disclosure.noDisclosuresPopup'), (val: boolean) => val);

export const disclosureDataSelector = createSelector<
    Selectors<DisclosureData>,
    DisclosureData
>(get('disclosure.disclosureData'), (val: DisclosureData) => val);

export const disclosureByIdSelector = (id: string) => {
    return createSelector<
        Selectors<AcceptedDisclosureRequestObject[]>,
        AcceptedDisclosureRequestObject
    >(
        get('disclosure.disclosures'),
        (disclosures: AcceptedDisclosureRequestObject[]) =>
            find(['id', id], disclosures) as AcceptedDisclosureRequestObject
    );
};
export const disclosureByExchangeIdSelector = (exchangeId: string) => {
    return createSelector<
        Selectors<AcceptedDisclosureRequestObject[]>,
        AcceptedDisclosureRequestObject
    >(
        get('disclosure.disclosures'),
        (disclosures: AcceptedDisclosureRequestObject[]) =>
            find(
                ['exchangeId', exchangeId],
                disclosures
            ) as AcceptedDisclosureRequestObject
    );
};

export const savedOriginalIssuingSessionSelector = createSelector<
    Selectors<null | DisclosureCredentialsToIssuerParams>,
    null | DisclosureCredentialsToIssuerParams
>(
    get('disclosure.issuingSession'),
    (val: null | DisclosureCredentialsToIssuerParams) => val
);

export const isTempUserFirstIssuingSessionActiveSelector = createSelector<
    Selectors<boolean>,
    boolean
>(get('disclosure.isTempUserFirstIssuingSessionActive'), (val: boolean) => val);

export const disclosureSelectedCredentialsSelector = createSelector<
    Selectors<SharedCredentials[]>,
    SharedCredentials[]
>(get('disclosure.selectedCredentials'), (val: SharedCredentials[]) => val);

export const inspectionSessionSelector = createSelector<
    Selectors<SelectCredentialToShareParams | null>,
    SelectCredentialToShareParams | null
>(
    get('disclosure.inspectionSession'),
    (val: SelectCredentialToShareParams | null) => val
);
