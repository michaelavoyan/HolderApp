import {put} from 'redux-saga/effects';
import {Store} from 'redux';
import axios from 'axios';
import {getAppConfigSuccess} from 'app/store/actions';
import {getPresentationSchemaEffect} from 'app/store/sagas/vcl';
import {configSelector} from '../../selectors/appConfig';
import {initTestsStore} from '../../store';
import * as actions from '../../actions';

const credentialType = 'credentialType';
const displayDescriptorByTypeResponce = undefined as any;

let store: Store<any>;
const config = {
    baseUrls: {
        registrarVnfUrl: 'https://example.com'
    }
};
jest.spyOn(axios, 'get');
jest.mock('axios');

describe('getPresentationSchemaEffect', () => {

    beforeEach(() => {
        store = initTestsStore();
        store.dispatch(getAppConfigSuccess(config as any));
        (axios.create as jest.Mock).mockReturnThis();
    });
    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        configSelector.resetRecomputations();
    });
    it('should dispatch getPresentationSchemaSuccess action with presentation schema', () => {
        const getPresentationSchemaSuccessAction = actions.getPresentationSchemaSuccess(
            credentialType,
            displayDescriptorByTypeResponce
        );
        (axios.get as jest.Mock).mockResolvedValueOnce({displayDescriptorByTypeResponce});

        const generator = getPresentationSchemaEffect({
            credentialType,
            type: 'type'
        });
        const appConfig = configSelector(
            store.getState() as any,
        );
        generator.next();
        generator.next(appConfig as any);

        
        expect(generator.next().value).toEqual(
            put(getPresentationSchemaSuccessAction)
        );

        expect(generator.next().done).toBe(true);
    });
});
