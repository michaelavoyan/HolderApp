import React, {ReactNode, useCallback, useMemo, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
    Platform,
    StyleSheet,
    View,
    Text,
    ScrollView,
    Linking
} from 'react-native';

import {Picker} from '@react-native-picker/picker';
import {VCLEnvironment} from '@velocitycareerlabs/vcl-react-native';
import {useSelector} from 'react-redux';
import {useNetInfo} from '@react-native-community/netinfo';

import {useTheme} from 'react-native-elements';
import {supportLinkSelector} from 'app/store/selectors/appConfig';
import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import {SettingsStackParamList} from 'app/navigation/StackParamsList';
import {useSdkDebug} from 'app/utilities/hooks/useSdkDebug';
import {
    nonIdentityCredentialsCountSelector,
    disclosuresCountSelector,
    revokedCredentialsCountSelector
} from 'app/store/selectors';
import {VCL_ENVIRONMENT, localConfigs} from 'app/configs';
import {SVG} from '../../assets/icons';

import {fontFamily, isIOS} from '../../utilities/helpers';
import {NextButton} from '../common/NextButton';
import {DateButton} from './components/DateButton';
import {IOSDoneButton} from './components/IOSDoneButton';
import {GenericSwitch} from '../common/GenericSwitch';
import {Exit} from './components/Exit';
import packageJson from '../../../package.json';

const Row: React.FC<{
    iconName?: string;
    iconColor?: string;
    iconSize?: number;
    children?: ReactNode;
}> = ({children, iconColor, iconName, iconSize}) => {
    const {
        theme: {
            colors: {secondary}
        }
    } = useTheme();

    return (
        <View style={styles.row}>
            {iconName && (
                <View style={styles.iconWrapper}>
                    {SVG(iconColor || secondary, iconSize)[iconName]}
                </View>
            )}
            {children}
        </View>
    );
};

const SwitchWrapper: React.FC<{
    title: string;
    value: boolean;
    onValueChange?: ((value: boolean) => Promise<void> | void) | null;
    disabled?: boolean;
}> = ({title, value, onValueChange, disabled = false}) => {
    const {
        theme: {
            colors: {inputBorder, disabledText}
        }
    } = useTheme();

    return (
        <View style={[styles.switchWarpper, {borderColor: inputBorder}]}>
            <Text
                style={{
                    ...styles.listText,
                    ...(disabled ? {color: disabledText} : {}),
                    ...styles.switchText
                }}>
                {title}
            </Text>
            <View style={styles.switchContainer}>
                <GenericSwitch
                    value={value}
                    onValueChange={onValueChange}
                    disabled={disabled}
                />
            </View>
        </View>
    );
};

export enum SettingsScreenActions {
    EditProfile = 'editProfile',
    Password = 'password',
    Backup = 'backup',
    ManageLinkedIn = 'linkedIn',
    Notifications = 'notifications',
    Delete = 'delete',
    Reset = 'reset',
    NewContent = 'new-content'
}

type CredentialDetailsProps = StackNavigationProp<
    SettingsStackParamList,
    'TermsAndConditions'
>;

export const SettingsScreen: React.FC<{
    formats: {[key: string]: string};
    onFormatSave: (format: string) => void;
    selectedFormat: string;
    onSelect: (type: SettingsScreenActions) => void;
    checkedValues: {[fieldName: string]: boolean};
    onCheckSwitcher: (fieldName: string, value: boolean) => void;
    onExit: () => void;
    did?: string;
}> = ({
    formats,
    onFormatSave,
    selectedFormat,
    onSelect,
    checkedValues = {},
    onCheckSwitcher,
    onExit,
    did
}) => {
    const [isIOSPickerVisible, setIOSPickerVisible] = useState(false);
    const [activeFormat, selectFormat] = useState<string>('default');
    const [aboutSectionVisible, setAboutSectionVisible] = useState(false);
    const pickerRef = useRef<Picker<any>>(null);
    const {isConnected} = useNetInfo();
    const datePickerFormats = useMemo(() => Object.entries(formats), [formats]);

    const disclosuresCount: number = useSelector(disclosuresCountSelector());
    const nonIdentityCredentialsCount: number = useSelector(
        nonIdentityCredentialsCountSelector
    );
    const revokedCredentialsCount: number = useSelector(
        revokedCredentialsCountSelector()
    );

    const {isDebugOn, setIsDebugOn} = useSdkDebug();

    const disabledDelete =
        disclosuresCount === 0 && nonIdentityCredentialsCount === 0;
    const disabledRevokedDelete = revokedCredentialsCount === 0;

    const {t} = useTranslation();
    const navigation = useNavigation<CredentialDetailsProps>();

    const {
        theme: {
            colors: {
                secondaryBg,
                inputBorder,
                pickerBackground,
                disabledText,
                primary,
                secondary
            }
        }
    } = useTheme();

    const showPicker = useCallback(
        () => (isIOS ? setIOSPickerVisible(true) : pickerRef.current?.focus()),
        []
    );

    const onFormatSaveCallback = useCallback(() => {
        if (onFormatSave) {
            onFormatSave(
                activeFormat === 'default'
                    ? datePickerFormats[0][0]
                    : activeFormat
            );
        }
        setIOSPickerVisible(false);
    }, [onFormatSave, activeFormat, datePickerFormats]);

    const supportLink = useSelector(supportLinkSelector);

    return (
        <>
            <ScrollView contentContainerStyle={styles.container}>
                <View
                    style={[
                        styles.rows,
                        {backgroundColor: secondaryBg, borderColor: inputBorder}
                    ]}>
                    <Row iconName="about">
                        <NextButton
                            containerStyle={styles.nextButton}
                            chevronStyle={
                                aboutSectionVisible
                                    ? styles.aboutChevronOpen
                                    : styles.aboutChevron
                            }
                            textStyle={styles.listText}
                            onPress={() => {
                                setAboutSectionVisible(
                                    (prevState) => !prevState
                                );
                            }}
                            title={t('About')}
                            border="bottom">
                            {aboutSectionVisible && (
                                <View style={styles.aboutContent}>
                                    <Text
                                        style={[
                                            styles.infoText,
                                            styles.powered
                                        ]}>
                                        {t('Powered by Velocity Career Labs')}
                                    </Text>
                                    <Text style={styles.infoText}>
                                        {t('Version {{version}}', {
                                            version: `${packageJson.version} (${localConfigs.vclEnvironmentDisplayName})`
                                        })}
                                    </Text>
                                    <Text style={styles.didTitle}>DID</Text>
                                    <Text
                                        style={[
                                            styles.didText,
                                            {color: secondary}
                                        ]}>
                                        {did}
                                    </Text>
                                    <Text
                                        style={{
                                            color: primary,
                                            ...styles.link
                                        }}
                                        onPress={() =>
                                            navigation.navigate(
                                                'TermsAndConditions'
                                            )
                                        }>
                                        {t('Terms and Conditions')}
                                    </Text>
                                    <Text
                                        style={{
                                            color: primary,
                                            ...styles.link
                                        }}
                                        onPress={() =>
                                            Linking.openURL(supportLink)
                                        }>
                                        {t('Wallet Support Center')}
                                    </Text>
                                </View>
                            )}
                        </NextButton>
                    </Row>
                    <Row iconName="profile">
                        <NextButton
                            containerStyle={styles.nextButton}
                            textStyle={styles.listText}
                            onPress={() =>
                                onSelect(SettingsScreenActions.EditProfile)
                            }
                            title={t('Edit profile')}
                            border="bottom"
                        />
                    </Row>
                    <Row iconName="new-content">
                        <NextButton
                            containerStyle={styles.nextButton}
                            textStyle={styles.listText}
                            onPress={() =>
                                onSelect(SettingsScreenActions.NewContent)
                            }
                            title={t("What's new")}
                            border="bottom"
                        />
                    </Row>
                    <Row
                        iconName="password"
                        iconSize={33}
                        iconColor={disabledText}>
                        <NextButton
                            containerStyle={styles.nextButton}
                            textStyle={{
                                ...styles.listText,
                                color: disabledText
                            }}
                            onPress={() =>
                                onSelect(SettingsScreenActions.Password)
                            }
                            disabled
                            title={t('Password')}
                            border="bottom"
                        />
                    </Row>
                    <Row iconName="calendar" iconSize={21}>
                        <DateButton
                            onPress={showPicker}
                            value={selectedFormat}
                        />

                        {!isIOS ? (
                            <Picker
                                ref={pickerRef}
                                mode="dropdown"
                                selectedValue={selectedFormat}
                                onValueChange={onFormatSave}>
                                {datePickerFormats.map(([key, value]) => (
                                    <Picker.Item
                                        key={key}
                                        label={value}
                                        value={key}
                                    />
                                ))}
                            </Picker>
                        ) : null}
                    </Row>
                    <Row
                        iconName="cloud"
                        iconSize={30}
                        iconColor={disabledText}>
                        <NextButton
                            disabled
                            containerStyle={styles.nextButton}
                            textStyle={{
                                ...styles.listText,
                                color: disabledText
                            }}
                            onPress={() =>
                                onSelect(SettingsScreenActions.Backup)
                            }
                            title={t('Cloud backup')}
                            border="bottom"
                        />
                    </Row>
                    <Row
                        iconName="theme"
                        iconSize={20}
                        iconColor={disabledText}>
                        <SwitchWrapper
                            onValueChange={(value) =>
                                onCheckSwitcher('darkMode', value)
                            }
                            value={checkedValues.darkMode}
                            title={t('Dark mode')}
                            disabled
                        />
                    </Row>
                    <Row
                        iconName="linkedin"
                        iconSize={44}
                        iconColor={isConnected ? undefined : disabledText}>
                        <NextButton
                            containerStyle={styles.nextButton}
                            textStyle={[
                                styles.listText,
                                isConnected ? {} : {color: disabledText}
                            ]}
                            onPress={() =>
                                onSelect(SettingsScreenActions.ManageLinkedIn)
                            }
                            title={t('Manage LinkedIn settings')}
                            border="bottom"
                            disabled={!isConnected}
                        />
                    </Row>
                    <Row iconName="push-notification" iconSize={21}>
                        <NextButton
                            containerStyle={styles.nextButton}
                            textStyle={styles.listText}
                            onPress={() =>
                                onSelect(SettingsScreenActions.Notifications)
                            }
                            title={t('Allow push notifications')}
                            border="bottom"
                        />
                    </Row>
                    <Row iconName="upgrade" iconSize={20}>
                        <SwitchWrapper
                            onValueChange={(value) =>
                                onCheckSwitcher('allowUpgrade', value)
                            }
                            value={checkedValues.allowUpgrade}
                            title={t('Allow credential upgrades')}
                            disabled
                        />
                    </Row>
                    <Row
                        iconName="delete"
                        iconSize={21}
                        iconColor={
                            disabledRevokedDelete ? disabledText : undefined
                        }>
                        <NextButton
                            containerStyle={styles.nextButton}
                            textStyle={[
                                styles.listText,
                                disabledRevokedDelete && {color: disabledText}
                            ]}
                            onPress={() =>
                                onSelect(SettingsScreenActions.Delete)
                            }
                            title={t('Delete revoked credentials')}
                            border="bottom"
                            disabled={disabledRevokedDelete}
                        />
                    </Row>
                    <Row
                        iconName="reset-data"
                        iconSize={21}
                        iconColor={disabledDelete ? disabledText : undefined}>
                        <NextButton
                            containerStyle={[
                                styles.nextButton,
                                styles.borderNone
                            ]}
                            textStyle={[
                                styles.listText,
                                disabledDelete && {color: disabledText}
                            ]}
                            onPress={() =>
                                onSelect(SettingsScreenActions.Reset)
                            }
                            title={t('Delete all credentials')}
                            disabled={disabledDelete}
                        />
                    </Row>
                    <Row iconName="debug">
                        <SwitchWrapper
                            value={isDebugOn}
                            onValueChange={(value: boolean) =>
                                setIsDebugOn(value)
                            }
                            title={t('Debug mode')}
                        />
                    </Row>
                </View>
                {VCL_ENVIRONMENT !== VCLEnvironment.Prod && (
                    <Exit onPress={onExit} />
                )}
            </ScrollView>
            {isIOS && isIOSPickerVisible ? (
                <View style={[styles.iosPickerContainer]}>
                    <IOSDoneButton onPress={onFormatSaveCallback} />
                    <Picker
                        testID="picker-date-format-select"
                        style={{backgroundColor: pickerBackground}}
                        ref={pickerRef}
                        selectedValue={activeFormat}
                        onValueChange={(itemValue) => selectFormat(itemValue)}>
                        {datePickerFormats.map(([key, value]) => (
                            <Picker.Item key={key} label={value} value={key} />
                        ))}
                    </Picker>
                </View>
            ) : null}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10
    },
    rows: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        paddingLeft: 16,
        marginBottom: 16
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconWrapper: {
        width: 44,
        height: 44,
        marginRight: 16,
        marginTop: 6,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start'
    },
    listText: {
        ...fontFamily({size: 15})
    },
    switchText: {
        flexShrink: 5
    },
    switchContainer: {
        marginLeft: 10
    },
    nextButton: {
        paddingVertical: 17,
        ...Platform.select({
            ios: {
                paddingRight: 24
            },
            android: {
                paddingRight: 16
            }
        })
    },
    aboutContent: {paddingTop: 14},
    aboutChevron: {
        transform: [{rotate: '90deg'}]
    },
    aboutChevronOpen: {
        transform: [{rotate: '-90deg'}]
    },
    iosPickerContainer: {
        position: 'absolute',
        width: '100%',
        bottom: 0
    },
    switchWarpper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        ...Platform.select({
            ios: {
                paddingRight: 24,
                paddingVertical: 11
            },
            android: {
                paddingRight: 16,
                paddingVertical: 13
            }
        })
    },
    borderNone: {
        borderBottomWidth: 0
    },
    flex: {
        flex: 1
    },
    info: {
        paddingLeft: 30,
        marginLeft: -16,
        paddingVertical: 8,
        borderTopWidth: 1
    },
    link: {paddingTop: 14, textDecorationLine: 'underline'},
    infoText: {
        ...fontFamily({size: 13})
    },
    didTitle: {...fontFamily({size: 13}), marginTop: 10, marginBottom: -2},
    didText: {
        ...fontFamily({size: 11}),
        marginBottom: 10
    },
    powered: {
        marginBottom: 4
    }
});
