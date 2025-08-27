import React, {
    useCallback,
    useMemo,
    useEffect,
    useState,
    memo,
    FC
} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-elements';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {MoreButton} from 'app/components/common/MoreButton';
import EMoreButtonOptions from 'app/constants/moreButtonOptions';
import {ClaimCredential} from 'app/store/types/claim';
import CredentialsInCategoryList from 'app/components/ShareToLinkedIn/CredentialsInCategoryList';
import {BackButton} from 'app/components/common/BackButton';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {getLinkedinEmail} from 'app/api/linkedin.service';
import {getOr} from 'lodash/fp';
import {RootStackParamList} from 'app/navigation/StackParamsList';
import {StackScreenProps} from '@react-navigation/stack';
import {GenericButton} from 'app/components/common/GenericButton';
import {
    nonIdentityCredentials,
    categoriesByTypesSelector,
    configSelector
} from 'app/store/selectors';
import {findCredentialType} from 'app/utilities/helpers';
import {SharedCredentialsList} from '../../components/PastDisclosures/SharedCredentialsList';
import {CredentialCategories} from '../../store/types/common';
import {useGetPostToLikedInDescripror} from '../../components/ShareToLinkedIn/useGetPostToLikedInDescripror';
import {getLinkedInAccessToken} from '../../storage/asyncStorage';
import {ClaimCredentialWithCheckbox} from '../../components/DisclosureRequest/types';
import {ShareCredentialsToLinkedIn} from './ShareCredentialsToLinkedIn';

type Props = StackScreenProps<
    RootStackParamList,
    'LinkedInSelectCredentialToShare'
>;

export const LinkedInSelectCredentialToShare: FC<Props> = ({route}) => {
    const credentialsFromClaiming = route?.params?.credentials;
    const credentialsInProgress = route?.params?.credentialsInProgress;
    const shareInProgress = Boolean(route?.params?.inProgress);
    const {theme} = useTheme();
    const {t} = useTranslation();
    const navigation = useNavigation();
    const config = useSelector(configSelector);
    const allCredentials = useSelector(nonIdentityCredentials);

    const [credentialsWithCheckbox, setCredentialsWithCheckbox] = useState<
        ClaimCredentialWithCheckbox[]
    >([]);

    const [categoryOpened, setCategoryOpened] = useState(
        Boolean(credentialsFromClaiming?.length)
    );
    const [selectedCategoryTypes, setSelectedCategoryTypes] = useState<
        string[]
    >([]);

    const [isShared, setIsShared] = useState(false);
    const [token, setToken] = useState('');
    const [userEmail, setUserEmail] = useState({});

    const credentialTypes = useMemo(() => {
        return Object.keys(
            allCredentials.reduce<{[type: string]: boolean}>((acc, item) => {
                item.type.forEach((value) => {
                    acc[value] = true;
                });

                return acc;
            }, {})
        );
    }, [allCredentials]);

    const nonEmptyCredentialCategories: CredentialCategories = useSelector(
        (state: any) => categoriesByTypesSelector(state, credentialTypes)
    );

    useEffect(() => {
       return () => {
        setIsShared(false);
       }
    },[]);

    useEffect(() => {
        if (!credentialsWithCheckbox.length && allCredentials.length) {
            setCredentialsWithCheckbox([
                ...allCredentials.map((item) => ({...item, checked: false}))
            ] as ClaimCredentialWithCheckbox[]);
        }
    }, [allCredentials, credentialsWithCheckbox]);

    useEffect(() => {
        if (credentialsInProgress && shareInProgress) {
            setCredentialsWithCheckbox(credentialsInProgress);
            handleShare();
        }
    }, [credentialsInProgress, shareInProgress]);

    const checkCredentials = useMemo(() => {
        return credentialsWithCheckbox.filter((item) => item.checked);
    }, [credentialsWithCheckbox]);

    const updateCredentialsCheckedStatus = useCallback(
        (checkStatus: boolean, filterByCategory = false) => {
            return credentialsWithCheckbox.map((item) => {
                const isInSelectedCategory = selectedCategoryTypes.includes(
                    findCredentialType(item.type) ?? ''
                );
                if (!filterByCategory || isInSelectedCategory) {
                    return {...item, checked: checkStatus};
                }
                return item;
            });
        },
        [credentialsWithCheckbox, selectedCategoryTypes]
    );

    const onSelectAll = useCallback(() => {
        setCredentialsWithCheckbox(
            updateCredentialsCheckedStatus(
                true,
                categoryOpened && selectedCategoryTypes.length > 0
            )
        );
    }, [
        categoryOpened,
        selectedCategoryTypes.length,
        updateCredentialsCheckedStatus
    ]);

    const onUnSelectAll = useCallback(() => {
        setCredentialsWithCheckbox(
            updateCredentialsCheckedStatus(
                false,
                categoryOpened && selectedCategoryTypes.length > 0
            )
        );
    }, [
        categoryOpened,
        selectedCategoryTypes.length,
        updateCredentialsCheckedStatus
    ]);

    const isAllCredentialsSelected = useCallback(() => {
        const filteredCredentials =
            categoryOpened && selectedCategoryTypes.length
                ? credentialsWithCheckbox.filter((item) =>
                      selectedCategoryTypes.includes(findCredentialType(item.type) ?? '')
                  )
                : credentialsWithCheckbox;
        return filteredCredentials.every((item) => item.checked);
    }, [categoryOpened, credentialsWithCheckbox, selectedCategoryTypes]);

    useEffect(() => {
        getLinkedInAccessToken().then((accessToken: string | null) => {
            setToken(accessToken || '');
        });
        getLinkedinEmail(config, token).then((email: any) => {
            setUserEmail(email);
        });
    }, [config, token]);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <BackButton
                    onPress={() =>
                        categoryOpened
                            ? setCategoryOpened(false)
                            : navigation.goBack()
                    }
                />
            ),
            headerRight: () =>
                isAllCredentialsSelected() ? (
                    <MoreButton
                        items={[EMoreButtonOptions.UNSELECT_ALL].map((i) =>
                            t(i)
                        )}
                        onSelect={onUnSelectAll}
                    />
                ) : (
                    <MoreButton
                        items={[EMoreButtonOptions.SELECT_ALL].map((i) => t(i))}
                        onSelect={onSelectAll}
                    />
                )
        });
    }, [
        categoryOpened,
        isAllCredentialsSelected,
        navigation,
        onSelectAll,
        onUnSelectAll,
        t
    ]);

    const handleCategotyPress = useCallback((...rest: any) => {
        setCategoryOpened(true);
        setSelectedCategoryTypes(rest[0].types);
    }, []);

    const handleSelect = useCallback(
        (credentials: ClaimCredentialWithCheckbox[]) => {
            setCredentialsWithCheckbox((prevState) => [
                ...prevState.filter(
                    (item) =>
                        !credentials.some(
                            (credential: ClaimCredentialWithCheckbox) =>
                                credential.id === item.id
                        )
                ),
                ...credentials
            ]);

            if (credentialsFromClaiming) {
                handleShare();
                return;
            }

            setCategoryOpened(false);
        },
        [credentialsFromClaiming]
    );

    const handleSelectAllinCategory = useCallback(
        (categoryTypes: string[]) => {
            setCredentialsWithCheckbox(
                credentialsWithCheckbox.map((item) =>
                    categoryTypes.includes(findCredentialType(item.type) ?? '')
                        ? {...item, checked: true}
                        : item
                )
            );
        },
        [credentialsWithCheckbox]
    );

    const handleShare = () => {
        setIsShared(true);
        AsyncStorage.setItem('LinkedInTerms', 'false');
    };

    const handleCancel = () => {
        if (credentialsFromClaiming) {
            navigation.goBack();
            return;
        }
        setCategoryOpened(false);
    };

    return (
        <>
            {!categoryOpened ? (
                <ScrollView
                    contentContainerStyle={styles.constainerStyle}
                    style={[
                        styles.container,
                        {
                            backgroundColor: theme.colors.secondaryBg
                        }
                    ]}>
                    <>
                        <View>
                            <SharedCredentialsList
                                types={credentialTypes}
                                credentials={credentialsWithCheckbox}
                                onPress={handleCategotyPress}
                                hideEmpty={false}
                                itemStyle={styles.itemStyle}
                                title=""
                                isPublicSharingMode
                                categories={nonEmptyCredentialCategories}
                                handleSelectAllinCategory={
                                    handleSelectAllinCategory
                                }
                            />
                        </View>
                        <View style={styles.buttons}>
                            <GenericButton
                                containerStyle={styles.leftButton}
                                type="secondary"
                                title={t('Cancel')}
                                onPress={() => {
                                    navigation.goBack();
                                }}
                            />
                            <GenericButton
                                containerStyle={styles.rightButton}
                                type="primary"
                                title={t('Share')}
                                disabled={checkCredentials.length === 0}
                                onPress={handleShare}
                            />
                        </View>
                    </>
                </ScrollView>
            ) : (
                <CredentialsInCategoryList
                    credentials={credentialsWithCheckbox}
                    types={selectedCategoryTypes}
                    onCancel={handleCancel}
                    onSelect={handleSelect}
                    defaultCredentials={credentialsFromClaiming }
                />
            )}
            {isShared && (
                <ShareCredentialsToLinkedIn
                    checkCredentials={checkCredentials}
                    credentialsFromClaiming={credentialsFromClaiming}
                    token={token || ''}
                    email={userEmail}
                    inProgress={shareInProgress}
                    setIsShared={setIsShared}
                    navigation={navigation}>
                    {checkCredentials.map((credential) => {
                        return (
                            <ShareToLinkedInDescriptor
                                credential={credential}
                                message={`View my verifiable сredential from ${getOr(
                                    '',
                                    'issuer.name',
                                    credential
                                )} on Velocity Network™, the Internet of CareersⓇ.`}
                                key={credential.id}
                                token=""
                                onLoad={(): void => {
                                    throw new Error(
                                        'Function not implemented.'
                                    );
                                }}
                            />
                        );
                    })}
                </ShareCredentialsToLinkedIn>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    constainerStyle: {
        justifyContent: 'space-between',
        minHeight: '100%'
    },
    itemStyle:{
        paddingVertical: 1
    },
    container: {
        flex: 1,
        marginTop: 5,
        paddingHorizontal: 24,
        paddingVertical: 20
    },
    buttons: {
        flexDirection: 'row',
        marginBottom: 35,
        marginTop: 22
    },
    leftButton: {
        marginRight: 7
    },
    rightButton: {
        marginLeft: 7
    }
});

export const ShareToLinkedInDescriptor = memo(
    ({
        credential,
        message,
        token: accessToken,
        onLoad
    }: {
        credential: ClaimCredential;
        message: string;
        token: string;
        onLoad: (postDescriptor: any) => void;
    }): null => {
        const {
            postToLikedInDescripror: descriptor,
            isLoading,
            termsUrl,
            error
        } = useGetPostToLikedInDescripror({
            credential,
            message,
            accessToken
        });

        useEffect(() => {
            if (!isLoading && descriptor && termsUrl && !error) {
                onLoad({
                    descriptor,
                    credentialId: credential.id,
                    credentialType: credential.type,
                    termsUrl
                });
            }
            if (error) {
                onLoad(null);
            }
        }, [credential, descriptor, error, isLoading, onLoad, termsUrl]);

        return null;
    }
);
