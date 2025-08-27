export const uint8ArrayToString = (key: Uint8Array): string => {
    if (!(key instanceof Uint8Array)) {
        throw new Error('VCL Invalid input: Expected a Uint8Array.');
    }
    return Array.from(key).join(',');
};

export const stringToUint8Array = (key: string): Uint8Array => {
    if (!key || key.length === 0) {
        return new Uint8Array([]);
    }
    const parts = key.split(',').map((item) => {
        const num = Number(item);
        if (Number.isNaN(num)) {
            throw new Error(`VCL Invalid input: '${key}' contains non-numeric values.`);
        }
        return num;
    });
    return new Uint8Array(parts);
};

export const generateRandomSecretKey = (length: number = 64): {
    secretKeyUint8Array: Uint8Array;
    secretKeyString: string;
} => {
    if (length <= 0) {
        throw new Error('VCL Invalid length: Must be a positive integer.');
    }
    const secretKeyUint8Array = crypto.getRandomValues(new Uint8Array(length));
    return {
        secretKeyUint8Array,
        secretKeyString: uint8ArrayToString(secretKeyUint8Array),
    };
};

export const validateKeyFormat = (key: string | null): boolean => {
    return !!key && key.split(',').every((item) => {
        const num = Number(item);
        return !Number.isNaN(num);
    });
};
