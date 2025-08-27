import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTheme} from 'react-native-elements';
import {fontFamily, normalize} from 'app/utilities/helpers';

export const IOSDoneButton: React.FC<{
    onPress: () => void;
}> = ({onPress}) => {
    const {
        theme: {
            colors: {pickerButton, primary}
        }
    } = useTheme();

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPress}
            containerStyle={[
                styles.container,
                {backgroundColor: pickerButton}
            ]}>
            <Text style={[styles.text, {color: primary}]}>Done</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: normalize(40),
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    text: {
        ...fontFamily({size: 16, weight: '500'})
    }
});
