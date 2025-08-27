import React from 'react';
import {useTranslation} from 'react-i18next';
import {getOr} from 'lodash/fp';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    FlexStyle,
    Platform,
    Pressable
} from 'react-native';
import {Text, useTheme} from 'react-native-elements';
import {useNetInfo} from '@react-native-community/netinfo';
import {fontFamily, isIOS, normalize} from 'app/utilities/helpers';
import {SVG} from 'app/assets/icons';
import {FullUser} from 'app/store/types/auth';
import {navigate} from 'app/navigation/utils';
import {VCLEnvironment} from '@velocitycareerlabs/vcl-react-native';
import {PlusButton} from '../common/PlusButton';
import {AvatarsBlock} from '../common/AvatarsBlock';
import {ShareButton} from '../common/ShareButton';
import {VCL_ENVIRONMENT} from '../../configs';

export const Header: React.FC<{
    user: FullUser;
    goToScanner(): void;
    onCreate(): void;
    onShare(): void;
    containerStyle?: FlexStyle;
}> = ({user, goToScanner, onCreate, onShare, containerStyle = {}}) => {
    const {t} = useTranslation();
    const {theme} = useTheme();
    const profileName = getOr('', 'name', user);

    const {isConnected} = useNetInfo();

    let color = isIOS ? theme.colors.dark : theme.colors.primaryAndroid;

    if (isConnected === false) {
        color = isIOS
            ? theme.colors.disabledText
            : theme.colors.disabledAndroid;
    }

    const isDisabled = isConnected === false;

    return (
        <View
            style={[
                styles.container,
                {backgroundColor: theme.colors.secondaryBg},
                containerStyle
            ]}>
            <View style={styles.iconsBlock}>
                {!!profileName.length && (
                    <View style={styles.avatarBlock}>
                        <AvatarsBlock
                            name={profileName}
                            uri={user.image}
                            disabled={isDisabled}
                        />
                    </View>
                )}
                <View>
                    <ShareButton onPress={onShare} disabled={isDisabled}/>
                </View>
                <View>
                    <PlusButton onPress={onCreate} disabled={isDisabled} customStyle={styles.plusButtonBlock}
                                isVisible={isHeaderPlusBtnVisible(VCL_ENVIRONMENT)}/>
                </View>
            </View>
            <TouchableOpacity
                activeOpacity={0.7}
                disabled={isDisabled}
                style={[styles.buttonBlock, {borderColor: color}]}
                onPress={goToScanner}>
                <View style={styles.scanIcon}>{SVG(color, 19)['qr-code']}</View>
                <Text style={[styles.buttonText, {color}]}>
                    {t('Scan QR code')}
                </Text>
            </TouchableOpacity>
            <View>
                <Pressable
                    onPress={() => {
                        navigate({
                            name: 'SettingsTab',
                            params: {
                                screen: 'NewContentSettings',
                                isOpenedFromSettings: true
                            }
                        });
                    }}
                    style={({pressed}) => [
                        styles.touchableContainer,
                        isIOS ? {opacity: pressed ? 0.5 : 1} : {}
                    ]}
                    android_ripple={{
                        color,
                        borderless: false
                    }}>
                    {SVG(color, 24)['question-fill']}
                    <Text style={[styles.text, {color}]}>
                        {t('Learn how to share your credentials')}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

export const isHeaderPlusBtnVisible = (environment: VCLEnvironment): boolean => {
    return environment === VCLEnvironment.Dev || environment === VCLEnvironment.Qa;
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        paddingBottom: 12,
        margin: 0,
        paddingHorizontal: 16
    },
    iconsBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    avatarBlock: {
        flex: 1
    },
    plusButtonBlock: {
        width: 40,
        marginLeft: 10
    },
    avatar: {
        width: 54,
        height: 54,
        marginRight: 12,
        borderRadius: 27
    },
    buttonBlock: {
        marginTop: 21,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        paddingVertical: normalize(10),
        borderRadius: 12,
        ...Platform.select({
            android: {borderRadius: 4}
        })
    },
    buttonText: {
        letterSpacing: 0.4,
        lineHeight: normalize(26),
        ...fontFamily({size: 16, weight: '600'}),
        ...Platform.select({
            android: {
                textTransform: 'uppercase',
                letterSpacing: 0.2
            }
        })
    },
    scanIcon: {
        marginRight: 12
    },
    text: {
        fontSize: 14,
        marginLeft: 6,
        fontWeight: '600'
    },
    touchableContainer: {
        flexDirection: 'row',
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 12
    }
});
