export type Dictionary<T> = { [key: string]: T }

export type PersonsData = {
    data: PersonData[];
};

export type PersonData = {
    name: string;
    email: string;
    image: string;
    vcs: PersonVc[];
};

export type PersonProps = {
    id: string;
    name: string;
    image?: string;
    isRetained?: boolean;
} & PersonData & {id: string};

export type Person = PersonProps | (PersonData & {id: string});

export type PersonVc = {
    jwt_vc: string;
    type: string[];
    output_descriptors: object;
};

export type PopupProps<T> = {
    params: T;
};

export enum DeepLinkOptions {
    inspect = 'inspect',
    issue = 'issue'
}

export enum SubmissionRequirementsRules {
    Issuing = 'all',
    Inspection = 'pick'
}
