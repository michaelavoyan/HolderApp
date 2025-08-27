import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';

export const GeneratedQR: React.FC<{value: string}> = ({value}) => {
    const {theme} = useTheme();

    return (
        <View
            style={[
                styles.container,
                {backgroundColor: theme.colors.primaryBg}
            ]}>
            <QRCode
                value={value}
                size={100}
                backgroundColor={theme.colors.primaryBg}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 14,
        height: 120,
        width: 120,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
