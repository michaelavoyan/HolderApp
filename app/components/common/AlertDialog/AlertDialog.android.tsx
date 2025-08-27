import React from 'react';
import {Text, View, Pressable, StyleSheet, PlatformColor} from 'react-native';
import Modal from 'react-native-modal';
import {last} from 'lodash/fp';

import {colors} from '../../../assets/colors';

export interface IAlertDialog {
    isVisible: boolean;
    title: string;
    message: string;
    buttonLabels: Array<string>;
    buttonActions: Array<() => void>;
    buttonStyles?: Array<{}>;
}

export const AlertDialog: React.FC<IAlertDialog> = ({
    isVisible,
    title,
    message,
    buttonLabels,
    buttonActions,
    buttonStyles
}) => {
    const buttonsNumber = buttonLabels.length;
    const closeAction = last(buttonActions)!;

    return (
        <Modal isVisible={isVisible} useNativeDriver useNativeDriverForBackdrop>
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.message}>{message}</Text>
                <View style={styles.actionsContainer}>
                    {buttonLabels.map((label, index) => {
                        const isLeftBtn = buttonsNumber > 2 && index === 0;

                        return (
                            <Pressable
                                onPress={() => {
                                    buttonActions[index]();
                                    closeAction();
                                }}
                                style={[
                                    styles.button,
                                    isLeftBtn ? styles.leftButton : {}
                                ]}
                                key={label}>
                                <Text
                                    style={[
                                        styles.buttonText,
                                        isLeftBtn ? styles.leftButtonText : {},
                                        buttonStyles ? buttonStyles[index] : {}
                                    ]}>
                                    {buttonLabels[index]}
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    content: {
        backgroundColor: PlatformColor('?attr/colorBackgroundFloating'),
        flexDirection: 'column',
        borderRadius: 3,
        paddingTop: 20,
        paddingHorizontal: 8,
        overflow: 'hidden',
        elevation: 4,
        minWidth: 300,
        justifyContent: 'space-between'
    },
    title: {
        fontWeight: '600',
        letterSpacing: 0.15,
        fontSize: 18,
        paddingHorizontal: 16
    },
    message: {
        fontSize: 16,
        marginTop: 10,
        paddingHorizontal: 16
    },
    actionsContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingBottom: 8,
        paddingHorizontal: 8
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        alignSelf: 'flex-end'
    },
    leftButton: {
        marginRight: 'auto'
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: '600',
        color: colors.active,
        fontSize: 14,
        textTransform: 'uppercase'
    },
    leftButtonText: {
        color: colors.lightPrimaryText
    }
});
