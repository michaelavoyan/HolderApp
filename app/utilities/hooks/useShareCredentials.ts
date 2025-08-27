import {useCallback} from 'react';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {NavigationProp, useNavigation} from '@react-navigation/core';

import {verificationServiceDeepLinkSelector} from 'app/store/selectors/appConfig';
import {RootStackParamList} from 'app/navigation/StackParamsList';

import {deepLinksOptions, linkHandler} from '../qr';
import {DeepLinkOptions} from '../types';

export const useShareCredentials = (selectedCredentialId?: string) => {
    const verificationServiceDeepLink = useSelector(
        verificationServiceDeepLinkSelector
    );
    const navigation: NavigationProp<RootStackParamList> = useNavigation();

    const {t} = useTranslation();

    const handleShare = useCallback(() => {
        const url = verificationServiceDeepLink;
        const {path, queryParams} = linkHandler(url);
        const linkOption = deepLinksOptions[path];
        if (!path || !linkOption) {
            return;
        }

        const params = linkOption.parseParams(queryParams);

        if (path === DeepLinkOptions.inspect) {
            const navigationParams = {
                ...params,
                credentialId: selectedCredentialId,
                deepLink: url,
                customTitle: t('Select credentials to share')
            } as RootStackParamList['DisclosureRequest'];

            navigation.navigate('DisclosureRequest', navigationParams);
        }
    }, [navigation, selectedCredentialId, t, verificationServiceDeepLink]);

    return handleShare;
};
