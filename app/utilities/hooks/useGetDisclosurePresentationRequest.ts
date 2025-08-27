import {useSelector} from 'react-redux';
import {useCallback} from 'react';
import {configSelector, pushUrlSelector} from '../../store/selectors/appConfig';
import {getDisclosurePresentationRequest} from '../../api/disclosure';
import {getVclPushToken} from '../../api/push';

export const useGetDisclosurePresentationRequest = () => {
    const config = useSelector(configSelector);
    const pushUrl = useSelector(pushUrlSelector);

    const getDisclosurePresentationRequestCallback = useCallback(
        async (deepLink: string) => {
            // TODO: add try/catch block and possible error popup since any error in getVclPushToken cause infinite processing popUp
            // should be discussed with Nimrod - https://velocitycareerlabs.atlassian.net/browse/VL-4087?focusedCommentId=31099
            const pushToken: string = await getVclPushToken(config);
            const pushDelegate = {
                pushUrl,
                pushToken
            };

            return getDisclosurePresentationRequest(deepLink, pushDelegate);
        },
        [config, pushUrl]
    );

    return getDisclosurePresentationRequestCallback;
};
