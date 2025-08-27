import Realm from 'realm';
import {forEach} from 'lodash';

import {
    ClaimCredentialWithCheckbox,
    SchemaVersionOneClaimCredentialWithCheckbox
} from '../../../components/DisclosureRequest/types';
import {CredentialObject} from '../credentialObject';

const SCHEMA_VERSION_MIGRATE_TO_VCL_TOKEN = 2; // Don't chnge!

export const migrationToVclToken = (oldRealm: Realm, newRealm: Realm) => {
    if (oldRealm.schemaVersion < SCHEMA_VERSION_MIGRATE_TO_VCL_TOKEN) {
        const oldObjects =
            oldRealm.objects<SchemaVersionOneClaimCredentialWithCheckbox>(
                CredentialObject.name
            );
        const newObjects = newRealm.objects<ClaimCredentialWithCheckbox>(
            CredentialObject.name
        );
        // loop through all objects and set the vclToken property in the new schema
        forEach(oldObjects, (item, index) => {
            if (item.vnfToken !== undefined)
                newObjects[index].vclToken = item.vnfToken;
        });
    }
};
