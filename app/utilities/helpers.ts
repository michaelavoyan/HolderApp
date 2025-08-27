import {Dimensions, PixelRatio, Platform, TextStyle} from 'react-native';
import {
    toLower,
    kebabCase,
    replace,
    lowerFirst,
    isString,
    isObject
} from 'lodash/fp';
import {VCLError, VCLStatusCode} from '@velocitycareerlabs/vcl-react-native';
import {CredentialStatus} from 'app/store/types/claim';
import {Colors} from 'react-native-elements';
import Realm from 'realm';
import i18n from '../i18n';
import {openGenericPopup} from './popups';

export const DELETE_MESSAGES = {
    delete: {
        title: i18n.t('Are you sure you want to delete this credential?'),
        subTitle: i18n.t('This action can’t be undone')
    },
    deleteAll: {
        title: i18n.t('Are you sure you want to delete these credentials?'),
        subTitle: i18n.t('This action can’t be undone')
    }
};

const DURATION_SINGULAR: {[key: string]: string} = {
    h: ` ${i18n.t('Hour')}`,
    d: ` ${i18n.t('Day')}`,
    m: ` ${i18n.t('Month')}`,
    y: ` ${i18n.t('Year')}`
};

const DURATION_PLURAL: {[key: string]: string} = {
    h: ` ${i18n.t('Hours')}`,
    d: ` ${i18n.t('Days')}`,
    m: ` ${i18n.t('Months')}`,
    y: ` ${i18n.t('Years')}`
};

// props that should be converted in JSON string during persist and rehydrate realm data
const SERIALIZABLE_PROPERTIES = ['credentialSubject', 'dynamicRootProperties'];

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
// based on iphone 5s's scale
const SCALE = SCREEN_WIDTH / (isIOS ? 375 : 360);
const SCALE_HEIGH = Dimensions.get('window').height / (isIOS ? 812 : 812);

export const parseDate = (date?: {[key: string]: number}) => {
    if (date) {
        return Date.UTC(date.year || 0, date.month - 1 || 0, date.day || 1);
    }
    return '';
};

export const parseDuration = (duration: string = '') => {
    let changedStr = '';
    const durationArr = (duration || '').split(/([0-9]+)/).filter(Boolean);
    const int = durationArr.find((item) => typeof +item === 'number');

    if (int) {
        if (Number(int) > 1) {
            changedStr = durationArr
                .map((el) => DURATION_PLURAL[el] || el)
                .join('');
        } else {
            changedStr = durationArr
                .map((el) => DURATION_SINGULAR[el] || el)
                .join('');
        }
    }

    return changedStr || duration;
};

export const normalize = (size: number) => {
    const newSize = size * SCALE;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export const normalizeHeight = (size: number) => {
    const newSize = size * SCALE_HEIGH;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};
/**
 * fontFamily({size: 20, weight: 700, iosFamily: 'SFProText'})
 * fontFamily({size: 20, weight: 700, iosFamily: 'SFProText', ios: {
 *  weight: 300
 * }})
 */
export const fontFamily = ({
    size,
    weight = '400',
    iosFamily = 'SFProDisplay',
    ios = {},
    android = {}
}: {
    size: number;
    weight?: TextStyle['fontWeight'];
    iosFamily?: 'SFProText' | 'SFProDisplay';
    ios?: {
        weight?: TextStyle['fontWeight'];
        size?: number;
    };
    android?: {
        family?: string;
        weight?: TextStyle['fontWeight'];
        size?: number;
    };
}) => {
    let androidFamilyPostfix;
    const androidWeight = android.weight || weight;

    if (Number(androidWeight)) {
        switch (androidWeight) {
            case '100':
            case '200':
                androidFamilyPostfix = 'Thin';
                break;
            case '300':
                androidFamilyPostfix = 'Light';
                break;
            case '500':
            case '600':
                androidFamilyPostfix = 'Medium';
                break;
            case '700':
            case '800':
                androidFamilyPostfix = 'Bold';
                break;
            case '900':
                androidFamilyPostfix = 'Black';
                break;
            default:
                androidFamilyPostfix = 'Regular';
        }
    } else {
        const androidWeightStr = String(androidWeight);
        androidFamilyPostfix =
            androidWeightStr.charAt(0).toUpperCase() + androidWeightStr.slice(1);
    }

    return Platform.select({
        ios: {
            fontSize: normalize(<number>ios.size || size),
            fontFamily: `${iosFamily}-Regular`,
            fontWeight: ios.weight || weight
        },
        android: {
            fontSize: normalize(<number>android.size || size),
            fontFamily: android.family || `Roboto-${androidFamilyPostfix}`
        }
    });
};

export const onDeleteAction = (
    title: string,
    description: string,
    callback: () => void,
    theme: {colors: Colors}
) => {
    openGenericPopup({
        params: {
            title,
            description,
            buttons: [
                {
                    title: i18n.t('Cancel'),
                    closePopupOnPress: true,
                    textStyle: Platform.select({ios: {fontWeight: '400'}})
                },
                {
                    title: i18n.t('Yes'),
                    onPress: callback,
                    closePopupOnPress: true,
                    textStyle: isIOS
                        ? {color: theme?.colors?.reject}
                        : undefined
                }
            ],
            buttonsDirection: 'row'
        }
    });
};

/**
 * Prepare object before save in realm storage
 * serialize certain properties to JSON
 */
export const prepareObject = (
    rawObject: {[prop: string]: any},
    maxDeepLevel = 2
) => {
    const prepare = (obj: {[prop: string]: any}, level = 1) => {
        if (level > maxDeepLevel) {
            return;
        }

        const props = Object.keys(obj);

        props.forEach((property) => {
            if (SERIALIZABLE_PROPERTIES.includes(property)) {
                if (!isString(obj[property])) {
                    obj[property] = JSON.stringify(obj[property]);
                }
            } else if (isObject(obj[property])) {
                if (Array.isArray(obj[property])) {
                    obj[property].forEach((item: {[prop: string]: any}) => {
                        prepare(item, level + 1);
                    });
                } else {
                    prepare(obj[property], level + 1);
                }
            }
        });
    };

    prepare(rawObject);
};

/**
 * Replacer callback for JSON.stringify to prepare data before rehydrate realm data
 */
const realmDataJSONreplacer = (key: string, value: any) => {
    if (SERIALIZABLE_PROPERTIES.includes(key) && isString(value)) {
        return JSON.parse(value);
    }

    return value;
};

export const convertRealmObjectsToArray = <T>(
    realmObjectsArray: Realm.Results<Realm.Object<T> & T>
) => {
    // credentialSubject could have different formats for all categories therefore should be stored as JSON in the Realm
    return JSON.parse(JSON.stringify(realmObjectsArray), realmDataJSONreplacer);
};

export const convertRealmObjectToObject = <T>(obj: Realm.Object<T>) =>
    JSON.parse(JSON.stringify(obj, realmDataJSONreplacer));

export const maybePluralize = (
    count: number,
    noun: string,
    suffix: string = 's'
) => `${count} ${i18n.t(`${noun}${count !== 1 ? suffix : ''}`)}`;

const DATE_FORMAT_OPTIONS: {[key: string]: Intl.DateTimeFormatOptions} = {
    shortFormat: {year: 'numeric', month: '2-digit', day: '2-digit'},
    longFormat: {year: 'numeric', month: 'long', day: 'numeric'}
};

export const formatDateByRegion = (
    date: Date,
    locale: string,
    isShortFormat?: boolean
): string => {
    try {
        const options = isShortFormat
            ? DATE_FORMAT_OPTIONS.shortFormat
            : DATE_FORMAT_OPTIONS.longFormat;
        return new Intl.DateTimeFormat(toLower(locale), options).format(date);
    } catch (e) {
        return '';
    }
};

export const ICON_NAME: {[key: string]: string} = {
    [CredentialStatus.revoked]: 'revoke',
    [CredentialStatus.verified]: 'check',
    [CredentialStatus.offered]: 'check',
    [CredentialStatus.replaced]: 'replaced',
    [CredentialStatus.expired]: 'close'
};

export const isSVGLink = (url: string): boolean => {
    if (!isString(url)) {
        return false;
    }
    return url.match(/^http[^?]*.(svg)(\?(.*))?$/gim) !== null;
};
// top level domain length is 63 according to
// https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_domain_name
export const isValidUrl = (url: string): boolean => {
    return /^(http(s):\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/g.test(
        url
    );
};

export const isValidBase64 = (url: string): boolean => {
    return /^data:?[a-z]{5}\/[a-z]*;.*/g.test(url);
};

export const kebabCredentialType = (credentialType: string) => {
    const matchVersion = credentialType.match(/(^.*)V\d\.\d$/);
    if (matchVersion == null) {
        return kebabCase(credentialType);
    }

    const withoutVersion = matchVersion[1];
    const version = replace(withoutVersion, '', credentialType);
    const lowerVersion = lowerFirst(version);

    return `${kebabCase(withoutVersion)}-${lowerVersion}`;
};

export const isVerificationError = (error: VCLError) => {
    return error.statusCode === VCLStatusCode.VerificationError;
};

export const jsonStringify = (obj: any): string =>
    JSON.stringify(obj, (key, value) => typeof value === 'bigint' ? value.toString() : value);

/**
 * The implementation relaying on the below reference:
 * https://github.com/velocitycareerlabs/velocitycore
 * /blob/37c8535c2ef839ed72a2706685a398f20f4ae11c/packages/vc-checks/src/extract-credential-type.js#L20
 */
export const findCredentialType = (credentialTypeArr?: string[]): string | undefined => {
    return credentialTypeArr?.find(t => t !== 'VerifiableCredential');
};

export const hasValue = (x: unknown): x is string => typeof x === 'string' && x.trim().length > 0;
