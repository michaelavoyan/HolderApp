import 'react-native-reanimated'; // Must be the first import
import {AppRegistry} from 'react-native';
import {enableFreeze} from 'react-native-screens';
import 'react-native-get-random-values';
import * as Sentry from '@sentry/react-native';
import LogRocket from '@logrocket/react-native';
import {VclMixpanel} from 'app/mixpanel/VclMixpanel';
import {localConfigs} from 'app/configs';
import {processPushesInBackground} from 'app/push/processPushesInBackground';
import DeviceInfo from 'react-native-device-info';
import {name as appName} from './app.json';
import {Root} from './Root';
import './app/i18n';

if (__DEV__) {
    require('./ReactotronConfig');
  }

// https://reactnavigation.org/docs/3.x/react-native-screens/
// https://github.com/software-mansion/react-native-screens#experimental-support-for-react-freeze
enableFreeze(true);

const applicationName = 'holder-app'; // DeviceInfo.getApplicationName();
const applicationVersion = DeviceInfo.getVersion();

Sentry.init({
    dsn: 'https://354ee5e6993e48abb6a849508ef3bf5d@o460076.ingest.sentry.io/5459831',
    enableAutoSessionTracking: true,
    enableNative: true,  // Captures native crashes
    environment: localConfigs.vclEnvironmentDisplayName,
    sendDefaultPii: true,
    tracesSampleRate: 1.0,
    release: `${applicationName}@${applicationVersion}`,
});
export default Sentry.wrap(Root);

if (localConfigs.logRocketEnabled) {
    LogRocket.init(localConfigs.logRocketProjectId);
}

processPushesInBackground();

VclMixpanel.trackAppStarted();

AppRegistry.registerComponent(appName, () => Root);
