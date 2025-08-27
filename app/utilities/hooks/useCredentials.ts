import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {getCredentials} from 'app/store/actions/profile';
import {RootState} from '../../store/reducers';
import {credentialsByTypeSelector} from '../../store/selectors/profile';
import {ClaimCredential} from '../../store/types/claim';

export const useCredentials = (typesArray?: string[]) => {
    const dispatch = useDispatch();
    const types = typesArray || [];
    const credentials = useSelector<RootState, ClaimCredential[]>(
        credentialsByTypeSelector({types})
    );
    useEffect(() => {
        dispatch(getCredentials());
    }, [dispatch]);
    return credentials;
};
