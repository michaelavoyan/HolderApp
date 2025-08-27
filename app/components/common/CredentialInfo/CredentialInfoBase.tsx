import React, {useCallback, memo, useMemo} from 'react';
import {getOr, get} from 'lodash/fp';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text, useTheme} from 'react-native-elements';

import {normalize, fontFamily} from 'app/utilities/helpers';
import {useCredentialSummaries} from 'app/utilities/credential-values';
import {useSelector} from 'react-redux';
import {categoriesByTypesSelector} from 'app/store/selectors';
import {CardWrapper} from '../CardWrapper';
import {CredentialInfoProps} from '../typings/types';

import {StatusBlock} from '../StatusBlock';
import {RevocationInfo} from '../CredentialSummary/RevocationInfo';
import {CredentialStatus} from '../../../store/types/claim';
import {SVG} from '../../../assets/icons';
import {Icon} from '../Icon';
import {ShareCredentialButton} from '../ShareCredentialButton';

const CredentialInfoBaseComponent: React.FC<CredentialInfoProps> = ({
    item,
    onCredentialDetails,
    hideStatus,
    revoked,
    hideSummaryDetails,
    isShareEnabled = false,
    onShare,
    shareToLinkedIn
}) => {
    const {theme} = useTheme();
    const info = useCredentialSummaries(item);
    const category = useSelector((state) =>
        categoriesByTypesSelector(state, item.type)
    );
    const logo: string = useMemo(
        () =>
            get('issuer.brandImage', item) ||
            get('logo', info) ||
            getOr('', 'issuer.logo', item),
        [item, info]
    );

    const title = useMemo(
        () =>
            category[0]?.isIdentity
                ? getOr('', 'title', info) || get('issuer.brandName', item)
                : get('issuer.brandName', item) || getOr('', 'title', info),
        [category, info, item]
    );

    const renderSubtitle = (val?: string) =>
        val ? (
            <Text
                style={[
                    styles.description,
                    {color: theme.colors.secondaryText}
                ]}>
                {val}
            </Text>
        ) : null;

    const renderLogo = useCallback(() => {
        if (logo) {
            return <Icon uri={logo} width={50} styles={styles.icon} />;
        }
        if (get('status', item) === CredentialStatus.self) {
            return SVG(theme.colors.dark, 40)['self-report'];
        }
        return <Text />;
    }, [item, logo, theme.colors.dark]);

    const handleShare = useCallback(() => {
        if (onShare) {
            onShare(shareToLinkedIn);
        }
    }, [onShare, shareToLinkedIn]);

    return (
        <TouchableOpacity
            key={getOr('', 'id', item)}
            onPress={onCredentialDetails}
            activeOpacity={0.7}>
            <CardWrapper>
                <View style={styles.row}>
                    {renderLogo()}
                    {!hideStatus && (
                        <View>
                            <StatusBlock
                                expireAt={get('offerExpirationDate', item)}
                                status={get('status', item)}
                            />
                        </View>
                    )}
                </View>
                <Text style={[styles.title]}>{title}</Text>
                {renderSubtitle(info?.subTitle)}
                {!hideSummaryDetails && renderSubtitle(info?.summaryDetail)}
                {revoked ? (
                    <View
                        style={[
                            styles.revocationContainer,
                            {borderColor: theme.colors.separatingLine}
                        ]}>
                        <RevocationInfo credential={item} />
                    </View>
                ) : null}
                <ShareCredentialButton
                    isShareEnabled={isShareEnabled}
                    onPress={handleShare}
                    style={styles.ShareCredentialButton}
                />
            </CardWrapper>
        </TouchableOpacity>
    );
};

export const CredentialInfoBase = memo(CredentialInfoBaseComponent);

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 11
    },
    icon: {
        maxWidth: 100,
        height: 50
    },
    title: {
        ...fontFamily({
            size: 16,
            weight: '600',
            android: {size: 15}
        }),
        lineHeight: normalize(19),
        letterSpacing: 0.4,
        paddingBottom: 2
    },
    description: {
        ...fontFamily({
            size: 13,
            weight: '400',
            android: {size: 14}
        }),
        lineHeight: normalize(18),
        paddingBottom: 4
    },
    revocationContainer: {
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1
    },
    ShareCredentialButton: {
        marginTop: -24,
        alignItems: 'flex-end'
    }
});
