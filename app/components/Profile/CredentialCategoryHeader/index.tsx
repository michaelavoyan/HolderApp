import React from 'react';
import {useTranslation} from 'react-i18next';
import {Platform, StyleSheet, View, ViewStyle} from 'react-native';
import {Text, useTheme} from 'react-native-elements';
import {fontFamily, normalize} from 'app/utilities/helpers';
import i18 from 'i18next';
import {VCLEnvironment} from '@velocitycareerlabs/vcl-react-native';
import {PlusButton} from '../../common/PlusButton';
import {CredentialTypeIcon} from '../../common/CredentialTypeIcon';
import {VCL_ENVIRONMENT} from '../../../configs';

export const CredentialCategoryHeader: React.FC<{
    title: string;
    type: string;
    credentialsNumber: number;
    onCreate?: () => void;
    containerStyle?: ViewStyle;
    disabledPlusBtn?: boolean;
}> = ({
          title,
          type,
          credentialsNumber,
          onCreate,
          containerStyle,
          disabledPlusBtn
      }) => {
    const {theme} = useTheme();
    const {t} = useTranslation();
    return (
        <View style={[styles.container, containerStyle]}>
            <View style={styles.iconBlock}>
                <CredentialTypeIcon
                    iconContainerStyle={styles.icon}
                    icon={type}
                />
                <View>
                    <Text testID="category-header-title" style={styles.title}>
                        {title}
                    </Text>
                    <Text
                        style={[
                            styles.subTitle,
                            {color: theme.colors.secondary}
                        ]}>
                        {t(
                            `{{credentialsNumber}} credential${
                                credentialsNumber === 1 ? '' : 's'
                            }`,
                            {credentialsNumber}
                        )}
                    </Text>
                </View>
            </View>
            {onCreate && (
                <PlusButton
                    disabled={disabledPlusBtn}
                    onPress={onCreate}
                    isVisible={isCategoryPlusBtnVisible(title, VCL_ENVIRONMENT)}
                />
            )}
        </View>
    );
};

export const isCategoryPlusBtnVisible = (title: string, environment: VCLEnvironment): boolean => {
    return (
        title.toLowerCase().includes(i18.t('Identity').toLowerCase()) ||
        (environment === VCLEnvironment.Dev || environment === VCLEnvironment.Qa)
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 25,
        ...Platform.select({
            android: {marginHorizontal: 0}
        })
    },
    iconBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'flex-start',
        flex: 0.8
    },
    avatarBlock: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    icon: {
        width: 40,
        height: 40,
        marginRight: 14
    },
    title: {
        ...fontFamily({size: 20, weight: '500'}),
        lineHeight: normalize(26),
        letterSpacing: 0.4,
        flexWrap: 'wrap'
    },
    subTitle: {
        ...fontFamily({size: 14}),
        lineHeight: normalize(17)
    }
});
