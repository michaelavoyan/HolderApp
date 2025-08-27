import {t} from 'i18next';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'app/navigation/StackParamsList';
import {deepLinksOptions, linkHandler} from './qr';
import {DeepLinkOptions} from './types';

export const shareProcessStart = (
    verificationServiceDeepLink: string,
    navigation: StackNavigationProp<
        RootStackParamList,
        keyof RootStackParamList,
        undefined
    >
) => {
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
            deepLink: url,
            customTitle: t('Select credentials to share')
        } as RootStackParamList['DisclosureRequest'];

        navigation.navigate('DisclosureRequest', navigationParams);
    }
};
