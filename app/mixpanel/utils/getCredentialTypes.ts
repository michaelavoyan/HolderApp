import {ClaimCredentialWithCheckbox} from 'app/store/types/claim';
import {reduce} from 'lodash/fp';

export const getCredentialTypes = (
    offers: ClaimCredentialWithCheckbox[],
    isAccepted: boolean
) => {
    return reduce(
        (acc: string[], curr) =>
            isAccepted === curr.checked ? [...acc, curr.type.toString()] : acc,
        [],
        offers
    );
};
