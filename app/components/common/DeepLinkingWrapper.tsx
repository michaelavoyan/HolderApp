import React, {
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState
} from 'react';
import {Linking} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {validateLinksArray} from 'app/screens/profile/utils';
import {setIssuingSequence} from 'app/store/actions/common';
import {
    deepLinksOptions,
    linkHandler,
    useGenerateOffersByDeepLink,
    VELOCITY_URL_REGEX
} from '../../utilities/qr';
import {navigate} from '../../navigation/utils';
import {DeepLinkOptions} from '../../utilities/types';
import {ConnectionContext} from './ConnectionWatcher';

import {waitForForegroundAppState} from '../../utilities/hooks/waitForForegroundAppState';
import {waitForNetworkConnectedState} from '../../utilities/hooks/waitForNetworkConnectedState';
import {throwVCLError} from '../../utilities/error-handler/utils';
import {errorHandlerPopup} from '../../utilities/error-handler/errorHandlerPopup';
import {useCasesErrorsMapItems} from '../../utilities/error-handler/errorsMap';

import {
    initialDeeplinkSelector,
    needToCheckBiometrySelector
} from '../../store/selectors/auth';
import {
    createTemporaryUserToCompleteIssuingAction,
    updateInitialDeeplink
} from '../../store/actions/auth';
import {setIsTempUserFirstIssuingSessionActiveAction} from '../../store/actions/disclosure';
import {checkIfIssuingNotRequireSharingIdCredentials} from '../../api/disclosure';
import {isAndroid} from '../../utilities/helpers';

const isTempIssuingUser = (userId: string | null) =>
    userId && /temp_issuing_user/.test(userId);

export const DeepLinkingWrapper: React.FC<{
    userId: string | null;
    children?: ReactNode;
}> = ({children, userId}) => {
    const initialDeepLink: string = useSelector(initialDeeplinkSelector);
    const needToCheckBiometry = useSelector(needToCheckBiometrySelector);
    const [initialised, setInitialised] = useState(false);
    const {isConnected, setIsNewContentGuidePassed} =
        useContext(ConnectionContext);
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const isDeepLinkProcessing = useRef(false);

    const setDeepLinkProcessing = (isProcessing: boolean) => {
        isDeepLinkProcessing.current = isProcessing;
    };

    const {generateOffersByDeepLinkWithRedirect} =
        useGenerateOffersByDeepLink();

    const onTemporaryIssuingUserCreatedCallback = useCallback(
        async (
            url: string,
            params: {[key: string]: string},
            linkOption: (typeof deepLinksOptions)['link']
        ) => {
            try {
                const {isShouldSkipIdentityDisclosureStep, credentialManifest} =
                    await checkIfIssuingNotRequireSharingIdCredentials(
                        url,
                        params.vendorOriginContext
                    );

                if (isShouldSkipIdentityDisclosureStep && credentialManifest) {
                    generateOffersByDeepLinkWithRedirect(url, credentialManifest);
                } else if (linkOption.navigation) {
                    linkOption.navigation(url);
                }
            } catch (error) {
                errorHandlerPopup(
                    error,
                    `goToDisclosure - ${JSON.stringify(error)}`,
                    undefined,
                    undefined,
                    useCasesErrorsMapItems.linkIssuingInspection
                );
            }
        },
        [generateOffersByDeepLinkWithRedirect]
    );

    const urlHandler = useCallback(
        async ({url}: {url: string}) => {
            const isDeepLinkOpenedWhenUserLoggedOut = !userId;

            if (isDeepLinkProcessing.current) {
                return;
            }

            setDeepLinkProcessing(true);

            try {
                const isForeground = await waitForForegroundAppState();
                const isNetworkConnected = await waitForNetworkConnectedState();

                if (!isNetworkConnected || !isForeground) {
                    return;
                }

                const {path, queryParams, isCorrectProtocol} = linkHandler(url);
                if (!isCorrectProtocol) {
                    throwVCLError({
                        errorCode: 'wrong_deeplink_protocol'
                    });
                }
                const splitStrings = queryParams.split('&request_uri=');
                const resultArray = splitStrings.map((str) => {
                    return str.startsWith('request_uri=')
                        ? str
                        : `request_uri=${str}`;
                });
                if (resultArray.length > 1) {
                    const haveValidLink = await validateLinksArray(
                        resultArray,
                        path
                    );
                    if (!haveValidLink) {
                        throwVCLError({
                            errorCode: 'wrong_deeplink_protocol'
                        });
                    }
                    dispatch(setIssuingSequence(resultArray, path));
                    return;
                }

                const linkOption = deepLinksOptions[path];
                const params = linkOption.parseParams(queryParams);

                if (isDeepLinkOpenedWhenUserLoggedOut) {
                    if (path === DeepLinkOptions.issue) {
                        dispatch(
                            setIsTempUserFirstIssuingSessionActiveAction(true)
                        );

                        setIsNewContentGuidePassed();

                        dispatch(
                            createTemporaryUserToCompleteIssuingAction({
                                onUserCreated: () =>
                                    onTemporaryIssuingUserCreatedCallback(
                                        url,
                                        params,
                                        linkOption
                                    )
                            })
                        );
                    } else {
                        dispatch(updateInitialDeeplink(url));
                    }

                    return;
                }

                const {isShouldSkipIdentityDisclosureStep, credentialManifest} =
                    await checkIfIssuingNotRequireSharingIdCredentials(
                        url,
                        params.vendorOriginContext
                    );

                if (isShouldSkipIdentityDisclosureStep && credentialManifest) {
                    generateOffersByDeepLinkWithRedirect(url, credentialManifest);

                    return;
                }

                if (!path || !linkOption) {
                    throwVCLError({errorCode: 'wrong_deeplink_protocol'});
                }

                if (path === DeepLinkOptions.inspect) {
                    navigate({
                        name: 'DisclosureRequest',
                        params: {
                            ...params,
                            deepLink: url
                        }
                    });
                    return;
                }
                if (path === DeepLinkOptions.issue && linkOption.navigation) {
                    linkOption.navigation(url);
                }
            } catch (error) {
                errorHandlerPopup(
                    error,
                    `urlHandler - ${JSON.stringify(error)}`,
                    undefined,
                    undefined,
                    useCasesErrorsMapItems.linkIssuingInspection
                );
            } finally {
                setDeepLinkProcessing(false);
            }
        },
        [
            dispatch,
            generateOffersByDeepLinkWithRedirect,
            onTemporaryIssuingUserCreatedCallback,
            setIsNewContentGuidePassed,
            userId
        ]
    );

    useEffect(() => {
        if (userId !== '' && !isTempIssuingUser(userId) && initialDeepLink) {
            urlHandler({url: initialDeepLink});
            dispatch(updateInitialDeeplink(''));
        }
    }, [dispatch, initialDeepLink, urlHandler, userId]);

    useEffect(() => {
        Linking.getInitialURL().then((initialUrl) => {
            if (
                (isAndroid || isConnected) && // Keep isConnected for IOS as initialization flow is different for both platforms
                !needToCheckBiometry &&
                initialUrl &&
                VELOCITY_URL_REGEX.test(initialUrl) &&
                !initialised
            ) {
                urlHandler({url: initialUrl});
                setInitialised(true);
            }
        });

        const subscribe = Linking.addEventListener('url', urlHandler);
        return subscribe.remove;
    }, [initialised, t, urlHandler, needToCheckBiometry, isConnected]);

    return <>{children}</>;
};
