import {useEffect, useRef, useState} from 'react';
import {isCredentialExpired} from '../credential';

const INTERVAL_TIME = 30000;

const checkIsSomeCredentialExpired = (offerExpirationDates: string[]) =>
    Boolean(
        offerExpirationDates.find((offerExpirationDate) =>
            isCredentialExpired({offerExpirationDate})
        )
    );
export const useCheckCredentialsExpiration = (dates: string[]) => {
    const offerExpirationDates = dates.filter((item) => Boolean(item));

    const [isExpired, setIsExpired] = useState(
        checkIsSomeCredentialExpired(offerExpirationDates)
    );

    const timerRef = useRef<number>(0);

    useEffect(() => {
        const isCredExpired =
            checkIsSomeCredentialExpired(offerExpirationDates);

        if (isCredExpired) {
            setIsExpired(isCredExpired);
        }
    }, [offerExpirationDates]);

    useEffect(() => {
        if (offerExpirationDates.length) {
            timerRef.current = setInterval(() => {
                const isCredExpired =
                    checkIsSomeCredentialExpired(offerExpirationDates);

                if (isCredExpired) {
                    setIsExpired(isCredExpired);
                    clearInterval(timerRef.current);
                }
            }, INTERVAL_TIME)  as unknown as number;
        }

        return () => {
            clearInterval(timerRef.current);
        };
    }, [offerExpirationDates]);

    return isExpired;
};
