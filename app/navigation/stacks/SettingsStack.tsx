import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NewContentSettingsGuide} from 'app/screens/guides/FirstInstallGuide';
import {TermsAndConditionsScreen} from 'app/screens/auth/TermsAndConditionsScreen';
import {StackHeaderOptions} from '../options';
import {Settings} from '../../screens/settings/Main';
import {SettingsStackParamList} from '../StackParamsList';
import {AvatarsBlockContainer} from '../../components/Navigation/AvatarsBlockContainer';
import {MoreButtonContainer} from '../../components/Navigation/MoreButtonContainer';
import {LinkedInSettings} from '../../screens/settings/LinkedInSettings/LinkedInSettings';

const Stack = createStackNavigator<SettingsStackParamList>();

export const SettingsStack: React.FC<{
    SettingsScreen?: React.ComponentType<any>;
    screenOptions?: object;
    headerShown?: boolean;
}> = ({SettingsScreen, screenOptions = {}, headerShown = false}) => {
    return (
        <Stack.Navigator
            screenOptions={{
                ...StackHeaderOptions,
                ...screenOptions
            }}>
            {SettingsScreen ? (
                <Stack.Screen
                    options={{headerShown}}
                    name="Settings"
                    component={SettingsScreen}
                />
            ) : (
                [
                    <Stack.Screen
                        key="Settings"
                        name="Settings"
                        component={Settings}
                        options={{
                            title: '',
                            headerLeft: () => <AvatarsBlockContainer />,
                            headerRight: () => <MoreButtonContainer />
                        }}
                    />,
                    <Stack.Screen
                        key="LinkedIn"
                        name="LinkedIn"
                        component={LinkedInSettings}
                        options={{
                            title: ''
                        }}
                    />,
                    <Stack.Screen
                        key="NewContentSettings"
                        component={NewContentSettingsGuide}
                        name="NewContentSettings"
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
                        initialParams={{
                            isOpenedFromSettings: true
                        }}
                    />,
                    <Stack.Screen
                        name="TermsAndConditions"
                        component={TermsAndConditionsScreen}
                        key="TermsAndConditions"
                        options={{
                            title: 'Terms And Conditions',
                        }}
                    />
                ]
            )}
        </Stack.Navigator>
    );
};
