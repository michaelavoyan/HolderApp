import {getOr, set, filter, map, assign} from 'lodash/fp';
import {VCLCountries, VCLDidJwk} from '@velocitycareerlabs/vcl-react-native';
import {AuthState, Users, User, UserToUpdate} from '../types/auth';
import * as actionTypes from '../actionTypes/auth';
import {GenericAction, reducingFunction} from '../helpers/createReducer';
import {updateOauthTokens} from '../../storage/oauth';

const DEFAULT_USER = {
    id: '',
    name: '',
    image: '',
    accountId: ''
};

const initialState: AuthState = {
    users: [],
    user: DEFAULT_USER,
    userId: null,
    countries: [],
    regions: {},
    needToCheckBiometry: true,
    isBiometryGetStartedError: false,
    disableSelectPersona: false,
    savedInitialDeeplink: '',
    isShownSplashScreen: true,
    isBiometryDisabled: false,
    termsAndConditionsAgreedVersion: undefined,
    termsAndConditionsLatestVersion: undefined,
    didJwk: null
};

const addUserSuccess = ({user}: {user: User}, state: AuthState) =>
    set('users', [...state.users, user]);

const getUserSuccess = (
    action: {user: UserToUpdate; getStartedFlow: boolean},
    state: AuthState
) => {
    if (action.user.accountId) {
        updateOauthTokens({active: true}, action.user.accountId);
    }

    return assign(
        state,
        action.getStartedFlow
            ? {user: action.user}
            : {
                  user: action.user,
                  userId: getOr('', 'user.id', action)
              }
    );
};

const getUserIdSuccess = ({userId}: {userId: string}) => set('userId', userId);

const getUsersSuccess = ({users}: {users: Users}) => set('users', users);

const countriesSuccess = ({countries}: {countries: VCLCountries}) =>
    set('countries', countries.all);

const logoutSuccess = (_: any, state: AuthState) =>
    assign(state, {
        user: DEFAULT_USER,
        userId: '',
        needToCheckBiometry: false,
        termsAndConditionsAgreedVersion: undefined,
        termsAndConditionsLatestVersion: undefined
    });

const deleteUsers = ({users}: {users: Users}, state: AuthState) =>
    assign(state, {
        users: filter(
            (user) => !map('id', users).includes(user.id),
            state.users
        )
    });

const updateCheckBiometryFlag = ({
    needToCheckBiometry
}: {
    needToCheckBiometry: boolean;
}) => set('needToCheckBiometry', needToCheckBiometry);

const disableSelectPersona = ({disable}: {disable: boolean}) =>
    set('disableSelectPersona', disable);

const updateIsBiometryGetStartedError = ({hasError}: {hasError: boolean}) =>
    set('isBiometryGetStartedError', hasError);

const addTermsAndConditionsAgreedVersionSuccess = ({
    version
}: {
    version: number;
}) => set('termsAndConditionsAgreedVersion', version);

const saveLatestTermsAndConditionsVersion = ({version}: {version: number}) =>
    set('termsAndConditionsLatestVersion', version);

const updateInitialDeeplink = ({deeplink}: {deeplink: string}) =>
    set('savedInitialDeeplink', deeplink);

const setShowSplashScreen = (
    {
        isShownSplashScreen
    }: {
        isShownSplashScreen: boolean;
    },
    state: AuthState
) => {
    if (isShownSplashScreen) {
        return assign(state, {isShownSplashScreen, needToCheckBiometry: true});
    }
    return set('isShownSplashScreen', isShownSplashScreen);
};

const setDidJwk = ({didJwk}: {didJwk: VCLDidJwk | null}) =>
    set('didJwk', didJwk);

const setDisableBiometry = ({
    isBiometryDisabled
}: {
    isBiometryDisabled: boolean;
}) => set('isBiometryDisabled', isBiometryDisabled);

const actionReducers = {
    [actionTypes.ADD_USER]: addUserSuccess,
    [actionTypes.GET_USER_SUCCESS]: getUserSuccess,
    [actionTypes.GET_USERS_SUCCESS]: getUsersSuccess,
    [actionTypes.SET_USER_ID_SUCCESS]: getUserIdSuccess,
    [actionTypes.COUNTRIES_SUCCESS]: countriesSuccess,
    [actionTypes.LOGOUT_SUCCESS]: logoutSuccess,
    [actionTypes.DELETE_USERS]: deleteUsers,
    [actionTypes.UPDATE_CHECK_BIOMETRY_FLAG]: updateCheckBiometryFlag,
    [actionTypes.UPDATE_IS_BIOMETRY_GET_STARTED_ERROR]:
        updateIsBiometryGetStartedError,
    [actionTypes.DISABLE_SELECT_PERSONA]: disableSelectPersona,
    [actionTypes.UPDATE_INITIAL_DEEPLINK]: updateInitialDeeplink,
    [actionTypes.UPDATE_SHOW_SPLASH_SCREEN]: setShowSplashScreen,
    [actionTypes.ADD_TERMS_AND_CONDITIONS_VERSION_SUCCESS]:
        addTermsAndConditionsAgreedVersionSuccess,
    [actionTypes.SAVE_LATEST_TERMS_AND_CONDITIONS_VERSION]:
        saveLatestTermsAndConditionsVersion,
    [actionTypes.SET_DID_JWK]: setDidJwk,
    [actionTypes.DISABLE_BIOMETRY]: setDisableBiometry
};

export const authReducer = (
    state = initialState,
    action: GenericAction
): AuthState => reducingFunction<AuthState>(actionReducers, state, action);
