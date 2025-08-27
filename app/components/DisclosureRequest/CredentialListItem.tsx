import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {filter, includes, find} from 'lodash/fp';
import {ListItem, useTheme} from 'react-native-elements';
import {StyleSheet} from 'react-native';

import {DisclosureCredentialsToIssuerParams} from 'app/store/types/disclosure';
import {ClaimCredentialWithCheckbox} from './types';
import {CustomListItem} from '../common/CustomListItem';
import {useCredentialSummaries} from '../../utilities/credential-values';
import {normalize} from '../../utilities/helpers';
import {savedOriginalIssuingSessionSelector} from '../../store/selectors/disclosure';
import {isIdentitySelector} from '../../store/selectors';

export const CredentialListItem: React.FC<{
    id: string;
    name: string;
    credentials: ClaimCredentialWithCheckbox[];
    onAddItem: (item: {
        name: string;
        id: string;
        isCredentialAvailable: boolean;
    }) => void;
}> = ({id, name, credentials, onAddItem}) => {
    const {t} = useTranslation();
    const savedIssuingSession: null | DisclosureCredentialsToIssuerParams = useSelector(
        savedOriginalIssuingSessionSelector
    );
    const typeToBeAnimated = savedIssuingSession?.credentialType
        ?.isInitialCredForType
        ? savedIssuingSession?.credentialType?.name
        : undefined;

    const idCredentialsForDisclosureItem = useMemo(
        () => filter(item => includes(id, item.type), credentials),
        [id, credentials]
    );

    const subtitles = useMemo(() => {
        const checkedIdCredentialsForDisclosureItem = filter(
            'checked',
            idCredentialsForDisclosureItem
        );

        return checkedIdCredentialsForDisclosureItem.map(cred => (
            <CredentialsSubtitles
                credential={cred}
                key={`credential-subtitle-${cred.id}`}
            />
        ));
    }, [idCredentialsForDisclosureItem]);

    const isIdentityCredential = useSelector(isIdentitySelector([id]))

    return (
        <CustomListItem
            onPress={() =>
                onAddItem({
                    id,
                    name,
                    isCredentialAvailable: !!idCredentialsForDisclosureItem.length
                })
            }
            title={t(name)}
            subTitles={subtitles}
            hiddenAddOptionButton={!isIdentityCredential}
            checked={
                !!find(
                    item => includes(id, item.type) && item.checked,
                    credentials
                )
            }
            key={id}
            shouldAnimateCheckedIcon={typeToBeAnimated === name}
        />
    );
};

export const CredentialsSubtitles = ({
    credential
}: {
    credential: ClaimCredentialWithCheckbox;
}) => {
    const {theme} = useTheme();
    const info = useCredentialSummaries(credential);

    return (
        <ListItem.Subtitle
            style={[styles.subTitle, {color: theme.colors.secondaryText}]}
            adjustsFontSizeToFit>
            {info.subTitle} {info.summaryDetail}
        </ListItem.Subtitle>
    );
};

const styles = StyleSheet.create({
    subTitle: {
        fontSize: normalize(11),
        lineHeight: normalize(16)
    }
});
