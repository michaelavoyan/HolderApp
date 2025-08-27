import React, {useEffect} from 'react';
import {View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import {DisclosureRequestScreen} from 'app/components/DisclosureRequest';
import {BackButton} from 'app/components/common/BackButton';
import {RootStackParamList} from 'app/navigation/StackParamsList';
import {DisclosureCredentialsToIssuerParams} from 'app/store/types/disclosure';
import {styles} from './styles';
import {useDisclosureCredentialsToIssuer} from './useDisclosureCredentialsToIssuer';
import i18n from '../../../i18n';

const idSubTitle = (name: string = '', brandName: string = '') => {
    let message = i18n.t(
        'To make sure they are issuing your credentials to you and only you, they need to confirm your identity first. You’ll only have to do this once.'
    );

    if (brandName && brandName !== name) {
        message += `\n\n${i18n.t('{{brandName}} is a commercial name of {{name}}.', {brandName, name})}`;
    }
    return message;
};

type Props = StackScreenProps<
    RootStackParamList,
    'DisclosureCredentialsToIssuer'
>;

export const DisclosureCredentialsToIssuer: React.FC<Props> = ({
    route: {params},
    navigation
}) => {
    const {
        isTermsChecked,
        setTermsChecked,
        vendor,
        selectedCredentials,
        disclosureData,
        onCancel,
        onAddItem,
        onShare
    } = useDisclosureCredentialsToIssuer(
        params as DisclosureCredentialsToIssuerParams,
        navigation
    );

    const {t} = useTranslation();

    useEffect(() => {
        navigation.setOptions({
            title: 'Disclosure Request',
            headerLeft: () => (
                <View style={styles.backButton}>
                    <BackButton onPress={onCancel} />
                </View>
            )
        });
    }, [navigation, onCancel]);

    return (
        <DisclosureRequestScreen
            header={{
                logo: (vendor?.brandImage || vendor?.logo) as string,
                subTitle: t(idSubTitle(vendor?.name, vendor?.brandName)),
                title: t(
                    'Get ready to claim your credentials from {{vendorName}}',
                    {
                        vendorName: vendor?.brandName || vendor?.name
                    }
                )
            }}
            credentials={selectedCredentials!}
            disclosureData={disclosureData}
            isTermsChecked={isTermsChecked}
            onCheckTerms={() => setTermsChecked(!isTermsChecked)}
            onAddItem={onAddItem}
            onCancel={onCancel}
            onShare={onShare}
        />
    );
};
