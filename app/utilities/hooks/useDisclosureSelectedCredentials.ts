import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setDisclosureSelectedCredentials} from 'app/store/actions/disclosure';
import {disclosureSelectedCredentialsSelector} from 'app/store/selectors/disclosure';
import {SharedCredentials} from 'app/store/types/disclosure';

export const useDisclosureSelectedCredentials = () => {
    const selectedCredentials = useSelector(
        disclosureSelectedCredentialsSelector
    );
    const dispatch = useDispatch();

    const setSelectedCredentials = useCallback(
        (credentials: SharedCredentials[]) => {
            dispatch(setDisclosureSelectedCredentials(credentials));
        },
        [dispatch]
    );

    const clearSelecrtedCredentials = useCallback(() => {
        dispatch(setDisclosureSelectedCredentials([]));
    }, [dispatch]);

    return {
        selectedCredentials,
        setSelectedCredentials,
        clearSelecrtedCredentials
    };
};
