import * as RN from 'react-native';
import {VCLCountry, VCLRegions} from '@velocitycareerlabs/vcl-react-native';
import * as SchemaFormActions from '../SchemaFormContainer';

const regions: VCLRegions = {
    all: {
        AL: {name: 'Alabama', code: 'AL', payload: {region: 'AL'}},
        NY: {name: 'New York', code: 'NY', payload: {region: 'NY'}}
    }
};
const countries: VCLCountry[] = [
    {
        code: 'US',
        name: 'United States of America',
        payload: {country: 'US'},
        regions
    }
];

const onSubmit = jest.fn();

jest.spyOn(RN.Keyboard, 'dismiss');
jest.spyOn(SchemaFormActions, 'onSubmitCallback');

describe('submit', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should call onSubmit with correct values and dismiss keyboard', () => {
        const values = {
            name: 'John Doe',
            place: {
                addressCountry: 'United States of America'
            }
        };
        const event = {params: {values}};

        SchemaFormActions.onSubmitCallback(event, countries, onSubmit);

        expect(onSubmit).toHaveBeenCalledWith({
            name: 'John Doe',
            place: {
                addressCountry: 'US'
            }
        });
        expect(RN.Keyboard.dismiss).toHaveBeenCalled();
    });

    it('should not modify values if addressCountry is not present', () => {
        const values = {
            name: 'John Doe'
        };
        const event = {params: {values}};

        SchemaFormActions.onSubmitCallback(event, countries, onSubmit);

        expect(onSubmit).toHaveBeenCalledWith({
            name: 'John Doe'
        });
        expect(RN.Keyboard.dismiss).toHaveBeenCalled();
    });

    it('should not modify values if country name is not found', () => {
        const values = {
            name: 'John Doe',
            place: {
                addressCountry: 'Mexico'
            }
        };
        const event = {params: {values}};

        SchemaFormActions.onSubmitCallback(event, countries, onSubmit);

        expect(onSubmit).toHaveBeenCalledWith({
            name: 'John Doe',
            place: {
                addressCountry: 'Mexico'
            }
        });
        expect(RN.Keyboard.dismiss).toHaveBeenCalled();
    });
});
