import {createSelector} from 'reselect';
import {
    filter,
    find,
    get,
    intersection,
    isEmpty,
    reverse,
    sortBy,
    values,
    map,
    reduce
} from 'lodash/fp';
import {CredentialFilter} from 'app/components/CredentialDetails/typings/type';
import {ClaimCredential, CredentialStatus} from '../types/claim';
import {ClaimCredentialWithCheckbox} from '../../components/DisclosureRequest/types';
import {Selectors} from './types';
import {RootState} from '../reducers';
import {identityTypesSelector} from './common';
import {SavedSelfReportCredential, SettingsProps} from '../types/profile';
import {disclosureNotificationsCounterSelector} from './push';

export const vfCredentialsSelector = createSelector(
    ({profile: {vfCredentials}}: RootState): ClaimCredential[] => vfCredentials,
    (_: any, withoutAccept: true | null = null) => withoutAccept,
    (vfCredentials: ClaimCredential[], withoutAccept) => {
        if (withoutAccept) {
            return reverse(
                sortBy(
                    (item: ClaimCredential) =>
                        item.saveOfferDate && new Date(item.saveOfferDate),
                    reduce(
                        (acc, curr) =>
                            curr.withoutAccept === withoutAccept
                                ? [
                                      ...acc,
                                      {
                                          ...curr,
                                          ...(withoutAccept
                                              ? {
                                                    status: CredentialStatus.offered
                                                }
                                              : {})
                                      }
                                  ]
                                : acc,
                        [] as ClaimCredential[],
                        vfCredentials // if withoutAccept param is true set status to Offered because it's not the credential yet
                    )
                )
            );
        }
        return filter(['withoutAccept', withoutAccept], vfCredentials);
    }
);

export const newNotificationsSelector = createSelector<
    Selectors<ClaimCredential[]>,
    ClaimCredential[]
>(get('profile.vfCredentials'), (vfCredentials: ClaimCredential[]) =>
    filter(
        (item: ClaimCredential) =>
            (item.isNewWaiting === true && item.withoutAccept === true) ||
            item.isNewRevoked === true,
        vfCredentials
    )
);

export const newNotificationsLengthSelector = createSelector(
    newNotificationsSelector,
    disclosureNotificationsCounterSelector,
    (items: ClaimCredential[], disclosureNotificationsCount) =>
        items.length + disclosureNotificationsCount
);

export const selfCredentialsSelector = createSelector<
    Selectors<SavedSelfReportCredential[]>,
    SavedSelfReportCredential[]
>(
    get('profile.selfReportedCredentials'),
    (selfReportedCredentials: SavedSelfReportCredential[]) =>
        filter((item) => item.id !== '0', selfReportedCredentials)
);

export const isSelfReportIsLoadingSelector = createSelector<
    Selectors<boolean>,
    boolean
>(get('profile.isSelfReportLoading'), (isLoading: boolean) => isLoading);

export const areVerifiableCredentialsLoadedSelector = createSelector<
    Selectors<boolean>,
    boolean
>(get('profile.vfCredentialsLoaded'), (loaded: boolean) => loaded);

export const selfReportedCredentialsByTypes = ({types}: {types: string[]}) =>
    createSelector<
        Selectors<SavedSelfReportCredential[]>,
        SavedSelfReportCredential[]
    >(
        selfCredentialsSelector,
        (selfReportedCredentials: SavedSelfReportCredential[]) =>
            filter(
                (item) => !isEmpty(intersection(types, item.type)),
                selfReportedCredentials
            )
    );

export const credentialsByIdsSelector = (ids: string[]) =>
    createSelector<Selectors<ClaimCredential[]>, ClaimCredential[]>(
        get('profile.vfCredentials'),
        get('profile.selfReportedCredentials'),
        (
            vfCredentials: ClaimCredential[],
            selfReportedCredentials: ClaimCredential[]
        ) =>
            filter(
                (item) => ids.includes(item.id),
                [...vfCredentials, ...selfReportedCredentials]
            )
    );

export const credentialsByOfferIdSelector = createSelector(
    (state: RootState) => state?.profile.vfCredentials,
    (_: any, offerId: string) => offerId,
    (vfCredentials: ClaimCredential[], offerId: string) => {
        return find((item) => item.offerId === offerId, vfCredentials);
    }
);

const credentialFilter = (
    {id, types}: CredentialFilter,
    credentials: ClaimCredential[]
): ClaimCredential =>
    find((item) => {
        const typeMatch = !isEmpty(types)
            ? !isEmpty(intersection(item.type, types))
            : true;
        return item.id === id && typeMatch;
    }, credentials) as ClaimCredential;

export const vfCredentialSelector = (props: CredentialFilter) =>
    createSelector<Selectors<ClaimCredential[]>, ClaimCredential>(
        get('profile.vfCredentials'),
        (credentials: ClaimCredential[]) => credentialFilter(props, credentials)
    );

export const selfCredentialSelector = (props: CredentialFilter) =>
    createSelector<Selectors<ClaimCredential[]>, ClaimCredential>(
        get('profile.selfReportedCredentials'),
        (credentials: ClaimCredential[]) => credentialFilter(props, credentials)
    );

export const settingsSelector = createSelector<
    Selectors<SettingsProps>,
    SettingsProps
>(get('profile.settings'), (val: SettingsProps) => val);

export const revokedCredentialsSelector = createSelector<
    Selectors<ClaimCredential[]>,
    ClaimCredential[]
>(get('profile.vfCredentials'), (vfCredentials: ClaimCredential[]) =>
    reverse(
        sortBy(
            (item: ClaimCredential) =>
                item.revocationDate && new Date(item.revocationDate),
            filter(
                (credential) =>
                    credential.status === CredentialStatus.revoked ||
                    credential.status === CredentialStatus.replaced,
                vfCredentials
            )
        )
    )
);

export const identityCredentialsSelector = createSelector(
    ({profile: {vfCredentials}}: RootState): ClaimCredential[] => vfCredentials,
    identityTypesSelector,
    (_: any, types: string[] = []) => types,
    (vfCredentials: ClaimCredential[], identityTypes: string[], types) =>
        reduce(
            (acc: ClaimCredentialWithCheckbox[], curr: ClaimCredential) =>
                !isEmpty(
                    intersection(
                        values(isEmpty(types) ? identityTypes : types),
                        curr.type
                    )
                ) && !curr.withoutAccept
                    ? [...acc, {...curr, checked: false}]
                    : acc,
            [],
            vfCredentials
        )
);

export const credentialsByTypeSelector = (
    {types}: {types: string[]},
    withoutAccept: true | null = null
) =>
    createSelector<Selectors<ClaimCredential[]>, ClaimCredential[]>(
        get('profile.vfCredentials'),
        get('profile.selfReportedCredentials'),
        (
            vfCredentials: ClaimCredential[],
            selfReportedCredentials: ClaimCredential[]
        ) =>
            filter(
                (item) =>
                    !isEmpty(intersection(types, item.type)) &&
                    (item.status === CredentialStatus.self ||
                        item.withoutAccept === withoutAccept),
                [...vfCredentials, ...selfReportedCredentials]
            )
    );

export const credentialsByTypeAndStatusSelector = ({
    types,
    statuses
}: {
    types: string[];
    statuses: CredentialStatus[];
}) =>
    createSelector<Selectors<ClaimCredential[]>, ClaimCredential[]>(
        get('profile.vfCredentials'),
        get('profile.selfReportedCredentials'),
        (
            vfCredentials: ClaimCredential[],
            selfReportedCredentials: ClaimCredential[]
        ) =>
            filter(
                (item) =>
                    !isEmpty(intersection(types, item.type)) &&
                    statuses.includes(item.status),
                [...vfCredentials, ...selfReportedCredentials]
            )
    );

export const checkedCredentialsByTypeAndStatusSelector = ({
    types,
    statuses
}: {
    types: string[];
    statuses: CredentialStatus[];
}) =>
    createSelector(
        credentialsByTypeAndStatusSelector({types, statuses}),
        map((item) => ({checked: false, ...item}))
    );

export const credentialsCountByTypeSelector = ({types}: {types: string[]}) =>
    createSelector(
        credentialsByTypeSelector({types}),
        (credentials) => credentials.length
    );

export const nonIdentityCredentialsLoaded = createSelector<
    Selectors<boolean>,
    boolean
>(
    get('profile.vfCredentialsLoaded'),
    get('profile.selfReportedCredentialsLoaded'),
    (vfCredentialsLoaded: boolean, selfReportedCredentialsLoaded: boolean) =>
        vfCredentialsLoaded && selfReportedCredentialsLoaded
);

export const nonIdentityCredentials = createSelector(
    ({profile: {vfCredentials, selfReportedCredentials}}: RootState) => [
        ...vfCredentials,
        ...selfReportedCredentials
    ],
    identityTypesSelector,
    (
        credentials: (ClaimCredential | SavedSelfReportCredential)[],
        identityCategories: string[]
    ) =>
        filter(
            (item) => isEmpty(intersection(identityCategories, item.type)),
            credentials
        )
);

export const nonIdentityCredentialsCountSelector = createSelector(
    nonIdentityCredentials,
    (credentials) => credentials.length
);

export const revokedCredentialsCountSelector = () =>
    createSelector(
        revokedCredentialsSelector,
        (credentials) => credentials.length
    );

export const isVfCredentialsIsLoadingSelector = createSelector<
    Selectors<boolean>,
    boolean
>(get('profile.isVfCredentialsLoading'), (val: boolean) => val);

export const allCredentialsSelector = createSelector(
    vfCredentialsSelector,
    selfCredentialsSelector,
    (
        vfCredentials: ClaimCredential[],
        selfCredentials: SavedSelfReportCredential[]
    ) => [...vfCredentials, ...selfCredentials]
);

export const isPhoneVerificationPopupClosedSelector = createSelector<
    Selectors<boolean>,
    boolean
>(get('profile.phoneVerificationPopupClosed'), (val: boolean) => val);

export const showDisclosureTutorialSelector = createSelector<
    Selectors<boolean>,
    boolean
>(get('profile.showDisclosureTutorial'), (val: boolean) => val);
