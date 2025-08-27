import {ThemeMode} from 'react-native-elements';
import {colors} from './colors';
import {isIOS, normalize} from '../utilities/helpers';

export type themeType = typeof theme;

export const theme = {
    mode: 'light' as ThemeMode,
    Text: {
        style: {
            fontFamily: 'SFProDisplay-Regular'
        },
        h4Style: {
            fontFamily: 'SFProText-Regular',
            fontSize: normalize(11),
            lineHeight: normalize(13)
        }
    },
    Button: {
        buttonStyle: {
            borderRadius: isIOS ? 40 : 4
        },
        titleStyle: {
            paddingTop: 1,
            fontFamily: 'SFProText-Regular'
        }
    },
    colors
};
