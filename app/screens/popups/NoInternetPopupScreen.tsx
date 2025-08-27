import React from 'react';
import {useNavigation} from '@react-navigation/core';
import {RootStackParamList} from 'app/navigation/StackParamsList';
import {StackNavigationProp} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import {StatusPopupScreen} from './StatusPopupScreen';
import {StatusMessages} from './type';

export const NoInternetPopupScreen = () => {
    const navigation: StackNavigationProp<
        RootStackParamList,
        'StatusPopup',
        undefined
    > = useNavigation();
    const {t} = useTranslation();

    return (
        <StatusPopupScreen
            navigation={navigation}
            route={{
                key: 'StatusPopup',
                name: 'StatusPopup',
                params: {
                    title: t('No internet connection'),
                    text: t('Close the app and \ntry again later'),
                    statusType: StatusMessages.ConnectionBroken
                }
            }}
        />
    );
};
