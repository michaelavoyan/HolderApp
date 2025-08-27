import {useEffect, useRef, useState} from 'react';
import {AppState, AppStateStatus} from 'react-native';

export const useAppBackgroundState = () => {
    const prevState = useRef<AppStateStatus | null>(null);

    const [appState, setAppState] = useState<AppStateStatus>(
        AppState.currentState
    );

    useEffect(() => {
        const subscription = AppState.addEventListener('change', setAppState);

        return () => subscription.remove();
    }, []);

    useEffect(() => {
        prevState.current = appState;
    }, [appState]);

    return {
        prevState: prevState.current,
        appState
    };
};
