import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {useTheme} from 'react-native-elements';
import {useShareCredentials} from 'app/utilities/hooks/useShareCredentials';
import {ModalWrapper} from '../ModalWrapper';
import {ListItemButton} from '../ListItemButton';
import {isIOS} from '../../../utilities/helpers';



export const ShareModal: React.FC<{
    onClose: () => void;
    onShareSelect?: () => void;
    onLinkedinShareSelect?: () => void;
    isLinkedinShareEnabled: boolean;
    isShareModalOpen: boolean;
    selectedCredentialId?: string;
}> = ({
    onShareSelect,
    onLinkedinShareSelect,
    isLinkedinShareEnabled,
    isShareModalOpen,
    onClose,
    selectedCredentialId
}) => {
    const {t} = useTranslation();
    const {
        theme: {
            colors: {dark, primaryAndroid}
        }
    } = useTheme();

    const onShare = useShareCredentials(selectedCredentialId);

    const iconColor = isIOS ? dark : primaryAndroid;

    const handleOnSelect = useCallback(
        (callback?: () => void) => {
            if (callback) {
                callback();
            }
            onClose();
        },
        [onClose]
    );

    return (
        <ModalWrapper
            title={t('Select and share credentials')}
            isVisible={isShareModalOpen}
            onClose={onClose}
            autoHeight>
            <ListItemButton
                key="Post to LinkedIn"
                title={t('Post to LinkedIn')}
                onPress={() => handleOnSelect(onLinkedinShareSelect)}
                icon="shared-via-linkedin"
                isSVG
                iconColor={iconColor}
                disabled={!isLinkedinShareEnabled || !onLinkedinShareSelect}
            />
            <ListItemButton
                key="Share link"
                title={t('Share link')}
                onPress={() => handleOnSelect(onShareSelect || onShare)}
                icon="link"
                isSVG
                iconColor={iconColor}
            />
        </ModalWrapper>
    );
};
