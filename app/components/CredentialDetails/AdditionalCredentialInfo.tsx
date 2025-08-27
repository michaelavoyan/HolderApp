import React, { useCallback } from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {getOr, get, isEmpty} from 'lodash/fp';
import {Text, useTheme} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import {fontFamily, formatDateByRegion, normalize} from 'app/utilities/helpers';
import {AdditionalInfoProps} from './typings/type';
import {useDateFormat} from '../../utilities/custom-hooks';
import {ClaimCredential, CredentialStatus} from '../../store/types/claim';
import {RevocationInfo} from '../common/CredentialSummary/RevocationInfo';
import {NextButton} from '../common/NextButton';
import {vfCredentialSelector} from '../../store/selectors';
import {RootStackParamList} from '../../navigation/StackParamsList';

type CredentialDetailsProps = StackNavigationProp<
    RootStackParamList,
    'CredentialDetails'
>;

export const AdditionalCredentialInfo: React.FC<AdditionalInfoProps> = ({
    credentialObject
}) => {
    const {theme} = useTheme();
    const dateFormat = useDateFormat();
    const navigation = useNavigation<CredentialDetailsProps>();
    const replacedCredential: ClaimCredential = useSelector(
        vfCredentialSelector({
            id: get('additionalInfo.replacedId', credentialObject)
        })
    );

    const goToCredential = useCallback(() => {
        navigation.replace('CredentialDetails', {
            credential: replacedCredential
        });
    }, [navigation, replacedCredential]);

    const status = getOr('', 'status', credentialObject);
    const containerStyles = [
        styles.container,
        {borderColor: theme.colors.separatingLine}
    ];
    const {t} = useTranslation();
    const nextButtonText = () => {
        const text = t(
            'Replaced the credential that was revoked by the <b>{{issuerName}}<b> on <b>{{date}}',
            {
                issuerName: getOr('', 'issuer.name', credentialObject),
                date: formatDateByRegion(
                    new Date(
                        get('additionalInfo.replacedDate', credentialObject)
                    ),
                    dateFormat,
                    true
                )
            }
        ).split('<b>');
        return (
            <Text style={styles.title}>
                {text[0]}
                <Text style={styles.boldTitle}>{text[1]}</Text>
                {text[2]}
                <Text style={styles.boldTitle}>{text[3]}</Text>
            </Text>
        );
    };
    if (!isEmpty(replacedCredential)) {
        return (
            <NextButton
                onPress={goToCredential}
                border="both"
                containerStyle={[styles.row, ...containerStyles]}>
                {nextButtonText()}
            </NextButton>
        );
    }
    if (
        status === CredentialStatus.revoked ||
        status === CredentialStatus.replaced
    ) {
        return (
            <View style={containerStyles}>
                <RevocationInfo credential={credentialObject} />
            </View>
        );
    }
    return null;
};

const styles = StyleSheet.create({
    container: {
        marginTop: 23,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderBottomWidth: 1
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 10
    },
    title: {
        ...fontFamily({size: 13}),
        lineHeight: normalize(18),
        letterSpacing: 0.2,
        flexShrink: 2
    },
    boldTitle: {
        ...fontFamily({size: 11, weight: '700'}),
        ...Platform.select({
            ios: {
                fontFamily: 'SFProText-Bold'
            }
        })
    }
});
