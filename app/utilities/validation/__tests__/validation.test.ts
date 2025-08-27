import {
    BLANK_PROFILE,
    MAX_LENGTH_EXCEEDED,
    NO_SPECIAL_CHARACTERS,
    validateEmptyValue,
    validateMaxLength,
    validateProfile,
    validateSpecialCharacters
} from '../validate-utils';

describe('Test validation utils', () => {
    beforeEach(async () => {
        jest.clearAllMocks();
    });

    describe('Test validateSpecialCharacters', () => {
        it('should return true when string has special characters (!)', () => {
            expect(validateSpecialCharacters('!asdf')).toEqual(true);
        });

        it('should return true when string has special characters (@)', () => {
            expect(validateSpecialCharacters('a@sdf')).toEqual(true);
        });

        it('should return true when string has special characters (#)', () => {
            expect(validateSpecialCharacters('asd#f')).toEqual(true);
        });

        it('should return false when string has no special characters', () => {
            expect(validateSpecialCharacters('asdf')).toEqual(false);
        });
    });

    describe('Test validateEmptyValue', () => {
        it('should return true when string is empty', () => {
            expect(validateEmptyValue('')).toEqual(true);
        });

        it('should return false when string is not empty', () => {
            expect(validateEmptyValue('test')).toEqual(false);
        });
    });

    describe('Test validateMaxLength', () => {
        it('should return true when string length is more than maxLength value', () => {
            expect(validateMaxLength('asdf', 3)).toEqual(true);
        });

        it('should return false when string length is equal to maxLength value', () => {
            expect(validateMaxLength('asd', 3)).toEqual(false);
        });

        it('should return false when string length is less than maxLength value', () => {
            expect(validateMaxLength('as', 3)).toEqual(false);
        });
    });

    describe('Test validateProfile', () => {
        it('should return empty string when profile is valid', () => {
            expect(validateProfile('John')).toEqual('');
        });

        it('should return BLANC_PROFILE error message with empty string', () => {
            expect(validateProfile('')).toEqual(BLANK_PROFILE);
        });

        it('should return MAX_LENGTH_EXCEEDED error message with a profile with long length', () => {
            expect(
                validateProfile('Looooooooong profile naaaaaaaaaaaaaaame')
            ).toEqual(MAX_LENGTH_EXCEEDED);
        });

        it('should return NO_SPECIAL_CHARACTERS error message with a profile with special symbols', () => {
            expect(validateProfile('Johnb$')).toEqual(NO_SPECIAL_CHARACTERS);
        });
    });
});
