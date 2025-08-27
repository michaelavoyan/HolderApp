import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authReducer} from './auth';
import {profileReducer} from './profile';
import {claimReducer} from './claim';
import {disclosureReducer} from './diclosure';
import {pushReducer} from './push';
import {verificationReducer} from './verification';
import {vclReducer} from './vcl';
import {appConfigReducer} from './appConfig';
import {commonReducer} from './common';

const authPersistConfig = {
    key: 'auth',
    storage: AsyncStorage,
    blacklist: [
        'needToCheckBiometry',
        'isShownSplashScreen',
        'isBiometryDisabled'
    ]
};

const profilePersistConfig = {
    key: 'profile',
    storage: AsyncStorage,
    blacklist: [
        'vfCredentials',
        'vfCredentialsLoaded',
        'selfReportedCredentials',
        'selfReportedCredentialsLoaded'
    ]
};

const disclosurePersistConfig = {
    key: 'disclosure',
    storage: AsyncStorage,
    blacklist: [
        'disclosures',
        'isTempUserFirstIssuingSessionActive',
        'inspectionSession',
        'issuingSession'
    ]
};

const claimPersistConfig = {
    key: 'claim',
    storage: AsyncStorage,
    blacklist: ['offers', 'pushOffers', 'credentialManifest']
};

const commonPersistConfig = {
    key: 'common',
    storage: AsyncStorage,
    blacklist: ['isSdkInitialized', 'issuingSequence']
};

export const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
    profile: persistReducer(profilePersistConfig, profileReducer),
    claim: persistReducer(claimPersistConfig, claimReducer),
    disclosure: persistReducer(disclosurePersistConfig, disclosureReducer),
    push: pushReducer,
    verification: verificationReducer,
    vcl: vclReducer,
    common: persistReducer(commonPersistConfig, commonReducer),
    appConfig: appConfigReducer
});

export type RootState = ReturnType<typeof rootReducer>;
