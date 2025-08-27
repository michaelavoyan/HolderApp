import {AppState} from 'react-native';

export const waitForForegroundAppState = () => {
    return new Promise(resolve => {
        setTimeout(() => resolve(false), 5000);

        const interval = setInterval(() => {
            if (AppState.currentState === 'active') {
                clearInterval(interval);
                resolve(true);
            }
        }, 100);
    });
};
