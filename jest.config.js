
const {defaults: tsjPreset} = require('ts-jest/presets');

module.exports = {
    ...tsjPreset,
    preset: 'react-native',
    setupFilesAfterEnv: [
        '@testing-library/jest-native/extend-expect',
        './node_modules/react-native-gesture-handler/jestSetup.js',
        './setupJestAfterEnv.js'
    ],
    transform: {
        // '^.+\\.jsx$': 'babel-jest',
        // '^.+\\.tsx?$': 'ts-jest',
        // '^.+\\.js$': ['babel-jest', {configFile: './babel.config.jest.js'}],
        // '^.+\\.ts$': 'ts-jest'
        '^.+\.(ts|tsx)$': ['ts-jest', {tsconfig: './tsconfig.spec.json'}],
        '^.+\.(js|jsx)$': ['babel-jest', {configFile: './babel.config.jest.js'}],
    },
    transformIgnorePatterns: [
        'node_modules/(?!((jest-)?react-native(-.*)?|react-native-elements|@react-native(-community)?|@react-native-firebase/*|@react-navigation)/)',
        'node_modules/@getyoti/yoti-doc-scan-react-native',
    ],
    moduleNameMapper: {
        '^app/(.*)$': '<rootDir>/app/$1',
        "uuid": require.resolve('uuid'),
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    verbose: true,
    testTimeout: 20000
};
