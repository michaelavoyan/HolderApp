import {createSelector} from 'reselect';
import {get, lowerCase, getOr, sortBy} from 'lodash/fp';

import {VCLCountry} from '@velocitycareerlabs/vcl-react-native';
import {CountryCodes, FullUser, User} from '../types/auth';
import {Selectors} from './types';

export const userSelector = createSelector<Selectors<FullUser>, FullUser>(
    get('auth.user'),
    (val: FullUser) => val
);

export const userIdSelector = createSelector<Selectors<string>, string>(
    get('auth.userId'),
    (val: string) => val
);

export const usersSelector = createSelector<Selectors<User[]>, User[]>(
    get('auth.users'),
    sortBy([
        (val: User) =>
            `${lowerCase(getOr('', 'firstName.localized.en', val))}
                ${lowerCase(getOr('', 'lastName.localized.en', val))}`
    ])
);

export const countriesSelector = createSelector<
    Selectors<VCLCountry[]>,
    VCLCountry[]
>(get('auth.countries'), (val: VCLCountry[]) => val);

export const regionsSelector = createSelector<
    Selectors<CountryCodes | {}>,
    CountryCodes | {}
>(get('auth.regions'), (val: CountryCodes | {}) => val);

export const needToCheckBiometrySelector = createSelector<
    Selectors<boolean>,
    boolean
>(get('auth.needToCheckBiometry'), (val: boolean) => val);

export const isBiometryGetStartedErrorSelector = createSelector<
    Selectors<boolean>,
    boolean
>(get('auth.isBiometryGetStartedError'), (val: boolean) => val);

export const isSelectPersonaDisabledSelector = createSelector<
    Selectors<boolean>,
    boolean
>(get('auth.disableSelectPersona'), (val: boolean) => val);

export const initialDeeplinkSelector = createSelector<
    Selectors<string>,
    string
>(get('auth.savedInitialDeeplink'), (val: string) => val);

export const isShownSplashScreenSelector = createSelector<
    Selectors<boolean>,
    boolean
>(get('auth.isShownSplashScreen'), (val: boolean) => val);

export const termsAndConditionsAgreedVersionSelector = createSelector<
    Selectors<number | undefined>,
    number | undefined
>(get('auth.termsAndConditionsAgreedVersion'), (val?: number) => val);

export const termsAndConditionsLatestVersionSelector = createSelector<
    Selectors<number | undefined>,
    number | undefined
>(get('auth.termsAndConditionsLatestVersion'), (val?: number) => val);

export const didJwkSelector = createSelector<
    Selectors<string | undefined>,
    string | undefined
>(get('auth.didJwk.did'), (val: string | undefined) => val);

export const isBiometryDisabledSelector = createSelector<
    Selectors<boolean>,
    boolean
>(get('auth.isBiometryDisabled'), (val: boolean) => val);
