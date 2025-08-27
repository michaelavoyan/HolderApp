import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {getOr, upperFirst} from 'lodash/fp';
import {Text, useTheme} from 'react-native-elements';

import {StyleSheet, View} from 'react-native';

import {StatusBlockProps} from 'app/components/common/typings/types';
import {ICON_NAME, isIOS, normalize} from 'app/utilities/helpers';
import {SVG} from 'app/assets/icons';
import {useCheckCredentialsExpiration} from 'app/utilities/hooks/useCheckCredentialsExpiration';
import {CredentialStatus} from '../../store/types/claim';

export const StatusBlock: React.FC<StatusBlockProps> = memo(({
    status: rawStatus,
    expireAt
}) => {
    const {t} = useTranslation();
    const {theme} = useTheme();
    const isExpired = useCheckCredentialsExpiration(expireAt ? [expireAt] : []);
    const status = isExpired ? CredentialStatus.expired : rawStatus;

    const themeStatus = isIOS
        ? theme.colors.status
        : theme.colors.androidStatus;

    const titles: {[key: string]: string} = {
        [CredentialStatus.revoked]: t('revoked'),
        [CredentialStatus.self]: t('self-reported')
    };
    const icon = ICON_NAME[status || ''];

    return status ? (
        <View
            style={[
                styles.container,
                {
                    borderColor: getOr(
                        themeStatus.verified,
                        status,
                        themeStatus
                    )
                }
            ]}>
            {icon && SVG(Object(themeStatus)[status], 10)[icon]}

            <Text
                style={[
                    styles.status,
                    !icon && styles.statusWithoutIcon,
                    {color: Object(themeStatus)[status]}
                ]}>
                {upperFirst(getOr(status, status, titles))}
            </Text>
        </View>
    ) : null;
});

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderWidth: 1,
        borderRadius: 50
    },
    statusWithoutIcon: {
        paddingLeft: 5
    },
    status: {
        paddingLeft: 8,
        paddingRight: 5,
        fontSize: normalize(11),
        fontWeight: '500',
        lineHeight: normalize(13)
    }
});
