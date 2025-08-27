import {DisplaySchemaProp} from 'app/store/types/claim';
import {selectFirstMatchingPath} from '../credential-values';

const mockDispatch = jest.fn();
const mockSelector = jest.fn();

const countries = [
    {
        payload: {},
        code: 'US',
        name: 'United States of America',
        regions: {
            all: [
                {name: 'Alabama', code: 'AL'},
                {name: 'New York', code: 'NY'}
            ]
        }
    } as any
];

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => mockDispatch,
    useSelector: () => mockSelector
}));

describe('selectFirstMatchingPath', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return the correct country name', () => {
        const schema: DisplaySchemaProp = {
            path: ['$.place.addressCountry'],
            schema: {
                type: 'string'
            },
            label: 'Country of work'
        };
        const subject = {
            place: {
                addressCountry: 'US'
            }
        };
        const result = selectFirstMatchingPath('', subject, schema, countries);
        expect(result.value).toEqual('United States of America');
    });
    it('should return the correct region name', () => {
        const schema: DisplaySchemaProp = {
            path: ['$.place.addressRegion'],
            schema: {
                type: 'string'
            },
            label: 'Region of work'
        };
        const subject = {
            place: {
                addressRegion: 'US-NY'
            }
        };
        const result = selectFirstMatchingPath('', subject, schema, countries);
        expect(result.value).toEqual('New York');
    });
    it('should return country code if no such code in store', () => {
        const schema: DisplaySchemaProp = {
            path: ['$.place.addressCountry'],
            schema: {
                type: 'string'
            },
            label: 'Country of work'
        };
        const subject = {
            place: {
                addressCountry: 'AA'
            }
        };
        const result = selectFirstMatchingPath('', subject, schema, countries);
        expect(result.value).toEqual('AA');
    });
    it('should return region code if no such code in store', () => {
        const schema: DisplaySchemaProp = {
            path: ['$.place.addressRegion'],
            schema: {
                type: 'string'
            },
            label: 'Region of work'
        };
        const subject = {
            place: {
                addressRegion: 'AA-AA'
            }
        };
        const result = selectFirstMatchingPath('', subject, schema, countries);
        expect(result.value).toEqual('AA-AA');
    });
});
