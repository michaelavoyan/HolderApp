import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    LayoutAnimation,
    Platform
} from 'react-native';
import React, {useRef, useState, useEffect, useCallback} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import Video, {VideoRef} from 'react-native-video';
import {useTranslation} from 'react-i18next';

import {
    fontFamily,
    isIOS,
    normalize,
    normalizeHeight
} from '../../../../utilities/helpers';
import {ReplayButton} from './ReplayButton';
import {GuideItem} from '../data/guide-items';
import GuideScrollImages from './GuideScrollImages';
import {ShareNowButton} from './ShareNowButton';

const screenWidth = Dimensions.get('window').width;

const configureReplayAnimation = () =>
    LayoutAnimation.configureNext({
        duration: 125,
        create: {
            type: LayoutAnimation.Types.easeIn,
            property: LayoutAnimation.Properties.opacity
        },
        delete: {
            type: LayoutAnimation.Types.easeIn,
            property: LayoutAnimation.Properties.opacity
        }
    });

export const GuideItemComponent = ({
    item: {title, image, video, description, isActive, svg, images},
    isShareEnabled,
    onChangeContentVisibility,
    onScroll,
    onSharePress
}: {
    item: GuideItem;
    isShareEnabled: boolean;
    onChangeContentVisibility: (isContentVisible: boolean) => void;
    onScroll: (direction: number) => void;
    onSharePress: () => void;
}) => {
    const videoRef = useRef<VideoRef>(null);
    const [isCanReplay, setIsCanReplay] = useState<boolean | undefined>();
    const [isCanPlay, setIsCanPlay] = useState(true);
    const [fullHeight, setFullHeight] = useState(0);
    const [contentHeight, setContentHeight] = useState(0);
    const [scrollOffset, setScrollOffset] = useState(0);
    const {bottom} = useSafeAreaInsets();
    const {t} = useTranslation();

    useEffect(() => {
        if (onChangeContentVisibility && isActive)
            onChangeContentVisibility(
                fullHeight - (bottom ? bottom + 15 : 35) >=
                contentHeight - scrollOffset
            );
    }, [
        bottom,
        contentHeight,
        fullHeight,
        isActive,
        onChangeContentVisibility,
        scrollOffset,
        title
    ]);

    const {videoSource, refreshVideoSourceToRestartVideo} = useVideoSource(
        video!
    );

    return (
        <ScrollView
            style={itemStyles.container}
            nestedScrollEnabled
            key={title}
            onLayout={({
                           nativeEvent: {
                               layout: {height}
                           }
                       }) => setFullHeight(height)}
            scrollEventThrottle={160}
            onScroll={({nativeEvent: {contentOffset}}) =>
                setScrollOffset(contentOffset.y)
            }
            showsVerticalScrollIndicator={false}>
            <View
                onLayout={({
                               nativeEvent: {
                                   layout: {height}
                               }
                           }) => setContentHeight(height)}>
                <View style={itemStyles.media}>
                    {image ? (
                        <Image
                            source={image}
                            style={itemStyles.image}
                            resizeMode="stretch"
                        />
                    ) : null}
                    {svg}
                    {video
                        ? [
                            <Video
                                key="video"
                                source={videoSource}
                                style={itemStyles.video}
                                onError={console.error}
                                paused={!isActive || !isCanPlay}
                                resizeMode="contain"
                                repeat={false}
                                // Store reference
                                ref={videoRef}
                                onEnd={() => {
                                    configureReplayAnimation();
                                    setIsCanReplay(true);

                                    if (!isIOS) {
                                        setIsCanPlay(false);
                                    }
                                }}
                            />,
                            isCanReplay ? (
                                <ReplayButton
                                    key="replay"
                                    containerStyles={itemStyles.replayButton}
                                    onPress={() => {
                                        if (isIOS) {
                                            videoRef.current?.seek(0);
                                        } else {
                                            setIsCanPlay(true);
                                            // workaround to replay video on Android
                                            // video library doesn't support replay yet
                                            refreshVideoSourceToRestartVideo();
                                        }
                                        setIsCanReplay(false);
                                    }}
                                />
                            ) : null
                        ]
                        : null}
                    {images ? (
                        <GuideScrollImages
                            imgData={images}
                            isActive={isActive}
                            onScroll={onScroll}
                        />
                    ) : null}
                </View>
                <View style={itemStyles.content}>
                    <Text allowFontScaling={false} style={itemStyles.title}>
                        {t(title)}
                    </Text>
                    <Text
                        allowFontScaling={false}
                        style={itemStyles.description}>
                        {t(description)}
                    </Text>
                </View>
                {isShareEnabled ? <ShareNowButton onPress={onSharePress}/> : null}
            </View>
            <View style={itemStyles.footer}/>
        </ScrollView>
    );
};

const useVideoSource = (value: any) => {
    const [videoSource, setSource] = useState(value);
    const refreshVideoSourceToRestartVideo = useCallback(() => {
        setSource({uri: ''});
        setImmediate(() => setSource(value));
    }, [value]);

    return {videoSource, refreshVideoSourceToRestartVideo};
};

const itemStyles = StyleSheet.create({
    container: {
        width: screenWidth,
        flex: 1,
        paddingVertical: 16
    },
    footer: {
        marginBottom: isIOS ? 50 : 70
    },
    media: {
        overflow: 'hidden',
        height: normalizeHeight(382),
        width: screenWidth,
    },
    image: {
        height: '100%',
        width: '100%'
    },
    video: {
        height: normalizeHeight(382)
    },
    title: {
        ...fontFamily({size: 24, weight: '600'}),
        fontSize: Math.min(normalize(24), 24),
        marginBottom: normalizeHeight(15),
        marginTop: normalizeHeight(20),
        ...Platform.select({
            android: {
                textAlign: 'center'
            }
        })
    },
    content: {
        ...Platform.select({
            ios: {
                paddingHorizontal: 14
            }
        })
    },
    description: {
        ...fontFamily({size: 15, weight: '400'}),
        fontSize: Math.min(normalize(15), 15),
        ...Platform.select({
            android: {
                alignSelf: 'center',
                textAlign: 'center',
                paddingHorizontal: 20
            }
        })
    },
    replayButton: {
        position: 'absolute',
        bottom: 22,
        alignSelf: 'center'
    }
});
