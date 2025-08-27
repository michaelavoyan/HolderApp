import {StatusMessages} from '../../../screens/popups/type';
import i18n from '../../../i18n';

export const ERRORS = {
    notificationRemoveDevice: {
        title: i18n.t('Error removing device'),
        text: i18n.t('Please try again later'),
        statusType: StatusMessages.Error
    },
    notificationRegisterDevice: {
        title: i18n.t('Error registering device'),
        text: i18n.t('Please try again later'),
        statusType: StatusMessages.Error
    }
};
