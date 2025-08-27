import {select} from 'redux-saga/effects';
import {FullUser} from '../../../types/auth';
import {OAuthProps, getOauthTokens} from '../../../../storage/oauth';
import {userSelector} from '../../../selectors';

export function* isAccountCreatedEffect() {
    const user: FullUser = yield select(userSelector);
    const oauthTokens: OAuthProps = yield getOauthTokens();

    return Boolean(
        user?.accountId && oauthTokens?.accountId === user?.accountId
    );
}
