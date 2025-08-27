import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, View} from 'react-native';
import {getOr, get, isArray, intersection} from 'lodash/fp';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';

import {VCLServiceType} from '@velocitycareerlabs/vcl-react-native';
import {useTheme} from 'react-native-elements';
import {fontFamily, isIOS, normalize} from 'app/utilities/helpers';
import {
    CredentialFormUIElements,
    useCredentialDetails,
    useCredentialSummaries
} from 'app/utilities/credential-values';
import i18n from '../../i18n';
import {CardWrapper} from '../common/CardWrapper';
import {CredentialVerifiedProps} from './typings/type';
import {AdditionalCredentialInfo} from './AdditionalCredentialInfo';
import {StatusBlock} from '../common/StatusBlock';
import {ClaimCredential, CredentialStatus} from '../../store/types/claim';
import {SVG} from '../../assets/icons';
import {NextButton} from '../common/NextButton';
import {
    categoriesByTypesSelector,
    identityTypesSelector,
    vfCredentialSelector
} from '../../store/selectors';
import {RootStackParamList} from '../../navigation/StackParamsList';
import {Icon} from '../common/Icon';
import {colors} from '../../assets/colors';
import {CredentialItem} from '../common/CredentialItem';
import {RelatedResources} from './RelatedResources';

type CredentialDetailsProps = StackNavigationProp<
    RootStackParamList,
    'CredentialDetails'
>;

export const getSignedBy = (
    issuer: string,
    brand: string,
    service: Array<VCLServiceType>
) => {
    if (service.includes(VCLServiceType.NotaryIssuer)) {
        if (brand && issuer !== brand) {
            return i18n.t(
                'Signed by {{issuer}} as notary issuer, under the commercial name {{brand}}',
                {issuer, brand}
            );
        }
        return i18n.t('Signed by {{issuer}} as notary issuer', {issuer});
    }
    if (brand && issuer !== brand) {
        return i18n.t(
            'Signed by {{issuer}}, under the commercial name {{brand}}',
            {
                issuer,
                brand
            }
        );
    }
    return i18n.t('Signed by {{issuer}}', {issuer});
};

export const CredentialContainer: React.FC<CredentialVerifiedProps> = ({
    credentialObject,
    toggleSaveVisibility,
    changeNotes,
    note = '',
    scrollToInput,
    scrollToField
}) => {
    const {theme} = useTheme();
    const {t} = useTranslation();
    const info = useCredentialDetails(credentialObject);
    const cardInfo = useCredentialSummaries(credentialObject);
    const logo =
        get('issuer.brandImage', credentialObject) ||
        getOr('', 'issuer.logo', credentialObject);
    const status = getOr('', 'status', credentialObject);
    const issuer = get('issuer.name', credentialObject);
    const brand = get('issuer.brandName', credentialObject);
    const category = useSelector((state) =>
        categoriesByTypesSelector(state, credentialObject.type)
    );

    const title = category[0]?.isIdentity
        ? get('title', cardInfo) || brand || getOr('', 'name', issuer)
        : brand || get('title', cardInfo) || getOr('', 'name', issuer);
    const permittedVelocityServiceCategory = getOr(
        '',
        'credentialManifest.verifiedProfile.credentialSubject.permittedVelocityServiceCategory',
        credentialObject
    );
    const navigation = useNavigation<CredentialDetailsProps>();
    const replacedId = getOr('', 'replacerId', credentialObject);
    const replacerCredential: ClaimCredential = useSelector(
        vfCredentialSelector({id: replacedId})
    );
    const identityTypes: string[] = useSelector(identityTypesSelector);
    const isReplaced = credentialObject.status === CredentialStatus.replaced;

    const goToNewCredential = useCallback(() => {
        navigation.replace('CredentialDetails', {
            credential: replacerCredential
        });
    }, [navigation, replacerCredential]);

    return (
        <CardWrapper withBoxShadow credentialTypes={credentialObject.type}>
            <View
                style={[
                    styles.iconRow,
                    status === CredentialStatus.self && styles.selfRow
                ]}>
                {status === CredentialStatus.self
                    ? SVG(theme.colors.dark, 40)['self-report']
                    : null}
                {logo && status !== CredentialStatus.self ? (
                    <Icon styles={styles.icon} uri={logo} />
                ) : (
                    <Text />
                )}
                <View>
                    <StatusBlock
                        expireAt={get('offerExpirationDate', credentialObject)}
                        status={status}
                    />
                </View>
            </View>
            <Text style={styles.title} selectable>
                {t(title)}
            </Text>
            <Text style={styles.subtitle} selectable>
                {t(getOr('', 'subTitle', cardInfo))}
            </Text>
            {isReplaced && replacedId ? (
                <NextButton
                    containerStyle={styles.replacedButton}
                    title={t('Replaced by a new credential')}
                    border="both"
                    onPress={goToNewCredential}
                />
            ) : null}
            {isReplaced && !replacedId ? (
                <NextButton
                    containerStyle={styles.replacedButton}
                    title={t(
                        'Replaced by a new credential that has been deleted'
                    )}
                    border="both"
                    withoutChevron
                    withoutOpacity
                />
            ) : null}
            <AdditionalCredentialInfo credentialObject={credentialObject} />
            <View style={styles.container}>
                {credentialObject?.credentialSubject &&
                    [...info].map((item, index, arr) => {
                        if (
                            item?.schema?.type ===
                            CredentialFormUIElements.BoldTitle
                        ) {
                            return (
                                <Text style={styles.sectionGroupTitle}>
                                    {item.value}
                                </Text>
                            );
                        }

                        if (
                            item?.schema?.type ===
                            CredentialFormUIElements.SectionTitle
                        ) {
                            return (
                                <Text style={styles.sectionTitle}>
                                    {item.value}
                                </Text>
                            );
                        }

                        return (
                            <CredentialItem
                                key={`${item.label}_${item.value}`}
                                label={item.label}
                                info={item.value}
                                isImage={!!item.isImgLink}
                                withoutBorder={
                                    index === arr.length - 1 &&
                                    isArray(item.value)
                                }
                                inputItem={false}
                                toggleSaveVisibility={toggleSaveVisibility}
                                changeNotes={changeNotes}
                                note={note}
                                scrollToInput={scrollToInput}
                                scrollToField={scrollToField}
                            />
                        );
                    })}
                {!!credentialObject?.relatedResource?.length && (
                    <RelatedResources
                        resources={credentialObject.relatedResource}
                    />
                )}
                {issuer &&
                    !intersection(credentialObject.type, identityTypes)
                        .length && (
                        <Text
                            style={[
                                styles.issuer,
                                {color: theme.colors.secondary}
                            ]}
                            selectable>
                            {getSignedBy(
                                issuer,
                                brand,
                                permittedVelocityServiceCategory
                            )}
                        </Text>
                    )}
            </View>
        </CardWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 30
    },
    issuer: {
        fontSize: normalize(13),
        lineHeight: normalize(18),
        letterSpacing: 0.2
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 13
    },
    selfRow: {
        paddingBottom: 23
    },
    icon: {
        width: 50,
        height: 50,
        paddingTop: 5,
        marginRight: 12
    },
    title: {
        ...fontFamily({size: 22, weight: '600', android: {weight: 'bold'}}),
        lineHeight: normalize(26),
        letterSpacing: 0.4,
        paddingBottom: 8
    },
    subtitle: {
        ...fontFamily({size: 14, weight: '500'}),
        fontWeight: '500',
        lineHeight: normalize(17)
    },
    replacedButton: {
        marginTop: 15,
        marginBottom: -23
    },
    sectionGroupTitle: {
        ...fontFamily({size: 16, weight: '600'}),
        paddingTop: 10,
        paddingBottom: 12
    },
    sectionTitle: {
        ...fontFamily({size: 15, weight: '400'}),
        paddingVertical: 5,
        backgroundColor: colors.grayLight,
        paddingLeft: isIOS ? 20 : 21,
        marginHorizontal: isIOS ? -20 : -21,
        marginBottom: 15
    }
});
