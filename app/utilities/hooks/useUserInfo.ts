import {useDispatch, useSelector} from 'react-redux';
import {useContext, useEffect} from 'react';
import {ConnectionContext} from 'app/components/common/ConnectionWatcher';
import {userSelector, userIdSelector} from 'app/store/selectors/auth';
import {FullUser} from '../../store/types/auth';
import {getUser} from '../../store/actions';

export const useUserInfo = () => {
    const user: FullUser = useSelector(userSelector);
    const userId: string = useSelector(userIdSelector);
    const isConnected = useContext(ConnectionContext);
    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch if not loaded
        if (isConnected && (!user.id || userId !== user.id) && userId) {
            dispatch(getUser(userId));
        }
    }, [userId, isConnected, user.id, dispatch]);

    return user;
};
