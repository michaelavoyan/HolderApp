import {AcceptedDisclosureRequestObject} from 'app/store/types/disclosure';
import {CredentialCategory} from 'app/store/types/common';
import {ClaimCredentialWithCheckbox} from '../../../DisclosureRequest/types';

export type DisclosureDetailsProps = {
    disclosure?: AcceptedDisclosureRequestObject;
    credentials: ClaimCredentialWithCheckbox[];
    openCategory: (args: CredentialCategory) => void;
    onDelete?: () => void;
};
