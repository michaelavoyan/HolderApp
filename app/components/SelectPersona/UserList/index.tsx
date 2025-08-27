import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';

import {ListItem, useTheme} from 'react-native-elements';
import {isIOS, normalize} from 'app/utilities/helpers';

import {SVG} from 'app/assets/icons';
import {User} from 'app/store/types/auth';
import {UserListI} from '../typings/interfaces';
import {Icon} from '../../common/Icon';

export const UserList: React.FC<UserListI> = ({goToProfile, users = []}) => {
    const {theme} = useTheme();

    const activeColor = isIOS
        ? theme.colors.active
        : theme.colors.primaryAndroid;
    return (
        <>
            {users.map((item: User) => {
                const {name} = item;
                const firstName = name.split(' ')[0].charAt(0);
                const lastName = name.split(' ')[1]
                    ? name.split(' ')[1].charAt(0)
                    : '';
                return (
                    <TouchableOpacity
                        key={item.id}
                        activeOpacity={0.7}
                        onPress={() => {
                            goToProfile(item.id);
                        }}>
                        <ListItem containerStyle={styles.listContainer}>
                            <ListItem.Content style={styles.contentContainer}>
                                <View style={styles.leftElement}>
                                    {item.image ? (
                                        <Icon
                                            resizeMode="cover"
                                            uri={item.image}
                                            styles={styles.avatarContainer}
                                        />
                                    ) : (
                                        <View
                                            style={[
                                                styles.imagePlaceholder,
                                                {
                                                    borderColor: activeColor
                                                }
                                            ]}>
                                            <Text
                                                style={[
                                                    styles.imagePlaceholderText,
                                                    {
                                                        color: activeColor
                                                    }
                                                ]}>
                                                {`${firstName}${lastName}`}
                                            </Text>
                                        </View>
                                    )}
                                </View>

                                <View
                                    style={[
                                        styles.rightElement,
                                        {
                                            borderColor: isIOS
                                                ? theme.colors.separatingLine
                                                : theme.colors
                                                      .separatingLineAndroid
                                        }
                                    ]}>
                                    <ListItem.Title style={styles.titleStyle}>
                                        {name}
                                    </ListItem.Title>
                                    <View>
                                        {
                                            SVG(theme.colors.secondaryText, 13)[
                                                'chevron-right'
                                            ]
                                        }
                                    </View>
                                </View>
                            </ListItem.Content>
                        </ListItem>
                    </TouchableOpacity>
                );
            })}
        </>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        paddingTop: 0,
        paddingBottom: 0,
        paddingHorizontal: 0,
        height: 76,
        padding: 0
    },
    leftElement: {
        alignItems: 'center',
        paddingHorizontal: 15
    },
    rightElement: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 26,
        height: '100%',
        borderBottomWidth: isIOS ? 0 : 1,
        borderTopWidth: isIOS ? 0.5 : 0
    },
    avatarContainer: {
        width: 45,
        height: 45,
        borderRadius: isIOS ? 50 : 100
    },
    imagePlaceholder: {
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderRadius: 30,
        opacity: 1
    },
    imagePlaceholderText: {
        fontSize: normalize(14)
    },
    contentContainer: {
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleStyle: {
        fontSize: normalize(15),
        fontWeight: '600',
        lineHeight: normalize(19),
        letterSpacing: 0.2
    },
    checkBoxContainer: {
        margin: 0,
        marginLeft: 0,
        marginRight: 0,
        padding: 0,
        paddingRight: 10
    }
});
