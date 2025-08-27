import {createSelector} from 'reselect';
import {get} from 'lodash/fp';
import {Selectors} from './types';
import {AddIdentityInfoStepE} from '../../components/Profile/typings/types';

export const identityStepSelector = createSelector<
    Selectors<AddIdentityInfoStepE>,
    AddIdentityInfoStepE
>(get('verification.identityStep'), (val: AddIdentityInfoStepE) => val);
