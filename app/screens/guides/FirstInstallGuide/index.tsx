import {StyleSheet, View, Dimensions, ScrollView} from 'react-native';
import React, {
    useContext,
    useRef,
    useState,
    useEffect,
    useCallback
} from 'react';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import {StackScreenProps} from '@react-navigation/stack';
import {useShareCredentials} from 'app/utilities/hooks/useShareCredentials';
import {useSelector} from 'react-redux';
import {userIdSelector} from 'app/store/selectors';
import {ConnectionContext} from '../../../components/common/ConnectionWatcher';
import {BackButton} from '../../../components/common/BackButton';
import {PressableDots} from './components/PressableDots';
import {GuideItem, items as allGuideItems} from './data/guide-items';
import {GuideItemComponent} from './components/GuideItemComponent';
import {isIOS} from '../../../utilities/helpers';
import {usePrevious} from '../../../utilities/custom-hooks';
import {
    GuideContentItemType,
    getLatestViewedGuideItem,
    getNewContentGuideType
} from '../../../storage/asyncStorage';
import {
    RootStackParamList,
    SettingsStackParamList
} from '../../../navigation/StackParamsList';
import {VclMixpanel} from '../../../mixpanel/VclMixpanel';

const screenWidth = Dimensions.get('window').width;

type Props = StackScreenProps<
    RootStackParamList,
    'NewContentGuide' | 'WhatsNewGuide'
>;

export const FirstInstallGuide: React.FC<Props> = ({
    route: {params: {isOpenedFromSettings} = {}},
    navigation
}) => {
    const {setIsNewContentGuidePassed, setIsGuideSkipped} =
        useContext(ConnectionContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [isDotsBackgroundHidden, setDotsBackgroundHidden] = useState(false);
    const [visibleItems, setVisibleItems] = useState<GuideItem[]>([]);
    const scrollView = useRef<ScrollView>(null);
    const [isMounted, setIsMounted] = useState(false);
    const user = useSelector(userIdSelector);

    useEffect(() => {
        requestAnimationFrame(() => {
            setIsMounted(true);
        });
    }, []);

    useEffect(() => {
        (async () => {
            if (isOpenedFromSettings) {
                setVisibleItems(
                    allGuideItems.filter(
                        ({isHiddenOnSettings}) => isHiddenOnSettings === false
                    )
                );

                return;
            }

            const latestViewedGuideItem = await getLatestViewedGuideItem();

            if (latestViewedGuideItem) {
                const latestViewedItemIndex = allGuideItems.findIndex(
                    ({id}) => id === latestViewedGuideItem
                );

                setVisibleItems(allGuideItems.slice(latestViewedItemIndex + 1));
            } else {
                setVisibleItems(allGuideItems);
            }
        })();
    }, [isOpenedFromSettings]);

    const handleGoBack = useCallback(() => {
        setIsNewContentGuidePassed();

        setIsGuideSkipped(true);

        if (navigation.canGoBack()) {
            navigation.goBack();
        }
    }, [setIsNewContentGuidePassed, setIsGuideSkipped, navigation]);

    useEffect(() => {
        (async () => {
            const guideType = await getNewContentGuideType();

            if (guideType === GuideContentItemType.FirstInstall) {
                VclMixpanel.trackGetStarted();
            }

            let title = 'Getting Started';

            if (guideType === 'new-release' || isOpenedFromSettings) {
                title = 'What’s New';
            }

            navigation.setOptions({
                title,
                headerBackTitle: '',
                headerLeft: isOpenedFromSettings
                    ? undefined
                    : () => (
                          <View style={listStyles.backButton}>
                              <BackButton onPress={handleGoBack} />
                          </View>
                      )
            });
        })();
    }, [
        isOpenedFromSettings,
        navigation,
        setIsNewContentGuidePassed,
        handleGoBack
    ]);

    const previousPage = usePrevious(currentPage);
    const shareCredentials = useShareCredentials();

    useEffect(() => {
        if (previousPage !== currentPage) {
            ReactNativeHapticFeedback.trigger('impactLight');
        }
    }, [currentPage, previousPage]);

    const onReachLastSlide = (() => {
        let called = false;

        return () => {
            if (called) {
                return;
            }

            called = true;

            if (isOpenedFromSettings) {
                navigation.goBack();
            } else {
                setIsNewContentGuidePassed();
            }

            setIsGuideSkipped(false);
        };
    })();

    const handleSkip = () => {
        if (isOpenedFromSettings) {
            navigation.goBack();
        }

        setIsNewContentGuidePassed();
    };

    const handleNestedScroll = useCallback(
        (direction: number) => {
            const nextSlide = currentPage + direction;
            if (nextSlide > visibleItems.length) {
                onReachLastSlide();
            } else {
                scrollView.current?.scrollTo({
                    x: (currentPage - 1 + direction) * screenWidth,
                    animated: true
                });
            }
        },
        [currentPage, onReachLastSlide, visibleItems.length]
    );

    const handleShareCredentials = useCallback(() => {
        navigation.goBack();

        shareCredentials();
    }, [shareCredentials, navigation]);

    return (
        <View style={listStyles.container}>
            {isMounted ? (
                <>
                    <ScrollView
                        ref={scrollView}
                        horizontal
                        style={listStyles.container}
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={64}
                        nestedScrollEnabled
                        decelerationRate="fast"
                        onScrollEndDrag={({
                            nativeEvent: {
                                contentOffset: {x}
                            }
                        }) => {
                            if (
                                !isIOS &&
                                Math.abs(
                                    x - screenWidth * (visibleItems.length - 1)
                                ) <= 1
                            ) {
                                onReachLastSlide();
                            }
                        }}
                        onScroll={({
                            nativeEvent: {
                                contentOffset: {x}
                            }
                        }) => {
                            if (
                                x - (visibleItems.length - 1) * screenWidth >
                                5
                            ) {
                                onReachLastSlide();
                            } else {
                                setCurrentPage(1 + Math.round(x / screenWidth));
                            }
                        }}>
                        {visibleItems.map((item, index) => (
                            <GuideItemComponent
                                item={{
                                    ...item,
                                    isActive: index + 1 === currentPage
                                }}
                                key={item.id}
                                onChangeContentVisibility={(
                                    isWholeContentVisible
                                ) =>
                                    setDotsBackgroundHidden(
                                        isWholeContentVisible
                                    )
                                }
                                onScroll={handleNestedScroll}
                                onSharePress={handleShareCredentials}
                                isShareEnabled={Boolean(user) && index === 2}
                            />
                        ))}
                    </ScrollView>
                    {visibleItems.length > 1 ? (
                        <PressableDots
                            containerStyles={[listStyles.dots, listStyles.dotsBottom]}
                            length={visibleItems.length}
                            isBackgroundHidden={isDotsBackgroundHidden}
                            onPress={(index) =>
                                scrollView.current?.scrollTo({
                                    x: index * screenWidth,
                                    animated: false
                                })
                            }
                            selectedIndex={currentPage - 1}
                            onSkip={handleSkip}
                            onFinish={onReachLastSlide}
                        />
                    ) : null}
                </>
            ) : null}
        </View>
    );
};

const listStyles = StyleSheet.create({
    safeArea: {
        flex: 1
    },
    container: {
        flex: 1
    },
    backButton: {
        paddingLeft: isIOS ? 16 : 0
    },
    dots: {
        position: 'absolute',
        alignSelf: 'center',
        justifyContent: isIOS ? 'center' : 'space-between'
    },
    dotsBottom: {
        bottom: 0
    }
});

type NewContentSettingsProps = StackScreenProps<
    SettingsStackParamList,
    'NewContentSettings'
>;

export const NewContentSettingsGuide =
    FirstInstallGuide as any as React.FC<NewContentSettingsProps>;
