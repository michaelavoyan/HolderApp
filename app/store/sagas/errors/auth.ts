import {StatusMessages} from '../../../screens/popups/type';
import i18n from '../../../i18n';

export const ERRORS = {
    addUser: {
        title: i18n.t('The user could not be added.'),
        text: i18n.t('Please try again later.'),
        statusType: StatusMessages.Error
    },
    updateUser: {
        title: i18n.t('The user could not be updated.'),
        text: i18n.t('Please try again later.'),
        statusType: StatusMessages.Error
    },
    deleteUser: {
        title: i18n.t('The user could not be deleted.'),
        text: i18n.t('Please try again later.'),
        statusType: StatusMessages.Error
    },
    getUser: {
        title: i18n.t('The list of user credentials could not be retrieved.'),
        text: i18n.t('Please try again later.'),
        statusType: StatusMessages.Error
    },
    getUsers: {
        title: i18n.t('The list of users could not be retrieved.'),
        text: i18n.t('Please try again later.'),
        statusType: StatusMessages.Error
    },
    getUserId: {
        title: i18n.t('The user could not be selected.'),
        text: i18n.t('Please try again later.'),
        statusType: StatusMessages.Error
    },
    logout: {
        title: i18n.t('Data could not be deleted.'),
        text: i18n.t('Please try again later.'),
        statusType: StatusMessages.Error
    },
    regions: {
        title: i18n.t('The list of regions could not be retrieved.'),
        text: i18n.t('Please try again later.'),
        statusType: StatusMessages.Error
    },
    termsAndConditionsConsent: {
        title: i18n.t('Can not save terms and conditions version'),
        text: i18n.t('Please try again later.'),
        statusType: StatusMessages.Error
    },
    countries: {
        title: i18n.t('The list of countries could not be retrieved.'),
        text: i18n.t('Please try again later.'),
        statusType: StatusMessages.Error
    },
    setUserId: {
        title: i18n.t('The user could not be selected.'),
        text: i18n.t('Please try again later.'),
        statusType: StatusMessages.Error
    },
    startVerification: {
        title: i18n.t('Verification can not be performed now.'),
        text: i18n.t('Please try again later.'),
        statusType: StatusMessages.Error
    },
    claimVerificationEmailPhone: {
        title: i18n.t('Validation service is not available now.'),
        text: i18n.t('Please try again later.'),
        statusType: StatusMessages.Error
    },
    notPermittedVendor: (name: string) => ({
        title: i18n.t('Note'),
        text: i18n.t(
            '{{name}} is not accredited by the Velocity Network Foundation to issue credentials',
            {name}
        ),
        statusType: StatusMessages.Error
    })
};
