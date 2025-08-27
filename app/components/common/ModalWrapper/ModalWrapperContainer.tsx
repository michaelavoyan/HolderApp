import React, {useState} from 'react';
import {ModalWrapperContainerProps} from '../typings/types';
import {ModalWrapper} from './ModalWrapper';

export const ModalWrapperContainer: React.FC<ModalWrapperContainerProps> = props => {
    const [scrollOffset, changeScrollOffset] = useState<number>(0);

    const handleOnScroll = (event: {
        nativeEvent: {
            contentOffset: {y: React.SetStateAction<number>};
        };
    }) => {
        changeScrollOffset(event.nativeEvent.contentOffset.y);
    };

    return (
        <ModalWrapper
            scrollOffset={scrollOffset}
            handleOnScroll={handleOnScroll}
            {...props}
        />
    );
};
