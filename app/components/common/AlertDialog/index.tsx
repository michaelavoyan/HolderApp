import {Platform} from 'react-native';
import {AlertDialog as AlertDialogAndroid} from './AlertDialog.android';
import {AlertDialog as AlertDialogIos} from './AlertDialog.ios';

export const AlertDialog =
    Platform.select({
        android: AlertDialogAndroid,
        ios: AlertDialogIos
    }) || AlertDialogIos;
