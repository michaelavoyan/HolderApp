module.exports = {
    presets: [
        'module:metro-react-native-babel-preset',
        'module:@react-native/babel-preset',
    ],
    plugins: [
        'module:react-native-dotenv',
        ['transform-inline-environment-variables'],
        // ['@babel/plugin-transform-modules-commonjs'],
        ['@babel/plugin-transform-private-methods', {loose: true}],
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
                    'app/*': ['./app/'],
                    'storybook/*': ['./storybook/']
                }
            }
        ]
    ]
};