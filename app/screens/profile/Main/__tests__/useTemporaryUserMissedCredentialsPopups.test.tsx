import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import {waitFor} from '@testing-library/react-native';

import {NavigationContainer} from '../../../../../storybook/decorators/Navigation';
import {generateNewWrappedRenderer} from '../../../../../storybook/utils/TestAppProvider';
import {useTemporaryUserMissedCredentialsPopups} from '../useTemporaryUserMissedCredentialsPopups';
import {
    getUserSuccess,
    selfReportedCredentialsSuccess,
    verifiableCredentialsSuccess
} from '../../../../store/actions';
import {
    TEMP_USER_NAME,
    generateTemporaryUserToCompleteIssuing
} from '../../../../utilities/qr';
import {IDENTITY_PHONE} from '../../../../../storybook/constants';

const ProfileMockScreen = () => {
    useTemporaryUserMissedCredentialsPopups(true);
    return null;
};

describe("Displaying 'Verify phone number' and 'Create your profile' popups feature", () => {
    describe("GIVEN I'am user that automatically generated during issuing flow", () => {
        describe('AND phone credential is not added', () => {
            describe('WHEN I open profile page', () => {
                it('THEN I should see popup that reminds me to add phone', async () => {
                    const {store, wrappedRender} = generateNewWrappedRenderer();

                    store.dispatch(verifiableCredentialsSuccess([]));
                    store.dispatch(selfReportedCredentialsSuccess([]));

                    const {findByText} = wrappedRender(
                        <NavigationContainer Profile={ProfileMockScreen} />
                    );

                    store.dispatch(
                        getUserSuccess(generateTemporaryUserToCompleteIssuing())
                    );

                    await waitFor(() =>
                        findByText(
                            'Please verify your phone number to use Velocity Career Wallet'
                        )
                    );
                });
            });
        });

        describe(`AND phone credential has been added AND user name has default value ${TEMP_USER_NAME}`, () => {
            describe('WHEN I open profile page', () => {
                it('THEN I should see popup that reminds me to complete profile', async () => {
                    const {store, wrappedRender} = generateNewWrappedRenderer();

                    store.dispatch(
                        verifiableCredentialsSuccess([IDENTITY_PHONE])
                    );

                    const {findByText} = wrappedRender(
                        <NavigationContainer Profile={ProfileMockScreen} />
                    );

                    store.dispatch(
                        getUserSuccess(generateTemporaryUserToCompleteIssuing())
                    );

                    await waitFor(() =>
                        findByText('Create your Velocity Career Wallet profile')
                    );
                });
            });
        });
    });
});
