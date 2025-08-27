import moment, {Moment} from 'moment';
import {useState} from 'react';
import {useDispatch} from 'react-redux';

import {openStatusPopup} from '../popups';
import {StatusMessages} from '../../screens/popups/type';
import {startVerification} from '../../store/actions';
import {AddIdentityInfoTypeE} from '../../components/Profile/typings/types';
import i18n from '../../i18n';

const SECONDS_TO_RESEND = 600;

const formatTimeDiff = (diffTime: number) => {
    if (!diffTime) {
        return '';
    }
    const duration = moment.duration(diffTime, 'seconds');
    return moment()
        .seconds(duration.seconds())
        .minutes(duration.minutes())
        .format('m,s')
        .split(',');
};

export const useVerificationCode = (
    callback: () => void,
    identityInfoType: AddIdentityInfoTypeE
) => {
    const [resendTime, changeTime] = useState<Moment>(moment());
    const [resendAttempts, changeResendAttempts] = useState<number>(0);
    const dispatch = useDispatch();

    const startVerificationCb = (value: string) =>
        dispatch(
            startVerification({
                value,
                field: identityInfoType
            })
        );

    const confirmIdentityInfo = (val: string) => {
        startVerificationCb(val);
        if (resendAttempts === 2) {
            changeTime(moment(new Date()).add(SECONDS_TO_RESEND, 's'));
            changeResendAttempts(0);
        } else {
            changeResendAttempts(state => state + 1);
        }
    };

    const onResendCode = () => {
        const remainingTime = moment(resendTime).diff(new Date(), 'seconds');
        if (moment(new Date()).isAfter(resendTime) || !remainingTime) {
            callback();
            return;
        }
        openStatusPopup({
            params: {
                title: i18n.t('Please wait'),
                text: i18n.t(
                    'A verification code will be sent in\n{{minutes}} minutes and {{seconds}} seconds',
                    {
                        minutes: formatTimeDiff(remainingTime)[0],
                        seconds: formatTimeDiff(remainingTime)[1]
                    }
                ),
                statusType: StatusMessages.Shared
            }
        });
    };

    return {confirmIdentityInfo, onResendCode};
};
