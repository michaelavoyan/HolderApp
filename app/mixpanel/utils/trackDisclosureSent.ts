import {AcceptedDisclosureRequestObject} from 'app/store/types/disclosure';
import {flatten, map, getOr} from 'lodash/fp';
import {VclMixpanel} from '../VclMixpanel';

export const trackDisclosureSent = (
    disclosure: AcceptedDisclosureRequestObject
) => {
    VclMixpanel.trackDisclosureSent({
        CredentialType: flatten(map('type', disclosure.credentials)),
        CredentialShared: disclosure.credentialIds.map(i => i.split('_')[0]),
        Requestor: disclosure.verifier,
        RequestorName: disclosure.organization.name,
        Campaign: getOr('', 'presentationDefinitionId', disclosure).split(
            '.'
        )[1]
    });
};
