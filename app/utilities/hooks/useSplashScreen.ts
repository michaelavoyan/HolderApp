import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {isShownSplashScreenSelector} from 'app/store/selectors/auth';
import {updateShowSplashScreen} from 'app/store/actions/auth';

export const useSplashScreen = () => {
    const isShownSplashScreen = useSelector(isShownSplashScreenSelector);
    const dispatch = useDispatch();

    const setShowSplashScreen = useCallback(
        (show: boolean) => {
            dispatch(updateShowSplashScreen(show));
        },
        [dispatch]
    );

    return {isShownSplashScreen, setShowSplashScreen};
};
