import {
    CommonActions,
    createNavigationContainerRef,
    StackActions
} from '@react-navigation/core';
import {get} from 'lodash/fp';

export const navigator = createNavigationContainerRef();

export enum NavigateOptions {
    GoBack = 'goBack',
    Replace = 'replace',
    Push = 'push'
}

// eslint-disable-next-line import/no-mutable-exports
export let timeout: ReturnType<typeof setTimeout>;
export const navigate = ({
    name,
    params,
    option
}: {
    name: string;
    params?: {
        [_: string]: any;
    };
    option?: NavigateOptions;
}) => {
    if (navigator.current) {
        if (timeout) {
            clearTimeout(timeout);
        }
        if (params?.callback) {
            params.callback({navigator, name, params});
            return;
        }
        get(option || NavigateOptions.Push, {
            [NavigateOptions.Push]: () =>
                navigator.current!.navigate({
                    name,
                    params
                } as never),
            [NavigateOptions.GoBack]: () => navigator.current!.goBack(),
            [NavigateOptions.Replace]: () =>
                navigator.current!.dispatch(StackActions.replace(name, params))
        })();
    } else {
        if (timeout) {
            clearTimeout(timeout);
        }
        // If navigation is not initialized we try another attempt
        timeout = setTimeout(() => {
            navigate({name, params});
        }, 500);
    }
};

export const navigateBack = () => {
    navigate({name: '', option: NavigateOptions.GoBack});
};

export const cleanRoute = (name: string, params?: any) => {
    if (navigator.current) {
        navigator.current.dispatch((state) => {
            let routes = state.routes.filter((r) => r.name !== name);
            if (params) {
                routes = state.routes.filter(
                    (r) => JSON.stringify(r.params) !== JSON.stringify(params)
                );
            }
            if (routes.length > 0) {
                return CommonActions.reset({
                    ...state,
                    index: routes.length - 1,
                    routes
                });
            }
            return  CommonActions.navigate({name: 'Tabs'});
        });
    }
};

export const resetNavigation = () => {
    if (navigator.current) {
        navigator.current.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{name: 'Tabs'}]
            })
        );
    }
};

export const getNavigatorAsync = (): Promise<
    ReturnType<typeof createNavigationContainerRef>
> =>
    new Promise((resolve) => {
        const checkNavigator = () => {
            if (navigator.isReady()) {
                resolve(navigator);

                return;
            }

            setTimeout(checkNavigator, 50);
        };
        checkNavigator();
    });
