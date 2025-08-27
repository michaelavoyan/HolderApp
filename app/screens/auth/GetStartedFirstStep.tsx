import {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import md5 from 'blueimp-md5';
import {v4 as uuidv4} from 'uuid';
import {User, UserToUpdate} from 'app/store/types/auth';
import {userSelector} from 'app/store/selectors';
import {addUser, updateUser} from 'app/store/actions';
import {AuthStackParamList, PopupScreens} from 'app/navigation/StackParamsList';
import {ProfileName} from 'app/components/GetStarted/ProfileName';

import {validateProfile} from 'app/utilities/validation/validate-utils';
import {
    STORE_REVIEW_PROFILE_NAME_HASH,
    mockedCredentials,
    mockedUser
} from 'app/constants/mockedProdUser';
import {setUsersCredentials} from 'app/storage/credential';
import {ConnectionContext} from 'app/components/common/ConnectionWatcher';
import {StatusMessages} from '../popups/type';
import {closePopup, openLoadingPopup, openStatusPopup} from '../../utilities/popups';

type Props = StackScreenProps<AuthStackParamList, 'GetStartedFirstStep'>;

export const GetStartedFirstStep: React.FC<Props> = ({navigation}) => {
    const {isConnected} = useContext(ConnectionContext);
    const profileValuesChanged = useRef(false);
    const [isOnConfirmPressed, setIsOnConfirmPressed] = useState<boolean>(false);
    const [profileName, setProfileName] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');
    const [isFormValid, setFormValid] = useState<boolean>(false);
    const [isUserCreationInProgress, setUserCreationInProgress] = useState<
        boolean
    >(false);
    const [error, setError] = useState('');
    const newUser: User = useSelector(userSelector);
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const saveUser = useCallback(
        (user: UserToUpdate) =>
            dispatch(
                updateUser({
                    user,
                    getStartedFlow: true
                })
            ),
        [dispatch]
    );

    const onChangeName = (val: string): void => {
        profileValuesChanged.current =
            profileValuesChanged.current || profileName !== val;
        setProfileName(val);
    };

    const onChangeUrl = (val: string): void => {
        profileValuesChanged.current =
            profileValuesChanged.current || imageUrl !== val;
        setImageUrl(val);
    };

    const onConfirm = async () => {
        setIsOnConfirmPressed(true);

        const profileError = validateProfile(profileName);

        setError(profileError);

        if (profileError) {
            return;
        }

        if (md5(profileName) === STORE_REVIEW_PROFILE_NAME_HASH) {
            dispatch(
                addUser({
                    user: mockedUser,
                    withSelectPersona: true,
                    getStartedFlow: false
                })
            );
            await setUsersCredentials(mockedCredentials);

            return;
        }

        setUserCreationInProgress(true);

        if (!isConnected) {
            openLoadingPopup({params: {title: t('Loading...')}});
        }
    };

    useEffect(() => {
        if (isConnected && isOnConfirmPressed && isUserCreationInProgress) {
            setIsOnConfirmPressed(false);
            saveUser({
                id: uuidv4(),
                name: profileName,
                image: imageUrl
            });
            closePopup(PopupScreens.LOADING_POPUP);
        }
    }, [imageUrl, isConnected, isOnConfirmPressed, isUserCreationInProgress, profileName, saveUser]);

    const onCreateMessageApprove = useCallback(
        (timeout?: ReturnType<typeof setTimeout>) => {
            if (timeout) {
                clearTimeout(timeout);
            }
            navigation.navigate('GetStartedPhoneVerification');
        },
        [navigation]
    );

    useEffect(() => {
        setFormValid(!!profileName?.length);
    }, [profileName]);

    useEffect(() => {
        if (isUserCreationInProgress && newUser.name === profileName) {
            if (profileValuesChanged.current) {
                setUserCreationInProgress(false);
                profileValuesChanged.current = false;

                const timeout: ReturnType<typeof setTimeout> = setTimeout(
                    () => {
                        closePopup();
                        onCreateMessageApprove();
                    },
                    2000
                );

                openStatusPopup({
                    params: {
                        title: t('Profile created'),
                        text: ' ',
                        fullScreenMode: true,
                        withoutButtons: true,
                        statusType: StatusMessages.Done,
                        onPress: () => onCreateMessageApprove(timeout),
                        onUnmount: () => clearTimeout(timeout)
                    }
                });
            } else {
                onCreateMessageApprove();
            }
        }
    }, [
        newUser,
        profileName,
        isUserCreationInProgress,
        dispatch,
        onCreateMessageApprove,
        t
    ]);

    const onInputFocus = useCallback(() => {
        setError('');
    }, []);

    return (
        <SafeAreaView style={[styles.container]}>
            <ProfileName
                onChangeName={onChangeName}
                isFormValid={isFormValid}
                onConfirm={onConfirm}
                onCancel={() => navigation.goBack()}
                onAddPress={onChangeUrl}
                uri={imageUrl}
                error={error}
                onFocus={onInputFocus}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
