export const Disclosure = {
    name: 'Disclosure',
    primaryKey: 'id',
    properties: {
        id: 'string?',
        type: 'string[]',
        purpose: 'string?',
        name: 'string?',
        duration: 'string?',
        expiresAt: 'string?',
        termsUrl: 'string?',
        creationDate: 'string?',
        deactivationDate: 'string?',
        organization: 'Organization?',
        credentialIds: 'string[]',
        credentials: 'CredentialHistoryObject[]',
        sharedTypes: 'string[]',
        userId: 'string',
        subType: 'string?',
        status: 'string?',
        exchangeId: 'string?',
        presentationDefinitionId: 'string?',
        presentationId: 'string?'
    }
};
