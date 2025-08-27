import {getOr} from 'lodash/fp';
import {isEmpty} from 'lodash';
import {VCLDidJwk} from '@velocitycareerlabs/vcl-react-native';
import {getVCLRealmInstance, setObject} from './common';
import {convertRealmObjectsToArray} from '../utilities/helpers';
import {vclLogger} from '../utilities/logger';
import {OAuth} from './schema/OAuth';

export type OAuthProps = {
    accessToken: string;
    refreshToken: string;
    accountId: string;
    didJwk?: VCLDidJwk;
    active?: boolean;
};

export const getOauthTokens = async (): Promise<OAuthProps> => {
    try {
        const realm = await getVCLRealmInstance();
        const oauthObjects = realm.objects<OAuthProps>(OAuth.name);

        return getOr(
            {},
            '[0]',
            convertRealmObjectsToArray<OAuthProps>(
                oauthObjects.filtered('active = true')
            )
        ) as OAuthProps;
    } catch (error) {
        vclLogger.error(
            `Failed to GET OAuth tokens with error: ${JSON.stringify(error)}`
        );

        throw error;
    }
};

export const initOauthTokens = async (tokens: Omit<OAuthProps, 'didJwk'>) => {
    try {
        await inactivateOauthTokens();

        return setObject(OAuth.name, {
            ...tokens,
            active: true
        });
    } catch (error) {
        vclLogger.error(
            `Failed to SET OAuth tokens with error: ${JSON.stringify(error)}`,
            error
        );

        throw error;
    }
};

export const updateOauthTokens = async (
    tokens: Partial<OAuthProps>,
    accountId: string
) => {
    try {
        const realm = await getVCLRealmInstance();
        const oauthObject = realm
            .objects<OAuthProps>(OAuth.name)
            .filtered(`accountId = "${accountId}"`);

        if (!isEmpty(oauthObject)) {
            realm.write(() => {
                Object.assign(oauthObject[0], tokens);
            });
        }
    } catch (error) {
        vclLogger.error(
            `Failed to UPDATE OAuth tokens with error: ${JSON.stringify(
                error
            )}`,
            error
        );

        throw error;
    }
};

export const removeOauthTokens = async () => {
    try {
        const realm = await getVCLRealmInstance();
        const objects = realm.objects(OAuth.name).filtered('active = true');

        if (!isEmpty(objects)) {
            realm.write(() => {
                realm.delete(objects);
            });
        }

        return true;
    } catch (error) {
        vclLogger.error(
            `Failed to REMOVE OAuth tokens with error: ${JSON.stringify(
                error
            )}`,
            error
        );

        throw error;
    }
};

export const inactivateOauthTokens = async () => {
    try {
        const realm = await getVCLRealmInstance();
        const objects = realm.objects(OAuth.name).filtered('active = true');

        if (!isEmpty(objects)) {
            realm.write(() => {
                Object.assign(objects[0], {active: false});
            });
        }

        return true;
    } catch (error) {
        vclLogger.error(
            `Failed to INACTIVATE OAuth tokens with error: ${JSON.stringify(
                error
            )}`,
            error
        );

        throw error;
    }
};
