import React from 'react';
import {useTranslation} from 'react-i18next';
import {Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import {useTheme} from 'react-native-elements';
import {isIOS, normalize} from 'app/utilities/helpers';
import {NotificationsTab, NotificationTabsProps} from './typings';

export const NotificationTabs: React.FC<NotificationTabsProps> = ({
    onChangeTab,
    activeTab,
    disabledRevocationTab,
    disableDisclosuresTab
}) => {
    const {
        theme: {
            colors: {secondaryBg, separatingLine, primaryText, disabledText}
        }
    } = useTheme();
    const {t} = useTranslation();

    return (
        <View
            style={[
                {
                    backgroundColor: separatingLine
                },
                styles.row
            ]}>
            <Pressable
                testID="notifications-offers-tab"
                onPress={() => onChangeTab(NotificationsTab.Offers)}
                android_ripple={{
                    color: separatingLine
                }}
                style={({pressed}) => [
                    activeTab === NotificationsTab.Offers && {
                        backgroundColor: secondaryBg
                    },
                    styles.leftItem,
                    activeTab === NotificationsTab.Offers
                        ? styles.activeItem
                        : styles.unActiveItemLeft,
                    styles.item,
                    activeTab !== NotificationsTab.Offers &&
                        !isIOS && {
                            borderBottomColor: disabledText
                        },
                    Platform.select({
                        ios: pressed && styles.opacity
                    })
                ]}>
                <Text
                    style={[
                        styles.itemText,
                        {
                            color: primaryText
                        },
                        Platform.select({
                            android: {
                                ...(activeTab !== NotificationsTab.Offers && {
                                    color: disabledText
                                })
                            }
                        })
                    ]}>
                    {t('Offers')}
                </Text>
            </Pressable>
            <Pressable
                testID="notifications-revocations-tab"
                disabled={disabledRevocationTab}
                onPress={() => onChangeTab(NotificationsTab.Revocations)}
                android_ripple={{
                    color: separatingLine
                }}
                style={({pressed}) => [
                    styles.rightItem,
                    activeTab === NotificationsTab.Revocations && {
                        backgroundColor: secondaryBg
                    },
                    activeTab === NotificationsTab.Revocations
                        ? styles.activeItem
                        : styles.unActiveItemRight,
                    styles.item,
                    activeTab !== NotificationsTab.Revocations &&
                        !isIOS && {
                            borderBottomColor: disabledText
                        },
                    Platform.select({
                        ios: pressed && styles.opacity
                    })
                ]}>
                <Text
                    style={[
                        styles.itemText,
                        {
                            color: disabledRevocationTab
                                ? disabledText
                                : primaryText
                        },
                        Platform.select({
                            android: {
                                ...(activeTab !==
                                    NotificationsTab.Revocations && {
                                    color: disabledText
                                })
                            }
                        })
                    ]}>
                    {t('Revocations')}
                </Text>
            </Pressable>
            <Pressable
                testID="notifications-disclosures-tab"
                disabled={disableDisclosuresTab}
                onPress={() => onChangeTab(NotificationsTab.Disclosures)}
                android_ripple={{
                    color: separatingLine
                }}
                style={({pressed}) => [
                    styles.rightItem,
                    activeTab === NotificationsTab.Disclosures && {
                        backgroundColor: secondaryBg
                    },
                    activeTab === NotificationsTab.Disclosures
                        ? styles.activeItem
                        : styles.unActiveItemRight,
                    styles.item,
                    activeTab !== NotificationsTab.Disclosures &&
                        !isIOS && {
                            borderBottomColor: disabledText
                        },
                    Platform.select({
                        ios: pressed && styles.opacity
                    })
                ]}>
                <Text
                    style={[
                        styles.itemText,
                        {
                            color: disableDisclosuresTab
                                ? disabledText
                                : primaryText
                        },
                        Platform.select({
                            android: {
                                ...(activeTab !==
                                    NotificationsTab.Disclosures && {
                                    color: disabledText
                                })
                            }
                        })
                    ]}>
                    {t('Disclosures')}
                </Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        padding: 2,
        borderRadius: 8.91,
        ...Platform.select({
            android: {
                backgroundColor: 'transparent',
                padding: 0,
                borderRadius: 0
            }
        })
    },
    item: {
        flex: 1,
        paddingVertical: 6,
        ...Platform.select({
            android: {
                backgroundColor: 'transparent',
                paddingVertical: 16,
                borderBottomWidth: 2
            }
        })
    },
    activeItem: {
        borderRadius: 8.91,
        zIndex: 1,
        ...Platform.select({
            android: {
                borderRadius: 0
            }
        })
    },
    unActiveItemRight: {
        marginLeft: -8
    },
    unActiveItemLeft: {
        marginRight: -8
    },
    leftItem: {
        borderBottomLeftRadius: 8.91,
        borderTopLeftRadius: 8.91,
        ...Platform.select({
            android: {
                borderBottomLeftRadius: 0,
                borderTopLeftRadius: 0
            }
        })
    },
    rightItem: {
        borderBottomRightRadius: 8.91,
        borderTopRightRadius: 8.91,
        ...Platform.select({
            android: {
                borderBottomRightRadius: 0,
                borderTopRightRadius: 0
            }
        })
    },
    itemText: {
        textAlign: 'center',
        fontWeight: '500',
        fontSize: normalize(13),
        lineHeight: normalize(16),
        ...Platform.select({
            android: {textTransform: 'uppercase'}
        })
    },
    opacity: {
        opacity: 0.7
    }
});
