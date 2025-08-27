import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {StackScreenProps} from '@react-navigation/stack';
import {get} from 'lodash/fp';
import {openSettings} from 'react-native-permissions';
import notifee from '@notifee/react-native';

import {formatDateByRegion} from 'app/utilities/helpers';
import {settingsSelector} from 'app/store/selectors';
import {
    deleteRevokedCredentials,
    logout,
    logoutWithBackup,
    resetData,
    setSettings
} from 'app/store/actions';
import {setPhoneVerificationPopupClosed} from 'app/store/actions/profile';
import {SettingsProps} from 'app/store/types/profile';
import {didJwkSelector} from 'app/store/selectors/auth';
import {SettingsScreen, SettingsScreenActions} from '../../components/Settings';
import {SettingsStackParamList} from '../../navigation/StackParamsList';
import {useUserInfo} from '../../utilities/hooks/useUserInfo';
import {AlertDialog} from '../../components/common/AlertDialog';

type Props = StackScreenProps<SettingsStackParamList, 'Settings'>;

const clearBadgeCounter = async () => {
    await notifee.setBadgeCount(0);
    await notifee.cancelAllNotifications();
};

export const Settings: React.FC<Props> = ({navigation}) => {
    const [checkedValues, setCheckedValues] = useState<{
        [field: string]: boolean;
    }>({darkMode: false});
    const settings = useSelector(settingsSelector);
    const did = useSelector(didJwkSelector);
    const dispatch = useDispatch();
    const user = useUserInfo();
    const [resetAlertVisible, setResetAlertVisible] = useState(false);
    const [logoutAlertVisible, setLogoutAlertVisible] = useState(false);
    const [revokeAlertVisible, setRevokeAlertVisible] = useState(false);
    const {t} = useTranslation();
    const MESSAGES = {
        reset: {
            title: t('Are you sure you wish to delete all credentials?'),
            subTitle: t('Identity credentials will not be deleted.')
        },
        logout: {
            title: t('Are you sure you wish to logout?'),
            subTitle: t('All data will be cleared after logout.')
        },
        deleteRevoked: {
            title: t(
                'Are you sure you wish to delete all revoked credentials?'
            ),
            subTitle: ''
        }
    };

    const DATE_FORMATS = {
        'en-US': `${formatDateByRegion(new Date(), 'en-US')} (${t('US')})`,
        'en-GB': `${formatDateByRegion(new Date(), 'en-GB')} (${t('Europe')})`
    };

    useEffect(
        () =>
            setCheckedValues({
                darkMode: !!settings.darkMode,
                allowUpgrade: !!settings.allowUpgrade
            }),
        [settings.allowUpgrade, settings.darkMode]
    );

    const updateSettings = useCallback(
        (newSettings: Partial<SettingsProps>) =>
            dispatch(setSettings(newSettings)),
        [dispatch]
    );

    const setCheckedValueCallback = useCallback(
        (fieldName: string, value: boolean) => {
            updateSettings({
                ...settings,
                [fieldName]: value
            });
        },
        [settings, updateSettings]
    );

    const logoutCb = useCallback(() => {
        dispatch(setPhoneVerificationPopupClosed(false));
        dispatch(logout(user));
        clearBadgeCounter();
    }, [dispatch, user]);
    const resetCallback = useCallback(() => dispatch(resetData()), [dispatch]);
    const logoutWithBackupCb = useCallback(() => {
        dispatch(setPhoneVerificationPopupClosed(false));
        dispatch(logoutWithBackup(user));
    }, [dispatch, user]);

    const onDeleteRevoked = useCallback(
        () => dispatch(deleteRevokedCredentials()),
        [dispatch]
    );

    const goToSettings = useCallback(async () => {
        try {
            await openSettings();
        } catch (e) {
            console.error(e);
        }
    }, []);

    const dateFormat = get('dateFormat', settings) || 'default';
    const onFormatSaveCallback = useCallback(
        (value: string) => {
            updateSettings({
                ...settings,
                dateFormat: value
            });
        },
        [settings, updateSettings]
    );

    const onSelectCallback = useCallback(
        (type: SettingsScreenActions) => {
            switch (type) {
                case SettingsScreenActions.Backup:
                    break;
                case SettingsScreenActions.Delete:
                    setRevokeAlertVisible(true);
                    break;
                case SettingsScreenActions.EditProfile:
                    navigation.navigate('EditProfile');
                    break;
                case SettingsScreenActions.ManageLinkedIn:
                    navigation.navigate('LinkedIn');
                    break;
                case SettingsScreenActions.Notifications:
                    goToSettings();
                    break;
                case SettingsScreenActions.Password:
                    break;
                case SettingsScreenActions.Reset:
                    setResetAlertVisible(true);
                    break;
                case SettingsScreenActions.NewContent:
                    navigation.navigate('NewContentSettings', {
                        isOpenedFromSettings: true
                    });
                    break;
                default:
                    break;
            }
        },
        [goToSettings, navigation, setResetAlertVisible, setRevokeAlertVisible]
    );

    return (
        <>
            <SettingsScreen
                onFormatSave={onFormatSaveCallback}
                formats={DATE_FORMATS}
                selectedFormat={dateFormat}
                checkedValues={checkedValues}
                onCheckSwitcher={setCheckedValueCallback}
                onSelect={onSelectCallback}
                onExit={() => setLogoutAlertVisible(true)}
                did={did}
            />
            <AlertDialog
                isVisible={resetAlertVisible}
                title={MESSAGES.reset.title}
                message={MESSAGES.reset.subTitle}
                buttonLabels={['Delete', 'Cancel'].map((i) => t(i))}
                buttonActions={[
                    resetCallback,
                    () => setResetAlertVisible(false)
                ]}
            />
            <AlertDialog
                isVisible={logoutAlertVisible}
                title={MESSAGES.logout.title}
                message={MESSAGES.logout.subTitle}
                buttonLabels={['Clear', 'Retain', 'Cancel'].map((i) => t(i))}
                buttonActions={[
                    logoutCb,
                    logoutWithBackupCb,
                    () => setLogoutAlertVisible(false)
                ]}
            />
            <AlertDialog
                isVisible={revokeAlertVisible}
                title={MESSAGES.deleteRevoked.title}
                message={MESSAGES.deleteRevoked.subTitle}
                buttonLabels={['Confirm', 'Cancel'].map((i) => t(i))}
                buttonActions={[
                    onDeleteRevoked,
                    () => setRevokeAlertVisible(false)
                ]}
            />
        </>
    );
};
