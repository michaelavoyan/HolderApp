import {useCallback, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {openActionPopup, closePopup} from '../popups';

const CODE_EXPIRATION = 600000;

export const useVerificationCodeExpiration = (
    isCodeReceived: boolean,
    onResend: () => void
) => {
    const [isCodeExpired, setIsCodeExpired] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const {t} = useTranslation();

    const startExpirationTimeout = useCallback(() => {
        timerRef.current = setTimeout(() => {
            setIsCodeExpired(true);
        }, CODE_EXPIRATION);
    }, []);

    useEffect(() => {
        if (isCodeReceived) {
            startExpirationTimeout();
        }

        if (!isCodeReceived) {
            setIsCodeExpired(false);
        }

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [isCodeReceived, startExpirationTimeout]);

    const handleResendCode = useCallback(() => {
        setIsCodeExpired(false);
        startExpirationTimeout();
        onResend();
        closePopup();
    }, [startExpirationTimeout, onResend]);

    const checkIsCodeExpired = (callback: () => void) => {
        if (isCodeExpired) {
            return () => {
                openActionPopup({
                    params: {
                        title: t('The code has expired'),
                        buttons: [
                            {
                                title: t('Cancel'),
                                onPress: () => closePopup()
                            },
                            {
                                title: t('Receive a new code'),
                                onPress: handleResendCode
                            }
                        ]
                    }
                });
            };
        }
        return callback;
    };

    return {isCodeExpired, checkIsCodeExpired};
};
