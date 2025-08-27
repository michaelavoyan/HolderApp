import {setIsDebugOn as setIsDebugOnAction} from 'app/store/actions/appConfig';
import {configIsDebugOnSelector, isDebugOnSelector} from 'app/store/selectors/appConfig'
import {useCallback} from 'react';
import {useDispatch ,useSelector} from 'react-redux';

export const useSdkDebug = () => {
    const isDebugOn = useSelector(isDebugOnSelector);
    const configIsDebugOn = useSelector(configIsDebugOnSelector);
    const dispatch = useDispatch()

    const setIsDebugOn = useCallback((toValue: boolean) => {
        dispatch(setIsDebugOnAction(toValue))
    }, [dispatch])

    return {isDebugOn: isDebugOn || configIsDebugOn, setIsDebugOn};
}