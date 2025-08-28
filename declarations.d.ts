declare module '*.svg' {
    import {SvgProps} from 'react-native-svg';

    const content: React.FC<SvgProps>;
    export default content;
}
declare module '*.ttf';
declare module '*.otf';
declare module '*.png';
declare module 'react-native-local-auth';
declare module '@velocitycareerlabs/react-native-jsonschema-web-form/src';
declare module 'json-ref-lite';

declare module '@env' {
    export const WALLET_LINKEDIN_CLIENT_SECRET: string;
    export const WALLET_LINKEDIN_CLIENT_ID: string;
}
