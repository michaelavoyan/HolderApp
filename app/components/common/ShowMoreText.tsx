import React, {useCallback, useState} from 'react';
import {
    TextProps,
    View,
    Text,
    NativeSyntheticEvent,
    TextLayoutEventData,
    StyleSheet,
    LayoutAnimation,
    TouchableOpacity
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from 'react-native-elements';
import {fontFamily} from 'app/utilities/helpers';

interface ShowMoreTextProps extends TextProps {
    onToggleShowMore?: () => void;
}

export const ShowMoreText = ({
    onToggleShowMore,
    ...props
}: ShowMoreTextProps) => {
    const numberOfLines = props?.numberOfLines || 0;
    const [totalLines, setTotalLines] = useState(0);
    const [showMore, setShowMore] = useState(false);
    const {t} = useTranslation();
    const {
        theme: {
            colors: {primary}
        }
    } = useTheme();

    const toggleShowMore = useCallback(() => {
        setTimeout(() => {
            onToggleShowMore?.();
        }, 1);
        LayoutAnimation.configureNext({
            ...LayoutAnimation.Presets.linear,
            duration: 100
        });
        setShowMore((state) => !state);
    }, [setShowMore, onToggleShowMore]);

    const handleTextLayout = (
        event: NativeSyntheticEvent<TextLayoutEventData>
    ) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        setTotalLines(event.nativeEvent.lines.length);
    };

    const showButton = !!numberOfLines && totalLines > numberOfLines;

    return (
        <>
            <View style={styles.hidden}>
                <Text
                    {...props}
                    onTextLayout={handleTextLayout}
                    numberOfLines={undefined}
                />
            </View>
            <Text
                {...props}
                numberOfLines={showMore ? undefined : props?.numberOfLines}
                selectable
            />
            {showButton ? (
                <TouchableOpacity activeOpacity={0.8} onPress={toggleShowMore}>
                    <Text
                        style={[
                            styles.text,
                            {
                                color: primary
                            }
                        ]}>
                        {showMore ? t('Show less') : t('Show more')}
                    </Text>
                </TouchableOpacity>
            ) : null}
        </>
    );
};

const styles = StyleSheet.create({
    button: {alignSelf: 'flex-start'},
    hidden: {position: 'absolute', top: 23, opacity: 0},
    text: {...fontFamily({size: 14, weight: '400'}), paddingTop: 10}
});
