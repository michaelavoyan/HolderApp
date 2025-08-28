export const SECURITY_LEVEL_ANY = 'MOCK_SECURITY_LEVEL_ANY';
export const SECURITY_LEVEL_SECURE_SOFTWARE =
    'MOCK_SECURITY_LEVEL_SECURE_SOFTWARE';
export const SECURITY_LEVEL_SECURE_HARDWARE =
    'MOCK_SECURITY_LEVEL_SECURE_HARDWARE';
export const STORAGE_TYPE = {KC: 'KC', FB: 'FB'};
export const setGenericPassword = jest.fn().mockResolvedValue('test_password');
export const getGenericPassword = jest.fn().mockResolvedValue('test_password');
export const resetGenericPassword = jest.fn().mockResolvedValue(true);
export const getGenericPasswordForOptions = jest
    .fn()
    .mockResolvedValue('test_password');
