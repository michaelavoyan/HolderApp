import React, {ReactNode, useCallback, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Text, ListItem, Divider, useTheme} from 'react-native-elements';

import {fontFamily, isIOS, normalize} from 'app/utilities/helpers';
import {TextButton} from 'app/components/common/TextButton';

import {SVG} from '../../assets/icons';
import {ListItemProps} from './typings/types';
import {Icon} from './Icon';

const AnimatedContainer: React.FC<{
    shouldAnimate?: boolean;
    children?: ReactNode;
}> = ({shouldAnimate, children}) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useFocusEffect(
        useCallback(() => {
            if (shouldAnimate) {
                const fadeIn = () => {
                    Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: 2000,
                        useNativeDriver: true
                    }).start();
                };
                fadeIn();
            }
        }, [fadeAnim, shouldAnimate])
    );

    if (shouldAnimate) {
        return (
            <Animated.View
                style={[
                    styles.iconContainer,
                    {
                        opacity: fadeAnim
                    }
                ]}>
                {children}
            </Animated.View>
        );
    }
    return <View style={[styles.iconContainer]}>{children}</View>;
};

export const CustomListItem: React.FC<ListItemProps> = ({
    title,
    subTitle,
    subTitleColor,
    subTitles,
    checked,
    chevron,
    onPress,
    withoutBorder,
    withoutRightElement,
    containerStyle,
    leftImage,
    isTransparent,
    disabledButton,
    hiddenAddOptionButton,
    shouldAnimateCheckedIcon,
    handleSelectAll,
    selectAll
}) => {
    const {theme} = useTheme();
    const {t} = useTranslation();

    return (
        <ListItem
            containerStyle={[
                styles.container,
                containerStyle,
                withoutBorder && styles.withoutBorder,
                isTransparent && styles.transparentBg,
                {
                    borderColor: theme.colors.primaryBg
                }
            ]}>
            <View style={styles.contentLeft}>
                {Boolean(leftImage) && (
                    <Icon uri={leftImage!} styles={styles.leftImage}/>
                )}

                <ListItem.Title style={styles.title}>{title}</ListItem.Title>
                {Boolean(subTitle) && (
                    <ListItem.Subtitle
                        style={[styles.subTitle, {color: subTitleColor}]}>
                        {subTitle}
                    </ListItem.Subtitle>
                )}
                {Boolean(subTitles) && subTitles}
            </View>

            {!withoutRightElement && (
                <ListItem.Content right>
                    {chevron ? (
                        <View style={styles.selectAllContainer}>
                            {selectAll && (
                                <TextButton
                                    title={t('Select all')}
                                    onPress={handleSelectAll}
                                    textStyle={styles.selectAllButton}
                                />
                            )}
                            {
                                SVG(theme.colors.secondaryText, 15)[
                                    'chevron-right'
                                    ]
                            }
                        </View>
                    ) : (
                        <View style={styles.contentRight}>
                            {(!hiddenAddOptionButton || checked) &&
                                (<TouchableOpacity
                                    disabled={disabledButton}
                                    activeOpacity={0.7}
                                    onPress={() => onPress && onPress(title)}>
                                    <Text
                                        style={[
                                            styles.buttonText,
                                            {
                                                color: isIOS
                                                    ? theme.colors.active
                                                    : theme.colors.primaryAndroid
                                            },
                                            disabledButton && styles.disabledButton
                                        ]}>
                                        {checked ? t('Edit') : t('Add')}
                                    </Text>
                                </TouchableOpacity>)}
                            <Divider
                                orientation="vertical"
                                style={styles.divider}
                            />
                            <AnimatedContainer
                                shouldAnimate={shouldAnimateCheckedIcon}>
                                {checked &&
                                    SVG(theme.colors.success, isIOS ? 24 : 19)[
                                        isIOS ? 'check' : 'check-android'
                                        ]}
                            </AnimatedContainer>
                        </View>
                    )}
                </ListItem.Content>
            )}
        </ListItem>
    );
};

const styles = StyleSheet.create({
    title: {
        lineHeight: normalize(22),
        letterSpacing: 0.2,
        paddingBottom: 2,
        paddingRight: 5,
        ...fontFamily({
            size: 14,
            weight: '600'
        })
    },
    buttonText: {
        lineHeight: normalize(22),
        letterSpacing: 0.2,
        paddingBottom: 2,
        paddingRight: 5,
        ...fontFamily({
            size: 16,
            weight: '600'
        })
    },
    subTitle: {
        fontSize: normalize(13),
        lineHeight: normalize(18),
        letterSpacing: 0.2
    },
    contentLeft: {
        flex: 1.2
    },
    contentRight: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 0
    },
    container: {
        paddingHorizontal: 0,
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    divider: {
        marginRight: 21,
        marginLeft: 16,
        marginVertical: 4
    },
    iconContainer: {
        minWidth: 19
    },
    withoutBorder: {
        borderBottomWidth: 0
    },
    leftImage: {
        width: 50,
        height: 50,
        marginRight: 15
    },
    disabledButton: {
        opacity: 0.4
    },
    transparentBg: {
        backgroundColor: 'transparent'
    },
    selectAllContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 64
    },
    selectAllButton: {
        textTransform: 'none'
    }
});
