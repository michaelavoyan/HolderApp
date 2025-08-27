import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import {GetStartedPhoneVerification} from 'app/screens/auth/GetStartedPhoneVerification';
import {GetStartedEmailVerification} from 'app/screens/auth/GetStartedEmailVerification';
import {TermsAndConditionsScreen} from 'app/screens/auth/TermsAndConditionsScreen';
import {StackHeaderOptions} from '../options';
import {Welcome} from '../../screens/auth/Welcome';
import {SelectPersona} from '../../screens/auth/SelectPersona';
import {GetStartedFirstStep} from '../../screens/auth/GetStartedFirstStep';
import {AuthStackParamList} from '../StackParamsList';

const Stack = createStackNavigator<AuthStackParamList>();

export const SelectPersonaStack: React.FC<{
    SelectPersonaScreen?: React.ComponentType<any>;
}> = ({SelectPersonaScreen}) => {
    const {t} = useTranslation();
    return (
        <Stack.Navigator
            screenOptions={{
                ...StackHeaderOptions
            }}>
            {SelectPersonaScreen ? (
                <Stack.Screen
                    options={{headerShown: true}}
                    name="Select a persona"
                    component={SelectPersonaScreen}
                />
            ) : (
                [
                    <Stack.Screen
                        name="Welcome"
                        component={Welcome}
                        options={{headerShown: false}}
                        key="Welcome"
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
            <Stack.Screen
                name="SelectPersona"
                component={SelectPersona}
                options={{
                    ...StackHeaderOptions,
                    title: t('Select a persona'),
                    headerShown: true
                }}
            />
            <Stack.Screen
                name="GetStartedFirstStep"
                component={GetStartedFirstStep}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="GetStartedPhoneVerification"
                component={GetStartedPhoneVerification}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="GetStartedEmailVerification"
                component={GetStartedEmailVerification}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
};
