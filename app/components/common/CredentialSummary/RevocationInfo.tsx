import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {get, getOr, upperFirst} from 'lodash/fp';
import {useTheme} from 'react-native-elements';
import {ClaimCredential} from 'app/store/types/claim';
import {useDateFormat} from 'app/utilities/custom-hooks';
import {fontFamily, formatDateByRegion, normalize} from 'app/utilities/helpers';

import {SavedSelfReportCredential} from '../../../store/types/profile';

export const RevocationInfo: React.FC<{
    credential: ClaimCredential | SavedSelfReportCredential;
}> = ({credential}) => {
    const dateFormat = useDateFormat();
    const {theme} = useTheme();

    const {t} = useTranslation();
    const getDate = (key: string) => {
        const date = get(key, credential);
        return date && formatDateByRegion(new Date(date), dateFormat, true);
    };

    const revocationInfo = (label: string, value: string = '') =>
        value ? (
            <View>
                <Text
                    style={[
                        styles.label,
                        {
                            color: theme.colors.secondaryText
                        }
                    ]}>
                    {label}
                </Text>
                <Text style={styles.value}>{value}</Text>
            </View>
        ) : null;

    return (
        <View style={styles.row}>
            {revocationInfo(t('Date revoked'), getDate('revocationDate'))}
            {revocationInfo(t('Date issued'), getDate('issuanceDate'))}
            {revocationInfo(
                t('Reason'),
                upperFirst(getOr('', 'revocationReason', credential)) || '--'
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 10
    },
    label: {
        lineHeight: normalize(12),
        ...fontFamily({size: 10, weight: '500', iosFamily: 'SFProText'}),
        letterSpacing: -0.24
    },
    value: {
        ...fontFamily({size: 13}),
        lineHeight: normalize(18),
        letterSpacing: 0.2,
        paddingTop: 2
    }
});
