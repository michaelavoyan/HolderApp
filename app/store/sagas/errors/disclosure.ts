import {StatusMessages} from '../../../screens/popups/type';
import i18n from '../../../i18n';

export const ERRORS = {
    disclosures: {
        title: i18n.t(
            'The list of disclosed credentials could not be retrieved.'
        ),
        text: i18n.t('Please try again'),
        statusType: StatusMessages.Error
    },
    getCredentials: {
        title: i18n.t('The list of credential offers could not be retrieved.'),
        text: i18n.t('Please try again later.'),
        statusType: StatusMessages.Error
    },
    issuer: {
        title: i18n.t('Issuer not available'),
        text: i18n.t(
            'The issuer is currently unavailable. Please try again later.'
        ),
        statusType: StatusMessages.Error
    }
};
