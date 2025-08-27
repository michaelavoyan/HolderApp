import {VCLDidJwk} from '@velocitycareerlabs/vcl-react-native';

export const formatDidJwk = (didJwk: VCLDidJwk): VCLDidJwk => {
    if (!didJwk.publicJwk.valueStr) {
        return {
            ...didJwk,
            publicJwk: {valueStr: JSON.stringify(didJwk.publicJwk)}
        };
    }

    return didJwk;
};
