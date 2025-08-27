import React, {useCallback, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {StyleSheet, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useTheme} from 'react-native-elements';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {isIOS} from 'app/utilities/helpers';
import {ScrollViewWrapper} from 'app/components/common/ScrollViewWrapper';
import {Users} from 'app/store/types/auth';
import {setUserId} from 'app/store/actions';
import {usersSelector} from 'app/store/selectors/auth';
import {UserList} from 'app/components/SelectPersona/UserList';
import {closePopup, openLoadingPopup} from 'app/utilities/popups';
import {PopupScreens} from 'app/navigation/StackParamsList';
import {t} from 'i18next';

export const SelectUserScreen: React.FC<{
    mockedUsersList?: Users;
}> = ({mockedUsersList}) => {
    const {theme} = useTheme();
    const insets = useSafeAreaInsets();
    const users: Users = useSelector(usersSelector);
    // Note: for mocked list usage in storybook
    const [usersList, setUsersList] = useState<Users>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        setUsersList(mockedUsersList || users);
    }, [users, mockedUsersList]);

    const setUserIdCb = useCallback(
        (id: string) => dispatch(setUserId(id, false)),
        [dispatch]
    );

    const goToProfile = async (id: string) => {
        await AsyncStorage.setItem('isFirstLogin', '1');
        setUserIdCb(id);
    };

    useEffect(() => {
        openLoadingPopup({params: {title: t('Loading...')}});
        if (usersList.length > 0) {
            closePopup(PopupScreens.LOADING_POPUP);
        }
    }, [usersList]);

    return (
        <View
            style={[
                styles.container,
                {backgroundColor: theme.colors.secondaryBg}
            ]}>
            <ScrollViewWrapper
                contentContainerStyle={[
                    styles.scrollContent,
                    !isIOS && {paddingBottom: Math.max(insets.bottom + 20, 40)}
                ]}>
                <UserList goToProfile={goToProfile} users={usersList} />
            </ScrollViewWrapper>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: isIOS ? 20 : 10
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 20
    }
});
