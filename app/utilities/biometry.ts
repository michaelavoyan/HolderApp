import {Alert, AppState} from 'react-native';
import VclAuthReactNative from '@velocitycareerlabs/vcl-auth-react-native';
import {
    getWasPhonePasscodeAlertShown,
    setWasPhonePasscodeAlertShown
} from 'app/storage/asyncStorage';
import {vclLogger} from './logger';
import {isIOS} from './helpers';
import i18n from '../i18n';

export const vclBiometryAuthenticate = () =>
    VclAuthReactNative.authenticate({
        title: i18n.t(
            'The method you use to unlock this Phone is used to access your Velocity account.'
        )
    });

export const biometryAuthHandler = async () => {
    try {
        // biometry can be requested in background in case APP is triggered from push
        const isIosBiometryRequestedInBackgroundFromPush =
            isIOS && AppState.currentState === 'background';

        if (
            isIosBiometryRequestedInBackgroundFromPush ||
            !(await VclAuthReactNative.isAuthenticationAvailable())
        ) {
            await setWasPhonePasscodeAlertShown(true);

            return true;
        }

        const isRecognized = await vclBiometryAuthenticate();
        return isRecognized;
    } catch (e) {
        vclLogger.error(`biometryAuthHandler: ${e}`);

        throw new Error(`biometryAuthHandler: ${e}`);
    }
};

export const biometryAlert = async (
    withoutAlert: boolean
): Promise<boolean> => {
    return new Promise(resolve =>
        withoutAlert
            ? resolve(biometryAuthHandler())
            : VclAuthReactNative.isAuthenticationAvailable().then(
                  isAvailable => {
                      if (isAvailable) {
                          Alert.alert(
                              i18n.t(
                                  'The Career Wallet contains personal data'
                              ),
                              i18n.t(
                                  'The method you use to unlock this Phone is used to access your Velocity account.'
                              ),
                              [
                                  {
                                      text: i18n.t('OK'),
                                      onPress: () =>
                                          resolve(biometryAuthHandler())
                                  }
                              ]
                          );
                      } else {
                          resolve(true);
                      }
                  }
              )
    );
};

export const invokeBiometryAlertOnce = async (
    withoutCheckingBiometry: boolean = false
) => {
    const wasPhonePasscodeAlertShown = await getWasPhonePasscodeAlertShown();
    if (!wasPhonePasscodeAlertShown) {
        await setWasPhonePasscodeAlertShown(true);
    }
    return biometryAlert(wasPhonePasscodeAlertShown || withoutCheckingBiometry);
};
