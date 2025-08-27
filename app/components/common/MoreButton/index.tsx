import React, {useCallback, useState} from 'react';
import {
    ActionSheetIOS,
    Platform,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import {Text, useTheme} from 'react-native-elements';

import {useTranslation} from 'react-i18next';
import {AndroidTopRightMenu} from 'app/components/common/AndroidTopRightMenu';
import {isIOS, isAndroid} from 'app/utilities/helpers';
import {SVG} from 'app/assets/icons';
import EMoreButtonOptions from 'app/constants/moreButtonOptions';

export const MoreButton: React.FC<{
    onPress?: () => void;
    onSelect?: (item: string) => void;
    items?: string[];
    disabledButtonIndices?: number[];
    destructiveButtonIndex?: number;
}> = ({
    onPress,
    onSelect,
    items = [EMoreButtonOptions.EDIT_PROFILE],
    disabledButtonIndices = [],
    destructiveButtonIndex
}) => {
    const {theme} = useTheme();
    const [isMenuVisible, setAndroidMenuVisible] = useState(false);
    const {t} = useTranslation();
    const onPressCallback = useCallback(() => {
        if (isIOS) {
            const options = [t('Cancel'), ...items].map((i) => t(i));
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options,
                    cancelButtonIndex: 0,
                    disabledButtonIndices,
                    destructiveButtonIndex,
                    userInterfaceStyle: 'light'
                },
                (index) => index !== 0 && onSelect && onSelect(options[index])
            );
        } else {
            setAndroidMenuVisible(true);
        }

        if (onPress) onPress();
    }, [
        destructiveButtonIndex,
        disabledButtonIndices,
        items,
        onPress,
        onSelect,
        t
    ]);

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPressCallback}
            style={styles.container}>
            {isIOS ? (
                <Text style={[styles.text, {color: theme.colors.primary}]}>
                    ...
                </Text>
            ) : (
                <View>
                    {SVG(theme.colors.primaryBgAndroid, 16, undefined).more}
                </View>
            )}
            {isAndroid && (
                <AndroidTopRightMenu
                    isVisible={isMenuVisible}
                    items={items}
                    onClose={() => {
                        setAndroidMenuVisible(false);
                    }}
                    onSelect={(index: number) =>
                        onSelect && onSelect(items[index])
                    }
                />
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-end',
        ...Platform.select({
            android: {
                marginRight: -11
            }
        })
    },
    text: {
        fontSize: 21,
        marginTop: -10,
        textAlignVertical: 'center',
        fontWeight: '900',
        letterSpacing: -0.3,
        fontFamily: 'SFProText-Regular'
    }
});
