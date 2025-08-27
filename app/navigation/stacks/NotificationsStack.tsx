import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AvatarsBlockContainer} from 'app/components/Navigation/AvatarsBlockContainer';
import {StackHeaderOptions} from '../options';
import {Notifications} from '../../screens/notifications/Main';
import {NotificationsStackParamList} from '../StackParamsList';

const Stack = createStackNavigator<NotificationsStackParamList>();

export const NotificationsStack: React.FC<{
    NotificationsScreen?: React.ComponentType<any>;
    screenOptions?: object;
    headerShown?: boolean;
}> = ({NotificationsScreen, screenOptions = {}, headerShown = false}) => {
    return (
        <Stack.Navigator
            screenOptions={{
                ...StackHeaderOptions,
                headerTitle: '',
                ...screenOptions
            }}>
            {NotificationsScreen ? (
                <Stack.Screen
                    options={{headerShown}}
                    name="Notifications"
                    component={NotificationsScreen}
                />
            ) : (
                <Stack.Screen
                    name="Notifications"
                    component={Notifications}
                    options={{
                        headerLeft: () => <AvatarsBlockContainer />
                    }}
                />
            )}
        </Stack.Navigator>
    );
};
