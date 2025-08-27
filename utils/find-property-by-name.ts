import _ from 'lodash';

export const findPropertyByName = (
    obj: any,
    property: any,
    visited = new Set()
) => {
    if (!obj || typeof obj !== 'object')
        return null;

    // Check if the object has already been visited
    if (visited.has(obj))
        return null;

    // Mark the current object as visited
    visited.add(obj);

    // Safely check if the property exists in the current object
    if (_.has(obj, property)) {
        return obj[property];
    }

    // Handle arrays by using _.some()
    if (Array.isArray(obj)) {
        let result = null;
        _.some(obj, item => {
            result = findPropertyByName(item, property, visited);
            return result !== null; // Stop iterating if the property is found
        });
        return result;
    }

    // Use _.entries to iterate over the object's key-value pairs
    let result = null;
    _.some(_.entries(obj), ([, value]) => {
        result = findPropertyByName(value, property, visited);
        return result !== null; // Stop iterating if the property is found
    });

    return result;
};
