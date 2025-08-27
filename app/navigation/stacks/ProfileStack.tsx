import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {StackHeaderOptions} from '../options';
import {Profile} from '../../screens/profile/Main';
import {ProfileStackParamList} from '../StackParamsList';

const Stack = createStackNavigator<ProfileStackParamList>();

export const ProfileStack: React.FC<{
    ProfileScreen?: React.ComponentType<any>;
    screenOptions?: object;
    headerShown?: boolean;
}> = ({ProfileScreen, screenOptions = {}, headerShown = false}) => {
    return (
        <Stack.Navigator
            screenOptions={{
                ...StackHeaderOptions,
                ...screenOptions
            }}>
            {ProfileScreen ? (
                <Stack.Screen
                    options={{headerShown}}
                    name="Profile"
                    component={ProfileScreen}
                />
            ) : (
                <Stack.Screen
                    name="Profile"
                    component={Profile as React.ComponentType<any>}
                    options={{headerShown: false}}
                />
            )}
        </Stack.Navigator>
    );
};
