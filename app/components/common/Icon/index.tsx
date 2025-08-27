import {SvgUri} from 'react-native-svg';
import {
    Image,
    ImageResizeMode,
    ImageStyle,
    StyleProp,
    View
} from 'react-native';
import React from 'react';

import {isNumber} from 'lodash/fp';
import {VCLEnvironment} from '@velocitycareerlabs/vcl-react-native';
import {isValidUrl, isSVGLink, isValidBase64} from '../../../utilities/helpers';
import {vclLogger} from '../../../utilities/logger';
import {VCL_ENVIRONMENT} from '../../../configs';

interface IconProps {
    uri: string;
    styles?: StyleProp<ImageStyle>;
    width?: number;
    resizeMode?: ImageResizeMode;
}

export const Icon = ({uri, styles, width, resizeMode}: IconProps) => {
    if (isSVGLink(uri)) {
        return (
            <SvgUri
                style={[styles, width ? {width} : {}]}
                uri={uri}
                fallback={<View />}
                onError={() => {}}
            />
        );
    } /* In some cases, there are non-uri format strings., hence the uri must be validated! */
    if (isValidUrl(uri) || isValidBase64(uri)) {
        return (
            <Image
                testID="icon"
                resizeMode={resizeMode || 'contain'}
                style={styles}
                source={isNumber(uri) ? uri : {uri, width}}
                onError={() => {
                    if (!__DEV__ && VCL_ENVIRONMENT === VCLEnvironment.Prod) {
                        vclLogger.error(`Display image error ${uri}`);
                    }
                }}
            />
        );
    }
    if (!__DEV__ && VCL_ENVIRONMENT === VCLEnvironment.Prod) {
        vclLogger.error(`Display image error - unsupported uri ${uri}`);
    }
    return <></>;
};
