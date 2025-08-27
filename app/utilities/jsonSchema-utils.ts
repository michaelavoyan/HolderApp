import {VCLCredentialTypeSchema} from '@velocitycareerlabs/vcl-react-native';
import {
    isString,
    mapKeys,
    isObject,
    reduceRight,
    last,
    startsWith
} from 'lodash/fp';

const REF_KEY = '$ref';

export interface PropertyTypesI {
    [key: string]: any;
}

export const parseSchema = (schema: VCLCredentialTypeSchema['payload']) => {
    if (isObject(schema.definitions)) {
        // change all definition names contained '-' due to json-ref-lite library has conflicts with '-'
        const withChangedDefinitionsNames = JSON.parse(
            JSON.stringify(schema, (key: string, value) => {
                if (key === REF_KEY && isString(value) && value.includes('-')) {
                    return value.replace(/-/g, '_');
                }
                // fixed error from ajv: reference from $id field resolves to more than one schema
                if (key === '$id') {
                    return undefined;
                }
                // TODO: it's temp fix, please remove it when according fixes will be applied to UI schemas
                if (startsWith('@', key)) {
                    return undefined;
                }
                return value;
            })
        );
        const definitions = mapKeys(
            (def: string) => def.replace(/-/g, '_'),
            withChangedDefinitionsNames.definitions
        );
        return {...withChangedDefinitionsNames, definitions};
    }

    return schema;
};

export const createObjectFromPath = <T>(path: string[], lastValue?: T) =>
    reduceRight(
        (curr, acc: {[key: string]: any}) => ({
            [curr]: curr === last(path) && lastValue ? lastValue : acc
        }),
        {},
        path
    );
