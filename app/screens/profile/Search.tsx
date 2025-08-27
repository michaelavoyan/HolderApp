import React, {useCallback, useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StackScreenProps} from '@react-navigation/stack';
import {useFocusEffect} from '@react-navigation/native';
import {BackHandler, StyleSheet, View} from 'react-native';
import {find} from 'lodash/fp';
import {
    VCLCountry,
    VCLService
} from '@velocitycareerlabs/vcl-react-native';

import {
    vendorsSelector,
    countriesSelector,
    credentialCategoriesSelector
} from 'app/store/selectors';
import {Vendor} from 'app/store/types/claim';
import {DisclosureCredentialsToIssuerParams} from 'app/store/types/disclosure';
import {RootStackParamList} from '../../navigation/StackParamsList';
import {
    clearOriginalIssuingSession,
    getVendors,
    getVendorsSuccess
} from '../../store/actions';
import {CredentialCategories} from '../../store/types/common';
import {
    inspectionSessionSelector,
    savedOriginalIssuingSessionSelector
} from '../../store/selectors/disclosure';

import {
    NewSessionWorkflows,
    startAnotherIssuingWithSameIssuer,
    useClaimingMissingCredential
} from '../../utilities/hooks/useClaimingMissingCredential';
import {BackButton} from '../../components/common/BackButton';
import {isIOS} from '../../utilities/helpers';
import {SearchScreen} from '../../components/Search';

type Props = StackScreenProps<RootStackParamList, 'Issuers'>;

const Search: React.FC<Props> = ({navigation, route}) => {
    const {acceptNavigation, type, isMissingCredentialSession} = route.params;
    const [searchText, setSearchText] = useState<string>('');
    const countries: VCLCountry[] = useSelector(countriesSelector);

    const savedIssuingSession: null | DisclosureCredentialsToIssuerParams =
        useSelector(savedOriginalIssuingSessionSelector);

    const savedInspection = useSelector(inspectionSessionSelector);

    const vendorsStore: Vendor[] = useSelector(vendorsSelector);

    const vendors = vendorsStore.filter((item) => {
        if (savedInspection) {
            return item.name !== savedInspection?.disclosure?.organization.name;
        }

        if (savedIssuingSession) {
            return item.name !== savedIssuingSession?.issuer?.name;
        }
        return true;
    });

    const {startAnotherIssuing} = useClaimingMissingCredential();
    const {stopSecondaryIssuing} = useClaimingMissingCredential(navigation);
    const dispatch = useDispatch();

    const categories: CredentialCategories = useSelector(
        credentialCategoriesSelector
    );
    const types = type ? find(['icon', type], categories)!.types : undefined;

    const cancelOrBackActionInSavedIssuingSession = useCallback(() => {
        if (savedIssuingSession) {
            stopSecondaryIssuing(savedIssuingSession?.issuer?.name || '');
            return;
        }
        navigation.goBack();
        dispatch(clearOriginalIssuingSession());
    }, [dispatch, navigation, savedIssuingSession, stopSecondaryIssuing]);

    const onCancel = useCallback(() => {
        if (savedIssuingSession) {
            cancelOrBackActionInSavedIssuingSession();
            return;
        }
        navigation.goBack();
    }, [
        cancelOrBackActionInSavedIssuingSession,
        navigation,
        savedIssuingSession
    ]);

    useEffect(() => {
        navigation.setOptions({
            title: 'Issuers',
            headerLeft: () => (
                <View style={styles.backButton}>
                    <BackButton onPress={onCancel} />
                </View>
            )
        });
    }, [navigation, onCancel]);

    useEffect(() => {
        const backAction = () => {
            if (savedIssuingSession) {
                cancelOrBackActionInSavedIssuingSession();
                return true;
            }
            return false;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, [cancelOrBackActionInSavedIssuingSession, savedIssuingSession]);

    useFocusEffect(
        useCallback(() => {
            dispatch(getVendors());
            return () => dispatch(getVendorsSuccess([]));
        }, [dispatch])
    );

    const onClaim = (id: string, service: VCLService) => {
        const onContinue = () => {
            navigation.navigate('DisclosureCredentialsToIssuer', {
                did: id,
                service,
                acceptNavigation,
                types,
                isMissingCredentialSession
            });
            setSearchText('');
        };

        if (savedIssuingSession) {
            if (id === savedIssuingSession?.issuer?.id) {
                startAnotherIssuingWithSameIssuer();
                return;
            }
            if (isMissingCredentialSession) {
                onContinue();
                return;
            }
            startAnotherIssuing(
                savedIssuingSession,
                NewSessionWorkflows.claim,
                onContinue
            );
            return;
        }
        onContinue();
    };

    return (
        <View style={styles.container}>
            <SearchScreen
                onClaim={onClaim}
                countries={countries}
                vendors={vendors}
                onChangeText={setSearchText}
                value={searchText}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    backButton: {
        paddingLeft: isIOS ? 16 : 0
    }
});

export default Search;
