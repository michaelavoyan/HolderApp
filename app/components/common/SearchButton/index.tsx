import React from 'react';
import {Platform, Pressable, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-elements';
import {SVG} from 'app/assets/icons';

export const SearchButton: React.FC<{
    onPress: () => void;
}> = ({onPress}) => {
    const {theme} = useTheme();

    return (
        <Pressable
            style={({pressed}) => [
                styles.pressable,
                Platform.select({
                    ios: {
                        ...(pressed ? styles.opacity : styles.noOpacity)
                    }
                })
            ]}
            android_ripple={{
                color: theme.colors.disabled,
                borderless: true,
                radius: 15
            }}
            onPress={onPress}>
            {SVG(undefined, 18).search}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    pressable: {
        backgroundColor: 'transparent',
        padding: 10
    },
    opacity: {
        opacity: 0.7
    },
    noOpacity: {
        opacity: 1
    }
});
