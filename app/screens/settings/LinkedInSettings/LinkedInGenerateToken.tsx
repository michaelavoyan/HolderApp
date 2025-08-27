import {useNavigation} from '@react-navigation/core';
import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import WebView from 'react-native-webview';
import {useSelector} from 'react-redux';
import {configSelector} from 'app/store/selectors/appConfig';
import {IConfig} from 'app/store/types/appConfig';
import {openNoInternetPopupIfOffline} from '../../../utilities/popups';
import {useGetLinkedInCode} from './utils';
import {useGetLinkedInToken} from './useGetLinkedInToken';

interface Props {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    onGetTokenSuccess: (token: string) => void;
    onGetTokenError: () => void;
    onGetCodeSuccess: () => void;
    onGetCodeError: (error: string) => void;
}

let timeout: ReturnType<typeof setTimeout>;

export const LinkedInGenerateToken: React.FC<Props> = React.memo(
    ({
        clientId,
        clientSecret,
        redirectUri,
        onGetTokenSuccess,
        onGetTokenError,
        onGetCodeSuccess,
        onGetCodeError
    }) => {
        const [isPopupShown, setPopupShown] = useState(false);
        const config: IConfig = useSelector(configSelector);
        const {code, source, handleLoadStart} = useGetLinkedInCode({
            onError: onGetCodeError,
            onSuccess: onGetCodeSuccess,
            config,
            clientId,
            redirectUri
        });

        const navigation = useNavigation();

        useEffect(() => {
            if (isPopupShown === false) {
                timeout = setTimeout(() => {
                    openNoInternetPopupIfOffline({
                        onPress: navigation.goBack
                    });
                    setPopupShown(true);
                }, 3000);
            }
        }, [isPopupShown, navigation.goBack]);

        useGetLinkedInToken({
            code,
            clientId,
            redirectUri,
            clientSecret,
            config,
            onError: onGetTokenError,
            onSuccess: onGetTokenSuccess
        });

        const handleError = useCallback(() => {
            if (isPopupShown === false) {
                openNoInternetPopupIfOffline({
                    onPress: navigation.goBack
                });
                clearTimeout(timeout);
                setPopupShown(true);
            }
        }, [isPopupShown, navigation.goBack]);

        return code && !source ? null : (
            <WebView
                incognito
                cacheEnabled={false}
                onLoadStart={handleLoadStart}
                source={source}
                renderError={() => {
                    handleError();

                    return <View />;
                }}
                onHttpError={handleError}
                onError={handleError}
            />
        );
    }
);
