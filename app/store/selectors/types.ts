import {RootState} from '../reducers';

export type Selectors<T> = ((state: RootState, ...args: any) => T)[];
