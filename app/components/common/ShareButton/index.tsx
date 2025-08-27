import React from 'react';
import {TouchableOpacity} from 'react-native';

import {useTheme} from 'react-native-elements';
import {SVG} from 'app/assets/icons';

import {isIOS} from '../../../utilities/helpers';

export const ShareButton: React.FC<{
    onPress: () => void;
    disabled?: boolean;
}> = ({onPress, disabled}) => {
    const {theme} = useTheme();

    const getIconColor = () => {
        let color = isIOS ? undefined : theme.colors.primaryAndroid;

        if (disabled) {
            color = isIOS
                ? theme.colors.disabledText
                : theme.colors.disabledAndroid;
        }

        return color;
    };

    return (
        <TouchableOpacity
            disabled={disabled}
            activeOpacity={0.7}
            onPress={onPress}
            testID="share-button">
            {SVG(undefined, 40, undefined, getIconColor()).share}
        </TouchableOpacity>
    );
};
