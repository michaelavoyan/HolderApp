import {assign} from 'lodash/fp';
import {defaultsDeep} from 'lodash';
import {VCLXVnfProtocolVersion} from '@velocitycareerlabs/vcl-react-native';
import {GenericAction, reducingFunction} from '../helpers/createReducer';
import * as actionTypes from '../actionTypes/appConfig';
import {AppConfigState, IConfig} from '../types/appConfig';

const initialState: AppConfigState = {
    isLoaded: false,
    config: {
        ios: {
            isWalletAvailable: true
        },
        android: {
            isWalletAvailable: true
        },
        yotiIDV: true,
        minIOSVersion: '0',
        minAndroidVersion: '0',
        latestIOSVersion: '0',
        latestAndroidVersion: '0',
        idVerifierDid: '',
        emailVerifierDid: '',
        phoneVerifierDid: '',
        yotiNewSessionUrl: '',
        baseUrls: {
            walletApi: '',
            verificationApi: '',
            verificationServiceActionBaseUrl: '',
            presentationExtensionPeriodURL: '',
            libVnfUrl: '',
            registrarVnfUrl: ''
        },
        verificationServiceDeepLink: '',
        verificationServicePresentationLinkTemplate: '',
        sdk: {
            cacheSequence: 0,
            isDirectIssuerCheckOn: false,
            isDebugOn: false,
            xVnfProtocolVersion: VCLXVnfProtocolVersion.XVnfProtocolVersion1
        },
        commonUrls: {
            supportLink: '',
            termsAndConditionsLink: ''
        },
        linkedinEndpoints: {
            authUrl: '',
            apiUrl: '',
            addToProfileUrl: '',
            addToFeed: ''
        },
    },
    isDebugOn: false
};

const getAppConfig = ({config}: {config: IConfig}, state: AppConfigState) =>
    assign(state, {
        config: defaultsDeep(config, initialState.config),
        isLoaded: true
    });

const setIsDebugOn = (
    {isDebugOn}: {isDebugOn: boolean},
    state: AppConfigState
) => assign(state, {isDebugOn});

const actionReducers = {
    [actionTypes.GET_APP_CONFIG_SUCCESS]: getAppConfig,
    [actionTypes.SET_IS_DEBUG_ON]: setIsDebugOn
};

export const appConfigReducer = (
    state = initialState,
    action: GenericAction
): AppConfigState =>
    reducingFunction<AppConfigState>(actionReducers, state, action);
