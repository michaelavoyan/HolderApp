import React, { memo } from 'react';
import {getOr} from 'lodash/fp';
import {useSelector} from 'react-redux';
import useShareCredentialToLinkedIn from 'app/components/CredentialDetails/useShareCredentialToLinkedIn';
import {LinkedInRules} from 'app/store/types/vcl';
import {linkedInByCredentialTypeSelector} from 'app/store/selectors/vcl';
import {CredentialInfoBase} from './CredentialInfoBase';
import {ClaimCredential} from '../../../store/types/claim';

export const CredentialInfoWithShare = memo((props: any) => {
    const {item} = props;
    const linkedInRules: LinkedInRules = useSelector((state: any) =>
        linkedInByCredentialTypeSelector(state, getOr([], 'type', item))
    );
    const shareToLinkedIn = useShareCredentialToLinkedIn({
        credential: item as ClaimCredential,
        linkedInRules
    });

    return (
        <CredentialInfoBase
            shareToLinkedIn={shareToLinkedIn}
            {...props}
        />
    );
});
