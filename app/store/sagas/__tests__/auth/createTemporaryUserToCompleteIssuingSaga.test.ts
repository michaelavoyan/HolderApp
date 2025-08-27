import AsyncStorage from '@react-native-async-storage/async-storage';
import * as PopupActions from 'app/utilities/popups';
import {getVCLRealmInstance} from 'app/storage/common';
import {User} from 'app/storage/schema/user';
import {TEMP_USER_IMAGE, TEMP_USER_NAME} from 'app/utilities/qr';
import {USER_ID} from 'app/storage/constants';
import {createTemporaryUserToCompleteIssuingAction} from '../../../actions/auth';
import {initTestsStore} from '../../../store';
import * as PushActions from '../../../actions/push';

jest.spyOn(PushActions, 'registerDevice').mockImplementation(() => ({
    type: 'TEST_ACTION'
}));

jest.spyOn(PopupActions, 'openLoadingPopup').mockImplementation(jest.fn);
jest.spyOn(PopupActions, 'closePopup').mockImplementation(jest.fn);

describe('GIVEN I am a user that is not logged in and opens APP from issuing Deep Link', () => {
    describe('WHEN createTemporaryUserToCompleteIssuingSaga is triggered', () => {
        const store = initTestsStore();

        store.dispatch(
            createTemporaryUserToCompleteIssuingAction({
                onUserCreated: () => {}
            })
        );

        it('THEN temporary user should be created in Realm database with proper fields', async () => {
            const realm = await getVCLRealmInstance();

            const realmStoredUsers = realm.objects(User.name);

            expect(realmStoredUsers).toHaveLength(1);

            expect(realmStoredUsers[0]).toEqual(
                expect.objectContaining({
                    id: expect.stringContaining('temp_issuing_user'),
                    image: TEMP_USER_IMAGE,
                    isRetained: true,
                    name: TEMP_USER_NAME
                })
            );
        });

        it('THEN ID of temporary user should be stored in Async Storage', async () => {
            const realm = await getVCLRealmInstance();

            const realmStoredUsers = realm.objects(User.name);

            expect(await AsyncStorage.getItem(USER_ID)).toEqual(
                (realmStoredUsers[0] as any).id
            );
        });

        it('THEN ID of temporary user should be stored in Redux Storage', async () => {
            const realm = await getVCLRealmInstance();

            const realmStoredUsers = realm.objects(User.name);

            expect(store.getState().auth.userId).toEqual(
                (realmStoredUsers[0] as any).id
            );
        });

        it('THEN registerDevice action responsible for push token generation is triggered', async () => {
            await new Promise((r) => setTimeout(r, 0));

            expect(PushActions.registerDevice).toHaveBeenCalledTimes(1);
        });

        it('THEN user object should be stored in redux properly', async () => {
            const realm = await getVCLRealmInstance();

            const [userData] = realm.objects(User.name);

            expect(store.getState().auth.user).toEqual({
                id: (<any>userData).id,
                image: (<any>userData).image,
                name: (<any>userData).name,
                isRetained: true
            });
        });
    });
});
