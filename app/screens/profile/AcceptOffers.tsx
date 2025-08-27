import {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {getOr, get, isEmpty, map, curryRight, filter, find} from 'lodash/fp';
import {useDispatch, useSelector} from 'react-redux';
import {
    VCLCountry,
    VCLCredentialManifest
} from '@velocitycareerlabs/vcl-react-native';
import {RootStackParamList} from 'app/navigation/StackParamsList';
import {SelectCredentialScreen} from 'app/components/DisclosureSelectItem';
import {
    ClaimCredentialWithCheckbox,
    GenerateOffers,
    Vendor
} from 'app/store/types/claim';
import {MoreButton} from 'app/components/common/MoreButton';
import {CountryCodes} from 'app/store/types/auth';
import {
    countriesSelector,
    credentialManifestSelector,
    regionsSelector,
    vendorSelector,
    vclOffersSelector
} from 'app/store/selectors';
import {toggleCredentialsToShare} from 'app/utilities/credential';
import EMoreButtonOptions from 'app/constants/moreButtonOptions';
import {NavigateOptions} from 'app/navigation/utils';
import {
    DisclosureCredentialsToIssuerParams,
    SelectCredentialToShareParams
} from 'app/store/types/disclosure';
import {finalizeOffers} from '../../store/actions';
import {RootState} from '../../store/reducers';
import {useClaimingMissingCredential} from '../../utilities/hooks/useClaimingMissingCredential';
import {
    inspectionSessionSelector,
    savedOriginalIssuingSessionSelector
} from '../../store/selectors/disclosure';
import {setIsTempUserFirstIssuingSessionActiveAction} from '../../store/actions/disclosure';

type Props = StackScreenProps<RootStackParamList, 'AcceptOffers'>;

export const AcceptOffers: React.FC<Props> = ({
    route: {
        params: {additionalInfo, issuerId, acceptNavigation, withTC}
    },
    navigation
}) => {
    const countries: VCLCountry[] = useSelector(countriesSelector);
    const regions: CountryCodes = useSelector(regionsSelector);
    const issuer = useSelector<RootState, Vendor>(vendorSelector(issuerId));
    const defaultOffers: GenerateOffers = useSelector(vclOffersSelector);
    const [offers, setOffers] = useState<ClaimCredentialWithCheckbox[]>(
        defaultOffers.offers as ClaimCredentialWithCheckbox[]
    );
    const [offer, setOffer] = useState<ClaimCredentialWithCheckbox[]>([]);
    const credentialManifest: VCLCredentialManifest | null = useSelector(
        credentialManifestSelector
    );
    const savedIssuingSession: null | DisclosureCredentialsToIssuerParams =
        useSelector(savedOriginalIssuingSessionSelector);
    const savedInspectionSession: null | SelectCredentialToShareParams =
        useSelector(inspectionSessionSelector);

    const {stopSecondaryIssuingSessionByOfferReject} =
        useClaimingMissingCredential(navigation);

    const dispatch = useDispatch();
    const offersArray = isEmpty(offers) ? defaultOffers.offers : offers;
    const checkedLength = filter('checked', offersArray).length;
    const {t} = useTranslation();

    const onSelectAll = useCallback(() => {
        const checkedOffers = offers.map((item) => ({
            ...item,
            checked: true
        }));
        setOffers(checkedOffers);
    }, [offers]);

    const onUnSelectAll = useCallback(() => {
        const checkedOffers = offers.map((item) => ({
            ...item,
            checked: false
        }));
        setOffers(checkedOffers);
    }, [offers]);

    const getHeaderRight = useCallback(() => {
        return offers.some((item) => !item.checked) ? (
            <MoreButton
                items={[EMoreButtonOptions.SELECT_ALL]}
                onSelect={onSelectAll}
            />
        ) : (
            <MoreButton
                items={[EMoreButtonOptions.UNSELECT_ALL]}
                onSelect={onUnSelectAll}
            />
        );
    }, [offers, onSelectAll, onUnSelectAll]);

    useEffect(() => {
        dispatch(setIsTempUserFirstIssuingSessionActiveAction(false));
    }, [dispatch]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: getHeaderRight
        });
    }, [getHeaderRight, navigation, onUnSelectAll]);

    const toggleItem = (val: ClaimCredentialWithCheckbox | boolean) => {
        const checkedOffers = map(
            curryRight(toggleCredentialsToShare)(val),
            offers
        );
        setOffers(checkedOffers);
    };

    const onCredentialDetails = useCallback(
        (credential: ClaimCredentialWithCheckbox) => {
            navigation.navigate('CredentialDetails', {
                credential,
                isOffer: true,
                onAcceptOffer: () => {
                    setOffer([
                        {
                            ...credential,
                            checked: true
                        }
                    ]);
                }
            });
        },
        [navigation]
    );

    const onCancel = useCallback(() => {
        if (savedIssuingSession) {
            stopSecondaryIssuingSessionByOfferReject(
                savedIssuingSession?.issuer?.name || '',
                () =>
                    navigation.reset({
                        index: 2,
                        routes: [
                            {
                                name: 'Tabs'
                            },
                            {
                                name: 'DisclosureRequest',
                                params: savedIssuingSession
                            }
                        ]
                    })
            );
            return;
        }

        if (savedInspectionSession) {
            navigation.reset({
                index: 2,
                routes: [
                    {
                        name: 'Tabs'
                    },
                    {
                        name: 'DisclosureRequest',
                        params: savedInspectionSession.acceptNavigation.params
                    },
                    {
                        name: 'SelectCredentialToShare',
                        params: savedInspectionSession
                    }
                ]
            });

            return;
        }
        navigation.goBack();
    }, [
        navigation,
        savedIssuingSession,
        stopSecondaryIssuingSessionByOfferReject,
        savedInspectionSession
    ]);

    const finalizeOffersCb = useCallback(() => {
        const onAccept = () => {
            const offersToFinalize = offer.length ? offer : offers;
            const navigationCallback = () => {
                if (savedIssuingSession) {
                    return {
                        path: 'DisclosureCredentialsToIssuer',
                        params: savedIssuingSession
                    };
                }

                if (savedInspectionSession) {
                    return {
                        path: 'SelectCredentialToShare',
                        params: savedInspectionSession
                    };
                }

                if (offer.length && offers.length > 1) {
                    return {
                        path: '',
                        params: {},
                        option: NavigateOptions.GoBack
                    };
                }

                return acceptNavigation || {path: 'Profile'};
            };

            if (credentialManifest) {
                dispatch(
                    finalizeOffers({
                        offers: {...defaultOffers, offers: offersToFinalize},
                        vendor: {
                            logo: getOr('', 'logo', issuer),
                            country: find(
                                ['code', get('location.countryCode', issuer)],
                                countries
                            )?.name
                        },
                        additionalInfo,
                        credentialManifest,
                        vclToken: get('[0].vclToken', offersToFinalize),
                        navigation: navigationCallback()
                    })
                );
            }
        };

        onAccept();

        if (offer.length) {
            setOffers(offers.filter((item) => item.id !== offer[0].id));
            setOffer([]);
        }
    }, [
        savedIssuingSession,
        offer,
        offers,
        credentialManifest,
        savedInspectionSession,
        acceptNavigation,
        dispatch,
        defaultOffers,
        issuer,
        countries,
        additionalInfo
    ]);

    useEffect(() => {
        if (offer.length) {
            finalizeOffersCb();
        }
    }, [finalizeOffersCb, offer]);

    return (
        <SelectCredentialScreen
            items={offers}
            countries={countries}
            regions={regions}
            onPressItem={onCredentialDetails}
            toggleItem={toggleItem}
            selectEnabled={!!checkedLength}
            onPressPrimary={finalizeOffersCb}
            onCancel={onCancel}
            primaryTitle={t('Accept')}
            withTC={withTC}
        />
    );
};
