import React, {useRef} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    TextInput,
    Linking
} from 'react-native';
import {isString, getOr, isArray, omit, filter} from 'lodash/fp';
import {Text, useTheme} from 'react-native-elements';

import {
    fontFamily,
    formatDateByRegion,
    isIOS,
    normalize,
    parseDate
} from 'app/utilities/helpers';
import {SVG} from 'app/assets/icons';
import {addHttp, validURL} from 'app/utilities/validation/validate-utils';
import {CredentialItemProps} from '../../CredentialDetails/typings/type';
import {useDateFormat} from '../../../utilities/custom-hooks';
import {Icon} from '../Icon';
// eslint-disable-next-line import/no-cycle
import {CredentialItemContainer} from './CredentialItemContainer';
import {ShowMoreText} from '../ShowMoreText';

export const CredentialItem: React.FC<CredentialItemProps> = ({
    label,
    info,
    withoutBorder,
    inputItem,
    inputMode,
    onToggleMode,
    toggleSaveVisibility,
    changeNotes,
    note,
    scrollToInput,
    isImage,
    smallText,
    withoutMargin,
    scrollToField
}) => {
    const inputRef = useRef<TextInput | null>(null);
    const {theme} = useTheme();
    const dateFormat = useDateFormat();
    const isUrl = isString(info) && validURL(info);
    const fieldYRef = useRef(0);

    const onOpenUrl = () => (isUrl ? Linking.openURL(addHttp(info)) : null);

    const arrayComponent = (arrInfo: (string | object)[]) => (
        <View>
            {arrInfo.map((item, key) =>
                isString(item) ? (
                    <CredentialItemContainer
                        label=""
                        info={item}
                        key={item}
                        withoutBorder={key === arrInfo.length - 1}
                        withoutMargin={key === arrInfo.length - 1}
                        inputItem={false}
                    />
                ) : (
                    arrayNestedInfo(item)
                )
            )}
        </View>
    );

    const arrayNestedInfo = (item: object) => {
        const value = arrayInfo(item);
        const filtered = filter('value', omit('Dimensions', value));
        return (
            <View key={value[label].value}>
                <View
                    style={[
                        styles.arrayTitle,
                        {
                            backgroundColor: theme.colors.titleBg
                        }
                    ]}>
                    <Text selectable style={styles.info}>
                        {value[label].value}
                    </Text>
                </View>
                <View style={[styles.arrayInfo]}>
                    {filtered.map((val, index) =>
                        val.value ? (
                            <CredentialItemContainer
                                label={val.label}
                                info={val.value}
                                key={val.value}
                                withoutBorder={filtered.length - 1 === index}
                                inputItem={false}
                                smallText
                            />
                        ) : null
                    )}
                </View>
            </View>
        );
    };

    const handleToggleShowMore = () => {
        scrollToField?.(fieldYRef.current);
    };

    const textComponent = (
        <ShowMoreText
            onPress={onOpenUrl}
            numberOfLines={4}
            style={[
                styles.info,
                inputItem ? {color: theme.colors.secondaryText} : {},
                smallText ? styles.smallInfo : {},
                isString(info) && validURL(info)
                    ? {color: theme.colors.active}
                    : {}
            ]}
            onToggleShowMore={handleToggleShowMore}>
            {info.toString()}
        </ShowMoreText>
    );

    const stringComponent = () =>
        isImage && isString(info) ? (
            <View
                style={[
                    styles.imageFrame,
                    {backgroundColor: theme.colors.imageBg}
                ]}>
                <Icon styles={styles.image} uri={info} />
            </View>
        ) : (
            textComponent
        );

    const arrayInfo = (
        item: object
    ): {
        [key: string]: {
            value: string | number;
            label: string;
        };
    } => {
        const dateAssessment = parseDate(getOr(undefined, 'date', item));
        return {
            Dimensions: {
                value: getOr('', 'name.localized.en', item),
                label: ''
            },
            description: {
                value: getOr('', 'description.localized.en', item),
                label: 'Description'
            },
            normName: {
                value: getOr('', 'normName.localized.en', item),
                label: 'Norm'
            },
            normDescription: {
                value: getOr('', 'normDescription.localized.en', item),
                label: 'Norm Description'
            },
            normSize: {value: getOr('', 'normSize', item), label: 'Norm Size'},
            percentileScore: {
                value: getOr('', 'percentileScore', item),
                label: 'Percentile Score'
            },
            absoluteScore: {
                value: getOr('', 'absoluteScore', item),
                label: 'Absolute Score'
            },
            passFail: {value: getOr('', 'passFail', item), label: 'Pass-Fail'},
            scoreRange: {
                value: getOr('', 'scoreRange', item),
                label: 'Score Range'
            },
            date: {
                value: dateAssessment
                    ? formatDateByRegion(new Date(dateAssessment), dateFormat)
                    : '',
                label: 'Date'
            },
            targetName: {
                value: getOr('', 'alignment[0].targetName', item),
                label: 'Alignment'
            },
            targetUrl: {
                value: getOr('', 'alignment[0].targetUrl', item),
                label: 'Alignment URL'
            },
            targetDescription: {
                value: getOr('', 'alignment[0].targetDescription', item),
                label: 'Alignment description'
            }
        };
    };

    const infoComponent = isArray(info)
        ? arrayComponent(info)
        : stringComponent();

    return (
        <View
            style={[
                !isArray(info) && styles.container,
                withoutMargin && styles.containerWithoutMargin,
                isImage && styles.imageContainer,
                withoutBorder || isImage ? styles.containerWithoutBorder : {},
                {
                    borderColor: isIOS
                        ? theme.colors.separatingLine
                        : theme.colors.separatingLineAndroid
                },
                smallText && styles.smallContainer
            ]}
            onLayout={(event) => {
                fieldYRef.current = event.nativeEvent.layout.y;
            }}>
            <View style={styles.note}>
                {!isImage && Boolean(label) && (
                    <Text
                        selectable
                        style={[
                            styles.label,
                            smallText ? styles.smallLabel : {},
                            {color: theme.colors.secondaryText}
                        ]}>
                        {label}
                    </Text>
                )}
                {inputItem ? (
                    <TouchableOpacity
                        onPress={
                            inputMode
                                ? () => inputRef?.current?.focus()
                                : onToggleMode
                        }
                        style={styles.noteIcon}
                        activeOpacity={0.7}>
                        {SVG(theme.colors.primaryAndroid, 18).note}
                    </TouchableOpacity>
                ) : null}
            </View>
            {inputMode ? (
                <TextInput
                    value={note}
                    ref={inputRef}
                    style={[styles.info, styles.noteInput]}
                    onChangeText={changeNotes}
                    onContentSizeChange={scrollToInput}
                    multiline
                    autoFocus
                    onFocus={toggleSaveVisibility || (() => {})}
                />
            ) : (
                infoComponent
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        paddingBottom: 12,
        borderBottomWidth: 0.5
    },
    smallContainer: {
        paddingBottom: 10,
        marginBottom: 15
    },
    imageFrame: {
        padding: 16,
        borderRadius: 8
    },
    imageContainer: {
        marginBottom: 8,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerWithoutBorder: {
        borderBottomWidth: 0
    },
    containerWithoutMargin: {
        marginBottom: 0,
        paddingBottom: 0
    },
    label: {
        lineHeight: normalize(isIOS ? 18 : 13),
        ...fontFamily({size: 13}),
        letterSpacing: 0.2,
        paddingBottom: 6
    },
    smallLabel: {
        ...fontFamily({size: 11}),
        lineHeight: normalize(13),
        paddingBottom: 5
    },
    info: {
        ...fontFamily({size: 15}),
        lineHeight: normalize(20)
    },
    smallInfo: {
        ...fontFamily({size: 13}),
        lineHeight: normalize(18),
        letterSpacing: 0.2
    },
    note: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    noteIcon: {
        paddingLeft: 15,
        paddingBottom: isIOS ? 15 : 0
    },
    noteInput: {
        ...(isIOS ? {} : {padding: 0})
    },
    image: {
        width: 180,
        height: 180,
        resizeMode: 'contain'
    },
    arrayTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 2,
        marginHorizontal: -22,
        paddingVertical: 5,
        paddingHorizontal: 22
    },
    arrayInfo: {
        marginTop: 15
    }
});
