import {
    getOr,
    get,
    reduce,
    includes,
    pick,
    isString,
    isNumber,
    toString,
    isArray,
    filter
} from 'lodash/fp';
import {JSONPath} from 'jsonpath-plus';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNetInfo} from '@react-native-community/netinfo';
import {VCLCountry} from '@velocitycareerlabs/vcl-react-native';
import moment from 'moment';

import {countriesSelector} from 'app/store/selectors/auth';
import {findCredentialType, formatDateByRegion} from './helpers';
import {useDateFormat} from './custom-hooks';
import {
    ClaimCredential,
    DisplaySchema,
    DisplaySchemaItem,
    DisplaySchemaProp
} from '../store/types/claim';
import {SavedSelfReportCredential} from '../store/types/profile';

import {getPresentationSchema} from '../store/actions';
import {presentationSchemaSelector} from '../store/selectors/vcl';
import {
    isYearMonthDateFormat,
    isYearMonthFormat,
    parseYearMonthDateOnlyStringToLocalDate,
    parseYearMonthOnlyStringToLocalDate
} from './date';
import {ClaimCredentialWithCheckbox} from '../components/DisclosureRequest/types';

const DATE_FORMATS = ['date', 'date-time'];

export const selectFirstMatchingPath = (
    path: string,
    subject: object,
    schema: {[key: string]: DisplaySchemaItem} | DisplaySchemaProp,
    countries: VCLCountry[] = []
) => {
    const possiblePaths = getOr([], `${path}path`, schema);
    let value = '';
    let isImgLink = false;

    possiblePaths.find((item: string) => {
        let result = JSONPath({path: item, json: subject});

        if (result.length) {
            const pathArray = JSONPath.toPathArray(item);
            isImgLink = pathArray.includes('image');
            if (pathArray.includes('addressCountry')) {
                result = [
                    countries.find((c) => c.code === result[0])?.name ||
                        result[0]
                ];
            }
            if (pathArray.includes('addressRegion')) {
                const [countryCode, regionCode] = result[0].split('-');
                const country = countries.find((c) => c.code === countryCode);
                const region = getOr([], 'regions.all', country).find(
                    (regionItem: {code: string; name: string}) =>
                        (regionItem as {code: string; name: string}).code ===
                        regionCode
                )?.name;
                result = [region || result[0]];
            }
            value = result.join(', ');
            return true;
        }
        return false;
    });
    return {value, isImgLink};
};

export const credentialValueFromJSONPath = (
    schema: {[key: string]: DisplaySchemaItem} | DisplaySchemaProp,
    subject: object,
    dateFormat: string,
    path: string = '',
    countries: VCLCountry[] = []
) => {
    try {
        const format: string = get(`${path}schema.format`, schema);
        const fallback = get(`${path}fallback`, schema);
        let value;
        let isImgLink = false;
        if (get(`${path}text`, schema)) {
            value = get(`${path}text`, schema);
        } else {
            ({value, isImgLink} = selectFirstMatchingPath(
                path,
                subject,
                schema,
                countries
            ));
        }

        if (isYearMonthDateFormat(value)) {
            const parsedToDate = parseYearMonthDateOnlyStringToLocalDate(value);
            value = formatDateByRegion(parsedToDate, dateFormat, true);
        }

        if (isYearMonthFormat(value)) {
            const parseToMonth = parseYearMonthOnlyStringToLocalDate(value);
            value = new Intl.DateTimeFormat('en-us', {
                year: 'numeric',
                month: 'short'
            }).format(parseToMonth);
        }

        if (includes(format, DATE_FORMATS)) {
            const date = typeof value === 'string' ? moment(value.replace(/z$/, 'Z')).toDate() : value;
            if(moment(date).isValid()) {
                value = formatDateByRegion(date, dateFormat, true);
            }
        }
        const finalValue = value || fallback;
        if (isString(finalValue)) {
            return {value: finalValue, isImgLink};
        }
        if (isNumber(finalValue)) {
            return {value: toString(finalValue), isImgLink};
        }
        if (isArray(finalValue)) {
            const filteredArray = filter(Boolean, finalValue);
            return {value: filteredArray.join(', '), isImgLink: false};
        }
        return {value: '', isImgLink};
    } catch (e) {
        return {value: '', isImgLink: false};
    }
};

export const useCredentialDisplaySchema = ({
    type: credentialType
}: ClaimCredential | SavedSelfReportCredential) => {
    const {isConnected} = useNetInfo();
    const type = findCredentialType(credentialType) ?? '';
    const dispatch = useDispatch();

    const schema = useSelector((state) =>
        presentationSchemaSelector(<any>state, type)
    );

    useEffect(() => {
        if (isConnected) {
            dispatch(getPresentationSchema(type));
        }
    }, [dispatch, type, isConnected]);

    return schema;
};

export const useCredentialSummaries = (
    credential:
        | ClaimCredential
        | SavedSelfReportCredential
        | ClaimCredentialWithCheckbox
) => {
    const displaySchema: DisplaySchema | null =
        useCredentialDisplaySchema(credential);
    const countries = useSelector(countriesSelector);
    const dateFormat = useDateFormat();

    if (displaySchema === null) {
        return {};
    }
    const schema = pick(
        ['title', 'subtitle', 'summary_detail', 'logo'],
        displaySchema
    );

    return {
        title: credentialValueFromJSONPath(
            schema,
            credential,
            dateFormat,
            'title.',
            countries
        ).value,
        subTitle: credentialValueFromJSONPath(
            schema,
            credential,
            dateFormat,
            'subtitle.',
            countries
        ).value,
        summaryDetail: credentialValueFromJSONPath(
            schema,
            credential,
            dateFormat,
            'summary_detail.',
            countries
        ).value,
        logo: credentialValueFromJSONPath(
            schema,
            credential,
            dateFormat,
            'logo.',
            countries
        ).value
    };
};

/**
 * Sequentially applies schema decorators to change structure of presentation
 * schema, each decorator function accepts decorated result of previous
 */
const decorateSchema = (
    schemaProperties: DisplaySchema['properties'] = [],
    credentialSubject: any,
    decorators: ((
        schemaProperties: DisplaySchema['properties'],
        credentialSubject: any
    ) => DisplaySchema['properties'])[]
) => {
    const decoratedSchema = [...schemaProperties];

    return decorators.reduce(
        (decoratedSchemaProperties, decorate) =>
            decorate(decoratedSchemaProperties, credentialSubject),
        decoratedSchema
    );
};

export const CredentialFormUIElements = {
    BoldTitle: 'bold-title',
    SectionTitle: 'section-title'
};

/**
 * Decorates AssessmentV1.1 schema to display multiple values
 * Example:
 * for two dimension records in credential subject and input schema like below:
 * $.assessmentDimensions[*].name
 * $.assessmentDimensions[*].description
 *
 * new schema will look like:
 * $.assessmentDimensions[0].name
 * $.assessmentDimensions[0].description
 *
 * $.assessmentDimensions[1].name
 * $.assessmentDimensions[1].description
 *
 * https://velocitycareerlabs.atlassian.net/browse/VL-1850
 */
const decorateSchemaToDisplayMultipleAssessmentDimensions = (
    decoratedSchema: DisplaySchema['properties'],
    credentialSubject: any
) => {
    const subjectDimensions: any[] = credentialSubject.assessmentDimensions;

    if (!subjectDimensions) {
        return decoratedSchema;
    }

    const doesSchemaHaveDimensions = Boolean(
        decoratedSchema.find(({path: [dimensionJsonPath]}) => {
            return dimensionJsonPath.startsWith('$.assessmentDimensions[*]');
        })
    );

    if (!doesSchemaHaveDimensions) {
        return decoratedSchema;
    }

    let firstDimensionsPropertyIndex: number = -1;
    let lastDimensionsPropertyIndex = 0;

    const assessmentDimensionsSchemaProperties = decoratedSchema.filter(
        ({path: [dimensionJsonPath]}, index) => {
            if (dimensionJsonPath.startsWith('$.assessmentDimensions[*]')) {
                lastDimensionsPropertyIndex = index;

                if (firstDimensionsPropertyIndex === -1) {
                    firstDimensionsPropertyIndex = index;
                }
                return true;
            }

            return false;
        }
    );

    const updatedAssessmentDimensionsSchemaProperties: DisplaySchema['properties'] =
        [];

    subjectDimensions.forEach((_, i) => {
        assessmentDimensionsSchemaProperties.forEach((value) => {
            updatedAssessmentDimensionsSchemaProperties.push({
                ...value,
                schema: {
                    // Dimension name will be displayed as section title
                    // instead of displaying regular field value
                    type: value.path[0].startsWith(
                        '$.assessmentDimensions[*].name'
                    )
                        ? CredentialFormUIElements.SectionTitle
                        : value.schema.type
                },
                path: [
                    value.path[0].replace(
                        '$.assessmentDimensions[*]',
                        `$.assessmentDimensions[${i}]`
                    )
                ]
            });
        });
    });

    if (updatedAssessmentDimensionsSchemaProperties.length) {
        updatedAssessmentDimensionsSchemaProperties.unshift({
            // this element is going to be displayed as bold title
            // on the credentials form
            label: 'Dimensions',
            path: [''],
            fallback: 'Dimensions', // MUST be always visible
            schema: {
                type: CredentialFormUIElements.BoldTitle
            }
        });

        updatedAssessmentDimensionsSchemaProperties.push({
            // this element is going to be displayed as gray section divider
            // at the end of Dimensions on the credentials form
            label: '',
            path: [''],
            fallback: ' ', // MUST be always visible, but background only
            schema: {
                type: CredentialFormUIElements.SectionTitle
            }
        });

        const dimensionPropsCount =
            lastDimensionsPropertyIndex - firstDimensionsPropertyIndex;

        decoratedSchema.splice(
            firstDimensionsPropertyIndex,
            dimensionPropsCount + 1,
            ...updatedAssessmentDimensionsSchemaProperties
        );
    }

    return decoratedSchema;
};

export const useCredentialDetails = (
    credential: ClaimCredential | SavedSelfReportCredential
) => {
    const dateFormat = useDateFormat();

    const displaySchema: DisplaySchema | null = useCredentialDisplaySchema(
        credential
    );

    if (!displaySchema) {
        return [];
    }
    const credentialWithRootProperties = {
        ...credential,
        ...(credential?.dynamicRootProperties ?? {})
    };

    const displaySchemaProperties = decorateSchema(
        displaySchema.properties,
        credentialWithRootProperties,
        [decorateSchemaToDisplayMultipleAssessmentDimensions]
    );

    return reduce(
        (
            acc: {
                value: string;
                label: string;
                isImgLink: boolean;
                schema: DisplaySchemaItem['schema'];
            }[],
            curr
        ) => {
            const {value, isImgLink} = credentialValueFromJSONPath(
                curr,
                credentialWithRootProperties,
                dateFormat
            );
            return value
                ? [
                      ...acc,
                      {
                          value,
                          label: curr.label,
                          isImgLink,
                          schema: curr.schema
                      }
                  ]
                : acc;
        },
        [],
        displaySchemaProperties
    );
};
