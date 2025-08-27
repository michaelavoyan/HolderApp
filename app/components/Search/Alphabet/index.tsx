import React from 'react';
import {StyleSheet, View, Text, ViewStyle} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTheme} from 'react-native-elements';
import {fontFamily} from 'app/utilities/helpers';

export const Alphabet: React.FC<{
    onPress: (title: string) => void;
    containerStyle?: ViewStyle;
}> = ({onPress, containerStyle}) => {
    const {
        theme: {
            colors: {primary: color}
        }
    } = useTheme();

    return (
        <View style={[styles.list, containerStyle]}>
            {'abcdefghijklmnopqrstuvwxyz#'
                .toUpperCase()
                .split('')
                .map(letter => (
                    <TouchableOpacity
                        key={letter}
                        style={styles.list}
                        activeOpacity={0.7}
                        onPress={() => onPress(letter)}>
                        <Text style={[styles.item, {color}]}>{letter}</Text>
                    </TouchableOpacity>
                ))}
        </View>
    );
};

const styles = StyleSheet.create({
    list: {
        paddingLeft: 7
    },
    item: {
        padding: 2,
        paddingHorizontal: 5,
        ...fontFamily({size: 11, weight: '600', iosFamily: 'SFProText'})
    }
});
