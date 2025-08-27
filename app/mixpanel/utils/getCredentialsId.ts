import {ClaimCredential, ClaimCredentialWithCheckbox} from 'app/store/types/claim';

export const getCredentialsId = (
    credentials: ClaimCredentialWithCheckbox[] | ClaimCredential[]
) => credentials.map(i => i.id.split('_')[0]);
