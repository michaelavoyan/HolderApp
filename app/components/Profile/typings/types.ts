export enum AddIdentityInfoTypeE {
    Email = 'EmailV1.0',
    Phone = 'PhoneV1.0'
}

export enum AddIdentityInfoStepE {
    AddInfo = 'AddInfo',
    Confirm = 'Confirm',
    Success = 'Success'
}

type Bounds = {
    x: number;
    y: number;
    width: number;
    height: number;
}

export type BarCode = {
    bounds: Bounds;
    data: string;
};

export type BarData = {
    bounds: Bounds;
    data: {[key: string]: any};
};

export type QrCodeProps = {
    barCode: BarData;
    onReadQr: (item: BarCode) => void;
    goToDisclosure: () => void;
};
