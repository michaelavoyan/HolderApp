import React from 'react';
import {Platform, StyleSheet, Text} from 'react-native';
import {useTheme} from 'react-native-elements';
import {normalize} from '../../../utilities/helpers';

export const TabBarLabel: React.FC<{
    focused: boolean;
    name: string;
}> = ({focused, name}) => {
    const {theme} = useTheme();

    return (
        <Text
            numberOfLines={1}
            style={[
                styles.text,
                Platform.select({
                    ios: {
                        color: focused
                            ? theme.colors.dark
                            : theme.colors.secondaryText
                    },
                    android: {
                        color: focused
                            ? theme.colors.secondaryBg
                            : theme.colors.disabledTab
                    }
                })
            ]}>
            {`${name}`}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        marginBottom: 2,
        marginTop: -5,
        textAlign: 'center',
        ...Platform.select({
            ios: {
                fontFamily: 'SFProText-Regular',
                fontSize: normalize(10),
                letterSpacing: -0.24
            },
            android: {
                fontFamily: 'Roboto',
                fontSize: normalize(12),
                letterSpacing: 0.4
            }
        })
    }
});
