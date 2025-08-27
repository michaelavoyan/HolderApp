import {v4 as uuidv4} from 'uuid';
import {get, getOr, map, last, find, filter, includes} from 'lodash/fp';
import {VCLVerifiedProfile} from '@velocitycareerlabs/vcl-react-native';
import {findCredentialType} from 'app/utilities/helpers';
import {jwtDecode} from './core';
import {generateCredentialJwt, generatePresentationJwt} from './verifiables';
import {
    DisclosureFromPresentation,
    IIdCredentials,
    SubmissionRequirement
} from '../store/types/disclosure';
import {SubmissionRequirementsRules} from '../utilities/types';

export const createPresentationWithSubmission = ({
    definitionId,
    verifiableCredential,
    verifier,
    holder
}: {
    definitionId: string;
    verifiableCredential: string[];
    verifier: string;
    holder?: string;
}) => {
    const submission = {
        id: uuidv4(),
        definition_id: definitionId,
        descriptor_map: verifiableCredential.map((item, index: number) => {
            const decryptedCred = jwtDecode(item);
            return {
                id: findCredentialType(decryptedCred?.claimsSet?.vc?.type),
                path: `$.verifiableCredential[${index}]`,
                format: 'jwt_vc'
            };
        })
    };
    const presentation = {
        id: uuidv4(),
        holder: holder || uuidv4(),
        verifier,
        type: ['VerifiablePresentation'],
        verifiableCredential,
        presentation_submission: submission
    };

    return generatePresentationJwt(presentation);
};

export const createSelfSignedCredential = async (subject: {}, type: string) => {
    const id = uuidv4();

    const vcPayload = {
        '@context': ['https://www.w3.org/2018/credentials/v1'],
        id,
        type: [type, 'VerifiableCredential'],
        issuer: {id},
        issued: new Date().toISOString(),
        credentialSubject: subject
    };
    return generateCredentialJwt(vcPayload);
};

export const inputDescriptors = ({
    rule,
    claimsSet
}: {
    rule: SubmissionRequirementsRules;
    claimsSet: object;
}) => {
    const submissionRequirements = find(
        (requirement: SubmissionRequirement) => requirement?.rule === rule,
        get('presentation_definition.submission_requirements', claimsSet)
    );
    return submissionRequirements
        ? filter(
              (descriptor: IIdCredentials) =>
                  includes(submissionRequirements?.from, descriptor?.group),
              get('presentation_definition.input_descriptors', claimsSet)
          )
        : [];
};

export const parsePresentationRequest = (
    presentationRequestJwt: string,
    verifiedProfile: VCLVerifiedProfile
): DisclosureFromPresentation => {
    const {claimsSet} = jwtDecode(presentationRequestJwt);
    const definitionId = getOr('', 'presentation_definition.id', claimsSet);
    const inspectionsInputDescriptors = inputDescriptors({
        rule: SubmissionRequirementsRules.Inspection,
        claimsSet
    });
    return {
        id: last(definitionId.split('.'))!,
        definitionId,
        verifier: claimsSet.iss,
        holder: claimsSet.aud,
        types: map(
            item => ({type: get('id', item)}),
            inspectionsInputDescriptors
        ),
        organization: {
            name: getOr('', 'name', verifiedProfile),
            logo: getOr('', 'logo', verifiedProfile),
            brandName: getOr('', 'metadata.client_name', claimsSet),
            brandImage: getOr('', 'metadata.logo_uri', claimsSet)
        },
        purpose: getOr('', 'presentation_definition.purpose', claimsSet),
        name: getOr('', 'presentation_definition.name', claimsSet),
        termsUrl: getOr('', 'metadata.tos_uri', claimsSet),
        duration: getOr('', 'metadata.max_retention_period', claimsSet),
        exchangeId: getOr('', 'exchange_id', claimsSet)
    };
};
