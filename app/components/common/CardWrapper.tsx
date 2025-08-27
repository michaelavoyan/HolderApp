import React, {ReactNode} from 'react';
import {View, StyleSheet, FlexStyle} from 'react-native';
import {useTheme} from 'react-native-elements';

import {useSelector} from 'react-redux';

import {isIOS} from 'app/utilities/helpers';
import {credentialColorSelector} from '../../store/selectors/common';

const definePlatformSpecificColor = (
    categoryColor: string,
    defaultColor: string
) => {
    const color = categoryColor || defaultColor;
    return isIOS ? `${color}33` : color;
};

export const CardWrapper: React.FC<{
    customStyles?: FlexStyle;
    withBoxShadow?: boolean;
    credentialTypes?: Array<string>;
    children?: ReactNode;
}> = ({
    children,
    customStyles = {},
    withBoxShadow = false,
    credentialTypes = []
}) => {
    const {theme} = useTheme();
    const categoryColor = useSelector(credentialColorSelector(credentialTypes));
    const color = definePlatformSpecificColor(
        categoryColor,
        theme.colors.shadowColor
    );

    return (
        <View
            style={[
                styles.container,
                {backgroundColor: theme.colors.secondaryBg},
                {shadowColor: color},
                customStyles,
                withBoxShadow && styles.shadow
            ]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 21,
        paddingTop: 24,
        paddingBottom: 22,
        borderRadius: isIOS ? 14 : 4
    },
    shadow: {
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.6,
        shadowRadius: 6,
        elevation: 5
    }
});
