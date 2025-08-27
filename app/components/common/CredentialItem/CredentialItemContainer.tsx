import React, {useState} from 'react';
// eslint-disable-next-line import/no-cycle
import {CredentialItem} from './CredentialItem';
import {CredentialItemContainerProps} from '../../CredentialDetails/typings/type';

export const CredentialItemContainer: React.FC<CredentialItemContainerProps> = ({
    info,
    ...props
}) => {
    const [inputMode, toggleMode] = useState<boolean>(false);

    return (
        <CredentialItem
            inputMode={inputMode}
            onToggleMode={() => toggleMode(true)}
            info={info}
            {...props}
        />
    );
};
