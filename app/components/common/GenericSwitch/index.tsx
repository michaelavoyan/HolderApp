import React from 'react';
import {Switch} from 'react-native';
import {useTheme} from 'react-native-elements';
import {isIOS} from '../../../utilities/helpers';

export const GenericSwitch: React.FC<{
    onValueChange?: ((value: boolean) => Promise<void> | void) | null;
    value: boolean;
    disabled?: boolean;
}> = ({onValueChange, value, disabled = false}) => {
    const {theme} = useTheme();

    return (
        <Switch
            value={value}
            onValueChange={onValueChange}
            thumbColor={
                isIOS ? theme.colors.secondaryBg : theme.colors.secondaryBg
            }
            trackColor={{
                true: isIOS
                    ? theme.colors.success
                    : theme.colors.primaryAndroid,
                false: isIOS
                    ? theme.colors.secondaryBg
                    : theme.colors.lightPrimaryAndroid
            }}
            disabled={disabled}
        />
    );
};
