import {useState, useEffect, useCallback} from 'react';
import {map} from 'lodash/fp';
import {useSelector} from 'react-redux';
import {VCLPresentationRequest} from '@velocitycareerlabs/vcl-react-native';
import {
    DisclosureRequestObject,
    DisclosureSubtype
} from 'app/store/types/disclosure';
import {EMPTY_DISCLOSURE} from 'app/store/reducers/diclosure';
import {CredentialStatus} from '../../../store/types/claim';
import {checkedCredentialsByTypeAndStatusSelector} from '../../../store/selectors/profile';
import {useGetDisclosurePresentationRequest} from '../../../utilities/hooks/useGetDisclosurePresentationRequest';
import {PresentationResponse} from '../../../api/types';

export const useDisclosurePresentationRequest = (
    url: string,
    inspectorId: string,
    deepLink: string,
    options: {disclosureSubType?: DisclosureSubtype} = {}
) => {
    const [error, setError] = useState<unknown>();
    const [loading, setLoading] = useState<boolean>(false);
    const [token, setToken] = useState<string>('');
    const [exchangeId, setExchangeId] = useState<string>('');
    const [disclosure, setDisclosure] = useState<DisclosureRequestObject>(
        EMPTY_DISCLOSURE
    );
    const [
        disclosurePresentationRequest,
        setDisclosurePresentationRequest
    ] = useState<VCLPresentationRequest>();
    const credentials = useSelector(
        checkedCredentialsByTypeAndStatusSelector({
            types: map('type', disclosure.types),
            statuses: [
                CredentialStatus.self,
                CredentialStatus.revoked,
                CredentialStatus.verified
            ]
        })
    );

    const getDisclosurePresentationRequest = useGetDisclosurePresentationRequest();

    const clearError = useCallback(() => {
        setError(undefined);
    }, []);

    useEffect(() => {
        (async () => {
            let disclosureResp: PresentationResponse;

            setLoading(true);

            setToken('');

            try {
                disclosureResp = await getDisclosurePresentationRequest(
                    deepLink
                );
            } catch (e) {
                setLoading(false);
                setError(e);
                return;
            }

            setExchangeId(disclosureResp.exchangeId);
            setDisclosure({
                ...disclosureResp.disclosure,
                exchangeId: disclosureResp.exchangeId,
                presentationDefinitionId:
                    disclosureResp.presentationRequest.presentationDefinitionId,
                ...(options.disclosureSubType
                    ? {subType: options.disclosureSubType}
                    : {})
            });
            setDisclosurePresentationRequest(
                disclosureResp.presentationRequest
            );
            setLoading(false);
        })();
    }, [deepLink, getDisclosurePresentationRequest, inspectorId, options, url]);

    return {
        loading,
        error,
        token,
        disclosure,
        credentials,
        exchangeId,
        disclosurePresentationRequest,
        clearError
    };
};
