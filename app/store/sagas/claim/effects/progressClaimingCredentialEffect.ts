import {call, take, cancelled} from 'redux-saga/effects';
import {EventChannel} from 'redux-saga';
import {openGenericPopup, closePopup} from 'app/utilities/popups';
import {countdown} from 'app/store/sagas/claim/helpers';
import i18n from 'app/i18n';

export function* progressClaimingCredentialEffect(): any {
    const channel: EventChannel<number> = yield call(countdown, 60);

    try {
        while (true) {
            const secondsLeft: number = yield take(channel);
            const seconds = 60 - secondsLeft;

            if (seconds === 30) {
                const popup30 = {
                    params: {
                        title: i18n.t('Processing'),
                        description: i18n.t('Please wait'),
                        buttons: [
                            {
                                closePopupOnPress: true,
                                title: i18n.t('Cancel')
                            }
                        ],
                        showSpinner: true,
                        issuingInProgress: true
                    }
                };
                yield call(openGenericPopup, popup30); // 30
            } else if (seconds === 20) {
                const popup20 = {
                    params: {
                        title: i18n.t('Please wait'),
                        description: i18n.t(
                            'Retrieving your credential offers.\nThis may take up to 30 seconds'
                        ),
                        showSpinner: true,
                        issuingInProgress: true
                    }
                };
                yield call(openGenericPopup, popup20); // 20
            } else if (seconds === 10) {
                const popup10 = {
                    params: {
                        title: i18n.t('Please wait'),
                        description: i18n.t(
                            'Still searching for credential offers'
                        ),
                        showSpinner: true,
                        issuingInProgress: true
                    }
                };
                yield call(openGenericPopup, popup10); // 10
            } else if (seconds === 1) {
                const popup1 = {
                    params: {
                        title: i18n.t('Please wait'),
                        description: i18n.t('Searching for credential offers'),
                        showSpinner: true,
                        issuingInProgress: true
                    }
                };
                yield call(openGenericPopup, popup1); // 1
            }
        }
    } finally {
        if (yield cancelled()) {
            closePopup();
            channel.close();
        }
    }
}
