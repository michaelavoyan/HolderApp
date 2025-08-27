import {StatusMessages} from '../../../screens/popups/type';
import i18n from '../../../i18n';

export const ERRORS = {
    getCredentials: {
        title: i18n.t(
            'The list of profile credentials could not be retrieved.'
        ),
        text: i18n.t('Please try again later'),
        statusType: StatusMessages.Error
    },
    saveSelfReport: {
        title: i18n.t('The credential could not be saved.'),
        text: i18n.t('Please try again later'),
        statusType: StatusMessages.Error
    },
    saveIdDocument: {
        title: i18n.t('The credential could not be saved.'),
        text: i18n.t('Please try again later'),
        statusType: StatusMessages.Error
    },
    updateNote: {
        title: i18n.t('The note could not be saved.'),
        text: i18n.t('Please try again later'),
        statusType: StatusMessages.Error
    },
    deleteCredential: {
        title: i18n.t('The credential could not be deleted.'),
        text: i18n.t('Please try again later'),
        statusType: StatusMessages.Error
    },
    reset: {
        title: i18n.t('Data could not be reset.'),
        text: i18n.t('Please try again later'),
        statusType: StatusMessages.Error
    },
    getSettings: {
        title: i18n.t('Settings could not be retrieved.'),
        text: i18n.t('Please try again later'),
        statusType: StatusMessages.Error
    },
    saveSettings: {
        title: i18n.t('Settings could not be saved.'),
        text: i18n.t('Please try again later'),
        statusType: StatusMessages.Error
    },
    deleteRevoked: {
        title: i18n.t('Data could not be reset.'),
        text: i18n.t('Please try again later'),
        statusType: StatusMessages.Error
    },
    missingCredentials: {
        statusType: StatusMessages.Error,
        title: i18n.t('Missing credentials'),
        text: i18n.t(
            'To claim the missing credentials go back to the profile and search for the issuer.'
        )
    },
    missingExistingCredentials: (
        credentialNames: string,
        isMultiple: boolean
    ) => ({
        statusType: StatusMessages.Error,
        title: i18n.t(
            `{{credentialNames}} ${isMultiple ? 'are' : 'is'} required`,
            {credentialNames}
        ),
        text: i18n.t(
            `Please add the required credential${isMultiple ? 's' : ''}`
        )
    }),
    noExistingCredentials: (credentialNames: string, isMultiple: boolean) => {
        const lowerCaseNames = credentialNames.toLowerCase();
        return {
            statusType: StatusMessages.Error,
            title: i18n.t(
                `{{credentialNames}} ${isMultiple ? 'are' : 'is'} required`,
                {credentialNames}
            ),
            text: i18n.t(
                `Go back to the profile, open the identity section and tap + to claim the missing credential${
                    isMultiple ? 's' : ''
                }: {{credentialNames}}.\nOnce received, you can restart the process to claim your career credential.`,
                {credentialNames: lowerCaseNames}
            )
        };
    }
};
