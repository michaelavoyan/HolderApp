import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {useTheme} from 'react-native-elements';

import {ModalBackground} from 'app/components/common/ModalBackground';
import {RootStackParamList} from '../../navigation/StackParamsList';
import {normalize} from '../../utilities/helpers';

type Props = StackScreenProps<RootStackParamList, 'LoadingPopup'>;

export const LoadingPopupScreen: React.FC<Props> = ({
    route: {
        params: {title}
    }
}) => {
    const {
        theme: {
            colors: {secondaryBg, secondary}
        }
    } = useTheme();

    return (
        <ModalBackground>
            <View
                style={[
                    styles.popup,
                    {
                        backgroundColor: secondaryBg
                    }
                ]}>
                <ActivityIndicator color={secondary} size="large" />
                {!!title && <Text style={styles.text}>{title}</Text>}
            </View>
        </ModalBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0
    },
    popup: {
        borderRadius: 14,
        width: 270,
        padding: 30
    },
    text: {
        textAlign: 'center',
        paddingTop: 24,
        fontWeight: '600',
        fontFamily: 'SFProText-Regular',
        fontSize: normalize(17),
        lineHeight: normalize(22),
        letterSpacing: -0.408
    }
});
