import {
    uint8ArrayToString,
    stringToUint8Array,
    generateRandomSecretKey,
    validateKeyFormat
} from 'app/utilities/encrypted-data/key-generator';

jest.mock('app/utilities/logger', () => ({
    vclLogger: {
        info: jest.fn(),
        warn: jest.fn(),
        error: jest.fn(),
    },
}));

describe('Key Generator Tests', () => {
    describe('uint8ArrayToString', () => {
        it('should convert Uint8Array to a string', () => {
            const input = new Uint8Array([1, 2, 3]);
            expect(uint8ArrayToString(input)).toBe('1,2,3');
        });

        it('should throw an error if input is not Uint8Array', () => {
            expect(() => uint8ArrayToString([1, 2, 3] as any)).toThrow('VCL Invalid input: Expected a Uint8Array.');
        });
    });

    describe('stringToUint8Array', () => {
        it('should convert a valid string to Uint8Array', () => {
            const input = '1,2,3';
            const result = stringToUint8Array(input);
            expect(result).toEqual(new Uint8Array([1, 2, 3]));
        });

        it('should return an empty Uint8Array for an empty string', () => {
            expect(stringToUint8Array('')).toEqual(new Uint8Array([]));
        });

        it('should throw an error for a string with non-numeric values', () => {
            expect(() => stringToUint8Array('1,2,abc')).toThrow("VCL Invalid input: '1,2,abc' contains non-numeric values.");
        });
    });

    describe('generateRandomSecretKey', () => {
        it('should generate a random secret key of the specified length', () => {
            const length = 16;
            const { secretKeyUint8Array, secretKeyString } = generateRandomSecretKey(length);
            expect(secretKeyUint8Array).toHaveLength(length);
            expect(secretKeyString.split(',')).toHaveLength(length);
        });

        it('should throw an error if length is not positive', () => {
            expect(() => generateRandomSecretKey(0)).toThrow('VCL Invalid length: Must be a positive integer.');
        });
    });

    describe('validateKeyFormat', () => {
        it('should return true for a valid key format', () => {
            expect(validateKeyFormat('1,2,3')).toBe(true);
        });

        it('should return false for a key with non-numeric values', () => {
            expect(validateKeyFormat('1,2,abc')).toBe(false);
        });

        it('should return false for null or empty input', () => {
            expect(validateKeyFormat(null)).toBe(false);
            expect(validateKeyFormat('')).toBe(false);
        });
    });
});
