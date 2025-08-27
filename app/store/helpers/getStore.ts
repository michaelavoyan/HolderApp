import {Store} from 'redux';

let rootReduxStore: Store;

export const setReduxStore = (store: Store) => {
    rootReduxStore = store;
};

export const getReduxStore = () => rootReduxStore;
