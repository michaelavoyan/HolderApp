import React from 'react';
import {View} from 'react-native';
import {TextButton} from 'app/components/common/TextButton';


type ButtonProps = {
    btnTitle: string;
    onPress?: () => void;
    disabled?: boolean;
};

export const AndroidButton:  React.FC<ButtonProps> = ({btnTitle, onPress, disabled}) => {
    return (
        <View key={btnTitle}>
            <TextButton
                title={btnTitle}
                disabled={disabled}
                onPress={onPress}
            />
        </View>
    );
};
