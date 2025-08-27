import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {get, getOr} from 'lodash/fp';
import {formatDateByRegion, parseDuration} from 'app/utilities/helpers';
import {Disclosure} from './types';
import {useDateFormat} from '../../utilities/custom-hooks';
import {InfoBlock} from '../common/InfoBlock';

const INFO_TITLES = {
    purpose: 'Purpose',
    duration: 'Duration',
    date: 'Shared Date'
};

export const Info: React.FC<Disclosure> = ({disclosure}) => {
    const dateFormat = useDateFormat();
    const duration = get('duration', disclosure);
    const porpuse = get('purpose', disclosure);
    const disclosureSubType = getOr('', 'subType', disclosure);
    const date = formatDateByRegion(new Date(), dateFormat, true);
    const {t} = useTranslation();
    return !disclosureSubType ? (
        <>
            <View style={styles.infoBlock}>
                <View style={[styles.entry, styles.firstEntry]}>
                    <InfoBlock title={t(INFO_TITLES.date)} value={date} />
                </View>
                <View style={styles.entry}>
                    <InfoBlock
                        title={t(INFO_TITLES.duration)}
                        value={duration ? parseDuration(duration) : '-'}
                    />
                </View>
            </View>
            <View style={[styles.infoBlock, styles.marginTop]}>
                <View style={[styles.entry, styles.firstEntry]}>
                    <InfoBlock
                        title={t(INFO_TITLES.purpose)}
                        value={porpuse || '-'}
                    />
                </View>
            </View>
        </>
    ) : (
        <>
            <View style={styles.infoBlock}>
                <View style={[styles.entry, styles.firstEntry]}>
                    <InfoBlock title={t(INFO_TITLES.date)} value={date} />
                </View>
                <View style={[styles.entry, styles.firstEntry]}>
                    <InfoBlock
                        title={t(INFO_TITLES.purpose)}
                        value={porpuse || '-'}
                    />
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    infoBlock: {
        flexDirection: 'row',
        marginTop: 25
    },
    entry: {
        flexGrow: 1,
        flexShrink: 1,
        marginLeft: 8
    },
    firstEntry: {
        marginLeft: 0
    },
    marginTop: {
        marginTop: 10
    }
});
