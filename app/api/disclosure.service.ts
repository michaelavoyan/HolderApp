import { jwtApi} from './api';

export const declineDisclosure = (
    url: string,
    token: string,
    disclosureId: string,
    inspectorId: string,
    exchangeId: string
) =>
    jwtApi(url, token).post(
        encodeURI(`/api/holder/v0.6/org/${inspectorId}/inspect/reject`),
        {
            disclosureId,
            exchangeId
        }
    );
