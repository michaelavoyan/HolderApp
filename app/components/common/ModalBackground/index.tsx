import React, {ReactNode} from 'react';
import {View, StyleSheet, Pressable, StyleProp, ViewStyle} from 'react-native';

interface Props {
    children?: ReactNode;
    style?: StyleProp<ViewStyle>;
    onPress?: () => void;
}

export const ModalBackground = ({children, style, onPress}: Props) => {
    return (
        <View style={[styles.container, style]}>
            <Pressable
                style={[StyleSheet.absoluteFill]}
                onPress={onPress}
                testID="backdrop"
            />
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0
    }
});
