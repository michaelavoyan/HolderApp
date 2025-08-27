import React, {useRef} from 'react';
import {ScrollView, StyleSheet, View, Text, Platform} from 'react-native';
import Modal from 'react-native-modal';
import {useTheme} from 'react-native-elements';
import {ScrollViewWrapper} from 'app/components/common/ScrollViewWrapper';
import Toast from 'react-native-toast-message';
import {toastConfig} from 'app/utilities/offline/toast';
import {ModalWrapperContainerProps, ModalWrapperProps} from '../typings/types';
import {fontFamily, normalize} from '../../../utilities/helpers';

export const ModalWrapper: React.FC<
    ModalWrapperContainerProps & ModalWrapperProps
> = ({
    isVisible,
    onClose,
    children,
    scrollOffset,
    handleOnScroll,
    autoHeight,
    title,
    backdropOpacity,
    modalChildren
}) => {
    const {theme} = useTheme();
    const scrollViewRef = useRef<ScrollView>(null);

    const handleScrollTo = (
        p:
            | number
            | {
                  x?: number;
                  y?: number;
                  animated?: boolean;
              }
            | undefined
    ) => {
        scrollViewRef.current?.scrollTo(p);
    };

    return (
        <Modal
            onBackButtonPress={onClose}
            isVisible={isVisible}
            onSwipeComplete={onClose}
            swipeDirection={['down']}
            scrollTo={handleScrollTo}
            scrollOffset={scrollOffset}
            scrollOffsetMax={100}
            backdropOpacity={backdropOpacity || 0.4}
            avoidKeyboard
            propagateSwipe
            onBackdropPress={onClose}
            style={styles.modal}>
            <View style={styles.dividerContainer}>
                <View
                    style={[
                        styles.divider,
                        {backgroundColor: theme.colors.secondaryBg}
                    ]}
                />
            </View>
            <View
                style={[
                    styles.scrollableModal,
                    {backgroundColor: theme.colors.secondaryBg},
                    autoHeight ? styles.autoHeight : {}
                ]}>
                <ScrollViewWrapper
                    ref={scrollViewRef}
                    onScroll={handleOnScroll}
                    scrollEventThrottle={16}
                    style={styles.scrollView}>
                    <View>
                        {title ? (
                            <Text
                                style={[
                                    styles.title,
                                    Platform.select({
                                        android: {
                                            borderColor:
                                                theme.colors
                                                    .separatingLineAndroid
                                        }
                                    })
                                ]}>
                                {title}
                            </Text>
                        ) : null}
                        <View style={styles.content}>{children}</View>
                    </View>
                </ScrollViewWrapper>
            </View>
            {modalChildren}
            <Toast config={toastConfig} position="top" />
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0
    },
    scrollableModal: {
        height: '90%',
        ...Platform.select({
            ios: {
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                paddingVertical: 26
            },
            android: {}
        })
    },
    scrollView: {
        ...Platform.select({
            ios: {
                paddingHorizontal: 24
            }
        })
    },
    content: {
        ...Platform.select({
            android: {
                paddingHorizontal: 16
            }
        })
    },
    dividerContainer: {
        marginBottom: 8,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    divider: {
        height: 3,
        width: 60,
        borderRadius: 20,
        ...Platform.select({
            android: {
                display: 'none'
            }
        })
    },
    autoHeight: {
        height: 'auto'
    },
    title: {
        ...fontFamily({size: 22, weight: '600', android: {size: 20}}),
        letterSpacing: 0.4,
        marginTop: 1,
        ...Platform.select({
            ios: {
                marginBottom: 14
            },
            android: {
                padding: 16,
                paddingVertical: 27,
                letterSpacing: 0.15,
                borderBottomWidth: 1,
                lineHeight: normalize(23)
            }
        })
    }
});
