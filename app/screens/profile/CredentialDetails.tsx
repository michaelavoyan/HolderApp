import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {get, getOr} from 'lodash/fp';
import {
    findNodeHandle,
    Keyboard,
    NativeSyntheticEvent,
    Platform,
    StyleSheet,
    Text,
    TextInputContentSizeChangeEventData,
    TouchableOpacity
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {StackScreenProps} from '@react-navigation/stack';
import {useTheme} from 'react-native-elements';

import {VCLCountry} from '@velocitycareerlabs/vcl-react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
    DELETE_MESSAGES,
    fontFamily,
    isIOS,
    normalize,
    onDeleteAction
} from 'app/utilities/helpers';
import {
    deleteCredentialById,
    finalizeOffersFromDiffIssuers,
    updateCredential
} from 'app/store/actions';
import {countriesSelector, pushOffersSelector} from 'app/store/selectors';
import {CredentialToUpdate} from 'app/store/types/profile';
import {NavigateOptions} from 'app/navigation/utils';
import EMoreButtonOptions from 'app/constants/moreButtonOptions';
import {
    DisclosureCredentialsToIssuerParams,
    DisclosureSubtype,
    SelectCredentialToShareParams
} from 'app/store/types/disclosure';
import {warnUserAboutLinkedinApp} from 'app/utilities/linkedin';
import {KeyboardAwareScrollWrapper} from 'app/components/common/KeyboardAwareScrollWrapper';
import {RootStackParamList} from '../../navigation/StackParamsList';
import {CredentialDetailsScreen} from '../../components/CredentialDetails';
import {MoreButton} from '../../components/common/MoreButton';

import {openGenericPopup} from '../../utilities/popups';
import {
    ClaimCredentialWithCheckbox,
    CredentialStatus
} from '../../store/types/claim';
import {isCredentialExpired} from '../../utilities/credential';
import useShareCredentialToLinkedIn from '../../components/CredentialDetails/useShareCredentialToLinkedIn';
import {linkedInByCredentialTypeSelector} from '../../store/selectors/vcl';
import {LinkedInRules} from '../../store/types/vcl';
import {
    inspectionSessionSelector,
    savedOriginalIssuingSessionSelector
} from '../../store/selectors/disclosure';
import {useClaimingMissingCredential} from '../../utilities/hooks/useClaimingMissingCredential';

const HEADER_HEIGHT = 100;
const INPUT_EXTRA_HEIGHT = 20;
const EXTRA_SCROLL_OFFSET = 150;

export type CredentialDetailsProps = StackScreenProps<
    RootStackParamList,
    'CredentialDetails'
>;

export const CredentialDetails: React.FC<CredentialDetailsProps> = ({
    route: {
        params: {
            credential,
            isOffer,
            goBack,
            onDelete,
            disclosureSubtype,
            isShareToLinkedInOpen,
            onAcceptOffer
        }
    },
    navigation
}) => {
    const {
        theme: {
            colors: {active, reject}
        },
        theme
    } = useTheme();
    const countries: VCLCountry[] = useSelector(countriesSelector);
    const savedIssuingSession: null | DisclosureCredentialsToIssuerParams =
        useSelector(savedOriginalIssuingSessionSelector);
    const {vclOffers} = useSelector((state: any) => pushOffersSelector(state));

    const savedInspectionSession: null | SelectCredentialToShareParams =
        useSelector(inspectionSessionSelector);
    const linkedInRules: LinkedInRules = useSelector((state: any) =>
        linkedInByCredentialTypeSelector(state, getOr([], 'type', credential))
    );
    const {shareInProfile, shareInFeed} = linkedInRules;
    const keyboardView = useRef<KeyboardAwareScrollView | null>(null);
    const dispatch = useDispatch();
    const [showSave, toggleSaveVisibility] = useState<boolean>(false);
    const [note, changeNotes] = useState<string>(credential?.note || '');
    const isOffered = credential?.status === CredentialStatus.offered;
    const {t} = useTranslation();

    const isConnectedToSavedIssuingSession =
        savedIssuingSession?.credentialType?.id &&
        credential.type.includes(savedIssuingSession?.credentialType?.id);

    const {
        onSecondaryIssuingSuccess,
        stopSecondaryIssuingSessionByOfferReject
    } = useClaimingMissingCredential(navigation);

    useEffect(() => {
        if (credential && !note) {
            changeNotes(credential.note || '');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [credential]);

    const handleToggleSaveVisibility = useCallback(
        () => toggleSaveVisibility(true),
        [toggleSaveVisibility]
      );

    const deleteCredential = useCallback(() => {
        onDeleteAction(
            DELETE_MESSAGES.delete.title,
            DELETE_MESSAGES.delete.subTitle,
            () => {
                dispatch(
                    deleteCredentialById({
                        id: credential.id,
                        isVerified: true,
                        navigation: {
                            name: '',
                            option: NavigateOptions.GoBack
                        }
                    })
                );

                if (onDelete) {
                    onDelete(credential.id);
                }
            },
            theme
        );
    }, [credential.id, onDelete, dispatch, theme]);

    const shareToLinkedIn = useShareCredentialToLinkedIn({
        credential,
        linkedInRules,
        isOffer,
        goBack,
        onDelete
    });

    useEffect(() => {
        if (isShareToLinkedInOpen) {
            shareToLinkedIn();
        }
    }, [shareToLinkedIn, isShareToLinkedInOpen]);

    const handleMenuActionSelect = useCallback(
        (item: string) => {
            switch (item) {
                case EMoreButtonOptions.DELETE: {
                    deleteCredential();
                    break;
                }
                case EMoreButtonOptions.SHARE_TO_LINKED_IN: {
                    warnUserAboutLinkedinApp(shareToLinkedIn);
                    break;
                }
                default: {
                    // ...
                }
            }
        },
        [deleteCredential, shareToLinkedIn]
    );

    const updateCredentialCb = useCallback(
        (credentialToUpdate: CredentialToUpdate) =>
            dispatch(
                updateCredential({
                    credentialObject: credentialToUpdate,
                    isVerified: true
                })
            ),
        [dispatch]
    );

    const onSave = useCallback(() => {
        if (credential) {
            Keyboard.dismiss();
            updateCredentialCb({note, id: credential.id});
            toggleSaveVisibility(false);
        }
    }, [credential, updateCredentialCb, toggleSaveVisibility, note]);

    useEffect(() => {
        // show default headerRight
        if (isOffer) {
            return;
        }

        const menuItems = [t(EMoreButtonOptions.DELETE)];
        const isPossibleToShareToLinkedin = shareInProfile || shareInFeed;

        if (
            disclosureSubtype !== DisclosureSubtype.linkedin &&
            isPossibleToShareToLinkedin
        ) {
            menuItems.push(t(EMoreButtonOptions.SHARE_TO_LINKED_IN));
        }

        navigation.setOptions({
            headerRight: () =>
                showSave ? (
                    <TouchableOpacity onPress={onSave} activeOpacity={0.7}>
                        <Text style={[styles.saveText, {color: active}]}>
                            {t('Save')}
                        </Text>
                    </TouchableOpacity>
                ) : (
                    credential.status !== CredentialStatus.deleted && (
                        <MoreButton
                            items={menuItems}
                            destructiveButtonIndex={1}
                            onSelect={handleMenuActionSelect}
                        />
                    )
                )
        });
    }, [
        credential.status,
        navigation,
        showSave,
        deleteCredential,
        onSave,
        active,
        isOffer,
        handleMenuActionSelect,
        disclosureSubtype,
        t,
        shareInProfile,
        shareInFeed
    ]);

    const scrollToInput = useCallback((
        event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>
    ) => {
        keyboardView.current?.scrollToFocusedInput(
            findNodeHandle(event.target) as number,
            HEADER_HEIGHT + INPUT_EXTRA_HEIGHT
        );
    }, []);

    const onFinalizeCb = useCallback(
        (
            isDelete: boolean = false,
            isAccept: boolean = false,
            shouldNavigate: boolean = true
        ) => {
            dispatch(
                // TODO: refactor to be more readable. offerIdsToDelete should use ids from offers by default in the saga
                finalizeOffersFromDiffIssuers({
                    isAccept,
                    offers: {
                        offers: [credential as ClaimCredentialWithCheckbox],
                        vclOffers
                    },
                    offerIdsToDelete: [credential.id],
                    ...(shouldNavigate
                        ? {
                              navigation: {
                                  name: goBack ? '' : 'ProfileTab',
                                  option: goBack
                                      ? NavigateOptions.GoBack
                                      : NavigateOptions.Push
                              }
                          }
                        : undefined),
                    ...(isDelete
                        ? {
                              offerIdsToDelete: [
                                  credential?.additionalInfo?.replacedId,
                                  credential.id
                              ]
                          }
                        : {})
                })
            );
        },
        [credential, dispatch, goBack, vclOffers]
    );

    const isReplacing = get('additionalInfo.replacedId', credential);

    const handleRejectWithInspection = useCallback(() => {
        if (savedInspectionSession) {
            onFinalizeCb(false, false, false);

            setTimeout(() => {
                navigation.reset({
                    index: 2,
                    routes: [
                        {
                            name: 'Tabs'
                        },
                        {
                            name: 'DisclosureRequest',
                            params: savedInspectionSession.acceptNavigation
                                .params
                        },
                        {
                            name: 'SelectCredentialToShare',
                            params: savedInspectionSession
                        }
                    ]
                });
            }, 400);
        }
    }, [savedInspectionSession, navigation, onFinalizeCb]);

    const onRejectCb = useCallback(() => {
        if (isConnectedToSavedIssuingSession) {
            stopSecondaryIssuingSessionByOfferReject(
                savedIssuingSession?.issuer?.name || '',
                onFinalizeCb
            );
            return;
        }

        openGenericPopup({
            params: {
                title: t('Reject Offer'),
                description: t('Are you sure you want to reject the offer?'),
                buttons: [
                    {
                        closePopupOnPress: true,
                        title: t('Cancel'),
                        textStyle: styles.btnTitle
                    },
                    {
                        closePopupOnPress: true,
                        onPress: () =>
                            savedInspectionSession
                                ? handleRejectWithInspection()
                                : onFinalizeCb(),
                        title: t('Reject'),
                        textStyle: isIOS ? {color: reject} : undefined
                    }
                ],
                buttonsDirection: 'row'
            }
        });
    }, [
        isConnectedToSavedIssuingSession,
        onFinalizeCb,
        reject,
        savedIssuingSession?.issuer?.name,
        stopSecondaryIssuingSessionByOfferReject,
        t,
        savedInspectionSession,
        handleRejectWithInspection
    ]);

    const onAcceptCb = useCallback(() => {
        const onAcceptPress = (isDelete: boolean) => {
            if (isConnectedToSavedIssuingSession) {
                onSecondaryIssuingSuccess(savedIssuingSession, () =>
                    onFinalizeCb(isDelete, true, false)
                );
                return;
            }

            if (savedInspectionSession) {
                onFinalizeCb(isDelete, true, false);

                navigation.reset({
                    index: 2,
                    routes: [
                        {
                            name: 'Tabs'
                        },
                        {
                            name: 'DisclosureRequest',
                            params: savedInspectionSession.acceptNavigation
                                .params
                        },
                        {
                            name: 'SelectCredentialToShare',
                            params: savedInspectionSession
                        }
                    ]
                });

                return;
            }

            onFinalizeCb(isDelete, true);
        };

        openGenericPopup({
            params: {
                title: t('Accept Offer'),
                description: isReplacing
                    ? t('Do you want to delete the revoked credential?')
                    : t('Are you sure you want to accept the offer?'),
                buttons: isReplacing
                    ? [
                          {
                              closePopupOnPress: true,
                              onPress: () => onAcceptPress(true),
                              title: t('Accept and delete'),
                              textStyle: styles.btnTitleBold
                          },
                          {
                              closePopupOnPress: true,
                              onPress: () => onAcceptPress(false),
                              title: t('Accept and keep'),
                              textStyle: styles.btnTitle
                          },
                          {
                              closePopupOnPress: true,
                              title: t('Cancel'),
                              textStyle: styles.btnTitle
                          }
                      ]
                    : [
                          {
                              closePopupOnPress: true,
                              title: t('Cancel'),
                              textStyle: styles.btnTitle
                          },
                          {
                              closePopupOnPress: true,
                              onPress: () => onAcceptPress(false),
                              title: t('Accept'),
                              textStyle: styles.btnTitleBold
                          }
                      ],
                buttonsDirection: isReplacing ? 'column' : 'row'
            }
        });
    }, [
        t,
        isReplacing,
        isConnectedToSavedIssuingSession,
        onSecondaryIssuingSuccess,
        savedIssuingSession,
        onFinalizeCb,
        savedInspectionSession,
        navigation
    ]);

    const onFinalize = useCallback(
        (isAccept: boolean = false) => {
            if (isAccept) {
                onAcceptCb();
                return;
            }

            if (isCredentialExpired(credential)) {
                deleteCredential();
                return;
            }
            onRejectCb();
        },
        [credential, deleteCredential, onAcceptCb, onRejectCb]
    );

    const handleScrollToField = useCallback((y: number) => {
        keyboardView?.current?.scrollToPosition(
            0,
            y + EXTRA_SCROLL_OFFSET,
            true
        );
    }, []);

    return (
        <KeyboardAwareScrollWrapper
            ref={keyboardView}
            style={styles.container}
            contentContainerStyle={styles.contentScroll}
            extraScrollHeight={40}>
            <CredentialDetailsScreen
                onFinalize={isOffered ? onFinalize : undefined}
                toggleSaveVisibility={handleToggleSaveVisibility}
                credentialObject={credential}
                changeNotes={changeNotes}
                note={note}
                onAcceptOffer={onAcceptOffer}
                scrollToInput={scrollToInput}
                countries={countries}
                scrollToField={handleScrollToField}
                onLinkedInShare={()=> warnUserAboutLinkedinApp(shareToLinkedIn)}
            />
        </KeyboardAwareScrollWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: isIOS ? 10 : 16,
        paddingHorizontal: 16
    },
    contentScroll: {
        paddingBottom: isIOS ? 40 : 80
    },
    saveText: {
        ...fontFamily({size: 17}),
        lineHeight: normalize(22)
    },
    btnTitle: {
        ...Platform.select({
            ios: {
                fontWeight: '400'
            }
        })
    },
    btnTitleBold: {
        ...Platform.select({
            ios: {
                fontWeight: '600'
            }
        })
    }
});
