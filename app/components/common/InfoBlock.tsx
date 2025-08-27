import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, useTheme} from 'react-native-elements';

import {normalize} from 'app/utilities/helpers';

export const InfoBlock: React.FC<{title: string; value: string}> = ({
    title,
    value
}) => {
    const {theme} = useTheme();

    return (
        <View style={[styles.valueContainer]}>
            <Text style={[styles.title, {color: theme.colors.secondaryText}]}>
                {title}
            </Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontFamily: 'SFProText-Regular',
        fontSize: normalize(10),
        lineHeight: normalize(12),
        fontWeight: '500',
        letterSpacing: -0.24,
        paddingBottom: 2
    },
    valueContainer: {
        flex: 1,
        alignItems: 'flex-start'
    },
    value: {
        fontSize: normalize(13),
        lineHeight: normalize(18),
        letterSpacing: 0.2
    }
});
