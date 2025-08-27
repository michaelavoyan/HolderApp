import {fetch as fetchNetworkState} from '@react-native-community/netinfo';

export const waitForNetworkConnectedState = () => {
    return new Promise(resolve => {
        setTimeout(() => resolve(false), 2000);

        const interval = setInterval(() => {
            fetchNetworkState().then(({isConnected}) => {
                if (isConnected) {
                    clearInterval(interval);

                    resolve(true);
                }
            });
        }, 100);
    });
};
