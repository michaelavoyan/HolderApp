export type PushSate = {
    deviceToken: string;
    disclosureNotificationsCounter: number;
};

export type DeRegisterDeviceAction = {
    type: string;
};

export type RegisterDeviceAction = {
    type: string;
};

export type UpdateDeviceTokenAction = {
    type: string;
    deviceToken: string;
};

export type UpdateDisclosureNotificationsCounterAction = {
    type: string;
    incrementValue: number;
    reset?: boolean;
};

export type GetPushAction = {
    type: string;
};

export type PushStorageModel = {
    notificationId: string;
    issuer: string;
};

export type PushResp = {
    id: string;
    data?: {
        count: string;
        notificationId: string;
    };
    notification: {
        title: string;
        body: string;
        icon: string;
        sound: string;
    };
    nextPushSeqId?: string;
};

export type SubscribeDeviceResp = {
    data: {
        _id: string;
        deviceId: string;
        createdAt: string;
        deviceOS: string;
        deviceType: string;
        pushToken: string;
        updatedAt: string;
        id: string;
    };
};
