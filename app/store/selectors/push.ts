import {createSelector} from 'reselect';
import {get} from 'lodash/fp';
import {Selectors} from './types';

export const deviceTokenSelector = createSelector<Selectors<string>, string>(
    get('push.deviceToken'),
    (val: string) => val
);

export const disclosureNotificationsCounterSelector = createSelector<
    Selectors<number>,
    number
>(get('push.disclosureNotificationsCounter'), (val: number) => val);
