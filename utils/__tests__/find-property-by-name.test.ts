import { findPropertyByName } from '../find-property-by-name';

describe('findProperty', () => {
    it('should return the value of a top-level property', () => {
        const obj = { key: 'value', anotherKey: 42 };
        expect(findPropertyByName(obj, 'key')).toBe('value');
        expect(findPropertyByName(obj, 'anotherKey')).toBe(42);
    });

    it('should return the value of a nested property', () => {
        const obj = {
            level1: {
                level2: {
                    target: 'found me!',
                },
            },
        };
        expect(findPropertyByName(obj, 'target')).toBe('found me!');
    });

    it('should return null if the property does not exist', () => {
        const obj = { key: 'value' };
        expect(findPropertyByName(obj, 'missingKey')).toBeNull();
    });

    it('should return null if the input is not an object', () => {
        expect(findPropertyByName(null, 'key')).toBeNull();
        expect(findPropertyByName(undefined, 'key')).toBeNull();
        expect(findPropertyByName(42, 'key')).toBeNull();
        expect(findPropertyByName('string', 'key')).toBeNull();
    });

    it('should handle objects with arrays and return the property if found', () => {
        const obj = {
            array: [
                { nestedKey: 'found in array' },
                { anotherKey: 'ignored' },
            ],
        };
        expect(findPropertyByName(obj, 'nestedKey')).toBe('found in array');
    });

    it('should return null if the property is not in deeply nested objects', () => {
        const obj = {
            level1: {
                level2: {
                    level3: {},
                },
            },
        };
        expect(findPropertyByName(obj, 'nonExistentKey')).toBeNull();
    });

    it('should work with arrays as top-level objects', () => {
        const obj = [
            { key: 'value1' },
            { key: 'value2', target: 'found' },
        ];
        expect(findPropertyByName(obj, 'target')).toBe('found');
    });

    it('should stop searching after finding the first match', () => {
        const obj = {
            key: 'value1',
            nested: {
                key: 'value2', // This should not be returned
                target: 'found',
            },
        };
        expect(findPropertyByName(obj, 'key')).toBe('value1');
    });
});
