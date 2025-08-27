import {getOr} from 'lodash/fp';
import {jwtDecode} from 'app/jwt/core';

export const getCampaign = (encodedJwt: string) =>
    getOr(
        '',
        'claimsSet.presentation_definition.id',
        jwtDecode(encodedJwt)
    ).split('.')[1];
