import {isFunction} from 'lodash/fp';

export interface ActionReducers<S> {
    [action: string]: (p: any, s: S) => S | ((s: S) => S);
}

export interface GenericAction {
    type: string;
    payload?: any;
}

export const wrappingFunction = (
    maybeFunction: Function | any,
    ...args: Array<any>
) => (isFunction(maybeFunction) ? maybeFunction(...args) : maybeFunction);

export const reducingFunction = <S>(
    actionReducers: ActionReducers<S>,
    state: S,
    action: GenericAction
) => {
    const reducingFunc = actionReducers[action.type];
    return reducingFunc
        ? wrappingFunction(reducingFunc(action, state), state)
        : state;
};
