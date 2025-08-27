import LogRocket from '@logrocket/react-native';
import {VCLEnvironment} from '@velocitycareerlabs/vcl-react-native';
import {createStore, applyMiddleware, compose} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import {VCL_ENVIRONMENT} from '../configs';

// This is the root saga that will contain our sagas, or I should say model? XD

// This will contain our reducer for the application
import {rootReducer} from './reducers';
import {rootSaga} from './sagas';
import {setReduxStore} from './helpers/getStore';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
    // @ts-ignore
    // eslint-disable-next-line no-underscore-dangle
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['auth', 'profile', 'disclosure', 'claim', 'common']
};

const middlewares = [sagaMiddleware];

const isEnableReduxLogRocketForDevNetApp =
    VCL_ENVIRONMENT === VCLEnvironment.Dev && !__DEV__;

if (isEnableReduxLogRocketForDevNetApp) {
    middlewares.push(
        LogRocket.reduxMiddleware({
            stateSanitizer: state => ({
                ...state,
                common: {
                    ...state.common,
                    credentialCategories: undefined
                },
                vcl: {
                    ...state.vcl,
                    credentialTypesSchemas: undefined
                }
            })
        })
    );
}

const store = createStore(
    persistReducer(persistConfig, rootReducer),
    {},
    composeEnhancers(applyMiddleware(...middlewares))
);

setReduxStore(store);

export const initTestsStore = () => {
    const testsStore = createStore(
        rootReducer,
        {},
        composeEnhancers(applyMiddleware(...middlewares))
    );

    setReduxStore(testsStore);

    sagaMiddleware.run(rootSaga);

    return testsStore;
};

const persistor = process.env.NODE_ENV !== 'test' ? persistStore(store) : null;

if (process.env.NODE_ENV !== 'test') {
    sagaMiddleware.run(rootSaga);
}

export {store, persistor};
