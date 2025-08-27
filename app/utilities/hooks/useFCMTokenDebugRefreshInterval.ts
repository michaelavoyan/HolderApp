import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
import {VCLEnvironment} from '@velocitycareerlabs/vcl-react-native';
import {VCL_ENVIRONMENT} from '../../configs';

const FCM_PUSH_TOKEN_DEBUG_LIFE_TIME = 15 * 60 * 1000; // 15 min

const refreshFCMTokenIfIntervalExpired = async () => {
    const previousRefreshTime = await AsyncStorage.getItem(
        'FCM_PUSH_TOKEN_REFRESH_DATE_TIME'
    );

    const currentDateTime = new Date().getTime();

    if (!previousRefreshTime) {
        await AsyncStorage.setItem(
            'FCM_PUSH_TOKEN_REFRESH_DATE_TIME',
            String(currentDateTime)
        );

        return;
    }

    const isDebugLifeTimeExpired =
        currentDateTime - Number(previousRefreshTime) >
        FCM_PUSH_TOKEN_DEBUG_LIFE_TIME;

    if (isDebugLifeTimeExpired) {
        // triggers messaging().onTokenRefresh
        await messaging().deleteToken();
        await messaging().getToken();

        await AsyncStorage.setItem(
            'FCM_PUSH_TOKEN_REFRESH_DATE_TIME',
            String(currentDateTime)
        );
    }
};

export const useFCMTokenDebugRefreshInterval = (isEnabled: boolean) => {
    useEffect(() => {
        if (VCL_ENVIRONMENT !== VCLEnvironment.Dev) {
            return () => {};
        }

        if (isEnabled) {
            refreshFCMTokenIfIntervalExpired();
        }

        const intervalInstance = setInterval(() => {
            if (isEnabled) {
                refreshFCMTokenIfIntervalExpired();
            }
        }, 10 * 1000);

        return () => clearInterval(intervalInstance);
    }, [isEnabled]);
};
