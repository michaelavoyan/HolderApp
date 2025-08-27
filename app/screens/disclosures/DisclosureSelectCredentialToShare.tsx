import {StackScreenProps} from '@react-navigation/stack';
import {curryRight, filter, isEmpty, map} from 'lodash/fp';
import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ClaimCredentialWithCheckbox} from 'app/components/DisclosureRequest/types';
import {SelectCredentialScreen} from 'app/components/DisclosureSelectItem';
import {RootStackParamList} from 'app/navigation/StackParamsList';
import {
    checkedCredentials,
    toggleCredentialsToShare
} from 'app/utilities/credential';
import {MoreButton} from 'app/components/common/MoreButton';
import EMoreButtonOptions from 'app/constants/moreButtonOptions';
import {useClaimingMissingCredential} from '../../utilities/hooks/useClaimingMissingCredential';

type Props = StackScreenProps<
    RootStackParamList,
    'DisclosureSelectCredentialToShare'
>;

export const DisclosureSelectCredentialToShare: React.FC<Props> = ({
    route: {params},
    navigation
}) => {
    const {credentials, title, onSelect, issuingSessionParams} = params;
    const {t} = useTranslation();

    const {onClaimPress} = useClaimingMissingCredential(navigation);

    useEffect(() => {
        if (title) {
            navigation.setOptions({title});
        }
    }, [navigation, title]);

    const [credentialsToShare, setCredentialsToShare] = useState<
        ClaimCredentialWithCheckbox[]
    >(credentials);
    const checkedLength = filter('checked', credentialsToShare).length;
    const defaultCredentialsToShare = checkedCredentials(credentials);

    const onSelectAll = useCallback(
        (option: string) =>
            option === EMoreButtonOptions.SELECT_ALL &&
            setCredentialsToShare(prevState =>
                map(
                    item => ({...item, checked: true}),
                    isEmpty(prevState) ? defaultCredentialsToShare : prevState
                )
            ),
        [setCredentialsToShare, defaultCredentialsToShare]
    );

    const onUnSelectAll = useCallback(
        (option: string) =>
            option === EMoreButtonOptions.UNSELECT_ALL &&
            setCredentialsToShare(prevState =>
                map(
                    item => ({...item, checked: false}),
                    isEmpty(prevState) ? defaultCredentialsToShare : prevState
                )
            ),
        [setCredentialsToShare, defaultCredentialsToShare]
    );

    const isAllCredentialsSelected = useCallback(() => {
        return credentialsToShare.every((item) => item.checked);
    }, [credentialsToShare]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                isAllCredentialsSelected() ? (
                    <MoreButton
                        items={[EMoreButtonOptions.UNSELECT_ALL].map((i) =>
                            t(i)
                        )}
                        onSelect={onUnSelectAll}
                    />
                ) : (
                    <MoreButton
                        items={[EMoreButtonOptions.SELECT_ALL].map((i) => t(i))}
                        onSelect={onSelectAll}
                    />
                )
        });
    }, [isAllCredentialsSelected, navigation, onSelectAll, onUnSelectAll, t]);

    const onChangeCredentialsToShare = (
        val: ClaimCredentialWithCheckbox | boolean
    ) => {
        setCredentialsToShare(prevState =>
            map(
                curryRight(toggleCredentialsToShare)(val),
                isEmpty(prevState) ? defaultCredentialsToShare : prevState
            )
        );
    };

    const onClaimLinkPress = useCallback(() => {
        if (issuingSessionParams) {
            onClaimPress(issuingSessionParams);
        }
    }, [issuingSessionParams, onClaimPress]);

    return (
        <SelectCredentialScreen
            items={credentialsToShare}
            onPressItem={() => null}
            toggleItem={onChangeCredentialsToShare}
            selectEnabled={!!checkedLength}
            onPressPrimary={() => {
                onSelect(credentialsToShare);
                navigation.goBack();
            }}
            onClaimLinkPress={
                issuingSessionParams ? onClaimLinkPress : undefined
            }
            primaryTitle={t('Add')}
            onCancel={() => navigation.goBack()}
        />
    );
};
