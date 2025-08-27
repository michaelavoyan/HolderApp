import React, {Dispatch, ReactNode, SetStateAction, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {
    NavigationContainer,
    DefaultTheme,
    NavigationState
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {useTheme} from 'react-native-elements';

import {PixelRatio, Platform, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {AddPhone} from 'app/screens/profile/AddPhone';
import {AddEmail} from 'app/screens/profile/AddEmail';
import {DisclosureSelectCredentialToShare} from 'app/screens/disclosures/DisclosureSelectCredentialToShare';

import {DisclosureCredentialsToIssuer} from 'app/screens/disclosures/DiscloseCredentialsToIssuer';
import {ErrorPopupScreen} from 'app/screens/popups/ErrorPopupScreen';
import {DisclosureTermsAndConditionsScreen} from 'app/screens/disclosures/DisclosureTermsAndConditionsScreen';
import {TermsAndConditionsUpdateScreen} from 'app/screens/auth/TermsAndConditionsUpdateScreen';

import {TermsAndConditionsScreen} from 'app/screens/auth/TermsAndConditionsScreen';
import {ClaimSuccessPopupScreen} from 'app/screens/popups/ClaimSuccessPopupScreen';
import {DisclosureTutorialPopup} from 'app/screens/popups/DisclosureTutorialPopupScreen';
import {ActionPopupScreen} from 'app/screens/popups/ActionPopupScreen';
import {AttachmentPopupScreen} from 'app/screens/popups/AttachmentPopupScreen';
import {TabBarIcon} from '../components/common/TabBar/TabBarIcon';
import {TabItem} from '../components/common/TabBar/TabItem';
import {TabBarLabel} from '../components/common/TabBar/TabBarLabel';
import {isIOS} from '../utilities/helpers';

import {RootStackParamList} from './StackParamsList';
import {StackHeaderOptions} from './options';
import {MoreButtonContainer} from '../components/Navigation/MoreButtonContainer';
import Search from '../screens/profile/Search';
import {Category} from '../screens/profile/Category';
import {ScanQR} from '../screens/profile/ScanQR';
import {BackIcon} from '../components/common/BackButton';
import {DisclosureRequest} from '../screens/disclosures/DisclosureRequest';
import {LinkedInSelectCredentialToShare} from '../screens/linkedIn/LinkedInSelectCredentialToShare';
import {ValidateIssuer} from '../screens/disclosures/ValidateIssuer';
import {SelectCredentialToShare} from '../screens/disclosures/SelectCredentialToShare';
import {PastDisclosureRequestDetails} from '../screens/disclosures/PastDisclosureRequestDetails';
import {PastDisclosureRequestCredentials} from '../screens/disclosures/PastDisclosureRequestCredentials';
import {navigator} from './utils';
import {CredentialDetails} from '../screens/profile/CredentialDetails';
import {AcceptOffers} from '../screens/profile/AcceptOffers';
import {newNotificationsLengthSelector} from '../store/selectors';
import {SelfReport} from '../screens/profile/SelfReport';
import {GenericPopupScreen} from '../screens/popups/GenericPopupScreen';
import {StatusPopupScreen} from '../screens/popups/StatusPopupScreen';
import {InfoPopupScreen} from '../screens/popups/InfoPopupScreen';
import {LoadingPopupScreen} from '../screens/popups/LoadingPopupScreen';
import {ForceUpgradePopupScreen} from '../screens/popups/ForceUpgradePopupScreen';
import {DeepLinkPopupScreen} from '../screens/popups/DeepLinkPopupScreen';
import {EditProfile} from '../screens/settings/EditProfile';
import {ShareDisclosurePopupScreen} from '../screens/popups/ShareDisclosurePopupScreen';
import {ShareToLinkedInPopupScreen} from '../screens/popups/ShareToLinkedInPopupScreen';
import {FirstInstallGuide} from '../screens/guides/FirstInstallGuide';

const Tab = createBottomTabNavigator();

const TabNavigator: React.FC<{
    route: {
        params: {
            Profile: React.FC;
            Disclosures: React.FC;
            Notifications: React.FC;
            Settings: React.FC;
            initialTabName: string;
        };
    };
}> = ({
    route: {
        params: {Profile, Disclosures, Notifications, Settings, initialTabName}
    }
}) => {
    const badgeCount: number = useSelector(newNotificationsLengthSelector);
    const fontScale = PixelRatio.getFontScale();
    const {theme} = useTheme();
    const {t} = useTranslation();
    return (
        <Tab.Navigator
            initialRouteName={initialTabName}
            screenOptions={{
                unmountOnBlur: true,
                headerShown: false,
                headerStatusBarHeight: 0,
                tabBarButton: ({children, onPress, accessibilityState}) => {
                    return (
                        <TabItem
                            onPress={onPress}
                            isActive={Boolean(accessibilityState?.selected)}>
                            {children}
                        </TabItem>
                    );
                },
                tabBarStyle: {
                        ...Platform.select({
                            android: {
                                height: 56,
                                backgroundColor: theme.colors.primaryAndroid,
                                paddingBottom: 4
                            },
                            ios: {}
                        }),
                    }
            }}>
            <Tab.Screen
                name="ProfileTab"
                component={Profile}
                options={{
                    tabBarIcon: (props) => (
                        <TabBarIcon
                            {...props}
                            name="profile"
                            size={isIOS ? 18 : 23}
                        />
                    ),
                    tabBarLabel: (props) => (
                        <TabBarLabel {...props} name={t('Profile')} />
                    )
                }}
            />
            <Tab.Screen
                name="DisclosuresTab"
                component={Disclosures}
                options={{
                    title: t('Disclosures'),
                    tabBarIcon: (props) => (
                        <TabBarIcon
                            {...props}
                            name="offers"
                            size={isIOS ? 18 : 21}
                        />
                    ),
                    tabBarLabel: (props) => (
                        <TabBarLabel {...props} name={t('Disclosures')} />
                    )
                }}
            />
            <Tab.Screen
                name="NotificationsTab"
                component={Notifications}
                options={{
                    title: t('Notifications'),
                    tabBarIcon: (props) => (
                        <TabBarIcon
                            {...props}
                            name="notifications"
                            size={isIOS ? 18 : 23}
                        />
                    ),
                    tabBarLabel: (props) => (
                        <TabBarLabel {...props} name={t('Notifications')} />
                    ),
                    tabBarBadge: badgeCount > 0 ? badgeCount : undefined,
                    tabBarBadgeStyle: {
                        minHeight: 18 * fontScale,
                        minWidth: 18 * fontScale,
                        borderRadius: 9.375 * fontScale
                    }
                }}
            />
            <Tab.Screen
                name="SettingsTab"
                component={Settings}
                listeners={({navigation}) => ({
                    tabPress: (event) => {
                        event.preventDefault();
                        navigation.navigate(
                            'SettingsTab' as never,
                            {
                                screen: 'Settings'
                            } as never
                        );
                    }
                })}
                options={{
                    title: t('Settings'),
                    tabBarIcon: (props) => (
                        <TabBarIcon
                            {...props}
                            name="settings"
                            size={isIOS ? 18 : 20}
                        />
                    ),
                    tabBarLabel: (props) => (
                        <TabBarLabel {...props} name={t('Settings')} />
                    )
                }}
            />
        </Tab.Navigator>
    );
};

export const RootStack = createStackNavigator<RootStackParamList>();

export const Navigation: React.FC<{
    isNewContentGuidePassed?: boolean;
    Profile: React.FC;
    Disclosures: React.FC;
    Notifications: React.FC;
    Settings: React.FC;
    Auth: React.FC;
    component?: React.FC;
    isUserLoggedIn?: boolean;
    initialRouteName?: keyof RootStackParamList;
    initialTabName?: string;
    children?: ReactNode;
    setIsNavigationReady: Dispatch<SetStateAction<boolean>>;
    enablePopups: () => void;
}> = ({
    Profile,
    Disclosures,
    Notifications,
    Settings,
    Auth,
    isUserLoggedIn,
    children,
    initialRouteName,
    initialTabName,
    component,
    setIsNavigationReady,
    isNewContentGuidePassed,
    enablePopups
}) => {
    const {
        theme: {
            colors: {
                secondaryBg,
                primaryBg,
                dark,
                popupBackground,
                forceUpgradePopupBackground
            }
        }
    } = useTheme(); // TODO: it's needed to move in an above component, since cause 7 rendres of navigation
    const {t} = useTranslation();

    const MyTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: secondaryBg
        }
    };

    const handleNavigationReady = useCallback(() => {
        setIsNavigationReady(true);
    }, [setIsNavigationReady]);

    const getInitialRoute = () => {
        if (initialRouteName) {
            return initialRouteName;
        }

        if (!isNewContentGuidePassed) {
            return 'NewContentGuide';
        }

        return isUserLoggedIn ? 'Tabs' : 'Auth';
    };

    const handleStateChange = useCallback(
        (state: NavigationState | undefined) => {
            if (state && state?.routes?.length > 1) {
                enablePopups();
            }
        },
        [enablePopups]
    );

    return (
        <NavigationContainer
            independent
            theme={MyTheme}
            ref={navigator}
            onReady={handleNavigationReady}
            onStateChange={handleStateChange}>
            <RootStack.Navigator 
                initialRouteName={getInitialRoute()}
                screenOptions={{
                    headerMode: 'screen',
                    headerStatusBarHeight: 0
                }}>
                {!isNewContentGuidePassed ? (
                    <RootStack.Screen
                        component={FirstInstallGuide}
                        name="NewContentGuide"
                        options={{
                            title: '',
                            headerStyle: {
                                ...StackHeaderOptions.headerStyle,
                                borderBottomWidth: 0
                            },
                            headerTitleStyle: {
                                ...StackHeaderOptions.headerTitleStyle
                            }
                        }}
                    />
                ) : null}
                {isUserLoggedIn ? (
                    <RootStack.Screen
                        component={
                            (component as React.ComponentType<any>) ||
                            TabNavigator
                        }
                        initialParams={{
                            Profile,
                            Disclosures,
                            Notifications,
                            Settings,
                            initialTabName
                        }}
                        name="Tabs"
                        options={{headerShown: false}}
                    />
                ) : (
                    <RootStack.Screen
                        component={Auth}
                        name="Auth"
                        options={{
                            animationTypeForReplace: 'push',
                            headerShown: false
                        }}
                    />
                )}
                <RootStack.Screen
                    name="Category"
                    component={Category}
                    options={{
                        title: '',
                        headerRight: () => <MoreButtonContainer />,
                        ...StackHeaderOptions,
                        headerStyle: {
                            ...StackHeaderOptions.headerStyle,
                            ...Platform.select({
                                ios: {
                                    backgroundColor: primaryBg,
                                    borderBottomWidth: 0
                                }
                            })
                        }
                    }}
                />
                <RootStack.Screen
                    component={CredentialDetails}
                    name="CredentialDetails"
                    options={{
                        title: '',
                        headerRight: () => <MoreButtonContainer />,
                        ...StackHeaderOptions
                    }}
                />
                <RootStack.Screen
                    component={SelfReport}
                    name="SelfReport"
                    options={{
                        title: t('Self-Report'),
                        headerRight: () => <MoreButtonContainer />,
                        ...StackHeaderOptions
                    }}
                />
                <RootStack.Screen
                    name="AcceptOffers"
                    component={AcceptOffers}
                    options={{
                        title: t('Offers'),
                        ...StackHeaderOptions
                    }}
                />
                <RootStack.Screen
                    component={Search}
                    name="Issuers"
                    options={{
                        title: t('Issuers'),
                        headerRight: () => <MoreButtonContainer />,
                        ...StackHeaderOptions,
                        cardStyle: {
                            backgroundColor: 'white',
                            marginTop: -100,
                            paddingTop: 100
                        }
                    }}
                />
                <RootStack.Screen
                    component={ScanQR}
                    name="ScanQR"
                    options={{
                        presentation: 'transparentModal',
                        title: '',
                        ...StackHeaderOptions,
                        headerStyle: {
                            ...StackHeaderOptions.headerStyle,
                            ...(isIOS ? {backgroundColor: dark} : {}),
                            borderBottomWidth: 0
                        },
                        ...Platform.select({
                            ios: {
                                headerBackImage: () => (
                                    <BackIcon color={secondaryBg} />
                                )
                            }
                        })
                    }}
                />
                <RootStack.Screen
                    component={DisclosureRequest}
                    name="DisclosureRequest"
                    options={({route}) => ({
                        title: t(
                            route.params.customTitle || 'Disclosure Request'
                        ),
                        headerRight: () => <MoreButtonContainer />,
                        ...StackHeaderOptions
                    })}
                />
                <RootStack.Screen
                    component={LinkedInSelectCredentialToShare}
                    name="LinkedInSelectCredentialToShare"
                    options={() => ({
                        title: t('Select credentials to share'),
                        headerRight: () => <MoreButtonContainer />,
                        ...StackHeaderOptions
                    })}
                />
                <RootStack.Screen
                    component={DisclosureTermsAndConditionsScreen}
                    name="DisclosureTermsAndConditions"
                    options={() => ({
                        title: t('Terms and conditions'),
                        headerRight: () => <MoreButtonContainer />,
                        ...StackHeaderOptions
                    })}
                />
                <RootStack.Screen
                    component={DisclosureCredentialsToIssuer}
                    name="DisclosureCredentialsToIssuer"
                    options={{
                        title: t('Disclosure Request'),
                        headerRight: () => <MoreButtonContainer />,
                        ...StackHeaderOptions
                    }}
                />
                <RootStack.Screen
                    component={DisclosureSelectCredentialToShare}
                    name="DisclosureSelectCredentialToShare"
                    options={{
                        title: t('Select Passport'),
                        headerRight: () => <MoreButtonContainer />,
                        ...StackHeaderOptions
                    }}
                />
                <RootStack.Screen
                    component={ValidateIssuer}
                    name="ValidateIssuer"
                    options={{
                        title: t('Validate Issuer'),
                        headerRight: () => <MoreButtonContainer />,
                        ...StackHeaderOptions
                    }}
                />
                <RootStack.Screen
                    name="SelectCredentialToShare"
                    component={SelectCredentialToShare}
                    options={{
                        title: '',
                        headerRight: () => <MoreButtonContainer />,
                        ...StackHeaderOptions,
                        headerStyle: {
                            ...StackHeaderOptions.headerStyle,
                            ...Platform.select({
                                ios: {
                                    backgroundColor: primaryBg,
                                    borderBottomWidth: 0
                                }
                            })
                        }
                    }}
                />
                <RootStack.Screen
                    component={PastDisclosureRequestDetails}
                    name="PastDisclosureRequestDetails"
                    options={{
                        title: t('Disclosure Details'),
                        headerRight: () => <MoreButtonContainer />,
                        ...StackHeaderOptions
                    }}
                />
                <RootStack.Screen
                    component={PastDisclosureRequestCredentials}
                    name="PastDisclosureRequestCredentials"
                    options={{
                        title: '',
                        headerRight: () => <MoreButtonContainer />,
                        ...StackHeaderOptions,
                        headerStyle: {
                            ...StackHeaderOptions.headerStyle,
                            ...Platform.select({
                                ios: {
                                    backgroundColor: primaryBg,
                                    borderBottomWidth: 0
                                }
                            })
                        }
                    }}
                />
                <RootStack.Screen
                    component={AddPhone}
                    name="AddPhone"
                    options={{headerShown: false}}
                />
                <RootStack.Screen
                    component={AddEmail}
                    name="AddEmail"
                    options={{headerShown: false}}
                />
                <RootStack.Screen
                    name="EditProfile"
                    options={{headerShown: false}}
                    component={EditProfile}
                />

                <RootStack.Screen
                    name="WhatsNewGuide"
                    component={FirstInstallGuide}
                />

                <RootStack.Screen
                    name="TermsAndConditions"
                    component={TermsAndConditionsScreen}
                />

                <RootStack.Screen
                    name="TermsAndConditionsUpdate"
                    component={TermsAndConditionsUpdateScreen}
                    options={{headerShown: false, gestureEnabled: false}}
                />

                {/* POPUPS */}
                <RootStack.Group
                    screenOptions={{
                        headerShown: false,
                        presentation: 'transparentModal',
                        ...StyleSheet.create({
                            cardStyle: {
                                backgroundColor: popupBackground
                            }
                        })
                    }}>
                    <RootStack.Screen
                        name="GenericPopup"
                        component={GenericPopupScreen}
                    />
                    <RootStack.Screen
                        name="StatusPopup"
                        component={StatusPopupScreen}
                    />
                    <RootStack.Screen
                        name="ErrorPopup"
                        component={ErrorPopupScreen}
                    />
                    <RootStack.Screen
                        name="InfoPopup"
                        component={InfoPopupScreen}
                    />
                    <RootStack.Screen
                        name="LoadingPopup"
                        component={LoadingPopupScreen}
                    />
                    <RootStack.Screen
                        options={{
                            ...StyleSheet.create({
                                cardStyle: {
                                    backgroundColor: forceUpgradePopupBackground
                                }
                            })
                        }}
                        name="ForceUpgradePopup"
                        component={ForceUpgradePopupScreen}
                    />
                    <RootStack.Screen
                        options={{
                            ...(isIOS
                                ? TransitionPresets.ModalSlideFromBottomIOS
                                : TransitionPresets.RevealFromBottomAndroid)
                        }}
                        name="DeepLinkPopup"
                        component={DeepLinkPopupScreen}
                    />
                    <RootStack.Screen
                        name="ShareDisclosurePopup"
                        component={ShareDisclosurePopupScreen}
                    />
                    <RootStack.Screen
                        name="ShareToLinkedInPopup"
                        component={ShareToLinkedInPopupScreen}
                    />
                    <RootStack.Screen
                        name="ClaimSuccessPopup"
                        component={ClaimSuccessPopupScreen}
                    />
                    <RootStack.Screen
                        name="DisclosureTutorialPopup"
                        component={DisclosureTutorialPopup}
                    />
                    <RootStack.Screen
                        name="ActionPopup"
                        component={ActionPopupScreen}
                    />
                    <RootStack.Screen
                        name="AttachmentPopup"
                        component={AttachmentPopupScreen}
                    />
                </RootStack.Group>
                {/** HERE (TO ROOT STACK) YOU CAN ADD SCREENS THAT SHOULDN'T HAVE BOTTOM BAR */}
                {children}
            </RootStack.Navigator>
        </NavigationContainer>
    );
};
