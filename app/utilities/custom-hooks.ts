import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getOr, map, filter, difference, flatMap, find} from 'lodash/fp';
import notifee, {EventType} from '@notifee/react-native';
import ImagePicker, {Image} from 'react-native-image-crop-picker';

import {
    ActionSheetIOS,
    Alert,
    Keyboard,
    PermissionsAndroid
} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';
import {useFocusEffect} from '@react-navigation/native';
import {jwtDecode} from 'app/jwt/core';
import {getPersons} from 'app/api/auth.service';
import {store} from 'app/store/store';
import {openSettings} from 'react-native-permissions';
import i18n from '../i18n';

import {
    disableSelectPersona,
    getUsersSuccess,
    pushOffers,
} from '../store/actions';
import {disableBiometry} from '../store/actions/auth';
import {addUsers, deleteAllUsers, getUsers} from '../storage/user';
import {
    deleteAllCredentialsForAllUsers,
    getCredentialsForAllUsers,
    setUsersCredentials
} from '../storage/credential';
import {settingsSelector} from '../store/selectors';
import {SettingsContext} from '../components/common/SettingsWrapper';
import {getNotificationIds, setNotificationIds} from '../storage/asyncStorage';
import {isIOS} from './helpers';
import {
    ClaimCredential,
    NotificationType,
    SetIdentityCredentialProps
} from '../store/types/claim';
import {FullUser} from '../store/types/auth';
import {Person, PersonData, PersonsData, PersonVc, PersonProps} from './types';
import {openGenericPopup} from './popups';
import {NotificationsTab} from '../components/Notifications/typings';
import {IConfig} from '../store/types/appConfig';
import {
    configSelector,
    isAppConfigLoadedSelector
} from '../store/selectors/appConfig';
import {restoreDataObject} from '../push/restoreDataObject';
import {OrganizationProfile} from '../store/types/common';
import {
    lookUpForPushesToShow,
    showOfflinePopupForSpecificPushesTypes
} from '../push/initializePush';
import {isSdkInitializedSelector} from '../store/selectors/common';
import {VclReactNativeSdkWrapper} from '../api/vcl-react-native-sdk-wrapper';

const CROP_PICKER_ERROR = i18n.t('User cancelled image selection');
const PICKER_ERRORS = {
    CAMERA: i18n.t('Camera is not authorized'),
    GALLERY: i18n.t('Can not access gallery')
};

export const usePrevious = <T>(value: T): T => {
    const ref = useRef<T | null>(null) as React.MutableRefObject<T | null>;

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current as T;
};

export const useDateFormat = (): string => {
    const settings = useSelector(settingsSelector);
    const defaultFormat = useContext(SettingsContext);
    const dateFormat = settings?.dateFormat ?? 'default';
    if (dateFormat === 'default') {
        return defaultFormat;
    }
    return dateFormat;
};

export const useSetUsers = () => {
    const config: IConfig = useSelector(configSelector);
    const isSdkInitialized: boolean = useSelector(isSdkInitializedSelector);
    const netInfo = useNetInfo();
    const isAppConfigLoaded = useSelector(isAppConfigLoadedSelector);
    const dispatch = useDispatch();
    const createCredentialObject = (
        vc: PersonVc,
        issuerProfile: OrganizationProfile
    ): Omit<SetIdentityCredentialProps, 'userId'> => {
        const decodedJWT = jwtDecode(vc.jwt_vc);
        return {
            credentialSubject: decodedJWT.claimsSet.vc.credentialSubject,
            type: vc.type,
            jwt: vc.jwt_vc,
            output_descriptors: JSON.stringify(vc.output_descriptors),
            issuer: issuerProfile,
            default: true
        };
    };
    useEffect(() => {
        const setUsers = async () => {
            try {
                const personsRequest: PersonsData = await getPersons(config);

                if (personsRequest.data.length) {
                    dispatch(disableSelectPersona(false));
                    const users = await getUsers();
                    const retainedUsers: FullUser[] = filter(
                        'isRetained',
                        users
                    );
                    const defaultIssuerDid = jwtDecode(
                        personsRequest.data[0].vcs[0].jwt_vc
                    ).claimsSet.iss;
                    const verifiedProfile: OrganizationProfile =
                        await VclReactNativeSdkWrapper.getVerifiedProfile({
                            did: defaultIssuerDid
                        });
                    const credentials = await getCredentialsForAllUsers();
                    const retainedCredentials: ClaimCredential[] =
                        retainedUsers.length && credentials.length
                            ? credentials.filter((cred) => {
                                  return find(
                                      ['id', cred.userId],
                                      retainedUsers
                                  );
                              })
                            : [];

                    const persons: Person[] = retainedUsers.length
                        ? ([
                              ...retainedUsers,
                              ...personsRequest.data
                                  .map((item: PersonData) => {
                                      return {
                                          ...item,
                                          id: item.email
                                      };
                                  })
                                  .filter((item: FullUser) => {
                                      return !find(
                                          ['id', item.id],
                                          retainedUsers
                                      );
                                  })
                          ] as PersonProps[])
                        : personsRequest.data.map((item: PersonData) => {
                              return {
                                  ...item,
                                  id: item.email
                              };
                          });

                    const personsIdCredentials: SetIdentityCredentialProps[] =
                        flatMap(
                            (user: Person) =>
                                map((item: PersonVc) => {
                                    return {
                                        ...createCredentialObject(
                                            item,
                                            verifiedProfile
                                        ),
                                        userId: user.id
                                    };
                                }, user.vcs),
                            persons
                        );

                    const allCredentials: (
                        | SetIdentityCredentialProps
                        | ClaimCredential
                    )[] = retainedCredentials.length
                        ? [
                              ...retainedCredentials,
                              ...personsIdCredentials.filter(
                                  (item: SetIdentityCredentialProps) =>
                                      !find(
                                          ['userId', item.userId],
                                          retainedCredentials
                                      )
                              )
                          ]
                        : personsIdCredentials;
                    dispatch(getUsersSuccess(persons));
                    await deleteAllUsers();
                    await deleteAllCredentialsForAllUsers();
                    await addUsers(persons);
                    await setUsersCredentials(allCredentials);
                } else {
                    dispatch(disableSelectPersona(true));
                }
            } catch (error) {
                dispatch(disableSelectPersona(true));
            }
        };
        if (netInfo.isConnected && isAppConfigLoaded && isSdkInitialized) {
            setUsers();
        }
    }, [
        dispatch,
        netInfo.isConnected,
        config,
        isAppConfigLoaded,
        isSdkInitialized
    ]);
};

const IOS_IMAGE_PICKER_OPTIONS_DEFAULT = {
    options: ['Cancel', 'Take Photo', 'Add from gallery'].map((i) => i18n.t(i)),
    cancelButtonIndex: 0
};
const IOS_IMAGE_PICKER_OPTIONS_WITH_DELETE = {
    options: [
        'Cancel',
        'Delete profile photo',
        'Take Photo',
        'Add from gallery'
    ].map((i) => i18n.t(i)),
    destructiveButtonIndex: 1,
    cancelButtonIndex: 0
};

const IMAGE_PICKER_OPENING_OPTIONS = {
    cropping: true,
    width: 300,
    height: 300,
    includeBase64: true,
    compressImageQuality: 0.8
};

export const useImagePicker = (
    onChange?: (val: string) => void,
    userHasPhoto?: boolean
) => {
    const dispatch = useDispatch();
    const [changedUri, changeUri] = useState<string | null>(
        userHasPhoto ? '' : null
    );
    const [androidModal, toggleAndroidModal] = useState<boolean>(false);
    const [isKeyboardShown, setIsKeyboardShown] = useState<boolean>(false);
    const isDeleteAvailable = changedUri !== null;

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setIsKeyboardShown(true);
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setIsKeyboardShown(false);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const alertErrorCb = useCallback((error: Error, isCamera: boolean) => {
        if (error?.message === CROP_PICKER_ERROR) {
            return;
        }
        openGenericPopup({
            params: {
                title: i18n.t('Warning'),
                description: isCamera
                    ? PICKER_ERRORS.CAMERA
                    : PICKER_ERRORS.GALLERY,
                buttons: [
                    {
                        closePopupOnPress: true,
                        title: i18n.t('OK')
                    }
                ]
            }
        });
    }, []);

    const photoHandler = useCallback(
        ({data, mime}: Image) => {
            const base64image = `data:${mime};base64,${data}`;

            if (data) {
                if (onChange) {
                    onChange(base64image);
                }
                changeUri(base64image);
                toggleAndroidModal(false);
            }
        },
        [changeUri, onChange]
    );

    const requestCameraPermission = useCallback(async () => {
        if (!isIOS) {
            dispatch(disableBiometry(true));
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: i18n.t(
                            'Velocity would like to access your Camera'
                        ),
                        message: i18n.t(
                            'for creating your profile and claiming Id credentials'
                        ),
                        buttonPositive: i18n.t('OK')
                    }
                );
                // If CAMERA Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        }
        return true;
    }, [dispatch]);

    const requestGalleryPermission = useCallback(async () => {
        if (!isIOS) {
            try {
                dispatch(disableBiometry(true));
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
                );

                if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
                    Alert.alert(
                        i18n.t('Velocity would like to access your Gallery'),
                        i18n.t(
                            'for creating your profile and claiming Id credentials'
                        ),
                        [
                            {text: i18n.t('Cancel'), style: 'cancel'},
                            {
                                text: i18n.t('Open Settings'),
                                onPress: openSettings
                            }
                        ]
                    );

                    return true;
                }

                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            } finally {
                dispatch(disableBiometry(false));
            }
        }

        return true;
    }, [dispatch]);

    const onCameraTap = useCallback(async () => {
        const isCameraPermitted = await requestCameraPermission();
        if (isCameraPermitted) {
            ImagePicker.openCamera(IMAGE_PICKER_OPENING_OPTIONS)
                .then(photoHandler)
                .catch((error) => alertErrorCb(error, true))
                .finally(() => dispatch(disableBiometry(false)));
        }
    }, [requestCameraPermission, photoHandler, alertErrorCb, dispatch]);

    const onRemovePhoto = useCallback(() => {
        if (onChange) {
            changeUri(null);
            onChange('');
        }
        toggleAndroidModal(false);
    }, [onChange]);

    const onImageTap = useCallback(async () => {
        try {
            const isGalleryPermitted = await requestGalleryPermission();

            if (isGalleryPermitted) {
                const response = await ImagePicker.openPicker(
                    IMAGE_PICKER_OPENING_OPTIONS
                );
                photoHandler(response);
            }
        } catch (error) {
            alertErrorCb(error as Error, false);
        }
    }, [alertErrorCb, photoHandler, requestGalleryPermission]);

    const options: Record<number, () => void> = useMemo(() => {
        const onClose = () => (isIOS ? null : toggleAndroidModal(false));
        return isDeleteAvailable
            ? {
                  0: onClose,
                  1: onRemovePhoto,
                  2: onCameraTap,
                  3: onImageTap
              }
            : {
                  0: onClose,
                  1: onCameraTap,
                  2: onImageTap,
                  3: () => {}
              };
    }, [onCameraTap, onImageTap, onRemovePhoto, isDeleteAvailable]);

    const showPicker = () => {
        const action = () => {
            return isIOS
                ? ActionSheetIOS.showActionSheetWithOptions(
                      isDeleteAvailable
                          ? IOS_IMAGE_PICKER_OPTIONS_WITH_DELETE
                          : IOS_IMAGE_PICKER_OPTIONS_DEFAULT,
                      (buttonIndex) => options[buttonIndex]?.()
                  )
                : toggleAndroidModal(true);
        };
        if (isKeyboardShown) {
            // hide keyboard before image modal appears
            Keyboard.dismiss();
            const timeout = setTimeout(() => {
                clearTimeout(timeout);
                action();
            }, 500);
        } else {
            action();
        }
    };

    const onCloseAndroidModal = () => toggleAndroidModal(false);

    return {
        showPicker,
        onCloseAndroidModal,
        options,
        androidModal,
        isDeleteAvailable,
        changedUri
    };
};

export const useOnForegroundNotifee = (
    goTo: (type: NotificationType, data?: Record<string, string>) => void
) => {
    const dispatch = useDispatch();
    const isSdkInitialized = useSelector(isSdkInitializedSelector);

    useEffect(() => {
        const subscribe = notifee.onForegroundEvent(async ({type, detail}) => {
            const preparedMessage = restoreDataObject(detail.notification);

            if (type === EventType.PRESS) {
                const isOfflinePopupVisible =
                    await showOfflinePopupForSpecificPushesTypes(
                        preparedMessage
                    );

                if (isOfflinePopupVisible) {
                    return;
                }

                const notificationType = getOr(
                    NotificationType.newOffer,
                    'data.notificationType',
                    preparedMessage
                );

                if (
                    notificationType !== NotificationType.presentationVerified
                ) {
                    dispatch(pushOffers(preparedMessage.data));
                    goTo(notificationType, preparedMessage?.data);
                } else {
                    await lookUpForPushesToShow(preparedMessage, store, false);
                    goTo(notificationType, preparedMessage?.data);
                }
            }
        });

        return () => subscribe();
    }, [goTo, dispatch, isSdkInitialized]);
};

export const useRemoveNotifications = (activeTab: NotificationsTab) => {
    const removeNotifications = useCallback(
        async (notificationTypes: NotificationType[]) => {
            const ids = await getNotificationIds();

            const filtered = ids.filter((id) =>
                notificationTypes.find((type) => {
                    return id.startsWith(type);
                })
            );

            await Promise.all(
                map((id) => notifee.cancelNotification(id), filtered)
            );
            await setNotificationIds(difference(ids, filtered), true);
        },
        []
    );

    useFocusEffect(
        useCallback(() => {
            let notificationTypes = [NotificationType.newOffer];

            if (activeTab === NotificationsTab.Revocations) {
                notificationTypes = [NotificationType.revoked];
            }

            if (activeTab === NotificationsTab.Disclosures) {
                return;
            }

            removeNotifications(notificationTypes);
        }, [activeTab, removeNotifications])
    );
};
