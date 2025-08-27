import {put} from 'redux-saga/effects';
import VclReactNative from '@velocitycareerlabs/vcl-react-native';
import {Store} from 'redux';
import axios from 'axios';
import {getAppConfigSuccess} from 'app/store/actions';
import {getOrganizationProfileSaga, credentialCategoriesSaga} from '../common';
import {getOrganizationProfileInfoSuccess} from '../../actions/common';

import * as selectors from '../../selectors/appConfig';
import * as actions from '../../actions';
import {initTestsStore} from '../../store';

const organizationDid = 'did:example:123';
const organization = {
    name: 'Example Org',
    did: organizationDid,
    logo: '',
    id: '123',
    payload: {},
    credentialSubject: {},
    serviceTypes: {payload: []}
};
const getVerifiedProfileMocked = jest.spyOn(
    VclReactNative,
    'getVerifiedProfile'
);
getVerifiedProfileMocked.mockReturnValue(Promise.resolve(organization));

const config = {
    baseUrls: {
        walletApi: 'https://example.com'
    }
};

const resp = {
    data: [
        {
            title: 'Category 1',
            icon: 'category1',
            types: ['type1', 'type2'],
            color: '#000000'
        },
        {
            title: 'Category 2',
            icon: 'category2',
            types: ['type1', 'type2'],
            color: '#000000'
        }
    ]
};

let store: Store<any>;
jest.spyOn(axios, 'get');
jest.mock('axios');

describe('getOrganizationProfileSaga', () => {
    it('should dispatch getOrganizationProfileInfoSuccess action with organization data', async () => {
        const generator = await getOrganizationProfileSaga({
            organizationDid,
            type: 'getOrganizationProfile'
        });
        generator.next();
        expect(generator.next(organization).value).toEqual(
            put(
                getOrganizationProfileInfoSuccess(organizationDid, organization)
            )
        );

        expect(generator.next().done).toBe(true);
    });

    it('should log error if getVerifiedProfile throws an error', () => {
        const error = new Error('Something went wrong');
        const gen = getOrganizationProfileSaga({
            organizationDid,
            type: 'getOrganizationProfile'
        });
        gen.next();

        expect(gen.throw(error).value).toEqual(console.error(error));

        expect(gen.next().done).toBe(true);
    });
});

beforeEach(() => {
    store = initTestsStore();
    store.dispatch(getAppConfigSuccess(config as any));
    (axios.create as jest.Mock).mockReturnThis();
});
afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    selectors.configSelector.resetRecomputations();
});
describe('credentialCategoriesSaga', () => {

    it('should dispatch credentialCategoriesSuccess with mapped data', async () => {

        (axios.get as jest.Mock).mockResolvedValueOnce({resp});
        const appConfig = selectors.configSelector(
            store.getState() as any,
        );
        const getCredentialCategoriesSuccess = actions.credentialCategoriesSuccess(
            [
                {
                    title: 'Category 1',
                    icon: 'https://example.com/category-icons/category1.png',
                    types: ['type1', 'type2'],
                    color: '#000000'
                },
                {
                    title: 'Category 2',
                    icon: 'https://example.com/category-icons/category2.png',
                    types: ['type1', 'type2'],
                    color: '#000000'
                }
            ]
        );

        const generator = credentialCategoriesSaga();

        generator.next();
        generator.next(appConfig as any);
        
        expect(generator.next(resp as any).value).toEqual(
            put(getCredentialCategoriesSuccess
            )
        );
        expect(generator.next().done).toBe(true);
    });
});
