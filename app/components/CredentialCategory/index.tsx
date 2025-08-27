import React, { useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {VCLCountry} from '@velocitycareerlabs/vcl-react-native';
import {useNetInfo} from '@react-native-community/netinfo';
import {getOr} from 'lodash/fp';
import {warnUserAboutLinkedinApp} from 'app/utilities/linkedin';
import {t} from 'i18next';
import {CountryCodes} from '../../store/types/auth';
import {ClaimCredential} from '../../store/types/claim';
import {CredentialsModal} from '../common/CredentialsModal';
import {CredentialSummary} from '../common/CredentialSummary';
import { ModalType} from '../common/typings/types';
import {CredentialCategoryHeader} from '../Profile/CredentialCategoryHeader';
// import {CredentialsModalItems} from '../../constants/credentials';
import {SavedSelfReportCredential} from '../../store/types/profile';
import {ShareModal} from '../common/ShareModal';
import {SelfReportFooter} from '../common/SelfReportFooter';
import {CredentialsModalItems} from '../../constants/credentials';

export const CredentialCategoryScreen: React.FC<{
    type: string;
    onCreate?: () => void; // plus button click
    onCredentialDetails(
        item: ClaimCredential | SavedSelfReportCredential
    ): void;
    // TODO: change type of onModalItemSelect?: (title: string) to CredentialsModalItems after Typescript 5 release
    onModalItemSelect?: (title: string) => void;
    title: string;
    size: number;
    countries: VCLCountry[];
    regions: CountryCodes;
    items: (ClaimCredential | SavedSelfReportCredential)[];
    onClose?: () => void;
    modal?: ModalType;
    isIdentityCredential: boolean;
    onSelfReport?: (title: string) => void;
}> = ({
    type,
    onCreate,
    onCredentialDetails,
    title,
    size,
    items,
    countries,
    regions,
    onClose,
    modal,
    onModalItemSelect,
    isIdentityCredential,
    onSelfReport
}) => {
    const {isConnected} = useNetInfo();
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [credentialToShare, setCredentialToShare] = useState<
        ClaimCredential | SavedSelfReportCredential
    >();
    const [shareToLinkedIn, setShareToLinkedIn] = useState();

    return (
        <ScrollView style={styles.container}>
            <CredentialCategoryHeader
                type={type}
                title={title}
                onCreate={onCreate}
                credentialsNumber={size}
                containerStyle={styles.header}
                disabledPlusBtn={isConnected === false}
            />
            <View style={styles.credentialsContainer}>
                {items.map((item) => (
                    <CredentialSummary
                        key={item.id}
                        onCredentialDetails={() => onCredentialDetails(item)}
                        countries={countries}
                        regions={regions}
                        item={item}
                        isShareEnabled
                        onShare={(share) => {
                            setIsShareModalOpen(true);
                            setCredentialToShare(item);
                            setShareToLinkedIn(() => share);
                        }}
                    />
                ))}
            </View>
            {!isIdentityCredential && <SelfReportFooter
                style={styles.selfReportFooter}
                onPress={() => {
                    if (onSelfReport)
                        onSelfReport(t(CredentialsModalItems.SelfReport));
                }}
            />}
            {modal && (
                <CredentialsModal
                    onClose={onClose}
                    modal={modal}
                    onModalItemSelect={onModalItemSelect}
                />
            )}
            <ShareModal
                isShareModalOpen={isShareModalOpen}
                onLinkedinShareSelect={() => {
                    warnUserAboutLinkedinApp(shareToLinkedIn);
                }}
                onClose={() => setIsShareModalOpen(false)}
                isLinkedinShareEnabled={!isIdentityCredential}
                selectedCredentialId={getOr('', 'id', credentialToShare)}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        ...Platform.select({
            ios: {
                paddingHorizontal: 24
            },
            android: {
                paddingHorizontal: 16
            }
        })
    },
    header: {
        marginTop: 5,
        ...Platform.select({
            android: {
                marginTop: 24
            }
        })
    },
    credentialsContainer: {
        paddingBottom: 0
    },
    selfReportFooter: {
        ...Platform.select({
            ios: {
                margin: 10
            },
            android: {
                margin: 30
            }
        }),
        alignSelf: 'center'
    }
});
