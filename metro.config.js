const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');

const {withSentryConfig} = require('@sentry/react-native/metro');

const defaultConfig = getDefaultConfig(__dirname);
const {assetExts, sourceExts} = defaultConfig.resolver;

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
    transformer: {
        babelTransformerPath: require.resolve('react-native-svg-transformer')
    },
    resolver: {
        assetExts: assetExts.filter((ext) => ext !== 'svg'),
        sourceExts: [...sourceExts, 'svg'],
        extraNodeModules: {
            app: path.resolve(__dirname, 'app'),
            storybook: path.resolve(__dirname, 'storybook')
        }
    },
    watchFolders: [
        path.resolve(__dirname, 'app'),
        path.resolve(__dirname, 'storybook')
    ]
};

module.exports = withSentryConfig(mergeConfig(defaultConfig, config));
