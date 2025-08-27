import VclReactNative from '@velocitycareerlabs/vcl-react-native';
import * as authStorage from 'app/storage/oauth';
import * as popups from '../../../../utilities/popups';
import {issCheck} from '../../utils/messages';
import i18n from '../../../../i18n';
import {finalizeOffers} from '../../verification';
import {credentialManifest, token, vclOffers} from '../../utils/mocks';

const openStatusPopup = jest
    .spyOn(popups, 'openStatusPopup')
    .mockImplementation();

const finalizeOffersMock = jest.spyOn(VclReactNative, 'finalizeOffers');

jest.spyOn(authStorage, 'getOauthTokens').mockImplementation(() =>
    Promise.resolve({
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
        accountId: 'accountId'
    })
);

jest.mock('app/jwt/core.ts', () => ({
    __esModule: true,
    jwtDecode: () => ({claimsSet: {exp: Date.now()}})
}));

beforeEach(() => {
    jest.clearAllMocks();
});

describe('finalize offers returns object of two arrays: passedCredentials and failedCredentials', () => {
    describe('finalize offers', () => {
        it('should show popup if response contains failedCredentials', async () => {
            finalizeOffersMock.mockImplementation(() =>
                Promise.resolve({
                    passedCredentials: [],
                    failedCredentials: [{id: '123', encodedJwt: '123'}]
                })
            );

            await finalizeOffers(credentialManifest, vclOffers, token);

            const errorMessagePopup = openStatusPopup.mock.calls[0][0];

            expect(JSON.stringify(errorMessagePopup)).toEqual(
                JSON.stringify({
                    params: {
                        ...issCheck(1),
                        buttonTitle: i18n.t('OK'),
                        onPress: () => {}
                    }
                })
            );
        });

        it('should skip popup if no failedCredentials in response', async () => {
            finalizeOffersMock.mockImplementation(() =>
                Promise.resolve({
                    passedCredentials: [{id: '123', encodedJwt: '123'}],
                    failedCredentials: []
                })
            );

            await finalizeOffers(credentialManifest, vclOffers, token);

            expect(popups.openStatusPopup).not.toBeCalled();
        });

        it('should skip popup if no credentials in response', async () => {
            finalizeOffersMock.mockImplementation(() =>
                Promise.resolve({
                    passedCredentials: [],
                    failedCredentials: []
                })
            );

            await finalizeOffers(credentialManifest, vclOffers, token);

            expect(popups.openStatusPopup).not.toBeCalled();
        });
    });
});
