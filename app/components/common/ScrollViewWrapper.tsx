import React, {forwardRef} from 'react';
import {ScrollView, ScrollViewProps} from 'react-native';
import {ScrollWrapper} from 'app/utilities/scroll-utils';

export const ScrollViewWrapper = forwardRef<
    ScrollView,
    ScrollViewProps & {children: React.ReactNode}
>((props, ref) => {
    const scroll = new ScrollWrapper(props);
    const {children, ...other} = props;

    return (
        <ScrollView
            ref={ref}
            onScrollBeginDrag={scroll.scrollBegin}
            onScrollEndDrag={scroll.scrollEnd}
            onMomentumScrollEnd={scroll.momentumScrollEnd}
            {...other}>
            {children}
        </ScrollView>
    );
});
