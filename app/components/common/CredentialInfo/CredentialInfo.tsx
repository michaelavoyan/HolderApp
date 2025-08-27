import React, { memo } from 'react';
import {CredentialInfoBase} from './CredentialInfoBase';
import {CredentialInfoWithShare} from './CredentialInfoWithShare';
import {CredentialInfoProps} from '../typings/types';

export const CredentialInfo = memo((props: CredentialInfoProps) => {
    const {isShareEnabled = false} = props;
    return isShareEnabled ? (
        <CredentialInfoWithShare {...props} />
    ) : (
        <CredentialInfoBase {...props} />
    );
});
