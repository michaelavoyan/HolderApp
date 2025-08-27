import {useEffect} from 'react';

export type IntervalInstance = ReturnType<typeof setInterval>;

export const useInterval = (
    callback: (intervalInstance: IntervalInstance) => unknown,
    intervalPeriod: number
) => {
    useEffect(() => {
        const interval: IntervalInstance = setInterval(() => {
            callback(interval);
        }, intervalPeriod);

        callback(interval);

        return () => clearInterval(interval);
    }, [callback, intervalPeriod]);
};
