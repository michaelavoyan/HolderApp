import React, {ReactNode} from 'react';
import {View, StyleSheet, GestureResponderEvent, Pressable} from 'react-native';
import {useTheme} from 'react-native-elements';
import {isIOS} from 'app/utilities/helpers';

export const TabItem: React.FC<{
    isActive: boolean;
    customStyle?: object;
    children: ReactNode;
    onPress?: (e: GestureResponderEvent) => void;
}> = ({isActive, customStyle, onPress, children}) => {
    const {theme} = useTheme();

    return (
        <Pressable
            style={({pressed}) => [
                styles.touchableContainer,
                {
                    ...(!isIOS
                        ? {backgroundColor: theme.colors.primaryAndroid}
                        : {}),
                    ...(isActive
                        ? {
                              borderTopColor: theme.colors.dark
                          }
                        : {
                              borderTopColor: theme.colors.secondaryBg
                          })
                },
                isIOS ? {opacity: pressed ? 0.5 : 1} : {}
            ]}
            android_ripple={{
                color: theme.colors.secondaryBg,
                borderless: true
            }}
            onPress={onPress}>
            <View
                style={[
                    styles.container,
                    customStyle,
                    {
                        ...(isIOS
                            ? {backgroundColor: theme.colors.secondaryBg}
                            : {backgroundColor: 'transparent'}),
                        ...(isActive && isIOS
                            ? {
                                  marginTop: 1
                              }
                            : {})
                    }
                ]}>
                {children}
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    touchableContainer: {
        flex: 1,
        ...(isIOS
            ? {borderTopWidth: 2, marginTop: -1}
            : // marginHorizontal is needed to see full android ripple effect
              {borderTopWidth: 0, marginHorizontal: 5})
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black'
    }
});
