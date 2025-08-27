import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text, useTheme} from 'react-native-elements';

import {normalize, parseDuration} from 'app/utilities/helpers';
import {
    AcceptedDisclosureRequestObject,
    DisclosureStatus,
    DisclosureSubtype
} from 'app/store/types/disclosure';
import {InfoBlock} from '../common/InfoBlock';
import {usePrepareDisclosureInfo} from '../../utilities/hooks/usePrepareDisclosureInfo';
import {useIsDisclosureExpired} from '../../utilities/hooks/useIsDisclosureExpired';

const DeleteButton: React.FC<{
    onPress?: () => void;
}> = ({onPress}) => {
    const {theme} = useTheme();
    const {t} = useTranslation();

    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={{color: theme.colors.error}}>{t('Delete')}</Text>
        </TouchableOpacity>
    );
};

export const PastDisclosureEntry: React.FC<{
    disclosure: AcceptedDisclosureRequestObject;
    onDelete?: () => void;
    isOpened?: boolean;
}> = ({disclosure, onDelete, isOpened = false}) => {
    const {theme} = useTheme();
    const {t} = useTranslation();

    const isDisclosureExpired = useIsDisclosureExpired(disclosure);

    const {
        logo,
        purpose,
        name,
        duration,
        creationDateDisplay,
        brandName,
        brandImage
    } = usePrepareDisclosureInfo(disclosure);

    const getDurationValue = () => {
        if (disclosure.status === DisclosureStatus.revoked) {
            return t('Deleted');
        }

        if (isDisclosureExpired) {
            return 'Expired';
        }

        return duration ? parseDuration(duration) : '-';
    };

    return (
        <>
            {brandImage || logo}
            <Text style={styles.cardName}>{brandName || name}</Text>
            {disclosure.status === DisclosureStatus.verified && (
                <Text
                    style={[
                        styles.aboutToExpireWarning,
                        {color: theme.colors.secondaryText}
                    ]}>
                    {t(
                        'Your Credentials have been verified!\nClick to review Disclosure.'
                    )}
                </Text>
            )}
            <View
                style={[
                    styles.row,
                    styles.borderTop,
                    {borderColor: theme.colors.separatingLine}
                ]}>
                <View style={[styles.entry, styles.firstEntry]}>
                    <InfoBlock
                        title={t('Shared Date')}
                        value={creationDateDisplay}
                    />
                </View>
                {!disclosure.subType && (
                    <View style={styles.entry}>
                        <InfoBlock
                            title={t('Duration')}
                            value={getDurationValue()}
                        />
                    </View>
                )}
                {!disclosure.subType && (
                    <View style={[styles.entry, styles.firstEntry]}>
                        <InfoBlock
                            title={t('Purpose')}
                            value={purpose || '-'}
                        />
                    </View>
                )}
                {disclosure.subType === DisclosureSubtype.public &&
                    isOpened && (
                        <View style={styles.deleteButton}>
                            <DeleteButton onPress={onDelete} />
                        </View>
                    )}
            </View>
            {brandName && brandName !== name && isOpened && (
                <View style={styles.row}>
                    <Text style={styles.aboutToExpireWarning}>
                        {t('{{brandName}} is a commercial name of {{name}}.', {
                            brandName,
                            name
                        })}
                    </Text>
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        paddingTop: 12,
        paddingBottom: 12
    },
    borderTop: {
        borderTopWidth: 1
    },
    entry: {
        flexGrow: 1,
        flexShrink: 1,
        marginLeft: 8
    },
    firstEntry: {
        marginLeft: 0
    },
    cardName: {
        fontSize: normalize(16),
        fontWeight: '600',
        lineHeight: normalize(19),
        paddingBottom: 12
    },
    aboutToExpireWarning: {
        fontSize: normalize(14),
        marginTop: -8,
        marginBottom: 12
    },
    deleteButton: {
        marginRight: 0,
        alignSelf: 'flex-end'
    }
});
