import React from 'react';
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {useTheme} from 'react-native-elements';

export const AndroidTopRightMenu = ({
    isVisible,
    items,
    onClose,
    onSelect
}: {
    isVisible: boolean;
    items: string[];
    onClose: () => void;
    onSelect: (index: number) => void;
}) => {
    const {
        theme: {colors}
    } = useTheme();
    return (
        <Modal
            visible={isVisible}
            transparent
            animationType="none"
            onRequestClose={onClose}>
            <Pressable style={styles.modalOverlay} onPress={onClose} />
            <View
                style={[
                    styles.menuContainer,
                    {
                        backgroundColor: colors.primaryBgAndroid,
                        shadowColor: colors.darkBackdrop
                    }
                ]}>
                {items.map((item, index) => (
                    <TouchableOpacity
                        onPress={() => {
                            onSelect(index);
                            onClose();
                        }}
                        style={styles.menuItem}
                        key={item}>
                        <Text style={[styles.menuItemText, {color: colors.grayText}]}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1
    },
    menuContainer: {
        position: 'absolute',
        zIndex: 1000,
        top: 50,
        right: 20,
        borderRadius: 4,
        elevation: 5,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        width: 195
    },
    menuItem: {
        padding: 12,
    },
    menuItemText: {
        fontSize: 16
    }
});
