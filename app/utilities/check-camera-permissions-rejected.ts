import {Alert} from 'react-native';

import {
    PERMISSIONS,
    check,
    RESULTS,
    openSettings
} from 'react-native-permissions';
import {isIOS} from 'app/utilities/helpers';
import i18n from '../i18n';

export const checkCameraPermissionsRejected = async () => {
    if (
        (await check(
            isIOS ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA
        )) === RESULTS.BLOCKED
    ) {
        Alert.alert(
            i18n.t('Velocity would like to access the camera'),
            i18n.t('The camera is needed for id document verification'),
            [
                {
                    text: i18n.t('Not now')
                },
                {
                    text: i18n.t('Give access'),
                    onPress: openSettings
                }
            ]
        );

        return false;
    }

    return true;
};
