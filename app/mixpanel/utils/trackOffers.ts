import {VclMixpanel} from 'app/mixpanel/VclMixpanel';
import {getIssuerDid} from 'app/utilities/credential';
import {map} from 'lodash/fp';
import {ClaimCredential} from 'app/store/types/claim';
import {getCampaign} from './getCampaign';

export const trackOffers = (
    items: ClaimCredential[],
    isAccept: boolean,
    credentialsId: String[]
) => {
    if (isAccept) {
        VclMixpanel.trackOffersAccepted({
            CredentialType: items.map((item) => item.type.toString()),
            CredentialShared: credentialsId,
            OfferId: map('offerId', items),
            OfferIdCount: items.length,
            Issuer: getIssuerDid(items[0]),
            Campaign: getCampaign(
                items[0]?.credentialManifest?.jwt.encodedJwt || ''
            )
        });
    } else {
        VclMixpanel.trackOffersRejected({
            CredentialType: items.map((item) => item.type.toString()),
            OfferId: map('offerId', items),
            OfferIdCount: items.length,
            Issuer: getIssuerDid(items[0]),
            Campaign: getCampaign(
                items[0]?.credentialManifest?.jwt.encodedJwt || ''
            )
        });
    }
};
