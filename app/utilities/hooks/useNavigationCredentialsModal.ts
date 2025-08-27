import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {getOr} from 'lodash/fp';
import {map} from 'lodash';
import {StackNavigationProp} from '@react-navigation/stack/src/types';
import {useSelector} from 'react-redux';

import {VCLCredentialTypeSchema} from '@velocitycareerlabs/vcl-react-native';
import {DisclosureCredentialsToIssuerParams} from 'app/store/types/disclosure';
import {CredentialsModalItems} from '../../constants/credentials';
import {RootStackParamList} from '../../navigation/StackParamsList';
import {CredentialCategory} from '../../store/types/common';
import {credentialTypesSchemasByTypesSelector} from '../../store/selectors';
import {VCLState} from '../../store/types/vcl';
import {ModalItemType} from '../../components/common/typings/types';
import {savedOriginalIssuingSessionSelector} from '../../store/selectors/disclosure';
import {
    NewSessionWorkflows,
    useClaimingMissingCredential
} from './useClaimingMissingCredential';

export const useNavigationCredentialsModal = ({
    goToKYC,
    navigation,
    category,
    onOpenSelfReportTypes
}: {
    goToKYC(): void;
    onOpenSelfReportTypes(modalItems: ModalItemType[]): void;
    navigation: StackNavigationProp<RootStackParamList>;
    category?: CredentialCategory;
}) => {
    const credentialTypeSchemas: VCLState['credentialTypesSchemas'] = useSelector(
        credentialTypesSchemasByTypesSelector(getOr([], 'types', category))
    );
    const savedIssuingSession: null | DisclosureCredentialsToIssuerParams = useSelector(
        savedOriginalIssuingSessionSelector
    );
    const {startAnotherIssuing} = useClaimingMissingCredential();

    const {t} = useTranslation();

    const showPopupToStopPrevSession = useCallback(
        (onContinueCurrentProcess: () => void) => {
            if (savedIssuingSession) {
                startAnotherIssuing(
                    savedIssuingSession,
                    NewSessionWorkflows.claim,
                    onContinueCurrentProcess
                );
                return;
            }
            onContinueCurrentProcess();
        },
        [savedIssuingSession, startAnotherIssuing]
    );

    const onModalItemNavigation = useCallback(
        (title: string) => {
            if (title === t(CredentialsModalItems.ClaimIssuer)) {
                navigation.navigate('Issuers', {
                    type: category?.icon
                });
            } else if (title === t(CredentialsModalItems.SelfReport)) {
                onOpenSelfReportTypes(
                    map(
                        credentialTypeSchemas,
                        (item: VCLCredentialTypeSchema, key: string) => ({
                            title: getOr('', 'payload.title', item),
                            action: () =>
                                navigation.navigate('SelfReport', {
                                    credentialTypeSchema: item,
                                    credentialSchemaName: key
                                })
                        })
                    )
                );
            } else if (title === t(CredentialsModalItems.Phone)) {
                showPopupToStopPrevSession(() => {
                    navigation.navigate('AddPhone');
                });
            } else if (title === t(CredentialsModalItems.Email)) {
                showPopupToStopPrevSession(() => {
                    navigation.navigate('AddEmail');
                });
            } else if (title === t(CredentialsModalItems.Id)) {
                showPopupToStopPrevSession(() => {
                    goToKYC();
                });
            }
        },
        [
            t,
            navigation,
            category?.icon,
            onOpenSelfReportTypes,
            credentialTypeSchemas,
            showPopupToStopPrevSession,
            goToKYC
        ]
    );

    return {onModalItemNavigation};
};
