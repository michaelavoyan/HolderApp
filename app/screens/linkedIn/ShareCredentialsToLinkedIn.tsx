import React, {useCallback, useEffect, useState, Children} from 'react';
import {useTranslation} from 'react-i18next';
import {getOr} from 'lodash/fp';

import {ClaimCredential, ClaimCredentialWithCheckbox} from 'app/store/types/claim';
import {IConfig} from 'app/store/types/appConfig';
import {
    openStatusPopup,
    openLoadingPopup,
    closePopup,
    openShareToLinkedInPopup
} from 'app//utilities/popups';
import {StatusMessages} from 'app/screens/popups/type';
import {VclMixpanel} from 'app/mixpanel/VclMixpanel';
import {linkedInShareType} from 'app/mixpanel/utils';
import {PopupScreens} from 'app/navigation/StackParamsList';
import {
    publishImagePostOnLinkedIn,
    publishTextPostOnLinkedIn
} from '../settings/LinkedInSettings/utils';
import {
    warnUserAboutLinkedinApp,
    handleSuccessShareToFeed
} from '../../utilities/linkedin';


type Descriptor = {
    descriptor: LinkedInPostDescriptor;
    credentialId: string;
    termsUrl: string;
    credentialType: [];
};

type LinkedInPostDescriptor = {
    accessToken: string;
    text: string;
    imageAltText: string;
    imageUri: string;
    config: IConfig;
};

const preperaText = (
    isSuccess: boolean,
    isSingle: boolean,
    hasError: boolean
) => {
    let text = '';
    if (isSuccess) {
        text += `Your ${
            isSingle ? 'credential has' : 'credentials have'
        } been successfully shared to LinkedIn`;
    }
    if (hasError) {
        text += `\n${errorText}`;
    }
    return text;
};

const errorText =
    'Some credentials could not be shared. Please try again later.';

const triggerMixpanelEvent = (type: [], id: string, linkCode: string = '')  => {
    VclMixpanel.trackShareToLinkedin({
        CredentialType: type,
        CredentialShared: id,
        ShareType: linkedInShareType[1],
        LinkCode: linkCode
    });
};

export const ShareCredentialsToLinkedIn = ({
    checkCredentials,
    credentialsFromClaiming = [],
    token,
    email,
    inProgress,
    navigation,
    children,
    setIsShared
}: {
    checkCredentials: ClaimCredential[];
    credentialsFromClaiming?: ClaimCredential[] | ClaimCredentialWithCheckbox[];
    token: string;
    email: object;
    inProgress: boolean;
    navigation: any;
    children: any;
    setIsShared: (isShared: boolean) => void;
}) => {
    const {t} = useTranslation();
    const [postDescriptors, setPostDescriptors] = useState<Descriptor[]>([]);
    const [postUrls, setPostUrls] = useState<string[]>([]);
    const [hasError, setHasError] = useState(false);
    const shouldRedirectToSettings =
        (!token || 'serviceErrorCode' in email) && !inProgress;

    const redirectToSettings = useCallback(() => {
        navigation.navigate('SettingsTab', {
            screen: 'LinkedIn',
            params: {
                onSuccess: () => {
                    setIsShared(false);
                    navigation.navigate('LinkedInSelectCredentialToShare', {
                        credentials: credentialsFromClaiming.map((item) => ({
                            ...item,
                            checked: checkCredentials.some(checked => checked.id === item.id)
                        })),
                        credentialsInProgress: checkCredentials,
                        inProgress: true
                    });
                }
            }
        });
    }, [navigation, setIsShared, credentialsFromClaiming, checkCredentials]);

    useEffect(() => {
        if (shouldRedirectToSettings) {
            redirectToSettings();
        }
    }, [redirectToSettings, shouldRedirectToSettings]);

    const addDescriptor = useCallback((descriptor: Descriptor) => {
        setPostDescriptors((prevState) => [...prevState, descriptor]);
    }, []);

    const postToLinkedIn = useCallback(
        async (descriptor: LinkedInPostDescriptor) => {
            let postUrl = await publishImagePostOnLinkedIn(descriptor);
            if (!postUrl) {
                postUrl = await publishTextPostOnLinkedIn(descriptor);
            }
            return postUrl;
        },
        []
    );

    const handlePostsToLinkedIn = useCallback(() => {
        openLoadingPopup({params: {title: t('Loading...')}});
        postDescriptors.forEach(async (item: Descriptor) => {
            let postUrl = '';
            if (!item?.descriptor) {
                setHasError(true);
            } else {
                postUrl = await postToLinkedIn(
                    item.descriptor as LinkedInPostDescriptor
                );
            }

            if (!postUrl) {
                setHasError(true);
            } else {
                const linkCode = item?.descriptor?.text?.match(/presentations\/([^/]+)$/)||[];
                triggerMixpanelEvent(item.credentialType, item.credentialId, linkCode[1]);
            }
            setPostUrls((prevState) => [...prevState, postUrl]);
        });
    }, [postDescriptors, postToLinkedIn, t]);

    const showShareToLinkedInPopup = useCallback(
        (descriptor: Descriptor) => {
            const credential = checkCredentials.find(
                (item) => item.id === descriptor.credentialId
            );
            const issuerName = getOr('', 'issuer.name', credential);
            openShareToLinkedInPopup({
                params: {
                    onCancel: () => {
                        setIsShared(false);
                    },
                    credential: {issuerName, imgUrl: ''},
                    linkedInRules: {
                        shareInFeed: true,
                        shareInProfile: false
                    },
                    termsUrl: descriptor.termsUrl,
                    onShareMultiple: handlePostsToLinkedIn
                }
            });
        },
        [checkCredentials, handlePostsToLinkedIn, setIsShared]
    );

    const showSuccessPopup = useCallback(() => {
        const onPress = (postUrl: string) => {
            closePopup(PopupScreens.STATUS_POPUP);
            handleSuccessShareToFeed(postUrl);
            navigation.navigate('ProfileTab');
        };
        closePopup(PopupScreens.LOADING_POPUP);

        openStatusPopup({
            params: {
                title: t('Done!'),
                text: t(
                    preperaText(
                        postUrls.length > 0,
                        checkCredentials.length === 1,
                        hasError
                    )
                ),
                statusType: StatusMessages.Done,
                onPress: () => onPress(postUrls[0])
            }
        });
    }, [checkCredentials.length, hasError, navigation, postUrls, t]);

    // Show share popup
    useEffect(() => {
        if (
            postDescriptors.length === checkCredentials.length &&
            postDescriptors.length > 0
        ) {
            closePopup(PopupScreens.LOADING_POPUP);
            const descriptor = postDescriptors.find((item) => !!item);
            if (descriptor) {
                warnUserAboutLinkedinApp(() =>
                    showShareToLinkedInPopup(descriptor)
                );
            } else {
                openStatusPopup({
                    params: {
                        title: t('Error'),
                        text: t(errorText),
                        statusType: StatusMessages.Error
                    }
                });
            }
        } else if (!shouldRedirectToSettings) {
            openLoadingPopup({params: {title: t('Loading...')}});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkCredentials.length, postDescriptors.length, postToLinkedIn, t]);

    // Show success popup
    useEffect(() => {
        if (
            postUrls.length === checkCredentials.length &&
            checkCredentials.length > 0
        ) {
            showSuccessPopup();
        }
    }, [checkCredentials.length, postUrls.length, showSuccessPopup]);

    const mappedChildren = Children.map(children, (child) => {
        return React.cloneElement(child, {
            token,
            onLoad: addDescriptor
        });
    });

    return token && email ? mappedChildren : <></>;
};
