import React, {forwardRef} from 'react';
import {
    KeyboardAwareScrollView,
    KeyboardAwareScrollViewProps
} from 'react-native-keyboard-aware-scroll-view';
import {ScrollWrapper} from 'app/utilities/scroll-utils';

export const KeyboardAwareScrollWrapper = forwardRef<
    KeyboardAwareScrollView,
    KeyboardAwareScrollViewProps & {children: React.ReactNode}
>((props, ref) => {
    const scroll = new ScrollWrapper(props);
    const {children, ...other} = props;

    return (
        <KeyboardAwareScrollView
            ref={ref}
            onScrollBeginDrag={scroll.scrollBegin}
            onScrollEndDrag={scroll.scrollEnd}
            onMomentumScrollEnd={scroll.momentumScrollEnd}
            {...other}>
            {children}
        </KeyboardAwareScrollView>
    );
});
