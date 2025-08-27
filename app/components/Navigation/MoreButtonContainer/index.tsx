import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import EMoreButtonOptions from 'app/constants/moreButtonOptions';
import {MoreButton} from '../../common/MoreButton';
import {RootStackParamList} from '../../../navigation/StackParamsList';

interface MoreButtonContainerProps {
    onSelect?: (item: string) => void;
    items?: string[];
}

type EditProfileProps = StackNavigationProp<RootStackParamList, 'EditProfile'>;

export const MoreButtonContainer: React.FunctionComponent<
    MoreButtonContainerProps
> = ({onSelect, items}) => {
    const {t} = useTranslation();
    const menuItems = [EMoreButtonOptions.EDIT_PROFILE, ...(items || [])].map(
        (i) => t(i)
    );
    const navigation = useNavigation<EditProfileProps>();

    const onSelectCallback = useCallback(
        (item: string) => {
            if (item === t(EMoreButtonOptions.EDIT_PROFILE)) {
                navigation.navigate('EditProfile');
            } else if (onSelect) {
                onSelect(item);
            }
        },
        [navigation, onSelect, t]
    );

    return <MoreButton onSelect={onSelectCallback} items={menuItems} />;
};
