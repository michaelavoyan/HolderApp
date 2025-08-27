import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {StackScreenProps} from '@react-navigation/stack';
import {
    ActivityIndicator,
    Linking,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import {useTheme} from 'react-native-elements';

import {useSelector} from 'react-redux';
import {VCLError} from '@velocitycareerlabs/vcl-react-native';
import {DisclosureTermsAndConditions} from 'app/components/common/DisclosureTermsAndConditions';
import {linkedInShareType} from 'app/mixpanel/utils';
import {GenericButton} from 'app/components/common/GenericButton';
import {configSelector} from 'app/store/selectors/appConfig';
import {VCL_ENVIRONMENT} from 'app/configs';
import {ModalBackground} from 'app/components/common/ModalBackground';
import {useDisclosureTutorial} from 'app/utilities/hooks/useDisclosureTutorial';
import {HolderAppError} from 'app/utilities/error-handler/HolderAppError';
import {
    PopupScreens,
    RootStackParamList
} from '../../navigation/StackParamsList';
import {fontFamily, normalize, isIOS} from '../../utilities/helpers';

import {CustomCheckBox} from '../../components/common/CheckBox';
import {TextButton} from '../../components/common/TextButton';
import {
    closePopup,
    openOfflineModeAwareErrorPopup,
    openStatusPopup
} from '../../utilities/popups';
import {StatusMessages} from './type';
import {
    getLinkedInAddToProfileLink,
    publishImagePostOnLinkedIn,
    publishTextPostOnLinkedIn
} from '../settings/LinkedInSettings/utils';
import {getLinkedInAccessToken} from '../../storage/asyncStorage';
import {ERRORS} from '../../api/disclosure';
import {errorHandlerPopup} from '../../utilities/error-handler/errorHandlerPopup';

type Props = StackScreenProps<RootStackParamList, 'ShareToLinkedInPopup'>;

enum ShareOption {
    Profile,
    Feed
}

export const ShareToLinkedInPopupScreen: React.FC<Props> = ({
    route: {
        params: {
            credential,
            onSubmitDisclosure,
            onCancel,
            termsUrl,
            linkedInRules,
            triggerMixpanel,
            onShareMultiple
        }
    }
}) => {
    const {shareInProfile, shareInFeed} = linkedInRules;
    const {styles} = useStyles();
    const config = useSelector(configSelector);
    const [selectedOption, setSelectedOption] = React.useState<ShareOption>(
        shareInProfile ? ShareOption.Profile : ShareOption.Feed
    );
    const {t} = useTranslation();
    const [message, setMessage] = React.useState(
        t(
            'View my verifiable credential from {{issuerName}} on Velocity Network™, the Internet of Careers®.',
            {issuerName: credential.issuerName}
        ) || ''
    );
    const [isSharing, setIsSharing] = React.useState<boolean>(false);
    const [isTermsChecked, setTermsChecked] = React.useState<boolean>(false);
    const {setShowDisclosureTutorial} = useDisclosureTutorial();

    const handleCancel = () => {
        setShowDisclosureTutorial(true);
        closePopup(PopupScreens.SHARE_TO_LINKEDIN_POPUP);
        onCancel();
    };

    const handleSuccessShareToFeed = useCallback(async (url: string) => {
        if (url) {
            await Linking.openURL(url);
        }
    }, []);

    const handleSelectProfile = () => {
        if (isSharing) return;

        setSelectedOption(ShareOption.Profile);
    };
    const handleSelectFeed = () => {
        if (isSharing) return;

        setSelectedOption(ShareOption.Feed);
    };

    const handleShareToLinkedIn = async () => {
        setIsSharing(true);

        try {
            const accessToken = await getLinkedInAccessToken();
            if (!accessToken) {
                throw new Error(t('Access token is missing'));
            }
            let presentationUrl = '';
            let linkCode = '';
            if (onSubmitDisclosure) {
               const {url, hash} = await onSubmitDisclosure();
               presentationUrl = url;
               linkCode = hash;
            }

            if (selectedOption === ShareOption.Feed) {
                closePopup(PopupScreens.SHARE_TO_LINKEDIN_POPUP);

                let postUrl = await publishImagePostOnLinkedIn({
                    accessToken,
                    text: presentationUrl
                        ? `${message}\n${presentationUrl}`
                        : message,
                    imageAltText: credential.issuerName,
                    imageUri: credential.imgUrl,
                    config
                });

                if (!postUrl) {
                    postUrl = await publishTextPostOnLinkedIn({
                        accessToken,
                        text: presentationUrl
                            ? `${message}\n${presentationUrl}`
                            : message,
                        config
                    });
                }

                openStatusPopup({
                    params: {
                        title: t('Done!'),
                        text: t('Your credential has been shared on LinkedIn'),
                        statusType: StatusMessages.Done,
                        onPress: () => handleSuccessShareToFeed(postUrl)
                    }
                });
            } else {
                closePopup(PopupScreens.SHARE_TO_LINKEDIN_POPUP);

                await Linking.openURL(
                    getLinkedInAddToProfileLink({
                        name: credential.name,
                        ...(credential.issuerLinkedInId
                            ? {organizationId: credential.issuerLinkedInId}
                            : {organizationName: credential.issuerName}),
                        issueYear: credential.issueYear,
                        issueMonth: credential.issueMonth,
                        expirationYear: credential.expirationYear,
                        expirationMonth: credential.expirationMonth,
                        certId: credential.certId,
                        certUrl: presentationUrl,
                        config
                    })
                );
            }
            if (triggerMixpanel) {
                triggerMixpanel(linkedInShareType[selectedOption], linkCode);
            }
        } catch (e) {
            closePopup(PopupScreens.SHARE_TO_LINKEDIN_POPUP);

            if (e instanceof HolderAppError || e instanceof VCLError) {
                errorHandlerPopup(
                    e,
                    `Share to linkedin error (${VCL_ENVIRONMENT})\n${JSON.stringify(
                        {
                            ...(e as any),
                            env: VCL_ENVIRONMENT
                        }
                    )}`
                );
            } else {
                openOfflineModeAwareErrorPopup(ERRORS.linkedinShare);
            }
        } finally {
            setIsSharing(false);
            setShowDisclosureTutorial(true);
        }
    };

    const handleShareToLinkedInMultiple = useCallback(() => {
        if (onShareMultiple) {
            setIsSharing(true);
            onShareMultiple();
        }
    }, [onShareMultiple]);

    return (
        <ModalBackground>
            <View style={styles.popup}>
                <ScrollView>
                    <View>
                        <Text style={styles.title}>
                            {t('Share to LinkedIn')}
                        </Text>
                        <Text style={styles.description}>
                            {t(
                                `You are ready to share your ${
                                    onShareMultiple
                                        ? 'credentials'
                                        : 'credential'
                                }:`
                            )}
                        </Text>
                        <View>
                            {shareInProfile && (
                                <Pressable
                                    style={styles.radioItem}
                                    onPress={handleSelectProfile}>
                                    <CustomCheckBox
                                        checked={
                                            selectedOption ===
                                            ShareOption.Profile
                                        }
                                        toggleCheckbox={handleSelectProfile}
                                    />
                                    <Text style={styles.radioLabel}>
                                        {t('Add to Profile')}
                                    </Text>
                                </Pressable>
                            )}
                            {shareInFeed && (
                                <Pressable
                                    style={styles.radioItem}
                                    onPress={handleSelectFeed}>
                                    <CustomCheckBox
                                        checked={
                                            selectedOption === ShareOption.Feed
                                        }
                                        toggleCheckbox={handleSelectFeed}
                                    />
                                    <Text style={styles.radioLabel}>
                                        {t('Share to Feed')}
                                    </Text>
                                </Pressable>
                            )}
                        </View>
                        <View style={styles.message}>
                            <Text style={styles.messageLabel}>
                                {t('Optional message')}
                            </Text>
                            <TouchableWithoutFeedback>
                                <TextInput
                                    style={styles.messageInput}
                                    value={message}
                                    onChangeText={setMessage}
                                    multiline
                                />
                            </TouchableWithoutFeedback>
                        </View>
                        {isSharing ? (
                            <ActivityIndicator size="large" />
                        ) : (
                            <>
                                <View style={styles.terms}>
                                    <DisclosureTermsAndConditions
                                        checked={isTermsChecked}
                                        onCheck={() =>
                                            setTermsChecked(!isTermsChecked)
                                        }
                                        link={termsUrl}
                                        text={t(
                                            'I agree to Terms and Conditions'
                                        )}
                                    />
                                </View>
                                <View style={styles.actions}>
                                    {isIOS ? (
                                        <GenericButton
                                            containerStyle={styles.cancelBtn}
                                            title={t('Cancel')}
                                            type="secondary"
                                            onPress={handleCancel}
                                        />
                                    ) : (
                                        <TextButton
                                            containerStyle={styles.cancelBtn}
                                            title={t('Cancel')}
                                            onPress={handleCancel}
                                        />
                                    )}
                                    {isIOS ? (
                                        <GenericButton
                                            containerStyle={styles.shareBtn}
                                            title={t('Share')}
                                            type="primary"
                                            onPress={
                                                onShareMultiple
                                                    ? handleShareToLinkedInMultiple
                                                    : handleShareToLinkedIn
                                            }
                                            disabled={!isTermsChecked}
                                        />
                                    ) : (
                                        <TextButton
                                            containerStyle={styles.shareBtn}
                                            title={t('Share')}
                                            onPress={
                                                onShareMultiple
                                                    ? handleShareToLinkedInMultiple
                                                    : handleShareToLinkedIn
                                            }
                                            disabled={!isTermsChecked}
                                        />
                                    )}
                                </View>
                            </>
                        )}
                    </View>
                </ScrollView>
            </View>
        </ModalBackground>
    );
};

const useStyles = () => {
    const {theme} = useTheme();

    const styles = React.useMemo(
        () =>
            StyleSheet.create({
                container: {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 0
                },
                popup: {
                    position: 'absolute',
                    left: 24,
                    right: 24,
                    borderRadius: 14,
                    paddingTop: 40,
                    paddingBottom: Platform.select({
                        ios: 40,
                        android: 18
                    }),
                    paddingHorizontal: 22,
                    flexDirection: 'column',
                    backgroundColor: theme.colors.secondaryBg,
                    ...Platform.select({
                        android: {
                            borderRadius: 4,
                            padding: 24
                        }
                    })
                },
                title: {
                    ...fontFamily({
                        size: 22,
                        weight: '600',
                        android: {weight: 'bold'}
                    }),
                    lineHeight: normalize(26),
                    letterSpacing: 0.4,
                    paddingBottom: 10,
                    color: theme.colors.primaryText
                },
                description: {
                    ...fontFamily({size: 15}),
                    lineHeight: 22,
                    letterSpacing: -0.41,
                    marginBottom: 14
                },
                radioItem: {
                    paddingVertical: 17,
                    flexDirection: 'row',
                    alignItems: 'center'
                },
                radioLabel: {
                    paddingLeft: 17
                },
                message: {
                    marginTop: 17,
                    marginBottom: 40
                },
                messageLabel: {
                    ...fontFamily({size: 13}),
                    lineHeight: 18,
                    letterSpacing: 0.2,
                    color: theme.colors.secondaryText
                },
                messageInput: {
                    ...fontFamily({size: 15}),
                    lineHeight: 20,
                    paddingVertical: 6,
                    borderBottomWidth: 1,
                    borderBottomColor: theme.colors.inputBorder
                },
                actions: {
                    justifyContent: Platform.select({
                        ios: 'space-between',
                        android: 'flex-end'
                    }),
                    alignItems: 'center',
                    flexDirection: 'row'
                },
                cancelBtn: {
                    marginRight: 8
                },
                shareBtn: {
                    marginLeft: 8
                },
                terms: {
                    paddingBottom: 22
                }
            }),
        [theme]
    );
    return {styles, theme};
};
