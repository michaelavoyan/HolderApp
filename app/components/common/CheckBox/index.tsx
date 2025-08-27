import React from 'react';
import {StyleSheet} from 'react-native';
import {CheckBox, useTheme} from 'react-native-elements';

import {isIOS} from 'app/utilities/helpers';
import {CheckBoxProps} from '../typings/types';

export const CustomCheckBox: React.FC<CheckBoxProps> = ({
    checked,
    toggleCheckbox
}) => {
    const {theme} = useTheme();

    return (
        <CheckBox
            containerStyle={styles.checkBoxContainer}
            iconType="material-community"
            checkedIcon={isIOS ? 'check-circle' : 'checkbox-marked'}
            checkedColor={
                isIOS ? theme.colors.active : theme.colors.primaryAndroid
            }
            uncheckedIcon={isIOS ? 'circle-outline' : 'checkbox-blank-outline'}
            checked={checked}
            onPress={toggleCheckbox}
        />
    );
};

const styles = StyleSheet.create({
    checkBoxContainer: {
        margin: 0,
        marginLeft: 0,
        marginRight: 0,
        padding: 0
    }
});
