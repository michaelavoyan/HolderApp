export interface YotiSessionData {
    sessionId: string;
    sessionToken: string;
    verifierAuthToken: string;
    verificationIdentifier: string;
}

export interface YotiStartSessionResponse {
    data: YotiSessionData;
}
