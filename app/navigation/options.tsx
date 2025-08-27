import React from 'react';
import {StyleSheet, Platform} from 'react-native';
import {fontFamily, normalize} from '../utilities/helpers';
import {BackIcon} from '../components/common/BackButton';
import {colors} from '../assets/colors';

export const StackHeaderOptions = {
    headerStatusBarHeight: 0,
    ...StyleSheet.create({
        headerStyle: {
            ...Platform.select({
                ios: {
                    borderBottomWidth: 1,
                    elevation: 0,
                    shadowColor: 'transparent'
                },
                android: {
                    backgroundColor: colors.primaryAndroid,
                    borderBottomWidth: 2
                }
            })
        },
        headerTitleStyle: {
            ...fontFamily({size: 18, weight: '500'}),
            ...Platform.select({
                ios: {
                    letterSpacing: 0.4
                },
                android: {
                    color: colors.secondaryBg,
                    letterSpacing: -0.41
                }
            }),
            lineHeight: normalize(22),
            fontWeight: '500'
        },
        headerLeftContainerStyle: {
            ...Platform.select({
                ios: {
                    paddingLeft: 26
                }
            })
        },
        headerRightContainerStyle: {
            paddingRight: 26
        }
    }),
    ...Platform.select({
        ios: {
            headerBackTitleVisible: false,
            headerBackImage: () => <BackIcon />
        },
        android: {
            headerTintColor: colors.secondaryBg
        }
    }),
    cardStyle: {
        backgroundColor: colors.primaryBg
    }
};
