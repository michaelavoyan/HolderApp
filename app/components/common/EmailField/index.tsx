import React from 'react';
import {
    StyleProp,
    StyleSheet,
    TextInputProps,
    View,
    ViewStyle
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {SVG} from '../../../assets/icons';
import {isIOS} from '../../../utilities/helpers';
import {GenericInput} from '../GenericInput';

export const EmailField: React.FC<{
    error?: string;
    containerStyles?: StyleProp<ViewStyle>;
} & TextInputProps> = ({containerStyles, ...props}) => {
    const {t} = useTranslation();
    return (
        <View style={[styles.container, containerStyles]}>
            {SVG(undefined, undefined)[`email${isIOS ? '' : '-android'}`]}
            <GenericInput
                {...props}
                containerStyle={styles.input}
                label={t('Email*')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        flex: 1,
        marginLeft: 15
    }
});
