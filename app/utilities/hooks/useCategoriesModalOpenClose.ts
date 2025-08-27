import {useCallback, useState} from 'react';
import {intersection, isEmpty, map} from 'lodash/fp';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {
    ModalItemType,
    ModalSubTypes,
    ModalType,
    ModalTypes
} from '../../components/common/typings/types';
import {CredentialCategory} from '../../store/types/common';
import {identityTypesSelector} from '../../store/selectors';

const ADD_SELF_REPORT_TITLE = 'Choose credential type';

/**
 * TODO: revisit closeWithTimeout logic, make sure that it is required
 */
export const useCategoriesModalOpenClose = ({
    category,
    closeWithTimeout
}: {
    category?: CredentialCategory;
    closeWithTimeout?: boolean;
}) => {
    const [modal, setModal] = useState<ModalType>({type: ModalTypes.None});
    const [selectedCategory, setSelectedCategory] = useState<string>();
    const identityTypes: string[] = useSelector(identityTypesSelector);
    const {t} = useTranslation();
    const onOpenCategoriesModal = useCallback(() => {
        if (category) {
            setModal({
                type: ModalTypes.Menu,
                subType: !isEmpty(intersection(identityTypes, category.types))
                    ? ModalSubTypes.Identity
                    : ModalSubTypes.Category
            });
        }
    }, [category, identityTypes, setModal]);

    const onCloseCategoriesModal = useCallback(() => {
        setModal({type: ModalTypes.None});

        return closeWithTimeout && new Promise(r => setTimeout(r, 200));
    }, [closeWithTimeout, setModal]);

    const onOpenSelfReportTypes = useCallback(
        (modalItems: ModalItemType[]) => {
            if (modalItems.length === 1) {
                modalItems[0].action();
                onCloseCategoriesModal();
            } else {
                setModal({
                    type: ModalTypes.Menu,
                    subType: ModalSubTypes.SelfReport,
                    title: t(ADD_SELF_REPORT_TITLE),
                    items: map(
                        item => ({
                            ...item,
                            action: () => {
                                item.action();
                                onCloseCategoriesModal();
                            }
                        }),
                        modalItems
                    )
                });
            }
        },
        [setModal, onCloseCategoriesModal, t]
    );

    const onCategorySelect = useCallback(
        ({icon: type, types}: Partial<CredentialCategory>) => {
            const popup: ModalType = {
                type: ModalTypes.Menu,
                subType: !isEmpty(intersection(identityTypes, types))
                    ? ModalSubTypes.Identity
                    : ModalSubTypes.Category
            };

            setSelectedCategory(type);
            setModal(popup);
        },
        [identityTypes, setModal, setSelectedCategory]
    );

    const onAdd = useCallback(() => {
        setModal({
            type: ModalTypes.Categories,
            title: t('Choose credential type')
        });
    }, [setModal, t]);

    return {
        onOpenCategoriesModal,
        onCloseCategoriesModal,
        onAdd,
        onCategorySelect,
        selectedCategory,
        modal,
        onOpenSelfReportTypes
    };
};
