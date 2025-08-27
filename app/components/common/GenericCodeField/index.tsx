import React from 'react';
import {PixelRatio, StyleProp, StyleSheet} from 'react-native';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill
} from 'react-native-confirmation-code-field';
import {Text} from 'react-native-elements';
import RNOtpVerify from 'react-native-otp-verify';
import {colors} from 'app/assets/colors';
import {isIOS} from '../../../utilities/helpers';

const renderCell = ({
    index,
    symbol,
    isFocused,
}: {
    index: number;
    symbol: string;
    isFocused: boolean;
}) => {
    return (
        <Text key={index} style={[styles.cell, isFocused && styles.focusCell]}>
            {symbol || (isFocused ? <Cursor /> : null)}
        </Text>
    );
};

export const GenericCodeField: React.FC<{
    cellCount?: number;
    value: string;
    setValue: (value: string) => void;
    rootStyle?: StyleProp<any>;
    setAutoConfirm?: (value: boolean) => void;
}> = ({cellCount = 6, value, setValue, rootStyle = {}, setAutoConfirm}) => {
    const ref = useBlurOnFulfill({value, cellCount});

    React.useEffect(() => {
        if (isIOS) {
            return;
        }

        const otpHandler = (message: string) => {
            try {
                // @ts-ignore
                const code = message.match(/(\d{6})/g)[0];
                if (typeof code === 'string') {
                    setValue(code);
                    if (!isIOS && setAutoConfirm){
                        setAutoConfirm(true);
                    }
                }
            } catch (e) {
                // eslint-disable-next-line no-console
                console.log(e);
            }
        };
        RNOtpVerify.getOtp()
            .then(() => {
                RNOtpVerify.addListener(otpHandler);
            })
            // eslint-disable-next-line no-console
            .catch(error => console.log(error));

        // eslint-disable-next-line consistent-return
        return () => {
            RNOtpVerify.removeListener();
        };
    }, [setValue, setAutoConfirm]);

    return (
        <CodeField
            ref={ref}
            value={value}
            onChangeText={setValue}
            cellCount={cellCount}
            rootStyle={rootStyle}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            accessibilityLabel="oneTimeCode"
            renderCell={renderCell}
            autoFocus
            caretHidden={false}
        />
    );
};

const styles = StyleSheet.create({
    cell: {
        width: PixelRatio.getFontScale() > 2 ? 57 : 47,
        height: 72 * PixelRatio.getFontScale(),
        lineHeight: 72,
        fontSize: 34,
        borderWidth: 1,
        textAlign: 'center',
        borderColor: colors.dark
    },
    focusCell: {
        borderColor: colors.dark
    }
});
