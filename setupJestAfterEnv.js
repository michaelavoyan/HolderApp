import mockClipboard from '@react-native-clipboard/clipboard/jest/clipboard-mock';
import mockRNDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock';
import {ScrollView, TextInput, View} from "react-native";

const crypto = require('crypto');

Object.defineProperty(globalThis, 'crypto', {
    value: {
        getRandomValues: (arr) => crypto.randomBytes(arr.length)
    }
});

jest.mock('react-native-keychain', () => ({
    setGenericPassword: jest.fn(),
    getGenericPassword: jest.fn(),
    SECURITY_LEVEL: {
        SECURE_SOFTWARE: 'SECURE_SOFTWARE',
    },
    STORAGE_TYPE: {
        FB: 'FacebookConceal',
        AES: 'KeystoreAES',
        AES_CBC: 'KeystoreAESCBC',
        AES_GCM_NO_AUTH: 'KeystoreAESGCM_NoAuth',
        RSA: 'KeystoreRSAECB',
    },
    ACCESSIBLE: {
        ALWAYS: 'AccessibleAlways',
    }
}));

//// React Native mocks
// jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
jest.mock('@logrocket/react-native', () => ({
    reduxMiddleware: jest.fn()
}));
jest.mock('react-native-device-info', () => mockRNDeviceInfo);

/// external packages mocks
jest.mock('react-native', () => {
    const RN = jest.requireActual('react-native');

    // Mock NativeModules (add any required modules here)
    RN.NativeModules.NotifeeApiModule = {
        addListener: jest.fn(),
        removeListeners: jest.fn(),
    };

    // Set the platform to iOS
    RN.Platform.OS = 'ios';

    // Mock built-in components if necessary
    RN.Button = ({ title, onPress }) => (
        <button onClick={onPress}>{title}</button>
    );

    RN.TextInput = (props) => <input {...props} />;

    return RN;
});

jest.mock(
    'react-native-safe-area-context',
    () => require('react-native-safe-area-context/jest/mock').default
);
jest.mock('@react-native-clipboard/clipboard', () => mockClipboard);
jest.mock('react-native-share', () => ({
    default: jest.fn()
}));

jest.mock(
    '@react-native-community/netinfo',
    () => require('@react-native-community/netinfo/jest/netinfo-mock')
);

jest.mock('@react-native-async-storage/async-storage', () => {
    const asyncStorage = require('@react-native-async-storage/async-storage/jest/async-storage-mock');

    asyncStorage.setItem = async (key, value, callback) => {
        const setResult = await asyncStorage.multiSet(
            [[key, value]],
            undefined
        );

        callback && callback(setResult);
        return setResult;
    };

    return asyncStorage;
});

jest.mock('react-native-permissions', () =>
    require('react-native-permissions/mock')
);

jest.mock('mixpanel-react-native', () => ({
    __esModule: true,
    default: jest.fn(),
    Mixpanel: jest.fn(() => ({
        init: jest.fn()
    }))
}));

jest.mock('react-native-otp-verify', () => ({
    getOtp: jest.fn(() => Promise.resolve(true)),
    addListener: jest.fn(),
    removeListener: jest.fn()
}));

jest.mock('react-native-otp-verify', () => ({
    getOtp: jest.fn(() => Promise.resolve(true)),
    addListener: jest.fn(),
    removeListener: jest.fn()
}));

jest.mock('react-native-keyboard-aware-scroll-view', () => {
    const React = require('react');
    const {View} = require('react-native');

    const MockKeyboardAwareScrollView = ({children, ...props}) => {
        return (
            <View {...props} testID="KeyboardAwareScrollView">
                {children}
            </View>
        );
    };

    return {
        KeyboardAwareScrollView: MockKeyboardAwareScrollView,
        default: MockKeyboardAwareScrollView,
    };
});

jest.mock('react-native-localize', () => require('react-native-localize/mock'));
jest.mock('react-native-image-crop-picker', () => ({}));
jest.mock('@rneui/themed', () => {
    const { View } = require('react-native');
    return {
        Input: jest.fn(() => <View />),
        Icon: jest.fn(() => <></>)
    };
});
jest.mock('react-native-elements', () => {
    const { View, Text: RNText, TouchableOpacity, TextInput } = require('react-native');
    const { colors } = require('app/assets/colors');
    const ListItem = ({ leftIcon, rightIcon, onPress, children }) => (
        <TouchableOpacity
            onPress={onPress}
        >
            {leftIcon && (
                <View style={{ marginRight: 10 }}>
                    {leftIcon}
                </View>
            )}
            <View style={{ flex: 1 }}>{children}</View>
            <View style={{ marginLeft: 10 }}>{rightIcon}</View>
        </TouchableOpacity>
    );

    ListItem.Content = ({ children }) => (
        <View style={{ flex: 1 }}>{children}</View>
    );

    ListItem.Title = ({ children, style }) => (
        <RNText style={[{ fontWeight: 'bold' }, style]}>{children}</RNText>
    );

    ListItem.Subtitle = ({ children, style }) => (
        <RNText style={[{ color: '#666' }, style]}>{children}</RNText>
    );

    return {
        useTheme: jest.fn(() => ({
            theme: {
                colors: colors
            }
        })),
        ThemeProvider: ({ children }) => <View>{children}</View>,
        Text: ({ children, style }) => <RNText style={style}>{children}</RNText>,
        CheckBox: ({ title, checked, onPress }) => (
            <TouchableOpacity onPress={onPress} accessibilityRole="checkbox"
                accessibilityState={{ checked }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RNText>[{checked ? 'x' : ' '}]</RNText>
                    <RNText>{title}</RNText>
                </View>
            </TouchableOpacity>
        ),
        Icon: ({ name, size, color, onPress }) => (
            <TouchableOpacity onPress={onPress}>
                <RNText style={{ fontSize: size, color }}>{name}</RNText>
            </TouchableOpacity>
        ),
        SearchBar: ({ placeholder, onChangeText, value }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                <TextInput
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                />
            </View>
        ),
        ListItem,
        Divider: () => (
            <View
                style={{
                    height: 1,
                    backgroundColor: '#ccc',
                    marginVertical: 5,
                }}
            />
        ),
    };
});

jest.mock('@getyoti/yoti-doc-scan-react-native', () => ({
    default: jest.fn(),
}));

// jest.mock('@velocitycareerlabs/react-native-jsonschema-web-form/src', () => {
//     const { View, Text, TextInput, TouchableOpacity } = require('react-native');
//     const FormMock = ({ uiSchema, children, style }) => {
//         console.log('--------uiSchema:', JSON.stringify(uiSchema));
//         return (
//             <View style={style}>
//                 {
//                     Object.entries(uiSchema).map(([uiSchemaKey, uiSchemaValue]) => {
//                         return (
//                             <View key={`${uiSchemaKey}`}>
//                                 {Object.entries(uiSchemaValue).map(([key, prop]) => {
//
//                                     // console.log('--------key:', JSON.stringify(key));
//                                     // console.log('--------prop:', JSON.stringify(prop));
//
//                                     const uiTitle = prop?.['ui:title'] || '';
//                                     const updateBtn = prop?.['Update'] || '';
//                                     return (
//                                         <View key={key}>
//                                             <TextInput
//                                                 placeholder={`${uiTitle}*`}
//                                                 value={''}
//                                             />
//                                         </View>
//                                     );
//                                 })}
//                             </View>
//                         );
//                     })
//                 }
//                 {children}
//             </View>
//         );
//     }
//     return {
//         __esModule: true,
//         default: jest.fn(),
//         UIProvider: ({ children, style }) => <View style={style}>{children}</View>,
//         Form: FormMock
//     };
// });
jest.mock('@velocitycareerlabs/react-native-jsonschema-web-form/src', () => {
    const { View, Text, TextInput, TouchableOpacity } = require('react-native');
    return {
        __esModule: true,
        default: jest.fn(),
        // UIProvider: ({ children, style }) => <View style={style}>{children}</View>,
    };
});
jest.mock('react-native-pdf', () => {
    const {View} = require('react-native');
    return {
        __esModule: true,
        default: ({ children, style, ...props }) => <View style={style} {...props}>{children}</View>,
    }
});

jest.mock('react-native-blob-util', () => ({
    default: jest.fn(),
}));

jest.mock('react-native-haptic-feedback', () => ({
    default: jest.fn(),
}));

jest.mock('react-native-vision-camera', () => {
    return {
        useCameraDevices: jest.fn(() => ({
            back: { id: 'back-camera', name: 'Back Camera', available: true },
            front: { id: 'front-camera', name: 'Front Camera', available: true },
        })),
        Camera: jest.fn(() => null), // Mock Camera component as a simple null render
        useFrameProcessor: jest.fn(() => jest.fn()), // Mock frame processor
        requestCameraPermission: jest.fn(() => Promise.resolve('granted')),
        getCameraPermissionStatus: jest.fn(() => 'authorized'),
        requestMicrophonePermission: jest.fn(() => Promise.resolve('granted')),
        getMicrophonePermissionStatus: jest.fn(() => 'authorized'),
    };
});


jest.mock('react-native-webview', () => {
    const { View } = require('react-native');
    return {
        WebView: jest.fn(() => <View testID='attachment-webview' />),
        default: jest.fn(),
    }
});

jest.mock('react-native-gesture-handler/ReanimatedSwipeable', () => ({
    default: jest.fn(),
}));

//// mock internal packages
jest.mock('./app/jwt/core', () => ({
    __esModule: true,
    jwtSign: jest.fn(),
    jwtDecode: (token) => ({
        claimsSet: JSON.parse(
            Buffer.from(token.split('.')[1], 'base64').toString()
        )
    }),
    jwtVerify: jest.fn()
}));

jest.mock('./app/utilities/credential-values', () => ({
    __esModule: true,
    ...jest.requireActual('./app/utilities/credential-values'),
    useCredentialSummaries: () => ({
        title: 'title',
        logo: 'logo',
        subTitle: 'subTitle',
        summaryDetail: 'summaryDetail'
    })
}));

jest.mock('./app/utilities/custom-hooks', () => ({
    ...jest.requireActual('./app/utilities/custom-hooks'),
    __esModule: true,
    useDateFormat: () => 'default'
}));

// app/assets/__mocks__/icons.tsx
jest.mock('./app/assets/icons');

// app/components/common/__mocks__/SettingsWrapper.tsx
jest.mock('./app/components/common/SettingsWrapper');

jest.mock('react-native-sensitive-info', () => ({
    setItem: jest.fn(),
    getItem: jest.fn()
}));

jest.mock('uuid', () => ({
    v4: jest.fn(() => 'mock-uuid'),
}));

jest.mock('@sentry/react-native', () => ({
    init: jest.fn(),
    captureException: jest.fn(),
    addBreadcrumb: jest.fn(),
}));

jest.mock('react-native-gesture-handler', () => {
    const {View, ScrollView, TouchableOpacity: RNTouchableOpacity} = require('react-native');
    const MockScrollView = ({ children, ...props }) => {
        const scrollTo = jest.fn((options) => {
            console.log('scrollTo called with:', options);
        });

        return (
            <ScrollView {...props}>
                {children}
            </ScrollView>
        );
    };

    MockScrollView.scrollTo = jest.fn((options) => {
        console.log('scrollTo called with:', options);
    });
    return {
        GestureHandlerRootView: ({ children }) => children,
        PanGestureHandler: View,
        ScrollView: MockScrollView,
        TouchableOpacity: jest.fn().mockImplementation(({ children, onPress, ...props }) => (
            <RNTouchableOpacity onPress={onPress} {...props}>
                {children}
            </RNTouchableOpacity>
        )),
        Swipeable: jest.fn(),
        DrawerLayout: jest.fn(),
    }
});

jest.mock('react-native-haptic-feedback', () => ({
    trigger: jest.fn(),
    HapticFeedbackTypes: {
        impactLight: 'impactLight',
        impactMedium: 'impactMedium',
        impactHeavy: 'impactHeavy',
        notificationSuccess: 'notificationSuccess',
        notificationWarning: 'notificationWarning',
        notificationError: 'notificationError',
    },
    configure: jest.fn(),
}));

jest.mock('@react-native-firebase/app', () => ({
    initializeApp: jest.fn(),
}));

jest.mock('@react-native-firebase/messaging', () => ({
    onMessage: jest.fn(),
    setBackgroundMessageHandler: jest.fn(),
    getToken: jest.fn(() => Promise.resolve('mock-token')),
}));

