export const SelfReportedObject = {
    name: 'SelfReportedObject',
    primaryKey: 'id',
    properties: {
        type: 'string[]',
        id: 'string?',
        logo: 'string?',
        note: 'string?',
        credentialSchema: 'CredentialSchema?',
        credentialSubject: 'string?',
        userId: 'string',
        jwt: 'string',
        isSelf: {default: true, type: 'bool', optional: true},
        status: 'string?'
    }
};
