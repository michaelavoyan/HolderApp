import {set} from 'lodash/fp';
import {AddIdentityInfoStepE} from 'app/components/Profile/typings/types';
import * as actionTypes from '../actionTypes/verification';
import {GenericAction, reducingFunction} from '../helpers/createReducer';
import {VerificationState} from '../types/verification';

const initialState: VerificationState = {
    identityStep: AddIdentityInfoStepE.AddInfo
};

const changeIdentityStep = ({
    identityStep
}: {
    identityStep: AddIdentityInfoStepE;
}) => set('identityStep', identityStep);

const actionReducers = {
    [actionTypes.SET_IDENTITY_STEP_SUCCESS]: changeIdentityStep
};

export const verificationReducer = (
    state = initialState,
    action: GenericAction
): VerificationState =>
    reducingFunction<VerificationState>(actionReducers, state, action);
