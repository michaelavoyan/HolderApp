import {
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollViewProps
} from 'react-native';
import {isIOS} from './helpers';
import {AndroidNavigationBar} from '../components/common/AndroidNavigationBar';

export class ScrollWrapper {
    private readonly onScrollBegin:
        | ((event: NativeSyntheticEvent<NativeScrollEvent>) => void)
        | undefined;

    private readonly onScrollEnd:
        | ((event: NativeSyntheticEvent<NativeScrollEvent>) => void)
        | undefined;

    private readonly onMomentumEnd:
        | ((event: NativeSyntheticEvent<NativeScrollEvent>) => void)
        | undefined;

    constructor({
        onScrollBeginDrag,
        onScrollEndDrag,
        onMomentumScrollEnd
    }: ScrollViewProps) {
        this.onScrollBegin = onScrollBeginDrag?.bind(this);
        this.onScrollEnd = onScrollEndDrag?.bind(this);
        this.onMomentumEnd = onMomentumScrollEnd?.bind(this);
    }

    scrollBegin(event: NativeSyntheticEvent<NativeScrollEvent>) {
        if (this.onScrollBegin) {
            this.onScrollBegin(event);
        }
        if (!isIOS) {
            AndroidNavigationBar.hideNavigationBar();
        }
    }

    scrollEnd(event: NativeSyntheticEvent<NativeScrollEvent>) {
        if (this.onScrollEnd) {
            this.onScrollEnd(event);
        }
        if (!isIOS) {
            AndroidNavigationBar.showNavigationBar();
        }
    }

    momentumScrollEnd(event: NativeSyntheticEvent<NativeScrollEvent>) {
        if (this.onMomentumEnd) {
            this.onMomentumEnd(event);
        }
        if (!isIOS) {
            AndroidNavigationBar.showNavigationBar();
        }
    }
}
