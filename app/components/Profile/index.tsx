import React, {useMemo} from 'react';
import {StyleSheet, ScrollView, Platform, View} from 'react-native';

import {useTheme} from 'react-native-elements';
import {FullUser} from '../../store/types/auth';
import {CredentialsModal} from '../common/CredentialsModal';
import {ModalType, ModalTypes} from '../common/typings/types';
import {CredentialsCategoryList} from './CredentialsCategoryList';
import {Header} from './Header';
import {
    CredentialCategories,
    CredentialCategory
} from '../../store/types/common';
import {ShareModal} from '../common/ShareModal';

export const ProfileScreen: React.FC<{
    categories: CredentialCategories;
    user: FullUser;
    onAdd: () => void;
    onShare: () => void;
    isShareModalOpen: boolean;
    onShareSelect: () => void;
    onLinkedinShareSelect: () => void;
    isLinkedinShareEnabled: boolean;
    onShareModalClose: () => void;
    onCategorySelect: (item: CredentialCategory) => void;
    onCategoryOpen: (item: CredentialCategory) => void;
    categoriesModalClose: () => void;
    // XXX: onModalItemSelect?: (title: CredentialsModalItems) => void;
    onModalItemSelect?: (title: string) => void;
    modal: ModalType;
    goToScanner: () => void;
}> = ({
    user,
    categories,
    onAdd,
    onShare,
    isShareModalOpen,
    onShareSelect,
    onLinkedinShareSelect,
    isLinkedinShareEnabled,
    onShareModalClose,
    onCategorySelect: onSelect,
    categoriesModalClose,
    modal = {type: ModalTypes.None},
    onCategoryOpen,
    onModalItemSelect,
    goToScanner
}) => {
    const {
        theme: {
            colors: {primaryBg, secondaryBg}
        }
    } = useTheme();

    // TODO: check if it's needed, because now you can open popup over another one with react-native-navigation modal
    // TODO: if it's needed, you should replace isPopupVisible with checking current route(if current route === GenericPopup route)
    // TODO: and onCredentialsPopupClose with closePopup
    // useEffect(() => {
    //     if (isPopupVisible && onCredentialsPopupClose) {
    //         onCredentialsPopupClose();
    //     }
    // }, [isPopupVisible, onCredentialsPopupClose]);
    const categoriesModal = useMemo(() => {
        return categories.filter((item) => item.title !== 'Identity');
    }, [categories]);

    return (
        <View
            style={[styles.container, {backgroundColor: secondaryBg}]}>
            <Header
                user={user}
                onCreate={onAdd}
                onShare={onShare}
                goToScanner={goToScanner}
                containerStyle={styles.header}
            />
            <ScrollView
                style={[styles.container, {backgroundColor: primaryBg}]}>
                <CredentialsCategoryList
                    onSelect={onCategoryOpen}
                    categories={categories}
                />
            </ScrollView>
            <CredentialsModal
                categories={categoriesModal}
                onCategorySelect={onSelect}
                onModalItemSelect={onModalItemSelect}
                onClose={categoriesModalClose}
                modal={modal}
            />
            <ShareModal
                isShareModalOpen={isShareModalOpen}
                onShareSelect={onShareSelect}
                onLinkedinShareSelect={onLinkedinShareSelect}
                onClose={onShareModalClose}
                isLinkedinShareEnabled={isLinkedinShareEnabled}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        ...Platform.select({
            android: {paddingTop: 18}
        })
    }
});
