import {StyleSheet} from 'react-native';
import {isIOS} from 'app/utilities/helpers';

export const styles = StyleSheet.create({
    backButton: {
        paddingLeft: isIOS ? 16 : 0
    }
});
