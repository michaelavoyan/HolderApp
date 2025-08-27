export const isYearMonthDateFormat = (value: string) =>
    /^([\d]){4}-(0?[1-9]|1[0-2])-(0[1-9]|[12]\d|30|31)$/.test(value);

export const isYearMonthFormat = (value: string) =>
    /^([\d]){4}-(0?[1-9]|1[0-2])$/.test(value);

export const parseYearMonthDateOnlyStringToLocalDate = (
    dateOnlyStrings: string
) => {
    const dataArray = dateOnlyStrings.split('-');
    const [year, month, day] = dataArray;

    return new Date(+year, +month - 1, +day, 0, 0, 0);
};

export const parseYearMonthOnlyStringToLocalDate = (
    monthOnlyStrings: string
) => {
    const dataArray = monthOnlyStrings.split('-');
    const [year, month] = dataArray;

    return new Date(+year, +month - 1, 1, 0, 0, 0);
};
