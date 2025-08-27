import React, {useCallback, useEffect, useState} from 'react';
import {LayoutAnimation} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useTheme} from 'react-native-elements';
import i18n from '../../../i18n';
import {isIOS} from '../../../utilities/helpers';
import {CredentialsButton} from '../../Profile/CredentialsModal';
import {ListItemButton} from '../ListItemButton';
import {ModalWrapper} from '../ModalWrapper';
import {ModalSubTypes, ModalType, ModalTypes} from '../typings/types';
import {
    CredentialCategories,
    CredentialCategory
} from '../../../store/types/common';
import {yotiConfigSelector} from '../../../store/selectors/appConfig';
import {CredentialsModalItems} from '../../../constants/credentials';
import {checkCameraPermissionsRejected} from '../../../utilities/check-camera-permissions-rejected';

const DEFAULT_ID_CREDENTIALS = [
    {
        title: i18n.t(CredentialsModalItems.Phone)
    },
    {
        title: i18n.t(CredentialsModalItems.Email)
    }
];

const createIDCredentialsPopUpItems = (isYotiActive: boolean) => {
    if (isYotiActive) {
        return [
            {
                title: i18n.t(CredentialsModalItems.Id)
            },
            ...DEFAULT_ID_CREDENTIALS
        ];
    }
    return DEFAULT_ID_CREDENTIALS;
};
// TODO: change type of onModalItemSelect?: (title: string) to CredentialsModalItems after Typescript 5 release
export const CredentialsModal: React.FC<{
    categories?: CredentialCategories;
    onCategorySelect?: (item: CredentialCategory) => void;
    onModalItemSelect?: (title: string) => void;
    onClose?: () => void;
    modal: ModalType;
}> = ({
    categories = [],
    onCategorySelect: onSelect = () => undefined,
    onModalItemSelect,
    onClose = () => null,
    modal = {type: ModalTypes.None}
}) => {
    const yotiConfig: boolean = useSelector(yotiConfigSelector);

    const [modalState, setModal] = useState<ModalType>({type: ModalTypes.None});
    const {t} = useTranslation();
    const {
        theme: {
            colors: {dark, primaryAndroid}
        }
    } = useTheme();

    useEffect(() => {
        const popup: ModalType = {...modal};

        if (modal.type === ModalTypes.Menu) {
            let popupItems: {
                title: string;
                icon?: string;
                iconColor?: string;
            }[] = [];
            const iconColor = isIOS ? dark : primaryAndroid;

            if (modal.subType === ModalSubTypes.ProfilePage) {
                popupItems = [
                    {
                        title: t(CredentialsModalItems.ClaimIssuer),
                        icon: 'claim-issuer',
                        iconColor
                    },
                    {
                        title: t(CredentialsModalItems.SelfReport),
                        icon: 'self-report',
                        iconColor
                    },
                    ...(yotiConfig
                        ? [{title: t(CredentialsModalItems.Id)}]
                        : []),
                    {
                        title: t(CredentialsModalItems.Email)
                    },
                    {
                        title: t(CredentialsModalItems.Phone)
                    }
                ];
            } else if (modal.subType === ModalSubTypes.Category) {
                popup.title = `${t(modal.title || 'Add credential')}`;
                popupItems = [
                    {
                        title: t(CredentialsModalItems.ClaimIssuer),
                        icon: 'claim-issuer',
                        iconColor
                    },
                    {
                        title: t(CredentialsModalItems.SelfReport),
                        icon: 'self-report',
                        iconColor
                    }
                ];
            } else if (modal.subType === ModalSubTypes.Identity) {
                popup.title = `${t(
                    modal.title || 'Choose identity credential type'
                )}`;
                popupItems = createIDCredentialsPopUpItems(yotiConfig);
            }

            popup.items =
                modal.items ||
                popupItems.map(item => ({
                    ...item,
                    action: async () => {
                        const {title} = item;

                        if (item.title === t(CredentialsModalItems.Id)) {
                            if (!(await checkCameraPermissionsRejected())) {
                                return;
                            }
                        }

                        if (onModalItemSelect) {
                            LayoutAnimation.configureNext({
                                duration: 175,
                                update: {
                                    type: LayoutAnimation.Types.linear,
                                    property: LayoutAnimation.Properties.scaleXY
                                }
                            });
                            onModalItemSelect(title);
                        }
                    }
                }));
        }

        setModal(popup);
    }, [dark, modal, onModalItemSelect, primaryAndroid, yotiConfig, t]);

    const onSelectCallback = useCallback(
        (item: CredentialCategory) => {
            LayoutAnimation.configureNext({
                duration: 175,
                update: {
                    type: LayoutAnimation.Types.linear,
                    property: LayoutAnimation.Properties.scaleXY
                }
            });

            onSelect(item);
        },
        [onSelect]
    );

    return (
        <ModalWrapper
            title={modalState.title}
            isVisible={modalState.type !== 'none'}
            onClose={() => {
                onClose();
            }}
            autoHeight={modalState.type !== 'categories'}>
            {modalState.type === 'categories'
                ? categories.map(item => (
                      <CredentialsButton
                          item={item}
                          key={item.icon}
                          onPress={onSelectCallback}
                      />
                  ))
                : null}
            {modalState.type === 'menu'
                ? modalState.items?.map(({title, action, icon, iconColor}) => (
                      <ListItemButton
                          key={title}
                          title={title}
                          onPress={action}
                          icon={icon}
                          isSVG
                          iconColor={iconColor}
                      />
                  ))
                : null}
        </ModalWrapper>
    );
};
