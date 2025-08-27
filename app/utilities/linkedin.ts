import {Linking} from 'react-native';
import {StatusMessages} from 'app/screens/popups/type';
import i18n from 'app/i18n';
import {openStatusPopup} from './popups';
import {isIOS} from './helpers';

export const warnUserAboutLinkedinApp = (callback?: () => void) => {
    openStatusPopup({
        params: {
            title: i18n.t('We recommend using the LinkedIn app'),
            text: i18n.t(
                'You may install the app from {{store}} if you don’t have it',
                {store: isIOS ? 'Apple Store' : 'Google Play'}
            ),
            statusType: StatusMessages.Shared,
            onPress: callback
        }
    });
};

export const handleSuccessShareToFeed = async (url: string) => {
    if (url) {
        await Linking.openURL(url);
    }
};