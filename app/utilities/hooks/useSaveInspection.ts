import {StackNavigationProp} from '@react-navigation/stack';
import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootStackParamList} from 'app/navigation/StackParamsList';
import {
    saveOriginalInspectionSessionAction,
    clearOriginalInspectionSessionAction
} from 'app/store/actions/disclosure';
import {inspectionSessionSelector} from 'app/store/selectors/disclosure';
import {SelectCredentialToShareParams} from 'app/store/types/disclosure';

export const useSaveInspection = (
    navigation?: StackNavigationProp<
        RootStackParamList,
        | 'DisclosureSelectCredentialToShare'
        | 'DisclosureCredentialsToIssuer'
        | 'CredentialDetails'
        | 'AddPhone'
        | 'AddEmail'
        | 'Issuers'
        | 'AcceptOffers'
        | 'SelectCredentialToShare',
        undefined
    >
) => {
    const inspectionSession = useSelector(inspectionSessionSelector);

    const dispatch = useDispatch();

    const saveInspectionSession = useCallback(
        (sessionData: SelectCredentialToShareParams) => {
            dispatch(saveOriginalInspectionSessionAction(sessionData));
        },
        [dispatch]
    );

    const clearInspectionSession = useCallback(() => {
        dispatch(clearOriginalInspectionSessionAction());
    }, [dispatch]);

    const onIssuingDuringInspectionSuccess = () => {
        if (inspectionSession) {
            navigation?.navigate('SelectCredentialToShare', inspectionSession);
        }
    };

    return {
        inspectionSession,
        saveInspectionSession,
        clearInspectionSession,
        onIssuingDuringInspectionSuccess
    };
};
