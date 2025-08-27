import React, {ReactElement} from 'react';
import {StyleSheet} from 'react-native';
import {getOr, get} from 'lodash/fp';
import {formatDateByRegion} from 'app/utilities/helpers';
import {
    AcceptedDisclosureRequestObject,
    DisclosureSubtype
} from 'app/store/types/disclosure';
import {useDateFormat} from 'app/utilities/custom-hooks';
import {Icon} from '../../components/common/Icon';
import {SVG} from '../../assets/icons';
import i18n from '../../i18n';

export const usePrepareDisclosureInfo = (
    disclosure: AcceptedDisclosureRequestObject
) => {
    const dateFormat = useDateFormat();

    const duration = getOr('-', 'duration', disclosure);

    const creationDate = get('creationDate', disclosure);
    const creationDateDisplay = creationDate
        ? formatDateByRegion(new Date(creationDate), dateFormat, true)
        : '-';

    let name = getOr('', 'organization.name', disclosure);
    let brandName = getOr('', 'organization.brandName', disclosure);
    let purpose: string | null = getOr('-', 'purpose', disclosure);
    const logoLink = getOr('', 'organization.logo', disclosure);
    let logo = logoLink ? <Icon uri={logoLink} styles={styles.logo} /> : null;
    const brandImageLink = getOr('', 'organization.brandImage', disclosure);
    let brandImage = brandImageLink ? <Icon uri={brandImageLink} styles={styles.logo} /> : null; 

    if (disclosure.subType === DisclosureSubtype.public) {
        name = i18n.t('Shared via link');
        purpose = null;
        logo = SVG(undefined, undefined, styles.shared)[
            'shared-via-link'
        ] as ReactElement;
        brandName = null;
        brandImage = null;
    }

    if (disclosure.subType === DisclosureSubtype.linkedin) {
        name = i18n.t('Shared to LinkedIn');
        purpose = null;
        logo = SVG(undefined, undefined, styles.shared)[
            'shared-via-linkedin'
        ] as ReactElement;
        brandName = null;
        brandImage = null;
    }

    return {
        name,
        purpose,
        logo,
        duration,
        creationDateDisplay,
        brandName,
        brandImage
    };
};

const styles = StyleSheet.create({
    logo: {
        width: 60,
        height: 60,
        marginBottom: 18
    },
    shared: {
        marginBottom: 15
    }
});
