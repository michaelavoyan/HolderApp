import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-elements';

import {fontFamily, isIOS} from '../../../../utilities/helpers';

export const MoreIcon = () => {
    const {
        theme: {
            colors: {primary, dark}
        }
    } = useTheme();

    const dot = <View style={[styles.dot, {backgroundColor: dark}]} />;

    return isIOS ? (
        <>
            {' '}
            <View style={styles.iosContainer}>
                <Text
                    style={[
                        styles.dots,
                        {
                            color: primary
                        }
                    ]}>
                    ...
                </Text>
            </View>{' '}
        </>
    ) : (
        <View style={styles.androidContainer}>
            {dot}
            {dot}
            {dot}
        </View>
    );
};

const styles = StyleSheet.create({
    iosContainer: {
        marginTop: -14,
        transform: [{rotate: '180deg'}]
    },
    androidContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 5,
        width: 17,
        paddingRight: 3,
        transform: [{rotate: '90deg'}]
    },
    dots: {
        ...fontFamily({
            size: 21,
            weight: '900',
            iosFamily: 'SFProText'
        }),
        letterSpacing: -0.3
    },
    dot: {
        width: 3,
        height: 3,
        borderRadius: 2
    }
});
