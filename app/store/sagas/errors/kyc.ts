import {find, includes, omit} from 'lodash/fp';
import {StatusMessages} from '../../../screens/popups/type';
import i18n from '../../../i18n';

const UNEXPECTED_ERROR = {
    title: i18n.t('An error has occurred'),
    text: i18n.t('Please close the app and try again'),
    codes: [5003, 5004, 5005, 5006, 6000, 6001, 6002],
    statusType: StatusMessages.Error
};

const YOTI_ERRORS = [
    {
        title: i18n.t('An error has occurred'),
        text: i18n.t('Please try again later'),
        codes: [2000, 2001, 2003, 2004, 3000, 3001, 3002, 5002],
        statusType: StatusMessages.Error
    },
    {
        title: i18n.t('The verification cannot be completed'),
        text: i18n.t(
            'Please provide the YOTI app permission to use the camera'
        ),
        codes: [4000],
        statusType: StatusMessages.Error
    },
    {
        title: i18n.t('The verification cannot be completed'),
        text: i18n.t('Please check your phone camera'),
        codes: [5000],
        statusType: StatusMessages.Error
    },
    UNEXPECTED_ERROR
];

export const ERRORS = {
    startSession: {
        title: i18n.t('ID Verification could not be launched.'),
        text: i18n.t('Please try again later'),
        statusType: StatusMessages.Error
    },
    errorByCode: (code: number) => {
        const errorObj =
            find(item => includes(code, item.codes), YOTI_ERRORS) ||
            UNEXPECTED_ERROR;

        return omit('codes', errorObj);
    }
};
