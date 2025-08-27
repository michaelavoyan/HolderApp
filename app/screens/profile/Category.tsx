import {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {VCLCountry} from '@velocitycareerlabs/vcl-react-native';
import {ClaimCredentialWithCheckbox} from 'app/components/DisclosureRequest/types';
import EMoreButtonOptions from 'app/constants/moreButtonOptions';
import {MoreButton} from 'app/components/common/MoreButton';
import {deleteCredentials} from 'app/store/actions/profile';
import {NavigateOptions} from 'app/navigation/utils';
import {DELETE_MESSAGES, onDeleteAction} from 'app/utilities/helpers';
// import {CredentialsModalItems} from '../../constants/credentials';
import {useTheme} from 'react-native-elements';
import {CredentialCategoryScreen} from '../../components/CredentialCategory';
import {RootStackParamList} from '../../navigation/StackParamsList';
import {
    countriesSelector,
    credentialCategoriesSelector,
    credentialsCountByTypeSelector,
    regionsSelector,
    isIdentitySelector
} from '../../store/selectors';
import {CountryCodes} from '../../store/types/auth';
import {useCredentials} from '../../utilities/hooks/useCredentials';
import {CredentialCategories} from '../../store/types/common';
import {startKycSession} from '../../store/actions';
import {useNavigationCredentialsModal} from '../../utilities/hooks/useNavigationCredentialsModal';
import {useCategoriesModalOpenClose} from '../../utilities/hooks/useCategoriesModalOpenClose';
import {SavedSelfReportCredential} from '../../store/types/profile';

type Props = StackScreenProps<RootStackParamList, 'Category'>;

export const Category: React.FC<Props> = ({
    route: {
        params: {type}
    },
    navigation
}) => {
    const countries: VCLCountry[] = useSelector(countriesSelector);
    const categories: CredentialCategories = useSelector(
        credentialCategoriesSelector
    );
    const regions: CountryCodes = useSelector(regionsSelector);
    // TODO: need refactoring to find category by types
    const category = categories.find((item) => item.icon.includes(type))!;
    type = category.icon;
    const credentialsNumber: number = useSelector(
        credentialsCountByTypeSelector({types: category?.types})
    );
    const {t} = useTranslation();

    const credentials = useCredentials(category?.types);
    const isIdenitityCredential = useSelector(isIdentitySelector(category?.types));
    const dispatch = useDispatch();

    const goToKYC = useCallback(() => dispatch(startKycSession()), [dispatch]);
    const {theme} = useTheme();

    const {
        onCloseCategoriesModal,
        onOpenCategoriesModal,
        onOpenSelfReportTypes,
        modal
    } = useCategoriesModalOpenClose({category});
    const {onModalItemNavigation} = useNavigationCredentialsModal({
        goToKYC,
        navigation,
        category,
        onOpenSelfReportTypes
    });

    const handleMenuActionSelect = useCallback(
        (option: EMoreButtonOptions) => {
            if (option === EMoreButtonOptions.EDIT_PROFILE) {
                navigation.navigate('EditProfile');
            } else {
                const {title, subTitle} =
                    credentialsNumber > 1
                        ? DELETE_MESSAGES.deleteAll
                        : DELETE_MESSAGES.delete;

                onDeleteAction(
                    title,
                    subTitle,
                    () =>
                        dispatch(
                            deleteCredentials({
                                credentials,
                                navigation: {
                                    name: '',
                                    option: NavigateOptions.GoBack
                                }
                            })
                        ),
                    theme
                );
            }
        },
        [credentialsNumber, navigation, dispatch, credentials, theme]
    );

    useEffect(() => {
        let menuItems = [t(EMoreButtonOptions.EDIT_PROFILE)];
        if (credentialsNumber) {
            menuItems = [
                t(
                    credentialsNumber > 1
                        ? EMoreButtonOptions.DELETE_ALL
                        : EMoreButtonOptions.DELETE
                )
            ];
        }
        navigation.setOptions({
            headerRight: () => (
                <MoreButton
                    items={menuItems}
                    destructiveButtonIndex={1}
                    onSelect={handleMenuActionSelect as (item: string) => void}
                />
            )
        });
    }, [navigation, t, credentialsNumber, handleMenuActionSelect]);

    const onCredentialDetails = useCallback(
        (
            credential: ClaimCredentialWithCheckbox | SavedSelfReportCredential
        ) => {
            if ('isSelf' in credential) {
                navigation.navigate('SelfReport', {
                    credential
                });
            }
            if ('offerId' in credential) {
                navigation.navigate('CredentialDetails', {
                    credential
                });
            }
        },
        [navigation]
    );

    // TODO: change type of title: string to CredentialsModalItems after Typescript 5 release
    const onModalItemSelect = useCallback(
        async (title: string) => {
            onCloseCategoriesModal();
            await new Promise((r) => setTimeout(r, 400)); // wait popup animation

            onModalItemNavigation(title);
        },
        [onCloseCategoriesModal, onModalItemNavigation]
    );
    return (
        <CredentialCategoryScreen
            title={category.title}
            type={type}
            size={credentialsNumber}
            onCreate={onOpenCategoriesModal}
            onSelfReport={onModalItemNavigation}
            countries={countries}
            regions={regions}
            onCredentialDetails={onCredentialDetails}
            onModalItemSelect={onModalItemSelect}
            items={credentials}
            modal={modal}
            onClose={onCloseCategoriesModal}
            isIdentityCredential={isIdenitityCredential}
        />
    );
};
