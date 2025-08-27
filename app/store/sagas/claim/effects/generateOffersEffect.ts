import {put, all, call, select} from 'redux-saga/effects';

import {
    VCLOffer,
    VCLOffers
} from '@velocitycareerlabs/vcl-react-native';

import {find, get, map, reduce, getOr, isEqual} from 'lodash/fp';
import {
    ClaimCredentialWithCheckbox,
    CredentialStatus,
    GenerateOffersEffect
} from 'app/store/types/claim';
import {jwtDecode} from 'app/jwt/core';
import {VclMixpanel} from 'app/mixpanel/VclMixpanel';
import {getCampaign, getCredentialsId} from 'app/mixpanel/utils';
import {
    setRegenerateOffersData,
    removeRegenerateOffersDataByExchangeId
} from 'app/storage/asyncStorage';

import {addIssuerToOffer} from 'app/utilities/issuer';
import {findByLinkCode} from 'app/utilities/validation/validate-utils';
import {getCredentials} from 'app/storage/credential';

import {CredentialCategories} from 'app/store/types/common';
import {credentialCategoriesSelector} from 'app/store/selectors';
import {findCredentialType} from 'app/utilities/helpers';
import * as actions from '../../../actions';
import {handleOffersError, validateOffersResponse} from '../helpers';
import {VclReactNativeSdkWrapper} from '../../../../api/vcl-react-native-sdk-wrapper';

export function* generateOffersEffect({
    credentialManifest,
    isNewWaiting,
    linkCodeCommitment,
    selectedCredentials,
    types,
    verificationIdentifier
}: GenerateOffersEffect) {
    try {
        const savedCredentials: ClaimCredentialWithCheckbox[] =
            yield call(getCredentials);
        const offerHashes = reduce(
            (acc: string[], curr) =>
                curr.hash && curr.status !== CredentialStatus.revoked
                    ? [...acc, curr.hash]
                    : acc,
            [],
            savedCredentials
        );

        const issuerName = getOr(
            '',
            'claimsSet.metadata.client_name',
            jwtDecode(credentialManifest.jwt.encodedJwt)
        );

        const identificationVerifiableCredentials = verificationIdentifier
            ? [
                  {
                      inputDescriptor: types ? types[0] : '',
                      jwtVc: verificationIdentifier
                  }
              ]
            : map(
                  (item) => ({
                      inputDescriptor: findCredentialType(item.type) || '',
                      jwtVc: item.jwt!
                  }),
                  selectedCredentials
              );

        const response: VCLOffers = yield VclReactNativeSdkWrapper.generateOffers({
            credentialManifest,
            types,
            identificationVerifiableCredentials,
            offerHashes
        });

        const responseWithOfferCreationDate: VCLOffers = {
            ...response,
            all: map(
                (item: VCLOffer) => ({
                    ...item,
                    payload: {
                        ...item.payload,
                        offerExpirationDate: response.sessionToken.expiresIn
                            ? new Date(
                                  Number(response.sessionToken.expiresIn) * 1000
                              ).toString()
                            : null
                    }
                }),
                response.all
            ) as any
        };

        const newVerificationIdentifier =
            get(
                'credentialSubject.email',
                find('credentialSubject.email', selectedCredentials)
            ) || '';
        setRegenerateOffersData([
            {
                verificationIdentifier: newVerificationIdentifier,
                credentialManifest,
                vclToken: response.sessionToken
            }
        ]);

        VclMixpanel.trackCredentialsShared({
            CredentialType: map(
                'inputDescriptor',
                identificationVerifiableCredentials
            ),
            SharedWith: credentialManifest.did,
            SharedWithName: issuerName,
            Campaign: getCampaign(credentialManifest.jwt.encodedJwt),
            CredentialShared: getCredentialsId(selectedCredentials)
        });

        yield put(actions.setProgress(0.5));
        yield call(
            validateOffersResponse,
            responseWithOfferCreationDate,
            credentialManifest
        );

        const offersWithManifests = map(
            (item) => ({
                ...item.payload,
                checked: true,
                credentialManifest,
                vclToken: response.sessionToken
            }),
            responseWithOfferCreationDate.all
        );

        if (verificationIdentifier) {
            yield removeRegenerateOffersDataByExchangeId({
                exchangeId: credentialManifest.exchangeId
            });
        }

        const changedOffers: ClaimCredentialWithCheckbox[] = yield all(
            map(
                addIssuerToOffer,
                findByLinkCode(linkCodeCommitment?.value, offersWithManifests)
            )
        );

        if (isNewWaiting) {
            yield put(
                actions.pushOffersSuccess({
                    offers: changedOffers,
                    vclOffers: responseWithOfferCreationDate
                })
            );
        } else {
            yield put(
                actions.vcloffersSuccess({
                    offers: changedOffers,
                    vclOffers: responseWithOfferCreationDate
                })
            );
        }
        yield put(actions.setProgress(1));
    } catch (e) {
        const categories: CredentialCategories = yield select(
            credentialCategoriesSelector
        );

        const category = categories.find((item) => isEqual(item.types, types));

        handleOffersError(e, credentialManifest, category?.title);
    }
}
