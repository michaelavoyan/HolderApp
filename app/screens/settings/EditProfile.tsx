import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {StackScreenProps} from '@react-navigation/stack';
import {KeyboardAwareScrollWrapper} from 'app/components/common/KeyboardAwareScrollWrapper';
import {theme} from 'app/assets/theme';
import {AddButton} from 'app/components/common/AddButton';
import {AndroidImageModal} from 'app/components/common/AndroidImageModal';
import {GenericButton} from 'app/components/common/GenericButton';
import {GenericInput} from 'app/components/common/GenericInput';
import {RootStackParamList} from 'app/navigation/StackParamsList';
import {updateUser} from 'app/store/actions';
import {userSelector} from 'app/store/selectors';
import {FullUser} from 'app/store/types/auth';
import {useImagePicker} from 'app/utilities/custom-hooks';
import {fontFamily} from 'app/utilities/helpers';
import {ProfileImage} from '../../components/common/ProfileImage/ProfileImage';

type Props = StackScreenProps<RootStackParamList, 'EditProfile'>;

export const EditProfile: React.FC<Props> = ({navigation}) => {
    const [profileName, setProfileName] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');
    const [isSubmitted, setSubmitted] = useState<boolean>(false);
    const user: FullUser = useSelector(userSelector);
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const onAddPress = (val: string): void => {
        setImageUrl(val);
    };

    const onSubmit = () => {
        if (profileName !== user.name || imageUrl !== user.image) {
            setSubmitted(true);
            updateUserCb({...user, image: imageUrl, name: profileName});
        } else {
            navigation.goBack();
        }
    };

    const onCancel = () => {
        navigation.goBack();
    };

    const updateUserCb = useCallback(
        (updatedUser: {id: string; image: string; name: string}) =>
            dispatch(
                updateUser({
                    user: updatedUser
                })
            ),
        [dispatch]
    );

    const {
        showPicker,
        onCloseAndroidModal,
        options,
        isDeleteAvailable,
        androidModal
    } = useImagePicker(onAddPress, !!user.image);

    const onChangeName = (val: string): void => {
        setProfileName(val);
    };

    useEffect(() => {
        setProfileName(user.name);
        setImageUrl(user.image || '');
        if (isSubmitted) {
            navigation.goBack();
            setSubmitted(false);
        }
    }, [isSubmitted, navigation, user]);

    return (
        <>
            <AndroidImageModal
                open={androidModal}
                onClose={onCloseAndroidModal}
                options={options}
                isDeleteAvailable={isDeleteAvailable}
            />
            <SafeAreaView style={[styles.container]}>
                <KeyboardAwareScrollWrapper
                    contentContainerStyle={styles.keyboardContentContainer}
                    keyboardShouldPersistTaps="handled">
                    <View>
                        <Text style={styles.title}>
                            {t('Edit your profile')}
                        </Text>
                        <Text
                            style={[
                                styles.description,
                                // eslint-disable-next-line react-native/no-inline-styles
                                {
                                    color: theme.colors.secondaryText,
                                    marginBottom: 20
                                }
                            ]}>
                            {t(
                                'Your profile name and photo will never be shared with anyone.'
                            )}
                        </Text>
                        <GenericInput
                            onChangeText={onChangeName}
                            containerStyle={styles.input}
                            value={profileName}
                            defaultValue=" "
                            autoFocus
                            label={t('Profile name*')}
                            autoCapitalize="words"
                        />
                        <AddButton
                            containerStyle={styles.input}
                            title={t('Profile picture')}
                            onPress={showPicker}
                        />
                        <ProfileImage
                            onPress={showPicker}
                            imageUrl={imageUrl}
                        />
                    </View>
                    <View style={styles.buttonsBlock}>
                        <GenericButton
                            containerStyle={styles.buttonContainerLeft}
                            title={t('Cancel')}
                            type="secondary"
                            onPress={onCancel}
                        />
                        <GenericButton
                            containerStyle={styles.buttonContainerRight}
                            title={t('Save')}
                            type="primary"
                            onPress={onSubmit}
                        />
                    </View>
                </KeyboardAwareScrollWrapper>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1
    },
    keyboardContentContainer: {
        padding: 16,
        justifyContent: 'space-between',
        flexGrow: 1
    },
    step: {
        ...fontFamily({size: 14, weight: '600', iosFamily: 'SFProText'})
    },
    title: {
        ...fontFamily({size: 28, weight: 'bold'}),
        letterSpacing: 0.35,
        marginVertical: 20
    },
    description: {
        ...fontFamily({size: 13}),
        letterSpacing: 0.2
    },
    buttonsBlock: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 25,
        marginTop: 25
    },
    buttonContainerLeft: {
        marginRight: 5
    },
    buttonContainerRight: {
        marginLeft: 5
    },
    input: {
        marginBottom: 25
    }
});
