import {FC} from 'react';
import {Alert, AlertButton} from 'react-native';
import {last} from 'lodash/fp';
import {IAlertDialog} from './AlertDialog.android';

export const AlertDialog: FC<IAlertDialog> = ({
    title,
    message,
    buttonLabels,
    buttonActions,
    isVisible
}) => {
    if (!isVisible) {
        return null;
    }
    const closeAction = last(buttonActions)!;

    Alert.alert(title, message, [
        ...buttonLabels.map((label, index) => {
            let style;
            switch (label) {
                case 'Cancel':
                    style = 'cancel';
                    break;
                case 'Yes':
                    style = 'destructive';
                    break;
                default:
                    style = 'default';
            }

            return {
                text: label,
                onPress: () => {
                    buttonActions[index]();
                    closeAction();
                },
                style
            } as AlertButton;
        })
    ]);

    return null;
};
