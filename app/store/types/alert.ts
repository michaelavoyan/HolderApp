export type AlertState = {
    withoutBiometryAlert: boolean;
};

export type AlertAction = Partial<AlertState> & {type: string};
