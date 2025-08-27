import React from 'react';
import {Dimensions, Platform, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {useTheme} from 'react-native-elements';
import {userSelector} from '../../../store/selectors';
import {FullUser} from '../../../store/types/auth';
import {isIOS} from '../../../utilities/helpers';
import {AvatarsBlock} from '../../common/AvatarsBlock';

export const AvatarsBlockContainer = () => {
    const {name, image}: FullUser = useSelector(userSelector);
    const {
        theme: {
            colors: {secondaryBg}
        }
    } = useTheme();
    return (
        <AvatarsBlock
            color={!isIOS ? secondaryBg : undefined}
            size={31}
            uri={image}
            name={name}
            containerStyle={styles.avatarBlock}
        />
    );
};

const styles = StyleSheet.create({
    avatarBlock: {
        ...Platform.select({
            android: {
                marginLeft: 16,
                width: Math.round(Dimensions.get('window').width) - 80
            },
            ios: {
                width: '200%'
            }
        })
    }
});
