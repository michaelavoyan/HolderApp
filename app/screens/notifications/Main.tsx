import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import notifee from '@notifee/react-native';
import {isEmpty, filter, map, includes} from 'lodash/fp';

import {useTheme} from 'react-native-elements';
import {VCLCountry} from '@velocitycareerlabs/vcl-react-native';

import {NotificationsScreen} from 'app/components/Notifications';
import {NotificationsTab} from 'app/components/Notifications/typings';
import {isIOS} from 'app/utilities/helpers';
import {CountryCodes} from 'app/store/types/auth';
import {
    countriesSelector,
    newNotificationsLengthSelector,
    regionsSelector,
    revokedCredentialsSelector,
    vfCredentialsSelector,
    newNotificationsSelector,
    pushOffersSelector
} from 'app/store/selectors';
import {
    ClaimCredential,
    ClaimCredentialWithCheckbox,
    CredentialStatus
} from 'app/store/types/claim';
import {
    finalizeOffersFromDiffIssuers,
    updateCredentials
} from 'app/store/actions';
import EMoreButtonOptions from 'app/constants/moreButtonOptions';

import {isEqual} from 'lodash';
import {RootStackParamList} from '../../navigation/StackParamsList';
import {MoreButton} from '../../components/common/MoreButton';
import {AvatarsBlockContainer} from '../../components/Navigation/AvatarsBlockContainer';
import {BackButton} from '../../components/common/BackButton';

import {openGenericPopup} from '../../utilities/popups';
import {useRemoveNotifications} from '../../utilities/custom-hooks';
import {useAppBackgroundState} from '../../utilities/hooks/useAppBackgroundState';
import {useVerifiedDisclosureNotifications} from '../../utilities/hooks/useVerifiedDisclosureNotifications';
import {isVfCredentialsIsLoadingSelector} from '../../store/selectors/profile';
import {updateDisclosureNotificationsBadge} from '../../store/actions/push';

export const NotificationsContext = React.createContext<{
    activeTab: NotificationsTab;
    changeActiveTab: (tab: NotificationsTab) => void;
}>({activeTab: NotificationsTab.Offers, changeActiveTab: () => {}});

type Props = StackScreenProps<RootStackParamList, 'Notifications'>;

export const Notifications: React.FC<Props> = ({navigation}) => {
    const {
        theme: {
            colors: {reject}
        }
    } = useTheme();
    const {activeTab, changeActiveTab} = React.useContext(NotificationsContext);
    const countries: VCLCountry[] = useSelector(countriesSelector);
    const regions: CountryCodes = useSelector(regionsSelector);
    const revocations: ClaimCredential[] = useSelector(
        revokedCredentialsSelector
    );
    const isVfCredentialsIsLoading: boolean = useSelector(
        isVfCredentialsIsLoadingSelector
    );

    const [selectMode, setSelectMode] = useState<boolean>(false);
    const [checkedOffers, setCheckedOffers] = useState<string[]>([]);
    const offers = useSelector(
        (state: any) => vfCredentialsSelector(state, true),
        (prev, next) => isEqual(prev, next)
    );
    const {vclOffers} = useSelector((state: any) => pushOffersSelector(state));

    const verifiedDisclosuresNotifications =
        useVerifiedDisclosureNotifications();

    const disclosures = useMemo(
        () => [...verifiedDisclosuresNotifications],
        [verifiedDisclosuresNotifications]
    );

    const newOffers = useSelector(newNotificationsSelector);
    const newOffersLength = useSelector(newNotificationsLengthSelector);
    const dispatch = useDispatch();

    const onOpenSelectMode = useCallback(
        () => setSelectMode(true),
        [setSelectMode]
    );

    const {t} = useTranslation();

    useRemoveNotifications(activeTab);

    const moreClicked = useCallback(() => {
        if (!isEmpty(offers)) {
            onOpenSelectMode();
        }
    }, [offers, onOpenSelectMode]);

    const closeSelectMode = useCallback(() => {
        setSelectMode(false);
        setCheckedOffers([]);
    }, [setSelectMode, setCheckedOffers]);

    useEffect(() => {
        if (isEmpty(offers) && selectMode) {
            closeSelectMode();
        }
    }, [selectMode, offers, closeSelectMode]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                !selectMode &&
                activeTab === NotificationsTab.Offers && (
                    <MoreButton
                        onSelect={moreClicked}
                        items={[EMoreButtonOptions.SELECT]}
                    />
                ),
            headerLeft: () =>
                !selectMode ? (
                    <AvatarsBlockContainer />
                ) : (
                    <BackButton onPress={closeSelectMode} />
                )
        });
    }, [activeTab, selectMode, navigation, moreClicked, closeSelectMode]);

    const resultOffers = useMemo(
        () =>
            map(
                (item) =>
                    includes(item.id, checkedOffers)
                        ? ({
                              ...item,
                              checked: true
                          } as ClaimCredentialWithCheckbox)
                        : item,
                offers
            ) as ClaimCredentialWithCheckbox[],
        [checkedOffers, offers]
    );

    useFocusEffect(
        useCallback(() => {
            if (
                isEmpty(revocations) &&
                !isVfCredentialsIsLoading &&
                activeTab !== NotificationsTab.Disclosures
            ) {
                changeActiveTab(NotificationsTab.Offers);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [revocations, changeActiveTab, isVfCredentialsIsLoading])
    );

    const onToggleCheckbox = (item: ClaimCredentialWithCheckbox) =>
        setCheckedOffers((arr) =>
            includes(item.id, arr)
                ? filter((val) => val !== item.id, arr)
                : [...arr, item.id]
        );

    const onChangeTab = useCallback(
        (tab: NotificationsTab) => {
            if (tab === NotificationsTab.Revocations && isEmpty(revocations)) {
                return;
            }

            if (tab === NotificationsTab.Disclosures && isEmpty(disclosures)) {
                return;
            }

            if (tab === NotificationsTab.Disclosures) {
                dispatch(updateDisclosureNotificationsBadge(0, true));
            }

            changeActiveTab(tab);
        },
        [changeActiveTab, disclosures, dispatch, revocations]
    );

    const onFinalizeCb = useCallback(
        (isAccept: boolean) => {
            const checked = filter('checked', resultOffers);
            dispatch(
                // TODO: refactor to be more readable. offerIdsToDelete should use ids from offers by default in the saga
                finalizeOffersFromDiffIssuers({
                    isAccept,
                    offers: {offers: checked, vclOffers},
                    offerIdsToDelete: checkedOffers, // delete offers to restore them with right credentialId
                    ...(checkedOffers.length === offers.length
                        ? {
                              navigation: {name: 'ProfileTab'}
                          }
                        : {})
                })
            );
            closeSelectMode();
        },
        [
            resultOffers,
            dispatch,
            vclOffers,
            checkedOffers,
            offers.length,
            closeSelectMode
        ]
    );

    const onFinalize = useCallback(
        (isAccept: boolean = false) =>
            openGenericPopup({
                params: {
                    title: t(isAccept ? 'Accept Offers' : 'Reject Offers'),
                    description: isAccept
                        ? t(
                              'Are you sure you want to accept the selected offers?'
                          )
                        : t(
                              'Are you sure you want to reject the selected offers?'
                          ),
                    buttons: [
                        {
                            closePopupOnPress: true,
                            title: t('Cancel'),
                            textStyle: styles.btnTitle
                        },
                        {
                            closePopupOnPress: true,
                            onPress: () => onFinalizeCb(isAccept),
                            title: t(isAccept ? 'Accept' : 'Reject'),
                            textStyle:
                                !isAccept && isIOS ? {color: reject} : undefined
                        }
                    ],
                    buttonsDirection: 'row'
                }
            }),
        [onFinalizeCb, reject, t]
    );

    const onCredentialDetails = useCallback((credential: ClaimCredential) => {
        navigation.navigate<'CredentialDetails'>('CredentialDetails', {
            credential,
            goBack: offers.length !== 1
        });
    }, [navigation, offers]);

    const {appState} = useAppBackgroundState();

    useFocusEffect(
        useCallback(() => {
            if (appState !== 'active' || newOffers.length === 0) {
                return;
            }

            let shouldUpdate: boolean = false;
            const updatedCredentials = newOffers.map(
                (cred: ClaimCredential) => {
                    // clear badge counter for revocations, when Revocations tab is active
                    if (
                        (cred.status === CredentialStatus.revoked ||
                            cred.status === CredentialStatus.replaced) &&
                        activeTab === NotificationsTab.Revocations
                    ) {
                        if (cred.isNewRevoked) {
                            shouldUpdate = true;
                        }
                        return {
                            ...cred,
                            isNewRevoked: false
                        };
                    }
                    // clear badge counter for new offers, when Offers tab is active
                    if (
                        cred.status !== CredentialStatus.revoked &&
                        cred.status !== CredentialStatus.replaced &&
                        activeTab === NotificationsTab.Offers
                    ) {
                        if (cred.isNewWaiting) {
                            shouldUpdate = true;
                        }
                        return {
                            ...cred,
                            isNewWaiting: false
                        };
                    }

                    return cred;
                }
            );

            // shouldUpdate prevents loop of updateCredentials when not all offers/revocations was seen by a user
            if (shouldUpdate) {
                dispatch(
                    updateCredentials({
                        credentials: updatedCredentials
                    })
                );
            }
        }, [activeTab, appState, dispatch, newOffers])
    );

    useFocusEffect(
        React.useCallback(() => {
            const changeBadgeCounter = async () => {
                await notifee.setBadgeCount(newOffersLength);
            };

            changeBadgeCounter();
        }, [newOffersLength])
    );

    return (
        <NotificationsScreen
            offers={resultOffers}
            revocations={revocations}
            disclosures={disclosures}
            countries={countries}
            regions={regions}
            onCredentialDetails={onCredentialDetails}
            activeTab={activeTab}
            onChangeTab={onChangeTab}
            toggleCheckbox={selectMode ? onToggleCheckbox : undefined}
            onFinalize={
                activeTab === NotificationsTab.Offers &&
                selectMode &&
                onFinalize
            }
        />
    );
};

const styles = StyleSheet.create({
    btnTitle: {
        ...Platform.select({
            ios: {
                fontWeight: '400'
            }
        })
    }
});
