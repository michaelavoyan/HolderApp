import {get, reduce, find, filter, getOr} from 'lodash/fp';
import {pickBy} from 'lodash';
import {createSelector} from 'reselect';
import {VCLCredentialType} from '@velocitycareerlabs/vcl-react-native';
import {Selectors} from './types';
import {VCLState} from '../types/vcl';
import {RootState} from '../reducers';
import {vclLogger} from '../../utilities/logger';
import {identityTypesSelector} from './common';

export const credentialTypesSelector = createSelector<
    Selectors<VCLCredentialType[]>,
    VCLCredentialType[]
>(get('vcl.credentialTypes'), (val: VCLCredentialType[]) => val);

export const linkedInByCredentialTypeSelector = createSelector(
    credentialTypesSelector,
    identityTypesSelector,
    (_: any, credTypes: string[]) => credTypes,
    (
        credentialTypes: VCLCredentialType[],
        identityTypes: string[],
        credentialTypesToCheck: string[]
    ) => {
        const matchedCredentialTypes = filter((item) => {
            if (!item.credentialType) {
                vclLogger.error(
                    `Credential doesn't have "credentialType" field - ${JSON.stringify(
                        item
                    )}`
                );

                return false;
            }

            return credentialTypesToCheck.includes(item.credentialType);
        }, credentialTypes);
        let shareInFeed = true;
        let shareInProfile = false;

        matchedCredentialTypes.forEach((type) => {
            if (
                identityTypes.find(
                    (identityType) => identityType === type.credentialType
                )
            ) {
                shareInFeed = false;
            }

            if(getOr(false, 'payload.linkedinProfileCompatible', type)) {
                shareInProfile = type.payload.linkedinProfileCompatible;
            }
        });
        return {shareInFeed, shareInProfile};
    }
);

export const recommendedCredentialTypesSelector = createSelector(
    credentialTypesSelector,
    (credentialTypes: VCLCredentialType[]) =>
        filter('payload.recommended', credentialTypes)
);

export const uiFormSchemaSelector = createSelector(
    ({vcl: {uiFormSchema}}: RootState) => uiFormSchema,
    (val: VCLState['uiFormSchema']) => val
);

export const credentialTypesSchemasSelector = createSelector(
    ({vcl: {credentialTypesSchemas}}: RootState) => credentialTypesSchemas,
    (val: VCLState['credentialTypesSchemas']) => val
);

export const credentialTypeByCredentialSchemaNameSelector = (
    credentialSchemaName: string = ''
) =>
    createSelector<Selectors<VCLCredentialType[]>, string>(
        get('vcl.credentialTypes'),
        (val: VCLCredentialType[]) => {
            const credentialSchema = find(
                ['schemaName', credentialSchemaName],
                val
            );
            // credentialSchema will be empty when isEditMode is false in the app/screens/profile/SelfReport.tsx
            return credentialSchema?.credentialType || '';
        }
    );

export const credentialTypesSchemasByTypesSelector = (
    credentialTypes: string[] = []
) =>
    createSelector(
        credentialTypesSchemasSelector,
        recommendedCredentialTypesSelector,
        (
            schemas: VCLState['credentialTypesSchemas'],
            types: VCLCredentialType[]
        ) => {
            const schemaNames = reduce(
                (acc: string[], curr: VCLCredentialType) => {
                    if (!(curr.credentialType && curr.schemaName)) {
                        vclLogger.error(
                            `Credential doesn't have "credentialType" or "schemaName" fields - ${JSON.stringify(
                                curr
                            )}`
                        );

                        return acc;
                    }

                    return credentialTypes.includes(curr.credentialType)
                        ? [...acc, curr.schemaName]
                        : acc;
                },
                [],
                types
            );

            return pickBy(schemas, (value, key) => schemaNames.includes(key));
        }
    );

export const presentationSchemaSelector = createSelector(
    (state: RootState) => state?.vcl?.presentationSchemas?.items,
    (_: any, credentialType: string) => credentialType,
    (
        presentationSchemas: VCLState['presentationSchemas']['items'],
        credentialType: string
    ) => {
        return presentationSchemas && presentationSchemas[credentialType];
    }
);
