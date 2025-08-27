import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {initBackendAccountIfNotExist} from '../../../store/actions/auth';
import {userIdSelector, userSelector} from '../../../store/selectors';

/**
 * This hook is used to initialize backend account if it doesn't exist.
 * This might happen after app update for app versions that didn't have OAuth enabled.
 */
export const useInitBackendAccountIfNotExist = async (isCanCheck: boolean) => {
    const dispatch = useDispatch();
    const user = useSelector(userSelector);
    const isUserLoggedIn = useSelector(userIdSelector);
    const isUserCreatedBeforeOauthEnabled =
        isUserLoggedIn && user.id && !user.accountId;

    useEffect(() => {
        if (isCanCheck && isUserCreatedBeforeOauthEnabled) {
            dispatch(initBackendAccountIfNotExist());
        }
    }, [dispatch, isCanCheck, isUserCreatedBeforeOauthEnabled]);
};
