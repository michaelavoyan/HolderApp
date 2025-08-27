import {setShowDisclosureTutorial} from 'app/store/actions/profile';
import {showDisclosureTutorialSelector} from 'app/store/selectors/profile';
import {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';

export const useDisclosureTutorial = () => {
    const dispatch = useDispatch();
    const showDisclosureTutorial = useSelector(showDisclosureTutorialSelector);

    const handleSetShowDisclosureTutorial = useCallback(
        (val: boolean) => {
            dispatch(setShowDisclosureTutorial(val));
        },
        [dispatch]
    );

    return {
        showDisclosureTutorial,
        setShowDisclosureTutorial: handleSetShowDisclosureTutorial
    };
};
