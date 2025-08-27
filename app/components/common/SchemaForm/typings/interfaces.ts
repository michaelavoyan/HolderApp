export interface UiSchemaProperty {
    [key: string]: any;
}

export interface SchemaFormI {
    schema: object;
    onSubmit(event: {params: {values: {[key: string]: string}}}): void;
    onChange?(
        isFormEmpty: boolean,
        event?: {params: {values: {[key: string]: string}}}
    ): void;
    onCancel(): void;
    buttonLabel?: string;
    formData?: object;
    uiSchema: object;
    errorSchema: object;
    customFormTheme?: object;
    isLoading: boolean;
    categoryColor: string;
}
