import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {
    getWasCreateProfilePopupShown,
    setWasCreateProfilePopupShown
} from 'app/storage/asyncStorage';
import {setPhoneVerificationPopupClosed} from 'app/store/actions/profile';
import {isTempUserFirstIssuingSessionActiveSelector} from '../../../store/selectors/disclosure';
import {userSelector} from '../../../store/selectors';
import {
    areVerifiableCredentialsLoadedSelector,
    credentialsByTypeAndStatusSelector,
    isPhoneVerificationPopupClosedSelector,
    isVfCredentialsIsLoadingSelector,
    nonIdentityCredentialsLoaded
} from '../../../store/selectors/profile';
import {CredentialStatus} from '../../../store/types/claim';
import {AddIdentityInfoTypeE} from '../../../components/Profile/typings/types';
import {TEMP_USER_NAME} from '../../../utilities/qr';
import {GenericButton} from '../../../components/common/GenericButton';
import {closePopup, openInfoPopup} from '../../../utilities/popups';
import {isIOS, normalize} from '../../../utilities/helpers';
import {PopupScreens} from '../../../navigation/StackParamsList';

export const useTemporaryUserMissedCredentialsPopups = (
    isProfileScreenActive: boolean
) => {
    const [isProfilePopupClosed, setIsProfilePopupClosed] = useState(false);
    const [timeoutId, setTimeioutId] = useState<
        ReturnType<typeof setTimeout>
    >();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isProfileScreenActive === false) {
            setIsProfilePopupClosed(false);
        }
    }, [isProfileScreenActive]);

    const isCredentialsLoaded = useSelector(nonIdentityCredentialsLoaded);

    const hasPhoneCredentials = Boolean(
        useSelector(
            credentialsByTypeAndStatusSelector({
                types: [AddIdentityInfoTypeE.Phone],
                statuses: [CredentialStatus.verified, CredentialStatus.deleted]
            })
        ).length
    );

    const isTempUserFirstIssuingSessionActive = useSelector(
        isTempUserFirstIssuingSessionActiveSelector
    );

    const isPhoneVerificationPopupClosed = useSelector(
        isPhoneVerificationPopupClosedSelector
    );

    const areVerifiableCredentialsLoaded = useSelector(
        areVerifiableCredentialsLoadedSelector
    );

    const areVerifiableCredentialsInLoading = useSelector(
        isVfCredentialsIsLoadingSelector
    );

    const user = useSelector(userSelector);

    const isTempUser = /temp_issuing_user_/.test(user.id);

    const navigation = useNavigation();

    const {t} = useTranslation();

    const hasTemporaryUserName = user.name === TEMP_USER_NAME;

    useEffect(() => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        if (
            isCredentialsLoaded &&
            isProfileScreenActive &&
            !isPhoneVerificationPopupClosed &&
            areVerifiableCredentialsLoaded &&
            !areVerifiableCredentialsInLoading &&
            !hasPhoneCredentials &&
            !isTempUserFirstIssuingSessionActive
        ) {
            // Todo: need timeout cause need time to load credentials info
            const timer = setTimeout(() => {
                openInfoPopup({
                    params: {
                        title: t(
                            'Please verify your phone number to use Velocity Career Wallet'
                        ),
                        icon: 'verify-phone',
                        onClose: () =>
                            dispatch(setPhoneVerificationPopupClosed(true)),
                        children: (
                            <GenericButton
                                containerStyle={styles.button}
                                width={normalize(isIOS ? 230 : 244)}
                                type="secondary"
                                title={t('Verify phone number')}
                                onPress={() => {
                                    closePopup(PopupScreens.INFO_POPUP);
                                    navigation.navigate('AddPhone' as never);
                                }}
                            />
                        ),
                        slideFromBottom: true,
                        closeOnBackdropPress: false
                    }
                });
            }, 400);
            setTimeioutId(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        isPhoneVerificationPopupClosed,
        isProfileScreenActive,
        hasPhoneCredentials,
        areVerifiableCredentialsLoaded,
        isTempUser,
        isTempUserFirstIssuingSessionActive,
        navigation,
        t,
        areVerifiableCredentialsInLoading,
        dispatch,
        isCredentialsLoaded
    ]);

    const showCreateprofilePopup = useCallback(async () => {
        const wasCreateProfilePopupShown = await getWasCreateProfilePopupShown();
        if (
            !wasCreateProfilePopupShown &&
            isProfileScreenActive &&
            areVerifiableCredentialsLoaded &&
            isTempUser &&
            hasTemporaryUserName &&
            hasPhoneCredentials &&
            !isTempUserFirstIssuingSessionActive &&
            !isProfilePopupClosed
        ) {
            openInfoPopup({
                params: {
                    title: t('Create your Velocity Career Wallet profile'),
                    icon: 'complete-profile',
                    onClose: () => {
                        setIsProfilePopupClosed(true);
                        closePopup(PopupScreens.INFO_POPUP);
                    },
                    children: (
                        <GenericButton
                            containerStyle={styles.button}
                            width={normalize(isIOS ? 230 : 244)}
                            type="secondary"
                            title={t('Create your profile')}
                            onPress={() => {
                                closePopup(PopupScreens.INFO_POPUP);
                                setWasCreateProfilePopupShown(true);
                                navigation.navigate('EditProfile' as never);
                            }}
                        />
                    ),
                    slideFromBottom: true,
                    closeOnBackdropPress: true
                }
            });
        }
    }, [
        isProfileScreenActive,
        hasPhoneCredentials,
        hasTemporaryUserName,
        areVerifiableCredentialsLoaded,
        isTempUser,
        isTempUserFirstIssuingSessionActive,
        navigation,
        t,
        isProfilePopupClosed
    ]);

    useEffect(() => {
        showCreateprofilePopup();
    }, [showCreateprofilePopup]);
};

const styles = StyleSheet.create({
    button: {
        marginTop: 14,
        marginBottom: 11
    }
});
