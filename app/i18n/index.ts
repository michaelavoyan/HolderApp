import {Platform, NativeModules} from 'react-native';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as en from './en.json';

const getCurrentLocale = (): string => {
    try {
        const settings = NativeModules.SettingsManager?.settings || {};
        const fullCode: string =
            Platform.OS === 'ios'
                ? settings?.AppleLocale || settings?.AppleLanguages?.[0] || 'en'
                : NativeModules.I18nManager?.localeIdentifier || 'en';

        if (!fullCode) {
            console.warn('Locale could not be determined. Defaulting to "en".');
        }

        return fullCode.slice(0, 2);
    } catch (e) {
        console.error('Error determining locale:', e);
        return 'en';
    }
};

declare module 'i18next' {
    interface CustomTypeOptions {
        returnNull: false;
    }
}

i18n.use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: en
            }
        },
        returnNull: false,
        compatibilityJSON: 'v4', // only v4 is available and supported by typescript
        lng: getCurrentLocale(),
        fallbackLng: 'en',
        nsSeparator: false,
        keySeparator: false,
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    })
    .catch(error => {
        console.error('i18n initialization failed:', error);
    });

export default i18n;
