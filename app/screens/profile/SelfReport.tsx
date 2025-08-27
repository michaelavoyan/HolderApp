import React, {useCallback, useEffect, useState} from 'react';

import {v4 as uuidv4} from 'uuid';
import {StackScreenProps} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {BackHandler, View} from 'react-native';
import {useTheme} from 'react-native-elements';
import {MoreButton} from 'app/components/common/MoreButton';
import EMoreButtonOptions from 'app/constants/moreButtonOptions';
import {navigateBack, NavigateOptions} from 'app/navigation/utils';
import {DELETE_MESSAGES, findCredentialType, onDeleteAction} from 'app/utilities/helpers';
import {BackButton} from 'app/components/common/BackButton';
import i18n from 'app/i18n';
import {colors} from 'app/assets/colors';
import {AlertDialog} from 'app/components/common/AlertDialog';
import {SelfReportScreen} from 'app/components/SelfReport';
import {
    deleteCredentialById,
    getUIFormSchema,
    saveSelfReported,
    updateCredential
} from 'app/store/actions';
import {uiFormSchemaSelector} from 'app/store/selectors';
import {RootStackParamList} from '../../navigation/StackParamsList';
import {uiFormSchemaProps} from '../../store/types/vcl';
import {
    credentialTypeByCredentialSchemaNameSelector,
    credentialTypesSchemasByTypesSelector
} from '../../store/selectors/vcl';
import {CredentialStatus} from '../../store/types/claim';
import {SchemaFormReferenceI} from '../../components/common/typings/interfaces';

export type SelfReportProps = StackScreenProps<
    RootStackParamList,
    'SelfReport'
>;

const MESSAGES = {
    title: i18n.t('Are you sure you want to cancel?'),
    subTitle: i18n.t('All changes will be lost')
};

export const SelfReport: React.FC<SelfReportProps> = ({
    route: {
        params: {credentialSchemaName, credential, onDelete}
    },
    navigation
}) => {
    const [isFormEmpty, setFormEmpty] = useState<boolean>(true);
    const formRef = React.useRef<SchemaFormReferenceI>(null);

    const dispatch = useDispatch();
    const [isEditMode, setEditMode] = useState(false);
    const credentialType =
        useSelector(
            credentialTypeByCredentialSchemaNameSelector(credentialSchemaName)
        ) || findCredentialType(credential?.type) || '';
    const uiSchema: uiFormSchemaProps | null =
        useSelector(uiFormSchemaSelector);
    const currentCredentialTypeSchema = useSelector(
        credentialTypesSchemasByTypesSelector([credentialType])
    );

    const [showCancelAlert, setShowCancelAlert] = useState<boolean>(false);
    const credentialTypeSchema =
        currentCredentialTypeSchema[
            Object.keys(currentCredentialTypeSchema)[0]
        ];

    const {t} = useTranslation();
    const {theme} = useTheme();

    const moreActions = useCallback(
        (item: string) => {
            if (item === EMoreButtonOptions.DELETE && credential?.id) {
                onDeleteAction(
                    DELETE_MESSAGES.delete.title,
                    DELETE_MESSAGES.delete.subTitle,
                    () => {
                        dispatch(
                            deleteCredentialById({
                                id: credential.id,
                                isVerified: false,
                                navigation: {
                                    name: '',
                                    option: NavigateOptions.GoBack
                                }
                            })
                        );

                        if (onDelete) {
                            onDelete(credential.id);
                        }
                    },
                    theme
                );
            } else if (item === EMoreButtonOptions.EDIT) {
                setEditMode(true);
            } else {
                formRef.current?.clearAll();
                setFormEmpty(true);
            }
        },
        [credential, dispatch, onDelete, theme]
    );

    const credentialId = credential?.id;

    const backAction = useCallback(() => {
        if (!isFormEmpty) {
            setShowCancelAlert(true);
        } else {
            navigateBack();
        }
        return true;
    }, [isFormEmpty]);

    const headerRight = useCallback(() => {
        if (credentialId) {
            return (
                <MoreButton
                    items={[
                        EMoreButtonOptions.DELETE,
                        isEditMode
                            ? EMoreButtonOptions.CLEAR_ALL
                            : EMoreButtonOptions.EDIT
                    ].map((i) => t(i))}
                    destructiveButtonIndex={1}
                    onSelect={moreActions}
                />
            );
        }
        return (
            <MoreButton
                items={[EMoreButtonOptions.CLEAR_ALL]}
                disabledButtonIndices={isFormEmpty ? [1] : []}
                onSelect={() => {
                    formRef.current?.reset();
                    setFormEmpty(true);
                }}
            />
        );
    }, [credentialId, moreActions, isEditMode, isFormEmpty, t]);

    useEffect(() => {
        navigation.setOptions({
            headerRight,
            headerLeft: () => (
                <View>
                    <BackButton onPress={backAction} />
                </View>
            )
        });
    }, [backAction, credentialId, headerRight, isFormEmpty, navigation, t]);

    useEffect(() => {
        dispatch(getUIFormSchema({credentialType}));
    }, [dispatch, credentialType]);

    const onCancel = useCallback(() => {
        navigateBack();
    }, []);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, [backAction, isEditMode]);

    const onSubmit = useCallback(
        (credentialSubject: object) => {
            if (isEditMode && credential) {
                dispatch(
                    updateCredential({
                        credentialObject: {
                            ...credential,
                            credentialSubject
                        },
                        isVerified: false,
                    })
                );
                setFormEmpty(true);
                setEditMode(false);
                navigation.replace('SelfReport', {
                    credential: {
                        ...credential,
                        credentialSubject
                    },
                    credentialSchemaName,
                    onDelete
                });
            } else {
                dispatch(
                    saveSelfReported({
                        credential: {
                            id: uuidv4(),
                            type: [credentialType],
                            credentialSubject,
                            status: CredentialStatus.self
                        },
                        navigation: {name: 'ProfileTab'}
                    })
                );
            }
        },
        [isEditMode, credential, dispatch, navigation, credentialSchemaName, onDelete, credentialType]
    );

    return (
        <>
            <SelfReportScreen
                ref={formRef}
                type={credentialType}
                onSubmit={onSubmit}
                onCancel={backAction}
                isEditMode={isEditMode}
                uiSchema={uiSchema}
                credential={credential}
                credentialTypeSchema={credentialTypeSchema}
                onChange={setFormEmpty}
            />
            <AlertDialog
                isVisible={showCancelAlert}
                title={MESSAGES.title}
                message={MESSAGES.subTitle}
                buttonLabels={['No', 'Yes'].map((i) => t(i))}
                buttonActions={[
                    () => setShowCancelAlert(false),
                    () => onCancel(),
                    () => setShowCancelAlert(false)
                ]}
                buttonStyles={[{}, {color: colors.error}]}
            />
        </>
    );
};
