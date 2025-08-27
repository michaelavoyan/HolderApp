import React, {useCallback, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {
    Form,
    UIProvider
} from '@velocitycareerlabs/react-native-jsonschema-web-form/src';

import {isEqual, isFunction} from 'lodash/fp';
import {useTheme} from 'react-native-elements';
import {fontFamily} from 'app/utilities/helpers';
import {cloneDeep} from 'lodash';
import {GenericButton} from '../GenericButton';
import {SchemaFormI} from './typings/interfaces';
import {SchemaFormReferenceI} from '../typings/interfaces';

export const SchemaForm = React.forwardRef<SchemaFormReferenceI, SchemaFormI>(
    (
        {
            schema,
            onSubmit,
            onChange,
            onCancel,
            buttonLabel = 'Add',
            formData,
            uiSchema,
            errorSchema,
            customFormTheme,
            isLoading = false,
            categoryColor,
        },
        ref
    ) => {
        const {theme} = useTheme();
        const [emptyValuesState, setEmptyValuesState] = useState<object>();
        const {t} = useTranslation();
        const text = {
            color: theme.colors.primaryText,
            ...fontFamily({size: 15, android: {size: 16}}),
            paddingLeft: 0
        };
        const border = {
            borderWidth: 0,
            borderBottomWidth: 1
        };

        const formTheme = {
            input: {
                focused: StyleSheet.create({
                    border: {
                        ...border,
                        borderColor: theme.colors.separatingLine
                    },
                    text
                }),
                regular: StyleSheet.create({
                    border: {
                        ...border,
                        borderColor: theme.colors.separatingLine
                    },
                    text,
                    placeholder: {color: theme.colors.secondaryText}
                }),
                error: StyleSheet.create({
                    border: {
                        ...border,
                        borderColor: theme.colors.reject
                    },
                    text,
                    placeholder: {color: theme.colors.reject}
                })
            },
            Datepicker: {
                text,
                buttons: {
                    color: theme.colors.active
                }
            }
        };

        const onInitCallback = useCallback(({values}: {values: object}) => {
            setEmptyValuesState(cloneDeep(values));
        }, []);

        const onChangeCallback = useCallback(
            (data: any) => {
                const {
                    params: {values}
                } = data;
                if (onChange) {
                    // timeout related to schema form implementation
                    // TODO: remove timeout when schema form is updated
                    setTimeout(() => {
                        onChange(isEqual(values, emptyValuesState));
                    }, 0);
                }
            },
            [emptyValuesState, onChange]
        );
        const CancelButton = useCallback(
            () => (
                <GenericButton
                    containerStyle={styles.buttonContainerLeft}
                    title={t('Cancel')}
                    type="secondary"
                    onPress={onCancel}
                    disabled={isLoading}
                />
            ),
            [isLoading, onCancel, t]
        );

        return (
            <UIProvider theme={customFormTheme || formTheme}>
                <Form
                    schema={schema}
                    formData={formData}
                    uiSchema={uiSchema}
                    errorSchema={errorSchema}
                    buttonPosition="center"
                    onSubmit={onSubmit}
                    onRef={(formRef: any) => {
                        if (isFunction(ref)) {
                            ref(formRef);
                        } else if (ref) {
                            ref.current = formRef;
                        }
                    }}
                    onChange={onChangeCallback}
                    onInit={onInitCallback}
                    CancelButton={CancelButton}
                    customSubmitButton={
                        <GenericButton
                            containerStyle={styles.buttonContainerRight}
                            title={t(buttonLabel || 'Add')}
                            type="primary"
                            onPress={() => {}}
                            disabled={isLoading}
                        />
                    }
                    customFormStyles={
                        categoryColor ? {shadowColor: categoryColor} : {}
                    }
                />
            </UIProvider>
        );
    }
);

const styles = StyleSheet.create({
    buttonContainerLeft: {
        marginRight: 5
    },
    buttonContainerRight: {
        marginLeft: 5
    }
});
