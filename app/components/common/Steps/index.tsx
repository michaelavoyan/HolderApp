import React from 'react';
import {FlexStyle, StyleSheet, View} from 'react-native';
import {useTheme} from 'react-native-elements';
import {v4 as uuidv4} from 'uuid';

export const Steps: React.FC<{
    steps: number;
    selected: number;
    containerStyle?: FlexStyle;
}> = ({steps, selected, containerStyle}) => {
    const {
        theme: {
            colors: {dark, imageBg}
        }
    } = useTheme();

    return (
        <View style={[styles.container, containerStyle]}>
            {Array.from({length: steps}).map((_v, i) => (
                <View
                    key={uuidv4()}
                    style={[
                        styles.item,
                        {
                            backgroundColor: i === selected - 1 ? dark : imageBg
                        }
                    ]}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    item: {
        width: 10,
        height: 10,
        borderRadius: 5,
        margin: 5
    }
});
