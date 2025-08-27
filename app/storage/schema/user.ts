export const User = {
    name: 'Profile',
    primaryKey: 'id',
    properties: {
        id: 'string',
        accountId: 'string?',
        name: 'string?',
        image: 'string?',
        isRetained: 'bool?'
    }
};
