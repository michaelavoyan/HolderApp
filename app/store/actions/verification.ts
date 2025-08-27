import * as actionTypes from '../actionTypes/verification';
import {
    CompleteVerificationAction,
    StartVerificationAction
} from '../types/verification';
import {AddIdentityInfoStepE} from '../../components/Profile/typings/types';

export const startVerification = (action: StartVerificationAction) => ({
    type: actionTypes.START_VERIFICATION,
    ...action
});

export const completeVerification = (action: CompleteVerificationAction) => ({
    type: actionTypes.COMPLETE_VERIFICATION,
    ...action
});

export const changeIdentityStep = (identityStep: AddIdentityInfoStepE) => ({
    type: actionTypes.SET_IDENTITY_STEP_SUCCESS,
    identityStep
});
