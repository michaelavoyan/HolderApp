import Realm from 'realm';
import {forEach} from 'lodash';
import {VCLDidJwk} from '@velocitycareerlabs/vcl-react-native';
import {User} from './user';
import {CredentialObject} from './credentialObject';
import {SelfReportedObject} from './selfReportedObject';
import {CredentialSigned} from './credentialSigned';
import {Organization} from './organization';
import {Disclosure} from './disclosure';
import {Issuer} from './issuer';
import {CredentialSchema} from './credentialSchema';
import {Settings} from './settings';
import {CredentialAdditionalInfo} from './credentialAdditionalInfo';
import {Push} from './push';
import {CredentialStatus} from './credentialStatus';
import {CredentialManifest} from './credentialManifest';
import {VCLToken} from './VCLToken';
import {JWT} from './JWT';
import {SCHEMA_VERSION} from './migration/schemaVersion';
import {CredentialHistoryObject} from './credentialHistoryObject';
import {LinkCodeCommitment} from './linkCodeCommitment';
import {OAuth} from './OAuth';
import {VerifiedProfile} from './verifiedProfile';
import {CredentialSubject} from './credentialSubject';
import {DidJwk, PublicJwk} from './didJwk';
import {RelatedResource} from './relatedResource';

export const schema: Realm.Configuration = {
    schema: [
        User,
        CredentialObject,
        CredentialHistoryObject,
        SelfReportedObject,
        CredentialSigned,
        Organization,
        Disclosure,
        Issuer,
        CredentialSchema,
        Settings,
        CredentialAdditionalInfo,
        Push,
        CredentialStatus,
        LinkCodeCommitment,
        CredentialManifest,
        VerifiedProfile,
        CredentialSubject,
        VCLToken,
        JWT,
        OAuth,
        DidJwk,
        PublicJwk,
        RelatedResource
    ],
    schemaVersion: SCHEMA_VERSION,
    onMigration: (oldRealm: Realm, newRealm: Realm) => {
        const oldOAuth = oldRealm.objects<{didJwk: VCLDidJwk}>(OAuth.name);
        const newOAuth = newRealm.objects(OAuth.name);
        const oldCredentialManifest = oldRealm.objects<{didJwk: VCLDidJwk}>(CredentialManifest.name);
        const newCredentialManifest = newRealm.objects(CredentialManifest.name);

        if (oldRealm.schemaVersion < SCHEMA_VERSION) {
            forEach(oldOAuth, (_item, index) => {
                if (
                    !oldOAuth[index].didJwk?.publicJwk.valueStr &&
                    oldOAuth[index].didJwk
                ) {
                    (newOAuth[index].didJwk as VCLDidJwk).publicJwk = {
                        valueStr: JSON.stringify({
                            ...oldOAuth[index].didJwk?.publicJwk
                        })
                    };
                }
            });
            forEach(oldCredentialManifest, (_item, index) => {
                if (
                    !oldCredentialManifest[index].didJwk?.publicJwk.valueStr &&
                    oldCredentialManifest[index].didJwk
                ) {
                    (newCredentialManifest[index].didJwk as VCLDidJwk).publicJwk = {
                        valueStr: JSON.stringify({
                            ...oldCredentialManifest[index].didJwk?.publicJwk
                        })
                    };
                }
            });
        }

    }
};
