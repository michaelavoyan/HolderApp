export const credentials = [
    {
        type: ['OpenBadgeCredential', 'VerifiableCredential'],
        id: 'did:velocity:v2:0x8fcc668e24c27b305269d2fdb23e9031d4ab3e03:175426990919339:8132_olivia.hafez@example.com',
        logo: null,
        vendorCountry: '',
        note: null,
        issuer: {
            id: 'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
            name: 'Microsoft Corporation ion',
            country: null,
            logo: 'https://agsol.com/wp-content/uploads/2018/09/new-microsoft-logo-SIZED-SQUARE.jpg'
        },
        credentialSchema: {
            id: 'https://devlib.velocitynetwork.foundation/schemas/open-badge-credential.schema.json',
            type: 'JsonSchemaValidator2018'
        },
        credentialSubject: {
            '@context':
                'https://velocitynetwork.foundation/contexts/employment',
            type: 'AchievementSubject (OpenBadgeCredential)',
            achievement: {
                type: 'Achievement',
                name: 'Our Wallet Passed JFF Plugfest #1 2022',
                description: 'This wallet can display this Open Badge 3.0',
                criteria: {
                    type: 'Criteria',
                    narrative:
                        'The first cohort of the JFF Plugfest 1 in May/June of 2021 collaborated to push interoperability of VCs in education forward.'
                },
                image: 'https://w3c-ccg.github.io/vc-ed/plugfest-1-2022/images/plugfest-1-badge-image.png'
            },
            id: 'did:key:123'
        },
        offerId: null,
        userId: 'olivia.hafez@example.com',
        issuanceDate: '2023-01-18T10:16:57.013Z',
        isNewWaiting: null,
        withoutAccept: null,
        saveOfferDate: null,
        vendor: null,
        hash: '94277680107075a57dd132d11397f0906d8b98b57f50a508ba6f916038c8f6fd',
        status: 'verified',
        revocationDate: null,
        revocationReason: null,
        additionalInfo: null,
        isNewRevoked: null,
        linkCodeCommitment: {
            value: 'EiDErwEzgCoNIykhZa/XtkvmcEHoNornYZ8EjlfQnEEOnQ=='
        },
        credentialManifest: {
            iss: 'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
            did: 'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
            exchangeId: '63c7c6fa66f61354359aa23f',
            vendorOriginContext: null,
            jwt: {
                encodedJwt:
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksiLCJraWQiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHcjZXhjaGFuZ2Uta2V5LTEifQ.eyJleGNoYW5nZV9pZCI6IjYzYzdjNmZhNjZmNjEzNTQzNTlhYTIzZiIsIm1ldGFkYXRhIjp7ImNsaWVudF9uYW1lIjoiTWljcm9zb2Z0IENvcnBvcmF0aW9uIGlvbiIsImxvZ29fdXJpIjoiaHR0cHM6Ly9hZ3NvbC5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMTgvMDkvbmV3LW1pY3Jvc29mdC1sb2dvLVNJWkVELVNRVUFSRS5qcGciLCJ0b3NfdXJpIjoiaHR0cHM6Ly93d3cudmVsb2NpdHlleHBlcmllbmNlY2VudGVyLmNvbS90ZXJtcy1hbmQtY29uZGl0aW9ucy12bmYiLCJtYXhfcmV0ZW50aW9uX3BlcmlvZCI6IiIsInByb2dyZXNzX3VyaSI6Imh0dHBzOi8vZGV2YWdlbnQudmVsb2NpdHljYXJlZXJsYWJzLmlvL2FwaS9ob2xkZXIvdjAuNi9vcmcvZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3L2dldC1leGNoYW5nZS1wcm9ncmVzcyIsInN1Ym1pdF9wcmVzZW50YXRpb25fdXJpIjoiaHR0cHM6Ly9kZXZhZ2VudC52ZWxvY2l0eWNhcmVlcmxhYnMuaW8vYXBpL2hvbGRlci92MC42L29yZy9kaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHcvaXNzdWUvc3VibWl0LWlkZW50aWZpY2F0aW9uIiwiY2hlY2tfb2ZmZXJzX3VyaSI6Imh0dHBzOi8vZGV2YWdlbnQudmVsb2NpdHljYXJlZXJsYWJzLmlvL2FwaS9ob2xkZXIvdjAuNi9vcmcvZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3L2lzc3VlL2NyZWRlbnRpYWwtb2ZmZXJzIiwiZmluYWxpemVfb2ZmZXJzX3VyaSI6Imh0dHBzOi8vZGV2YWdlbnQudmVsb2NpdHljYXJlZXJsYWJzLmlvL2FwaS9ob2xkZXIvdjAuNi9vcmcvZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3L2lzc3VlL2ZpbmFsaXplLW9mZmVycyJ9LCJwcmVzZW50YXRpb25fZGVmaW5pdGlvbiI6eyJpZCI6IjYzYzdjNmZhNjZmNjEzNTQzNTlhYTIzZi42MjFjOWJlZWM4ZmEzNGI4ZTcyZDVmYzciLCJwdXJwb3NlIjoiIiwibmFtZSI6IlNoYXJlIHlvdXIgSWQsIEVtYWlsIGFuZCBQaG9uZSBOdW1iZXIgdG8gZmFjaWxpdGF0ZSB0aGUgc2VhcmNoIGZvciB5b3VyIGNhcmVlciBjcmVkZW50aWFscyIsImZvcm1hdCI6eyJqd3RfdnAiOnsiYWxnIjpbInNlY3AyNTZrMSJdfX0sImlucHV0X2Rlc2NyaXB0b3JzIjpbeyJpZCI6IlBhc3Nwb3J0VjEuMCIsIm5hbWUiOiJQYXNzcG9ydCIsInNjaGVtYSI6W3sidXJpIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9wYXNzcG9ydC12MS4wLnNjaGVtYS5qc29uIn1dLCJncm91cCI6WyJBIl19LHsiaWQiOiJFbWFpbFYxLjAiLCJuYW1lIjoiRW1haWwiLCJzY2hlbWEiOlt7InVyaSI6Imh0dHBzOi8vZGV2cmVnaXN0cmFyLnZlbG9jaXR5bmV0d29yay5mb3VuZGF0aW9uL3NjaGVtYXMvZW1haWwtdjEuMC5zY2hlbWEuanNvbiJ9XSwiZ3JvdXAiOlsiQSJdfSx7ImlkIjoiUGhvbmVWMS4wIiwibmFtZSI6IlBob25lIiwic2NoZW1hIjpbeyJ1cmkiOiJodHRwczovL2RldnJlZ2lzdHJhci52ZWxvY2l0eW5ldHdvcmsuZm91bmRhdGlvbi9zY2hlbWFzL3Bob25lLXYxLjAuc2NoZW1hLmpzb24ifV0sImdyb3VwIjpbIkEiXX0seyJpZCI6IkRyaXZlcnNMaWNlbnNlVjEuMCIsIm5hbWUiOiJEcml2ZXIncyBsaWNlbnNlIiwic2NoZW1hIjpbeyJ1cmkiOiJodHRwczovL2RldnJlZ2lzdHJhci52ZWxvY2l0eW5ldHdvcmsuZm91bmRhdGlvbi9zY2hlbWFzL2RyaXZlcnMtbGljZW5zZS12MS4wLnNjaGVtYS5qc29uIn1dLCJncm91cCI6WyJBIl19LHsiaWQiOiJOYXRpb25hbElkQ2FyZFYxLjAiLCJuYW1lIjoiTmF0aW9uYWwgSUQgY2FyZCIsInNjaGVtYSI6W3sidXJpIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9uYXRpb25hbC1pZC1jYXJkLXYxLjAuc2NoZW1hLmpzb24ifV0sImdyb3VwIjpbIkEiXX1dLCJzdWJtaXNzaW9uX3JlcXVpcmVtZW50cyI6W3sicnVsZSI6ImFsbCIsImZyb20iOiJBIiwibWluIjo1fV19LCJvdXRwdXRfZGVzY3JpcHRvcnMiOltdLCJpc3N1ZXIiOnsiaWQiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHcifSwibmJmIjoxNjc0MDM2OTg2LCJpc3MiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHciLCJleHAiOjE2NzQ2NDE3ODYsImlhdCI6MTY3NDAzNjk4Nn0.9npU5Iqp4J8YHgwhI4yOtstGbFy8yAmbcqkBy1GGIbYbseFkPx7SIwDgIEdgjGHsCDDrumMSPAtifh-2O_MSoA'
            }
        },
        vclToken: null,
        default: null,
        jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksiLCJraWQiOiJkaWQ6dmVsb2NpdHk6djI6MHg4ZmNjNjY4ZTI0YzI3YjMwNTI2OWQyZmRiMjNlOTAzMWQ0YWIzZTAzOjE3NTQyNjk5MDkxOTMzOTo4MTMyI2tleS0xIn0.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIk9wZW5CYWRnZUNyZWRlbnRpYWwiLCJWZXJpZmlhYmxlQ3JlZGVudGlhbCJdLCJjcmVkZW50aWFsU3RhdHVzIjp7InR5cGUiOiJWZWxvY2l0eVJldm9jYXRpb25MaXN0SmFuMjAyMSIsImlkIjoiZXRoZXJldW06MHhEODkwRjJENjBCNDI5ZjllMjU3RkMwQmM1OEVmMjIzNzc3NkREOTFCL2dldFJldm9rZWRTdGF0dXM_YWRkcmVzcz0weDhmQ2M2NjhlMjRjMjdiMzA1MjY5RDJmRGIyM0U5MDMxZDRBQjNlMDMmbGlzdElkPTIzNjM2MTY5NjQ4MTM4MSZpbmRleD05OTQxIiwic3RhdHVzTGlzdEluZGV4Ijo5OTQxLCJzdGF0dXNMaXN0Q3JlZGVudGlhbCI6ImV0aGVyZXVtOjB4RDg5MEYyRDYwQjQyOWY5ZTI1N0ZDMEJjNThFZjIyMzc3NzZERDkxQi9nZXRSZXZva2VkU3RhdHVzP2FkZHJlc3M9MHg4ZkNjNjY4ZTI0YzI3YjMwNTI2OUQyZkRiMjNFOTAzMWQ0QUIzZTAzJmxpc3RJZD0yMzYzNjE2OTY0ODEzODEiLCJsaW5rQ29kZUNvbW1pdCI6IkVpREVyd0V6Z0NvTkl5a2haYS9YdGt2bWNFSG9Ob3JuWVo4RWpsZlFuRUVPblE9PSJ9LCJjb250ZW50SGFzaCI6eyJ0eXBlIjoiVmVsb2NpdHlDb250ZW50SGFzaDIwMjAiLCJ2YWx1ZSI6Ijk0Mjc3NjgwMTA3MDc1YTU3ZGQxMzJkMTEzOTdmMDkwNmQ4Yjk4YjU3ZjUwYTUwOGJhNmY5MTYwMzhjOGY2ZmQifSwiY3JlZGVudGlhbFNjaGVtYSI6eyJpZCI6Imh0dHBzOi8vZGV2cmVnaXN0cmFyLnZlbG9jaXR5bmV0d29yay5mb3VuZGF0aW9uL3NjaGVtYXMvb3Blbi1iYWRnZS1jcmVkZW50aWFsLnNjaGVtYS5qc29uIiwidHlwZSI6Ikpzb25TY2hlbWFWYWxpZGF0b3IyMDE4In0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7IkBjb250ZXh0IjoiaHR0cHM6Ly92ZWxvY2l0eW5ldHdvcmsuZm91bmRhdGlvbi9jb250ZXh0cy9lbXBsb3ltZW50IiwidHlwZSI6IkFjaGlldmVtZW50U3ViamVjdCAoT3BlbkJhZGdlQ3JlZGVudGlhbCkiLCJhY2hpZXZlbWVudCI6eyJ0eXBlIjoiQWNoaWV2ZW1lbnQiLCJuYW1lIjoiT3VyIFdhbGxldCBQYXNzZWQgSkZGIFBsdWdmZXN0ICMxIDIwMjIiLCJkZXNjcmlwdGlvbiI6IlRoaXMgd2FsbGV0IGNhbiBkaXNwbGF5IHRoaXMgT3BlbiBCYWRnZSAzLjAiLCJjcml0ZXJpYSI6eyJ0eXBlIjoiQ3JpdGVyaWEiLCJuYXJyYXRpdmUiOiJUaGUgZmlyc3QgY29ob3J0IG9mIHRoZSBKRkYgUGx1Z2Zlc3QgMSBpbiBNYXkvSnVuZSBvZiAyMDIxIGNvbGxhYm9yYXRlZCB0byBwdXNoIGludGVyb3BlcmFiaWxpdHkgb2YgVkNzIGluIGVkdWNhdGlvbiBmb3J3YXJkLiJ9LCJpbWFnZSI6Imh0dHBzOi8vdzNjLWNjZy5naXRodWIuaW8vdmMtZWQvcGx1Z2Zlc3QtMS0yMDIyL2ltYWdlcy9wbHVnZmVzdC0xLWJhZGdlLWltYWdlLnBuZyJ9fX0sIm5iZiI6MTY3NDAzNzAxNiwianRpIjoiZGlkOnZlbG9jaXR5OnYyOjB4OGZjYzY2OGUyNGMyN2IzMDUyNjlkMmZkYjIzZTkwMzFkNGFiM2UwMzoxNzU0MjY5OTA5MTkzMzk6ODEzMiIsImlzcyI6ImRpZDppb246RWlBYlA5eHZDWW5VT2lMd3FnYmtWNGF1SF8yNlB2N0JUMnBZWVQzbWFzdnZodyIsInN1YiI6ImRpZDprZXk6MTIzIiwiaWF0IjoxNjc0MDM3MDE2fQ.s39NEP07jWiseD9_AuE6pusIyL6h81w13y9ooPzbhPHtDRY3laREUHwdzR76K-CJ143l-8Lc3-ZC7ZORGiJcQw',
        output_descriptors: null,
        replacerId: null
    },
    {
        type: [
            'CertificationV1.1',
            'VerifiableCredential',
            'CertificationV1.0',
            'LicenseV1.1',
            'LicenseV1.0'
        ],
        id: 'did:velocity:v2:0x8fcc668e24c27b305269d2fdb23e9031d4ab3e03:175426990919339:440_olivia.hafez@example.com',
        logo: null,
        vendorCountry: '',
        note: null,
        issuer: {
            id: 'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
            name: 'Microsoft Corporation ion',
            country: null,
            logo: 'https://agsol.com/wp-content/uploads/2018/09/new-microsoft-logo-SIZED-SQUARE.jpg'
        },
        credentialSchema: {
            id: 'https://devlib.velocitynetwork.foundation/schemas/certification-v1.1.schema.json',
            type: 'JsonSchemaValidator2018'
        },
        credentialSubject: {
            '@context':
                'https://velocitynetwork.foundation/contexts/certification-license',
            authority: {
                name: 'Microsoft Corporation ion',
                did: 'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
                place: {
                    addressLocality: 'Redmond',
                    addressRegion: 'US-WA',
                    addressCountry: 'US',
                    name: 'Corporate Headquarters'
                }
            },
            name: 'Azure Solutions Architect (CertificationV1.1)',
            identifier: 'E2000-1234',
            validity: {
                firstValidFrom: '2015-01-18',
                validFrom: '2015-01-18',
                validUntil: '2025-01-01',
                validIn: {
                    addressLocality: 'Test Locality',
                    addressRegion: 'Test Region',
                    addressCountry: 'Test Country'
                }
            },
            endorsementCode: 'Test endorsementCode',
            restrictionCode: 'Test restrictionCode',
            alignment: [
                {
                    targetName:
                        'Azure Solutions Architect Expert Certification',
                    targetUrl:
                        'https://docs.microsoft.com/en-us/learn/certifications/azure-solutions-architect/',
                    targetDescription: 'Required exams: AZ-303AZ-304',
                    targetCode: 'ce-967e7d1a-a74e-4047-8018-5bbb55d6e88c',
                    targetFramework: 'Microsoft Certifications'
                }
            ],
            description:
                'Responsibilities for this role include advising stakeholders and translating business requirements into secure, scalable, and reliable cloud solutions. An Azure Solution Architect partners with cloud administrators, cloud DBAs, and clients to implement solutions.',
            recipient: {
                givenName: 'Olivia',
                familyName: 'Hafez',
                middleName: 'Melanie',
                namePrefix: 'Dr.',
                nameSuffix: 'Mrs.'
            }
        },
        offerId: null,
        userId: 'olivia.hafez@example.com',
        issuanceDate: '2023-01-18T10:16:57.000Z',
        isNewWaiting: null,
        withoutAccept: null,
        saveOfferDate: null,
        vendor: null,
        hash: '9034f814f808b0538fe2bca8940094e95331b832ce6fd53bf453b6fe82bc69b3',
        status: 'verified',
        revocationDate: null,
        revocationReason: null,
        additionalInfo: null,
        isNewRevoked: null,
        linkCodeCommitment: {
            value: 'EiCYEWNdBojyyDKQ0/0X3fOniysEAgnVSrp8GL2u5JZNLg=='
        },
        credentialManifest: {
            iss: 'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
            did: 'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
            exchangeId: '63c7c6fa66f61354359aa23f',
            vendorOriginContext: null,
            jwt: {
                encodedJwt:
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksiLCJraWQiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHcjZXhjaGFuZ2Uta2V5LTEifQ.eyJleGNoYW5nZV9pZCI6IjYzYzdjNmZhNjZmNjEzNTQzNTlhYTIzZiIsIm1ldGFkYXRhIjp7ImNsaWVudF9uYW1lIjoiTWljcm9zb2Z0IENvcnBvcmF0aW9uIGlvbiIsImxvZ29fdXJpIjoiaHR0cHM6Ly9hZ3NvbC5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMTgvMDkvbmV3LW1pY3Jvc29mdC1sb2dvLVNJWkVELVNRVUFSRS5qcGciLCJ0b3NfdXJpIjoiaHR0cHM6Ly93d3cudmVsb2NpdHlleHBlcmllbmNlY2VudGVyLmNvbS90ZXJtcy1hbmQtY29uZGl0aW9ucy12bmYiLCJtYXhfcmV0ZW50aW9uX3BlcmlvZCI6IiIsInByb2dyZXNzX3VyaSI6Imh0dHBzOi8vZGV2YWdlbnQudmVsb2NpdHljYXJlZXJsYWJzLmlvL2FwaS9ob2xkZXIvdjAuNi9vcmcvZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3L2dldC1leGNoYW5nZS1wcm9ncmVzcyIsInN1Ym1pdF9wcmVzZW50YXRpb25fdXJpIjoiaHR0cHM6Ly9kZXZhZ2VudC52ZWxvY2l0eWNhcmVlcmxhYnMuaW8vYXBpL2hvbGRlci92MC42L29yZy9kaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHcvaXNzdWUvc3VibWl0LWlkZW50aWZpY2F0aW9uIiwiY2hlY2tfb2ZmZXJzX3VyaSI6Imh0dHBzOi8vZGV2YWdlbnQudmVsb2NpdHljYXJlZXJsYWJzLmlvL2FwaS9ob2xkZXIvdjAuNi9vcmcvZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3L2lzc3VlL2NyZWRlbnRpYWwtb2ZmZXJzIiwiZmluYWxpemVfb2ZmZXJzX3VyaSI6Imh0dHBzOi8vZGV2YWdlbnQudmVsb2NpdHljYXJlZXJsYWJzLmlvL2FwaS9ob2xkZXIvdjAuNi9vcmcvZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3L2lzc3VlL2ZpbmFsaXplLW9mZmVycyJ9LCJwcmVzZW50YXRpb25fZGVmaW5pdGlvbiI6eyJpZCI6IjYzYzdjNmZhNjZmNjEzNTQzNTlhYTIzZi42MjFjOWJlZWM4ZmEzNGI4ZTcyZDVmYzciLCJwdXJwb3NlIjoiIiwibmFtZSI6IlNoYXJlIHlvdXIgSWQsIEVtYWlsIGFuZCBQaG9uZSBOdW1iZXIgdG8gZmFjaWxpdGF0ZSB0aGUgc2VhcmNoIGZvciB5b3VyIGNhcmVlciBjcmVkZW50aWFscyIsImZvcm1hdCI6eyJqd3RfdnAiOnsiYWxnIjpbInNlY3AyNTZrMSJdfX0sImlucHV0X2Rlc2NyaXB0b3JzIjpbeyJpZCI6IlBhc3Nwb3J0VjEuMCIsIm5hbWUiOiJQYXNzcG9ydCIsInNjaGVtYSI6W3sidXJpIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9wYXNzcG9ydC12MS4wLnNjaGVtYS5qc29uIn1dLCJncm91cCI6WyJBIl19LHsiaWQiOiJFbWFpbFYxLjAiLCJuYW1lIjoiRW1haWwiLCJzY2hlbWEiOlt7InVyaSI6Imh0dHBzOi8vZGV2cmVnaXN0cmFyLnZlbG9jaXR5bmV0d29yay5mb3VuZGF0aW9uL3NjaGVtYXMvZW1haWwtdjEuMC5zY2hlbWEuanNvbiJ9XSwiZ3JvdXAiOlsiQSJdfSx7ImlkIjoiUGhvbmVWMS4wIiwibmFtZSI6IlBob25lIiwic2NoZW1hIjpbeyJ1cmkiOiJodHRwczovL2RldnJlZ2lzdHJhci52ZWxvY2l0eW5ldHdvcmsuZm91bmRhdGlvbi9zY2hlbWFzL3Bob25lLXYxLjAuc2NoZW1hLmpzb24ifV0sImdyb3VwIjpbIkEiXX0seyJpZCI6IkRyaXZlcnNMaWNlbnNlVjEuMCIsIm5hbWUiOiJEcml2ZXIncyBsaWNlbnNlIiwic2NoZW1hIjpbeyJ1cmkiOiJodHRwczovL2RldnJlZ2lzdHJhci52ZWxvY2l0eW5ldHdvcmsuZm91bmRhdGlvbi9zY2hlbWFzL2RyaXZlcnMtbGljZW5zZS12MS4wLnNjaGVtYS5qc29uIn1dLCJncm91cCI6WyJBIl19LHsiaWQiOiJOYXRpb25hbElkQ2FyZFYxLjAiLCJuYW1lIjoiTmF0aW9uYWwgSUQgY2FyZCIsInNjaGVtYSI6W3sidXJpIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9uYXRpb25hbC1pZC1jYXJkLXYxLjAuc2NoZW1hLmpzb24ifV0sImdyb3VwIjpbIkEiXX1dLCJzdWJtaXNzaW9uX3JlcXVpcmVtZW50cyI6W3sicnVsZSI6ImFsbCIsImZyb20iOiJBIiwibWluIjo1fV19LCJvdXRwdXRfZGVzY3JpcHRvcnMiOltdLCJpc3N1ZXIiOnsiaWQiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHcifSwibmJmIjoxNjc0MDM2OTg2LCJpc3MiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHciLCJleHAiOjE2NzQ2NDE3ODYsImlhdCI6MTY3NDAzNjk4Nn0.9npU5Iqp4J8YHgwhI4yOtstGbFy8yAmbcqkBy1GGIbYbseFkPx7SIwDgIEdgjGHsCDDrumMSPAtifh-2O_MSoA'
            }
        },
        vclToken: null,
        default: null,
        jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksiLCJraWQiOiJkaWQ6dmVsb2NpdHk6djI6MHg4ZmNjNjY4ZTI0YzI3YjMwNTI2OWQyZmRiMjNlOTAzMWQ0YWIzZTAzOjE3NTQyNjk5MDkxOTMzOTo0NDAja2V5LTEifQ.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIkNlcnRpZmljYXRpb25WMS4xIiwiVmVyaWZpYWJsZUNyZWRlbnRpYWwiXSwiY3JlZGVudGlhbFN0YXR1cyI6eyJ0eXBlIjoiVmVsb2NpdHlSZXZvY2F0aW9uTGlzdEphbjIwMjEiLCJpZCI6ImV0aGVyZXVtOjB4RDg5MEYyRDYwQjQyOWY5ZTI1N0ZDMEJjNThFZjIyMzc3NzZERDkxQi9nZXRSZXZva2VkU3RhdHVzP2FkZHJlc3M9MHg4ZkNjNjY4ZTI0YzI3YjMwNTI2OUQyZkRiMjNFOTAzMWQ0QUIzZTAzJmxpc3RJZD0yMzYzNjE2OTY0ODEzODEmaW5kZXg9MjI5OCIsInN0YXR1c0xpc3RJbmRleCI6MjI5OCwic3RhdHVzTGlzdENyZWRlbnRpYWwiOiJldGhlcmV1bToweEQ4OTBGMkQ2MEI0MjlmOWUyNTdGQzBCYzU4RWYyMjM3Nzc2REQ5MUIvZ2V0UmV2b2tlZFN0YXR1cz9hZGRyZXNzPTB4OGZDYzY2OGUyNGMyN2IzMDUyNjlEMmZEYjIzRTkwMzFkNEFCM2UwMyZsaXN0SWQ9MjM2MzYxNjk2NDgxMzgxIiwibGlua0NvZGVDb21taXQiOiJFaUNZRVdOZEJvanl5REtRMC8wWDNmT25peXNFQWduVlNycDhHTDJ1NUpaTkxnPT0ifSwiY29udGVudEhhc2giOnsidHlwZSI6IlZlbG9jaXR5Q29udGVudEhhc2gyMDIwIiwidmFsdWUiOiI5MDM0ZjgxNGY4MDhiMDUzOGZlMmJjYTg5NDAwOTRlOTUzMzFiODMyY2U2ZmQ1M2JmNDUzYjZmZTgyYmM2OWIzIn0sImNyZWRlbnRpYWxTY2hlbWEiOnsiaWQiOiJodHRwczovL2RldnJlZ2lzdHJhci52ZWxvY2l0eW5ldHdvcmsuZm91bmRhdGlvbi9zY2hlbWFzL2NlcnRpZmljYXRpb24tdjEuMS5zY2hlbWEuanNvbiIsInR5cGUiOiJKc29uU2NoZW1hVmFsaWRhdG9yMjAxOCJ9LCJjcmVkZW50aWFsU3ViamVjdCI6eyJAY29udGV4dCI6Imh0dHBzOi8vdmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vY29udGV4dHMvY2VydGlmaWNhdGlvbi1saWNlbnNlIiwiYXV0aG9yaXR5Ijp7Im5hbWUiOiJNaWNyb3NvZnQgQ29ycG9yYXRpb24gaW9uIiwiZGlkIjoiZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3IiwicGxhY2UiOnsiYWRkcmVzc0xvY2FsaXR5IjoiUmVkbW9uZCIsImFkZHJlc3NSZWdpb24iOiJVUy1XQSIsImFkZHJlc3NDb3VudHJ5IjoiVVMiLCJuYW1lIjoiQ29ycG9yYXRlIEhlYWRxdWFydGVycyJ9fSwibmFtZSI6IkF6dXJlIFNvbHV0aW9ucyBBcmNoaXRlY3QgKENlcnRpZmljYXRpb25WMS4xKSIsImlkZW50aWZpZXIiOiJFMjAwMC0xMjM0IiwidmFsaWRpdHkiOnsiZmlyc3RWYWxpZEZyb20iOiIyMDE1LTAxLTE4IiwidmFsaWRGcm9tIjoiMjAxNS0wMS0xOCIsInZhbGlkVW50aWwiOiIyMDI1LTAxLTAxIiwidmFsaWRJbiI6eyJhZGRyZXNzTG9jYWxpdHkiOiJUZXN0IExvY2FsaXR5IiwiYWRkcmVzc1JlZ2lvbiI6IlRlc3QgUmVnaW9uIiwiYWRkcmVzc0NvdW50cnkiOiJUZXN0IENvdW50cnkifX0sImVuZG9yc2VtZW50Q29kZSI6IlRlc3QgZW5kb3JzZW1lbnRDb2RlIiwicmVzdHJpY3Rpb25Db2RlIjoiVGVzdCByZXN0cmljdGlvbkNvZGUiLCJhbGlnbm1lbnQiOlt7InRhcmdldE5hbWUiOiJBenVyZSBTb2x1dGlvbnMgQXJjaGl0ZWN0IEV4cGVydCBDZXJ0aWZpY2F0aW9uIiwidGFyZ2V0VXJsIjoiaHR0cHM6Ly9kb2NzLm1pY3Jvc29mdC5jb20vZW4tdXMvbGVhcm4vY2VydGlmaWNhdGlvbnMvYXp1cmUtc29sdXRpb25zLWFyY2hpdGVjdC8iLCJ0YXJnZXREZXNjcmlwdGlvbiI6IlJlcXVpcmVkIGV4YW1zOiBBWi0zMDNBWi0zMDQiLCJ0YXJnZXRDb2RlIjoiY2UtOTY3ZTdkMWEtYTc0ZS00MDQ3LTgwMTgtNWJiYjU1ZDZlODhjIiwidGFyZ2V0RnJhbWV3b3JrIjoiTWljcm9zb2Z0IENlcnRpZmljYXRpb25zIn1dLCJkZXNjcmlwdGlvbiI6IlJlc3BvbnNpYmlsaXRpZXMgZm9yIHRoaXMgcm9sZSBpbmNsdWRlIGFkdmlzaW5nIHN0YWtlaG9sZGVycyBhbmQgdHJhbnNsYXRpbmcgYnVzaW5lc3MgcmVxdWlyZW1lbnRzIGludG8gc2VjdXJlLCBzY2FsYWJsZSwgYW5kIHJlbGlhYmxlIGNsb3VkIHNvbHV0aW9ucy4gQW4gQXp1cmUgU29sdXRpb24gQXJjaGl0ZWN0IHBhcnRuZXJzIHdpdGggY2xvdWQgYWRtaW5pc3RyYXRvcnMsIGNsb3VkIERCQXMsIGFuZCBjbGllbnRzIHRvIGltcGxlbWVudCBzb2x1dGlvbnMuIiwicmVjaXBpZW50Ijp7ImdpdmVuTmFtZSI6Ik9saXZpYSIsImZhbWlseU5hbWUiOiJIYWZleiIsIm1pZGRsZU5hbWUiOiJNZWxhbmllIiwibmFtZVByZWZpeCI6IkRyLiIsIm5hbWVTdWZmaXgiOiJNcnMuIn19fSwibmJmIjoxNjc0MDM3MDE2LCJqdGkiOiJkaWQ6dmVsb2NpdHk6djI6MHg4ZmNjNjY4ZTI0YzI3YjMwNTI2OWQyZmRiMjNlOTAzMWQ0YWIzZTAzOjE3NTQyNjk5MDkxOTMzOTo0NDAiLCJpc3MiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHciLCJpYXQiOjE2NzQwMzcwMTZ9.VR7NmLZlim2-atAdftdsKeZtxlSjw3dZUgP70hSfwZLuiE95aUgKOUy1rh_J32N6lWrJAY7wVaBSyHH9XzNBeA',
        output_descriptors: null,
        replacerId: null
    },
    {
        type: ['EmploymentPastV1.1', 'VerifiableCredential'],
        id: 'did:velocity:v2:0x8fcc668e24c27b305269d2fdb23e9031d4ab3e03:175426990919339:8053_olivia.hafez@example.com',
        logo: null,
        vendorCountry: '',
        note: null,
        issuer: {
            id: 'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
            name: 'Microsoft Corporation ion',
            country: null,
            logo: 'https://agsol.com/wp-content/uploads/2018/09/new-microsoft-logo-SIZED-SQUARE.jpg'
        },
        credentialSchema: {
            id: 'https://devlib.velocitynetwork.foundation/schemas/employment-past-v1.1.schema.json',
            type: 'JsonSchemaValidator2018'
        },
        credentialSubject: {
            '@context':
                'https://velocitynetwork.foundation/contexts/employment',
            legalEmployer: {
                name: 'Offer-2 (push)',
                identifier:
                    'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
                place: {
                    addressLocality: 'Bellevue',
                    addressRegion: 'US-WA',
                    addressCountry: 'US'
                }
            },
            role: 'Offer-2 (push)',
            description: 'Backend development project management',
            place: {
                name: 'Media Lab',
                addressLocality: 'Buffalo',
                addressRegion: 'US-NY',
                addressCountry: 'US'
            },
            startDate: '2013-10-01',
            endDate: '2017-01-01',
            recipient: {
                givenName: 'Olivia',
                familyName: 'Hafez',
                middleName: 'Melanie',
                namePrefix: 'Dr.',
                nameSuffix: 'Mrs.'
            },
            alignment: [
                {
                    targetName: 'Test Name',
                    targetUrl:
                        'https://credentialfinder.org/credential/5769/Bachelor_of_Science_in_Nursing_RN_to_BSN',
                    targetFramework: 'Test Framework'
                }
            ]
        },
        offerId: null,
        userId: 'olivia.hafez@example.com',
        issuanceDate: '2023-01-18T10:16:57.014Z',
        isNewWaiting: null,
        withoutAccept: null,
        saveOfferDate: null,
        vendor: null,
        hash: '192719e984872f5ed98b0f8b260b2ff42eb116fd6c8148f705ae6db6b2a5e2d3',
        status: 'verified',
        revocationDate: null,
        revocationReason: null,
        additionalInfo: null,
        isNewRevoked: null,
        linkCodeCommitment: {
            value: 'EiASGrhAEptn6EuciOdLDB4qzMzx9WR5RplPz/GKIGoblw=='
        },
        credentialManifest: {
            iss: 'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
            did: 'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
            exchangeId: '63c7c6fa66f61354359aa23f',
            vendorOriginContext: null,
            jwt: {
                encodedJwt:
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksiLCJraWQiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHcjZXhjaGFuZ2Uta2V5LTEifQ.eyJleGNoYW5nZV9pZCI6IjYzYzdjNmZhNjZmNjEzNTQzNTlhYTIzZiIsIm1ldGFkYXRhIjp7ImNsaWVudF9uYW1lIjoiTWljcm9zb2Z0IENvcnBvcmF0aW9uIGlvbiIsImxvZ29fdXJpIjoiaHR0cHM6Ly9hZ3NvbC5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMTgvMDkvbmV3LW1pY3Jvc29mdC1sb2dvLVNJWkVELVNRVUFSRS5qcGciLCJ0b3NfdXJpIjoiaHR0cHM6Ly93d3cudmVsb2NpdHlleHBlcmllbmNlY2VudGVyLmNvbS90ZXJtcy1hbmQtY29uZGl0aW9ucy12bmYiLCJtYXhfcmV0ZW50aW9uX3BlcmlvZCI6IiIsInByb2dyZXNzX3VyaSI6Imh0dHBzOi8vZGV2YWdlbnQudmVsb2NpdHljYXJlZXJsYWJzLmlvL2FwaS9ob2xkZXIvdjAuNi9vcmcvZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3L2dldC1leGNoYW5nZS1wcm9ncmVzcyIsInN1Ym1pdF9wcmVzZW50YXRpb25fdXJpIjoiaHR0cHM6Ly9kZXZhZ2VudC52ZWxvY2l0eWNhcmVlcmxhYnMuaW8vYXBpL2hvbGRlci92MC42L29yZy9kaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHcvaXNzdWUvc3VibWl0LWlkZW50aWZpY2F0aW9uIiwiY2hlY2tfb2ZmZXJzX3VyaSI6Imh0dHBzOi8vZGV2YWdlbnQudmVsb2NpdHljYXJlZXJsYWJzLmlvL2FwaS9ob2xkZXIvdjAuNi9vcmcvZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3L2lzc3VlL2NyZWRlbnRpYWwtb2ZmZXJzIiwiZmluYWxpemVfb2ZmZXJzX3VyaSI6Imh0dHBzOi8vZGV2YWdlbnQudmVsb2NpdHljYXJlZXJsYWJzLmlvL2FwaS9ob2xkZXIvdjAuNi9vcmcvZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3L2lzc3VlL2ZpbmFsaXplLW9mZmVycyJ9LCJwcmVzZW50YXRpb25fZGVmaW5pdGlvbiI6eyJpZCI6IjYzYzdjNmZhNjZmNjEzNTQzNTlhYTIzZi42MjFjOWJlZWM4ZmEzNGI4ZTcyZDVmYzciLCJwdXJwb3NlIjoiIiwibmFtZSI6IlNoYXJlIHlvdXIgSWQsIEVtYWlsIGFuZCBQaG9uZSBOdW1iZXIgdG8gZmFjaWxpdGF0ZSB0aGUgc2VhcmNoIGZvciB5b3VyIGNhcmVlciBjcmVkZW50aWFscyIsImZvcm1hdCI6eyJqd3RfdnAiOnsiYWxnIjpbInNlY3AyNTZrMSJdfX0sImlucHV0X2Rlc2NyaXB0b3JzIjpbeyJpZCI6IlBhc3Nwb3J0VjEuMCIsIm5hbWUiOiJQYXNzcG9ydCIsInNjaGVtYSI6W3sidXJpIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9wYXNzcG9ydC12MS4wLnNjaGVtYS5qc29uIn1dLCJncm91cCI6WyJBIl19LHsiaWQiOiJFbWFpbFYxLjAiLCJuYW1lIjoiRW1haWwiLCJzY2hlbWEiOlt7InVyaSI6Imh0dHBzOi8vZGV2cmVnaXN0cmFyLnZlbG9jaXR5bmV0d29yay5mb3VuZGF0aW9uL3NjaGVtYXMvZW1haWwtdjEuMC5zY2hlbWEuanNvbiJ9XSwiZ3JvdXAiOlsiQSJdfSx7ImlkIjoiUGhvbmVWMS4wIiwibmFtZSI6IlBob25lIiwic2NoZW1hIjpbeyJ1cmkiOiJodHRwczovL2RldnJlZ2lzdHJhci52ZWxvY2l0eW5ldHdvcmsuZm91bmRhdGlvbi9zY2hlbWFzL3Bob25lLXYxLjAuc2NoZW1hLmpzb24ifV0sImdyb3VwIjpbIkEiXX0seyJpZCI6IkRyaXZlcnNMaWNlbnNlVjEuMCIsIm5hbWUiOiJEcml2ZXIncyBsaWNlbnNlIiwic2NoZW1hIjpbeyJ1cmkiOiJodHRwczovL2RldnJlZ2lzdHJhci52ZWxvY2l0eW5ldHdvcmsuZm91bmRhdGlvbi9zY2hlbWFzL2RyaXZlcnMtbGljZW5zZS12MS4wLnNjaGVtYS5qc29uIn1dLCJncm91cCI6WyJBIl19LHsiaWQiOiJOYXRpb25hbElkQ2FyZFYxLjAiLCJuYW1lIjoiTmF0aW9uYWwgSUQgY2FyZCIsInNjaGVtYSI6W3sidXJpIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9uYXRpb25hbC1pZC1jYXJkLXYxLjAuc2NoZW1hLmpzb24ifV0sImdyb3VwIjpbIkEiXX1dLCJzdWJtaXNzaW9uX3JlcXVpcmVtZW50cyI6W3sicnVsZSI6ImFsbCIsImZyb20iOiJBIiwibWluIjo1fV19LCJvdXRwdXRfZGVzY3JpcHRvcnMiOltdLCJpc3N1ZXIiOnsiaWQiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHcifSwibmJmIjoxNjc0MDM2OTg2LCJpc3MiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHciLCJleHAiOjE2NzQ2NDE3ODYsImlhdCI6MTY3NDAzNjk4Nn0.9npU5Iqp4J8YHgwhI4yOtstGbFy8yAmbcqkBy1GGIbYbseFkPx7SIwDgIEdgjGHsCDDrumMSPAtifh-2O_MSoA'
            }
        },
        vclToken: null,
        default: null,
        jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksiLCJraWQiOiJkaWQ6dmVsb2NpdHk6djI6MHg4ZmNjNjY4ZTI0YzI3YjMwNTI2OWQyZmRiMjNlOTAzMWQ0YWIzZTAzOjE3NTQyNjk5MDkxOTMzOTo4MDUzI2tleS0xIn0.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIkVtcGxveW1lbnRQYXN0VjEuMSIsIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdGF0dXMiOnsidHlwZSI6IlZlbG9jaXR5UmV2b2NhdGlvbkxpc3RKYW4yMDIxIiwiaWQiOiJldGhlcmV1bToweEQ4OTBGMkQ2MEI0MjlmOWUyNTdGQzBCYzU4RWYyMjM3Nzc2REQ5MUIvZ2V0UmV2b2tlZFN0YXR1cz9hZGRyZXNzPTB4OGZDYzY2OGUyNGMyN2IzMDUyNjlEMmZEYjIzRTkwMzFkNEFCM2UwMyZsaXN0SWQ9MjM2MzYxNjk2NDgxMzgxJmluZGV4PTM1MjEiLCJzdGF0dXNMaXN0SW5kZXgiOjM1MjEsInN0YXR1c0xpc3RDcmVkZW50aWFsIjoiZXRoZXJldW06MHhEODkwRjJENjBCNDI5ZjllMjU3RkMwQmM1OEVmMjIzNzc3NkREOTFCL2dldFJldm9rZWRTdGF0dXM_YWRkcmVzcz0weDhmQ2M2NjhlMjRjMjdiMzA1MjY5RDJmRGIyM0U5MDMxZDRBQjNlMDMmbGlzdElkPTIzNjM2MTY5NjQ4MTM4MSIsImxpbmtDb2RlQ29tbWl0IjoiRWlBU0dyaEFFcHRuNkV1Y2lPZExEQjRxek16eDlXUjVScGxQei9HS0lHb2Jsdz09In0sImNvbnRlbnRIYXNoIjp7InR5cGUiOiJWZWxvY2l0eUNvbnRlbnRIYXNoMjAyMCIsInZhbHVlIjoiMTkyNzE5ZTk4NDg3MmY1ZWQ5OGIwZjhiMjYwYjJmZjQyZWIxMTZmZDZjODE0OGY3MDVhZTZkYjZiMmE1ZTJkMyJ9LCJjcmVkZW50aWFsU2NoZW1hIjp7ImlkIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9lbXBsb3ltZW50LXBhc3QtdjEuMS5zY2hlbWEuanNvbiIsInR5cGUiOiJKc29uU2NoZW1hVmFsaWRhdG9yMjAxOCJ9LCJjcmVkZW50aWFsU3ViamVjdCI6eyJAY29udGV4dCI6Imh0dHBzOi8vdmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vY29udGV4dHMvZW1wbG95bWVudCIsImxlZ2FsRW1wbG95ZXIiOnsibmFtZSI6Ik9mZmVyLTIgKHB1c2gpIiwiaWRlbnRpZmllciI6ImRpZDppb246RWlBYlA5eHZDWW5VT2lMd3FnYmtWNGF1SF8yNlB2N0JUMnBZWVQzbWFzdnZodyIsInBsYWNlIjp7ImFkZHJlc3NMb2NhbGl0eSI6IkJlbGxldnVlIiwiYWRkcmVzc1JlZ2lvbiI6IlVTLVdBIiwiYWRkcmVzc0NvdW50cnkiOiJVUyJ9fSwicm9sZSI6Ik9mZmVyLTIgKHB1c2gpIiwiZGVzY3JpcHRpb24iOiJCYWNrZW5kIGRldmVsb3BtZW50IHByb2plY3QgbWFuYWdlbWVudCIsInBsYWNlIjp7Im5hbWUiOiJNZWRpYSBMYWIiLCJhZGRyZXNzTG9jYWxpdHkiOiJCdWZmYWxvIiwiYWRkcmVzc1JlZ2lvbiI6IlVTLU5ZIiwiYWRkcmVzc0NvdW50cnkiOiJVUyJ9LCJzdGFydERhdGUiOiIyMDEzLTEwLTAxIiwiZW5kRGF0ZSI6IjIwMTctMDEtMDEiLCJyZWNpcGllbnQiOnsiZ2l2ZW5OYW1lIjoiT2xpdmlhIiwiZmFtaWx5TmFtZSI6IkhhZmV6IiwibWlkZGxlTmFtZSI6Ik1lbGFuaWUiLCJuYW1lUHJlZml4IjoiRHIuIiwibmFtZVN1ZmZpeCI6Ik1ycy4ifSwiYWxpZ25tZW50IjpbeyJ0YXJnZXROYW1lIjoiVGVzdCBOYW1lIiwidGFyZ2V0VXJsIjoiaHR0cHM6Ly9jcmVkZW50aWFsZmluZGVyLm9yZy9jcmVkZW50aWFsLzU3NjkvQmFjaGVsb3Jfb2ZfU2NpZW5jZV9pbl9OdXJzaW5nX1JOX3RvX0JTTiIsInRhcmdldEZyYW1ld29yayI6IlRlc3QgRnJhbWV3b3JrIn1dfX0sIm5iZiI6MTY3NDAzNzAxNiwianRpIjoiZGlkOnZlbG9jaXR5OnYyOjB4OGZjYzY2OGUyNGMyN2IzMDUyNjlkMmZkYjIzZTkwMzFkNGFiM2UwMzoxNzU0MjY5OTA5MTkzMzk6ODA1MyIsImlzcyI6ImRpZDppb246RWlBYlA5eHZDWW5VT2lMd3FnYmtWNGF1SF8yNlB2N0JUMnBZWVQzbWFzdnZodyIsImlhdCI6MTY3NDAzNzAxNn0.U7RJUhp3y08GokENeFfRko7tjGDOCm4BYkN-f0VhBVYaXLMPHEQDUlEb4D8ZVx-nhC-fpE0NAtGOokFvr6eovA',
        output_descriptors: null,
        replacerId: null
    },
    {
        type: ['EmploymentPastV1.1', 'VerifiableCredential'],
        id: 'did:velocity:v2:0x8fcc668e24c27b305269d2fdb23e9031d4ab3e03:175426990919339:3340_olivia.hafez@example.com',
        logo: null,
        vendorCountry: '',
        note: null,
        issuer: {
            id: 'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
            name: 'Microsoft Corporation ion',
            country: null,
            logo: 'https://agsol.com/wp-content/uploads/2018/09/new-microsoft-logo-SIZED-SQUARE.jpg'
        },
        credentialSchema: {
            id: 'https://devlib.velocitynetwork.foundation/schemas/employment-past-v1.1.schema.json',
            type: 'JsonSchemaValidator2018'
        },
        credentialSubject: {
            '@context':
                'https://velocitynetwork.foundation/contexts/employment',
            legalEmployer: {
                name: 'Offer-2 (push)',
                identifier:
                    'did:ion:EiC2tyE5ElqCRcmoaqhV-5qwAKWmUmct1ae7QwJHIFt3Aw',
                place: {
                    addressLocality: 'Bellevue',
                    addressRegion: 'US-WA',
                    addressCountry: 'US'
                }
            },
            role: 'Offer-2.1 (push)',
            description: 'Backend development project management',
            employmentType: 'permanent',
            place: {
                name: 'Media Lab',
                addressLocality: 'Buffalo',
                addressRegion: 'US-NY',
                addressCountry: 'US'
            },
            startDate: '2013-10-01',
            endDate: '2017-01-01',
            recipient: {
                givenName: 'Olivia',
                familyName: 'Hafez',
                middleName: 'Melanie',
                namePrefix: 'Dr.',
                nameSuffix: 'Mrs.'
            },
            alignment: [
                {
                    targetName: 'Test Name',
                    targetUrl:
                        'https://credentialfinder.org/credential/5769/Bachelor_of_Science_in_Nursing_RN_to_BSN',
                    targetFramework: 'Test Framework'
                }
            ]
        },
        offerId: null,
        userId: 'olivia.hafez@example.com',
        issuanceDate: '2023-01-18T10:16:56.997Z',
        isNewWaiting: null,
        withoutAccept: null,
        saveOfferDate: null,
        vendor: null,
        hash: 'dd271cbf7f51e72da2f2d7be8d5fafcb158d825cbbd1f52f1546b845379eb40b',
        status: 'verified',
        revocationDate: null,
        revocationReason: null,
        additionalInfo: null,
        isNewRevoked: null,
        linkCodeCommitment: {
            value: 'EiClwdKxQuYKr0jCx1iRQcNMlMxHR9Bb99jm7+oYZ/l7pA=='
        },
        credentialManifest: {
            iss: 'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
            did: 'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
            exchangeId: '63c7c6fa66f61354359aa23f',
            vendorOriginContext: null,
            jwt: {
                encodedJwt:
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksiLCJraWQiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHcjZXhjaGFuZ2Uta2V5LTEifQ.eyJleGNoYW5nZV9pZCI6IjYzYzdjNmZhNjZmNjEzNTQzNTlhYTIzZiIsIm1ldGFkYXRhIjp7ImNsaWVudF9uYW1lIjoiTWljcm9zb2Z0IENvcnBvcmF0aW9uIGlvbiIsImxvZ29fdXJpIjoiaHR0cHM6Ly9hZ3NvbC5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMTgvMDkvbmV3LW1pY3Jvc29mdC1sb2dvLVNJWkVELVNRVUFSRS5qcGciLCJ0b3NfdXJpIjoiaHR0cHM6Ly93d3cudmVsb2NpdHlleHBlcmllbmNlY2VudGVyLmNvbS90ZXJtcy1hbmQtY29uZGl0aW9ucy12bmYiLCJtYXhfcmV0ZW50aW9uX3BlcmlvZCI6IiIsInByb2dyZXNzX3VyaSI6Imh0dHBzOi8vZGV2YWdlbnQudmVsb2NpdHljYXJlZXJsYWJzLmlvL2FwaS9ob2xkZXIvdjAuNi9vcmcvZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3L2dldC1leGNoYW5nZS1wcm9ncmVzcyIsInN1Ym1pdF9wcmVzZW50YXRpb25fdXJpIjoiaHR0cHM6Ly9kZXZhZ2VudC52ZWxvY2l0eWNhcmVlcmxhYnMuaW8vYXBpL2hvbGRlci92MC42L29yZy9kaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHcvaXNzdWUvc3VibWl0LWlkZW50aWZpY2F0aW9uIiwiY2hlY2tfb2ZmZXJzX3VyaSI6Imh0dHBzOi8vZGV2YWdlbnQudmVsb2NpdHljYXJlZXJsYWJzLmlvL2FwaS9ob2xkZXIvdjAuNi9vcmcvZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3L2lzc3VlL2NyZWRlbnRpYWwtb2ZmZXJzIiwiZmluYWxpemVfb2ZmZXJzX3VyaSI6Imh0dHBzOi8vZGV2YWdlbnQudmVsb2NpdHljYXJlZXJsYWJzLmlvL2FwaS9ob2xkZXIvdjAuNi9vcmcvZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3L2lzc3VlL2ZpbmFsaXplLW9mZmVycyJ9LCJwcmVzZW50YXRpb25fZGVmaW5pdGlvbiI6eyJpZCI6IjYzYzdjNmZhNjZmNjEzNTQzNTlhYTIzZi42MjFjOWJlZWM4ZmEzNGI4ZTcyZDVmYzciLCJwdXJwb3NlIjoiIiwibmFtZSI6IlNoYXJlIHlvdXIgSWQsIEVtYWlsIGFuZCBQaG9uZSBOdW1iZXIgdG8gZmFjaWxpdGF0ZSB0aGUgc2VhcmNoIGZvciB5b3VyIGNhcmVlciBjcmVkZW50aWFscyIsImZvcm1hdCI6eyJqd3RfdnAiOnsiYWxnIjpbInNlY3AyNTZrMSJdfX0sImlucHV0X2Rlc2NyaXB0b3JzIjpbeyJpZCI6IlBhc3Nwb3J0VjEuMCIsIm5hbWUiOiJQYXNzcG9ydCIsInNjaGVtYSI6W3sidXJpIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9wYXNzcG9ydC12MS4wLnNjaGVtYS5qc29uIn1dLCJncm91cCI6WyJBIl19LHsiaWQiOiJFbWFpbFYxLjAiLCJuYW1lIjoiRW1haWwiLCJzY2hlbWEiOlt7InVyaSI6Imh0dHBzOi8vZGV2cmVnaXN0cmFyLnZlbG9jaXR5bmV0d29yay5mb3VuZGF0aW9uL3NjaGVtYXMvZW1haWwtdjEuMC5zY2hlbWEuanNvbiJ9XSwiZ3JvdXAiOlsiQSJdfSx7ImlkIjoiUGhvbmVWMS4wIiwibmFtZSI6IlBob25lIiwic2NoZW1hIjpbeyJ1cmkiOiJodHRwczovL2RldnJlZ2lzdHJhci52ZWxvY2l0eW5ldHdvcmsuZm91bmRhdGlvbi9zY2hlbWFzL3Bob25lLXYxLjAuc2NoZW1hLmpzb24ifV0sImdyb3VwIjpbIkEiXX0seyJpZCI6IkRyaXZlcnNMaWNlbnNlVjEuMCIsIm5hbWUiOiJEcml2ZXIncyBsaWNlbnNlIiwic2NoZW1hIjpbeyJ1cmkiOiJodHRwczovL2RldnJlZ2lzdHJhci52ZWxvY2l0eW5ldHdvcmsuZm91bmRhdGlvbi9zY2hlbWFzL2RyaXZlcnMtbGljZW5zZS12MS4wLnNjaGVtYS5qc29uIn1dLCJncm91cCI6WyJBIl19LHsiaWQiOiJOYXRpb25hbElkQ2FyZFYxLjAiLCJuYW1lIjoiTmF0aW9uYWwgSUQgY2FyZCIsInNjaGVtYSI6W3sidXJpIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9uYXRpb25hbC1pZC1jYXJkLXYxLjAuc2NoZW1hLmpzb24ifV0sImdyb3VwIjpbIkEiXX1dLCJzdWJtaXNzaW9uX3JlcXVpcmVtZW50cyI6W3sicnVsZSI6ImFsbCIsImZyb20iOiJBIiwibWluIjo1fV19LCJvdXRwdXRfZGVzY3JpcHRvcnMiOltdLCJpc3N1ZXIiOnsiaWQiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHcifSwibmJmIjoxNjc0MDM2OTg2LCJpc3MiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHciLCJleHAiOjE2NzQ2NDE3ODYsImlhdCI6MTY3NDAzNjk4Nn0.9npU5Iqp4J8YHgwhI4yOtstGbFy8yAmbcqkBy1GGIbYbseFkPx7SIwDgIEdgjGHsCDDrumMSPAtifh-2O_MSoA'
            }
        },
        vclToken: null,
        default: null,
        jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksiLCJraWQiOiJkaWQ6dmVsb2NpdHk6djI6MHg4ZmNjNjY4ZTI0YzI3YjMwNTI2OWQyZmRiMjNlOTAzMWQ0YWIzZTAzOjE3NTQyNjk5MDkxOTMzOTozMzQwI2tleS0xIn0.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIkVtcGxveW1lbnRQYXN0VjEuMSIsIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdGF0dXMiOnsidHlwZSI6IlZlbG9jaXR5UmV2b2NhdGlvbkxpc3RKYW4yMDIxIiwiaWQiOiJldGhlcmV1bToweEQ4OTBGMkQ2MEI0MjlmOWUyNTdGQzBCYzU4RWYyMjM3Nzc2REQ5MUIvZ2V0UmV2b2tlZFN0YXR1cz9hZGRyZXNzPTB4OGZDYzY2OGUyNGMyN2IzMDUyNjlEMmZEYjIzRTkwMzFkNEFCM2UwMyZsaXN0SWQ9MjM2MzYxNjk2NDgxMzgxJmluZGV4PTIyOCIsInN0YXR1c0xpc3RJbmRleCI6MjI4LCJzdGF0dXNMaXN0Q3JlZGVudGlhbCI6ImV0aGVyZXVtOjB4RDg5MEYyRDYwQjQyOWY5ZTI1N0ZDMEJjNThFZjIyMzc3NzZERDkxQi9nZXRSZXZva2VkU3RhdHVzP2FkZHJlc3M9MHg4ZkNjNjY4ZTI0YzI3YjMwNTI2OUQyZkRiMjNFOTAzMWQ0QUIzZTAzJmxpc3RJZD0yMzYzNjE2OTY0ODEzODEiLCJsaW5rQ29kZUNvbW1pdCI6IkVpQ2x3ZEt4UXVZS3IwakN4MWlSUWNOTWxNeEhSOUJiOTlqbTcrb1laL2w3cEE9PSJ9LCJjb250ZW50SGFzaCI6eyJ0eXBlIjoiVmVsb2NpdHlDb250ZW50SGFzaDIwMjAiLCJ2YWx1ZSI6ImRkMjcxY2JmN2Y1MWU3MmRhMmYyZDdiZThkNWZhZmNiMTU4ZDgyNWNiYmQxZjUyZjE1NDZiODQ1Mzc5ZWI0MGIifSwiY3JlZGVudGlhbFNjaGVtYSI6eyJpZCI6Imh0dHBzOi8vZGV2cmVnaXN0cmFyLnZlbG9jaXR5bmV0d29yay5mb3VuZGF0aW9uL3NjaGVtYXMvZW1wbG95bWVudC1wYXN0LXYxLjEuc2NoZW1hLmpzb24iLCJ0eXBlIjoiSnNvblNjaGVtYVZhbGlkYXRvcjIwMTgifSwiY3JlZGVudGlhbFN1YmplY3QiOnsiQGNvbnRleHQiOiJodHRwczovL3ZlbG9jaXR5bmV0d29yay5mb3VuZGF0aW9uL2NvbnRleHRzL2VtcGxveW1lbnQiLCJsZWdhbEVtcGxveWVyIjp7Im5hbWUiOiJPZmZlci0yIChwdXNoKSIsImlkZW50aWZpZXIiOiJkaWQ6aW9uOkVpQzJ0eUU1RWxxQ1JjbW9hcWhWLTVxd0FLV21VbWN0MWFlN1F3SkhJRnQzQXciLCJwbGFjZSI6eyJhZGRyZXNzTG9jYWxpdHkiOiJCZWxsZXZ1ZSIsImFkZHJlc3NSZWdpb24iOiJVUy1XQSIsImFkZHJlc3NDb3VudHJ5IjoiVVMifX0sInJvbGUiOiJPZmZlci0yLjEgKHB1c2gpIiwiZGVzY3JpcHRpb24iOiJCYWNrZW5kIGRldmVsb3BtZW50IHByb2plY3QgbWFuYWdlbWVudCIsImVtcGxveW1lbnRUeXBlIjoicGVybWFuZW50IiwicGxhY2UiOnsibmFtZSI6Ik1lZGlhIExhYiIsImFkZHJlc3NMb2NhbGl0eSI6IkJ1ZmZhbG8iLCJhZGRyZXNzUmVnaW9uIjoiVVMtTlkiLCJhZGRyZXNzQ291bnRyeSI6IlVTIn0sInN0YXJ0RGF0ZSI6IjIwMTMtMTAtMDEiLCJlbmREYXRlIjoiMjAxNy0wMS0wMSIsInJlY2lwaWVudCI6eyJnaXZlbk5hbWUiOiJPbGl2aWEiLCJmYW1pbHlOYW1lIjoiSGFmZXoiLCJtaWRkbGVOYW1lIjoiTWVsYW5pZSIsIm5hbWVQcmVmaXgiOiJEci4iLCJuYW1lU3VmZml4IjoiTXJzLiJ9LCJhbGlnbm1lbnQiOlt7InRhcmdldE5hbWUiOiJUZXN0IE5hbWUiLCJ0YXJnZXRVcmwiOiJodHRwczovL2NyZWRlbnRpYWxmaW5kZXIub3JnL2NyZWRlbnRpYWwvNTc2OS9CYWNoZWxvcl9vZl9TY2llbmNlX2luX051cnNpbmdfUk5fdG9fQlNOIiwidGFyZ2V0RnJhbWV3b3JrIjoiVGVzdCBGcmFtZXdvcmsifV19fSwibmJmIjoxNjc0MDM3MDE2LCJqdGkiOiJkaWQ6dmVsb2NpdHk6djI6MHg4ZmNjNjY4ZTI0YzI3YjMwNTI2OWQyZmRiMjNlOTAzMWQ0YWIzZTAzOjE3NTQyNjk5MDkxOTMzOTozMzQwIiwiaXNzIjoiZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3IiwiaWF0IjoxNjc0MDM3MDE2fQ.aNBfd0kCGi9bJz0pYlU1PO-345yZzwFBzXncB6AQK2WuFm3iv1hPEuWDMQ1eRo7lSygDFVY9pZLp90BYpEXrzQ',
        output_descriptors: null,
        replacerId: null
    },
    {
        type: ['EducationDegreeRegistrationV1.1', 'VerifiableCredential'],
        id: 'did:velocity:v2:0xa27f300621a7474a68fd5a417d9560d24f9d9f74:56898051534679:7458_olivia.hafez@example.com',
        logo: null,
        vendorCountry: '',
        note: null,
        issuer: {
            id: 'did:ion:EiApMLdMb4NPb8sae9-hXGHP79W1gisApVSE80USPEbtJA',
            name: 'University of Massachusetts Amherst ion',
            country: null,
            logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4f/University_of_Massachusetts_Amherst_seal.svg/1200px-University_of_Massachusetts_Amherst_seal.svg.png'
        },
        credentialSchema: {
            id: 'https://devlib.velocitynetwork.foundation/schemas/education-degree-registration-v1.1.schema.json',
            type: 'JsonSchemaValidator2018'
        },
        credentialSubject: {
            '@context':
                'https://velocitynetwork.foundation/contexts/education-degree',
            institution: {
                name: 'University of Massachusetts Amherst ion',
                identifier:
                    'did:ion:EiApMLdMb4NPb8sae9-hXGHP79W1gisApVSE80USPEbtJA',
                place: {
                    addressLocality: 'Chicago',
                    addressRegion: 'US-IL',
                    addressCountry: 'US'
                }
            },
            school: {
                name: 'School of nursing',
                place: {
                    name: 'Florida Branch',
                    addressLocality: 'Fort Myers',
                    addressRegion: 'US-FL',
                    addressCountry: 'US'
                }
            },
            programName: 'RN to BSN',
            programType: '1 year full time program',
            programMode: 'Online',
            degreeName: 'Bachelor of Science (Registration)',
            degreeMajor: ['Nursing'],
            degreeMinor: ['Nursing'],
            description:
                "Starfield College’s RN to BSN Online Option allows working nurses to advance your degree in as few as 3 semesters.\n If you are a registered nurse with an active RN license looking to earn your BSN, Chamberlain's online RN to BSN option can help prepare you for the next step in your career.\n Our RN to BSN online option allows you to earn your degree while you work.",
            alignment: [
                {
                    targetName: 'Bachelor of Science in Nursing, RN to BSN',
                    targetUrl:
                        'https://credentialfinder.org/credential/5769/Bachelor_of_Science_in_Nursing_RN_to_BSN',
                    targetDescription:
                        'The RN to BSN completion program has been developed to address the specific needs of working registered nurses who return to the university to earn the BSN.',
                    targetFramework: "Credential Engine's Credential Registry"
                }
            ],
            registrationDate: '2011-05-15',
            startDate: '2011-10-02',
            recipient: {
                givenName: 'Olivia',
                familyName: 'Hafez',
                middleName: 'Melanie',
                namePrefix: 'Dr.',
                nameSuffix: 'Mrs.'
            }
        },
        offerId: null,
        userId: 'olivia.hafez@example.com',
        issuanceDate: '2023-01-18T10:19:24.868Z',
        isNewWaiting: null,
        withoutAccept: null,
        saveOfferDate: null,
        vendor: null,
        hash: '67e58c9dff8ec011a11def02e0285a2eb28d865020bc4813bab45c4d0cffc953',
        status: 'verified',
        revocationDate: null,
        revocationReason: null,
        additionalInfo: null,
        isNewRevoked: null,
        linkCodeCommitment: {
            value: 'EiAA9LwDkVbLBdjJ6HXESNGTaYaW3LlhUMsBC+dl4ZH8Ag=='
        },
        credentialManifest: {
            iss: 'did:ion:EiApMLdMb4NPb8sae9-hXGHP79W1gisApVSE80USPEbtJA',
            did: 'did:ion:EiApMLdMb4NPb8sae9-hXGHP79W1gisApVSE80USPEbtJA',
            exchangeId: '63c7c7942cfbe8de18e17c95',
            vendorOriginContext: null,
            jwt: {
                encodedJwt:
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksiLCJraWQiOiJkaWQ6aW9uOkVpQXBNTGRNYjROUGI4c2FlOS1oWEdIUDc5VzFnaXNBcFZTRTgwVVNQRWJ0SkEjZXhjaGFuZ2Uta2V5LTEifQ.eyJleGNoYW5nZV9pZCI6IjYzYzdjNzk0MmNmYmU4ZGUxOGUxN2M5NSIsIm1ldGFkYXRhIjp7ImNsaWVudF9uYW1lIjoiVW5pdmVyc2l0eSBvZiBNYXNzYWNodXNldHRzIEFtaGVyc3QgaW9uIiwibG9nb191cmkiOiJodHRwczovL3VwbG9hZC53aWtpbWVkaWEub3JnL3dpa2lwZWRpYS9lbi90aHVtYi80LzRmL1VuaXZlcnNpdHlfb2ZfTWFzc2FjaHVzZXR0c19BbWhlcnN0X3NlYWwuc3ZnLzEyMDBweC1Vbml2ZXJzaXR5X29mX01hc3NhY2h1c2V0dHNfQW1oZXJzdF9zZWFsLnN2Zy5wbmciLCJ0b3NfdXJpIjoiaHR0cHM6Ly93d3cudmVsb2NpdHlleHBlcmllbmNlY2VudGVyLmNvbS90ZXJtcy1hbmQtY29uZGl0aW9ucy12bmYiLCJtYXhfcmV0ZW50aW9uX3BlcmlvZCI6IjZtIiwicHJvZ3Jlc3NfdXJpIjoiaHR0cHM6Ly9kZXZhZ2VudC52ZWxvY2l0eWNhcmVlcmxhYnMuaW8vYXBpL2hvbGRlci92MC42L29yZy9kaWQ6aW9uOkVpQXBNTGRNYjROUGI4c2FlOS1oWEdIUDc5VzFnaXNBcFZTRTgwVVNQRWJ0SkEvZ2V0LWV4Y2hhbmdlLXByb2dyZXNzIiwic3VibWl0X3ByZXNlbnRhdGlvbl91cmkiOiJodHRwczovL2RldmFnZW50LnZlbG9jaXR5Y2FyZWVybGFicy5pby9hcGkvaG9sZGVyL3YwLjYvb3JnL2RpZDppb246RWlBcE1MZE1iNE5QYjhzYWU5LWhYR0hQNzlXMWdpc0FwVlNFODBVU1BFYnRKQS9pc3N1ZS9zdWJtaXQtaWRlbnRpZmljYXRpb24iLCJjaGVja19vZmZlcnNfdXJpIjoiaHR0cHM6Ly9kZXZhZ2VudC52ZWxvY2l0eWNhcmVlcmxhYnMuaW8vYXBpL2hvbGRlci92MC42L29yZy9kaWQ6aW9uOkVpQXBNTGRNYjROUGI4c2FlOS1oWEdIUDc5VzFnaXNBcFZTRTgwVVNQRWJ0SkEvaXNzdWUvY3JlZGVudGlhbC1vZmZlcnMiLCJmaW5hbGl6ZV9vZmZlcnNfdXJpIjoiaHR0cHM6Ly9kZXZhZ2VudC52ZWxvY2l0eWNhcmVlcmxhYnMuaW8vYXBpL2hvbGRlci92MC42L29yZy9kaWQ6aW9uOkVpQXBNTGRNYjROUGI4c2FlOS1oWEdIUDc5VzFnaXNBcFZTRTgwVVNQRWJ0SkEvaXNzdWUvZmluYWxpemUtb2ZmZXJzIn0sInByZXNlbnRhdGlvbl9kZWZpbml0aW9uIjp7ImlkIjoiNjNjN2M3OTQyY2ZiZThkZTE4ZTE3Yzk1LjYzODRhM2FkMTQ4YjE5OTE2ODdmNjdjOSIsInB1cnBvc2UiOiJDcmVkZW50aWFscyBvZmZlciIsIm5hbWUiOiJTaGFyZSB5b3VyIElkLCBFbWFpbCBhbmQgUGhvbmUgTnVtYmVyIHRvIGZhY2lsaXRhdGUgdGhlIHNlYXJjaCBmb3IgeW91ciBjYXJlZXIgY3JlZGVudGlhbHMiLCJmb3JtYXQiOnsiand0X3ZwIjp7ImFsZyI6WyJzZWNwMjU2azEiXX19LCJpbnB1dF9kZXNjcmlwdG9ycyI6W3siaWQiOiJQYXNzcG9ydFYxLjAiLCJuYW1lIjoiUGFzc3BvcnQiLCJzY2hlbWEiOlt7InVyaSI6Imh0dHBzOi8vZGV2cmVnaXN0cmFyLnZlbG9jaXR5bmV0d29yay5mb3VuZGF0aW9uL3NjaGVtYXMvcGFzc3BvcnQtdjEuMC5zY2hlbWEuanNvbiJ9XSwiZ3JvdXAiOlsiQSJdfSx7ImlkIjoiRW1haWxWMS4wIiwibmFtZSI6IkVtYWlsIiwic2NoZW1hIjpbeyJ1cmkiOiJodHRwczovL2RldnJlZ2lzdHJhci52ZWxvY2l0eW5ldHdvcmsuZm91bmRhdGlvbi9zY2hlbWFzL2VtYWlsLXYxLjAuc2NoZW1hLmpzb24ifV0sImdyb3VwIjpbIkEiXX0seyJpZCI6IlBob25lVjEuMCIsIm5hbWUiOiJQaG9uZSIsInNjaGVtYSI6W3sidXJpIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9waG9uZS12MS4wLnNjaGVtYS5qc29uIn1dLCJncm91cCI6WyJBIl19LHsiaWQiOiJEcml2ZXJzTGljZW5zZVYxLjAiLCJuYW1lIjoiRHJpdmVyJ3MgbGljZW5zZSIsInNjaGVtYSI6W3sidXJpIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9kcml2ZXJzLWxpY2Vuc2UtdjEuMC5zY2hlbWEuanNvbiJ9XSwiZ3JvdXAiOlsiQSJdfSx7ImlkIjoiTmF0aW9uYWxJZENhcmRWMS4wIiwibmFtZSI6Ik5hdGlvbmFsIElEIGNhcmQiLCJzY2hlbWEiOlt7InVyaSI6Imh0dHBzOi8vZGV2cmVnaXN0cmFyLnZlbG9jaXR5bmV0d29yay5mb3VuZGF0aW9uL3NjaGVtYXMvbmF0aW9uYWwtaWQtY2FyZC12MS4wLnNjaGVtYS5qc29uIn1dLCJncm91cCI6WyJBIl19XSwic3VibWlzc2lvbl9yZXF1aXJlbWVudHMiOlt7InJ1bGUiOiJhbGwiLCJmcm9tIjoiQSIsIm1pbiI6NX1dfSwib3V0cHV0X2Rlc2NyaXB0b3JzIjpbXSwiaXNzdWVyIjp7ImlkIjoiZGlkOmlvbjpFaUFwTUxkTWI0TlBiOHNhZTktaFhHSFA3OVcxZ2lzQXBWU0U4MFVTUEVidEpBIn0sIm5iZiI6MTY3NDAzNzE0MCwiaXNzIjoiZGlkOmlvbjpFaUFwTUxkTWI0TlBiOHNhZTktaFhHSFA3OVcxZ2lzQXBWU0U4MFVTUEVidEpBIiwiZXhwIjoxNjc0NjQxOTQwLCJpYXQiOjE2NzQwMzcxNDB9.Hz-E3Q6aid571PrfVxVuqvI3_MRf-6X9xqKv5U8-vISIP_KsrbGEukvCkh7pQABNDms5ZLEWqrHK3WK2bFc-AQ'
            }
        },
        vclToken: null,
        default: null,
        jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksiLCJraWQiOiJkaWQ6dmVsb2NpdHk6djI6MHhhMjdmMzAwNjIxYTc0NzRhNjhmZDVhNDE3ZDk1NjBkMjRmOWQ5Zjc0OjU2ODk4MDUxNTM0Njc5Ojc0NTgja2V5LTEifQ.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIkVkdWNhdGlvbkRlZ3JlZVJlZ2lzdHJhdGlvblYxLjEiLCJWZXJpZmlhYmxlQ3JlZGVudGlhbCJdLCJjcmVkZW50aWFsU3RhdHVzIjp7InR5cGUiOiJWZWxvY2l0eVJldm9jYXRpb25MaXN0SmFuMjAyMSIsImlkIjoiZXRoZXJldW06MHhEODkwRjJENjBCNDI5ZjllMjU3RkMwQmM1OEVmMjIzNzc3NkREOTFCL2dldFJldm9rZWRTdGF0dXM_YWRkcmVzcz0weGEyN0YzMDA2MjFhNzQ3NEE2OGZkNWE0MTdEOTU2MGQyNGY5ZDlGNzQmbGlzdElkPTI1NTY2NDQyMTE3NjM3OCZpbmRleD03ODA3Iiwic3RhdHVzTGlzdEluZGV4Ijo3ODA3LCJzdGF0dXNMaXN0Q3JlZGVudGlhbCI6ImV0aGVyZXVtOjB4RDg5MEYyRDYwQjQyOWY5ZTI1N0ZDMEJjNThFZjIyMzc3NzZERDkxQi9nZXRSZXZva2VkU3RhdHVzP2FkZHJlc3M9MHhhMjdGMzAwNjIxYTc0NzRBNjhmZDVhNDE3RDk1NjBkMjRmOWQ5Rjc0Jmxpc3RJZD0yNTU2NjQ0MjExNzYzNzgiLCJsaW5rQ29kZUNvbW1pdCI6IkVpQUE5THdEa1ZiTEJkako2SFhFU05HVGFZYVczTGxoVU1zQkMrZGw0Wkg4QWc9PSJ9LCJjb250ZW50SGFzaCI6eyJ0eXBlIjoiVmVsb2NpdHlDb250ZW50SGFzaDIwMjAiLCJ2YWx1ZSI6IjY3ZTU4YzlkZmY4ZWMwMTFhMTFkZWYwMmUwMjg1YTJlYjI4ZDg2NTAyMGJjNDgxM2JhYjQ1YzRkMGNmZmM5NTMifSwiY3JlZGVudGlhbFNjaGVtYSI6eyJpZCI6Imh0dHBzOi8vZGV2cmVnaXN0cmFyLnZlbG9jaXR5bmV0d29yay5mb3VuZGF0aW9uL3NjaGVtYXMvZWR1Y2F0aW9uLWRlZ3JlZS1yZWdpc3RyYXRpb24tdjEuMS5zY2hlbWEuanNvbiIsInR5cGUiOiJKc29uU2NoZW1hVmFsaWRhdG9yMjAxOCJ9LCJjcmVkZW50aWFsU3ViamVjdCI6eyJAY29udGV4dCI6Imh0dHBzOi8vdmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vY29udGV4dHMvZWR1Y2F0aW9uLWRlZ3JlZSIsImluc3RpdHV0aW9uIjp7Im5hbWUiOiJVbml2ZXJzaXR5IG9mIE1hc3NhY2h1c2V0dHMgQW1oZXJzdCBpb24iLCJpZGVudGlmaWVyIjoiZGlkOmlvbjpFaUFwTUxkTWI0TlBiOHNhZTktaFhHSFA3OVcxZ2lzQXBWU0U4MFVTUEVidEpBIiwicGxhY2UiOnsiYWRkcmVzc0xvY2FsaXR5IjoiQ2hpY2FnbyIsImFkZHJlc3NSZWdpb24iOiJVUy1JTCIsImFkZHJlc3NDb3VudHJ5IjoiVVMifX0sInNjaG9vbCI6eyJuYW1lIjoiU2Nob29sIG9mIG51cnNpbmciLCJwbGFjZSI6eyJuYW1lIjoiRmxvcmlkYSBCcmFuY2giLCJhZGRyZXNzTG9jYWxpdHkiOiJGb3J0IE15ZXJzIiwiYWRkcmVzc1JlZ2lvbiI6IlVTLUZMIiwiYWRkcmVzc0NvdW50cnkiOiJVUyJ9fSwicHJvZ3JhbU5hbWUiOiJSTiB0byBCU04iLCJwcm9ncmFtVHlwZSI6IjEgeWVhciBmdWxsIHRpbWUgcHJvZ3JhbSIsInByb2dyYW1Nb2RlIjoiT25saW5lIiwiZGVncmVlTmFtZSI6IkJhY2hlbG9yIG9mIFNjaWVuY2UgKFJlZ2lzdHJhdGlvbikiLCJkZWdyZWVNYWpvciI6WyJOdXJzaW5nIl0sImRlZ3JlZU1pbm9yIjpbIk51cnNpbmciXSwiZGVzY3JpcHRpb24iOiJTdGFyZmllbGQgQ29sbGVnZeKAmXMgUk4gdG8gQlNOIE9ubGluZSBPcHRpb24gYWxsb3dzIHdvcmtpbmcgbnVyc2VzIHRvIGFkdmFuY2UgeW91ciBkZWdyZWUgaW4gYXMgZmV3IGFzIDMgc2VtZXN0ZXJzLlxuIElmIHlvdSBhcmUgYSByZWdpc3RlcmVkIG51cnNlIHdpdGggYW4gYWN0aXZlIFJOIGxpY2Vuc2UgbG9va2luZyB0byBlYXJuIHlvdXIgQlNOLCBDaGFtYmVybGFpbidzIG9ubGluZSBSTiB0byBCU04gb3B0aW9uIGNhbiBoZWxwIHByZXBhcmUgeW91IGZvciB0aGUgbmV4dCBzdGVwIGluIHlvdXIgY2FyZWVyLlxuIE91ciBSTiB0byBCU04gb25saW5lIG9wdGlvbiBhbGxvd3MgeW91IHRvIGVhcm4geW91ciBkZWdyZWUgd2hpbGUgeW91IHdvcmsuIiwiYWxpZ25tZW50IjpbeyJ0YXJnZXROYW1lIjoiQmFjaGVsb3Igb2YgU2NpZW5jZSBpbiBOdXJzaW5nLCBSTiB0byBCU04iLCJ0YXJnZXRVcmwiOiJodHRwczovL2NyZWRlbnRpYWxmaW5kZXIub3JnL2NyZWRlbnRpYWwvNTc2OS9CYWNoZWxvcl9vZl9TY2llbmNlX2luX051cnNpbmdfUk5fdG9fQlNOIiwidGFyZ2V0RGVzY3JpcHRpb24iOiJUaGUgUk4gdG8gQlNOIGNvbXBsZXRpb24gcHJvZ3JhbSBoYXMgYmVlbiBkZXZlbG9wZWQgdG8gYWRkcmVzcyB0aGUgc3BlY2lmaWMgbmVlZHMgb2Ygd29ya2luZyByZWdpc3RlcmVkIG51cnNlcyB3aG8gcmV0dXJuIHRvIHRoZSB1bml2ZXJzaXR5IHRvIGVhcm4gdGhlIEJTTi4iLCJ0YXJnZXRGcmFtZXdvcmsiOiJDcmVkZW50aWFsIEVuZ2luZSdzIENyZWRlbnRpYWwgUmVnaXN0cnkifV0sInJlZ2lzdHJhdGlvbkRhdGUiOiIyMDExLTA1LTE1Iiwic3RhcnREYXRlIjoiMjAxMS0xMC0wMiIsInJlY2lwaWVudCI6eyJnaXZlbk5hbWUiOiJPbGl2aWEiLCJmYW1pbHlOYW1lIjoiSGFmZXoiLCJtaWRkbGVOYW1lIjoiTWVsYW5pZSIsIm5hbWVQcmVmaXgiOiJEci4iLCJuYW1lU3VmZml4IjoiTXJzLiJ9fX0sIm5iZiI6MTY3NDAzNzE2NCwianRpIjoiZGlkOnZlbG9jaXR5OnYyOjB4YTI3ZjMwMDYyMWE3NDc0YTY4ZmQ1YTQxN2Q5NTYwZDI0ZjlkOWY3NDo1Njg5ODA1MTUzNDY3OTo3NDU4IiwiaXNzIjoiZGlkOmlvbjpFaUFwTUxkTWI0TlBiOHNhZTktaFhHSFA3OVcxZ2lzQXBWU0U4MFVTUEVidEpBIiwiaWF0IjoxNjc0MDM3MTY0fQ.ZA0XAdSEKO6b6a-i111dEk1i_bI2acPdFKxi-Z6n2yUsqLNPO9x4M7JLu863aIF9cDVJbu96bFswlCXWO75YiQ',
        output_descriptors: null,
        replacerId: null
    },
    {
        type: ['EducationDegreeStudyV1.1', 'VerifiableCredential'],
        id: 'did:velocity:v2:0xa27f300621a7474a68fd5a417d9560d24f9d9f74:56898051534679:2411_olivia.hafez@example.com',
        logo: null,
        vendorCountry: '',
        note: null,
        issuer: {
            id: 'did:ion:EiApMLdMb4NPb8sae9-hXGHP79W1gisApVSE80USPEbtJA',
            name: 'University of Massachusetts Amherst ion',
            country: null,
            logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4f/University_of_Massachusetts_Amherst_seal.svg/1200px-University_of_Massachusetts_Amherst_seal.svg.png'
        },
        credentialSchema: {
            id: 'https://devlib.velocitynetwork.foundation/schemas/education-degree-study-v1.1.schema.json',
            type: 'JsonSchemaValidator2018'
        },
        credentialSubject: {
            '@context':
                'https://velocitynetwork.foundation/contexts/education-degree',
            institution: {
                name: 'University of Massachusetts Amherst ion',
                identifier:
                    'did:ion:EiApMLdMb4NPb8sae9-hXGHP79W1gisApVSE80USPEbtJA',
                place: {
                    addressLocality: 'Chicago',
                    addressRegion: 'US-IL',
                    addressCountry: 'US'
                }
            },
            school: {
                name: 'School of nursing',
                place: {
                    name: 'Florida branch',
                    addressLocality: 'Fort Myers',
                    addressRegion: 'US-FL',
                    addressCountry: 'US'
                }
            },
            programName: 'RN to BSN',
            programType: '1-year full time program',
            programMode: 'Online',
            degreeName: 'Bachelor of Science (Study)',
            degreeMajor: ['Nursing'],
            degreeMinor: ['Nursing'],
            description:
                'Starfield College’s RN to BSN Online Option allows working nurses to advance your degree in as few as 3 semesters.',
            alignment: [
                {
                    targetName: 'Bachelor of Science in Nursing, RN to BSN',
                    targetUrl:
                        'https://credentialfinder.org/credential/5769/Bachelor_of_Science_in_Nursing_RN_to_BSN',
                    targetDescription:
                        'The RN to BSN completion program has been developed to address the specific needs of working registered nurses who return to the university to earn the BSN.',
                    targetFramework: "Credential Engine's Credential Registry"
                }
            ],
            registrationDate: '2021-05-15',
            startDate: '2021-10-02',
            endDate: '2021-03-30',
            recipient: {
                givenName: 'Olivia',
                familyName: 'Hafez',
                middleName: 'Melanie',
                namePrefix: 'Dr.',
                nameSuffix: 'Mrs.'
            }
        },
        offerId: null,
        userId: 'olivia.hafez@example.com',
        issuanceDate: '2023-01-18T10:19:24.871Z',
        isNewWaiting: null,
        withoutAccept: null,
        saveOfferDate: null,
        vendor: null,
        hash: '42c8aa9e65c80b4da9bf4aee80ba00af434b4c221ae66b451f840c8e33f7625f',
        status: 'verified',
        revocationDate: null,
        revocationReason: null,
        additionalInfo: null,
        isNewRevoked: null,
        linkCodeCommitment: {
            value: 'EiDSDVZKJiMnKhokYD/0RGJrYCvvaIm0rgZu+LAfjklt0g=='
        },
        credentialManifest: {
            iss: 'did:ion:EiApMLdMb4NPb8sae9-hXGHP79W1gisApVSE80USPEbtJA',
            did: 'did:ion:EiApMLdMb4NPb8sae9-hXGHP79W1gisApVSE80USPEbtJA',
            exchangeId: '63c7c7942cfbe8de18e17c95',
            vendorOriginContext: null,
            jwt: {
                encodedJwt:
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksiLCJraWQiOiJkaWQ6aW9uOkVpQXBNTGRNYjROUGI4c2FlOS1oWEdIUDc5VzFnaXNBcFZTRTgwVVNQRWJ0SkEjZXhjaGFuZ2Uta2V5LTEifQ.eyJleGNoYW5nZV9pZCI6IjYzYzdjNzk0MmNmYmU4ZGUxOGUxN2M5NSIsIm1ldGFkYXRhIjp7ImNsaWVudF9uYW1lIjoiVW5pdmVyc2l0eSBvZiBNYXNzYWNodXNldHRzIEFtaGVyc3QgaW9uIiwibG9nb191cmkiOiJodHRwczovL3VwbG9hZC53aWtpbWVkaWEub3JnL3dpa2lwZWRpYS9lbi90aHVtYi80LzRmL1VuaXZlcnNpdHlfb2ZfTWFzc2FjaHVzZXR0c19BbWhlcnN0X3NlYWwuc3ZnLzEyMDBweC1Vbml2ZXJzaXR5X29mX01hc3NhY2h1c2V0dHNfQW1oZXJzdF9zZWFsLnN2Zy5wbmciLCJ0b3NfdXJpIjoiaHR0cHM6Ly93d3cudmVsb2NpdHlleHBlcmllbmNlY2VudGVyLmNvbS90ZXJtcy1hbmQtY29uZGl0aW9ucy12bmYiLCJtYXhfcmV0ZW50aW9uX3BlcmlvZCI6IjZtIiwicHJvZ3Jlc3NfdXJpIjoiaHR0cHM6Ly9kZXZhZ2VudC52ZWxvY2l0eWNhcmVlcmxhYnMuaW8vYXBpL2hvbGRlci92MC42L29yZy9kaWQ6aW9uOkVpQXBNTGRNYjROUGI4c2FlOS1oWEdIUDc5VzFnaXNBcFZTRTgwVVNQRWJ0SkEvZ2V0LWV4Y2hhbmdlLXByb2dyZXNzIiwic3VibWl0X3ByZXNlbnRhdGlvbl91cmkiOiJodHRwczovL2RldmFnZW50LnZlbG9jaXR5Y2FyZWVybGFicy5pby9hcGkvaG9sZGVyL3YwLjYvb3JnL2RpZDppb246RWlBcE1MZE1iNE5QYjhzYWU5LWhYR0hQNzlXMWdpc0FwVlNFODBVU1BFYnRKQS9pc3N1ZS9zdWJtaXQtaWRlbnRpZmljYXRpb24iLCJjaGVja19vZmZlcnNfdXJpIjoiaHR0cHM6Ly9kZXZhZ2VudC52ZWxvY2l0eWNhcmVlcmxhYnMuaW8vYXBpL2hvbGRlci92MC42L29yZy9kaWQ6aW9uOkVpQXBNTGRNYjROUGI4c2FlOS1oWEdIUDc5VzFnaXNBcFZTRTgwVVNQRWJ0SkEvaXNzdWUvY3JlZGVudGlhbC1vZmZlcnMiLCJmaW5hbGl6ZV9vZmZlcnNfdXJpIjoiaHR0cHM6Ly9kZXZhZ2VudC52ZWxvY2l0eWNhcmVlcmxhYnMuaW8vYXBpL2hvbGRlci92MC42L29yZy9kaWQ6aW9uOkVpQXBNTGRNYjROUGI4c2FlOS1oWEdIUDc5VzFnaXNBcFZTRTgwVVNQRWJ0SkEvaXNzdWUvZmluYWxpemUtb2ZmZXJzIn0sInByZXNlbnRhdGlvbl9kZWZpbml0aW9uIjp7ImlkIjoiNjNjN2M3OTQyY2ZiZThkZTE4ZTE3Yzk1LjYzODRhM2FkMTQ4YjE5OTE2ODdmNjdjOSIsInB1cnBvc2UiOiJDcmVkZW50aWFscyBvZmZlciIsIm5hbWUiOiJTaGFyZSB5b3VyIElkLCBFbWFpbCBhbmQgUGhvbmUgTnVtYmVyIHRvIGZhY2lsaXRhdGUgdGhlIHNlYXJjaCBmb3IgeW91ciBjYXJlZXIgY3JlZGVudGlhbHMiLCJmb3JtYXQiOnsiand0X3ZwIjp7ImFsZyI6WyJzZWNwMjU2azEiXX19LCJpbnB1dF9kZXNjcmlwdG9ycyI6W3siaWQiOiJQYXNzcG9ydFYxLjAiLCJuYW1lIjoiUGFzc3BvcnQiLCJzY2hlbWEiOlt7InVyaSI6Imh0dHBzOi8vZGV2cmVnaXN0cmFyLnZlbG9jaXR5bmV0d29yay5mb3VuZGF0aW9uL3NjaGVtYXMvcGFzc3BvcnQtdjEuMC5zY2hlbWEuanNvbiJ9XSwiZ3JvdXAiOlsiQSJdfSx7ImlkIjoiRW1haWxWMS4wIiwibmFtZSI6IkVtYWlsIiwic2NoZW1hIjpbeyJ1cmkiOiJodHRwczovL2RldnJlZ2lzdHJhci52ZWxvY2l0eW5ldHdvcmsuZm91bmRhdGlvbi9zY2hlbWFzL2VtYWlsLXYxLjAuc2NoZW1hLmpzb24ifV0sImdyb3VwIjpbIkEiXX0seyJpZCI6IlBob25lVjEuMCIsIm5hbWUiOiJQaG9uZSIsInNjaGVtYSI6W3sidXJpIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9waG9uZS12MS4wLnNjaGVtYS5qc29uIn1dLCJncm91cCI6WyJBIl19LHsiaWQiOiJEcml2ZXJzTGljZW5zZVYxLjAiLCJuYW1lIjoiRHJpdmVyJ3MgbGljZW5zZSIsInNjaGVtYSI6W3sidXJpIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9kcml2ZXJzLWxpY2Vuc2UtdjEuMC5zY2hlbWEuanNvbiJ9XSwiZ3JvdXAiOlsiQSJdfSx7ImlkIjoiTmF0aW9uYWxJZENhcmRWMS4wIiwibmFtZSI6Ik5hdGlvbmFsIElEIGNhcmQiLCJzY2hlbWEiOlt7InVyaSI6Imh0dHBzOi8vZGV2cmVnaXN0cmFyLnZlbG9jaXR5bmV0d29yay5mb3VuZGF0aW9uL3NjaGVtYXMvbmF0aW9uYWwtaWQtY2FyZC12MS4wLnNjaGVtYS5qc29uIn1dLCJncm91cCI6WyJBIl19XSwic3VibWlzc2lvbl9yZXF1aXJlbWVudHMiOlt7InJ1bGUiOiJhbGwiLCJmcm9tIjoiQSIsIm1pbiI6NX1dfSwib3V0cHV0X2Rlc2NyaXB0b3JzIjpbXSwiaXNzdWVyIjp7ImlkIjoiZGlkOmlvbjpFaUFwTUxkTWI0TlBiOHNhZTktaFhHSFA3OVcxZ2lzQXBWU0U4MFVTUEVidEpBIn0sIm5iZiI6MTY3NDAzNzE0MCwiaXNzIjoiZGlkOmlvbjpFaUFwTUxkTWI0TlBiOHNhZTktaFhHSFA3OVcxZ2lzQXBWU0U4MFVTUEVidEpBIiwiZXhwIjoxNjc0NjQxOTQwLCJpYXQiOjE2NzQwMzcxNDB9.Hz-E3Q6aid571PrfVxVuqvI3_MRf-6X9xqKv5U8-vISIP_KsrbGEukvCkh7pQABNDms5ZLEWqrHK3WK2bFc-AQ'
            }
        },
        vclToken: null,
        default: null,
        jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksiLCJraWQiOiJkaWQ6dmVsb2NpdHk6djI6MHhhMjdmMzAwNjIxYTc0NzRhNjhmZDVhNDE3ZDk1NjBkMjRmOWQ5Zjc0OjU2ODk4MDUxNTM0Njc5OjI0MTEja2V5LTEifQ.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIkVkdWNhdGlvbkRlZ3JlZVN0dWR5VjEuMSIsIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdGF0dXMiOnsidHlwZSI6IlZlbG9jaXR5UmV2b2NhdGlvbkxpc3RKYW4yMDIxIiwiaWQiOiJldGhlcmV1bToweEQ4OTBGMkQ2MEI0MjlmOWUyNTdGQzBCYzU4RWYyMjM3Nzc2REQ5MUIvZ2V0UmV2b2tlZFN0YXR1cz9hZGRyZXNzPTB4YTI3RjMwMDYyMWE3NDc0QTY4ZmQ1YTQxN0Q5NTYwZDI0ZjlkOUY3NCZsaXN0SWQ9MjU1NjY0NDIxMTc2Mzc4JmluZGV4PTcwMjYiLCJzdGF0dXNMaXN0SW5kZXgiOjcwMjYsInN0YXR1c0xpc3RDcmVkZW50aWFsIjoiZXRoZXJldW06MHhEODkwRjJENjBCNDI5ZjllMjU3RkMwQmM1OEVmMjIzNzc3NkREOTFCL2dldFJldm9rZWRTdGF0dXM_YWRkcmVzcz0weGEyN0YzMDA2MjFhNzQ3NEE2OGZkNWE0MTdEOTU2MGQyNGY5ZDlGNzQmbGlzdElkPTI1NTY2NDQyMTE3NjM3OCIsImxpbmtDb2RlQ29tbWl0IjoiRWlEU0RWWktKaU1uS2hva1lELzBSR0pyWUN2dmFJbTByZ1p1K0xBZmprbHQwZz09In0sImNvbnRlbnRIYXNoIjp7InR5cGUiOiJWZWxvY2l0eUNvbnRlbnRIYXNoMjAyMCIsInZhbHVlIjoiNDJjOGFhOWU2NWM4MGI0ZGE5YmY0YWVlODBiYTAwYWY0MzRiNGMyMjFhZTY2YjQ1MWY4NDBjOGUzM2Y3NjI1ZiJ9LCJjcmVkZW50aWFsU2NoZW1hIjp7ImlkIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9lZHVjYXRpb24tZGVncmVlLXN0dWR5LXYxLjEuc2NoZW1hLmpzb24iLCJ0eXBlIjoiSnNvblNjaGVtYVZhbGlkYXRvcjIwMTgifSwiY3JlZGVudGlhbFN1YmplY3QiOnsiQGNvbnRleHQiOiJodHRwczovL3ZlbG9jaXR5bmV0d29yay5mb3VuZGF0aW9uL2NvbnRleHRzL2VkdWNhdGlvbi1kZWdyZWUiLCJpbnN0aXR1dGlvbiI6eyJuYW1lIjoiVW5pdmVyc2l0eSBvZiBNYXNzYWNodXNldHRzIEFtaGVyc3QgaW9uIiwiaWRlbnRpZmllciI6ImRpZDppb246RWlBcE1MZE1iNE5QYjhzYWU5LWhYR0hQNzlXMWdpc0FwVlNFODBVU1BFYnRKQSIsInBsYWNlIjp7ImFkZHJlc3NMb2NhbGl0eSI6IkNoaWNhZ28iLCJhZGRyZXNzUmVnaW9uIjoiVVMtSUwiLCJhZGRyZXNzQ291bnRyeSI6IlVTIn19LCJzY2hvb2wiOnsibmFtZSI6IlNjaG9vbCBvZiBudXJzaW5nIiwicGxhY2UiOnsibmFtZSI6IkZsb3JpZGEgYnJhbmNoIiwiYWRkcmVzc0xvY2FsaXR5IjoiRm9ydCBNeWVycyIsImFkZHJlc3NSZWdpb24iOiJVUy1GTCIsImFkZHJlc3NDb3VudHJ5IjoiVVMifX0sInByb2dyYW1OYW1lIjoiUk4gdG8gQlNOIiwicHJvZ3JhbVR5cGUiOiIxLXllYXIgZnVsbCB0aW1lIHByb2dyYW0iLCJwcm9ncmFtTW9kZSI6Ik9ubGluZSIsImRlZ3JlZU5hbWUiOiJCYWNoZWxvciBvZiBTY2llbmNlIChTdHVkeSkiLCJkZWdyZWVNYWpvciI6WyJOdXJzaW5nIl0sImRlZ3JlZU1pbm9yIjpbIk51cnNpbmciXSwiZGVzY3JpcHRpb24iOiJTdGFyZmllbGQgQ29sbGVnZeKAmXMgUk4gdG8gQlNOIE9ubGluZSBPcHRpb24gYWxsb3dzIHdvcmtpbmcgbnVyc2VzIHRvIGFkdmFuY2UgeW91ciBkZWdyZWUgaW4gYXMgZmV3IGFzIDMgc2VtZXN0ZXJzLiIsImFsaWdubWVudCI6W3sidGFyZ2V0TmFtZSI6IkJhY2hlbG9yIG9mIFNjaWVuY2UgaW4gTnVyc2luZywgUk4gdG8gQlNOIiwidGFyZ2V0VXJsIjoiaHR0cHM6Ly9jcmVkZW50aWFsZmluZGVyLm9yZy9jcmVkZW50aWFsLzU3NjkvQmFjaGVsb3Jfb2ZfU2NpZW5jZV9pbl9OdXJzaW5nX1JOX3RvX0JTTiIsInRhcmdldERlc2NyaXB0aW9uIjoiVGhlIFJOIHRvIEJTTiBjb21wbGV0aW9uIHByb2dyYW0gaGFzIGJlZW4gZGV2ZWxvcGVkIHRvIGFkZHJlc3MgdGhlIHNwZWNpZmljIG5lZWRzIG9mIHdvcmtpbmcgcmVnaXN0ZXJlZCBudXJzZXMgd2hvIHJldHVybiB0byB0aGUgdW5pdmVyc2l0eSB0byBlYXJuIHRoZSBCU04uIiwidGFyZ2V0RnJhbWV3b3JrIjoiQ3JlZGVudGlhbCBFbmdpbmUncyBDcmVkZW50aWFsIFJlZ2lzdHJ5In1dLCJyZWdpc3RyYXRpb25EYXRlIjoiMjAyMS0wNS0xNSIsInN0YXJ0RGF0ZSI6IjIwMjEtMTAtMDIiLCJlbmREYXRlIjoiMjAyMS0wMy0zMCIsInJlY2lwaWVudCI6eyJnaXZlbk5hbWUiOiJPbGl2aWEiLCJmYW1pbHlOYW1lIjoiSGFmZXoiLCJtaWRkbGVOYW1lIjoiTWVsYW5pZSIsIm5hbWVQcmVmaXgiOiJEci4iLCJuYW1lU3VmZml4IjoiTXJzLiJ9fX0sIm5iZiI6MTY3NDAzNzE2NCwianRpIjoiZGlkOnZlbG9jaXR5OnYyOjB4YTI3ZjMwMDYyMWE3NDc0YTY4ZmQ1YTQxN2Q5NTYwZDI0ZjlkOWY3NDo1Njg5ODA1MTUzNDY3OToyNDExIiwiaXNzIjoiZGlkOmlvbjpFaUFwTUxkTWI0TlBiOHNhZTktaFhHSFA3OVcxZ2lzQXBWU0U4MFVTUEVidEpBIiwiaWF0IjoxNjc0MDM3MTY0fQ.GAH_bTZ1OmEfzr5A20CTUTeZEXfjqGY_frA49hlK_ZVWVeGq1uH1WKB0ZYR1XOncPiCqqqtcwBtkrjBoLFCNhw',
        output_descriptors: null,
        replacerId: null
    },
    {
        type: ['EmploymentCurrentV1.1', 'VerifiableCredential'],
        id: 'did:velocity:v2:0x8fcc668e24c27b305269d2fdb23e9031d4ab3e03:175426990919339:3377_olivia.hafez@example.com',
        logo: null,
        vendorCountry: '',
        note: null,
        issuer: {
            id: 'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
            name: 'Microsoft Corporation ion',
            country: null,
            logo: 'https://agsol.com/wp-content/uploads/2018/09/new-microsoft-logo-SIZED-SQUARE.jpg'
        },
        credentialSchema: {
            id: 'https://devlib.velocitynetwork.foundation/schemas/employment-current-v1.1.schema.json',
            type: 'JsonSchemaValidator2018'
        },
        credentialSubject: {
            '@context':
                'https://velocitynetwork.foundation/contexts/employment',
            legalEmployer: {
                name: 'Microsoft ion',
                identifier:
                    'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
                place: {
                    addressLocality: 'Bellevue',
                    addressRegion: 'US-WA',
                    addressCountry: 'US'
                }
            },
            role: 'Test offer CurrentV1.1',
            description: 'Test offer CurrentV1.1',
            employmentType: 'permanent',
            place: {
                name: 'Media Lab',
                addressLocality: 'Buffalo',
                addressRegion: 'US-NY',
                addressCountry: 'US'
            },
            startDate: '2013-10-01',
            recipient: {
                givenName: 'Adam',
                familyName: 'Smith'
            }
        },
        offerId: null,
        userId: 'olivia.hafez@example.com',
        issuanceDate: '2023-01-18T10:33:10.954Z',
        isNewWaiting: null,
        withoutAccept: null,
        saveOfferDate: null,
        vendor: null,
        hash: '41ebf0995af1d87977068c5266f1668a5b287ab377e802f562c66253263322ce',
        status: 'verified',
        revocationDate: null,
        revocationReason: null,
        additionalInfo: null,
        isNewRevoked: null,
        linkCodeCommitment: {
            value: 'EiBOzT+1QiQNnCNR+2cF1Yy18Fuo0HfvXzyQ2/fXgavi4Q=='
        },
        credentialManifest: {
            iss: 'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
            did: 'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
            exchangeId: '63c7cabf2cfbe8de18e17c99',
            vendorOriginContext: null,
            jwt: {
                encodedJwt:
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksiLCJraWQiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHcjZXhjaGFuZ2Uta2V5LTEifQ.eyJleGNoYW5nZV9pZCI6IjYzYzdjYWJmMmNmYmU4ZGUxOGUxN2M5OSIsIm1ldGFkYXRhIjp7ImNsaWVudF9uYW1lIjoiTWljcm9zb2Z0IENvcnBvcmF0aW9uIGlvbiIsImxvZ29fdXJpIjoiaHR0cHM6Ly9hZ3NvbC5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMTgvMDkvbmV3LW1pY3Jvc29mdC1sb2dvLVNJWkVELVNRVUFSRS5qcGciLCJ0b3NfdXJpIjoiaHR0cHM6Ly93d3cudmVsb2NpdHlleHBlcmllbmNlY2VudGVyLmNvbS90ZXJtcy1hbmQtY29uZGl0aW9ucy12bmYiLCJtYXhfcmV0ZW50aW9uX3BlcmlvZCI6IiIsInByb2dyZXNzX3VyaSI6Imh0dHBzOi8vZGV2YWdlbnQudmVsb2NpdHljYXJlZXJsYWJzLmlvL2FwaS9ob2xkZXIvdjAuNi9vcmcvZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3L2dldC1leGNoYW5nZS1wcm9ncmVzcyIsInN1Ym1pdF9wcmVzZW50YXRpb25fdXJpIjoiaHR0cHM6Ly9kZXZhZ2VudC52ZWxvY2l0eWNhcmVlcmxhYnMuaW8vYXBpL2hvbGRlci92MC42L29yZy9kaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHcvaXNzdWUvc3VibWl0LWlkZW50aWZpY2F0aW9uIiwiY2hlY2tfb2ZmZXJzX3VyaSI6Imh0dHBzOi8vZGV2YWdlbnQudmVsb2NpdHljYXJlZXJsYWJzLmlvL2FwaS9ob2xkZXIvdjAuNi9vcmcvZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3L2lzc3VlL2NyZWRlbnRpYWwtb2ZmZXJzIiwiZmluYWxpemVfb2ZmZXJzX3VyaSI6Imh0dHBzOi8vZGV2YWdlbnQudmVsb2NpdHljYXJlZXJsYWJzLmlvL2FwaS9ob2xkZXIvdjAuNi9vcmcvZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3L2lzc3VlL2ZpbmFsaXplLW9mZmVycyJ9LCJwcmVzZW50YXRpb25fZGVmaW5pdGlvbiI6eyJpZCI6IjYzYzdjYWJmMmNmYmU4ZGUxOGUxN2M5OS42MjFjOWJlZWM4ZmEzNGI4ZTcyZDVmYzciLCJwdXJwb3NlIjoiIiwibmFtZSI6IlNoYXJlIHlvdXIgSWQsIEVtYWlsIGFuZCBQaG9uZSBOdW1iZXIgdG8gZmFjaWxpdGF0ZSB0aGUgc2VhcmNoIGZvciB5b3VyIGNhcmVlciBjcmVkZW50aWFscyIsImZvcm1hdCI6eyJqd3RfdnAiOnsiYWxnIjpbInNlY3AyNTZrMSJdfX0sImlucHV0X2Rlc2NyaXB0b3JzIjpbeyJpZCI6IlBhc3Nwb3J0VjEuMCIsIm5hbWUiOiJQYXNzcG9ydCIsInNjaGVtYSI6W3sidXJpIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9wYXNzcG9ydC12MS4wLnNjaGVtYS5qc29uIn1dLCJncm91cCI6WyJBIl19LHsiaWQiOiJFbWFpbFYxLjAiLCJuYW1lIjoiRW1haWwiLCJzY2hlbWEiOlt7InVyaSI6Imh0dHBzOi8vZGV2cmVnaXN0cmFyLnZlbG9jaXR5bmV0d29yay5mb3VuZGF0aW9uL3NjaGVtYXMvZW1haWwtdjEuMC5zY2hlbWEuanNvbiJ9XSwiZ3JvdXAiOlsiQSJdfSx7ImlkIjoiUGhvbmVWMS4wIiwibmFtZSI6IlBob25lIiwic2NoZW1hIjpbeyJ1cmkiOiJodHRwczovL2RldnJlZ2lzdHJhci52ZWxvY2l0eW5ldHdvcmsuZm91bmRhdGlvbi9zY2hlbWFzL3Bob25lLXYxLjAuc2NoZW1hLmpzb24ifV0sImdyb3VwIjpbIkEiXX0seyJpZCI6IkRyaXZlcnNMaWNlbnNlVjEuMCIsIm5hbWUiOiJEcml2ZXIncyBsaWNlbnNlIiwic2NoZW1hIjpbeyJ1cmkiOiJodHRwczovL2RldnJlZ2lzdHJhci52ZWxvY2l0eW5ldHdvcmsuZm91bmRhdGlvbi9zY2hlbWFzL2RyaXZlcnMtbGljZW5zZS12MS4wLnNjaGVtYS5qc29uIn1dLCJncm91cCI6WyJBIl19LHsiaWQiOiJOYXRpb25hbElkQ2FyZFYxLjAiLCJuYW1lIjoiTmF0aW9uYWwgSUQgY2FyZCIsInNjaGVtYSI6W3sidXJpIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9uYXRpb25hbC1pZC1jYXJkLXYxLjAuc2NoZW1hLmpzb24ifV0sImdyb3VwIjpbIkEiXX1dLCJzdWJtaXNzaW9uX3JlcXVpcmVtZW50cyI6W3sicnVsZSI6ImFsbCIsImZyb20iOiJBIiwibWluIjo1fV19LCJvdXRwdXRfZGVzY3JpcHRvcnMiOltdLCJpc3N1ZXIiOnsiaWQiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHcifSwibmJmIjoxNjc0MDM3OTUxLCJpc3MiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHciLCJleHAiOjE2NzQ2NDI3NTEsImlhdCI6MTY3NDAzNzk1MX0.uelHUF5RJA8PIB-3CEzdqk_c4aThz_F-VDM92etzcmFOjheT72MeboCT2mPwBfiMl5Pb3nrx3IaDRMgHjU5rNA'
            }
        },
        vclToken: null,
        default: null,
        jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksiLCJraWQiOiJkaWQ6dmVsb2NpdHk6djI6MHg4ZmNjNjY4ZTI0YzI3YjMwNTI2OWQyZmRiMjNlOTAzMWQ0YWIzZTAzOjE3NTQyNjk5MDkxOTMzOTozMzc3I2tleS0xIn0.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIkVtcGxveW1lbnRDdXJyZW50VjEuMSIsIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdGF0dXMiOnsidHlwZSI6IlZlbG9jaXR5UmV2b2NhdGlvbkxpc3RKYW4yMDIxIiwiaWQiOiJldGhlcmV1bToweEQ4OTBGMkQ2MEI0MjlmOWUyNTdGQzBCYzU4RWYyMjM3Nzc2REQ5MUIvZ2V0UmV2b2tlZFN0YXR1cz9hZGRyZXNzPTB4OGZDYzY2OGUyNGMyN2IzMDUyNjlEMmZEYjIzRTkwMzFkNEFCM2UwMyZsaXN0SWQ9MjM2MzYxNjk2NDgxMzgxJmluZGV4PTEyMjQiLCJzdGF0dXNMaXN0SW5kZXgiOjEyMjQsInN0YXR1c0xpc3RDcmVkZW50aWFsIjoiZXRoZXJldW06MHhEODkwRjJENjBCNDI5ZjllMjU3RkMwQmM1OEVmMjIzNzc3NkREOTFCL2dldFJldm9rZWRTdGF0dXM_YWRkcmVzcz0weDhmQ2M2NjhlMjRjMjdiMzA1MjY5RDJmRGIyM0U5MDMxZDRBQjNlMDMmbGlzdElkPTIzNjM2MTY5NjQ4MTM4MSIsImxpbmtDb2RlQ29tbWl0IjoiRWlCT3pUKzFRaVFObkNOUisyY0YxWXkxOEZ1bzBIZnZYenlRMi9mWGdhdmk0UT09In0sImNvbnRlbnRIYXNoIjp7InR5cGUiOiJWZWxvY2l0eUNvbnRlbnRIYXNoMjAyMCIsInZhbHVlIjoiNDFlYmYwOTk1YWYxZDg3OTc3MDY4YzUyNjZmMTY2OGE1YjI4N2FiMzc3ZTgwMmY1NjJjNjYyNTMyNjMzMjJjZSJ9LCJjcmVkZW50aWFsU2NoZW1hIjp7ImlkIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9lbXBsb3ltZW50LWN1cnJlbnQtdjEuMS5zY2hlbWEuanNvbiIsInR5cGUiOiJKc29uU2NoZW1hVmFsaWRhdG9yMjAxOCJ9LCJjcmVkZW50aWFsU3ViamVjdCI6eyJAY29udGV4dCI6Imh0dHBzOi8vdmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vY29udGV4dHMvZW1wbG95bWVudCIsImxlZ2FsRW1wbG95ZXIiOnsibmFtZSI6Ik1pY3Jvc29mdCBpb24iLCJpZGVudGlmaWVyIjoiZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3IiwicGxhY2UiOnsiYWRkcmVzc0xvY2FsaXR5IjoiQmVsbGV2dWUiLCJhZGRyZXNzUmVnaW9uIjoiVVMtV0EiLCJhZGRyZXNzQ291bnRyeSI6IlVTIn19LCJyb2xlIjoiVGVzdCBvZmZlciBDdXJyZW50VjEuMSIsImRlc2NyaXB0aW9uIjoiVGVzdCBvZmZlciBDdXJyZW50VjEuMSIsImVtcGxveW1lbnRUeXBlIjoicGVybWFuZW50IiwicGxhY2UiOnsibmFtZSI6Ik1lZGlhIExhYiIsImFkZHJlc3NMb2NhbGl0eSI6IkJ1ZmZhbG8iLCJhZGRyZXNzUmVnaW9uIjoiVVMtTlkiLCJhZGRyZXNzQ291bnRyeSI6IlVTIn0sInN0YXJ0RGF0ZSI6IjIwMTMtMTAtMDEiLCJyZWNpcGllbnQiOnsiZ2l2ZW5OYW1lIjoiQWRhbSIsImZhbWlseU5hbWUiOiJTbWl0aCJ9fX0sIm5iZiI6MTY3NDAzNzk5MCwianRpIjoiZGlkOnZlbG9jaXR5OnYyOjB4OGZjYzY2OGUyNGMyN2IzMDUyNjlkMmZkYjIzZTkwMzFkNGFiM2UwMzoxNzU0MjY5OTA5MTkzMzk6MzM3NyIsImlzcyI6ImRpZDppb246RWlBYlA5eHZDWW5VT2lMd3FnYmtWNGF1SF8yNlB2N0JUMnBZWVQzbWFzdnZodyIsImlhdCI6MTY3NDAzNzk5MH0.BY6FpK2zB9OuWnnW2PMbNN13_u3QyhxGcXfOfI1IevOHMYH2AR_BK1JdXarR3L_iRV-ehBqdLyIx7-rWMo05cQ',
        output_descriptors: null,
        replacerId: null
    },
    {
        type: ['EmploymentPastV1.1', 'VerifiableCredential'],
        id: 'did:velocity:v2:0x8fcc668e24c27b305269d2fdb23e9031d4ab3e03:175426990919339:13_olivia.hafez@example.com',
        logo: null,
        vendorCountry: '',
        note: null,
        issuer: {
            id: 'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
            name: 'Microsoft Corporation ion',
            country: null,
            logo: 'https://agsol.com/wp-content/uploads/2018/09/new-microsoft-logo-SIZED-SQUARE.jpg'
        },
        credentialSchema: {
            id: 'https://devlib.velocitynetwork.foundation/schemas/employment-past-v1.1.schema.json',
            type: 'JsonSchemaValidator2018'
        },
        credentialSubject: {
            '@context':
                'https://velocitynetwork.foundation/contexts/employment',
            legalEmployer: {
                name: 'Octagon Bank',
                identifier:
                    'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
                place: {
                    addressLocality: 'London',
                    addressRegion: 'GB-ENG',
                    addressCountry: 'GB'
                }
            },
            role: 'Intern Accountant',
            description:
                'Intern accountant in the mortgage department reviewing accounts of small and medium size business applicants',
            employmentType: 'Internship',
            place: {
                name: 'Branch 4644',
                addressLocality: 'Birmingham',
                addressRegion: 'GB-ENG',
                addressCountry: 'GB'
            },
            startDate: '2020-01',
            endDate: '2020-09',
            recipient: {
                givenName: 'Olivia',
                familyName: 'Hafez'
            }
        },
        offerId: null,
        userId: 'olivia.hafez@example.com',
        issuanceDate: '2023-01-18T10:33:10.944Z',
        isNewWaiting: null,
        withoutAccept: null,
        saveOfferDate: null,
        vendor: null,
        hash: 'd01c2a132f9b43688dfd363dd5a4e9d985953b95ced33f856bdc9847b9cc212c',
        status: 'verified',
        revocationDate: null,
        revocationReason: null,
        additionalInfo: null,
        isNewRevoked: null,
        linkCodeCommitment: {
            value: 'EiAGP30qzkBbkA5l0SmBaJ6ODSIHoyN2ZcMZE9emPfz1XQ=='
        },
        credentialManifest: {
            iss: 'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
            did: 'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
            exchangeId: '63c7cabf2cfbe8de18e17c99',
            vendorOriginContext: null,
            jwt: {
                encodedJwt:
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksiLCJraWQiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHcjZXhjaGFuZ2Uta2V5LTEifQ.eyJleGNoYW5nZV9pZCI6IjYzYzdjYWJmMmNmYmU4ZGUxOGUxN2M5OSIsIm1ldGFkYXRhIjp7ImNsaWVudF9uYW1lIjoiTWljcm9zb2Z0IENvcnBvcmF0aW9uIGlvbiIsImxvZ29fdXJpIjoiaHR0cHM6Ly9hZ3NvbC5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMTgvMDkvbmV3LW1pY3Jvc29mdC1sb2dvLVNJWkVELVNRVUFSRS5qcGciLCJ0b3NfdXJpIjoiaHR0cHM6Ly93d3cudmVsb2NpdHlleHBlcmllbmNlY2VudGVyLmNvbS90ZXJtcy1hbmQtY29uZGl0aW9ucy12bmYiLCJtYXhfcmV0ZW50aW9uX3BlcmlvZCI6IiIsInByb2dyZXNzX3VyaSI6Imh0dHBzOi8vZGV2YWdlbnQudmVsb2NpdHljYXJlZXJsYWJzLmlvL2FwaS9ob2xkZXIvdjAuNi9vcmcvZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3L2dldC1leGNoYW5nZS1wcm9ncmVzcyIsInN1Ym1pdF9wcmVzZW50YXRpb25fdXJpIjoiaHR0cHM6Ly9kZXZhZ2VudC52ZWxvY2l0eWNhcmVlcmxhYnMuaW8vYXBpL2hvbGRlci92MC42L29yZy9kaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHcvaXNzdWUvc3VibWl0LWlkZW50aWZpY2F0aW9uIiwiY2hlY2tfb2ZmZXJzX3VyaSI6Imh0dHBzOi8vZGV2YWdlbnQudmVsb2NpdHljYXJlZXJsYWJzLmlvL2FwaS9ob2xkZXIvdjAuNi9vcmcvZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3L2lzc3VlL2NyZWRlbnRpYWwtb2ZmZXJzIiwiZmluYWxpemVfb2ZmZXJzX3VyaSI6Imh0dHBzOi8vZGV2YWdlbnQudmVsb2NpdHljYXJlZXJsYWJzLmlvL2FwaS9ob2xkZXIvdjAuNi9vcmcvZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3L2lzc3VlL2ZpbmFsaXplLW9mZmVycyJ9LCJwcmVzZW50YXRpb25fZGVmaW5pdGlvbiI6eyJpZCI6IjYzYzdjYWJmMmNmYmU4ZGUxOGUxN2M5OS42MjFjOWJlZWM4ZmEzNGI4ZTcyZDVmYzciLCJwdXJwb3NlIjoiIiwibmFtZSI6IlNoYXJlIHlvdXIgSWQsIEVtYWlsIGFuZCBQaG9uZSBOdW1iZXIgdG8gZmFjaWxpdGF0ZSB0aGUgc2VhcmNoIGZvciB5b3VyIGNhcmVlciBjcmVkZW50aWFscyIsImZvcm1hdCI6eyJqd3RfdnAiOnsiYWxnIjpbInNlY3AyNTZrMSJdfX0sImlucHV0X2Rlc2NyaXB0b3JzIjpbeyJpZCI6IlBhc3Nwb3J0VjEuMCIsIm5hbWUiOiJQYXNzcG9ydCIsInNjaGVtYSI6W3sidXJpIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9wYXNzcG9ydC12MS4wLnNjaGVtYS5qc29uIn1dLCJncm91cCI6WyJBIl19LHsiaWQiOiJFbWFpbFYxLjAiLCJuYW1lIjoiRW1haWwiLCJzY2hlbWEiOlt7InVyaSI6Imh0dHBzOi8vZGV2cmVnaXN0cmFyLnZlbG9jaXR5bmV0d29yay5mb3VuZGF0aW9uL3NjaGVtYXMvZW1haWwtdjEuMC5zY2hlbWEuanNvbiJ9XSwiZ3JvdXAiOlsiQSJdfSx7ImlkIjoiUGhvbmVWMS4wIiwibmFtZSI6IlBob25lIiwic2NoZW1hIjpbeyJ1cmkiOiJodHRwczovL2RldnJlZ2lzdHJhci52ZWxvY2l0eW5ldHdvcmsuZm91bmRhdGlvbi9zY2hlbWFzL3Bob25lLXYxLjAuc2NoZW1hLmpzb24ifV0sImdyb3VwIjpbIkEiXX0seyJpZCI6IkRyaXZlcnNMaWNlbnNlVjEuMCIsIm5hbWUiOiJEcml2ZXIncyBsaWNlbnNlIiwic2NoZW1hIjpbeyJ1cmkiOiJodHRwczovL2RldnJlZ2lzdHJhci52ZWxvY2l0eW5ldHdvcmsuZm91bmRhdGlvbi9zY2hlbWFzL2RyaXZlcnMtbGljZW5zZS12MS4wLnNjaGVtYS5qc29uIn1dLCJncm91cCI6WyJBIl19LHsiaWQiOiJOYXRpb25hbElkQ2FyZFYxLjAiLCJuYW1lIjoiTmF0aW9uYWwgSUQgY2FyZCIsInNjaGVtYSI6W3sidXJpIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9uYXRpb25hbC1pZC1jYXJkLXYxLjAuc2NoZW1hLmpzb24ifV0sImdyb3VwIjpbIkEiXX1dLCJzdWJtaXNzaW9uX3JlcXVpcmVtZW50cyI6W3sicnVsZSI6ImFsbCIsImZyb20iOiJBIiwibWluIjo1fV19LCJvdXRwdXRfZGVzY3JpcHRvcnMiOltdLCJpc3N1ZXIiOnsiaWQiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHcifSwibmJmIjoxNjc0MDM3OTUxLCJpc3MiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHciLCJleHAiOjE2NzQ2NDI3NTEsImlhdCI6MTY3NDAzNzk1MX0.uelHUF5RJA8PIB-3CEzdqk_c4aThz_F-VDM92etzcmFOjheT72MeboCT2mPwBfiMl5Pb3nrx3IaDRMgHjU5rNA'
            }
        },
        vclToken: null,
        default: null,
        jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksiLCJraWQiOiJkaWQ6dmVsb2NpdHk6djI6MHg4ZmNjNjY4ZTI0YzI3YjMwNTI2OWQyZmRiMjNlOTAzMWQ0YWIzZTAzOjE3NTQyNjk5MDkxOTMzOToxMyNrZXktMSJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIkVtcGxveW1lbnRQYXN0VjEuMSIsIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdGF0dXMiOnsidHlwZSI6IlZlbG9jaXR5UmV2b2NhdGlvbkxpc3RKYW4yMDIxIiwiaWQiOiJldGhlcmV1bToweEQ4OTBGMkQ2MEI0MjlmOWUyNTdGQzBCYzU4RWYyMjM3Nzc2REQ5MUIvZ2V0UmV2b2tlZFN0YXR1cz9hZGRyZXNzPTB4OGZDYzY2OGUyNGMyN2IzMDUyNjlEMmZEYjIzRTkwMzFkNEFCM2UwMyZsaXN0SWQ9MjM2MzYxNjk2NDgxMzgxJmluZGV4PTE0OTkiLCJzdGF0dXNMaXN0SW5kZXgiOjE0OTksInN0YXR1c0xpc3RDcmVkZW50aWFsIjoiZXRoZXJldW06MHhEODkwRjJENjBCNDI5ZjllMjU3RkMwQmM1OEVmMjIzNzc3NkREOTFCL2dldFJldm9rZWRTdGF0dXM_YWRkcmVzcz0weDhmQ2M2NjhlMjRjMjdiMzA1MjY5RDJmRGIyM0U5MDMxZDRBQjNlMDMmbGlzdElkPTIzNjM2MTY5NjQ4MTM4MSIsImxpbmtDb2RlQ29tbWl0IjoiRWlBR1AzMHF6a0Jia0E1bDBTbUJhSjZPRFNJSG95TjJaY01aRTllbVBmejFYUT09In0sImNvbnRlbnRIYXNoIjp7InR5cGUiOiJWZWxvY2l0eUNvbnRlbnRIYXNoMjAyMCIsInZhbHVlIjoiZDAxYzJhMTMyZjliNDM2ODhkZmQzNjNkZDVhNGU5ZDk4NTk1M2I5NWNlZDMzZjg1NmJkYzk4NDdiOWNjMjEyYyJ9LCJjcmVkZW50aWFsU2NoZW1hIjp7ImlkIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9lbXBsb3ltZW50LXBhc3QtdjEuMS5zY2hlbWEuanNvbiIsInR5cGUiOiJKc29uU2NoZW1hVmFsaWRhdG9yMjAxOCJ9LCJjcmVkZW50aWFsU3ViamVjdCI6eyJAY29udGV4dCI6Imh0dHBzOi8vdmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vY29udGV4dHMvZW1wbG95bWVudCIsImxlZ2FsRW1wbG95ZXIiOnsibmFtZSI6Ik9jdGFnb24gQmFuayIsImlkZW50aWZpZXIiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHciLCJwbGFjZSI6eyJhZGRyZXNzTG9jYWxpdHkiOiJMb25kb24iLCJhZGRyZXNzUmVnaW9uIjoiR0ItRU5HIiwiYWRkcmVzc0NvdW50cnkiOiJHQiJ9fSwicm9sZSI6IkludGVybiBBY2NvdW50YW50IiwiZGVzY3JpcHRpb24iOiJJbnRlcm4gYWNjb3VudGFudCBpbiB0aGUgbW9ydGdhZ2UgZGVwYXJ0bWVudCByZXZpZXdpbmcgYWNjb3VudHMgb2Ygc21hbGwgYW5kIG1lZGl1bSBzaXplIGJ1c2luZXNzIGFwcGxpY2FudHMiLCJlbXBsb3ltZW50VHlwZSI6IkludGVybnNoaXAiLCJwbGFjZSI6eyJuYW1lIjoiQnJhbmNoIDQ2NDQiLCJhZGRyZXNzTG9jYWxpdHkiOiJCaXJtaW5naGFtIiwiYWRkcmVzc1JlZ2lvbiI6IkdCLUVORyIsImFkZHJlc3NDb3VudHJ5IjoiR0IifSwic3RhcnREYXRlIjoiMjAyMC0wMSIsImVuZERhdGUiOiIyMDIwLTA5IiwicmVjaXBpZW50Ijp7ImdpdmVuTmFtZSI6Ik9saXZpYSIsImZhbWlseU5hbWUiOiJIYWZleiJ9fX0sIm5iZiI6MTY3NDAzNzk5MCwianRpIjoiZGlkOnZlbG9jaXR5OnYyOjB4OGZjYzY2OGUyNGMyN2IzMDUyNjlkMmZkYjIzZTkwMzFkNGFiM2UwMzoxNzU0MjY5OTA5MTkzMzk6MTMiLCJpc3MiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHciLCJpYXQiOjE2NzQwMzc5OTB9.hQb0gVyyexTil1mGCHIRQf2jnWyb_bXBANGFUnMxKm11DugrZczt6DEXgQGXBGGwBOIbC6nu88Cb8LRGqhKI1g',
        output_descriptors: null,
        replacerId: null
    },
    {
        type: ['EmploymentPastV1.1', 'VerifiableCredential'],
        id: 'did:velocity:v2:0x8fcc668e24c27b305269d2fdb23e9031d4ab3e03:175426990919339:5062_olivia.hafez@example.com',
        logo: null,
        vendorCountry: '',
        note: null,
        issuer: {
            id: 'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
            name: 'Microsoft Corporation ion',
            country: null,
            logo: 'https://agsol.com/wp-content/uploads/2018/09/new-microsoft-logo-SIZED-SQUARE.jpg'
        },
        credentialSchema: {
            id: 'https://devlib.velocitynetwork.foundation/schemas/employment-past-v1.1.schema.json',
            type: 'JsonSchemaValidator2018'
        },
        credentialSubject: {
            '@context':
                'https://velocitynetwork.foundation/contexts/employment',
            legalEmployer: {
                name: 'Microsoft Corporation ion',
                identifier:
                    'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
                place: {
                    addressLocality: 'Bellevue',
                    addressRegion: 'US-WA',
                    addressCountry: 'US'
                }
            },
            role: 'Project Manager (past)',
            description: 'Backend development project management',
            employmentType: 'permanent',
            place: {
                name: 'Media Lab',
                addressLocality: 'Buffalo',
                addressRegion: 'US-NY',
                addressCountry: 'US'
            },
            startDate: '2013-10-01',
            endDate: '2017-01-01',
            recipient: {
                givenName: 'Olivia',
                familyName: 'Hafez',
                middleName: 'Melanie',
                namePrefix: 'Dr.',
                nameSuffix: 'Mrs.'
            },
            alignment: [
                {
                    targetName: 'Test Name',
                    targetUrl:
                        'https://credentialfinder.org/credential/5769/Bachelor_of_Science_in_Nursing_RN_to_BSN',
                    targetFramework: 'Test Framework'
                }
            ]
        },
        offerId: null,
        userId: 'olivia.hafez@example.com',
        issuanceDate: '2023-01-18T10:33:10.955Z',
        isNewWaiting: null,
        withoutAccept: null,
        saveOfferDate: null,
        vendor: null,
        hash: '85646fcb7d95bde7e90900beb423a26704828684f970606e1233ad7dd90b31cb',
        status: 'verified',
        revocationDate: null,
        revocationReason: null,
        additionalInfo: null,
        isNewRevoked: null,
        linkCodeCommitment: {
            value: 'EiAePOJBwEJ132EvlRIszSbRyiNFUAsqAK7eU1BNS0gqhg=='
        },
        credentialManifest: {
            iss: 'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
            did: 'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
            exchangeId: '63c7cabf2cfbe8de18e17c99',
            vendorOriginContext: null,
            jwt: {
                encodedJwt:
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksiLCJraWQiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHcjZXhjaGFuZ2Uta2V5LTEifQ.eyJleGNoYW5nZV9pZCI6IjYzYzdjYWJmMmNmYmU4ZGUxOGUxN2M5OSIsIm1ldGFkYXRhIjp7ImNsaWVudF9uYW1lIjoiTWljcm9zb2Z0IENvcnBvcmF0aW9uIGlvbiIsImxvZ29fdXJpIjoiaHR0cHM6Ly9hZ3NvbC5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMTgvMDkvbmV3LW1pY3Jvc29mdC1sb2dvLVNJWkVELVNRVUFSRS5qcGciLCJ0b3NfdXJpIjoiaHR0cHM6Ly93d3cudmVsb2NpdHlleHBlcmllbmNlY2VudGVyLmNvbS90ZXJtcy1hbmQtY29uZGl0aW9ucy12bmYiLCJtYXhfcmV0ZW50aW9uX3BlcmlvZCI6IiIsInByb2dyZXNzX3VyaSI6Imh0dHBzOi8vZGV2YWdlbnQudmVsb2NpdHljYXJlZXJsYWJzLmlvL2FwaS9ob2xkZXIvdjAuNi9vcmcvZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3L2dldC1leGNoYW5nZS1wcm9ncmVzcyIsInN1Ym1pdF9wcmVzZW50YXRpb25fdXJpIjoiaHR0cHM6Ly9kZXZhZ2VudC52ZWxvY2l0eWNhcmVlcmxhYnMuaW8vYXBpL2hvbGRlci92MC42L29yZy9kaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHcvaXNzdWUvc3VibWl0LWlkZW50aWZpY2F0aW9uIiwiY2hlY2tfb2ZmZXJzX3VyaSI6Imh0dHBzOi8vZGV2YWdlbnQudmVsb2NpdHljYXJlZXJsYWJzLmlvL2FwaS9ob2xkZXIvdjAuNi9vcmcvZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3L2lzc3VlL2NyZWRlbnRpYWwtb2ZmZXJzIiwiZmluYWxpemVfb2ZmZXJzX3VyaSI6Imh0dHBzOi8vZGV2YWdlbnQudmVsb2NpdHljYXJlZXJsYWJzLmlvL2FwaS9ob2xkZXIvdjAuNi9vcmcvZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3L2lzc3VlL2ZpbmFsaXplLW9mZmVycyJ9LCJwcmVzZW50YXRpb25fZGVmaW5pdGlvbiI6eyJpZCI6IjYzYzdjYWJmMmNmYmU4ZGUxOGUxN2M5OS42MjFjOWJlZWM4ZmEzNGI4ZTcyZDVmYzciLCJwdXJwb3NlIjoiIiwibmFtZSI6IlNoYXJlIHlvdXIgSWQsIEVtYWlsIGFuZCBQaG9uZSBOdW1iZXIgdG8gZmFjaWxpdGF0ZSB0aGUgc2VhcmNoIGZvciB5b3VyIGNhcmVlciBjcmVkZW50aWFscyIsImZvcm1hdCI6eyJqd3RfdnAiOnsiYWxnIjpbInNlY3AyNTZrMSJdfX0sImlucHV0X2Rlc2NyaXB0b3JzIjpbeyJpZCI6IlBhc3Nwb3J0VjEuMCIsIm5hbWUiOiJQYXNzcG9ydCIsInNjaGVtYSI6W3sidXJpIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9wYXNzcG9ydC12MS4wLnNjaGVtYS5qc29uIn1dLCJncm91cCI6WyJBIl19LHsiaWQiOiJFbWFpbFYxLjAiLCJuYW1lIjoiRW1haWwiLCJzY2hlbWEiOlt7InVyaSI6Imh0dHBzOi8vZGV2cmVnaXN0cmFyLnZlbG9jaXR5bmV0d29yay5mb3VuZGF0aW9uL3NjaGVtYXMvZW1haWwtdjEuMC5zY2hlbWEuanNvbiJ9XSwiZ3JvdXAiOlsiQSJdfSx7ImlkIjoiUGhvbmVWMS4wIiwibmFtZSI6IlBob25lIiwic2NoZW1hIjpbeyJ1cmkiOiJodHRwczovL2RldnJlZ2lzdHJhci52ZWxvY2l0eW5ldHdvcmsuZm91bmRhdGlvbi9zY2hlbWFzL3Bob25lLXYxLjAuc2NoZW1hLmpzb24ifV0sImdyb3VwIjpbIkEiXX0seyJpZCI6IkRyaXZlcnNMaWNlbnNlVjEuMCIsIm5hbWUiOiJEcml2ZXIncyBsaWNlbnNlIiwic2NoZW1hIjpbeyJ1cmkiOiJodHRwczovL2RldnJlZ2lzdHJhci52ZWxvY2l0eW5ldHdvcmsuZm91bmRhdGlvbi9zY2hlbWFzL2RyaXZlcnMtbGljZW5zZS12MS4wLnNjaGVtYS5qc29uIn1dLCJncm91cCI6WyJBIl19LHsiaWQiOiJOYXRpb25hbElkQ2FyZFYxLjAiLCJuYW1lIjoiTmF0aW9uYWwgSUQgY2FyZCIsInNjaGVtYSI6W3sidXJpIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9uYXRpb25hbC1pZC1jYXJkLXYxLjAuc2NoZW1hLmpzb24ifV0sImdyb3VwIjpbIkEiXX1dLCJzdWJtaXNzaW9uX3JlcXVpcmVtZW50cyI6W3sicnVsZSI6ImFsbCIsImZyb20iOiJBIiwibWluIjo1fV19LCJvdXRwdXRfZGVzY3JpcHRvcnMiOltdLCJpc3N1ZXIiOnsiaWQiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHcifSwibmJmIjoxNjc0MDM3OTUxLCJpc3MiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHciLCJleHAiOjE2NzQ2NDI3NTEsImlhdCI6MTY3NDAzNzk1MX0.uelHUF5RJA8PIB-3CEzdqk_c4aThz_F-VDM92etzcmFOjheT72MeboCT2mPwBfiMl5Pb3nrx3IaDRMgHjU5rNA'
            }
        },
        vclToken: null,
        default: null,
        jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksiLCJraWQiOiJkaWQ6dmVsb2NpdHk6djI6MHg4ZmNjNjY4ZTI0YzI3YjMwNTI2OWQyZmRiMjNlOTAzMWQ0YWIzZTAzOjE3NTQyNjk5MDkxOTMzOTo1MDYyI2tleS0xIn0.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIkVtcGxveW1lbnRQYXN0VjEuMSIsIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdGF0dXMiOnsidHlwZSI6IlZlbG9jaXR5UmV2b2NhdGlvbkxpc3RKYW4yMDIxIiwiaWQiOiJldGhlcmV1bToweEQ4OTBGMkQ2MEI0MjlmOWUyNTdGQzBCYzU4RWYyMjM3Nzc2REQ5MUIvZ2V0UmV2b2tlZFN0YXR1cz9hZGRyZXNzPTB4OGZDYzY2OGUyNGMyN2IzMDUyNjlEMmZEYjIzRTkwMzFkNEFCM2UwMyZsaXN0SWQ9MjM2MzYxNjk2NDgxMzgxJmluZGV4PTQyMzMiLCJzdGF0dXNMaXN0SW5kZXgiOjQyMzMsInN0YXR1c0xpc3RDcmVkZW50aWFsIjoiZXRoZXJldW06MHhEODkwRjJENjBCNDI5ZjllMjU3RkMwQmM1OEVmMjIzNzc3NkREOTFCL2dldFJldm9rZWRTdGF0dXM_YWRkcmVzcz0weDhmQ2M2NjhlMjRjMjdiMzA1MjY5RDJmRGIyM0U5MDMxZDRBQjNlMDMmbGlzdElkPTIzNjM2MTY5NjQ4MTM4MSIsImxpbmtDb2RlQ29tbWl0IjoiRWlBZVBPSkJ3RUoxMzJFdmxSSXN6U2JSeWlORlVBc3FBSzdlVTFCTlMwZ3FoZz09In0sImNvbnRlbnRIYXNoIjp7InR5cGUiOiJWZWxvY2l0eUNvbnRlbnRIYXNoMjAyMCIsInZhbHVlIjoiODU2NDZmY2I3ZDk1YmRlN2U5MDkwMGJlYjQyM2EyNjcwNDgyODY4NGY5NzA2MDZlMTIzM2FkN2RkOTBiMzFjYiJ9LCJjcmVkZW50aWFsU2NoZW1hIjp7ImlkIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9lbXBsb3ltZW50LXBhc3QtdjEuMS5zY2hlbWEuanNvbiIsInR5cGUiOiJKc29uU2NoZW1hVmFsaWRhdG9yMjAxOCJ9LCJjcmVkZW50aWFsU3ViamVjdCI6eyJAY29udGV4dCI6Imh0dHBzOi8vdmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vY29udGV4dHMvZW1wbG95bWVudCIsImxlZ2FsRW1wbG95ZXIiOnsibmFtZSI6Ik1pY3Jvc29mdCBDb3Jwb3JhdGlvbiBpb24iLCJpZGVudGlmaWVyIjoiZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3IiwicGxhY2UiOnsiYWRkcmVzc0xvY2FsaXR5IjoiQmVsbGV2dWUiLCJhZGRyZXNzUmVnaW9uIjoiVVMtV0EiLCJhZGRyZXNzQ291bnRyeSI6IlVTIn19LCJyb2xlIjoiUHJvamVjdCBNYW5hZ2VyIChwYXN0KSIsImRlc2NyaXB0aW9uIjoiQmFja2VuZCBkZXZlbG9wbWVudCBwcm9qZWN0IG1hbmFnZW1lbnQiLCJlbXBsb3ltZW50VHlwZSI6InBlcm1hbmVudCIsInBsYWNlIjp7Im5hbWUiOiJNZWRpYSBMYWIiLCJhZGRyZXNzTG9jYWxpdHkiOiJCdWZmYWxvIiwiYWRkcmVzc1JlZ2lvbiI6IlVTLU5ZIiwiYWRkcmVzc0NvdW50cnkiOiJVUyJ9LCJzdGFydERhdGUiOiIyMDEzLTEwLTAxIiwiZW5kRGF0ZSI6IjIwMTctMDEtMDEiLCJyZWNpcGllbnQiOnsiZ2l2ZW5OYW1lIjoiT2xpdmlhIiwiZmFtaWx5TmFtZSI6IkhhZmV6IiwibWlkZGxlTmFtZSI6Ik1lbGFuaWUiLCJuYW1lUHJlZml4IjoiRHIuIiwibmFtZVN1ZmZpeCI6Ik1ycy4ifSwiYWxpZ25tZW50IjpbeyJ0YXJnZXROYW1lIjoiVGVzdCBOYW1lIiwidGFyZ2V0VXJsIjoiaHR0cHM6Ly9jcmVkZW50aWFsZmluZGVyLm9yZy9jcmVkZW50aWFsLzU3NjkvQmFjaGVsb3Jfb2ZfU2NpZW5jZV9pbl9OdXJzaW5nX1JOX3RvX0JTTiIsInRhcmdldEZyYW1ld29yayI6IlRlc3QgRnJhbWV3b3JrIn1dfX0sIm5iZiI6MTY3NDAzNzk5MCwianRpIjoiZGlkOnZlbG9jaXR5OnYyOjB4OGZjYzY2OGUyNGMyN2IzMDUyNjlkMmZkYjIzZTkwMzFkNGFiM2UwMzoxNzU0MjY5OTA5MTkzMzk6NTA2MiIsImlzcyI6ImRpZDppb246RWlBYlA5eHZDWW5VT2lMd3FnYmtWNGF1SF8yNlB2N0JUMnBZWVQzbWFzdnZodyIsImlhdCI6MTY3NDAzNzk5MH0.fdgpUJK7AfLm1ro_61Ba_jh6DVbtKFkNdXKzoMiNfB3jpavLkQaggyq7WxN9ZxD-xNisB8EYFNBt_1paCMEpZA',
        output_descriptors: null,
        replacerId: null
    },
    {
        type: ['AssessmentV1.1', 'VerifiableCredential'],
        id: 'did:velocity:v2:0x8fcc668e24c27b305269d2fdb23e9031d4ab3e03:175426990919339:7950_olivia.hafez@example.com',
        logo: null,
        vendorCountry: '',
        note: null,
        issuer: {
            id: 'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
            name: 'Microsoft Corporation ion',
            country: null,
            logo: 'https://agsol.com/wp-content/uploads/2018/09/new-microsoft-logo-SIZED-SQUARE.jpg'
        },
        credentialSchema: {
            id: 'https://devlib.velocitynetwork.foundation/schemas/assessment-v1.1.schema.json',
            type: 'JsonSchemaValidator2018'
        },
        credentialSubject: {
            '@context':
                'https://velocitynetwork.foundation/contexts/assessment',
            authority: {
                name: 'Microsoft Corporation ion',
                identifier:
                    'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
                place: {
                    addressLocality: 'Los Angeles',
                    addressRegion: 'US-CA',
                    addressCountry: 'US'
                }
            },
            name: 'Leadership',
            assesses: 'Leadership capabilities',
            description:
                "Korn Ferry's leadership assessment takes a contemporary, whole-person view of behavior. It values indidivdual qualities that impact and govern leaders' job performance in areasof Competencies, Exepriences, Traits, and Drivers. ",
            score: {
                scoreMethod: {
                    scoreMethodType: 'NormReferenced',
                    scoreMethodDescription:
                        'Korn Ferry global norm 2018. Norm size: 25,000.  score range 1-10.'
                },
                scoreValue: '8.9',
                result: 'Normal color vision',
                passFail: 'Test'
            },
            assessmentLevel: 'Test Level',
            assessmentDate: '2018-01-09',
            assessmentMethod: 'Written',
            assessmentDimensions: [
                {
                    name: 'Credibility',
                    description:
                        "The degree of consistency between a person's words and actions.",
                    assesses: 'Test assesses 1',
                    score: {
                        scoreMethod: {
                            scoreMethodType: 'NormReferenced',
                            scoreMethodDescription:
                                'Korn Ferry global norm 2018. Norm size: 25,000.  score range 1-10.'
                        },
                        scoreValue: '7.2',
                        result: 'Test result 1',
                        passFail: 'Pass'
                    },
                    assessmentDate: '2011-09-01',
                    assessmentMethod: 'Written'
                },
                {
                    name: 'Assertiveness',
                    description: 'The assertiveness of a person',
                    assesses: 'Test assesses 2',
                    score: {
                        scoreMethod: {
                            scoreMethodType: 'NormReferenced',
                            scoreMethodDescription:
                                'Korn Ferry global norm 2018. Norm size: 25,000.  score range 1-10.'
                        },
                        scoreValue: '9.1',
                        result: 'Test result 2',
                        passFail: 'Fail'
                    },
                    assessmentDate: '2022-08-31',
                    assessmentMethod: 'Read'
                },
                {
                    name: 'Dimension 3',
                    description: 'The description for dimenstion 3',
                    assesses: 'Test assesses 3',
                    score: {
                        scoreMethod: {
                            scoreMethodType: 'NormReferenced 3 ',
                            scoreMethodDescription: 'Korn Ferry global norm 3'
                        },
                        scoreValue: '3',
                        result: 'Test result 3',
                        passFail: 'Fail'
                    },
                    assessmentDate: '2022-12-27',
                    assessmentMethod: 'Speak'
                }
            ],
            recipient: {
                givenName: 'Olivia',
                familyName: 'Hafez',
                middleName: 'Melanie',
                namePrefix: 'Dr.',
                nameSuffix: 'Mrs.'
            },
            alignment: [
                {
                    targetName: 'Live Online Skin and Wound Management Course',
                    targetUrl:
                        'https://credentialfinder.org/credential/20923/Live_Online_Skin_and_Wound_Management_Course',
                    targetDescription:
                        'This course offers an evidence-based approach to wound management to help clinicians stay current with the standards of care and legally defensible at bedside.',
                    targetFramework: 'Credential Engine'
                }
            ]
        },
        offerId: null,
        userId: 'olivia.hafez@example.com',
        issuanceDate: '2023-01-18T10:33:10.942Z',
        isNewWaiting: null,
        withoutAccept: null,
        saveOfferDate: null,
        vendor: null,
        hash: '741b12e2398c13059d4d9f24924aa0d1d155f9851cd95ef01b4256636d67cdb2',
        status: 'verified',
        revocationDate: null,
        revocationReason: null,
        additionalInfo: null,
        isNewRevoked: null,
        linkCodeCommitment: {
            value: 'EiCFt2pBwCtw2r3zNUJyDt5N1AGlAkt0b256CjdanA4scA=='
        },
        credentialManifest: {
            iss: 'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
            did: 'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
            exchangeId: '63c7cabf2cfbe8de18e17c99',
            vendorOriginContext: null,
            jwt: {
                encodedJwt:
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksiLCJraWQiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHcjZXhjaGFuZ2Uta2V5LTEifQ.eyJleGNoYW5nZV9pZCI6IjYzYzdjYWJmMmNmYmU4ZGUxOGUxN2M5OSIsIm1ldGFkYXRhIjp7ImNsaWVudF9uYW1lIjoiTWljcm9zb2Z0IENvcnBvcmF0aW9uIGlvbiIsImxvZ29fdXJpIjoiaHR0cHM6Ly9hZ3NvbC5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMTgvMDkvbmV3LW1pY3Jvc29mdC1sb2dvLVNJWkVELVNRVUFSRS5qcGciLCJ0b3NfdXJpIjoiaHR0cHM6Ly93d3cudmVsb2NpdHlleHBlcmllbmNlY2VudGVyLmNvbS90ZXJtcy1hbmQtY29uZGl0aW9ucy12bmYiLCJtYXhfcmV0ZW50aW9uX3BlcmlvZCI6IiIsInByb2dyZXNzX3VyaSI6Imh0dHBzOi8vZGV2YWdlbnQudmVsb2NpdHljYXJlZXJsYWJzLmlvL2FwaS9ob2xkZXIvdjAuNi9vcmcvZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3L2dldC1leGNoYW5nZS1wcm9ncmVzcyIsInN1Ym1pdF9wcmVzZW50YXRpb25fdXJpIjoiaHR0cHM6Ly9kZXZhZ2VudC52ZWxvY2l0eWNhcmVlcmxhYnMuaW8vYXBpL2hvbGRlci92MC42L29yZy9kaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHcvaXNzdWUvc3VibWl0LWlkZW50aWZpY2F0aW9uIiwiY2hlY2tfb2ZmZXJzX3VyaSI6Imh0dHBzOi8vZGV2YWdlbnQudmVsb2NpdHljYXJlZXJsYWJzLmlvL2FwaS9ob2xkZXIvdjAuNi9vcmcvZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3L2lzc3VlL2NyZWRlbnRpYWwtb2ZmZXJzIiwiZmluYWxpemVfb2ZmZXJzX3VyaSI6Imh0dHBzOi8vZGV2YWdlbnQudmVsb2NpdHljYXJlZXJsYWJzLmlvL2FwaS9ob2xkZXIvdjAuNi9vcmcvZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3L2lzc3VlL2ZpbmFsaXplLW9mZmVycyJ9LCJwcmVzZW50YXRpb25fZGVmaW5pdGlvbiI6eyJpZCI6IjYzYzdjYWJmMmNmYmU4ZGUxOGUxN2M5OS42MjFjOWJlZWM4ZmEzNGI4ZTcyZDVmYzciLCJwdXJwb3NlIjoiIiwibmFtZSI6IlNoYXJlIHlvdXIgSWQsIEVtYWlsIGFuZCBQaG9uZSBOdW1iZXIgdG8gZmFjaWxpdGF0ZSB0aGUgc2VhcmNoIGZvciB5b3VyIGNhcmVlciBjcmVkZW50aWFscyIsImZvcm1hdCI6eyJqd3RfdnAiOnsiYWxnIjpbInNlY3AyNTZrMSJdfX0sImlucHV0X2Rlc2NyaXB0b3JzIjpbeyJpZCI6IlBhc3Nwb3J0VjEuMCIsIm5hbWUiOiJQYXNzcG9ydCIsInNjaGVtYSI6W3sidXJpIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9wYXNzcG9ydC12MS4wLnNjaGVtYS5qc29uIn1dLCJncm91cCI6WyJBIl19LHsiaWQiOiJFbWFpbFYxLjAiLCJuYW1lIjoiRW1haWwiLCJzY2hlbWEiOlt7InVyaSI6Imh0dHBzOi8vZGV2cmVnaXN0cmFyLnZlbG9jaXR5bmV0d29yay5mb3VuZGF0aW9uL3NjaGVtYXMvZW1haWwtdjEuMC5zY2hlbWEuanNvbiJ9XSwiZ3JvdXAiOlsiQSJdfSx7ImlkIjoiUGhvbmVWMS4wIiwibmFtZSI6IlBob25lIiwic2NoZW1hIjpbeyJ1cmkiOiJodHRwczovL2RldnJlZ2lzdHJhci52ZWxvY2l0eW5ldHdvcmsuZm91bmRhdGlvbi9zY2hlbWFzL3Bob25lLXYxLjAuc2NoZW1hLmpzb24ifV0sImdyb3VwIjpbIkEiXX0seyJpZCI6IkRyaXZlcnNMaWNlbnNlVjEuMCIsIm5hbWUiOiJEcml2ZXIncyBsaWNlbnNlIiwic2NoZW1hIjpbeyJ1cmkiOiJodHRwczovL2RldnJlZ2lzdHJhci52ZWxvY2l0eW5ldHdvcmsuZm91bmRhdGlvbi9zY2hlbWFzL2RyaXZlcnMtbGljZW5zZS12MS4wLnNjaGVtYS5qc29uIn1dLCJncm91cCI6WyJBIl19LHsiaWQiOiJOYXRpb25hbElkQ2FyZFYxLjAiLCJuYW1lIjoiTmF0aW9uYWwgSUQgY2FyZCIsInNjaGVtYSI6W3sidXJpIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9uYXRpb25hbC1pZC1jYXJkLXYxLjAuc2NoZW1hLmpzb24ifV0sImdyb3VwIjpbIkEiXX1dLCJzdWJtaXNzaW9uX3JlcXVpcmVtZW50cyI6W3sicnVsZSI6ImFsbCIsImZyb20iOiJBIiwibWluIjo1fV19LCJvdXRwdXRfZGVzY3JpcHRvcnMiOltdLCJpc3N1ZXIiOnsiaWQiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHcifSwibmJmIjoxNjc0MDM3OTUxLCJpc3MiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHciLCJleHAiOjE2NzQ2NDI3NTEsImlhdCI6MTY3NDAzNzk1MX0.uelHUF5RJA8PIB-3CEzdqk_c4aThz_F-VDM92etzcmFOjheT72MeboCT2mPwBfiMl5Pb3nrx3IaDRMgHjU5rNA'
            }
        },
        vclToken: null,
        default: null,
        jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksiLCJraWQiOiJkaWQ6dmVsb2NpdHk6djI6MHg4ZmNjNjY4ZTI0YzI3YjMwNTI2OWQyZmRiMjNlOTAzMWQ0YWIzZTAzOjE3NTQyNjk5MDkxOTMzOTo3OTUwI2tleS0xIn0.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIkFzc2Vzc21lbnRWMS4xIiwiVmVyaWZpYWJsZUNyZWRlbnRpYWwiXSwiY3JlZGVudGlhbFN0YXR1cyI6eyJ0eXBlIjoiVmVsb2NpdHlSZXZvY2F0aW9uTGlzdEphbjIwMjEiLCJpZCI6ImV0aGVyZXVtOjB4RDg5MEYyRDYwQjQyOWY5ZTI1N0ZDMEJjNThFZjIyMzc3NzZERDkxQi9nZXRSZXZva2VkU3RhdHVzP2FkZHJlc3M9MHg4ZkNjNjY4ZTI0YzI3YjMwNTI2OUQyZkRiMjNFOTAzMWQ0QUIzZTAzJmxpc3RJZD0yMzYzNjE2OTY0ODEzODEmaW5kZXg9NjUxIiwic3RhdHVzTGlzdEluZGV4Ijo2NTEsInN0YXR1c0xpc3RDcmVkZW50aWFsIjoiZXRoZXJldW06MHhEODkwRjJENjBCNDI5ZjllMjU3RkMwQmM1OEVmMjIzNzc3NkREOTFCL2dldFJldm9rZWRTdGF0dXM_YWRkcmVzcz0weDhmQ2M2NjhlMjRjMjdiMzA1MjY5RDJmRGIyM0U5MDMxZDRBQjNlMDMmbGlzdElkPTIzNjM2MTY5NjQ4MTM4MSIsImxpbmtDb2RlQ29tbWl0IjoiRWlDRnQycEJ3Q3R3MnIzek5VSnlEdDVOMUFHbEFrdDBiMjU2Q2pkYW5BNHNjQT09In0sImNvbnRlbnRIYXNoIjp7InR5cGUiOiJWZWxvY2l0eUNvbnRlbnRIYXNoMjAyMCIsInZhbHVlIjoiNzQxYjEyZTIzOThjMTMwNTlkNGQ5ZjI0OTI0YWEwZDFkMTU1Zjk4NTFjZDk1ZWYwMWI0MjU2NjM2ZDY3Y2RiMiJ9LCJjcmVkZW50aWFsU2NoZW1hIjp7ImlkIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9hc3Nlc3NtZW50LXYxLjEuc2NoZW1hLmpzb24iLCJ0eXBlIjoiSnNvblNjaGVtYVZhbGlkYXRvcjIwMTgifSwiY3JlZGVudGlhbFN1YmplY3QiOnsiQGNvbnRleHQiOiJodHRwczovL3ZlbG9jaXR5bmV0d29yay5mb3VuZGF0aW9uL2NvbnRleHRzL2Fzc2Vzc21lbnQiLCJhdXRob3JpdHkiOnsibmFtZSI6Ik1pY3Jvc29mdCBDb3Jwb3JhdGlvbiBpb24iLCJpZGVudGlmaWVyIjoiZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3IiwicGxhY2UiOnsiYWRkcmVzc0xvY2FsaXR5IjoiTG9zIEFuZ2VsZXMiLCJhZGRyZXNzUmVnaW9uIjoiVVMtQ0EiLCJhZGRyZXNzQ291bnRyeSI6IlVTIn19LCJuYW1lIjoiTGVhZGVyc2hpcCIsImFzc2Vzc2VzIjoiTGVhZGVyc2hpcCBjYXBhYmlsaXRpZXMiLCJkZXNjcmlwdGlvbiI6Iktvcm4gRmVycnkncyBsZWFkZXJzaGlwIGFzc2Vzc21lbnQgdGFrZXMgYSBjb250ZW1wb3JhcnksIHdob2xlLXBlcnNvbiB2aWV3IG9mIGJlaGF2aW9yLiBJdCB2YWx1ZXMgaW5kaWRpdmR1YWwgcXVhbGl0aWVzIHRoYXQgaW1wYWN0IGFuZCBnb3Zlcm4gbGVhZGVycycgam9iIHBlcmZvcm1hbmNlIGluIGFyZWFzb2YgQ29tcGV0ZW5jaWVzLCBFeGVwcmllbmNlcywgVHJhaXRzLCBhbmQgRHJpdmVycy4gIiwic2NvcmUiOnsic2NvcmVNZXRob2QiOnsic2NvcmVNZXRob2RUeXBlIjoiTm9ybVJlZmVyZW5jZWQiLCJzY29yZU1ldGhvZERlc2NyaXB0aW9uIjoiS29ybiBGZXJyeSBnbG9iYWwgbm9ybSAyMDE4LiBOb3JtIHNpemU6IDI1LDAwMC4gIHNjb3JlIHJhbmdlIDEtMTAuIn0sInNjb3JlVmFsdWUiOiI4LjkiLCJyZXN1bHQiOiJOb3JtYWwgY29sb3IgdmlzaW9uIiwicGFzc0ZhaWwiOiJUZXN0In0sImFzc2Vzc21lbnRMZXZlbCI6IlRlc3QgTGV2ZWwiLCJhc3Nlc3NtZW50RGF0ZSI6IjIwMTgtMDEtMDkiLCJhc3Nlc3NtZW50TWV0aG9kIjoiV3JpdHRlbiIsImFzc2Vzc21lbnREaW1lbnNpb25zIjpbeyJuYW1lIjoiQ3JlZGliaWxpdHkiLCJkZXNjcmlwdGlvbiI6IlRoZSBkZWdyZWUgb2YgY29uc2lzdGVuY3kgYmV0d2VlbiBhIHBlcnNvbidzIHdvcmRzIGFuZCBhY3Rpb25zLiIsImFzc2Vzc2VzIjoiVGVzdCBhc3Nlc3NlcyAxIiwic2NvcmUiOnsic2NvcmVNZXRob2QiOnsic2NvcmVNZXRob2RUeXBlIjoiTm9ybVJlZmVyZW5jZWQiLCJzY29yZU1ldGhvZERlc2NyaXB0aW9uIjoiS29ybiBGZXJyeSBnbG9iYWwgbm9ybSAyMDE4LiBOb3JtIHNpemU6IDI1LDAwMC4gIHNjb3JlIHJhbmdlIDEtMTAuIn0sInNjb3JlVmFsdWUiOiI3LjIiLCJyZXN1bHQiOiJUZXN0IHJlc3VsdCAxIiwicGFzc0ZhaWwiOiJQYXNzIn0sImFzc2Vzc21lbnREYXRlIjoiMjAxMS0wOS0wMSIsImFzc2Vzc21lbnRNZXRob2QiOiJXcml0dGVuIn0seyJuYW1lIjoiQXNzZXJ0aXZlbmVzcyIsImRlc2NyaXB0aW9uIjoiVGhlIGFzc2VydGl2ZW5lc3Mgb2YgYSBwZXJzb24iLCJhc3Nlc3NlcyI6IlRlc3QgYXNzZXNzZXMgMiIsInNjb3JlIjp7InNjb3JlTWV0aG9kIjp7InNjb3JlTWV0aG9kVHlwZSI6Ik5vcm1SZWZlcmVuY2VkIiwic2NvcmVNZXRob2REZXNjcmlwdGlvbiI6Iktvcm4gRmVycnkgZ2xvYmFsIG5vcm0gMjAxOC4gTm9ybSBzaXplOiAyNSwwMDAuICBzY29yZSByYW5nZSAxLTEwLiJ9LCJzY29yZVZhbHVlIjoiOS4xIiwicmVzdWx0IjoiVGVzdCByZXN1bHQgMiIsInBhc3NGYWlsIjoiRmFpbCJ9LCJhc3Nlc3NtZW50RGF0ZSI6IjIwMjItMDgtMzEiLCJhc3Nlc3NtZW50TWV0aG9kIjoiUmVhZCJ9LHsibmFtZSI6IkRpbWVuc2lvbiAzIiwiZGVzY3JpcHRpb24iOiJUaGUgZGVzY3JpcHRpb24gZm9yIGRpbWVuc3Rpb24gMyIsImFzc2Vzc2VzIjoiVGVzdCBhc3Nlc3NlcyAzIiwic2NvcmUiOnsic2NvcmVNZXRob2QiOnsic2NvcmVNZXRob2RUeXBlIjoiTm9ybVJlZmVyZW5jZWQgMyAiLCJzY29yZU1ldGhvZERlc2NyaXB0aW9uIjoiS29ybiBGZXJyeSBnbG9iYWwgbm9ybSAzIn0sInNjb3JlVmFsdWUiOiIzIiwicmVzdWx0IjoiVGVzdCByZXN1bHQgMyIsInBhc3NGYWlsIjoiRmFpbCJ9LCJhc3Nlc3NtZW50RGF0ZSI6IjIwMjItMTItMjciLCJhc3Nlc3NtZW50TWV0aG9kIjoiU3BlYWsifV0sInJlY2lwaWVudCI6eyJnaXZlbk5hbWUiOiJPbGl2aWEiLCJmYW1pbHlOYW1lIjoiSGFmZXoiLCJtaWRkbGVOYW1lIjoiTWVsYW5pZSIsIm5hbWVQcmVmaXgiOiJEci4iLCJuYW1lU3VmZml4IjoiTXJzLiJ9LCJhbGlnbm1lbnQiOlt7InRhcmdldE5hbWUiOiJMaXZlIE9ubGluZSBTa2luIGFuZCBXb3VuZCBNYW5hZ2VtZW50IENvdXJzZSIsInRhcmdldFVybCI6Imh0dHBzOi8vY3JlZGVudGlhbGZpbmRlci5vcmcvY3JlZGVudGlhbC8yMDkyMy9MaXZlX09ubGluZV9Ta2luX2FuZF9Xb3VuZF9NYW5hZ2VtZW50X0NvdXJzZSIsInRhcmdldERlc2NyaXB0aW9uIjoiVGhpcyBjb3Vyc2Ugb2ZmZXJzIGFuIGV2aWRlbmNlLWJhc2VkIGFwcHJvYWNoIHRvIHdvdW5kIG1hbmFnZW1lbnQgdG8gaGVscCBjbGluaWNpYW5zIHN0YXkgY3VycmVudCB3aXRoIHRoZSBzdGFuZGFyZHMgb2YgY2FyZSBhbmQgbGVnYWxseSBkZWZlbnNpYmxlIGF0IGJlZHNpZGUuIiwidGFyZ2V0RnJhbWV3b3JrIjoiQ3JlZGVudGlhbCBFbmdpbmUifV19fSwibmJmIjoxNjc0MDM3OTkwLCJqdGkiOiJkaWQ6dmVsb2NpdHk6djI6MHg4ZmNjNjY4ZTI0YzI3YjMwNTI2OWQyZmRiMjNlOTAzMWQ0YWIzZTAzOjE3NTQyNjk5MDkxOTMzOTo3OTUwIiwiaXNzIjoiZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3IiwiaWF0IjoxNjc0MDM3OTkwfQ.GLIGciw_B_Q_hQ93GnElZhw9jjN3mQTDFgARDpN58qprxFbpsU17FOqaYI-d6jywgeqZjWk1ctbybRWbuHGUqg',
        output_descriptors: null,
        replacerId: null
    },
    {
        type: ['EmploymentCurrentV1.1', 'VerifiableCredential'],
        id: 'did:velocity:v2:0x8fcc668e24c27b305269d2fdb23e9031d4ab3e03:175426990919339:5010_olivia.hafez@example.com',
        logo: null,
        vendorCountry: '',
        note: null,
        issuer: {
            id: 'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
            name: 'Microsoft Corporation ion',
            country: null,
            logo: 'https://agsol.com/wp-content/uploads/2018/09/new-microsoft-logo-SIZED-SQUARE.jpg'
        },
        credentialSchema: {
            id: 'https://devlib.velocitynetwork.foundation/schemas/employment-current-v1.1.schema.json',
            type: 'JsonSchemaValidator2018'
        },
        credentialSubject: {
            '@context':
                'https://velocitynetwork.foundation/contexts/employment',
            legalEmployer: {
                name: 'Microsoft Corporation ion',
                identifier:
                    'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
                place: {
                    addressLocality: 'Bellevue',
                    addressRegion: 'US-WA',
                    addressCountry: 'US'
                }
            },
            role: 'Project Manager (current)',
            description: 'Backend development project management',
            employmentType: 'permanent',
            place: {
                name: 'Media Lab',
                addressLocality: 'Buffalo',
                addressRegion: 'US-NY',
                addressCountry: 'US'
            },
            startDate: '2013-10-01',
            recipient: {
                givenName: 'Olivia',
                familyName: 'Hafez',
                middleName: 'Melanie',
                namePrefix: 'Dr.',
                nameSuffix: 'Mrs.'
            },
            alignment: [
                {
                    targetName: 'Test Name',
                    targetUrl:
                        'https://credentialfinder.org/credential/5769/Bachelor_of_Science_in_Nursing_RN_to_BSN',
                    targetFramework: 'Test Framework'
                }
            ]
        },
        offerId: null,
        userId: 'olivia.hafez@example.com',
        issuanceDate: '2023-01-18T10:33:10.946Z',
        isNewWaiting: null,
        withoutAccept: null,
        saveOfferDate: null,
        vendor: null,
        hash: '82f5154697819771ed6d827385816dcef0bccfee6818efebf5061ee0597500e4',
        status: 'verified',
        revocationDate: null,
        revocationReason: null,
        additionalInfo: null,
        isNewRevoked: null,
        linkCodeCommitment: {
            value: 'EiBhDnsQs3us6JrDJALbnsH07XdtqUKiiLUBot1YpXesYg=='
        },
        credentialManifest: {
            iss: 'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
            did: 'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
            exchangeId: '63c7cabf2cfbe8de18e17c99',
            vendorOriginContext: null,
            jwt: {
                encodedJwt:
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksiLCJraWQiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHcjZXhjaGFuZ2Uta2V5LTEifQ.eyJleGNoYW5nZV9pZCI6IjYzYzdjYWJmMmNmYmU4ZGUxOGUxN2M5OSIsIm1ldGFkYXRhIjp7ImNsaWVudF9uYW1lIjoiTWljcm9zb2Z0IENvcnBvcmF0aW9uIGlvbiIsImxvZ29fdXJpIjoiaHR0cHM6Ly9hZ3NvbC5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMTgvMDkvbmV3LW1pY3Jvc29mdC1sb2dvLVNJWkVELVNRVUFSRS5qcGciLCJ0b3NfdXJpIjoiaHR0cHM6Ly93d3cudmVsb2NpdHlleHBlcmllbmNlY2VudGVyLmNvbS90ZXJtcy1hbmQtY29uZGl0aW9ucy12bmYiLCJtYXhfcmV0ZW50aW9uX3BlcmlvZCI6IiIsInByb2dyZXNzX3VyaSI6Imh0dHBzOi8vZGV2YWdlbnQudmVsb2NpdHljYXJlZXJsYWJzLmlvL2FwaS9ob2xkZXIvdjAuNi9vcmcvZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3L2dldC1leGNoYW5nZS1wcm9ncmVzcyIsInN1Ym1pdF9wcmVzZW50YXRpb25fdXJpIjoiaHR0cHM6Ly9kZXZhZ2VudC52ZWxvY2l0eWNhcmVlcmxhYnMuaW8vYXBpL2hvbGRlci92MC42L29yZy9kaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHcvaXNzdWUvc3VibWl0LWlkZW50aWZpY2F0aW9uIiwiY2hlY2tfb2ZmZXJzX3VyaSI6Imh0dHBzOi8vZGV2YWdlbnQudmVsb2NpdHljYXJlZXJsYWJzLmlvL2FwaS9ob2xkZXIvdjAuNi9vcmcvZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3L2lzc3VlL2NyZWRlbnRpYWwtb2ZmZXJzIiwiZmluYWxpemVfb2ZmZXJzX3VyaSI6Imh0dHBzOi8vZGV2YWdlbnQudmVsb2NpdHljYXJlZXJsYWJzLmlvL2FwaS9ob2xkZXIvdjAuNi9vcmcvZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3L2lzc3VlL2ZpbmFsaXplLW9mZmVycyJ9LCJwcmVzZW50YXRpb25fZGVmaW5pdGlvbiI6eyJpZCI6IjYzYzdjYWJmMmNmYmU4ZGUxOGUxN2M5OS42MjFjOWJlZWM4ZmEzNGI4ZTcyZDVmYzciLCJwdXJwb3NlIjoiIiwibmFtZSI6IlNoYXJlIHlvdXIgSWQsIEVtYWlsIGFuZCBQaG9uZSBOdW1iZXIgdG8gZmFjaWxpdGF0ZSB0aGUgc2VhcmNoIGZvciB5b3VyIGNhcmVlciBjcmVkZW50aWFscyIsImZvcm1hdCI6eyJqd3RfdnAiOnsiYWxnIjpbInNlY3AyNTZrMSJdfX0sImlucHV0X2Rlc2NyaXB0b3JzIjpbeyJpZCI6IlBhc3Nwb3J0VjEuMCIsIm5hbWUiOiJQYXNzcG9ydCIsInNjaGVtYSI6W3sidXJpIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9wYXNzcG9ydC12MS4wLnNjaGVtYS5qc29uIn1dLCJncm91cCI6WyJBIl19LHsiaWQiOiJFbWFpbFYxLjAiLCJuYW1lIjoiRW1haWwiLCJzY2hlbWEiOlt7InVyaSI6Imh0dHBzOi8vZGV2cmVnaXN0cmFyLnZlbG9jaXR5bmV0d29yay5mb3VuZGF0aW9uL3NjaGVtYXMvZW1haWwtdjEuMC5zY2hlbWEuanNvbiJ9XSwiZ3JvdXAiOlsiQSJdfSx7ImlkIjoiUGhvbmVWMS4wIiwibmFtZSI6IlBob25lIiwic2NoZW1hIjpbeyJ1cmkiOiJodHRwczovL2RldnJlZ2lzdHJhci52ZWxvY2l0eW5ldHdvcmsuZm91bmRhdGlvbi9zY2hlbWFzL3Bob25lLXYxLjAuc2NoZW1hLmpzb24ifV0sImdyb3VwIjpbIkEiXX0seyJpZCI6IkRyaXZlcnNMaWNlbnNlVjEuMCIsIm5hbWUiOiJEcml2ZXIncyBsaWNlbnNlIiwic2NoZW1hIjpbeyJ1cmkiOiJodHRwczovL2RldnJlZ2lzdHJhci52ZWxvY2l0eW5ldHdvcmsuZm91bmRhdGlvbi9zY2hlbWFzL2RyaXZlcnMtbGljZW5zZS12MS4wLnNjaGVtYS5qc29uIn1dLCJncm91cCI6WyJBIl19LHsiaWQiOiJOYXRpb25hbElkQ2FyZFYxLjAiLCJuYW1lIjoiTmF0aW9uYWwgSUQgY2FyZCIsInNjaGVtYSI6W3sidXJpIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9uYXRpb25hbC1pZC1jYXJkLXYxLjAuc2NoZW1hLmpzb24ifV0sImdyb3VwIjpbIkEiXX1dLCJzdWJtaXNzaW9uX3JlcXVpcmVtZW50cyI6W3sicnVsZSI6ImFsbCIsImZyb20iOiJBIiwibWluIjo1fV19LCJvdXRwdXRfZGVzY3JpcHRvcnMiOltdLCJpc3N1ZXIiOnsiaWQiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHcifSwibmJmIjoxNjc0MDM3OTUxLCJpc3MiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHciLCJleHAiOjE2NzQ2NDI3NTEsImlhdCI6MTY3NDAzNzk1MX0.uelHUF5RJA8PIB-3CEzdqk_c4aThz_F-VDM92etzcmFOjheT72MeboCT2mPwBfiMl5Pb3nrx3IaDRMgHjU5rNA'
            }
        },
        vclToken: null,
        default: null,
        jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksiLCJraWQiOiJkaWQ6dmVsb2NpdHk6djI6MHg4ZmNjNjY4ZTI0YzI3YjMwNTI2OWQyZmRiMjNlOTAzMWQ0YWIzZTAzOjE3NTQyNjk5MDkxOTMzOTo1MDEwI2tleS0xIn0.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIkVtcGxveW1lbnRDdXJyZW50VjEuMSIsIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdGF0dXMiOnsidHlwZSI6IlZlbG9jaXR5UmV2b2NhdGlvbkxpc3RKYW4yMDIxIiwiaWQiOiJldGhlcmV1bToweEQ4OTBGMkQ2MEI0MjlmOWUyNTdGQzBCYzU4RWYyMjM3Nzc2REQ5MUIvZ2V0UmV2b2tlZFN0YXR1cz9hZGRyZXNzPTB4OGZDYzY2OGUyNGMyN2IzMDUyNjlEMmZEYjIzRTkwMzFkNEFCM2UwMyZsaXN0SWQ9MjM2MzYxNjk2NDgxMzgxJmluZGV4PTg3MjMiLCJzdGF0dXNMaXN0SW5kZXgiOjg3MjMsInN0YXR1c0xpc3RDcmVkZW50aWFsIjoiZXRoZXJldW06MHhEODkwRjJENjBCNDI5ZjllMjU3RkMwQmM1OEVmMjIzNzc3NkREOTFCL2dldFJldm9rZWRTdGF0dXM_YWRkcmVzcz0weDhmQ2M2NjhlMjRjMjdiMzA1MjY5RDJmRGIyM0U5MDMxZDRBQjNlMDMmbGlzdElkPTIzNjM2MTY5NjQ4MTM4MSIsImxpbmtDb2RlQ29tbWl0IjoiRWlCaERuc1FzM3VzNkpyREpBTGJuc0gwN1hkdHFVS2lpTFVCb3QxWXBYZXNZZz09In0sImNvbnRlbnRIYXNoIjp7InR5cGUiOiJWZWxvY2l0eUNvbnRlbnRIYXNoMjAyMCIsInZhbHVlIjoiODJmNTE1NDY5NzgxOTc3MWVkNmQ4MjczODU4MTZkY2VmMGJjY2ZlZTY4MThlZmViZjUwNjFlZTA1OTc1MDBlNCJ9LCJjcmVkZW50aWFsU2NoZW1hIjp7ImlkIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9lbXBsb3ltZW50LWN1cnJlbnQtdjEuMS5zY2hlbWEuanNvbiIsInR5cGUiOiJKc29uU2NoZW1hVmFsaWRhdG9yMjAxOCJ9LCJjcmVkZW50aWFsU3ViamVjdCI6eyJAY29udGV4dCI6Imh0dHBzOi8vdmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vY29udGV4dHMvZW1wbG95bWVudCIsImxlZ2FsRW1wbG95ZXIiOnsibmFtZSI6Ik1pY3Jvc29mdCBDb3Jwb3JhdGlvbiBpb24iLCJpZGVudGlmaWVyIjoiZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3IiwicGxhY2UiOnsiYWRkcmVzc0xvY2FsaXR5IjoiQmVsbGV2dWUiLCJhZGRyZXNzUmVnaW9uIjoiVVMtV0EiLCJhZGRyZXNzQ291bnRyeSI6IlVTIn19LCJyb2xlIjoiUHJvamVjdCBNYW5hZ2VyIChjdXJyZW50KSIsImRlc2NyaXB0aW9uIjoiQmFja2VuZCBkZXZlbG9wbWVudCBwcm9qZWN0IG1hbmFnZW1lbnQiLCJlbXBsb3ltZW50VHlwZSI6InBlcm1hbmVudCIsInBsYWNlIjp7Im5hbWUiOiJNZWRpYSBMYWIiLCJhZGRyZXNzTG9jYWxpdHkiOiJCdWZmYWxvIiwiYWRkcmVzc1JlZ2lvbiI6IlVTLU5ZIiwiYWRkcmVzc0NvdW50cnkiOiJVUyJ9LCJzdGFydERhdGUiOiIyMDEzLTEwLTAxIiwicmVjaXBpZW50Ijp7ImdpdmVuTmFtZSI6Ik9saXZpYSIsImZhbWlseU5hbWUiOiJIYWZleiIsIm1pZGRsZU5hbWUiOiJNZWxhbmllIiwibmFtZVByZWZpeCI6IkRyLiIsIm5hbWVTdWZmaXgiOiJNcnMuIn0sImFsaWdubWVudCI6W3sidGFyZ2V0TmFtZSI6IlRlc3QgTmFtZSIsInRhcmdldFVybCI6Imh0dHBzOi8vY3JlZGVudGlhbGZpbmRlci5vcmcvY3JlZGVudGlhbC81NzY5L0JhY2hlbG9yX29mX1NjaWVuY2VfaW5fTnVyc2luZ19STl90b19CU04iLCJ0YXJnZXRGcmFtZXdvcmsiOiJUZXN0IEZyYW1ld29yayJ9XX19LCJuYmYiOjE2NzQwMzc5OTAsImp0aSI6ImRpZDp2ZWxvY2l0eTp2MjoweDhmY2M2NjhlMjRjMjdiMzA1MjY5ZDJmZGIyM2U5MDMxZDRhYjNlMDM6MTc1NDI2OTkwOTE5MzM5OjUwMTAiLCJpc3MiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHciLCJpYXQiOjE2NzQwMzc5OTB9.1jK_3nb2Ed74BHt8xsa8CXXGUu-MhBels5HX8kMXAmGruCA9HfGaXjDFXtvTlF1Z6AJGRKs3rZYmwuUr4yWPFQ',
        output_descriptors: null,
        replacerId: null
    },
    {
        type: ['EmploymentCurrentV1.1', 'VerifiableCredential'],
        id: 'did:velocity:v2:0x8fcc668e24c27b305269d2fdb23e9031d4ab3e03:175426990919339:5019_olivia.hafez@example.com',
        logo: null,
        vendorCountry: '',
        note: null,
        issuer: {
            id: 'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
            name: 'Microsoft Corporation ion',
            country: null,
            logo: 'https://agsol.com/wp-content/uploads/2018/09/new-microsoft-logo-SIZED-SQUARE.jpg'
        },
        credentialSchema: {
            id: 'https://devlib.velocitynetwork.foundation/schemas/employment-current-v1.1.schema.json',
            type: 'JsonSchemaValidator2018'
        },
        credentialSubject: {
            '@context':
                'https://velocitynetwork.foundation/contexts/employment',
            legalEmployer: {
                name: 'Microsoft Corporation ion',
                identifier:
                    'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
                place: {
                    addressLocality: 'Bellevue',
                    addressRegion: 'US-WA',
                    addressCountry: 'US'
                }
            },
            role: 'Replacement Position (Mock)',
            description: 'Backend development project management',
            employmentType: 'permanent',
            place: {
                name: 'Media Lab',
                addressLocality: 'Buffalo',
                addressRegion: 'US-NY',
                addressCountry: 'US'
            },
            startDate: '2013-10-01',
            recipient: {
                givenName: 'Olivia',
                familyName: 'Hafez'
            }
        },
        offerId: null,
        userId: 'olivia.hafez@example.com',
        issuanceDate: '2023-01-18T10:33:10.957Z',
        isNewWaiting: null,
        withoutAccept: null,
        saveOfferDate: null,
        vendor: null,
        hash: 'a819ad96ab79c1d26afa3fa004b8eb379209ecda38fbec2a89c98ba02f4d1dab',
        status: 'verified',
        revocationDate: null,
        revocationReason: null,
        additionalInfo: null,
        isNewRevoked: null,
        linkCodeCommitment: {
            value: 'EiDfco4/H0iSb1UErLxrvePQY2M8qwlkXC3R+gWDv40r7A=='
        },
        credentialManifest: {
            iss: 'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
            did: 'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
            exchangeId: '63c7cabf2cfbe8de18e17c99',
            vendorOriginContext: null,
            jwt: {
                encodedJwt:
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksiLCJraWQiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHcjZXhjaGFuZ2Uta2V5LTEifQ.eyJleGNoYW5nZV9pZCI6IjYzYzdjYWJmMmNmYmU4ZGUxOGUxN2M5OSIsIm1ldGFkYXRhIjp7ImNsaWVudF9uYW1lIjoiTWljcm9zb2Z0IENvcnBvcmF0aW9uIGlvbiIsImxvZ29fdXJpIjoiaHR0cHM6Ly9hZ3NvbC5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMTgvMDkvbmV3LW1pY3Jvc29mdC1sb2dvLVNJWkVELVNRVUFSRS5qcGciLCJ0b3NfdXJpIjoiaHR0cHM6Ly93d3cudmVsb2NpdHlleHBlcmllbmNlY2VudGVyLmNvbS90ZXJtcy1hbmQtY29uZGl0aW9ucy12bmYiLCJtYXhfcmV0ZW50aW9uX3BlcmlvZCI6IiIsInByb2dyZXNzX3VyaSI6Imh0dHBzOi8vZGV2YWdlbnQudmVsb2NpdHljYXJlZXJsYWJzLmlvL2FwaS9ob2xkZXIvdjAuNi9vcmcvZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3L2dldC1leGNoYW5nZS1wcm9ncmVzcyIsInN1Ym1pdF9wcmVzZW50YXRpb25fdXJpIjoiaHR0cHM6Ly9kZXZhZ2VudC52ZWxvY2l0eWNhcmVlcmxhYnMuaW8vYXBpL2hvbGRlci92MC42L29yZy9kaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHcvaXNzdWUvc3VibWl0LWlkZW50aWZpY2F0aW9uIiwiY2hlY2tfb2ZmZXJzX3VyaSI6Imh0dHBzOi8vZGV2YWdlbnQudmVsb2NpdHljYXJlZXJsYWJzLmlvL2FwaS9ob2xkZXIvdjAuNi9vcmcvZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3L2lzc3VlL2NyZWRlbnRpYWwtb2ZmZXJzIiwiZmluYWxpemVfb2ZmZXJzX3VyaSI6Imh0dHBzOi8vZGV2YWdlbnQudmVsb2NpdHljYXJlZXJsYWJzLmlvL2FwaS9ob2xkZXIvdjAuNi9vcmcvZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3L2lzc3VlL2ZpbmFsaXplLW9mZmVycyJ9LCJwcmVzZW50YXRpb25fZGVmaW5pdGlvbiI6eyJpZCI6IjYzYzdjYWJmMmNmYmU4ZGUxOGUxN2M5OS42MjFjOWJlZWM4ZmEzNGI4ZTcyZDVmYzciLCJwdXJwb3NlIjoiIiwibmFtZSI6IlNoYXJlIHlvdXIgSWQsIEVtYWlsIGFuZCBQaG9uZSBOdW1iZXIgdG8gZmFjaWxpdGF0ZSB0aGUgc2VhcmNoIGZvciB5b3VyIGNhcmVlciBjcmVkZW50aWFscyIsImZvcm1hdCI6eyJqd3RfdnAiOnsiYWxnIjpbInNlY3AyNTZrMSJdfX0sImlucHV0X2Rlc2NyaXB0b3JzIjpbeyJpZCI6IlBhc3Nwb3J0VjEuMCIsIm5hbWUiOiJQYXNzcG9ydCIsInNjaGVtYSI6W3sidXJpIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9wYXNzcG9ydC12MS4wLnNjaGVtYS5qc29uIn1dLCJncm91cCI6WyJBIl19LHsiaWQiOiJFbWFpbFYxLjAiLCJuYW1lIjoiRW1haWwiLCJzY2hlbWEiOlt7InVyaSI6Imh0dHBzOi8vZGV2cmVnaXN0cmFyLnZlbG9jaXR5bmV0d29yay5mb3VuZGF0aW9uL3NjaGVtYXMvZW1haWwtdjEuMC5zY2hlbWEuanNvbiJ9XSwiZ3JvdXAiOlsiQSJdfSx7ImlkIjoiUGhvbmVWMS4wIiwibmFtZSI6IlBob25lIiwic2NoZW1hIjpbeyJ1cmkiOiJodHRwczovL2RldnJlZ2lzdHJhci52ZWxvY2l0eW5ldHdvcmsuZm91bmRhdGlvbi9zY2hlbWFzL3Bob25lLXYxLjAuc2NoZW1hLmpzb24ifV0sImdyb3VwIjpbIkEiXX0seyJpZCI6IkRyaXZlcnNMaWNlbnNlVjEuMCIsIm5hbWUiOiJEcml2ZXIncyBsaWNlbnNlIiwic2NoZW1hIjpbeyJ1cmkiOiJodHRwczovL2RldnJlZ2lzdHJhci52ZWxvY2l0eW5ldHdvcmsuZm91bmRhdGlvbi9zY2hlbWFzL2RyaXZlcnMtbGljZW5zZS12MS4wLnNjaGVtYS5qc29uIn1dLCJncm91cCI6WyJBIl19LHsiaWQiOiJOYXRpb25hbElkQ2FyZFYxLjAiLCJuYW1lIjoiTmF0aW9uYWwgSUQgY2FyZCIsInNjaGVtYSI6W3sidXJpIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9uYXRpb25hbC1pZC1jYXJkLXYxLjAuc2NoZW1hLmpzb24ifV0sImdyb3VwIjpbIkEiXX1dLCJzdWJtaXNzaW9uX3JlcXVpcmVtZW50cyI6W3sicnVsZSI6ImFsbCIsImZyb20iOiJBIiwibWluIjo1fV19LCJvdXRwdXRfZGVzY3JpcHRvcnMiOltdLCJpc3N1ZXIiOnsiaWQiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHcifSwibmJmIjoxNjc0MDM3OTUxLCJpc3MiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHciLCJleHAiOjE2NzQ2NDI3NTEsImlhdCI6MTY3NDAzNzk1MX0.uelHUF5RJA8PIB-3CEzdqk_c4aThz_F-VDM92etzcmFOjheT72MeboCT2mPwBfiMl5Pb3nrx3IaDRMgHjU5rNA'
            }
        },
        vclToken: null,
        default: null,
        jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksiLCJraWQiOiJkaWQ6dmVsb2NpdHk6djI6MHg4ZmNjNjY4ZTI0YzI3YjMwNTI2OWQyZmRiMjNlOTAzMWQ0YWIzZTAzOjE3NTQyNjk5MDkxOTMzOTo1MDE5I2tleS0xIn0.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIkVtcGxveW1lbnRDdXJyZW50VjEuMSIsIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdGF0dXMiOnsidHlwZSI6IlZlbG9jaXR5UmV2b2NhdGlvbkxpc3RKYW4yMDIxIiwiaWQiOiJldGhlcmV1bToweEQ4OTBGMkQ2MEI0MjlmOWUyNTdGQzBCYzU4RWYyMjM3Nzc2REQ5MUIvZ2V0UmV2b2tlZFN0YXR1cz9hZGRyZXNzPTB4OGZDYzY2OGUyNGMyN2IzMDUyNjlEMmZEYjIzRTkwMzFkNEFCM2UwMyZsaXN0SWQ9MjM2MzYxNjk2NDgxMzgxJmluZGV4PTEwMjA2Iiwic3RhdHVzTGlzdEluZGV4IjoxMDIwNiwic3RhdHVzTGlzdENyZWRlbnRpYWwiOiJldGhlcmV1bToweEQ4OTBGMkQ2MEI0MjlmOWUyNTdGQzBCYzU4RWYyMjM3Nzc2REQ5MUIvZ2V0UmV2b2tlZFN0YXR1cz9hZGRyZXNzPTB4OGZDYzY2OGUyNGMyN2IzMDUyNjlEMmZEYjIzRTkwMzFkNEFCM2UwMyZsaXN0SWQ9MjM2MzYxNjk2NDgxMzgxIiwibGlua0NvZGVDb21taXQiOiJFaURmY280L0gwaVNiMVVFckx4cnZlUFFZMk04cXdsa1hDM1IrZ1dEdjQwcjdBPT0ifSwibGlua2VkQ3JlZGVudGlhbHMiOlt7ImxpbmtUeXBlIjoiUkVQTEFDRSIsImxpbmtDb2RlIjoiVEVXemw3VlNZWjRYVmVTbXNWUU5ZZWRIQzU4PSJ9XSwiY29udGVudEhhc2giOnsidHlwZSI6IlZlbG9jaXR5Q29udGVudEhhc2gyMDIwIiwidmFsdWUiOiJhODE5YWQ5NmFiNzljMWQyNmFmYTNmYTAwNGI4ZWIzNzkyMDllY2RhMzhmYmVjMmE4OWM5OGJhMDJmNGQxZGFiIn0sImNyZWRlbnRpYWxTY2hlbWEiOnsiaWQiOiJodHRwczovL2RldnJlZ2lzdHJhci52ZWxvY2l0eW5ldHdvcmsuZm91bmRhdGlvbi9zY2hlbWFzL2VtcGxveW1lbnQtY3VycmVudC12MS4xLnNjaGVtYS5qc29uIiwidHlwZSI6Ikpzb25TY2hlbWFWYWxpZGF0b3IyMDE4In0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7IkBjb250ZXh0IjoiaHR0cHM6Ly92ZWxvY2l0eW5ldHdvcmsuZm91bmRhdGlvbi9jb250ZXh0cy9lbXBsb3ltZW50IiwibGVnYWxFbXBsb3llciI6eyJuYW1lIjoiTWljcm9zb2Z0IENvcnBvcmF0aW9uIGlvbiIsImlkZW50aWZpZXIiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHciLCJwbGFjZSI6eyJhZGRyZXNzTG9jYWxpdHkiOiJCZWxsZXZ1ZSIsImFkZHJlc3NSZWdpb24iOiJVUy1XQSIsImFkZHJlc3NDb3VudHJ5IjoiVVMifX0sInJvbGUiOiJSZXBsYWNlbWVudCBQb3NpdGlvbiAoTW9jaykiLCJkZXNjcmlwdGlvbiI6IkJhY2tlbmQgZGV2ZWxvcG1lbnQgcHJvamVjdCBtYW5hZ2VtZW50IiwiZW1wbG95bWVudFR5cGUiOiJwZXJtYW5lbnQiLCJwbGFjZSI6eyJuYW1lIjoiTWVkaWEgTGFiIiwiYWRkcmVzc0xvY2FsaXR5IjoiQnVmZmFsbyIsImFkZHJlc3NSZWdpb24iOiJVUy1OWSIsImFkZHJlc3NDb3VudHJ5IjoiVVMifSwic3RhcnREYXRlIjoiMjAxMy0xMC0wMSIsInJlY2lwaWVudCI6eyJnaXZlbk5hbWUiOiJPbGl2aWEiLCJmYW1pbHlOYW1lIjoiSGFmZXoifX19LCJuYmYiOjE2NzQwMzc5OTAsImp0aSI6ImRpZDp2ZWxvY2l0eTp2MjoweDhmY2M2NjhlMjRjMjdiMzA1MjY5ZDJmZGIyM2U5MDMxZDRhYjNlMDM6MTc1NDI2OTkwOTE5MzM5OjUwMTkiLCJpc3MiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHciLCJpYXQiOjE2NzQwMzc5OTB9.h3EDWbJy2txI-BRsnU94KRlMBLAtt4V92mirGawUWNlQRB0qm6B3qksGWEMofBmjjiz8aGrzVjgVCsLjtZ0hIg',
        output_descriptors: null,
        replacerId: null
    },
    {
        type: ['BadgeV1.1', 'VerifiableCredential'],
        id: 'did:velocity:v2:0x8fcc668e24c27b305269d2fdb23e9031d4ab3e03:175426990919339:1990_olivia.hafez@example.com',
        logo: null,
        vendorCountry: '',
        note: null,
        issuer: {
            id: 'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
            name: 'Microsoft Corporation ion',
            country: null,
            logo: 'https://agsol.com/wp-content/uploads/2018/09/new-microsoft-logo-SIZED-SQUARE.jpg'
        },
        credentialSchema: {
            id: 'https://devlib.velocitynetwork.foundation/schemas/badge-v1.1.schema.json',
            type: 'JsonSchemaValidator2018'
        },
        credentialSubject: {
            '@context':
                'https://velocitynetwork.foundation/contexts/employment',
            hasCredential: {
                name: 'Cornerstone test image (html) (BadgeV1.1)',
                description:
                    'Awarded annually to up to 3 volunteers at the Campo Verde Care Center',
                type: 'BadgeClass',
                criteria:
                    'https://www.velocityexperiencecenter.com/campo-verde',
                issuer: {
                    name: 'Microsoft Corporation ion'
                },
                image: 'https://corporate1-dev.csod.com/common/ReadFile.aspx?FileName=badgeteamplayer_small_84d9ebe3-646a-4bc6-b970-12c4d66a603a.png&SubPath=/award_images/&c=%5e%5e%5ev%2fAkzOzDK3SgS%2bwQNQHZhw%3d%3d',
                id: '333',
                tags: 'sample-tag'
            }
        },
        offerId: null,
        userId: 'olivia.hafez@example.com',
        issuanceDate: '2023-01-18T10:33:10.953Z',
        isNewWaiting: null,
        withoutAccept: null,
        saveOfferDate: null,
        vendor: null,
        hash: '547189634801a34181318afed87014b845ef29138da0d7fde430377e44528431',
        status: 'verified',
        revocationDate: null,
        revocationReason: null,
        additionalInfo: null,
        isNewRevoked: null,
        linkCodeCommitment: {
            value: 'EiBGQvhW6Nvtx52rqagEA0FvRe9O2/ApiZ5Vhr9xABpTRA=='
        },
        credentialManifest: {
            iss: 'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
            did: 'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
            exchangeId: '63c7cabf2cfbe8de18e17c99',
            vendorOriginContext: null,
            jwt: {
                encodedJwt:
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksiLCJraWQiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHcjZXhjaGFuZ2Uta2V5LTEifQ.eyJleGNoYW5nZV9pZCI6IjYzYzdjYWJmMmNmYmU4ZGUxOGUxN2M5OSIsIm1ldGFkYXRhIjp7ImNsaWVudF9uYW1lIjoiTWljcm9zb2Z0IENvcnBvcmF0aW9uIGlvbiIsImxvZ29fdXJpIjoiaHR0cHM6Ly9hZ3NvbC5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMTgvMDkvbmV3LW1pY3Jvc29mdC1sb2dvLVNJWkVELVNRVUFSRS5qcGciLCJ0b3NfdXJpIjoiaHR0cHM6Ly93d3cudmVsb2NpdHlleHBlcmllbmNlY2VudGVyLmNvbS90ZXJtcy1hbmQtY29uZGl0aW9ucy12bmYiLCJtYXhfcmV0ZW50aW9uX3BlcmlvZCI6IiIsInByb2dyZXNzX3VyaSI6Imh0dHBzOi8vZGV2YWdlbnQudmVsb2NpdHljYXJlZXJsYWJzLmlvL2FwaS9ob2xkZXIvdjAuNi9vcmcvZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3L2dldC1leGNoYW5nZS1wcm9ncmVzcyIsInN1Ym1pdF9wcmVzZW50YXRpb25fdXJpIjoiaHR0cHM6Ly9kZXZhZ2VudC52ZWxvY2l0eWNhcmVlcmxhYnMuaW8vYXBpL2hvbGRlci92MC42L29yZy9kaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHcvaXNzdWUvc3VibWl0LWlkZW50aWZpY2F0aW9uIiwiY2hlY2tfb2ZmZXJzX3VyaSI6Imh0dHBzOi8vZGV2YWdlbnQudmVsb2NpdHljYXJlZXJsYWJzLmlvL2FwaS9ob2xkZXIvdjAuNi9vcmcvZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3L2lzc3VlL2NyZWRlbnRpYWwtb2ZmZXJzIiwiZmluYWxpemVfb2ZmZXJzX3VyaSI6Imh0dHBzOi8vZGV2YWdlbnQudmVsb2NpdHljYXJlZXJsYWJzLmlvL2FwaS9ob2xkZXIvdjAuNi9vcmcvZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3L2lzc3VlL2ZpbmFsaXplLW9mZmVycyJ9LCJwcmVzZW50YXRpb25fZGVmaW5pdGlvbiI6eyJpZCI6IjYzYzdjYWJmMmNmYmU4ZGUxOGUxN2M5OS42MjFjOWJlZWM4ZmEzNGI4ZTcyZDVmYzciLCJwdXJwb3NlIjoiIiwibmFtZSI6IlNoYXJlIHlvdXIgSWQsIEVtYWlsIGFuZCBQaG9uZSBOdW1iZXIgdG8gZmFjaWxpdGF0ZSB0aGUgc2VhcmNoIGZvciB5b3VyIGNhcmVlciBjcmVkZW50aWFscyIsImZvcm1hdCI6eyJqd3RfdnAiOnsiYWxnIjpbInNlY3AyNTZrMSJdfX0sImlucHV0X2Rlc2NyaXB0b3JzIjpbeyJpZCI6IlBhc3Nwb3J0VjEuMCIsIm5hbWUiOiJQYXNzcG9ydCIsInNjaGVtYSI6W3sidXJpIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9wYXNzcG9ydC12MS4wLnNjaGVtYS5qc29uIn1dLCJncm91cCI6WyJBIl19LHsiaWQiOiJFbWFpbFYxLjAiLCJuYW1lIjoiRW1haWwiLCJzY2hlbWEiOlt7InVyaSI6Imh0dHBzOi8vZGV2cmVnaXN0cmFyLnZlbG9jaXR5bmV0d29yay5mb3VuZGF0aW9uL3NjaGVtYXMvZW1haWwtdjEuMC5zY2hlbWEuanNvbiJ9XSwiZ3JvdXAiOlsiQSJdfSx7ImlkIjoiUGhvbmVWMS4wIiwibmFtZSI6IlBob25lIiwic2NoZW1hIjpbeyJ1cmkiOiJodHRwczovL2RldnJlZ2lzdHJhci52ZWxvY2l0eW5ldHdvcmsuZm91bmRhdGlvbi9zY2hlbWFzL3Bob25lLXYxLjAuc2NoZW1hLmpzb24ifV0sImdyb3VwIjpbIkEiXX0seyJpZCI6IkRyaXZlcnNMaWNlbnNlVjEuMCIsIm5hbWUiOiJEcml2ZXIncyBsaWNlbnNlIiwic2NoZW1hIjpbeyJ1cmkiOiJodHRwczovL2RldnJlZ2lzdHJhci52ZWxvY2l0eW5ldHdvcmsuZm91bmRhdGlvbi9zY2hlbWFzL2RyaXZlcnMtbGljZW5zZS12MS4wLnNjaGVtYS5qc29uIn1dLCJncm91cCI6WyJBIl19LHsiaWQiOiJOYXRpb25hbElkQ2FyZFYxLjAiLCJuYW1lIjoiTmF0aW9uYWwgSUQgY2FyZCIsInNjaGVtYSI6W3sidXJpIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9uYXRpb25hbC1pZC1jYXJkLXYxLjAuc2NoZW1hLmpzb24ifV0sImdyb3VwIjpbIkEiXX1dLCJzdWJtaXNzaW9uX3JlcXVpcmVtZW50cyI6W3sicnVsZSI6ImFsbCIsImZyb20iOiJBIiwibWluIjo1fV19LCJvdXRwdXRfZGVzY3JpcHRvcnMiOltdLCJpc3N1ZXIiOnsiaWQiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHcifSwibmJmIjoxNjc0MDM3OTUxLCJpc3MiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHciLCJleHAiOjE2NzQ2NDI3NTEsImlhdCI6MTY3NDAzNzk1MX0.uelHUF5RJA8PIB-3CEzdqk_c4aThz_F-VDM92etzcmFOjheT72MeboCT2mPwBfiMl5Pb3nrx3IaDRMgHjU5rNA'
            }
        },
        vclToken: null,
        default: null,
        jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksiLCJraWQiOiJkaWQ6dmVsb2NpdHk6djI6MHg4ZmNjNjY4ZTI0YzI3YjMwNTI2OWQyZmRiMjNlOTAzMWQ0YWIzZTAzOjE3NTQyNjk5MDkxOTMzOToxOTkwI2tleS0xIn0.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIkJhZGdlVjEuMSIsIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdGF0dXMiOnsidHlwZSI6IlZlbG9jaXR5UmV2b2NhdGlvbkxpc3RKYW4yMDIxIiwiaWQiOiJldGhlcmV1bToweEQ4OTBGMkQ2MEI0MjlmOWUyNTdGQzBCYzU4RWYyMjM3Nzc2REQ5MUIvZ2V0UmV2b2tlZFN0YXR1cz9hZGRyZXNzPTB4OGZDYzY2OGUyNGMyN2IzMDUyNjlEMmZEYjIzRTkwMzFkNEFCM2UwMyZsaXN0SWQ9MjM2MzYxNjk2NDgxMzgxJmluZGV4PTk1NDUiLCJzdGF0dXNMaXN0SW5kZXgiOjk1NDUsInN0YXR1c0xpc3RDcmVkZW50aWFsIjoiZXRoZXJldW06MHhEODkwRjJENjBCNDI5ZjllMjU3RkMwQmM1OEVmMjIzNzc3NkREOTFCL2dldFJldm9rZWRTdGF0dXM_YWRkcmVzcz0weDhmQ2M2NjhlMjRjMjdiMzA1MjY5RDJmRGIyM0U5MDMxZDRBQjNlMDMmbGlzdElkPTIzNjM2MTY5NjQ4MTM4MSIsImxpbmtDb2RlQ29tbWl0IjoiRWlCR1F2aFc2TnZ0eDUycnFhZ0VBMEZ2UmU5TzIvQXBpWjVWaHI5eEFCcFRSQT09In0sImNvbnRlbnRIYXNoIjp7InR5cGUiOiJWZWxvY2l0eUNvbnRlbnRIYXNoMjAyMCIsInZhbHVlIjoiNTQ3MTg5NjM0ODAxYTM0MTgxMzE4YWZlZDg3MDE0Yjg0NWVmMjkxMzhkYTBkN2ZkZTQzMDM3N2U0NDUyODQzMSJ9LCJjcmVkZW50aWFsU2NoZW1hIjp7ImlkIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9iYWRnZS12MS4xLnNjaGVtYS5qc29uIiwidHlwZSI6Ikpzb25TY2hlbWFWYWxpZGF0b3IyMDE4In0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7IkBjb250ZXh0IjoiaHR0cHM6Ly92ZWxvY2l0eW5ldHdvcmsuZm91bmRhdGlvbi9jb250ZXh0cy9lbXBsb3ltZW50IiwiaGFzQ3JlZGVudGlhbCI6eyJuYW1lIjoiQ29ybmVyc3RvbmUgdGVzdCBpbWFnZSAoaHRtbCkgKEJhZGdlVjEuMSkiLCJkZXNjcmlwdGlvbiI6IkF3YXJkZWQgYW5udWFsbHkgdG8gdXAgdG8gMyB2b2x1bnRlZXJzIGF0IHRoZSBDYW1wbyBWZXJkZSBDYXJlIENlbnRlciIsInR5cGUiOiJCYWRnZUNsYXNzIiwiY3JpdGVyaWEiOiJodHRwczovL3d3dy52ZWxvY2l0eWV4cGVyaWVuY2VjZW50ZXIuY29tL2NhbXBvLXZlcmRlIiwiaXNzdWVyIjp7Im5hbWUiOiJNaWNyb3NvZnQgQ29ycG9yYXRpb24gaW9uIn0sImltYWdlIjoiaHR0cHM6Ly9jb3Jwb3JhdGUxLWRldi5jc29kLmNvbS9jb21tb24vUmVhZEZpbGUuYXNweD9GaWxlTmFtZT1iYWRnZXRlYW1wbGF5ZXJfc21hbGxfODRkOWViZTMtNjQ2YS00YmM2LWI5NzAtMTJjNGQ2NmE2MDNhLnBuZyZTdWJQYXRoPS9hd2FyZF9pbWFnZXMvJmM9JTVlJTVlJTVldiUyZkFrek96REszU2dTJTJid1FOUUhaaHclM2QlM2QiLCJpZCI6IjMzMyIsInRhZ3MiOiJzYW1wbGUtdGFnIn19fSwibmJmIjoxNjc0MDM3OTkwLCJqdGkiOiJkaWQ6dmVsb2NpdHk6djI6MHg4ZmNjNjY4ZTI0YzI3YjMwNTI2OWQyZmRiMjNlOTAzMWQ0YWIzZTAzOjE3NTQyNjk5MDkxOTMzOToxOTkwIiwiaXNzIjoiZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3IiwiaWF0IjoxNjc0MDM3OTkwfQ.AcyPWQS5eAzmj7-QlG-G6rfaJJCTMLSBI1QU3E6FJD95KvrTvHVQ2DpZ1SJZqLqD3GHtiQKsmA2tZesXJw7Pzg',
        output_descriptors: null,
        replacerId: null
    },
    {
        type: ['OpenBadgeV2.0', 'VerifiableCredential'],
        id: 'did:velocity:v2:0x8fcc668e24c27b305269d2fdb23e9031d4ab3e03:175426990919339:1342_olivia.hafez@example.com',
        logo: null,
        vendorCountry: '',
        note: null,
        issuer: {
            id: 'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
            name: 'Microsoft Corporation ion',
            country: null,
            logo: 'https://agsol.com/wp-content/uploads/2018/09/new-microsoft-logo-SIZED-SQUARE.jpg'
        },
        credentialSchema: {
            id: 'https://devlib.velocitynetwork.foundation/schemas/open-badge-v2.0.schema.json',
            type: 'JsonSchemaValidator2018'
        },
        credentialSubject: {
            '@context':
                'https://velocitynetwork.foundation/contexts/employment',
            hasCredential: {
                name: 'Barrista of the Month (OBV2.0)',
                description: 'Tasty Coffee, Every Time',
                type: 'BadgeClass',
                criteria: 'Barrista',
                issuer: {
                    name: 'Microsoft Corporation ion'
                },
                image: 'https://www.imsglobal.org/sites/default/files/Badges/OBv2p0Final/images/imsglobal-logo.png',
                id: '333 2.0',
                tags: 'sample-tag'
            },
            alignment: [
                {
                    targetName: 'Live Online Skin and Wound Management Course',
                    targetUrl:
                        'https://credentialfinder.org/credential/20923/Live_Online_Skin_and_Wound_Management_Course',
                    targetDescription:
                        'This course offers an evidence-based approach to wound management to help clinicians stay current with the standards of care and legally defensible at bedside.',
                    targetFramework: 'Credential Engine'
                }
            ]
        },
        offerId: null,
        userId: 'olivia.hafez@example.com',
        issuanceDate: '2023-01-18T10:33:10.995Z',
        isNewWaiting: null,
        withoutAccept: null,
        saveOfferDate: null,
        vendor: null,
        hash: '53d57c91447a740b5c918fc7cc7044a2ee2728a585cb9ba028e2056d79b8e715',
        status: 'verified',
        revocationDate: null,
        revocationReason: null,
        additionalInfo: null,
        isNewRevoked: null,
        linkCodeCommitment: {
            value: 'EiCtYECr25WJljrn3RARl8bihpLgT7KV3jKeV1L85/ljug=='
        },
        credentialManifest: {
            iss: 'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
            did: 'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
            exchangeId: '63c7cabf2cfbe8de18e17c99',
            vendorOriginContext: null,
            jwt: {
                encodedJwt:
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksiLCJraWQiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHcjZXhjaGFuZ2Uta2V5LTEifQ.eyJleGNoYW5nZV9pZCI6IjYzYzdjYWJmMmNmYmU4ZGUxOGUxN2M5OSIsIm1ldGFkYXRhIjp7ImNsaWVudF9uYW1lIjoiTWljcm9zb2Z0IENvcnBvcmF0aW9uIGlvbiIsImxvZ29fdXJpIjoiaHR0cHM6Ly9hZ3NvbC5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMTgvMDkvbmV3LW1pY3Jvc29mdC1sb2dvLVNJWkVELVNRVUFSRS5qcGciLCJ0b3NfdXJpIjoiaHR0cHM6Ly93d3cudmVsb2NpdHlleHBlcmllbmNlY2VudGVyLmNvbS90ZXJtcy1hbmQtY29uZGl0aW9ucy12bmYiLCJtYXhfcmV0ZW50aW9uX3BlcmlvZCI6IiIsInByb2dyZXNzX3VyaSI6Imh0dHBzOi8vZGV2YWdlbnQudmVsb2NpdHljYXJlZXJsYWJzLmlvL2FwaS9ob2xkZXIvdjAuNi9vcmcvZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3L2dldC1leGNoYW5nZS1wcm9ncmVzcyIsInN1Ym1pdF9wcmVzZW50YXRpb25fdXJpIjoiaHR0cHM6Ly9kZXZhZ2VudC52ZWxvY2l0eWNhcmVlcmxhYnMuaW8vYXBpL2hvbGRlci92MC42L29yZy9kaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHcvaXNzdWUvc3VibWl0LWlkZW50aWZpY2F0aW9uIiwiY2hlY2tfb2ZmZXJzX3VyaSI6Imh0dHBzOi8vZGV2YWdlbnQudmVsb2NpdHljYXJlZXJsYWJzLmlvL2FwaS9ob2xkZXIvdjAuNi9vcmcvZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3L2lzc3VlL2NyZWRlbnRpYWwtb2ZmZXJzIiwiZmluYWxpemVfb2ZmZXJzX3VyaSI6Imh0dHBzOi8vZGV2YWdlbnQudmVsb2NpdHljYXJlZXJsYWJzLmlvL2FwaS9ob2xkZXIvdjAuNi9vcmcvZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3L2lzc3VlL2ZpbmFsaXplLW9mZmVycyJ9LCJwcmVzZW50YXRpb25fZGVmaW5pdGlvbiI6eyJpZCI6IjYzYzdjYWJmMmNmYmU4ZGUxOGUxN2M5OS42MjFjOWJlZWM4ZmEzNGI4ZTcyZDVmYzciLCJwdXJwb3NlIjoiIiwibmFtZSI6IlNoYXJlIHlvdXIgSWQsIEVtYWlsIGFuZCBQaG9uZSBOdW1iZXIgdG8gZmFjaWxpdGF0ZSB0aGUgc2VhcmNoIGZvciB5b3VyIGNhcmVlciBjcmVkZW50aWFscyIsImZvcm1hdCI6eyJqd3RfdnAiOnsiYWxnIjpbInNlY3AyNTZrMSJdfX0sImlucHV0X2Rlc2NyaXB0b3JzIjpbeyJpZCI6IlBhc3Nwb3J0VjEuMCIsIm5hbWUiOiJQYXNzcG9ydCIsInNjaGVtYSI6W3sidXJpIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9wYXNzcG9ydC12MS4wLnNjaGVtYS5qc29uIn1dLCJncm91cCI6WyJBIl19LHsiaWQiOiJFbWFpbFYxLjAiLCJuYW1lIjoiRW1haWwiLCJzY2hlbWEiOlt7InVyaSI6Imh0dHBzOi8vZGV2cmVnaXN0cmFyLnZlbG9jaXR5bmV0d29yay5mb3VuZGF0aW9uL3NjaGVtYXMvZW1haWwtdjEuMC5zY2hlbWEuanNvbiJ9XSwiZ3JvdXAiOlsiQSJdfSx7ImlkIjoiUGhvbmVWMS4wIiwibmFtZSI6IlBob25lIiwic2NoZW1hIjpbeyJ1cmkiOiJodHRwczovL2RldnJlZ2lzdHJhci52ZWxvY2l0eW5ldHdvcmsuZm91bmRhdGlvbi9zY2hlbWFzL3Bob25lLXYxLjAuc2NoZW1hLmpzb24ifV0sImdyb3VwIjpbIkEiXX0seyJpZCI6IkRyaXZlcnNMaWNlbnNlVjEuMCIsIm5hbWUiOiJEcml2ZXIncyBsaWNlbnNlIiwic2NoZW1hIjpbeyJ1cmkiOiJodHRwczovL2RldnJlZ2lzdHJhci52ZWxvY2l0eW5ldHdvcmsuZm91bmRhdGlvbi9zY2hlbWFzL2RyaXZlcnMtbGljZW5zZS12MS4wLnNjaGVtYS5qc29uIn1dLCJncm91cCI6WyJBIl19LHsiaWQiOiJOYXRpb25hbElkQ2FyZFYxLjAiLCJuYW1lIjoiTmF0aW9uYWwgSUQgY2FyZCIsInNjaGVtYSI6W3sidXJpIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9uYXRpb25hbC1pZC1jYXJkLXYxLjAuc2NoZW1hLmpzb24ifV0sImdyb3VwIjpbIkEiXX1dLCJzdWJtaXNzaW9uX3JlcXVpcmVtZW50cyI6W3sicnVsZSI6ImFsbCIsImZyb20iOiJBIiwibWluIjo1fV19LCJvdXRwdXRfZGVzY3JpcHRvcnMiOltdLCJpc3N1ZXIiOnsiaWQiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHcifSwibmJmIjoxNjc0MDM3OTUxLCJpc3MiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHciLCJleHAiOjE2NzQ2NDI3NTEsImlhdCI6MTY3NDAzNzk1MX0.uelHUF5RJA8PIB-3CEzdqk_c4aThz_F-VDM92etzcmFOjheT72MeboCT2mPwBfiMl5Pb3nrx3IaDRMgHjU5rNA'
            }
        },
        vclToken: null,
        default: null,
        jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksiLCJraWQiOiJkaWQ6dmVsb2NpdHk6djI6MHg4ZmNjNjY4ZTI0YzI3YjMwNTI2OWQyZmRiMjNlOTAzMWQ0YWIzZTAzOjE3NTQyNjk5MDkxOTMzOToxMzQyI2tleS0xIn0.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIk9wZW5CYWRnZVYyLjAiLCJWZXJpZmlhYmxlQ3JlZGVudGlhbCJdLCJjcmVkZW50aWFsU3RhdHVzIjp7InR5cGUiOiJWZWxvY2l0eVJldm9jYXRpb25MaXN0SmFuMjAyMSIsImlkIjoiZXRoZXJldW06MHhEODkwRjJENjBCNDI5ZjllMjU3RkMwQmM1OEVmMjIzNzc3NkREOTFCL2dldFJldm9rZWRTdGF0dXM_YWRkcmVzcz0weDhmQ2M2NjhlMjRjMjdiMzA1MjY5RDJmRGIyM0U5MDMxZDRBQjNlMDMmbGlzdElkPTIzNjM2MTY5NjQ4MTM4MSZpbmRleD02NjQzIiwic3RhdHVzTGlzdEluZGV4Ijo2NjQzLCJzdGF0dXNMaXN0Q3JlZGVudGlhbCI6ImV0aGVyZXVtOjB4RDg5MEYyRDYwQjQyOWY5ZTI1N0ZDMEJjNThFZjIyMzc3NzZERDkxQi9nZXRSZXZva2VkU3RhdHVzP2FkZHJlc3M9MHg4ZkNjNjY4ZTI0YzI3YjMwNTI2OUQyZkRiMjNFOTAzMWQ0QUIzZTAzJmxpc3RJZD0yMzYzNjE2OTY0ODEzODEiLCJsaW5rQ29kZUNvbW1pdCI6IkVpQ3RZRUNyMjVXSmxqcm4zUkFSbDhiaWhwTGdUN0tWM2pLZVYxTDg1L2xqdWc9PSJ9LCJjb250ZW50SGFzaCI6eyJ0eXBlIjoiVmVsb2NpdHlDb250ZW50SGFzaDIwMjAiLCJ2YWx1ZSI6IjUzZDU3YzkxNDQ3YTc0MGI1YzkxOGZjN2NjNzA0NGEyZWUyNzI4YTU4NWNiOWJhMDI4ZTIwNTZkNzliOGU3MTUifSwiY3JlZGVudGlhbFNjaGVtYSI6eyJpZCI6Imh0dHBzOi8vZGV2cmVnaXN0cmFyLnZlbG9jaXR5bmV0d29yay5mb3VuZGF0aW9uL3NjaGVtYXMvb3Blbi1iYWRnZS12Mi4wLnNjaGVtYS5qc29uIiwidHlwZSI6Ikpzb25TY2hlbWFWYWxpZGF0b3IyMDE4In0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7IkBjb250ZXh0IjoiaHR0cHM6Ly92ZWxvY2l0eW5ldHdvcmsuZm91bmRhdGlvbi9jb250ZXh0cy9lbXBsb3ltZW50IiwiaGFzQ3JlZGVudGlhbCI6eyJuYW1lIjoiQmFycmlzdGEgb2YgdGhlIE1vbnRoIChPQlYyLjApIiwiZGVzY3JpcHRpb24iOiJUYXN0eSBDb2ZmZWUsIEV2ZXJ5IFRpbWUiLCJ0eXBlIjoiQmFkZ2VDbGFzcyIsImNyaXRlcmlhIjoiQmFycmlzdGEiLCJpc3N1ZXIiOnsibmFtZSI6Ik1pY3Jvc29mdCBDb3Jwb3JhdGlvbiBpb24ifSwiaW1hZ2UiOiJodHRwczovL3d3dy5pbXNnbG9iYWwub3JnL3NpdGVzL2RlZmF1bHQvZmlsZXMvQmFkZ2VzL09CdjJwMEZpbmFsL2ltYWdlcy9pbXNnbG9iYWwtbG9nby5wbmciLCJpZCI6IjMzMyAyLjAiLCJ0YWdzIjoic2FtcGxlLXRhZyJ9LCJhbGlnbm1lbnQiOlt7InRhcmdldE5hbWUiOiJMaXZlIE9ubGluZSBTa2luIGFuZCBXb3VuZCBNYW5hZ2VtZW50IENvdXJzZSIsInRhcmdldFVybCI6Imh0dHBzOi8vY3JlZGVudGlhbGZpbmRlci5vcmcvY3JlZGVudGlhbC8yMDkyMy9MaXZlX09ubGluZV9Ta2luX2FuZF9Xb3VuZF9NYW5hZ2VtZW50X0NvdXJzZSIsInRhcmdldERlc2NyaXB0aW9uIjoiVGhpcyBjb3Vyc2Ugb2ZmZXJzIGFuIGV2aWRlbmNlLWJhc2VkIGFwcHJvYWNoIHRvIHdvdW5kIG1hbmFnZW1lbnQgdG8gaGVscCBjbGluaWNpYW5zIHN0YXkgY3VycmVudCB3aXRoIHRoZSBzdGFuZGFyZHMgb2YgY2FyZSBhbmQgbGVnYWxseSBkZWZlbnNpYmxlIGF0IGJlZHNpZGUuIiwidGFyZ2V0RnJhbWV3b3JrIjoiQ3JlZGVudGlhbCBFbmdpbmUifV19fSwibmJmIjoxNjc0MDM3OTkwLCJqdGkiOiJkaWQ6dmVsb2NpdHk6djI6MHg4ZmNjNjY4ZTI0YzI3YjMwNTI2OWQyZmRiMjNlOTAzMWQ0YWIzZTAzOjE3NTQyNjk5MDkxOTMzOToxMzQyIiwiaXNzIjoiZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3IiwiaWF0IjoxNjc0MDM3OTkwfQ.Bl-oIlTlm3Eu9Qm34mj5ueGC69Lo7-gVecz1a7C9DnN973rZ3IZf2MdhPKGkA3J4l1R-BTeszNBlfS2p4peW8Q',
        output_descriptors: null,
        replacerId: null
    },
    {
        type: ['BadgeV1.1', 'VerifiableCredential'],
        id: 'did:velocity:v2:0x8fcc668e24c27b305269d2fdb23e9031d4ab3e03:175426990919339:6648_olivia.hafez@example.com',
        logo: null,
        vendorCountry: '',
        note: null,
        issuer: {
            id: 'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
            name: 'Microsoft Corporation ion',
            country: null,
            logo: 'https://agsol.com/wp-content/uploads/2018/09/new-microsoft-logo-SIZED-SQUARE.jpg'
        },
        credentialSchema: {
            id: 'https://devlib.velocitynetwork.foundation/schemas/badge-v1.1.schema.json',
            type: 'JsonSchemaValidator2018'
        },
        credentialSubject: {
            '@context':
                'https://velocitynetwork.foundation/contexts/employment',
            hasCredential: {
                name: 'Volunteer of the year 2018 (BadgeV1.1)',
                description:
                    'Awarded annually to up to 3 volunteers at the Campo Verde Care Center',
                type: 'BadgeClass',
                criteria:
                    'https://www.velocityexperiencecenter.com/campo-verde',
                issuer: {
                    name: 'Microsoft Corporation ion'
                },
                image: 'https://agsol.com/wp-content/uploads/2018/09/new-microsoft-logo-SIZED-SQUARE.jpg',
                id: '333',
                tags: 'sample-tag'
            },
            recipient: {
                givenName: 'Olivia',
                familyName: 'Hafez',
                middleName: 'Melanie',
                namePrefix: 'Dr.',
                nameSuffix: 'Mrs.'
            },
            alignment: [
                {
                    targetName: 'Live Online Skin and Wound Management Course',
                    targetUrl:
                        'https://credentialfinder.org/credential/20923/Live_Online_Skin_and_Wound_Management_Course',
                    targetDescription:
                        'This course offers an evidence-based approach to wound management to help clinicians stay current with the standards of care and legally defensible at bedside.',
                    targetFramework: 'Credential Engine'
                }
            ]
        },
        offerId: null,
        userId: 'olivia.hafez@example.com',
        issuanceDate: '2023-01-18T10:33:10.958Z',
        isNewWaiting: null,
        withoutAccept: null,
        saveOfferDate: null,
        vendor: null,
        hash: 'cb07df4125b39668c457b000892e65f040adf1aea2a89c4d74f89c44d2756735',
        status: 'verified',
        revocationDate: null,
        revocationReason: null,
        additionalInfo: null,
        isNewRevoked: null,
        linkCodeCommitment: {
            value: 'EiDUUS+ShFubrit8J/Olo1e1oFL8vRhwsArFcElfu/cgkQ=='
        },
        credentialManifest: {
            iss: 'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
            did: 'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
            exchangeId: '63c7cabf2cfbe8de18e17c99',
            vendorOriginContext: null,
            jwt: {
                encodedJwt:
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksiLCJraWQiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHcjZXhjaGFuZ2Uta2V5LTEifQ.eyJleGNoYW5nZV9pZCI6IjYzYzdjYWJmMmNmYmU4ZGUxOGUxN2M5OSIsIm1ldGFkYXRhIjp7ImNsaWVudF9uYW1lIjoiTWljcm9zb2Z0IENvcnBvcmF0aW9uIGlvbiIsImxvZ29fdXJpIjoiaHR0cHM6Ly9hZ3NvbC5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMTgvMDkvbmV3LW1pY3Jvc29mdC1sb2dvLVNJWkVELVNRVUFSRS5qcGciLCJ0b3NfdXJpIjoiaHR0cHM6Ly93d3cudmVsb2NpdHlleHBlcmllbmNlY2VudGVyLmNvbS90ZXJtcy1hbmQtY29uZGl0aW9ucy12bmYiLCJtYXhfcmV0ZW50aW9uX3BlcmlvZCI6IiIsInByb2dyZXNzX3VyaSI6Imh0dHBzOi8vZGV2YWdlbnQudmVsb2NpdHljYXJlZXJsYWJzLmlvL2FwaS9ob2xkZXIvdjAuNi9vcmcvZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3L2dldC1leGNoYW5nZS1wcm9ncmVzcyIsInN1Ym1pdF9wcmVzZW50YXRpb25fdXJpIjoiaHR0cHM6Ly9kZXZhZ2VudC52ZWxvY2l0eWNhcmVlcmxhYnMuaW8vYXBpL2hvbGRlci92MC42L29yZy9kaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHcvaXNzdWUvc3VibWl0LWlkZW50aWZpY2F0aW9uIiwiY2hlY2tfb2ZmZXJzX3VyaSI6Imh0dHBzOi8vZGV2YWdlbnQudmVsb2NpdHljYXJlZXJsYWJzLmlvL2FwaS9ob2xkZXIvdjAuNi9vcmcvZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3L2lzc3VlL2NyZWRlbnRpYWwtb2ZmZXJzIiwiZmluYWxpemVfb2ZmZXJzX3VyaSI6Imh0dHBzOi8vZGV2YWdlbnQudmVsb2NpdHljYXJlZXJsYWJzLmlvL2FwaS9ob2xkZXIvdjAuNi9vcmcvZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3L2lzc3VlL2ZpbmFsaXplLW9mZmVycyJ9LCJwcmVzZW50YXRpb25fZGVmaW5pdGlvbiI6eyJpZCI6IjYzYzdjYWJmMmNmYmU4ZGUxOGUxN2M5OS42MjFjOWJlZWM4ZmEzNGI4ZTcyZDVmYzciLCJwdXJwb3NlIjoiIiwibmFtZSI6IlNoYXJlIHlvdXIgSWQsIEVtYWlsIGFuZCBQaG9uZSBOdW1iZXIgdG8gZmFjaWxpdGF0ZSB0aGUgc2VhcmNoIGZvciB5b3VyIGNhcmVlciBjcmVkZW50aWFscyIsImZvcm1hdCI6eyJqd3RfdnAiOnsiYWxnIjpbInNlY3AyNTZrMSJdfX0sImlucHV0X2Rlc2NyaXB0b3JzIjpbeyJpZCI6IlBhc3Nwb3J0VjEuMCIsIm5hbWUiOiJQYXNzcG9ydCIsInNjaGVtYSI6W3sidXJpIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9wYXNzcG9ydC12MS4wLnNjaGVtYS5qc29uIn1dLCJncm91cCI6WyJBIl19LHsiaWQiOiJFbWFpbFYxLjAiLCJuYW1lIjoiRW1haWwiLCJzY2hlbWEiOlt7InVyaSI6Imh0dHBzOi8vZGV2cmVnaXN0cmFyLnZlbG9jaXR5bmV0d29yay5mb3VuZGF0aW9uL3NjaGVtYXMvZW1haWwtdjEuMC5zY2hlbWEuanNvbiJ9XSwiZ3JvdXAiOlsiQSJdfSx7ImlkIjoiUGhvbmVWMS4wIiwibmFtZSI6IlBob25lIiwic2NoZW1hIjpbeyJ1cmkiOiJodHRwczovL2RldnJlZ2lzdHJhci52ZWxvY2l0eW5ldHdvcmsuZm91bmRhdGlvbi9zY2hlbWFzL3Bob25lLXYxLjAuc2NoZW1hLmpzb24ifV0sImdyb3VwIjpbIkEiXX0seyJpZCI6IkRyaXZlcnNMaWNlbnNlVjEuMCIsIm5hbWUiOiJEcml2ZXIncyBsaWNlbnNlIiwic2NoZW1hIjpbeyJ1cmkiOiJodHRwczovL2RldnJlZ2lzdHJhci52ZWxvY2l0eW5ldHdvcmsuZm91bmRhdGlvbi9zY2hlbWFzL2RyaXZlcnMtbGljZW5zZS12MS4wLnNjaGVtYS5qc29uIn1dLCJncm91cCI6WyJBIl19LHsiaWQiOiJOYXRpb25hbElkQ2FyZFYxLjAiLCJuYW1lIjoiTmF0aW9uYWwgSUQgY2FyZCIsInNjaGVtYSI6W3sidXJpIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9uYXRpb25hbC1pZC1jYXJkLXYxLjAuc2NoZW1hLmpzb24ifV0sImdyb3VwIjpbIkEiXX1dLCJzdWJtaXNzaW9uX3JlcXVpcmVtZW50cyI6W3sicnVsZSI6ImFsbCIsImZyb20iOiJBIiwibWluIjo1fV19LCJvdXRwdXRfZGVzY3JpcHRvcnMiOltdLCJpc3N1ZXIiOnsiaWQiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHcifSwibmJmIjoxNjc0MDM3OTUxLCJpc3MiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHciLCJleHAiOjE2NzQ2NDI3NTEsImlhdCI6MTY3NDAzNzk1MX0.uelHUF5RJA8PIB-3CEzdqk_c4aThz_F-VDM92etzcmFOjheT72MeboCT2mPwBfiMl5Pb3nrx3IaDRMgHjU5rNA'
            }
        },
        vclToken: null,
        default: null,
        jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksiLCJraWQiOiJkaWQ6dmVsb2NpdHk6djI6MHg4ZmNjNjY4ZTI0YzI3YjMwNTI2OWQyZmRiMjNlOTAzMWQ0YWIzZTAzOjE3NTQyNjk5MDkxOTMzOTo2NjQ4I2tleS0xIn0.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIkJhZGdlVjEuMSIsIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdGF0dXMiOnsidHlwZSI6IlZlbG9jaXR5UmV2b2NhdGlvbkxpc3RKYW4yMDIxIiwiaWQiOiJldGhlcmV1bToweEQ4OTBGMkQ2MEI0MjlmOWUyNTdGQzBCYzU4RWYyMjM3Nzc2REQ5MUIvZ2V0UmV2b2tlZFN0YXR1cz9hZGRyZXNzPTB4OGZDYzY2OGUyNGMyN2IzMDUyNjlEMmZEYjIzRTkwMzFkNEFCM2UwMyZsaXN0SWQ9MjM2MzYxNjk2NDgxMzgxJmluZGV4PTI4NTAiLCJzdGF0dXNMaXN0SW5kZXgiOjI4NTAsInN0YXR1c0xpc3RDcmVkZW50aWFsIjoiZXRoZXJldW06MHhEODkwRjJENjBCNDI5ZjllMjU3RkMwQmM1OEVmMjIzNzc3NkREOTFCL2dldFJldm9rZWRTdGF0dXM_YWRkcmVzcz0weDhmQ2M2NjhlMjRjMjdiMzA1MjY5RDJmRGIyM0U5MDMxZDRBQjNlMDMmbGlzdElkPTIzNjM2MTY5NjQ4MTM4MSIsImxpbmtDb2RlQ29tbWl0IjoiRWlEVVVTK1NoRnVicml0OEovT2xvMWUxb0ZMOHZSaHdzQXJGY0VsZnUvY2drUT09In0sImNvbnRlbnRIYXNoIjp7InR5cGUiOiJWZWxvY2l0eUNvbnRlbnRIYXNoMjAyMCIsInZhbHVlIjoiY2IwN2RmNDEyNWIzOTY2OGM0NTdiMDAwODkyZTY1ZjA0MGFkZjFhZWEyYTg5YzRkNzRmODljNDRkMjc1NjczNSJ9LCJjcmVkZW50aWFsU2NoZW1hIjp7ImlkIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9iYWRnZS12MS4xLnNjaGVtYS5qc29uIiwidHlwZSI6Ikpzb25TY2hlbWFWYWxpZGF0b3IyMDE4In0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7IkBjb250ZXh0IjoiaHR0cHM6Ly92ZWxvY2l0eW5ldHdvcmsuZm91bmRhdGlvbi9jb250ZXh0cy9lbXBsb3ltZW50IiwiaGFzQ3JlZGVudGlhbCI6eyJuYW1lIjoiVm9sdW50ZWVyIG9mIHRoZSB5ZWFyIDIwMTggKEJhZGdlVjEuMSkiLCJkZXNjcmlwdGlvbiI6IkF3YXJkZWQgYW5udWFsbHkgdG8gdXAgdG8gMyB2b2x1bnRlZXJzIGF0IHRoZSBDYW1wbyBWZXJkZSBDYXJlIENlbnRlciIsInR5cGUiOiJCYWRnZUNsYXNzIiwiY3JpdGVyaWEiOiJodHRwczovL3d3dy52ZWxvY2l0eWV4cGVyaWVuY2VjZW50ZXIuY29tL2NhbXBvLXZlcmRlIiwiaXNzdWVyIjp7Im5hbWUiOiJNaWNyb3NvZnQgQ29ycG9yYXRpb24gaW9uIn0sImltYWdlIjoiaHR0cHM6Ly9hZ3NvbC5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMTgvMDkvbmV3LW1pY3Jvc29mdC1sb2dvLVNJWkVELVNRVUFSRS5qcGciLCJpZCI6IjMzMyIsInRhZ3MiOiJzYW1wbGUtdGFnIn0sInJlY2lwaWVudCI6eyJnaXZlbk5hbWUiOiJPbGl2aWEiLCJmYW1pbHlOYW1lIjoiSGFmZXoiLCJtaWRkbGVOYW1lIjoiTWVsYW5pZSIsIm5hbWVQcmVmaXgiOiJEci4iLCJuYW1lU3VmZml4IjoiTXJzLiJ9LCJhbGlnbm1lbnQiOlt7InRhcmdldE5hbWUiOiJMaXZlIE9ubGluZSBTa2luIGFuZCBXb3VuZCBNYW5hZ2VtZW50IENvdXJzZSIsInRhcmdldFVybCI6Imh0dHBzOi8vY3JlZGVudGlhbGZpbmRlci5vcmcvY3JlZGVudGlhbC8yMDkyMy9MaXZlX09ubGluZV9Ta2luX2FuZF9Xb3VuZF9NYW5hZ2VtZW50X0NvdXJzZSIsInRhcmdldERlc2NyaXB0aW9uIjoiVGhpcyBjb3Vyc2Ugb2ZmZXJzIGFuIGV2aWRlbmNlLWJhc2VkIGFwcHJvYWNoIHRvIHdvdW5kIG1hbmFnZW1lbnQgdG8gaGVscCBjbGluaWNpYW5zIHN0YXkgY3VycmVudCB3aXRoIHRoZSBzdGFuZGFyZHMgb2YgY2FyZSBhbmQgbGVnYWxseSBkZWZlbnNpYmxlIGF0IGJlZHNpZGUuIiwidGFyZ2V0RnJhbWV3b3JrIjoiQ3JlZGVudGlhbCBFbmdpbmUifV19fSwibmJmIjoxNjc0MDM3OTkwLCJqdGkiOiJkaWQ6dmVsb2NpdHk6djI6MHg4ZmNjNjY4ZTI0YzI3YjMwNTI2OWQyZmRiMjNlOTAzMWQ0YWIzZTAzOjE3NTQyNjk5MDkxOTMzOTo2NjQ4IiwiaXNzIjoiZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3IiwiaWF0IjoxNjc0MDM3OTkwfQ.Jyqqrm8AOJTWy-gKRim9Vod3drtYS_Cy-y6ufuRD1xWbEbC4vak-kXRwFCYJvFdBRsIXcusSAsnQbs-1YSJPhQ',
        output_descriptors: null,
        replacerId: null
    },
    {
        type: ['OpenBadgeV1.0', 'VerifiableCredential'],
        id: 'did:velocity:v2:0x8fcc668e24c27b305269d2fdb23e9031d4ab3e03:175426990919339:5082_olivia.hafez@example.com',
        logo: null,
        vendorCountry: '',
        note: null,
        issuer: {
            id: 'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
            name: 'Microsoft Corporation ion',
            country: null,
            logo: 'https://agsol.com/wp-content/uploads/2018/09/new-microsoft-logo-SIZED-SQUARE.jpg'
        },
        credentialSchema: {
            id: 'https://devlib.velocitynetwork.foundation/schemas/open-badge-v1.0.schema.json',
            type: 'JsonSchemaValidator2018'
        },
        credentialSubject: {
            '@context':
                'https://velocitynetwork.foundation/contexts/employment',
            hasCredential: {
                name: 'Hackathon Challenge Winner (OpenBadgeV1.0)',
                description:
                    'Active participation in a winning hackathon team, designing an innovative solution to an existing business problem.',
                type: 'BadgeClass',
                criteria: 'https://www.velocityexperiencecenter.com/Hackathon',
                issuer: {
                    name: 'Microsoft Corporation ion'
                },
                image: 'https://docs.velocitycareerlabs.io/Logos/Badge-Microsoft-2-2018.png',
                id: 'OpenBadge 1.0',
                tags: ['#sample-tag'],
                alignment: [
                    {
                        targetName: 'Challenge Winner 1',
                        targetUrl: 'https://www.hackathon.eu',
                        targetDescription: 'Test Description Data'
                    }
                ]
            }
        },
        offerId: null,
        userId: 'olivia.hafez@example.com',
        issuanceDate: '2023-01-18T10:33:10.983Z',
        isNewWaiting: null,
        withoutAccept: null,
        saveOfferDate: null,
        vendor: null,
        hash: '59f4420886a5dc84b9611fc67e3059ad82c45c2254379cdce4d9b1da87f1abeb',
        status: 'verified',
        revocationDate: null,
        revocationReason: null,
        additionalInfo: null,
        isNewRevoked: null,
        linkCodeCommitment: {
            value: 'EiB+Y0vkz9ob3vBsyh6zPOh0Wx0orghrn3J5FAsFEpdPEQ=='
        },
        credentialManifest: {
            iss: 'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
            did: 'did:ion:EiAbP9xvCYnUOiLwqgbkV4auH_26Pv7BT2pYYT3masvvhw',
            exchangeId: '63c7cabf2cfbe8de18e17c99',
            vendorOriginContext: null,
            jwt: {
                encodedJwt:
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksiLCJraWQiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHcjZXhjaGFuZ2Uta2V5LTEifQ.eyJleGNoYW5nZV9pZCI6IjYzYzdjYWJmMmNmYmU4ZGUxOGUxN2M5OSIsIm1ldGFkYXRhIjp7ImNsaWVudF9uYW1lIjoiTWljcm9zb2Z0IENvcnBvcmF0aW9uIGlvbiIsImxvZ29fdXJpIjoiaHR0cHM6Ly9hZ3NvbC5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMTgvMDkvbmV3LW1pY3Jvc29mdC1sb2dvLVNJWkVELVNRVUFSRS5qcGciLCJ0b3NfdXJpIjoiaHR0cHM6Ly93d3cudmVsb2NpdHlleHBlcmllbmNlY2VudGVyLmNvbS90ZXJtcy1hbmQtY29uZGl0aW9ucy12bmYiLCJtYXhfcmV0ZW50aW9uX3BlcmlvZCI6IiIsInByb2dyZXNzX3VyaSI6Imh0dHBzOi8vZGV2YWdlbnQudmVsb2NpdHljYXJlZXJsYWJzLmlvL2FwaS9ob2xkZXIvdjAuNi9vcmcvZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3L2dldC1leGNoYW5nZS1wcm9ncmVzcyIsInN1Ym1pdF9wcmVzZW50YXRpb25fdXJpIjoiaHR0cHM6Ly9kZXZhZ2VudC52ZWxvY2l0eWNhcmVlcmxhYnMuaW8vYXBpL2hvbGRlci92MC42L29yZy9kaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHcvaXNzdWUvc3VibWl0LWlkZW50aWZpY2F0aW9uIiwiY2hlY2tfb2ZmZXJzX3VyaSI6Imh0dHBzOi8vZGV2YWdlbnQudmVsb2NpdHljYXJlZXJsYWJzLmlvL2FwaS9ob2xkZXIvdjAuNi9vcmcvZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3L2lzc3VlL2NyZWRlbnRpYWwtb2ZmZXJzIiwiZmluYWxpemVfb2ZmZXJzX3VyaSI6Imh0dHBzOi8vZGV2YWdlbnQudmVsb2NpdHljYXJlZXJsYWJzLmlvL2FwaS9ob2xkZXIvdjAuNi9vcmcvZGlkOmlvbjpFaUFiUDl4dkNZblVPaUx3cWdia1Y0YXVIXzI2UHY3QlQycFlZVDNtYXN2dmh3L2lzc3VlL2ZpbmFsaXplLW9mZmVycyJ9LCJwcmVzZW50YXRpb25fZGVmaW5pdGlvbiI6eyJpZCI6IjYzYzdjYWJmMmNmYmU4ZGUxOGUxN2M5OS42MjFjOWJlZWM4ZmEzNGI4ZTcyZDVmYzciLCJwdXJwb3NlIjoiIiwibmFtZSI6IlNoYXJlIHlvdXIgSWQsIEVtYWlsIGFuZCBQaG9uZSBOdW1iZXIgdG8gZmFjaWxpdGF0ZSB0aGUgc2VhcmNoIGZvciB5b3VyIGNhcmVlciBjcmVkZW50aWFscyIsImZvcm1hdCI6eyJqd3RfdnAiOnsiYWxnIjpbInNlY3AyNTZrMSJdfX0sImlucHV0X2Rlc2NyaXB0b3JzIjpbeyJpZCI6IlBhc3Nwb3J0VjEuMCIsIm5hbWUiOiJQYXNzcG9ydCIsInNjaGVtYSI6W3sidXJpIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9wYXNzcG9ydC12MS4wLnNjaGVtYS5qc29uIn1dLCJncm91cCI6WyJBIl19LHsiaWQiOiJFbWFpbFYxLjAiLCJuYW1lIjoiRW1haWwiLCJzY2hlbWEiOlt7InVyaSI6Imh0dHBzOi8vZGV2cmVnaXN0cmFyLnZlbG9jaXR5bmV0d29yay5mb3VuZGF0aW9uL3NjaGVtYXMvZW1haWwtdjEuMC5zY2hlbWEuanNvbiJ9XSwiZ3JvdXAiOlsiQSJdfSx7ImlkIjoiUGhvbmVWMS4wIiwibmFtZSI6IlBob25lIiwic2NoZW1hIjpbeyJ1cmkiOiJodHRwczovL2RldnJlZ2lzdHJhci52ZWxvY2l0eW5ldHdvcmsuZm91bmRhdGlvbi9zY2hlbWFzL3Bob25lLXYxLjAuc2NoZW1hLmpzb24ifV0sImdyb3VwIjpbIkEiXX0seyJpZCI6IkRyaXZlcnNMaWNlbnNlVjEuMCIsIm5hbWUiOiJEcml2ZXIncyBsaWNlbnNlIiwic2NoZW1hIjpbeyJ1cmkiOiJodHRwczovL2RldnJlZ2lzdHJhci52ZWxvY2l0eW5ldHdvcmsuZm91bmRhdGlvbi9zY2hlbWFzL2RyaXZlcnMtbGljZW5zZS12MS4wLnNjaGVtYS5qc29uIn1dLCJncm91cCI6WyJBIl19LHsiaWQiOiJOYXRpb25hbElkQ2FyZFYxLjAiLCJuYW1lIjoiTmF0aW9uYWwgSUQgY2FyZCIsInNjaGVtYSI6W3sidXJpIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9uYXRpb25hbC1pZC1jYXJkLXYxLjAuc2NoZW1hLmpzb24ifV0sImdyb3VwIjpbIkEiXX1dLCJzdWJtaXNzaW9uX3JlcXVpcmVtZW50cyI6W3sicnVsZSI6ImFsbCIsImZyb20iOiJBIiwibWluIjo1fV19LCJvdXRwdXRfZGVzY3JpcHRvcnMiOltdLCJpc3N1ZXIiOnsiaWQiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHcifSwibmJmIjoxNjc0MDM3OTUxLCJpc3MiOiJkaWQ6aW9uOkVpQWJQOXh2Q1luVU9pTHdxZ2JrVjRhdUhfMjZQdjdCVDJwWVlUM21hc3Z2aHciLCJleHAiOjE2NzQ2NDI3NTEsImlhdCI6MTY3NDAzNzk1MX0.uelHUF5RJA8PIB-3CEzdqk_c4aThz_F-VDM92etzcmFOjheT72MeboCT2mPwBfiMl5Pb3nrx3IaDRMgHjU5rNA'
            }
        },
        vclToken: null,
        default: null,
        jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksiLCJraWQiOiJkaWQ6dmVsb2NpdHk6djI6MHg4ZmNjNjY4ZTI0YzI3YjMwNTI2OWQyZmRiMjNlOTAzMWQ0YWIzZTAzOjE3NTQyNjk5MDkxOTMzOTo1MDgyI2tleS0xIn0.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIk9wZW5CYWRnZVYxLjAiLCJWZXJpZmlhYmxlQ3JlZGVudGlhbCJdLCJjcmVkZW50aWFsU3RhdHVzIjp7InR5cGUiOiJWZWxvY2l0eVJldm9jYXRpb25MaXN0SmFuMjAyMSIsImlkIjoiZXRoZXJldW06MHhEODkwRjJENjBCNDI5ZjllMjU3RkMwQmM1OEVmMjIzNzc3NkREOTFCL2dldFJldm9rZWRTdGF0dXM_YWRkcmVzcz0weDhmQ2M2NjhlMjRjMjdiMzA1MjY5RDJmRGIyM0U5MDMxZDRBQjNlMDMmbGlzdElkPTIzNjM2MTY5NjQ4MTM4MSZpbmRleD02NDA1Iiwic3RhdHVzTGlzdEluZGV4Ijo2NDA1LCJzdGF0dXNMaXN0Q3JlZGVudGlhbCI6ImV0aGVyZXVtOjB4RDg5MEYyRDYwQjQyOWY5ZTI1N0ZDMEJjNThFZjIyMzc3NzZERDkxQi9nZXRSZXZva2VkU3RhdHVzP2FkZHJlc3M9MHg4ZkNjNjY4ZTI0YzI3YjMwNTI2OUQyZkRiMjNFOTAzMWQ0QUIzZTAzJmxpc3RJZD0yMzYzNjE2OTY0ODEzODEiLCJsaW5rQ29kZUNvbW1pdCI6IkVpQitZMHZrejlvYjN2QnN5aDZ6UE9oMFd4MG9yZ2hybjNKNUZBc0ZFcGRQRVE9PSJ9LCJjb250ZW50SGFzaCI6eyJ0eXBlIjoiVmVsb2NpdHlDb250ZW50SGFzaDIwMjAiLCJ2YWx1ZSI6IjU5ZjQ0MjA4ODZhNWRjODRiOTYxMWZjNjdlMzA1OWFkODJjNDVjMjI1NDM3OWNkY2U0ZDliMWRhODdmMWFiZWIifSwiY3JlZGVudGlhbFNjaGVtYSI6eyJpZCI6Imh0dHBzOi8vZGV2cmVnaXN0cmFyLnZlbG9jaXR5bmV0d29yay5mb3VuZGF0aW9uL3NjaGVtYXMvb3Blbi1iYWRnZS12MS4wLnNjaGVtYS5qc29uIiwidHlwZSI6Ikpzb25TY2hlbWFWYWxpZGF0b3IyMDE4In0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7IkBjb250ZXh0IjoiaHR0cHM6Ly92ZWxvY2l0eW5ldHdvcmsuZm91bmRhdGlvbi9jb250ZXh0cy9lbXBsb3ltZW50IiwiaGFzQ3JlZGVudGlhbCI6eyJuYW1lIjoiSGFja2F0aG9uIENoYWxsZW5nZSBXaW5uZXIgKE9wZW5CYWRnZVYxLjApIiwiZGVzY3JpcHRpb24iOiJBY3RpdmUgcGFydGljaXBhdGlvbiBpbiBhIHdpbm5pbmcgaGFja2F0aG9uIHRlYW0sIGRlc2lnbmluZyBhbiBpbm5vdmF0aXZlIHNvbHV0aW9uIHRvIGFuIGV4aXN0aW5nIGJ1c2luZXNzIHByb2JsZW0uIiwidHlwZSI6IkJhZGdlQ2xhc3MiLCJjcml0ZXJpYSI6Imh0dHBzOi8vd3d3LnZlbG9jaXR5ZXhwZXJpZW5jZWNlbnRlci5jb20vSGFja2F0aG9uIiwiaXNzdWVyIjp7Im5hbWUiOiJNaWNyb3NvZnQgQ29ycG9yYXRpb24gaW9uIn0sImltYWdlIjoiaHR0cHM6Ly9kb2NzLnZlbG9jaXR5Y2FyZWVybGFicy5pby9Mb2dvcy9CYWRnZS1NaWNyb3NvZnQtMi0yMDE4LnBuZyIsImlkIjoiT3BlbkJhZGdlIDEuMCIsInRhZ3MiOlsiI3NhbXBsZS10YWciXSwiYWxpZ25tZW50IjpbeyJ0YXJnZXROYW1lIjoiQ2hhbGxlbmdlIFdpbm5lciAxIiwidGFyZ2V0VXJsIjoiaHR0cHM6Ly93d3cuaGFja2F0aG9uLmV1IiwidGFyZ2V0RGVzY3JpcHRpb24iOiJUZXN0IERlc2NyaXB0aW9uIERhdGEifV19fX0sIm5iZiI6MTY3NDAzNzk5MCwianRpIjoiZGlkOnZlbG9jaXR5OnYyOjB4OGZjYzY2OGUyNGMyN2IzMDUyNjlkMmZkYjIzZTkwMzFkNGFiM2UwMzoxNzU0MjY5OTA5MTkzMzk6NTA4MiIsImlzcyI6ImRpZDppb246RWlBYlA5eHZDWW5VT2lMd3FnYmtWNGF1SF8yNlB2N0JUMnBZWVQzbWFzdnZodyIsImlhdCI6MTY3NDAzNzk5MH0.VKMW98UsWq3GLm-sfY4dr5o2Pvu6zLzQmXkirbsD8BE-CePrbe44Prv63zdErB7-X_7ysaCvfQTqHK1tnt54fg',
        output_descriptors: null,
        replacerId: null
    }
];
