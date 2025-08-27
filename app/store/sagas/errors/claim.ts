import {StatusMessages} from '../../../screens/popups/type';
import i18n from '../../../i18n';

export const ERRORS = {
    getVendors: {
        title: i18n.t('The list of organizations could not be retrieved.'),
        text: i18n.t('Please try again later.'),
        statusType: StatusMessages.Error
    },
    getCredentials: {
        title: i18n.t('The list of credential offers could not be retrieved.'),
        text: i18n.t('Please try again later.'),
        statusType: StatusMessages.Error
    },
    getCredentialsNotIdentified: (name: string) => ({
        title: i18n.t('{{name}} could not identify you', {name}),
        text: i18n.t(
            'Please double-check your identity credentials and try again or contact the issuer directly.'
        ),
        statusType: StatusMessages.Error
    }),
    finalizeCredential: {
        title: i18n.t('The credential offers could not be selected.'),
        text: i18n.t('Please try again later.'),
        statusType: StatusMessages.Error
    },
    emptyCredentials: (name: string = '') => ({
        title: i18n.t('{{name}} has no credential offers you.', {name}),
        text: i18n.t('You may select another organization.'),
        statusType: StatusMessages.Error
    }),
    sameCredentials: (name: string = '') => ({
        title: i18n.t('{{name}} has no new credential offers you.', {name}),
        statusType: StatusMessages.Error
    }),
    wrongFormat: {
        title: i18n.t('The offer could not be presented.'),
        text: i18n.t('Please try again later.'),
        statusType: StatusMessages.Error
    },
    pushToken: {
        title: i18n.t('The list of credential offers could not be retrieved.'),
        text: i18n.t('Please try again later.'),
        statusType: StatusMessages.Error
    },
    saveSomeCredential: {
        title: i18n.t('Some of credentials could not be saved.'),
        text: i18n.t('Please try claiming the credentials again later'),
        statusType: StatusMessages.Error
    },
    stoppedSearching: {
        title: i18n.t('Searching for offers has stopped.'),
        text: i18n.t('Please search again.'),
        statusType: StatusMessages.Error
    },

    invalidCredential: (name: string = '') => ({
        title: i18n.t('Note'),
        text: i18n.t('Invalid Credential - the issuer is not {{name}}', {name}),
        statusType: StatusMessages.Error
    })
};

export const SUCCESS = {
    202: {
        title: i18n.t('A credential offer is being processed'),
        text: i18n.t('You will be notified once offers are available.'),
        statusType: StatusMessages.Success
    }
};

export const NO_OFFERS = (issuerName: string) => ({
    title: i18n.t('No offers found'),
    text: i18n.t('No credential offers were found by {{issuerName}}.', {
        issuerName
    }),
    statusType: StatusMessages.Error
});
