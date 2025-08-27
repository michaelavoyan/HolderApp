import React from 'react';
import {View} from 'react-native';
import {useTheme} from 'react-native-elements';
import {SVG} from '../../../assets/icons';

import {isIOS} from '../../../utilities/helpers';

export const TabBarIcon: React.FC<{
    focused: boolean;
    name: 'profile' | 'offers' | 'notifications' | 'settings';
    size?: number;
}> = ({focused, name, size = 18}) => {
    const {theme} = useTheme();

    let color;
    if (isIOS) {
        color = focused ? theme.colors.dark : theme.colors.secondaryText;
    } else {
        color = focused ? theme.colors.secondaryBg : theme.colors.disabledTab;
    }

    return <View>{SVG(color, size)[name]}</View>;
};
