import {getOr, find} from 'lodash/fp';
import {LinkedCredential, LinkType} from 'app/store/types/claim';
import {createCommitment} from '../push';

export const validateEmail = (email: string) => {
    const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

export const validURL = (val: string) => {
    // added it to avoid error Maximum regex stack depth reached
    // if string doesn't start with https then no need to check it with complex regex
    if (!val.startsWith('https://')) {
        return false;
    }
    const pattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', // fragment locator
        'i'
    );
    return pattern.test(val);
};

export const addHttp = (val: string) => {
    const pattern = /^((http|https|ftp):\/\/)/;

    if (!pattern.test(val)) {
        return `http://${val}`;
    }
    return val;
};

export const findByLinkCode = (
    linkCodeCommitment: string = '',
    items: object[]
) => {
    if (linkCodeCommitment) {
        const matchedOffer = find(
            item =>
                find((linkCred: LinkedCredential) => {
                    return (
                        linkCred.linkType === LinkType.replace &&
                        createCommitment(linkCred.linkCode) ===
                            linkCodeCommitment
                    );
                }, getOr([], 'linkedCredentials', item)),
            items
        );

        if (matchedOffer) {
            return [matchedOffer];
        }
        return [];
    }

    return items;
};

const MAX_PROFILE_LENGTH = 36;

export const NO_SPECIAL_CHARACTERS =
    'Your profile name cannot contain special characters';
export const MAX_LENGTH_EXCEEDED = `Your profile name cannot exceed ${MAX_PROFILE_LENGTH} characters`;
export const BLANK_PROFILE = 'Your profile name cannot be blank';

export const validateSpecialCharacters = (text: string) => {
    const format = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
    return format.test(text);
};

export const validateMaxLength = (text: string, maxLength: number) => {
    return text.length > maxLength;
};

export const validateEmptyValue = (text: string) => !text.length;

export const validateProfile = (profile: string): string => {
    const trimmedProfile = profile.trim();

    if (validateMaxLength(trimmedProfile, MAX_PROFILE_LENGTH)) {
        return MAX_LENGTH_EXCEEDED;
    }

    if (validateEmptyValue(trimmedProfile)) {
        return BLANK_PROFILE;
    }

    if (validateSpecialCharacters(trimmedProfile)) {
        return NO_SPECIAL_CHARACTERS;
    }

    return '';
};
