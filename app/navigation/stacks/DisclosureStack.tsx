import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AvatarsBlockContainer} from 'app/components/Navigation/AvatarsBlockContainer';
import {MoreButtonContainer} from 'app/components/Navigation/MoreButtonContainer';
import {StackHeaderOptions} from '../options';
import {PastDisclosures} from '../../screens/disclosures/PastDisclosures';
import {DisclosureStackParamList} from '../StackParamsList';

const Stack = createStackNavigator<DisclosureStackParamList>();

export const DisclosureStack: React.FC<{
    DisclosureScreen?: React.ComponentType<any>;
    screenOptions?: object;
    headerShown?: boolean;
}> = ({DisclosureScreen, screenOptions = {}, headerShown = false}) => {
    return (
        <Stack.Navigator
            screenOptions={{
                ...StackHeaderOptions,
                ...screenOptions
            }}>
            {DisclosureScreen ? (
                <Stack.Screen
                    options={{headerShown}}
                    name="Disclosure"
                    component={DisclosureScreen}
                />
            ) : (
                <Stack.Screen
                    name="PastDisclosures"
                    component={PastDisclosures as React.ComponentType<any>}
                    options={{
                        title: '',
                        headerLeft: () => <AvatarsBlockContainer />,
                        headerRight: () => <MoreButtonContainer />
                    }}
                />
            )}
        </Stack.Navigator>
    );
};
