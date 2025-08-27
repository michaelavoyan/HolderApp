import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-elements';
import {SVG} from 'app/assets/icons';
import {isIOS} from 'app/utilities/helpers';

export const PlusButton: React.FC<{
    onPress: () => void;
    disabled?: boolean;
    customStyle?: object;
    isVisible?: boolean;
}> = ({onPress, disabled, customStyle, isVisible}) => {
    const {theme} = useTheme();

    const getIconColor = () => {
        let color = isIOS ? theme.colors.dark : theme.colors.primaryAndroid;

        if (disabled) {
            color = isIOS
                ? theme.colors.disabledText
                : theme.colors.disabledAndroid;
        }

        return color;
    };

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPress}
            testID="plus-button"
            style={{...customStyle, ...{ display: isVisible ? 'flex' : 'none' }}}
            disabled={disabled}>
            {SVG(getIconColor(), 40).plus}
        </TouchableOpacity>
    );
};
