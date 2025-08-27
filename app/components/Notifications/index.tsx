import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {isEmpty, map, filter} from 'lodash/fp';
import {useTheme} from 'react-native-elements';
import {fontFamily, isIOS, normalize} from 'app/utilities/helpers';
import {NotificationsProps, NotificationsTab} from './typings';
import {CredentialSummary} from '../common/CredentialSummary';
import {NotificationTabs} from './Tabs';
import {PastDisclosureEntry} from '../PastDisclosures/PastDisclosureEntry';
import {CardWrapper} from '../common/CardWrapper';
import {ButtonsBlock} from './ButtonsBlock';

export const EMPTY_NOTIFICATIONS_MESSAGE = 'No notifications yet';
export const NEW_OFFERS_MESSAGE = 'You have new credential offers';

const EmptyNotifications: React.FC<{color: string}> = ({color}) => {
    const {t} = useTranslation();
    return (
        <View style={styles.textContainer}>
            <Text style={[styles.text, {color}]}>
                {t(EMPTY_NOTIFICATIONS_MESSAGE)}
            </Text>
        </View>
    );
};

export const NotificationsScreen: React.FC<NotificationsProps> = ({
    offers,
    onCredentialDetails,
    countries,
    regions,
    onChangeTab,
    activeTab,
    revocations,
    disclosures,
    toggleCheckbox,
    onFinalize
}) => {
    const {
        theme: {
            colors: {secondary}
        }
    } = useTheme();
    const navigation = useNavigation();
    const checkedOffers = filter('checked', offers);

    const {t} = useTranslation();

    const sortedOffers = useMemo(
        () => offers.sort((a, b) => (a.hash > b.hash ? 1 : -1)),
        [offers]
    );

    return (
        <ScrollView contentContainerStyle={[styles.container]}>
            <NotificationTabs
                activeTab={activeTab}
                onChangeTab={onChangeTab}
                disabledRevocationTab={isEmpty(revocations)}
                disableDisclosuresTab={isEmpty(disclosures)}
            />

            <View style={styles.containerAndroid}>
                {activeTab === NotificationsTab.Offers && !isEmpty(offers) && (
                    <Text style={[styles.text, {color: secondary}]}>
                        {t(NEW_OFFERS_MESSAGE)}
                    </Text>
                )}

                {/* eslint-disable-next-line no-nested-ternary */}
                {activeTab === NotificationsTab.Offers ? (
                    <View style={styles.listContainer}>
                        {!isEmpty(sortedOffers) ? (
                            map(
                                (item) => (
                                    <CredentialSummary
                                        key={item.hash}
                                        onCredentialDetails={() =>
                                            onCredentialDetails(item)
                                        }
                                        countries={countries}
                                        regions={regions}
                                        item={item}
                                        toggleCheckbox={toggleCheckbox}
                                        checked={item.checked}
                                    />
                                ),
                                sortedOffers
                            )
                        ) : (
                            <EmptyNotifications color={secondary} />
                        )}
                    </View>
                ) : activeTab === NotificationsTab.Revocations ? (
                    <View
                        style={[
                            styles.listContainer,
                            styles.revocationsContainer
                        ]}>
                        {!isEmpty(revocations) ? (
                            map(
                                (item) => (
                                    <CredentialSummary
                                        key={item.hash}
                                        onCredentialDetails={() =>
                                            onCredentialDetails(item)
                                        }
                                        countries={countries}
                                        regions={regions}
                                        item={item}
                                        hideStatus
                                        revoked
                                        hideSummaryDetails
                                    />
                                ),
                                revocations
                            )
                        ) : (
                            <EmptyNotifications color={secondary} />
                        )}
                    </View>
                ) : (
                    <View style={styles.listContainer}>
                        {!isEmpty(disclosures) ? (
                            map(
                                (item) => (
                                    <TouchableOpacity
                                        key={item.id}
                                        onPress={() =>
                                            // @ts-ignore
                                            navigation.navigate('PastDisclosureRequestDetails' as never, {disclosureId: item.id} as never)
                                        }>
                                        <CardWrapper
                                            customStyles={
                                                styles.disclosureWrapper
                                            }>
                                            <PastDisclosureEntry
                                                disclosure={item}
                                            />
                                        </CardWrapper>
                                    </TouchableOpacity>
                                ),
                                disclosures
                            )
                        ) : (
                            <EmptyNotifications color={secondary} />
                        )}
                    </View>
                )}
                {onFinalize ? (
                    <ButtonsBlock
                        onFinalize={onFinalize}
                        offers={offers}
                        checkedOffers={checkedOffers}
                    />
                ) : null}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 26,
        paddingVertical: 22,
        ...Platform.select({
            android: {paddingHorizontal: 0, paddingTop: 0}
        })
    },
    containerAndroid: {
        ...Platform.select({
            android: {paddingHorizontal: 16, paddingTop: 4}
        })
    },
    listContainer: {
        marginTop: isIOS ? 16 : 10
    },
    buttonContainerLeft: {
        marginRight: 5
    },
    buttonContainerRight: {
        marginLeft: 5
    },
    btnContainer: {
        flexDirection: 'row',
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    revocationsContainer: {
        marginTop: isIOS ? 34 : 29
    },
    textContainer: {
        alignItems: 'center',
        marginTop: isIOS ? 4 : 6
    },
    text: {
        ...fontFamily({size: 13, weight: '500', android: {size: 14}}),
        lineHeight: normalize(17)
    },
    disclosureWrapper: {
        flex: 1,
        marginVertical: 5
    }
});
