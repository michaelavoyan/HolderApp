import React, {useEffect, useState} from 'react';
import {get, isEmpty, set} from 'lodash/fp';
import mergeAllOf from 'json-schema-merge-allof';
import jsonRef from 'json-ref-lite';
import {Keyboard} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {VCLCountry} from '@velocitycareerlabs/vcl-react-native';
import * as actions from 'app/store/actions';
import {countriesSelector} from 'app/store/selectors/auth';
import {parseSchema} from 'app/utilities/jsonSchema-utils';
import {isSelfReportIsLoadingSelector} from 'app/store/selectors/profile';
import {credentialColorSelector} from 'app/store/selectors/common';
import {SchemaForm} from 'app/components/common/SchemaForm/SchemaForm';
import {SchemaFormI, SchemaFormReferenceI} from '../typings/interfaces';

export const onSubmitCallback = (
    event: {params: {values: {[key: string]: string | object}}},
    countries: VCLCountry[],
    onSubmit: any
) => {
    try {
        let {values} = event.params;
        const addressCountry = 'place.addressCountry';
        const countryName = get(addressCountry, values);
        if (countryName) {
            const countryCode = countries.find(
                country => country.name === countryName
            )?.code;
            values = set(addressCountry, countryCode || countryName, values);
        }
        Keyboard.dismiss();
        // TODO: add validation here when it's ready on the SDK and BE sides
        onSubmit(values);
    } catch (e) {
        console.error(e);
    }
};

export const SchemaFormContainer = React.forwardRef<
    SchemaFormReferenceI,
    SchemaFormI
>(
    (
        {
            credentialTypeSchema: {payload: initialSchema},
            onSubmit,
            onChange,
            onCancel,
            buttonLabel,
            customFormTheme,
            formData,
            uiSchema,
            type
        },
        ref
    ) => {
        const isLoading = useSelector(isSelfReportIsLoadingSelector);
        const [schema, setSchema] = useState<any>({});
        const dispatch = useDispatch();
        const categoryColor: string = useSelector(
            credentialColorSelector([type])
        );
        const countries: VCLCountry[] = useSelector(countriesSelector);

        useEffect(() => {
            return () => {
                dispatch(actions.updateIsSelfReportLoading({isLoading: false}));
            };
        }, [dispatch]);

        useEffect(() => {
            if (initialSchema) {
                const parsedSchema = parseSchema(initialSchema);
                const withRefs = jsonRef.resolve({...parsedSchema});
                const merged = mergeAllOf(withRefs);
                setSchema(merged);
            }
        }, [initialSchema]);

        const submit = (event: {params: {values: {[key: string]: string}}}) => {
            onSubmitCallback(event, countries, onSubmit);
        };

        return !isEmpty(schema) && !isEmpty(uiSchema) ? (
            <SchemaForm
                ref={ref}
                schema={schema}
                formData={formData}
                uiSchema={uiSchema!}
                errorSchema={{}}
                buttonLabel={buttonLabel}
                onSubmit={submit}
                customFormTheme={customFormTheme}
                isLoading={isLoading}
                categoryColor={categoryColor}
                onChange={onChange}
                onCancel={onCancel}
            />
        ) : null;
    }
);
