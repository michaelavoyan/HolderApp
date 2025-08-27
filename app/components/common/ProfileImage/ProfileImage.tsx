import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from '../Icon';
import {theme} from '../../../assets/theme';
import {SVG} from '../../../assets/icons';
import {isIOS} from '../../../utilities/helpers';

export const ProfileImage: React.FC<{
    onPress: () => void;
    imageUrl: string;
}> = React.memo(({onPress, imageUrl}) => {
    const color = isIOS ? theme.colors.dark : theme.colors.primaryAndroid;
    return (
        <View>
            <TouchableOpacity
                style={styles.imageContainer}
                onPress={onPress}
                activeOpacity={0.7}>
                {imageUrl ? (
                    <>
                        <Icon
                            styles={styles.image}
                            uri={imageUrl}
                            resizeMode="cover"
                        />
                        {Platform.select({
                            ios: (
                                <View style={styles.iosEdit}>
                                    <Text style={styles.iosEditText}>Edit</Text>
                                </View>
                            ),
                            android: (
                                <View style={styles.androidEdit}>
                                    {
                                        SVG(theme.colors.primaryBgAndroid, 18)[
                                            'pencil-android'
                                        ]
                                    }
                                </View>
                            )
                        })}
                    </>
                ) : (
                    SVG(color, 122)['default-profile']
                )}
            </TouchableOpacity>
        </View>
    );
});

const styles = StyleSheet.create({
    imageContainer: {
        width: 122
    },
    image: {
        height: 122,
        width: 122,
        borderRadius: 61
    },
    androidEdit: {
        position: 'absolute',
        top: 3,
        right: -9,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: theme.colors.primaryAndroid,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    iosEdit: {
        position: 'absolute',
        height: 122,
        width: 122,
        borderRadius: 61,
        overflow: 'hidden'
    },
    iosEditText: {
        backgroundColor: theme.colors.profileImageActionBg,
        color: theme.colors.profileImageActionText,
        position: 'absolute',
        width: 122,
        bottom: 0,
        textAlign: 'center',
        padding: 6
    }
});
