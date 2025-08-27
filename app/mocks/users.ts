// when you change mockUsers, you should increase USERS_VERSION value to reflect changed users on the UI
export const USERS_VERSION = 1;

export const mockUsers = [
    {
        name: 'Nicole Flores',
        email: 'nicole.flores@example.com',
        image: 'https://docs.velocitycareerlabs.io/personas/nicole-flores.png',
        vcs: [
            {
                jwt_vc:
                    'eyJ0eXAiOiJKV1QiLCJraWQiOiJkaWQ6dmVsb2NpdHk6djI6MHg2MjU2YjE4OTIxZWFiZDM5MzUxZWMyM2YxYzk0Zjg4MDYwNGU3MGU3OjIxMTQ4ODcxODM1NTAwODoyMjE3I2tleS0xIiwiYWxnIjoiRVMyNTZLIn0.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIkRyaXZlcnNMaWNlbnNlVjEuMCIsIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdGF0dXMiOnsidHlwZSI6IlZlbG9jaXR5UmV2b2NhdGlvbkxpc3RKYW4yMDIxIiwiaWQiOiJldGhlcmV1bToweEQ4OTBGMkQ2MEI0MjlmOWUyNTdGQzBCYzU4RWYyMjM3Nzc2REQ5MUIvZ2V0UmV2b2tlZFN0YXR1cz9hZGRyZXNzPTB4MDMwMThFM2EzODk3MzRhRTEyZjE0RTQ0NTQwZkFlYTM1NzkxZkVDNyZsaXN0SWQ9MTYzNTc4ODY2Mjk2NjUzJmluZGV4PTczOTkiLCJzdGF0dXNMaXN0SW5kZXgiOjczOTksInN0YXR1c0xpc3RDcmVkZW50aWFsIjoiZXRoZXJldW06MHhEODkwRjJENjBCNDI5ZjllMjU3RkMwQmM1OEVmMjIzNzc3NkREOTFCL2dldFJldm9rZWRTdGF0dXM_YWRkcmVzcz0weDAzMDE4RTNhMzg5NzM0YUUxMmYxNEU0NDU0MGZBZWEzNTc5MWZFQzcmbGlzdElkPTE2MzU3ODg2NjI5NjY1MyIsImxpbmtDb2RlQ29tbWl0IjoiRWlDMFlkNHpXdWxBYTBMdkszdUlVY0hwNWdFWTFhSW04VkNDLzFBajhPaEVUQT09In0sImNvbnRlbnRIYXNoIjp7InR5cGUiOiJWZWxvY2l0eUNvbnRlbnRIYXNoMjAyMCIsInZhbHVlIjoiOWYyYzdmZjVjODA5NDk4ZTFiMmRkZDZiOTRlYjVlNTE3Mzk5NDAzYjFiMDliNjg1NjRjYWZjYzhlMjE1ZDAxOSJ9LCJjcmVkZW50aWFsU2NoZW1hIjp7ImlkIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9kcml2ZXJzLWxpY2Vuc2UtdjEuMC5zY2hlbWEuanNvbiIsInR5cGUiOiJKc29uU2NoZW1hVmFsaWRhdG9yMjAxOCJ9LCJjcmVkZW50aWFsU3ViamVjdCI6eyJuYW1lOiI6IlRleGFzIERyaXZlciBMaWNlbnNlIiwiYXV0aG9yaXR5Ijp7Im5hbWUiOiJETVYgVGV4YXMiLCJwbGFjZSI6eyJhZGRyZXNzUmVnaW9uIjoiVFgiLCJhZGRyZXNzQ291bnRyeSI6IlVTIn19LCJ2YWxpZGl0eSI6eyJ2YWxpZEZyb20iOiIyMDE1LTAyLTAxIiwidmFsaWRVbnRpbCI6IjIwMjUtMDEtMzAifSwiaWRlbnRpZmllciI6Ilg3NzA1NjQxNDE0MTU1NyIsInBlcnNvbiI6eyJnaXZlbk5hbWUiOiJOaWNvbGUiLCJmYW1pbHlOYW1lIjoiRmxvcmVzIiwiYmlydGhEYXRlIjoiMTk5MC0wMi0wMSIsImdlbmRlciI6IkZlbWFsZSJ9fX0sImlzcyI6ImRpZDppb246RWlBZWhXbXBYNW1IQnVjOTNTSWhQWEY4YnNFeDY4RzZtUGNkSWFMTkdib3pQQSIsImp0aSI6ImRpZDp2ZWxvY2l0eTp2MjoweDYyNTZiMTg5MjFlYWJkMzkzNTFlYzIzZjFjOTRmODgwNjA0ZTcwZTc6MjExNDg4NzE4MzU1MDA4OjIyMTciLCJpYXQiOjE2NTI5MDEyMzUsIm5iZiI6MTY1MjkwMTIzNX0.LC4h0QehAgyDbdwkSDSMcwb5Y6QeuyxJ93wjykV5BwDHxHa1WTAneDAyGkD8jEimzjh275HgJ8oL8aTH23LQYw',
                type: ['DriversLicenseV1.0'],
                output_descriptors: [
                    {
                        id: 'DriversLicenseV1.0',
                        display: {
                            title: {
                                path: ['$.name'],
                                schema: {
                                    type: 'string'
                                },
                                fallback: "Driver's License"
                            },
                            subtitle: {
                                path: ['$.authority.name'],
                                schema: {
                                    type: 'string'
                                },
                                fallback: '-'
                            },
                            summary_detail: {
                                path: ['$.identifier'],
                                schema: {
                                    type: 'string'
                                },
                                fallback: '-'
                            },
                            description: {
                                text: "Driver's license"
                            },
                            properties: [
                                {
                                    label: 'License number',
                                    path: ['$.identifier'],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Country',
                                    path: ['$.authority.place.addressCountry'],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Region or State',
                                    path: ['$.authority.place.addressRegion'],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Date issued',
                                    path: ['$.validity.firstValidFrom'],
                                    schema: {
                                        type: 'string',
                                        format: 'date'
                                    }
                                },
                                {
                                    label: 'Date renewed',
                                    path: ['$.validity.validFrom'],
                                    schema: {
                                        type: 'string',
                                        format: 'date'
                                    }
                                },
                                {
                                    label: 'Valid until',
                                    path: ['$.validity.validUntil'],
                                    schema: {
                                        type: 'string',
                                        format: 'date'
                                    }
                                },
                                {
                                    label: 'Given name',
                                    path: ['$.person.givenName'],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Middle name',
                                    path: ['$.person.additionalName'],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Family name',
                                    path: ['$.person.familyName'],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Name prefix',
                                    path: ['$.person.namePrefix'],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Name suffix',
                                    path: ['$.person.nameSuffix'],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Date of birth',
                                    path: ['$.person.birthDate'],
                                    schema: {
                                        type: 'string',
                                        format: 'date'
                                    }
                                },
                                {
                                    label: 'Country of birth',
                                    path: [
                                        '$.person.birthPlace.addressCountry'
                                    ],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Region or state of birth',
                                    path: ['$.person.birthPlace.addressRegion'],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Place of birth',
                                    path: [
                                        '$.person.birthPlace.addressLocality'
                                    ],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Gender',
                                    path: ['$.person.gender'],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Street address',
                                    path: ['$.streetAddress'],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Address locality',
                                    path: ['$.addressLocality'],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Address region or state',
                                    path: ['$.addressRegion'],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Address post code',
                                    path: ['$.postCode'],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Address country',
                                    path: ['$.addressCountry'],
                                    schema: {
                                        type: 'string'
                                    }
                                }
                            ]
                        }
                    }
                ]
            },
            {
                jwt_vc:
                    'eyJ0eXAiOiJKV1QiLCJraWQiOiJkaWQ6dmVsb2NpdHk6djI6MHg2MjU2YjE4OTIxZWFiZDM5MzUxZWMyM2YxYzk0Zjg4MDYwNGU3MGU3OjIxMTQ4ODcxODM1NTAwODo4NzMxI2tleS0xIiwiYWxnIjoiRVMyNTZLIn0.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIkVtYWlsVjEuMCIsIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdGF0dXMiOnsidHlwZSI6IlZlbG9jaXR5UmV2b2NhdGlvbkxpc3RKYW4yMDIxIiwiaWQiOiJldGhlcmV1bToweEQ4OTBGMkQ2MEI0MjlmOWUyNTdGQzBCYzU4RWYyMjM3Nzc2REQ5MUIvZ2V0UmV2b2tlZFN0YXR1cz9hZGRyZXNzPTB4MDMwMThFM2EzODk3MzRhRTEyZjE0RTQ0NTQwZkFlYTM1NzkxZkVDNyZsaXN0SWQ9MTYzNTc4ODY2Mjk2NjUzJmluZGV4PTM1NTUiLCJzdGF0dXNMaXN0SW5kZXgiOjM1NTUsInN0YXR1c0xpc3RDcmVkZW50aWFsIjoiZXRoZXJldW06MHhEODkwRjJENjBCNDI5ZjllMjU3RkMwQmM1OEVmMjIzNzc3NkREOTFCL2dldFJldm9rZWRTdGF0dXM_YWRkcmVzcz0weDAzMDE4RTNhMzg5NzM0YUUxMmYxNEU0NDU0MGZBZWEzNTc5MWZFQzcmbGlzdElkPTE2MzU3ODg2NjI5NjY1MyIsImxpbmtDb2RlQ29tbWl0IjoiRWlCc3B0bW9ab2pvS2FmZzVxWWNJT1MvcDdzTjBsV2VGQ0JZOFE0d0ZTNmRKdz09In0sImNvbnRlbnRIYXNoIjp7InR5cGUiOiJWZWxvY2l0eUNvbnRlbnRIYXNoMjAyMCIsInZhbHVlIjoiOTY1ZTc3Yzg3MDcwOTEzM2UzZTY0MDI2OGNiZDJmMzIxY2JiYTMxOTk4YTdhY2NkZjZjYzZhNzZiOTQ0ZmMxMCJ9LCJjcmVkZW50aWFsU2NoZW1hIjp7ImlkIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9lbWFpbC12MS4wLnNjaGVtYS5qc29uIiwidHlwZSI6Ikpzb25TY2hlbWFWYWxpZGF0b3IyMDE4In0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImVtYWlsIjoibmljb2xlLmZsb3Jlc0BleGFtcGxlLmNvbSJ9fSwiaXNzIjoiZGlkOmlvbjpFaUFlaFdtcFg1bUhCdWM5M1NJaFBYRjhic0V4NjhHNm1QY2RJYUxOR2JvelBBIiwianRpIjoiZGlkOnZlbG9jaXR5OnYyOjB4NjI1NmIxODkyMWVhYmQzOTM1MWVjMjNmMWM5NGY4ODA2MDRlNzBlNzoyMTE0ODg3MTgzNTUwMDg6ODczMSIsImlhdCI6MTY1MjkwMTIzNSwibmJmIjoxNjUyOTAxMjM1fQ.iXdZV89-cq24km7V-rP6Gt3cE4mpxnmXN2mvyRlw2VoiQRdrCkSm-RD_RIC6yVgkyTY0BAa7wh1irRZrA0Z9nw',
                type: ['EmailV1.0'],
                output_descriptors: [
                    {
                        id: 'EmailV1.0',
                        display: {
                            title: {
                                text: 'Email'
                            },
                            description: {
                                text: 'Email'
                            },
                            subtitle: {
                                path: ['$.email'],
                                schema: {
                                    type: 'string',
                                    format: 'email'
                                },
                                fallback: '-'
                            }
                        }
                    }
                ]
            },
            {
                jwt_vc:
                    'eyJ0eXAiOiJKV1QiLCJraWQiOiJkaWQ6dmVsb2NpdHk6djI6MHg2MjU2YjE4OTIxZWFiZDM5MzUxZWMyM2YxYzk0Zjg4MDYwNGU3MGU3OjIxMTQ4ODcxODM1NTAwODo5NjI1I2tleS0xIiwiYWxnIjoiRVMyNTZLIn0.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlBob25lVjEuMCIsIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdGF0dXMiOnsidHlwZSI6IlZlbG9jaXR5UmV2b2NhdGlvbkxpc3RKYW4yMDIxIiwiaWQiOiJldGhlcmV1bToweEQ4OTBGMkQ2MEI0MjlmOWUyNTdGQzBCYzU4RWYyMjM3Nzc2REQ5MUIvZ2V0UmV2b2tlZFN0YXR1cz9hZGRyZXNzPTB4MDMwMThFM2EzODk3MzRhRTEyZjE0RTQ0NTQwZkFlYTM1NzkxZkVDNyZsaXN0SWQ9MTYzNTc4ODY2Mjk2NjUzJmluZGV4PTYxNTUiLCJzdGF0dXNMaXN0SW5kZXgiOjYxNTUsInN0YXR1c0xpc3RDcmVkZW50aWFsIjoiZXRoZXJldW06MHhEODkwRjJENjBCNDI5ZjllMjU3RkMwQmM1OEVmMjIzNzc3NkREOTFCL2dldFJldm9rZWRTdGF0dXM_YWRkcmVzcz0weDAzMDE4RTNhMzg5NzM0YUUxMmYxNEU0NDU0MGZBZWEzNTc5MWZFQzcmbGlzdElkPTE2MzU3ODg2NjI5NjY1MyIsImxpbmtDb2RlQ29tbWl0IjoiRWlEQVlCTG1JeWtiSUN2QUMyenhJQ0ZGQnpVb2N1Q3FMdnUzQ3NGeno3UHUzUT09In0sImNvbnRlbnRIYXNoIjp7InR5cGUiOiJWZWxvY2l0eUNvbnRlbnRIYXNoMjAyMCIsInZhbHVlIjoiMGNkMTA2YzdjZWQzMzlkNjNjNWZmODc1OTgwMjkzOTliZjM2ZTI3YjNkMjNmYTgzOGVjY2U2NDFlODIyYTkyYSJ9LCJjcmVkZW50aWFsU2NoZW1hIjp7ImlkIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9waG9uZS12MS4wLnNjaGVtYS5qc29uIiwidHlwZSI6Ikpzb25TY2hlbWFWYWxpZGF0b3IyMDE4In0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7InBob25lIjoiKzE2MzAzOTYwMDIyIn19LCJpc3MiOiJkaWQ6aW9uOkVpQWVoV21wWDVtSEJ1YzkzU0loUFhGOGJzRXg2OEc2bVBjZElhTE5HYm96UEEiLCJqdGkiOiJkaWQ6dmVsb2NpdHk6djI6MHg2MjU2YjE4OTIxZWFiZDM5MzUxZWMyM2YxYzk0Zjg4MDYwNGU3MGU3OjIxMTQ4ODcxODM1NTAwODo5NjI1IiwiaWF0IjoxNjUyOTAxMjM1LCJuYmYiOjE2NTI5MDEyMzV9.EtdBz6adKfTkBEzDZH9muVvIWRTr8tVsoEIML-EJUC0JWyIs8QEBXP4VDBDb0E_nnbmzWKUbhrUDSFl9Zu_P3g',
                type: ['PhoneV1.0'],
                output_descriptors: [
                    {
                        id: 'PhoneV1.0',
                        display: {
                            title: {
                                text: 'Phone number'
                            },
                            description: {
                                text: 'Phone'
                            },
                            subtitle: {
                                path: ['$.phone'],
                                schema: {
                                    type: 'string'
                                },
                                fallback: '-'
                            }
                        }
                    }
                ]
            }
        ],
        createdAt: '2022-04-21T09:08:55.936Z',
        updatedAt: '2022-05-22T13:25:40.979Z',
        id: 'nicole.flores@example.com'
    },
    {
        name: 'Vanessa Lin',
        email: 'vanessa.lin@example.com',
        image: 'https://docs.velocitycareerlabs.io/personas/vanessa-lin.png',
        vcs: [
            {
                jwt_vc:
                    'eyJ0eXAiOiJKV1QiLCJraWQiOiJkaWQ6dmVsb2NpdHk6djI6MHg2MjU2YjE4OTIxZWFiZDM5MzUxZWMyM2YxYzk0Zjg4MDYwNGU3MGU3OjIxMTQ4ODcxODM1NTAwODo0MjU3I2tleS0xIiwiYWxnIjoiRVMyNTZLIn0.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIkRyaXZlcnNMaWNlbnNlVjEuMCIsIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdGF0dXMiOnsidHlwZSI6IlZlbG9jaXR5UmV2b2NhdGlvbkxpc3RKYW4yMDIxIiwiaWQiOiJldGhlcmV1bToweEQ4OTBGMkQ2MEI0MjlmOWUyNTdGQzBCYzU4RWYyMjM3Nzc2REQ5MUIvZ2V0UmV2b2tlZFN0YXR1cz9hZGRyZXNzPTB4MDMwMThFM2EzODk3MzRhRTEyZjE0RTQ0NTQwZkFlYTM1NzkxZkVDNyZsaXN0SWQ9MTYzNTc4ODY2Mjk2NjUzJmluZGV4PTE4Iiwic3RhdHVzTGlzdEluZGV4IjoxOCwic3RhdHVzTGlzdENyZWRlbnRpYWwiOiJldGhlcmV1bToweEQ4OTBGMkQ2MEI0MjlmOWUyNTdGQzBCYzU4RWYyMjM3Nzc2REQ5MUIvZ2V0UmV2b2tlZFN0YXR1cz9hZGRyZXNzPTB4MDMwMThFM2EzODk3MzRhRTEyZjE0RTQ0NTQwZkFlYTM1NzkxZkVDNyZsaXN0SWQ9MTYzNTc4ODY2Mjk2NjUzIiwibGlua0NvZGVDb21taXQiOiJFaUQzRTJLNzF0TGNvd1lsUS9wa3VpcHM5UkF5clJUWWhGVE9WOFIyeW1EdEN3PT0ifSwiY29udGVudEhhc2giOnsidHlwZSI6IlZlbG9jaXR5Q29udGVudEhhc2gyMDIwIiwidmFsdWUiOiIzNjRhNzg4NzhlNDIzNmFiMTkxNzg0ZWJhZDI4M2FlODEyNTBkMGFhYTNiNTdjMjdjODkyMGEwNDVhNjZjM2ZiIn0sImNyZWRlbnRpYWxTY2hlbWEiOnsiaWQiOiJodHRwczovL2RldnJlZ2lzdHJhci52ZWxvY2l0eW5ldHdvcmsuZm91bmRhdGlvbi9zY2hlbWFzL2RyaXZlcnMtbGljZW5zZS12MS4wLnNjaGVtYS5qc29uIiwidHlwZSI6Ikpzb25TY2hlbWFWYWxpZGF0b3IyMDE4In0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7Im5hbWU6IjoiVGV4YXMgRHJpdmVy4oCZcyBMaWNlbnNlIiwiYXV0aG9yaXR5Ijp7Im5hbWUiOiJUZXhhcyBEZXBhcnRtZW50IG9mIE1vdG9yIFZlaGljbGVzIiwicGxhY2UiOnsiYWRkcmVzc1JlZ2lvbiI6IlRYIiwiYWRkcmVzc0NvdW50cnkiOiJVUyJ9fSwidmFsaWRpdHkiOnsidmFsaWRGcm9tIjoiMjAxOS0wOC0yMSIsInZhbGlkVW50aWwiOiIyMDI0LTA4LTIxIn0sImlkZW50aWZpZXIiOiJQMjcwNDE5NzgyMTIiLCJwZXJzb24iOnsiZ2l2ZW5OYW1lIjoiVmFuZXNzYSIsImZhbWlseU5hbWUiOiJMaW4iLCJiaXJ0aERhdGUiOiIxOTg4LTA4LTIxIiwiZ2VuZGVyIjoiRmVtYWxlIn19fSwiaXNzIjoiZGlkOmlvbjpFaUFlaFdtcFg1bUhCdWM5M1NJaFBYRjhic0V4NjhHNm1QY2RJYUxOR2JvelBBIiwianRpIjoiZGlkOnZlbG9jaXR5OnYyOjB4NjI1NmIxODkyMWVhYmQzOTM1MWVjMjNmMWM5NGY4ODA2MDRlNzBlNzoyMTE0ODg3MTgzNTUwMDg6NDI1NyIsImlhdCI6MTY1MjkwMTA0MywibmJmIjoxNjUyOTAxMDQzfQ.7RmqXvf97BRPSo7eOntbJTrKPqh2B87APxUc3S41hqGiGQ4QaAyDR8VDV9HEPkIiYLhXcnQClGLa-uVDmXphrQ',
                type: ['DriversLicenseV1.0'],
                output_descriptors: [
                    {
                        id: 'DriversLicenseV1.0',
                        display: {
                            title: {
                                path: ['$.name'],
                                schema: {
                                    type: 'string'
                                },
                                fallback: "Driver's License"
                            },
                            subtitle: {
                                path: ['$.authority.name'],
                                schema: {
                                    type: 'string'
                                },
                                fallback: '-'
                            },
                            summary_detail: {
                                path: ['$.identifier'],
                                schema: {
                                    type: 'string'
                                },
                                fallback: '-'
                            },
                            description: {
                                text: "Driver's license"
                            },
                            properties: [
                                {
                                    label: 'License number',
                                    path: ['$.identifier'],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Country',
                                    path: ['$.authority.place.addressCountry'],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Region or State',
                                    path: ['$.authority.place.addressRegion'],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Date issued',
                                    path: ['$.validity.firstValidFrom'],
                                    schema: {
                                        type: 'string',
                                        format: 'date'
                                    }
                                },
                                {
                                    label: 'Date renewed',
                                    path: ['$.validity.validFrom'],
                                    schema: {
                                        type: 'string',
                                        format: 'date'
                                    }
                                },
                                {
                                    label: 'Valid until',
                                    path: ['$.validity.validUntil'],
                                    schema: {
                                        type: 'string',
                                        format: 'date'
                                    }
                                },
                                {
                                    label: 'Given name',
                                    path: ['$.person.givenName'],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Middle name',
                                    path: ['$.person.additionalName'],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Family name',
                                    path: ['$.person.familyName'],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Name prefix',
                                    path: ['$.person.namePrefix'],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Name suffix',
                                    path: ['$.person.nameSuffix'],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Date of birth',
                                    path: ['$.person.birthDate'],
                                    schema: {
                                        type: 'string',
                                        format: 'date'
                                    }
                                },
                                {
                                    label: 'Country of birth',
                                    path: [
                                        '$.person.birthPlace.addressCountry'
                                    ],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Region or state of birth',
                                    path: ['$.person.birthPlace.addressRegion'],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Place of birth',
                                    path: [
                                        '$.person.birthPlace.addressLocality'
                                    ],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Gender',
                                    path: ['$.person.gender'],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Street address',
                                    path: ['$.streetAddress'],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Address locality',
                                    path: ['$.addressLocality'],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Address region or state',
                                    path: ['$.addressRegion'],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Address post code',
                                    path: ['$.postCode'],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Address country',
                                    path: ['$.addressCountry'],
                                    schema: {
                                        type: 'string'
                                    }
                                }
                            ]
                        }
                    }
                ]
            },
            {
                jwt_vc:
                    'eyJ0eXAiOiJKV1QiLCJraWQiOiJkaWQ6dmVsb2NpdHk6djI6MHg2MjU2YjE4OTIxZWFiZDM5MzUxZWMyM2YxYzk0Zjg4MDYwNGU3MGU3OjIxMTQ4ODcxODM1NTAwODo2NTkwI2tleS0xIiwiYWxnIjoiRVMyNTZLIn0.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIkVtYWlsVjEuMCIsIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdGF0dXMiOnsidHlwZSI6IlZlbG9jaXR5UmV2b2NhdGlvbkxpc3RKYW4yMDIxIiwiaWQiOiJldGhlcmV1bToweEQ4OTBGMkQ2MEI0MjlmOWUyNTdGQzBCYzU4RWYyMjM3Nzc2REQ5MUIvZ2V0UmV2b2tlZFN0YXR1cz9hZGRyZXNzPTB4MDMwMThFM2EzODk3MzRhRTEyZjE0RTQ0NTQwZkFlYTM1NzkxZkVDNyZsaXN0SWQ9MTYzNTc4ODY2Mjk2NjUzJmluZGV4PTQ5OTMiLCJzdGF0dXNMaXN0SW5kZXgiOjQ5OTMsInN0YXR1c0xpc3RDcmVkZW50aWFsIjoiZXRoZXJldW06MHhEODkwRjJENjBCNDI5ZjllMjU3RkMwQmM1OEVmMjIzNzc3NkREOTFCL2dldFJldm9rZWRTdGF0dXM_YWRkcmVzcz0weDAzMDE4RTNhMzg5NzM0YUUxMmYxNEU0NDU0MGZBZWEzNTc5MWZFQzcmbGlzdElkPTE2MzU3ODg2NjI5NjY1MyIsImxpbmtDb2RlQ29tbWl0IjoiRWlEc2cvWEtWVndWQUd6aWNIalV6aFpLZGlyK24zU3RaRi8vaTU0RUtzV0Zydz09In0sImNvbnRlbnRIYXNoIjp7InR5cGUiOiJWZWxvY2l0eUNvbnRlbnRIYXNoMjAyMCIsInZhbHVlIjoiYzZmNzU4ZWJiNjZlYmFmMGM0MmQ4ZGE0N2I3Yjg4ZDU4NTUxY2VlYjY0Y2Y0MmZiNjFhZjVhOGQzMzUzY2E0NyJ9LCJjcmVkZW50aWFsU2NoZW1hIjp7ImlkIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9lbWFpbC12MS4wLnNjaGVtYS5qc29uIiwidHlwZSI6Ikpzb25TY2hlbWFWYWxpZGF0b3IyMDE4In0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImVtYWlsIjoidmFuZXNzYS5saW5AZXhhbXBsZS5jb20ifX0sImlzcyI6ImRpZDppb246RWlBZWhXbXBYNW1IQnVjOTNTSWhQWEY4YnNFeDY4RzZtUGNkSWFMTkdib3pQQSIsImp0aSI6ImRpZDp2ZWxvY2l0eTp2MjoweDYyNTZiMTg5MjFlYWJkMzkzNTFlYzIzZjFjOTRmODgwNjA0ZTcwZTc6MjExNDg4NzE4MzU1MDA4OjY1OTAiLCJpYXQiOjE2NTI5MDEwNDMsIm5iZiI6MTY1MjkwMTA0M30.ejlIfog0fF71URN3R7SIWYYvCjF0onUFFiLvY5EHa9fx9cdMS_hDfbjjGyGPapTapnT9tSePsz0Ajtyqu5zm2g',
                type: ['EmailV1.0'],
                output_descriptors: [
                    {
                        id: 'EmailV1.0',
                        display: {
                            title: {
                                text: 'Email'
                            },
                            description: {
                                text: 'Email'
                            },
                            subtitle: {
                                path: ['$.email'],
                                schema: {
                                    type: 'string',
                                    format: 'email'
                                },
                                fallback: '-'
                            }
                        }
                    }
                ]
            },
            {
                jwt_vc:
                    'eyJ0eXAiOiJKV1QiLCJraWQiOiJkaWQ6dmVsb2NpdHk6djI6MHg2MjU2YjE4OTIxZWFiZDM5MzUxZWMyM2YxYzk0Zjg4MDYwNGU3MGU3OjIxMTQ4ODcxODM1NTAwODo3MjgyI2tleS0xIiwiYWxnIjoiRVMyNTZLIn0.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlBob25lVjEuMCIsIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdGF0dXMiOnsidHlwZSI6IlZlbG9jaXR5UmV2b2NhdGlvbkxpc3RKYW4yMDIxIiwiaWQiOiJldGhlcmV1bToweEQ4OTBGMkQ2MEI0MjlmOWUyNTdGQzBCYzU4RWYyMjM3Nzc2REQ5MUIvZ2V0UmV2b2tlZFN0YXR1cz9hZGRyZXNzPTB4MDMwMThFM2EzODk3MzRhRTEyZjE0RTQ0NTQwZkFlYTM1NzkxZkVDNyZsaXN0SWQ9MTYzNTc4ODY2Mjk2NjUzJmluZGV4PTQ3MDEiLCJzdGF0dXNMaXN0SW5kZXgiOjQ3MDEsInN0YXR1c0xpc3RDcmVkZW50aWFsIjoiZXRoZXJldW06MHhEODkwRjJENjBCNDI5ZjllMjU3RkMwQmM1OEVmMjIzNzc3NkREOTFCL2dldFJldm9rZWRTdGF0dXM_YWRkcmVzcz0weDAzMDE4RTNhMzg5NzM0YUUxMmYxNEU0NDU0MGZBZWEzNTc5MWZFQzcmbGlzdElkPTE2MzU3ODg2NjI5NjY1MyIsImxpbmtDb2RlQ29tbWl0IjoiRWlBV1d1am9wamZ4MWN0QXVkdysvNWZFVkFNQjR6MFpBT0JFT21SaU5FTUkxZz09In0sImNvbnRlbnRIYXNoIjp7InR5cGUiOiJWZWxvY2l0eUNvbnRlbnRIYXNoMjAyMCIsInZhbHVlIjoiODcwMzc0ZWIzZjA1YmY3Y2FkYTA0M2NmNWRmMzQ2ZDBlMjM5MmIyZWMxZTBjNDZhNWQwYTM3NTkyZDlmNTc5MSJ9LCJjcmVkZW50aWFsU2NoZW1hIjp7ImlkIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9waG9uZS12MS4wLnNjaGVtYS5qc29uIiwidHlwZSI6Ikpzb25TY2hlbWFWYWxpZGF0b3IyMDE4In0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7InBob25lIjoiKzE0NTQyNjI1MTU1In19LCJpc3MiOiJkaWQ6aW9uOkVpQWVoV21wWDVtSEJ1YzkzU0loUFhGOGJzRXg2OEc2bVBjZElhTE5HYm96UEEiLCJqdGkiOiJkaWQ6dmVsb2NpdHk6djI6MHg2MjU2YjE4OTIxZWFiZDM5MzUxZWMyM2YxYzk0Zjg4MDYwNGU3MGU3OjIxMTQ4ODcxODM1NTAwODo3MjgyIiwiaWF0IjoxNjUyOTAxMDQzLCJuYmYiOjE2NTI5MDEwNDN9.LPAnG0IPU861TrnZp4Yl6CfCIMbUr8WHoPgdnnT9r3-3tgtefpiB-4r_gmmXVgw0dTc2VPaQgbZ2vrPow6pRuw',
                type: ['PhoneV1.0'],
                output_descriptors: [
                    {
                        id: 'PhoneV1.0',
                        display: {
                            title: {
                                text: 'Phone number'
                            },
                            description: {
                                text: 'Phone'
                            },
                            subtitle: {
                                path: ['$.phone'],
                                schema: {
                                    type: 'string'
                                },
                                fallback: '-'
                            }
                        }
                    }
                ]
            }
        ],
        createdAt: '2021-11-11T13:37:52.591Z',
        updatedAt: '2022-05-22T13:25:40.979Z',
        id: 'vanessa.lin@example.com'
    },
    {
        name: 'Adam Smith',
        email: 'adam.smith@example.com',
        image: 'https://docs.velocitycareerlabs.io/personas/adam-smith.png',
        vcs: [
            {
                jwt_vc:
                    'eyJ0eXAiOiJKV1QiLCJraWQiOiJkaWQ6dmVsb2NpdHk6djI6MHg2MjU2YjE4OTIxZWFiZDM5MzUxZWMyM2YxYzk0Zjg4MDYwNGU3MGU3OjIxMTQ4ODcxODM1NTAwODo2NzYyI2tleS0xIiwiYWxnIjoiRVMyNTZLIn0.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIkRyaXZlcnNMaWNlbnNlVjEuMCIsIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdGF0dXMiOnsidHlwZSI6IlZlbG9jaXR5UmV2b2NhdGlvbkxpc3RKYW4yMDIxIiwiaWQiOiJldGhlcmV1bToweEQ4OTBGMkQ2MEI0MjlmOWUyNTdGQzBCYzU4RWYyMjM3Nzc2REQ5MUIvZ2V0UmV2b2tlZFN0YXR1cz9hZGRyZXNzPTB4MDMwMThFM2EzODk3MzRhRTEyZjE0RTQ0NTQwZkFlYTM1NzkxZkVDNyZsaXN0SWQ9MTYzNTc4ODY2Mjk2NjUzJmluZGV4PTIxMDMiLCJzdGF0dXNMaXN0SW5kZXgiOjIxMDMsInN0YXR1c0xpc3RDcmVkZW50aWFsIjoiZXRoZXJldW06MHhEODkwRjJENjBCNDI5ZjllMjU3RkMwQmM1OEVmMjIzNzc3NkREOTFCL2dldFJldm9rZWRTdGF0dXM_YWRkcmVzcz0weDAzMDE4RTNhMzg5NzM0YUUxMmYxNEU0NDU0MGZBZWEzNTc5MWZFQzcmbGlzdElkPTE2MzU3ODg2NjI5NjY1MyIsImxpbmtDb2RlQ29tbWl0IjoiRWlBSVkxWHdaZzV4cnZvUk5jNE55d3JBcVhrV2pZU05MVTM2dDlQQ0dzbDQ5dz09In0sImNvbnRlbnRIYXNoIjp7InR5cGUiOiJWZWxvY2l0eUNvbnRlbnRIYXNoMjAyMCIsInZhbHVlIjoiZTkwN2Y1NDc2YzU3ZTczNDIzZjFjOWIzOTNiYzFkMGE0ZDU2MjgwYWMxNTUzOTZjYzg3OWYyNDQxYTUyM2NkYyJ9LCJjcmVkZW50aWFsU2NoZW1hIjp7ImlkIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9kcml2ZXJzLWxpY2Vuc2UtdjEuMC5zY2hlbWEuanNvbiIsInR5cGUiOiJKc29uU2NoZW1hVmFsaWRhdG9yMjAxOCJ9LCJjcmVkZW50aWFsU3ViamVjdCI6eyJuYW1lOiI6IkNhbGlmb3JuaWEgRHJpdmVyIExpY2Vuc2UiLCJhdXRob3JpdHkiOnsibmFtZSI6IkNhbGlmb3JuaWEgRE1WIiwicGxhY2UiOnsiYWRkcmVzc1JlZ2lvbiI6IkNBIiwiYWRkcmVzc0NvdW50cnkiOiJVUyJ9fSwidmFsaWRpdHkiOnsidmFsaWRGcm9tIjoiMjAxNS0wMi0wMSIsInZhbGlkVW50aWwiOiIyMDI1LTAxLTMwIn0sImlkZW50aWZpZXIiOiIxMjMxMDMxMjMxMiIsInBlcnNvbiI6eyJnaXZlbk5hbWUiOiJBZGFtIiwiZmFtaWx5TmFtZSI6IlNtaXRoIiwiYmlydGhEYXRlIjoiMTk2Ni0wNi0yMCIsImdlbmRlciI6Ik1hbGUifX19LCJpc3MiOiJkaWQ6aW9uOkVpQWVoV21wWDVtSEJ1YzkzU0loUFhGOGJzRXg2OEc2bVBjZElhTE5HYm96UEEiLCJqdGkiOiJkaWQ6dmVsb2NpdHk6djI6MHg2MjU2YjE4OTIxZWFiZDM5MzUxZWMyM2YxYzk0Zjg4MDYwNGU3MGU3OjIxMTQ4ODcxODM1NTAwODo2NzYyIiwiaWF0IjoxNjUyODk2ODY5LCJuYmYiOjE2NTI4OTY4Njl9.DYSJseMcm31Odj7tncT_HBRMs5mknBBRgWuAranmKuY1MPQoBG-A0qOOI9Q3z8X78B7sJISE5iAXBkaVKjUJ2w',
                type: ['DriversLicenseV1.0'],
                output_descriptors: [
                    {
                        id: 'DriversLicenseV1.0',
                        display: {
                            title: {
                                path: ['$.name'],
                                schema: {
                                    type: 'string'
                                },
                                fallback: "Driver's License"
                            },
                            subtitle: {
                                path: ['$.authority.name'],
                                schema: {
                                    type: 'string'
                                },
                                fallback: '-'
                            },
                            summary_detail: {
                                path: ['$.identifier'],
                                schema: {
                                    type: 'string'
                                },
                                fallback: '-'
                            },
                            description: {
                                text: "Driver's license"
                            },
                            properties: [
                                {
                                    label: 'License number',
                                    path: ['$.identifier'],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Country',
                                    path: ['$.authority.place.addressCountry'],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Region or State',
                                    path: ['$.authority.place.addressRegion'],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Date issued',
                                    path: ['$.validity.firstValidFrom'],
                                    schema: {
                                        type: 'string',
                                        format: 'date'
                                    }
                                },
                                {
                                    label: 'Date renewed',
                                    path: ['$.validity.validFrom'],
                                    schema: {
                                        type: 'string',
                                        format: 'date'
                                    }
                                },
                                {
                                    label: 'Valid until',
                                    path: ['$.validity.validUntil'],
                                    schema: {
                                        type: 'string',
                                        format: 'date'
                                    }
                                },
                                {
                                    label: 'Given name',
                                    path: ['$.person.givenName'],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Middle name',
                                    path: ['$.person.additionalName'],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Family name',
                                    path: ['$.person.familyName'],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Name prefix',
                                    path: ['$.person.namePrefix'],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Name suffix',
                                    path: ['$.person.nameSuffix'],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Date of birth',
                                    path: ['$.person.birthDate'],
                                    schema: {
                                        type: 'string',
                                        format: 'date'
                                    }
                                },
                                {
                                    label: 'Country of birth',
                                    path: [
                                        '$.person.birthPlace.addressCountry'
                                    ],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Region or state of birth',
                                    path: ['$.person.birthPlace.addressRegion'],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Place of birth',
                                    path: [
                                        '$.person.birthPlace.addressLocality'
                                    ],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Gender',
                                    path: ['$.person.gender'],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Street address',
                                    path: ['$.streetAddress'],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Address locality',
                                    path: ['$.addressLocality'],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Address region or state',
                                    path: ['$.addressRegion'],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Address post code',
                                    path: ['$.postCode'],
                                    schema: {
                                        type: 'string'
                                    }
                                },
                                {
                                    label: 'Address country',
                                    path: ['$.addressCountry'],
                                    schema: {
                                        type: 'string'
                                    }
                                }
                            ]
                        }
                    }
                ]
            },
            {
                jwt_vc:
                    'eyJ0eXAiOiJKV1QiLCJraWQiOiJkaWQ6dmVsb2NpdHk6djI6MHg2MjU2YjE4OTIxZWFiZDM5MzUxZWMyM2YxYzk0Zjg4MDYwNGU3MGU3OjIxMTQ4ODcxODM1NTAwODo0MTY2I2tleS0xIiwiYWxnIjoiRVMyNTZLIn0.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIkVtYWlsVjEuMCIsIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdGF0dXMiOnsidHlwZSI6IlZlbG9jaXR5UmV2b2NhdGlvbkxpc3RKYW4yMDIxIiwiaWQiOiJldGhlcmV1bToweEQ4OTBGMkQ2MEI0MjlmOWUyNTdGQzBCYzU4RWYyMjM3Nzc2REQ5MUIvZ2V0UmV2b2tlZFN0YXR1cz9hZGRyZXNzPTB4MDMwMThFM2EzODk3MzRhRTEyZjE0RTQ0NTQwZkFlYTM1NzkxZkVDNyZsaXN0SWQ9MTYzNTc4ODY2Mjk2NjUzJmluZGV4PTg2OTgiLCJzdGF0dXNMaXN0SW5kZXgiOjg2OTgsInN0YXR1c0xpc3RDcmVkZW50aWFsIjoiZXRoZXJldW06MHhEODkwRjJENjBCNDI5ZjllMjU3RkMwQmM1OEVmMjIzNzc3NkREOTFCL2dldFJldm9rZWRTdGF0dXM_YWRkcmVzcz0weDAzMDE4RTNhMzg5NzM0YUUxMmYxNEU0NDU0MGZBZWEzNTc5MWZFQzcmbGlzdElkPTE2MzU3ODg2NjI5NjY1MyIsImxpbmtDb2RlQ29tbWl0IjoiRWlBb3FJWWYycmgxdzEvdURXTnNwYTRyOHRrV2dwRGRUUjBtNHlIRTVMZUtQZz09In0sImNvbnRlbnRIYXNoIjp7InR5cGUiOiJWZWxvY2l0eUNvbnRlbnRIYXNoMjAyMCIsInZhbHVlIjoiODlkNGRjYzg2ZDU0MGM2ZWVhMzlkMTc4ZWVkYzMwMjEzZTc4MmYyNTFlMDNiNzZmNDI3MzEwNjgwOGRkMGQ0ZiJ9LCJjcmVkZW50aWFsU2NoZW1hIjp7ImlkIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9lbWFpbC12MS4wLnNjaGVtYS5qc29uIiwidHlwZSI6Ikpzb25TY2hlbWFWYWxpZGF0b3IyMDE4In0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImVtYWlsIjoiYWRhbS5zbWl0aEBleGFtcGxlLmNvbSJ9fSwiaXNzIjoiZGlkOmlvbjpFaUFlaFdtcFg1bUhCdWM5M1NJaFBYRjhic0V4NjhHNm1QY2RJYUxOR2JvelBBIiwianRpIjoiZGlkOnZlbG9jaXR5OnYyOjB4NjI1NmIxODkyMWVhYmQzOTM1MWVjMjNmMWM5NGY4ODA2MDRlNzBlNzoyMTE0ODg3MTgzNTUwMDg6NDE2NiIsImlhdCI6MTY1Mjg5Njg2OSwibmJmIjoxNjUyODk2ODY5fQ.fi0qJFzHiDEWTGUu0ME1aG36-j2jm7xxA2DWPs_Ra7ftl-ALMu0FY3A38klbkJQYCaXWHFH0hBbcQ5Z3uZCeew',
                type: ['EmailV1.0'],
                output_descriptors: [
                    {
                        id: 'EmailV1.0',
                        display: {
                            title: {
                                text: 'Email'
                            },
                            description: {
                                text: 'Email'
                            },
                            subtitle: {
                                path: ['$.email'],
                                schema: {
                                    type: 'string',
                                    format: 'email'
                                },
                                fallback: '-'
                            }
                        }
                    }
                ]
            },
            {
                jwt_vc:
                    'eyJ0eXAiOiJKV1QiLCJraWQiOiJkaWQ6dmVsb2NpdHk6djI6MHg2MjU2YjE4OTIxZWFiZDM5MzUxZWMyM2YxYzk0Zjg4MDYwNGU3MGU3OjIxMTQ4ODcxODM1NTAwODo5MTg1I2tleS0xIiwiYWxnIjoiRVMyNTZLIn0.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlBob25lVjEuMCIsIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdGF0dXMiOnsidHlwZSI6IlZlbG9jaXR5UmV2b2NhdGlvbkxpc3RKYW4yMDIxIiwiaWQiOiJldGhlcmV1bToweEQ4OTBGMkQ2MEI0MjlmOWUyNTdGQzBCYzU4RWYyMjM3Nzc2REQ5MUIvZ2V0UmV2b2tlZFN0YXR1cz9hZGRyZXNzPTB4MDMwMThFM2EzODk3MzRhRTEyZjE0RTQ0NTQwZkFlYTM1NzkxZkVDNyZsaXN0SWQ9MTYzNTc4ODY2Mjk2NjUzJmluZGV4PTU3OTkiLCJzdGF0dXNMaXN0SW5kZXgiOjU3OTksInN0YXR1c0xpc3RDcmVkZW50aWFsIjoiZXRoZXJldW06MHhEODkwRjJENjBCNDI5ZjllMjU3RkMwQmM1OEVmMjIzNzc3NkREOTFCL2dldFJldm9rZWRTdGF0dXM_YWRkcmVzcz0weDAzMDE4RTNhMzg5NzM0YUUxMmYxNEU0NDU0MGZBZWEzNTc5MWZFQzcmbGlzdElkPTE2MzU3ODg2NjI5NjY1MyIsImxpbmtDb2RlQ29tbWl0IjoiRWlCaXlISE1LRlkwYW1rK3gvVGxtN2liY2tsbk8wbHMySEh1ckozN09WRDBJZz09In0sImNvbnRlbnRIYXNoIjp7InR5cGUiOiJWZWxvY2l0eUNvbnRlbnRIYXNoMjAyMCIsInZhbHVlIjoiNGYwMjUyYzRlMTI4ZTZkMzE5N2NlYTA3Yjc2ZmNiYWExMjZkZTNkNDBiZjY1NzlkZmE1MzQ1ZTVjZjFhOGZiMiJ9LCJjcmVkZW50aWFsU2NoZW1hIjp7ImlkIjoiaHR0cHM6Ly9kZXZyZWdpc3RyYXIudmVsb2NpdHluZXR3b3JrLmZvdW5kYXRpb24vc2NoZW1hcy9waG9uZS12MS4wLnNjaGVtYS5qc29uIiwidHlwZSI6Ikpzb25TY2hlbWFWYWxpZGF0b3IyMDE4In0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7InBob25lIjoiKzE1NTU2MTkyMTkxIn19LCJpc3MiOiJkaWQ6aW9uOkVpQWVoV21wWDVtSEJ1YzkzU0loUFhGOGJzRXg2OEc2bVBjZElhTE5HYm96UEEiLCJqdGkiOiJkaWQ6dmVsb2NpdHk6djI6MHg2MjU2YjE4OTIxZWFiZDM5MzUxZWMyM2YxYzk0Zjg4MDYwNGU3MGU3OjIxMTQ4ODcxODM1NTAwODo5MTg1IiwiaWF0IjoxNjUyODk2ODY5LCJuYmYiOjE2NTI4OTY4Njl9.aiiqintVpgfn1GpSJG8lSRlLqr2K0rfylXDd92ryzBgLEsS-8CbFngNHIHJYW9SVgiJYXcPv6f0YZMk78cYPtw',
                type: ['PhoneV1.0'],
                output_descriptors: [
                    {
                        id: 'PhoneV1.0',
                        display: {
                            title: {
                                text: 'Phone number'
                            },
                            description: {
                                text: 'Phone'
                            },
                            subtitle: {
                                path: ['$.phone'],
                                schema: {
                                    type: 'string'
                                },
                                fallback: '-'
                            }
                        }
                    }
                ]
            }
        ],
        createdAt: '2021-11-11T13:37:51.870Z',
        updatedAt: '2022-05-22T13:25:40.979Z',
        id: 'adam.smith@example.com'
    },
    {
        name: 'Maria Williams',
        email: 'maria.williams@example.com',
        image: 'https://docs.velocitycareerlabs.io/personas/maria-williams.png',
        vcs: [],
        createdAt: '2021-11-11T13:37:51.870Z',
        updatedAt: '2022-05-22T13:25:40.979Z',
        id: 'maria.williams@example.com'
    },
    {
        name: 'Olivia Hafez',
        email: 'olivia.hafez@example.com',
        image: 'https://docs.velocitycareerlabs.io/personas/olivia-hafez.png',
        vcs: [],
        createdAt: '2021-11-11T13:37:51.870Z',
        updatedAt: '2022-05-22T13:25:40.979Z',
        id: 'olivia.hafez@example.com'
    },
    {
        name: 'Yann Martin',
        email: 'yann.martin@example.com',
        image: 'https://docs.velocitycareerlabs.io/personas/yann-martin.png',
        vcs: [],
        createdAt: '2021-11-11T13:37:51.870Z',
        updatedAt: '2022-05-22T13:25:40.979Z',
        id: 'yann.martin@example.com'
    },
    {
        name: 'Carmen Johnson',
        email: 'carmen.johnson@example.com',
        image: 'https://docs.velocitycareerlabs.io/personas/carmen-johnson.png',
        vcs: [],
        createdAt: '2021-11-11T13:37:51.870Z',
        updatedAt: '2022-05-22T13:25:40.979Z',
        id: 'carmen.johnson@example.com'
    },
    {
        name: 'Andrew Hall',
        email: 'andrew.hall@example.com',
        image: 'https://docs.velocitycareerlabs.io/personas/andrew-hall.png',
        vcs: [],
        createdAt: '2021-11-11T13:37:51.870Z',
        updatedAt: '2022-05-22T13:25:40.979Z',
        id: 'andrew.hall@example.com'
    },
    {
        name: 'Loek De Jong',
        email: 'Loek.dejong@example.com',
        image: 'https://docs.velocitycareerlabs.io/personas/loek-de-jong.png',
        vcs: [],
        createdAt: '2021-11-11T13:37:51.870Z',
        updatedAt: '2022-05-22T13:25:40.979Z',
        id: 'Loek.dejong@example.com'
    },
    {
        name: 'Montserrat Reyes',
        email: 'montse.reyes@example.com',
        image:
            'https://docs.velocitycareerlabs.io/personas/montserrat-reyes.png',
        vcs: [],
        createdAt: '2021-11-11T13:37:51.870Z',
        updatedAt: '2022-05-22T13:25:40.979Z',
        id: 'montse.reyes@example.com'
    },
    {
        name: 'Sheila Olsen',
        email: 'sheila.olsen@example.com',
        image: 'https://docs.velocitycareerlabs.io/personas/sheila-olsen.png',
        vcs: [],
        createdAt: '2021-11-11T13:37:51.870Z',
        updatedAt: '2022-05-22T13:25:40.979Z',
        id: 'sheila.olsen@example.com'
    },
    {
        name: 'Noah Brown',
        email: 'noah.brown@example.com',
        image: 'https://docs.velocitycareerlabs.io/personas/noah-brown.png',
        vcs: [],
        createdAt: '2021-11-11T13:37:51.870Z',
        updatedAt: '2022-05-22T13:25:40.979Z',
        id: 'noah.brown@example.com'
    },
    {
        name: 'Marko Nikolić',
        email: 'marko.nikolic@example.com',
        image: 'https://docs.velocitycareerlabs.io/personas/marko-nikolic.png',
        vcs: [],
        createdAt: '2021-11-11T13:37:51.870Z',
        updatedAt: '2022-05-22T13:25:40.979Z',
        id: 'marko.nikolic@example.com'
    },
    {
        name: 'Michelle Harris',
        email: 'michelle.harris@example.com',
        image:
            'https://docs.velocitycareerlabs.io/personas/michelle-harris.png',
        vcs: [],
        createdAt: '2021-11-11T13:37:51.870Z',
        updatedAt: '2022-05-22T13:25:40.979Z',
        id: 'michelle.harris@example.com'
    }
];
