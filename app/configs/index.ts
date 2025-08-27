import {VCLEnvironment} from '@velocitycareerlabs/vcl-react-native';
import {v4 as uuidv4} from 'uuid';
// import {AdjustConfig} from 'react-native-adjust';
import {TERMS_AND_CONDITIONS_VERSION} from 'app/screens/auth/TermsAndConditionsScreen';

const DEFAULT_VCL_ENVIRONMENT = VCLEnvironment.Dev;
export const VCL_ENVIRONMENT: VCLEnvironment =
    (process.env.VCL_ENVIRONMENT as VCLEnvironment) || DEFAULT_VCL_ENVIRONMENT;

export const localConfigs = {
    error_report_id: '',
    get logRocketEnabled() {
        if (__DEV__) {
            return false;
        }

        return true;
    },
    get errorReportId(){
        if(this.error_report_id === ''){
            this.error_report_id = uuidv4();
        }
        return this.error_report_id;
    },
    updateErrorReportId (){
        this.error_report_id = uuidv4();
    },
    get logRocketProjectId() {
        switch (VCL_ENVIRONMENT) {
            case VCLEnvironment.Dev:
                return 'n6j3rg/velocity-career-wallet-devnet';
            case VCLEnvironment.Qa:
                return 'n6j3rg/velocity-career-wallet-qanet';
            case VCLEnvironment.Staging:
                return 'n6j3rg/velocity-career-wallet-testnet';
            case VCLEnvironment.Prod:
                return 'n6j3rg/velocity-career-wallet';
            default:
                return 'n6j3rg/velocity-career-wallet-devnet'; // dev
        }
    },
    get mixPanelToken() {
        switch (VCL_ENVIRONMENT) {
            case VCLEnvironment.Dev:
                return 'd4ed22abddbfc28f3549951f2ea3bb81';
            case VCLEnvironment.Qa:
                return '40867dac95e193412b53c914c59bc409';
            case VCLEnvironment.Staging:
                return '811aa34f93d503fee24d75d6c7ea86b0';
            case VCLEnvironment.Prod:
                return 'b667ae1cb204aa2eb1a23bc3640f2e9b';
            default:
                return 'd4ed22abddbfc28f3549951f2ea3bb81'; // dev
        }
    },
    get adjustToken() {
        return 't7eunwp96rk0';
    },
    // get adjustEnviroment() {
    //     switch (VCL_ENVIRONMENT) {
    //         case VCLEnvironment.Staging:
    //             return AdjustConfig.EnvironmentProduction;
    //         case VCLEnvironment.Prod:
    //             return AdjustConfig.EnvironmentProduction;
    //         case VCLEnvironment.Qa:
    //             return AdjustConfig.EnvironmentSandbox;
    //         default:
    //             return AdjustConfig.EnvironmentSandbox;
    //     }
    // },
    get velocityProtocol() {
        switch (VCL_ENVIRONMENT) {
            case VCLEnvironment.Staging:
                return 'velocity-network-testnet://';
            case VCLEnvironment.Qa:
                return 'velocity-network-qanet://';
            case VCLEnvironment.Dev:
                return 'velocity-network-devnet://';
            default:
                return 'velocity-network://';
        }
    },
    get appAppleID() {
        switch (VCL_ENVIRONMENT) {
            case VCLEnvironment.Staging:
                return '1587589907';
            case VCLEnvironment.Qa:
                return '6446232770';
            case VCLEnvironment.Dev:
                return '1587589802';
            default:
                // default is prod
                return '1587589679';
        }
    },
    get appPackageName() {
        switch (VCL_ENVIRONMENT) {
            case VCLEnvironment.Staging:
                return 'io.velocitycareerlabs.holderapp.staging';
            case VCLEnvironment.Qa:
                return 'io.velocitycareerlabs.holderapp.qa';
            case VCLEnvironment.Dev:
                return 'io.velocitycareerlabs.holderapp.dev';
            default:
                // default is prod
                return 'io.velocitycareerlabs.holderapp';
        }
    },
    get environmentPrefix() {
        switch (VCL_ENVIRONMENT) {
            case VCLEnvironment.Staging:
                return 'staging';
            case VCLEnvironment.Qa:
                return 'qa';
            case VCLEnvironment.Dev:
                return 'dev';
            default:
                return ''; // default is prod
        }
    },
    get vclEnvironmentDisplayName() {
        switch (VCL_ENVIRONMENT) {
            case VCLEnvironment.Staging:
                return 'TestNet';
            case VCLEnvironment.Qa:
                return 'QaNet';
            case VCLEnvironment.Dev:
                return 'DevNet';
            default:
                return 'MainNet';
        }
    },
    // getting realm secret from AsyncStorage in case not found in Secured Storage (Android)
    enableAsyncStorageRealmKeyFallbackAndroid: true,
    termsAndConditionVersion: TERMS_AND_CONDITIONS_VERSION
};

export const isStartAddingCredentialsBtnVisible = (environment: VCLEnvironment): boolean => {
    return (
        (environment === VCLEnvironment.Dev || environment === VCLEnvironment.Qa)
    );
};

export const APPLE_CONNECT_URL = `https://apps.apple.com/app/id${localConfigs.appAppleID}`;
export const GOOGLE_PLAY_URL = `https://play.google.com/store/apps/details?id=${localConfigs.appPackageName}`;
// export const REGISTRAR_BASE_URL = `https://${localConfigs.environmentPrefix}registrar.velocitynetwork.foundation`;
export const WALLETAPI_BASE_URL = `https://${localConfigs.environmentPrefix}walletapi.velocitycareerlabs.io`;
