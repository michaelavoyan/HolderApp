import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, ScrollView, Platform, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import EMoreButtonOptions from 'app/constants/moreButtonOptions';
import {ClaimCredential} from 'app/store/types/claim';
import {useCheckCredentialsExpiration} from 'app/utilities/hooks/useCheckCredentialsExpiration';
import {isIdentitySelector} from 'app/store/selectors';
import {useSelector} from 'react-redux';
import {CredentialContainer} from './CredentialContainer';
import {CredentialVerifiedProps} from './typings/type';
import {GenericButton} from '../common/GenericButton';
import {MoreButton} from '../common/MoreButton';
import {ContactIssuer} from '../common/ContactIssuer';
import {ShareCredentialButton} from '../common/ShareCredentialButton';
import {ShareModal} from '../common/ShareModal';
import {VclReactNativeSdkWrapper} from '../../api/vcl-react-native-sdk-wrapper';

export const CredentialDetailsScreen: React.FC<CredentialVerifiedProps> = ({
    onFinalize,
    ...props
}) => {
    const navigation = useNavigation();
    const {t} = useTranslation();
    const issuerDid = (props.credentialObject as ClaimCredential).issuer?.id;
    const [email, setEmail] = useState('');
    const [emailLoading, setEmailLoading] = useState(true);
    const isCredentialExpired = useCheckCredentialsExpiration(
        props.credentialObject?.offerExpirationDate
            ? [props.credentialObject?.offerExpirationDate]
            : []
    );
    const isIdenitityCredential =  useSelector(isIdentitySelector(props.credentialObject?.type));
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    const headerRight = useCallback(() => {
        if (onFinalize) {
            return (
                <MoreButton
                    items={
                        isCredentialExpired
                            ? [EMoreButtonOptions.REJECT]
                            : [
                                  EMoreButtonOptions.ACCEPT,
                                  EMoreButtonOptions.REJECT
                              ].map((i) => t(i))
                    }
                    onSelect={(item) => {
                        onFinalize(item === t(EMoreButtonOptions.ACCEPT));
                    }}
                    destructiveButtonIndex={2}
                />
            );
        }
        return (
            <MoreButton
                items={[EMoreButtonOptions.ACCEPT].map((i) => t(i))}
                onSelect={props.onAcceptOffer}
            />
        );
    }, [onFinalize, props.onAcceptOffer, t, isCredentialExpired]);

    useEffect(() => {
        if (onFinalize || props.onAcceptOffer) {
            navigation.setOptions({
                headerRight
            });
        }
    });

    useEffect(() => {
        const getEmail = async () => {
            if (issuerDid) {
                const profile = await VclReactNativeSdkWrapper.getVerifiedProfile({
                    did: issuerDid
                });

                setEmail(
                    profile?.payload?.credentialSubject?.contactEmail || ''
                );
            }

            setEmailLoading(false);
        };

        getEmail();
    }, [issuerDid]);

    return (
        <ScrollView contentContainerStyle={[styles.container]}>
            <CredentialContainer {...props} />
            {onFinalize && (
                <View style={styles.btnContainer}>
                    <GenericButton
                        containerStyle={styles.buttonContainerLeft}
                        title={t('Reject')}
                        type="reject"
                        onPress={() => onFinalize()}
                    />
                    <GenericButton
                        disabled={isCredentialExpired}
                        containerStyle={styles.buttonContainerRight}
                        title={t('Accept')}
                        type="primary"
                        onPress={() => onFinalize(true)}
                    />
                </View>
            )}
            <View style={styles.btnContainerFooter}>
                {!onFinalize && !props.onAcceptOffer && (
                    <ShareCredentialButton
                        isShareEnabled
                        onPress={() => {
                            setIsShareModalOpen(true);
                        }}
                    />
                )}
                <ContactIssuer email={email} loading={emailLoading} />
            </View>
            <ShareModal
                isShareModalOpen={isShareModalOpen}
                onLinkedinShareSelect={props.onLinkedInShare}
                onClose={() => setIsShareModalOpen(false)}
                isLinkedinShareEnabled = {!isIdenitityCredential}
                selectedCredentialId={props.credentialObject.id}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 8,
        paddingTop: 10,
        ...Platform.select({
            android: {
                paddingTop: 12
            }
        }),
        paddingBottom: 20
    },
    buttonContainerLeft: {
        marginRight: 5
    },
    buttonContainerRight: {
        marginLeft: 5
    },
    btnContainer: {
        flexDirection: 'row',
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnContainerFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 40
    }
});
