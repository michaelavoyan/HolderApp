import {sha256} from 'js-sha256';
// @ts-ignore
import base64 from 'react-native-base64';
import {map} from 'lodash/fp';
import {NotificationType} from '../store/types/claim';

const HASH_LENGTH = '20';
const SHA2_256_CODE = '12';

export const notificationIdByType = (data: {
    notificationId: string;
    notificationType: NotificationType;
}) => {
    return `${data.notificationType}_${data.notificationId}`;
};

const fromHexStringToInt8Array = (hexString: string) =>
    new Uint8Array(map(byte => parseInt(byte, 16), hexString.match(/.{1,2}/g)));

const base64ToHex = (str: string) => {
    const raw = base64.decode(str);
    let result = '';

    raw.split('').forEach((char: string, index: number) => {
        const hex = raw.charCodeAt(index).toString(16);
        result += hex.length === 2 ? hex : `0${hex}`;
    });
    return result.toUpperCase();
};

const hexToBytes = (hex: string) => {
    if (!hex.match(/^[0-9a-fA-F]+$/)) {
        console.error('is not a hex string.');
        return hex;
    }
    if (hex.length % 2 !== 0) {
        hex = `0${hex}`;
    }
    const bytes = [];
    for (let n = 0; n < hex.length; n += 2) {
        const code = parseInt(hex.substr(n, 2), 16);
        bytes.push(code);
    }
    return bytes;
};

export const createCommitment = (val: string) => {
    try {
        const hex = base64ToHex(val);
        const digest = sha256.hex(hexToBytes(hex));
        const multiHash = `${SHA2_256_CODE}${HASH_LENGTH}${digest}`;
        const int8 = fromHexStringToInt8Array(multiHash);

        return base64.encodeFromByteArray(int8);
    } catch (e) {
        console.error(e);
        return '';
    }
};
