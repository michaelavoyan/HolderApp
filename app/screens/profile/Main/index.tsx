import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState
} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackScreenProps} from '@react-navigation/stack';
import {useIsFocused} from '@react-navigation/core';
import {StyleSheet, Text} from 'react-native';
import {useTheme} from 'react-native-elements';
import {ConnectionContext} from 'app/components/common/ConnectionWatcher';
import {FullUser} from 'app/store/types/auth';
import {getCredentials, getUser} from 'app/store/actions';
import {
    userSelector,
    credentialCategoriesSelector,
    nonIdentityCredentialsCountSelector,
    userIdSelector
} from 'app/store/selectors';
import {ProfileScreen} from 'app/components/Profile';
import {ModalTypes} from 'app/components/common/typings/types';

import {AddIdentityInfoTypeE} from 'app/components/Profile/typings/types';
import {CredentialStatus} from 'app/store/types/claim';

import {getWasCreateProfilePopupShown} from 'app/storage/asyncStorage';
import {DisclosureCredentialsToIssuerParams} from 'app/store/types/disclosure';
import {issuingSequenceSelector} from 'app/store/selectors/common';
import {useCheckConsentVersion} from 'app/utilities/hooks/useCheckConsentVersion';
import {useDisclosureTutorial} from 'app/utilities/hooks/useDisclosureTutorial';
import {useShareCredentials} from 'app/utilities/hooks/useShareCredentials';
import {RootStackParamList} from 'app/navigation/StackParamsList';
import {
    credentialsByTypeAndStatusSelector,
    nonIdentityCredentialsLoaded
} from 'app/store/selectors/profile';
import {
    CredentialCategories,
    CredentialCategory,
    IssuingSequence
} from 'app/store/types/common';
import {closePopup, openInfoPopup} from 'app/utilities/popups';
import {isIOS, normalize} from 'app/utilities/helpers';
import {GenericButton} from 'app/components/common/GenericButton';
import {TEMP_USER_NAME} from 'app/utilities/qr';
import {useProfileModalOpenClose} from 'app/utilities/hooks/useProfileModalOpenClose';
import {savedOriginalIssuingSessionSelector} from 'app/store/selectors/disclosure';
import {
    NewSessionWorkflows,
    useClaimingMissingCredential
} from 'app/utilities/hooks/useClaimingMissingCredential';
import {isStartAddingCredentialsBtnVisible, VCL_ENVIRONMENT} from 'app/configs';
import {useTemporaryUserMissedCredentialsPopups} from './useTemporaryUserMissedCredentialsPopups';
import {manageMultipleLinks} from '../utils';

type Props = StackScreenProps<RootStackParamList>;

export const Profile: React.FC<Props> = ({navigation}) => {
    const popUpCallCounter = useRef(0);
    const {isConnected} = useContext(ConnectionContext);
    const user: FullUser = useSelector(userSelector);
    const userId: string = useSelector(userIdSelector);
    const isTempUser = /temp_issuing_user_/.test(user.id);
    const credentialsLength: number = useSelector(
        nonIdentityCredentialsCountSelector
    );

    const isCredentialsLoaded = useSelector(nonIdentityCredentialsLoaded);
    const categories: CredentialCategories = useSelector(
        credentialCategoriesSelector
    );

    const savedIssuingSession: null | DisclosureCredentialsToIssuerParams =
        useSelector(savedOriginalIssuingSessionSelector);
    const {startAnotherIssuing} = useClaimingMissingCredential();
    const hasPhoneCredentials = Boolean(
        useSelector(
            credentialsByTypeAndStatusSelector({
                types: [AddIdentityInfoTypeE.Phone],
                statuses: [CredentialStatus.verified, CredentialStatus.deleted]
            })
        ).length
    );

    const issuingSequence: IssuingSequence = useSelector(
        issuingSequenceSelector
    );

    const inFocus = useIsFocused();
    const dispatch = useDispatch();

    const {
        onCloseCategoriesModal,
        onCategorySelect,
        onAdd,
        modal,
        onModalItemSelect
    } = useProfileModalOpenClose();

    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const {showDisclosureTutorial} = useDisclosureTutorial();

    useEffect(() => {
        if (showDisclosureTutorial && inFocus) {
            requestAnimationFrame(() => {
                navigation.navigate('DisclosureTutorialPopup');
            });
        }
    }, [showDisclosureTutorial, navigation, inFocus]);

    useEffect(() => {
        if (issuingSequence?.linksArray?.length) {
            manageMultipleLinks(
                issuingSequence.linksArray,
                issuingSequence.path,
                issuingSequence.isNotFirstStep,
                issuingSequence.skipNextPopup,
                navigation,
                dispatch
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [issuingSequence]);

    const {t} = useTranslation();
    const {isGuideSkipped, setIsGuideSkipped} = useContext(ConnectionContext);
    const hasTemporaryUserName = user.name === TEMP_USER_NAME;
    const {
        theme: {colors}
    } = useTheme();

    useTemporaryUserMissedCredentialsPopups(inFocus);
    useCheckConsentVersion();

    const onShare = useCallback(() => {
        setIsShareModalOpen(true);
    }, []);

    const shareProcessStart = useShareCredentials();

    const handleShare = useCallback(() => {
        if (savedIssuingSession) {
            startAnotherIssuing(
                savedIssuingSession,
                NewSessionWorkflows.share,
                shareProcessStart
            );
            return;
        }
        shareProcessStart();
    }, [savedIssuingSession, startAnotherIssuing, shareProcessStart]);

    const handleLinkedInShare = useCallback(() => {
        navigation.navigate('LinkedInSelectCredentialToShare');
    }, [navigation]);

    const onCredentialsPopupClose = useCallback(() => {
        AsyncStorage.setItem('isFirstLogin', '0');
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        popUpCallCounter.current === 0;
    }, []);

    const onPopupButtonPress = useCallback(() => {
        popUpCallCounter.current = 0;
        if (onCredentialsPopupClose) {
            onCredentialsPopupClose();
            closePopup();
        }

        // for smoothly transition to the next popup
        setTimeout(() => {
            onAdd();
        }, 200);
    }, [onAdd, onCredentialsPopupClose]);

    const handleGuidePopup = useCallback(async () => {
        await AsyncStorage.setItem('isFirstLogin', '1');
        closePopup();
        popUpCallCounter.current = 0;
        setTimeout(() => {
            navigation.getParent()?.getParent()?.navigate('WhatsNewGuide', {
                isOpenedFromSettings: true,
                hideTitle: true
            });
        }, 100);
    }, [navigation]);

    const handleCloseGuidePopup = useCallback(async () => {
        await AsyncStorage.setItem('isFirstLogin', '1');
        setIsGuideSkipped(false);
        popUpCallCounter.current = 0;
    }, [setIsGuideSkipped]);

    useEffect(() => {
        (async () => {
            if (isGuideSkipped) {
                await AsyncStorage.setItem('isFirstLogin', '0');
            }
        })();
    }, [isGuideSkipped]);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;

        AsyncStorage.getItem('isFirstLogin').then((isFirstLogin) =>
            getWasCreateProfilePopupShown().then(
                (wasCreateProfilePopupShown: boolean) => {
                    if (
                        isGuideSkipped &&
                        isFirstLogin === '0' &&
                        hasPhoneCredentials &&
                        (isTempUser ? wasCreateProfilePopupShown : true) &&
                        inFocus
                    ) {
                        timer = setTimeout(() => {
                            if (popUpCallCounter.current === 0) {
                                const INFO_POPUP = {
                                    title: t(
                                        'Check out what’s new in your career wallet'
                                    ),
                                    icon: isIOS
                                        ? 'whats-new'
                                        : 'whats-new-android'
                                };

                                openInfoPopup({
                                    params: {
                                        ...INFO_POPUP,
                                        onClose: handleCloseGuidePopup,
                                        children: (
                                            <GenericButton
                                                containerStyle={
                                                    styles.claimButton
                                                }
                                                width={normalize(
                                                    isIOS ? 230 : 244
                                                )}
                                                type="secondary"
                                                title={t('What’s new?')}
                                                onPress={handleGuidePopup}
                                            />
                                        ),
                                        slideFromBottom: true,
                                        closeOnBackdropPress: true
                                    }
                                });
                                popUpCallCounter.current += 1;
                            }
                        }, 400);
                    }
                }
            )
        );
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [
        handleGuidePopup,
        handleCloseGuidePopup,
        t,
        isGuideSkipped,
        inFocus,
        hasPhoneCredentials,
        isTempUser,
        hasTemporaryUserName,
        colors
    ]);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        const INFO_POPUP = {
            title: t('Claim your credentials and power up your career!'),
            icon: 'claim-credentials'
        };
        AsyncStorage.getItem('isFirstLogin').then((isFirstLogin) => {
            if (
                isCredentialsLoaded &&
                isFirstLogin === '1' &&
                credentialsLength === 0 &&
                hasPhoneCredentials &&
                popUpCallCounter.current === 0 &&
                inFocus
            ) {
                timer = setTimeout(() => {
                    openInfoPopup({
                        params: {
                            ...INFO_POPUP,
                            onClose: onCredentialsPopupClose,
                            children: (
                                isStartAddingCredentialsBtnVisible(VCL_ENVIRONMENT) ? <GenericButton
                                    containerStyle={styles.claimButton}
                                    width={normalize(isIOS ? 230 : 244)}
                                    type="secondary"
                                    title={t('Start adding credentials')}
                                    onPress={onPopupButtonPress}
                                /> : <Text> {t('Start adding credentials - scan a QR code')} </Text>
                            ),
                            slideFromBottom: true,
                            closeOnBackdropPress: true
                        }
                    });
                    popUpCallCounter.current += 1;
                }, 400);
            }
        });

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [
        credentialsLength,
        isCredentialsLoaded,
        onPopupButtonPress,
        onCredentialsPopupClose,
        t,
        inFocus,
        hasPhoneCredentials
    ]);

    useEffect(() => {
        if (!inFocus && modal.type !== ModalTypes.None) {
            onCloseCategoriesModal();
        }
    }, [modal, inFocus, onCredentialsPopupClose, onCloseCategoriesModal]);

    const getUserCb = useCallback(
        (id: string) => dispatch(getUser(id)),
        [dispatch]
    );

    const getSavedCredentialsCb = useCallback(
        () => dispatch(getCredentials()),
        [dispatch]
    );

    useEffect(() => {
        getSavedCredentialsCb();
    }, [getSavedCredentialsCb]);

    useEffect(() => {
        if (isConnected && userId) {
            getUserCb(userId);
        }
    }, [getUserCb, userId, isConnected]);

    const onCategoryOpen = useCallback(
        ({icon: type}: CredentialCategory) => {
            navigation.navigate('Category', {
                type
            });
        },
        [navigation]
    );

    const goToScanner = useCallback(() => {
        navigation.navigate('ScanQR');
    }, [navigation]);

    return (
        <ProfileScreen
            categories={categories}
            categoriesModalClose={onCloseCategoriesModal}
            modal={modal}
            onCategoryOpen={onCategoryOpen}
            onCategorySelect={onCategorySelect}
            onAdd={onAdd}
            onShare={onShare}
            onShareSelect={handleShare}
            onLinkedinShareSelect={handleLinkedInShare}
            isLinkedinShareEnabled={!!credentialsLength}
            onShareModalClose={() => setIsShareModalOpen(false)}
            isShareModalOpen={isShareModalOpen}
            user={user}
            onModalItemSelect={onModalItemSelect}
            goToScanner={goToScanner}
        />
    );
};

const styles = StyleSheet.create({
    claimButton: {
        marginTop: 14,
        marginBottom: 11
    }
});
