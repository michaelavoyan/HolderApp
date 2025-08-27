import {
    call,
    put,
    select,
    take,
    takeEvery,
    takeLatest
} from 'redux-saga/effects';
import {v4 as uuidv4} from 'uuid';
import {
    VCLCountries,
    VCLDidJwk,
    VCLDidJwkDescriptor,
    VCLSignatureAlgorithm
} from '@velocitycareerlabs/vcl-react-native';
import {get} from 'lodash/fp';
import {Alert, Linking} from 'react-native';
import {
    getDeviceToken,
    removeLinkedInAccessToken,
    removeUserId,
    saveUserId
} from 'app/storage/asyncStorage';
import {
    addUser,
    deleteUsers,
    getUsers,
    getUser,
    updateUser
} from 'app/storage/user';

import {invokeBiometryAlertOnce} from 'app/utilities/biometry';
import {isIOS} from 'app/utilities/helpers';
import {localConfigs} from 'app/configs';

import {getFcmToken} from 'app/push/initializePush';
import i18n from '../../../i18n';
import {vclLogger} from '../../../utilities/logger';
import * as actionTypes from '../../actionTypes/auth';
import {
    LogoutAction,
    SetUserIdAction,
    AddUserSaga,
    UpdateUserSaga,
    Users,
    FullUser,
    GenerateTempIssuingUserSaga,
    AddTermsAndConditionsConsentAction
} from '../../types/auth';
import * as actions from '../../actions';
import {AddIdentityInfoStepE} from '../../../components/Profile/typings/types';
import {ERRORS} from '../errors/auth';
import {resetDataFromRealm} from '../../../storage/common';
import {UserAction} from '../../../storage/type';
import {
    closePopup,
    openLoadingPopup,
    openStatusPopup
} from '../../../utilities/popups';
import {StatusMessages} from '../../../screens/popups/type';
import {PopupScreens} from '../../../navigation/StackParamsList';
import {
    generateTemporaryUserToCompleteIssuing,
    linkHandler
} from '../../../utilities/qr';
import {DeepLinkOptions} from '../../../utilities/types';
import {
    configSelector,
    needToCheckBiometrySelector,
    userSelector
} from '../../selectors';
import {
    OAuthProps,
    getOauthTokens,
    inactivateOauthTokens,
    removeOauthTokens,
    updateOauthTokens
} from '../../../storage/oauth';

import {IConfig} from '../../types/appConfig';

import {
    AccountResponse,
    createAccount,
    getAccount
} from '../../../api/auth.service';
import {AccessTokenScopes, refreshTokenRequest} from '../../../api/api';
import {initBackendAccountSuccess} from '../../actions/auth';
import {isAccountCreatedEffect} from './effects/isAccountCreatedEffect';
import {addConsentVersion} from '../../../api/consents.service';
import {didJwkSelector, usersSelector} from '../../selectors/auth';
import {formatDidJwk} from '../utils/didJwk';
import {jwtDecode} from '../../../jwt/core';
import {VclReactNativeSdkWrapper} from '../../../api/vcl-react-native-sdk-wrapper';

const requiredScopes = [
    AccessTokenScopes.Account,
    AccessTokenScopes.Inbox,
    AccessTokenScopes.Jwt,
    AccessTokenScopes.KeyCreate
];

function* registerDeviceEffect() {
    const hasToken: string | null = yield getDeviceToken();
    if (!hasToken) {
        yield put(actions.registerDevice());
    }
}

/*
 * Get Started flow
 */
function* addUserEffect(action: AddUserSaga) {
    try {
        if (action.user) {
            const id = action.user.id || uuidv4();
            const user = {...action.user, id};
            const userResp: boolean = yield addUser(user);
            let authResp: boolean = false;

            if (!userResp) {
                openStatusPopup({params: ERRORS.addUser});
                return;
            }

            if (action.withSelectPersona) {
                authResp = yield invokeBiometryAlertOnce();
                yield put(actions.updateIsBiometryGetStartedError(!authResp));
                if (authResp) {
                    if (action.closePopupAfterBiometry) {
                        closePopup(PopupScreens.STATUS_POPUP);
                    }
                    yield put(actions.setUserId(id, true, authResp));
                    yield put(actions.getUserSuccess(user));
                } else {
                    yield deleteUsers([user]);
                }
            }
            if (action.getStartedFlow) {
                yield put(
                    actions.changeIdentityStep(AddIdentityInfoStepE.AddInfo)
                );
            }

            return;
        }

        openStatusPopup({params: ERRORS.addUser});
    } catch (error) {
        vclLogger.error(error, error);
        openStatusPopup({params: ERRORS.addUser});
    }
}

function* getDidJwkKeyEffect() {
    try {
        const tokens: OAuthProps = yield getOauthTokens();
        const didJwk = tokens?.didJwk;
        const config: IConfig = yield select(configSelector);

        if (!didJwk && tokens.accountId) {
            const response: AccountResponse['data'] = yield getAccount(
                config,
                tokens.accountId,
                tokens.accessToken
            );

            const didKeyMetadatum = response.account.didKeyMetadatum[0];

            if (didKeyMetadatum) {
                const didJwkResult = formatDidJwk(didKeyMetadatum);

                yield updateOauthTokens(
                    {didJwk: didJwkResult},
                    tokens.accountId
                );

                yield put(actions.setDidJwk(didKeyMetadatum));

                return;
            }

            const didJwkDescriptor: VCLDidJwkDescriptor = {
                signatureAlgorithm: VCLSignatureAlgorithm.ES256,
                remoteCryptoServicesToken: {value: tokens.accessToken}
            };
            const result: VCLDidJwk =
                yield VclReactNativeSdkWrapper.generateDidJwk(didJwkDescriptor);

            yield updateOauthTokens({didJwk: result}, tokens.accountId);
            yield put(actions.setDidJwk(result));
        } else if (didJwk) {
            yield put(actions.setDidJwk(didJwk));
        }
    } catch (error) {
        vclLogger.error(error);
    }
}

function* refreshTokenRequestEffect() {
    const config: IConfig = yield select(configSelector);
    const {accessToken} = yield getOauthTokens();
    let currentScope;

    if (accessToken) {
        currentScope = jwtDecode(accessToken).claimsSet.scope;
    }

    try {
        if (accessToken && !currentScope?.includes(AccessTokenScopes.Jwt)) {
            yield call(refreshTokenRequest, config, undefined, requiredScopes);
        }
    } catch (error) {
        vclLogger.error(error);
    }
}

function* createAccountEffect() {
    try {
        const isAccountAlreadyCreated: boolean = yield call(
            isAccountCreatedEffect
        );

        if (isAccountAlreadyCreated) {
            return '';
        }

        const deviceId: string = yield getFcmToken(/* attempts */);

        openLoadingPopup({params: {title: 'Loading...'}});

        const config: IConfig = yield select(configSelector);

        const user: FullUser = yield select(userSelector);
        const testPersonas: Users = yield select(usersSelector);

        const testPersonaEmail = testPersonas.find(
            ({id: personaId}) => personaId === user.id
        )?.id;

        // create account and receive access token with restricted scope
        const auth: {
            accountId: string;
            accessToken: string;
            refreshToken: string;
        } = yield call(
            createAccount,
            config,
            {
                deviceType: 'phone',
                deviceOS: isIOS ? 'ios' : 'android',
                deviceId
            },
            testPersonaEmail
        );

        yield put(actions.registerDevice());

        // create Account's did and assign an additional scope to user
        yield call(getDidJwkKeyEffect);

        // request new refresh token with extended scope
        yield call(refreshTokenRequest, config, auth, requiredScopes);
        yield put(
            actions.addTermsAndConditionsVersion(
                localConfigs.termsAndConditionVersion,
                auth.accountId
            )
        );

        closePopup(PopupScreens.LOADING_POPUP);

        yield put(initBackendAccountSuccess());

        return auth.accountId;
    } catch (error) {
        vclLogger.error(error, error);

        openStatusPopup({params: ERRORS.addUser});

        return '';
    }
}

function* initBackendAccountIfNotExistSaga() {
    const accountId: string = yield call(createAccountEffect);
    const user: FullUser = yield select(userSelector);

    yield put(
        actions.updateUser({
            user: {
                ...user,
                accountId
            }
        })
    );
}

function* updateUserEffect({user, getStartedFlow}: UpdateUserSaga) {
    try {
        if (!user) {
            return;
        }
        if (getStartedFlow) {
            // inactivate previous oauth tokens if active
            yield inactivateOauthTokens();

            const accountId: string = yield call(createAccountEffect);

            yield put(
                actions.getUserSuccess(
                    {
                        ...user,
                        accountId
                    },
                    getStartedFlow
                )
            );
        } else {
            const userResp: boolean = yield updateUser(user);
            if (!userResp) {
                openStatusPopup({params: ERRORS.updateUser});
            } else {
                yield put(actions.getUserSuccess(user));
            }
        }
        yield put(actions.userIsUpdated());
    } catch (error) {
        vclLogger.error(error);
        openStatusPopup({params: ERRORS.updateUser});
    }
}

function* deleteUsersEffect({users}: {users: Users; type: string}) {
    try {
        yield deleteUsers(users);
    } catch (error) {
        openStatusPopup({params: ERRORS.deleteUser});
    }
}

/*
 * Select Persona flow
 */
function* setUserIdEffect({
    withoutCheckingBiometry,
    id,
    authResp
}: SetUserIdAction) {
    try {
        if (!authResp) {
            authResp = yield invokeBiometryAlertOnce(withoutCheckingBiometry);
        }
        if (authResp || withoutCheckingBiometry) {
            const resp: UserAction = yield saveUserId(id);
            if ('error' in resp) {
                openStatusPopup({
                    params: {
                        title: i18n.t('Error'),
                        text: resp.error.title,
                        statusType: StatusMessages.Error
                    }
                });
            } else {
                yield put(actions.setUserIdSuccess(id));
                yield registerDeviceEffect();
            }
        }
    } catch (e: any) {
        vclLogger.error(e);

        if (e?.message?.includes('Authentication cancelled')) {
            return;
        }

        openStatusPopup({params: ERRORS.setUserId});
    }
}

function* addTermsAndConditionsAgreedVersionSaga({
    version,
    accountId
}: AddTermsAndConditionsConsentAction) {
    try {
        const config: IConfig = yield select(configSelector);
        const {consent} = yield addConsentVersion(config, version, accountId);
        if (consent.version) {
            yield put(
                actions.addTermsAndConditionsVersionSuccess(consent.version)
            );
            return;
        }
        openStatusPopup({params: ERRORS.termsAndConditionsConsent});
    } catch (error) {
        vclLogger.error(error);
        openStatusPopup({params: ERRORS.termsAndConditionsConsent});
    }
}

function* authGetUserEffect() {
    try {
        const resRealm: FullUser | false = yield getUser();
        if (resRealm) {
            yield put(actions.getUserSuccess(resRealm));
        }

        yield call(getDidJwkKeyEffect);
        yield call(refreshTokenRequestEffect);
    } catch (error) {
        vclLogger.error(error);
        openStatusPopup({params: ERRORS.getUser});
    }
}

function* biometryEffect() {
    try {
        const needToCheckBiometry: boolean = yield select(
            needToCheckBiometrySelector
        );

        if (needToCheckBiometry) {
            yield put(actions.updateBiometryFlag(false));
        }

        yield registerDeviceEffect();
    } catch (e) {
        vclLogger.error(`biometryEffect: ${e}`, e);
    }
}

function* getUserIdEffect() {
    try {
        const resRealm: FullUser | false = yield getUser();
        const id = get('id', resRealm);
        if (id) {
            yield put(actions.setUserIdSuccess(id));
        } else {
            const deepLink: string | null = yield Linking.getInitialURL();

            const {path} = deepLink ? linkHandler(deepLink) : {path: ''};

            if (!path || path !== DeepLinkOptions.issue) {
                yield put(actions.setUserIdSuccess(''));
            }
        }
    } catch (error) {
        vclLogger.error(error);
        // use alert since the request can finish before navigation is initialized
        Alert.alert(ERRORS.getUserId.title, ERRORS.getUserId.text, [
            {text: i18n.t('Ok')}
        ]);
    }
}

function* authUsersEffect() {
    try {
        const resRealm: FullUser[] = yield getUsers();
        if (resRealm) {
            yield put(actions.getUsersSuccess(resRealm));
        } else {
            openStatusPopup({params: ERRORS.getUsers});
        }
    } catch (error) {
        vclLogger.error(error);
        openStatusPopup({params: ERRORS.getUsers});
    }
}

function* logoutEffect(action: LogoutAction) {
    try {
        const user: FullUser | false = yield getUser();
        if (user) {
            yield put(
                actions.updateUser({
                    user: {
                        ...(action.user || user),
                        isRetained: false
                    }
                })
            );
        }
        // wait while user is updated to resolve realm open/close issue
        yield take(actions.userIsUpdated);
        yield resetDataFromRealm();
        yield put(actions.removeDevice());
        const resp: UserAction = yield removeUserId();
        if ('error' in resp) {
            openStatusPopup({
                params: {
                    title: i18n.t('Error'),
                    text: resp.error.title,
                    statusType: StatusMessages.Error
                }
            });
        }
        yield removeLinkedInAccessToken();
        yield removeOauthTokens();
        yield put(actions.logoutSuccess());
    } catch (error) {
        vclLogger.error(error);
        openStatusPopup({params: ERRORS.logout});
    }
}

function* logoutWithKeepingCredentialsEffect(action: LogoutAction) {
    try {
        const user: FullUser | false = yield getUser();
        if (user) {
            yield put(
                actions.updateUser({
                    user: {
                        ...(action.user || user),
                        isRetained: true
                    }
                })
            );
        }
        const resp: UserAction = yield removeUserId();
        if ('error' in resp) {
            openStatusPopup({
                params: {
                    title: i18n.t('Error'),
                    text: resp.error.title,
                    statusType: StatusMessages.Error
                }
            });
        }
        yield removeLinkedInAccessToken();
        yield inactivateOauthTokens();
        yield put(actions.logoutSuccess());
    } catch (error) {
        vclLogger.error(error);
        openStatusPopup({params: ERRORS.logout});
    }
}

function* countriesSaga() {
    try {
        const countries: VCLCountries = yield VclReactNativeSdkWrapper.getCountries();
        yield put(actions.countriesSuccess(countries));
    } catch (error) {
        openStatusPopup({params: ERRORS.countries});
    }
}

function* createTemporaryUserToCompleteIssuingSaga({
    onUserCreated
}: GenerateTempIssuingUserSaga) {
    try {
        openLoadingPopup({params: {title: 'Loading...'}});
        const user = generateTemporaryUserToCompleteIssuing();

        yield addUser(user); // save user in realm
        yield saveUserId(user.id); // save id in async storage
        yield put(actions.setUserIdSuccess(user.id)); // save in redux - set user id
        yield registerDeviceEffect(); // register for pushes

        yield put(actions.getUserSuccess(user)); // redux - set user info

        const didJwk: VCLDidJwk = yield select(didJwkSelector);

        if (didJwk) {
            onUserCreated();
        } else {
            /**
             * It is necessary to wait for SET_DID_JWK action,
             * because it means that access_token and didJwk are set to REALM
             */
            yield take(actionTypes.SET_DID_JWK);
            onUserCreated();
        }
    } catch (error) {
        vclLogger.error(error);
    } finally {
        closePopup(PopupScreens.LOADING_POPUP);
    }
}

export function* authSaga() {
    yield takeEvery(actionTypes.ADD_USER, addUserEffect);
    yield takeEvery(actionTypes.UPDATE_USER, updateUserEffect);
    yield takeEvery(actionTypes.DELETE_USERS, deleteUsersEffect);
    yield takeEvery(actionTypes.SET_USER_ID, setUserIdEffect);
    yield takeEvery(actionTypes.GET_USER, authGetUserEffect);
    yield takeEvery(actionTypes.GET_USERS, authUsersEffect);
    yield takeEvery(actionTypes.GET_USER_ID, getUserIdEffect);
    yield takeEvery(actionTypes.LOGOUT, logoutEffect);
    yield takeEvery(
        actionTypes.LOGOUT_WITH_BACKUP,
        logoutWithKeepingCredentialsEffect
    );
    yield takeEvery(actionTypes.COUNTRIES, countriesSaga);
    yield takeEvery(actionTypes.BIOMETRY_CHECK, biometryEffect);
    yield takeEvery(
        actionTypes.GENERATE_TEMP_ISSUING_USER,
        createTemporaryUserToCompleteIssuingSaga
    );
    yield takeEvery(
        actionTypes.INIT_BACKEND_ACCOUNT_IF_NOT_EXIST,
        initBackendAccountIfNotExistSaga
    );
    yield takeLatest(
        actionTypes.ADD_TERMS_AND_CONDITIONS_VERSION,
        addTermsAndConditionsAgreedVersionSaga
    );
}
