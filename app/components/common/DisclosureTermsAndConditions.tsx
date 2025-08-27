import React from 'react';
import {isBoolean} from 'lodash/fp';
import {StyleSheet, Text, Linking, View} from 'react-native';
import {CheckBox, useTheme} from 'react-native-elements';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {TermAndConditionsProps} from 'app/components/common/typings/types';

import {isIOS, normalize} from 'app/utilities/helpers';
import {RootStackParamList} from '../../navigation/StackParamsList';

type DisclosureTermsAndConditionsProps = StackNavigationProp<
    RootStackParamList,
    'DisclosureTermsAndConditions'
>;

export const DisclosureTermsAndConditions: React.FC<TermAndConditionsProps> = ({
    checked,
    onCheck,
    link,
    text,
    isPublicSharingMode = false
}) => {
    const {theme} = useTheme();
    const navigation = useNavigation<DisclosureTermsAndConditionsProps>();

    const onOpenUrl = () => {
        if (isPublicSharingMode) {
            navigation.navigate('DisclosureTermsAndConditions');
            return;
        }
        if (link) {
            Linking.openURL(link);
        }
    };

    return (
        <View style={styles.row}>
            <Text
                style={[
                    styles.termsText,
                    {
                        color: isIOS
                            ? theme.colors.link
                            : theme.colors.primaryAndroid
                    }
                ]}
                onPress={onOpenUrl}>
                {text}
            </Text>
            {isBoolean(checked) && (
                <CheckBox
                    containerStyle={styles.checkBoxContainer}
                    iconType="material-community"
                    checkedIcon={isIOS ? 'check-circle' : 'checkbox-marked'}
                    checkedColor={
                        isIOS
                            ? theme.colors.active
                            : theme.colors.primaryAndroid
                    }
                    uncheckedIcon={
                        isIOS ? 'circle-outline' : 'checkbox-blank-outline'
                    }
                    checked={checked}
                    onPress={onCheck}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    termsText: {
        flexShrink: 2,
        fontSize: normalize(13),
        lineHeight: normalize(18),
        letterSpacing: 0.2,
        fontFamily: 'SFProDisplay-Regular',
        textDecorationLine: 'none',
    },
    checkBoxContainer: {
        alignItems: 'flex-end',
        margin: 0,
        marginLeft: 0,
        marginRight: 0,
        paddingRight: 0
    }
});
