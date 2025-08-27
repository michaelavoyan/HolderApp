import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {ListItemButton} from '../../common/ListItemButton';
import {ModalWrapper} from '../../common/ModalWrapper';
import {CredentialCategory} from '../../../store/types/common';

export const CredentialsButton: React.FC<{
    onPress: (item: CredentialCategory) => void;
    item: CredentialCategory;
}> = ({item, onPress}) => {
    const onSelect = useCallback(() => {
        onPress(item);
    }, [item, onPress]);
    const {t} = useTranslation();
    return (
        <ListItemButton
            icon={item.icon}
            key={item.icon}
            title={t(item.title)}
            onPress={onSelect}
        />
    );
};

export const CredentialsModal: React.FC<{
    isVisible: boolean;
    onClose: () => void;
    onSelect: (type: CredentialCategory) => void;
    credentials: CredentialCategory[];
}> = ({credentials = [], isVisible, onClose, onSelect}) => {
    const {t} = useTranslation();
    return (
        <ModalWrapper
            title={t('Choose credential type')}
            isVisible={isVisible}
            onClose={onClose}>
            {credentials.map(item => (
                <CredentialsButton
                    item={item}
                    key={item.icon}
                    onPress={onSelect}
                />
            ))}
        </ModalWrapper>
    );
};
