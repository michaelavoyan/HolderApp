import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    FlexStyle,
    View,
    Platform,
    PixelRatio
} from 'react-native';
import {useTheme} from 'react-native-elements';
import {SVG} from 'app/assets/icons';

import {isIOS, normalize} from '../../../utilities/helpers';

export const AddButton: React.FC<{
    title: string;
    onPress: () => void;
    containerStyle?: FlexStyle;
}> = ({onPress, title, containerStyle = {}}) => {
    const {theme} = useTheme();

    return (
        <TouchableOpacity
            testID="Add button"
            style={[
                styles.container,
                {
                    borderColor: theme.colors.inputBorder
                },
                containerStyle
            ]}
            onPress={onPress}
            activeOpacity={0.7}>
            <Text
                style={[
                    styles.title,
                    {
                        color: theme.colors.secondaryText
                    }
                ]}>
                {title}
            </Text>
            <View style={[styles.iconWrapper]}>
                {
                    SVG(theme.colors.dark, 24)[
                        isIOS ? 'plus-small' : 'plus-android-small'
                    ]
                }
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 56,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1
    },
    title: {
        fontFamily: 'SFProDisplay-Regular',
        fontSize: normalize(15)
    },
    iconWrapper: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        fontFamily: 'SFProDisplay-Regular',
        fontSize: 20 / PixelRatio.getFontScale(),
        lineHeight: 20 / PixelRatio.getFontScale(),
        width: 20,
        height: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
        ...Platform.select({
            ios: {
                marginLeft: 1
            },
            android: {
                marginTop: 3
            }
        })
    }
});
