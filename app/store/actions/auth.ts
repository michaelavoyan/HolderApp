import {VCLCountries, VCLDidJwk} from '@velocitycareerlabs/vcl-react-native';
import * as actionTypes from '../actionTypes/auth';
import {
    Users,
    AddUserAction,
    UpdateUserAction,
    UserToUpdate,
    User,
    GenerateTempIssuingUserAction
} from '../types/auth';

export const addUser = (action: AddUserAction) => ({
    type: actionTypes.ADD_USER,
    ...action
});

export const getUser = (id: string) => ({
    type: actionTypes.GET_USER,
    id
});

export const getUserSuccess = (
    user: UserToUpdate,
    getStartedFlow: boolean = false
) => ({
    type: actionTypes.GET_USER_SUCCESS,
    user,
    getStartedFlow
});

export const getUserId = () => ({
    type: actionTypes.GET_USER_ID
});

export const getUsers = () => ({
    type: actionTypes.GET_USERS
});

export const getUsersSuccess = (users: Users) => ({
    type: actionTypes.GET_USERS_SUCCESS,
    users
});

export const logout = (user: User) => ({
    type: actionTypes.LOGOUT,
    user
});

export const logoutSuccess = () => ({
    type: actionTypes.LOGOUT_SUCCESS
});

export const setUserIdSuccess = (userId: string) => ({
    type: actionTypes.SET_USER_ID_SUCCESS,
    userId
});

export const setUserId = (
    id: string,
    withoutCheckingBiometry: boolean = false,
    authResp?: boolean
) => ({
    type: actionTypes.SET_USER_ID,
    id,
    withoutCheckingBiometry,
    authResp
});

export const countriesSuccess = (countries: VCLCountries) => ({
    type: actionTypes.COUNTRIES_SUCCESS,
    countries
});

export const getCountries = () => ({
    type: actionTypes.COUNTRIES
});

export const deleteUsers = (users: Users) => ({
    type: actionTypes.DELETE_USERS,
    users
});

export const updateUser = (action: UpdateUserAction) => ({
    type: actionTypes.UPDATE_USER,
    ...action
});

export const logoutWithBackup = (user?: User) => ({
    type: actionTypes.LOGOUT_WITH_BACKUP,
    user
});

export const checkBiometry = () => ({
    type: actionTypes.BIOMETRY_CHECK
});

export const updateBiometryFlag = (needToCheckBiometry: boolean) => ({
    type: actionTypes.UPDATE_CHECK_BIOMETRY_FLAG,
    needToCheckBiometry
});

export const updateIsBiometryGetStartedError = (hasError: boolean) => ({
    type: actionTypes.UPDATE_IS_BIOMETRY_GET_STARTED_ERROR,
    hasError
});

export const disableSelectPersona = (disable: boolean) => ({
    type: actionTypes.DISABLE_SELECT_PERSONA,
    disable
});

export const userIsUpdated = () => ({
    type: actionTypes.USER_IS_UPDATED
});

export const updateInitialDeeplink = (deeplink: string) => ({
    type: actionTypes.UPDATE_INITIAL_DEEPLINK,
    deeplink
});

export const createTemporaryUserToCompleteIssuingAction = (
    action: GenerateTempIssuingUserAction
) => ({
    type: actionTypes.GENERATE_TEMP_ISSUING_USER,
    ...action
});

export const updateShowSplashScreen = (isShownSplashScreen: boolean) => ({
    type: actionTypes.UPDATE_SHOW_SPLASH_SCREEN,
    isShownSplashScreen
});

export const initBackendAccountIfNotExist = () => ({
    type: actionTypes.INIT_BACKEND_ACCOUNT_IF_NOT_EXIST
});

export const initBackendAccountSuccess = () => ({
    type: actionTypes.INIT_BACKEND_ACCOUNT_SUCCESS
});

export const addTermsAndConditionsVersion = (
    version: string,
    accountId: string
) => ({
    type: actionTypes.ADD_TERMS_AND_CONDITIONS_VERSION,
    version,
    accountId
});

export const addTermsAndConditionsVersionSuccess = (version: number) => ({
    type: actionTypes.ADD_TERMS_AND_CONDITIONS_VERSION_SUCCESS,
    version
});

export const saveLatestTermsAndConditionsVersion = (version: number) => ({
    type: actionTypes.SAVE_LATEST_TERMS_AND_CONDITIONS_VERSION,
    version
});

export const setDidJwk = (didJwk: VCLDidJwk | null) => ({
    type: actionTypes.SET_DID_JWK,
    didJwk
});

export const disableBiometry = (isBiometryDisabled: boolean) => ({
    type: actionTypes.DISABLE_BIOMETRY,
    isBiometryDisabled
});
