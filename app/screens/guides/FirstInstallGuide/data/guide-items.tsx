import React from 'react';

import {isIOS} from 'app/utilities/helpers';

export type GuideItem = {
    id: string;
    title: string;
    description: string;
    image?: ReturnType<typeof require>;
    images?: Array<ReturnType<typeof require>>;
    svg?: React.ReactElement;
    video?: ReturnType<typeof require>;
    hasLongContent: false;
    isActive: boolean;
    isHiddenOnSettings: boolean;
};

export const items: GuideItem[] = [
    {
        id: 'collect-credentials',
        title: 'Collect and store your career and educational credentials​',
        description:
            'Own your career credentials. Store them privately. Decide whom you share it with',
        images: isIOS
            ? [require('../../../../assets/Images/guide/iOS1.png')]
            : [require('../../../../assets/Images/guide/Android1.png')],
        hasLongContent: false,
        isActive: false,
        isHiddenOnSettings: false
    },
    {
        id: 'share-credentials',
        title: 'Share your credentials on LinkedIn​​',
        description:
            'Broadcast your achievements to friends and colleagues. Tap on the Share button and select Share to LinkedIn.',
        images: isIOS
            ? [
                  require('../../../../assets/Images/guide/iOS2_1.png'),
                  require('../../../../assets/Images/guide/iOS2_2.png')
              ]
            : [
                  require('../../../../assets/Images/guide/Android2_1.png'),
                  require('../../../../assets/Images/guide/Android2_1-1.png')
              ],
        hasLongContent: false,
        isActive: false,
        isHiddenOnSettings: false
    },
    {
        id: 'share-via-qr',
        title: 'Share your credentials with anyone in the world!​',
        description:
            'Create a link, add it to your resume or share it directly with anyone from potential employers and universities to background screeners and staffing companies.',
        images: isIOS
            ? [
                  require('../../../../assets/Images/guide/iOS3_1.png'),
                  require('../../../../assets/Images/guide/iOS3_2.png')
              ]
            : [
                  require('../../../../assets/Images/guide/Android3_1.png'),
                  require('../../../../assets/Images/guide/Android3_2.png')
              ],
        hasLongContent: false,
        isActive: false,
        isHiddenOnSettings: false
    },
    {
        id: 'track-shared-credentials',
        title: 'Track who you have shared your credentials with​',
        description:
            'Tap on the Disclosure tab to review and manage your disclosure events.',
        images: isIOS
            ? [
                  require('../../../../assets/Images/guide/iOS4_1.png'),
                  require('../../../../assets/Images/guide/iOS4_2.png')
              ]
            : [
                  require('../../../../assets/Images/guide/Android4_1.png'),
                  require('../../../../assets/Images/guide/Android4_2.png')
              ],
        hasLongContent: false,
        isActive: false,
        isHiddenOnSettings: false
    }
];
