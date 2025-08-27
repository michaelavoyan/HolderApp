import React, {useRef, useEffect, useState, useCallback} from 'react';
import {
    Image,
    StyleSheet,
    Dimensions,
    View,
    NativeSyntheticEvent,
    NativeScrollEvent
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {getOr} from 'lodash/fp';
import {usePrevious} from 'app/utilities/custom-hooks';
import {isIOS} from 'app/utilities/helpers';

const screenWidth = Dimensions.get('window').width;

const GuideScrollImages = ({
    imgData,
    onScroll: changeSlide,
    isActive
}: {
    imgData: Array<ReturnType<typeof require>>;
    onScroll: (prop: number) => void;
    isActive: boolean;
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const scrollView = useRef<ScrollView>(null);
    const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (imgData.length > 1 && imgData.length > currentPage && isActive) {
            timerId.current = setTimeout(() => {
                scrollView.current?.scrollTo({
                    x: currentPage * screenWidth,
                    animated: true
                });
                setCurrentPage(currentPage + 1);
            }, 3000);
        }
        return () => {
            if (timerId.current) {
                clearTimeout(timerId.current);
            }
        };
    }, [currentPage, imgData, imgData.length, isActive]);

    const previousPage = usePrevious(currentPage);

    useEffect(() => {
        if (previousPage !== currentPage) {
            ReactNativeHapticFeedback.trigger('impactLight');
        }
    }, [currentPage, previousPage]);

    useEffect(() => {
        if (isActive) {
            scrollView.current?.scrollTo({x: 0, animated: true});
        }
    }, [isActive]);

    const handleOnEndDragAndroid = useCallback(
        (e: NativeSyntheticEvent<NativeScrollEvent>) => {
            if (timerId.current) {
                clearTimeout(timerId.current);
            }

            changeSlide(getOr(0, 'nativeEvent.velocity.x', e) > 0 ? -1 : 1);
        },
        [changeSlide]
    );

    const handleOnEndDragIOS = useCallback(
        (e: NativeSyntheticEvent<NativeScrollEvent>) => {
            if (timerId.current) {
                clearTimeout(timerId.current);
            }
            const direction =
                getOr(0, 'nativeEvent.velocity.x', e) > 0 ? 1 : -1;
            const {x} = e.nativeEvent.contentOffset;
            const page = 1 + Math.floor(x / screenWidth);
            const nextSlide = page + direction;
            if (nextSlide > imgData.length || nextSlide < 0) {
                changeSlide(direction);
                setCurrentPage(1);
            } else {
                scrollView.current?.scrollTo({
                    x: nextSlide * screenWidth,
                    animated: true
                });
                setCurrentPage(page);
            }
        },
        [changeSlide, imgData.length]
    );

    return (
        <ScrollView
            testID="guide-scroll-images"
            ref={scrollView}
            horizontal
            style={itemStyles.container}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScrollEndDrag={
                isIOS ? handleOnEndDragIOS : handleOnEndDragAndroid
            }
            scrollEventThrottle={64}>
            {imgData.map((item: any) => (
                <View style={itemStyles.imageContainer} key={item}>
                    <Image
                        source={item}
                        key={item}
                        style={itemStyles.image}
                        resizeMode="contain"
                        resizeMethod="resize"
                    />
                </View>
            ))}
        </ScrollView>
    );
};

export default GuideScrollImages;

const itemStyles = StyleSheet.create({
    container: {
        width: screenWidth,
        height: '100%'
    },
    imageContainer: {
        width: screenWidth,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        flex: 1,
        alignSelf: 'center',
        resizeMode: 'contain'
    }
});
