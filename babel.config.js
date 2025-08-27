module.exports = {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
        'module:react-native-dotenv',
        ['transform-inline-environment-variables'],
        [
            'module-resolver',
            {
                root: ['.'],
                extensions: [
                    '.ios.js',
                    '.android.js',
                    '.js',
                    '.ts',
                    '.tsx',
                    '.json'
                ],
                alias: {
                    'app/*': ['./app/']
                }
            }
        ],
        'react-native-reanimated/plugin' // Ensure this is the last plugin
    ]
};
