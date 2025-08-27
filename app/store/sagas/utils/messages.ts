import i18n from '../../../i18n';
import {StatusMessages} from '../../../screens/popups/type';

export const issCheck = (length: number) => ({
    title: i18n.t(
        `${
            length === 1 ? 'The credential' : 'Some credentials'
        } could not be saved`
    ),
    text: i18n.t('Please search for the issuer again'),
    statusType: StatusMessages.Error
});
