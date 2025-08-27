import {Mixpanel, MixpanelProperties} from 'mixpanel-react-native';
import {localConfigs} from 'app/configs';
import {vclLogger} from '../utilities/logger';

const MIXPANEL_HOLDERAPP_PROJECT_TOKEN = localConfigs.mixPanelToken;

let mixpanel: Mixpanel;
try {
    if (MIXPANEL_HOLDERAPP_PROJECT_TOKEN) {
        mixpanel = new Mixpanel(MIXPANEL_HOLDERAPP_PROJECT_TOKEN, true);
        mixpanel.init();
    }
} catch (e) {
    vclLogger.error(e);
}

export const EVENT_APP_STARTED = 'App Started';
export const EVENT_GET_STARTED = 'Get Started';
export const EVENT_DISCLOSURE_SENT = 'Disclosure Sent';
export const EVENT_CREDENTIALS_SHARED = 'Credentials Shared';
export const EVENT_OFFER_ACCEPTED = 'Offer Accepted';
export const EVENT_OFFER_REJECTED = 'Offer Rejected';
export const EVENT_SHARE_TO_LINKEDIN = 'Share to LinkedIn';
export const APP_ERROR = 'App Error';
export const SHARED_TO_PROVE_BIO = 'Shared To ProveBio';

const actions = {
    setServerURL: (serverURL: string) => {
        try {
            mixpanel?.setServerURL(serverURL);
        } catch (e) {
            vclLogger.error(e);
        }
    },
    track: (eventName: string, properties?: MixpanelProperties) => {
        try {
            mixpanel?.track(eventName, properties);
        } catch (e) {
            vclLogger.error(e);
        }
    },
    trackAppStarted: (properties?: MixpanelProperties) => {
        actions.track(EVENT_APP_STARTED, properties);
    },
    trackGetStarted: (properties?: MixpanelProperties) => {
        actions.track(EVENT_GET_STARTED, properties);
    },
    trackDisclosureSent: (properties?: MixpanelProperties) => {
        actions.track(EVENT_DISCLOSURE_SENT, properties);
    },
    trackCredentialsShared: (properties?: MixpanelProperties) => {
        actions.track(EVENT_CREDENTIALS_SHARED, properties);
    },
    trackOffersAccepted: (properties?: MixpanelProperties) => {
        actions.track(EVENT_OFFER_ACCEPTED, properties);
    },
    trackOffersRejected: (properties?: MixpanelProperties) => {
        actions.track(EVENT_OFFER_REJECTED, properties);
    },
    trackShareToLinkedin: (properties?: MixpanelProperties) => {
        actions.track(EVENT_SHARE_TO_LINKEDIN, properties);
    },
    trackAppError: (properties?: MixpanelProperties) => {
        actions.track(APP_ERROR, properties);
    },
    trackSharedToProveBio: (properties?: MixpanelProperties) => {
        actions.track(SHARED_TO_PROVE_BIO, properties);
    }
};

export const VclMixpanel = actions;
