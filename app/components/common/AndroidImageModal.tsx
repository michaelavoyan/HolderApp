import React, {useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';
import {isIOS} from 'app/utilities/helpers';
import {SVG} from 'app/assets/icons';
import {theme} from '../../assets/theme';

interface RBSheetRef {
    /**
     * The method to open a bottom sheet.
     */
    open: () => void;

    /**
     * The method to close a bottom sheet.
     */
    close: () => void;
}
export const AndroidImageModal: React.FC<{
    open: boolean;
    onClose: () => void;
    options: {[key: number]: () => void};
    isDeleteAvailable: boolean;
}> = ({open, onClose, options, isDeleteAvailable}) => {
    const refRBSheet = useRef<RBSheetRef | null>(null);

    const {t} = useTranslation();

    const onCameraTap = () => {
        if (!isIOS) {
            refRBSheet?.current?.close();
        }
        options[1 + Number(isDeleteAvailable)]();
    };

    const onImageTap = () => {
        if (!isIOS) {
            refRBSheet?.current?.close();
        }
        options[2 + Number(isDeleteAvailable)]();
    };

    const onRemovePhoto = () => {
        if (!isIOS) {
            refRBSheet?.current?.close();
        }
        options[1]();
    };

    useEffect(() => {
        if (open) {
            refRBSheet?.current?.open();
        }
    }, [open]);

    return (
        <RBSheet
            onClose={onClose}
            ref={refRBSheet}
            draggable={false}
            closeOnPressMask={false}
            height={isDeleteAvailable ? 186 : 124}>
            {isDeleteAvailable ? (
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={onRemovePhoto}
                    style={[styles.container, styles.containerWithIcon]}>
                    <View style={[styles.icon]}>
                        {SVG(theme.colors.primaryAndroid)['trash-android']}
                    </View>
                    <Text style={[styles.text]}>
                        {t('Delete profile photo')}
                    </Text>
                </TouchableOpacity>
            ) : null}
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={onCameraTap}
                style={[styles.container, styles.containerWithIcon]}>
                <View style={[styles.icon]}>{SVG()['photo-android']}</View>
                <Text style={[styles.text]}>{t('Take photo')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={onImageTap}
                style={[styles.container, styles.containerWithIcon]}>
                <View style={[styles.icon]}>{SVG()['gallery-android']}</View>
                <Text style={[styles.text]}>{t('Add from gallery')}</Text>
            </TouchableOpacity>
        </RBSheet>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 59,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF'
    },
    containerWithIcon: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    text: {
        textAlignVertical: 'center',
        letterSpacing: 0.2,
        fontSize: 14,
        marginHorizontal: 16,
        color: '#000000'
    },
    icon: {
        marginHorizontal: 16
    }
});
