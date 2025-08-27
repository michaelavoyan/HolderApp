import React from 'react';
import {
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    SafeAreaView
} from 'react-native';
import {useTheme} from 'react-native-elements';

import {fontFamily} from '../../utilities/helpers';

export const TERMS_AND_CONDITIONS_VERSION = '1.0';

export const TermsAndConditionsScreen: React.FC = () => {
    const {theme} = useTheme();

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <ScrollView
                contentContainerStyle={styles.contentContainer}
                style={styles.container}>
                <Text style={[styles.paragraph, styles.title, styles.bold]}>
                    WALLET HOLDER USER AGREEMENT
                </Text>
                <Text style={[styles.paragraph, styles.bold]}>
                    Last Updated: January 2023
                </Text>
                <Text style={styles.paragraph}>
                    You agree that by downloading and installing the Career
                    Wallet app (‘Career Wallet’ or ‘Wallet‘) on your Device (as
                    defined below), registering, accessing or using the services
                    offered by Velocity Career Labs, Inc. or its affiliates
                    (hereafter, ‘VCL‘, ‘Us’, ‘We’, ‘Our’), as each may be
                    updated or otherwise modified from time to time, and all
                    intellectual property contained therein(collectively, the
                    ‘Services’), you agree to be bound by the terms and
                    conditions of this Wallet Holder User Agreement and all
                    terms incorporated herein by reference, including our{' '}
                    <Text
                        style={[{color: theme.colors.link}, styles.underlined]}
                        onPress={() =>
                            Linking.openURL(
                                'https://www.velocitycareerlabs.com/data-policy'
                            )
                        }>
                        Privacy Policy
                    </Text>{' '}
                    (hereafter, this ‘Agreement’) (even if you are doing so on
                    behalf of any entity). If you are using the Services on
                    behalf of any entity, you represent and warrant that you are
                    authorized to accept the terms and conditions of this
                    Agreement on such entity’s behalf and that such entity
                    agrees to be responsible to Us if you or such entity
                    violates this Agreement.
                </Text>
                <Text style={styles.paragraph}>
                    We encourage you to review this Agreement frequently to
                    ensure that you understand the terms and conditions that
                    apply when you access or use the Services.We reserve all
                    rights to change or modify this Agreement at any time and
                    for any reason, at Our sole discretion. If we make material
                    changes to this Agreement, we will provide you notice of
                    such material changes through a push notification to the
                    Wallet, or by other means, to provide you the opportunity to
                    review the changes before they become effective. We agree
                    that changes cannot be retroactive. If you object to any
                    changes, you may terminate this Agreement, at any time. You
                    can do so by uninstalling the Wallet from your Device and no
                    longer accessing or using our Services(Please note that this
                    may not affect previous actions made by you through the
                    Wallet). Your continued use of the Wallet after we publish
                    or send a notice about our changes to this Agreement means
                    that you are consenting to the updated terms as of their
                    effective date.
                </Text>
                <Text style={styles.paragraph}>
                    Unless explicitly stated otherwise, any new features that
                    augment or enhance the current Services,including the
                    release of new products, services, tools or properties,shall
                    be subject to this Agreement. Your continued use of the
                    Services after any such changes constitutes your acceptance
                    of the revised Agreement.
                </Text>
                <Text style={styles.paragraph}>
                    VCL reserves the right at any time and from time to time to
                    modify, discontinue or suspend, temporarily or permanently,
                    its offering of the Services (or any part thereof) without
                    notice or liability to you or any third party.
                </Text>
                <Text style={styles.paragraph}>
                    IF YOU DO NOT AGREE WITH ANY OF THE TERMS AND CONDITIONS OF
                    THIS AGREEMENT, YOU MAY NOT ACCESS OR OTHERWISE USE THE
                    SERVICES.
                </Text>
                <Text style={[styles.paragraph, styles.bold, styles.subtitle]}>
                    1. General.
                </Text>
                <Text style={[styles.paragraph, styles.bold]}>
                    What is the Career Wallet App?
                </Text>
                <Text style={styles.paragraph}>
                    TheCareer Wallet is a downloadable software application
                    installed on your Android, iPhone, iPad or other mobile
                    device supported by VCL (hereafter ‘Device‘). It is a
                    simple, reliable, and private way to manage an up-to-date
                    professional profile and share it with third parties when
                    needed (hereafter ‘Relying Parties‘).
                </Text>
                <Text style={styles.paragraph}>
                    The Career Wallet is built on top of the Velocity Network™,
                    a global, public, utility layer known as the Internet of
                    Careers®, offering a frictionless experience to exchange
                    trusted career records, designed for the digital age.
                </Text>
                <Text style={styles.paragraph}>
                    The Career Wallet allows you to stack proofs of your
                    employment history, educational background, skills, and
                    qualifications, in order to build your own verifiable
                    professional profile and store it privately on your Device.
                    You can share your Credentials (defined below)with Relying
                    Parties connected to the Velocity Network™, when requested
                    or required,as evidence of your professional background.
                </Text>
                <Text style={[styles.paragraph, styles.bold]}>
                    Claiming Credentials from third-party issuers
                </Text>
                <Text style={styles.paragraph}>
                    The Career Wallet allows you to stack proofs of your
                    employment history, educational background, skills, and
                    qualifications, collectively to build your verifiable
                    professional profile and to store it privately on your
                    Device. We call these proofs ‘Career Credentials’ (hereafter
                    ‘Credentials‘). Each Credential pertains to a singular
                    qualification, achievement, personal quality, or any other
                    aspect of you career and professional track record. Examples
                    of a Credential include academic degree, employment record,
                    vocational license, certification, demonstrated skill, etc.
                </Text>
                <Text style={styles.paragraph}>
                    The authority to issue your Credentials belongs to third
                    parties you’ve engaged with throughout your professional
                    path. These might include past employers, universities,
                    assessment centers or industry societies (any one of which
                    is an example of an ‘Issuer’). When issuing your
                    Credentials, the Issuer adds their digital signature to it
                    and anchoring the signature to the Velocity
                    Network™blockchain, making it Verifiable. For more
                    information about the issuing flow see:{' '}
                    <Text
                        style={{color: theme.colors.link}}
                        onPress={() =>
                            Linking.openURL(
                                'https://www.velocitynetwork.foundation/main2/basic-usage-flow#issuing'
                            )
                        }>
                        https://www.velocitynetwork.foundation/main2/basic-usage-flow#issuing
                    </Text>
                    .
                </Text>
                <Text style={styles.paragraph}>
                    You must only add or accept Credentials to your wallet that
                    are current, relevant, genuine, and accurate – you must not
                    add or accept Credentials to your Wallet which do not fulfil
                    such criteria. We may suspend your use of the Wallet and/or
                    terminate this agreement if we know or reasonably suspect
                    you to have not complied with the previous sentence.
                </Text>
                <Text style={styles.paragraph}>
                    Once you have added or accept Credentials to your wallet,
                    they will be stored in the Career Wallet.
                </Text>
                <Text style={[styles.paragraph, styles.bold]}>
                    Sharing your Credentials with Relying Parties
                </Text>
                <Text style={styles.paragraph}>
                    When you decide to share those Credentials with a Relying
                    Party [e.g., prospective employer, school you apply to etc.,
                    as well as third-party online platforms(e.g., LinkedIn)], a
                    copy of the Credentials you select for sharing travel on a
                    peer-to-peer connection to the Relying Party you chose to
                    share it with.
                </Text>
                <Text style={styles.paragraph}>
                    The Relying Party will be able to inspect the Issuer’s
                    digital signature (referenced above) to verify the
                    Credentials authenticity, ensuring it can be trusted.
                </Text>
                <Text style={styles.paragraph}>
                    We will make it clear to those Relying Parties you wish to
                    share a Credentials with as to whether the relevant
                    Credentials has been properly verified and signed by the
                    relevant Issuers.
                </Text>
                <Text style={styles.paragraph}>
                    You must only share Credentials that are current, relevant,
                    genuine, and accurate –you must not share Credentials which
                    do not fulfil such criteria. We may suspend your use of the
                    Wallet and/or terminate this agreement if we know or
                    reasonably suspect you to have not complied with the
                    previous sentence.
                </Text>
                <Text style={[styles.paragraph, styles.bold]}>
                    Issuers and Relying Parties are independent entities
                </Text>
                <Text style={styles.paragraph}>
                    We are not responsible for what Relying Parties do with the
                    data you share with them using the Wallet. You should check
                    out those Relying Parties carefully before trusting them
                    with your data.
                </Text>
                <Text style={styles.paragraph}>
                    WE HAVE NO CONTROL AND MAKE NO REPRESENTATION WITH RESPECT
                    TO THE ACTIONS OF ISSUERS AND/OR RELYING PARTIES OR ANY
                    INFORMATION PROVIDED OR EXCHANGED WITH SUCH THIRD PARTIES,
                    OR OTHERWISE PROVIDED BY YOU TO ANY SUCH THIRD PERSONS. YOU
                    UNDERSTAND AND AGREE THAT ENGAGING WITH SUCH THIRD PARTIES
                    IS AT YOUR OWN RISK, THAT THEIR ACTIONS ARE GOVERNED BY SUCH
                    THIRD PARTIES’ TERMS OF USE AND PRIVACY POLICIES, AND THAT
                    WE ARE NOT RESPONSIBLE FOR THE PRIVACY OR BUSINESS PRACTICES
                    OR OTHER POLICIES OF SUCH THIRD PARTIES. YOU SHOULD
                    CAREFULLY REVIEW THE APPLICABLE TERMS AND POLICIES THAT
                    APPLY TO ANY SUCH THIRD PARTIES. WE ARE NOT RESPONSIBLE OR
                    LIABLE IN ANY MANNER FOR SUCH THIRD PARTIES, OR FOR ANY LOSS
                    OR DAMAGE OF ANY SORT INCURRED BY YOU AS THE RESULT THEREOF,
                    AND WE EXPRESSLY DISCLAIM, AND YOU EXPRESSLY RELEASE US AND
                    OUR AFFILIATES AND REPRESENTATIVES FROM, ANY AND ALL
                    LIABILITY WHATSOEVER FOR ANY CONTROVERSIES, CLAIMS, SUITS,
                    INJURIES, LOSS, HARM AND/OR DAMAGES, ARISING FROM AND/OR IN
                    ANY WAY RELATED TO SUCH THIRD PERSONS, INCLUDING WITHOUT
                    LIMITATION THOSE RELATING TO AVAILABILITY, TERMS OF USE,
                    PRIVACY, SOFTWARE/HARDWARE DAMAGE OR THIRD PARTY PROPERTY.
                </Text>
                <Text style={styles.paragraph}>
                    NOTE THAT THE SERVICES IS NOT A GUARANTEE AGAINST IDENTITY
                    THEFT OR ONLINE IDENTITY FRAUD AND IS NOT A SUBSTITUTE FOR
                    ONLINE SECURITY SOFTWARE.
                </Text>
                <Text style={[styles.paragraph, styles.bold, styles.subtitle]}>
                    2. Eligibility.
                </Text>
                <Text style={styles.paragraph}>
                    By using the Wallet and Our Services,you represent and
                    warrant that you (a) are Minimum Age or older, (b) have not
                    been previously suspended or removed from using the Wallet
                    or Services,or engaged in any activity that could result in
                    suspension or removal from using the Wallet or Services,(c)
                    do not have more than one Wallet, which must be in your real
                    name, and (d) have full power and authority to enter into
                    this Agreement and in so doing will not violate any other
                    agreement to which you are a party.Creating a Wallet with
                    false information is a violation of our terms, including
                    Wallets registered on behalf of others or persons under the
                    Minimum Age.
                </Text>
                <Text style={styles.paragraph}>
                    “Minimum Age” means 13 years old. However, if law requires
                    that you must be older in order for VCL to lawfully provide
                    you access to the Wallet without parental consent (including
                    using of your personal data) then the Minimum Age is such
                    older age.
                </Text>
                <Text style={[styles.paragraph, styles.bold, styles.subtitle]}>
                    3. Use of the Wallet; Notifications.
                </Text>
                <Text style={styles.paragraph}>
                    You agree to immediately notify VCL of any unauthorized use
                    of your Walletor any other breach of security that you
                    become aware of.
                </Text>
                <Text style={styles.paragraph}>
                    You represent and warrant that you own the content you
                    submit in your Wallet and that submitting or transmitting
                    your content to or through the Services and use of the
                    Services will not violate the rights of any third party,
                    including intellectual property, privacy or publicity
                    rights. VCL is under no obligation to review or screen your
                    or other users’ content.
                </Text>
                <Text style={styles.paragraph}>
                    You also agree that your use of the Wallet and Services to
                    select an item, button, icon, or similar act/action,
                    constitutes Your signature as if actually signed by you in
                    writing. You further agree to receive notices
                    electronically, including via email or notifications to your
                    Wallet. Your consent to receive notices electronically
                    includes notices required under federal, state, or local
                    law, including the Fair Credit Reporting Act, 15 U.S.C. §
                    1681, et seq.
                </Text>
                <Text style={[styles.paragraph, styles.bold, styles.subtitle]}>
                    4. Access to the Wallet.
                </Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.bold}>
                        License to Access and Use Wallet.{' '}
                    </Text>
                    VCL retains all right, title, and interest in and to the
                    Wallet and Services, including without limitation all
                    software used to provide the Wallet, Services, all graphics,
                    user interfaces, logos, copyrights, patents and trademarks
                    reproduced through the Services, all content and other
                    materials contained therein, including, without limitation,
                    all designs, text, pictures, information, data, software,
                    sound files, other files and the selection and arrangement
                    thereof (collectively, “Content”).
                </Text>
                <Text style={styles.paragraph}>
                    You are hereby granted a limited, non-exclusive,
                    non-transferable, non-sublicensable license to access and
                    use the Wallet and Services for your own personal use,
                    install the Wallet on only one Device, make one copy of the
                    content in the Wallet in any machine-readable form solely
                    for back-up purposes. However, such license is subject to
                    the terms of this Agreement. The limited license granted
                    herein does not grant you any intellectual property license
                    or rights in or to the Wallet or the Services or any of its
                    components except as provided in this Agreement. VCL
                    reserves all rights not granted in this Agreement.
                </Text>
                <Text style={styles.paragraph}>
                    YOU AGREE THAT YOU ARE SOLELY RESPONSIBLE FOR YOUR CONDUCT
                    WHILE ACCESSING OR USING THE WALLET AND SERVICES.YOU AGREE
                    THAT YOU WILL PROVIDE ACCURATE INFORMATION ON YOUR WALLET
                    AND KEEP IT UPDATED. YOU AGREE NOT TO MISUSE THE WALLET AND
                    SERVICES.ANY USE OF THE WALLET, SERVICES OR CONTENT OTHER
                    THAN AS SPECIFICALLY AUTHORIZED HEREIN, WITHOUT OUR PRIOR
                    WRITTEN PERMISSION, IS STRICTLY PROHIBITED AND WILL
                    TERMINATE THE LICENSE GRANTED HEREIN.
                </Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.bold}>
                        Compliance with Applicable Laws.{' '}
                    </Text>
                    You may only use the Wallet and Services in compliance with
                    all Applicable Laws, including without limitation privacy
                    laws, intellectual property laws and export and re-export
                    control laws and regulations. ‘Applicable Law‘ or ‘Law‘ in
                    this Agreement means all local, state, national and
                    international laws, statutes, rules, regulations, or common
                    law applicable to you and Us in connection with this
                    Agreement and your use of the Services.
                </Text>
                <Text style={[styles.paragraph, styles.bold]}>
                    Additional “Dos and Don’ts”
                </Text>
                <Text style={styles.paragraph}>
                    You understand and agree that you shall only use the Wallet
                    in a manner that complies with any and all applicable laws
                    in the jurisdictions in which you use the Wallet. Your use
                    shall be in accordance with applicable restrictions
                    concerning privacy and intellectual property rights.
                </Text>
                <Text style={styles.paragraph}>
                    This list of “Dos and Don’ts” limit what you are expected to
                    do and what you cannot do on our Wallet:
                </Text>
                <Text style={[styles.paragraph, styles.underlined]}>Do</Text>
                <Text style={styles.point}>
                    - Provide accurate information when you share your
                    Credentials will relying parties;
                </Text>
                <Text style={styles.point}>- Use your real identity; and</Text>
                <Text style={[styles.point, styles.paragraph]}>
                    - Use the Wallet in a professional manner.
                </Text>
                <Text style={[styles.paragraph, styles.underlined]}>Don’t</Text>
                <Text style={styles.point}>
                    - Create a false identity, misrepresent your identity,
                    create a profile for anyone other than yourself (a real
                    person), or use or attempt to use another’s Wallet or
                    profile;
                </Text>
                <Text style={styles.point}>
                    - Create derivative works based on the Wallet;
                </Text>
                <Text style={styles.point}>
                    - Use the Wallet for any purpose other than as described
                    herein;
                </Text>
                <Text style={styles.point}>
                    - Copy or reproduce the Wallet except as described in this
                    Agreement;
                </Text>
                <Text style={styles.point}>
                    - Sell, assign, license, disclose, distribute or otherwise
                    transfer or make available the Wallet or any copies of the
                    Wallet in any form to any third parties;
                </Text>
                <Text style={styles.point}>
                    - Alter, translate, decompile, reverse assemble or reverse
                    engineer the Wallet, or attempt to do any of the foregoing,
                    except to the extent this prohibition is not permitted under
                    an applicable law;
                </Text>
                <Text style={styles.point}>
                    - Develop, support or use software, devices, scripts, robots
                    or any other means or processes to interfere with the
                    Wallet, and/or its content or otherwise copy profiles and
                    other data from the Wallet;
                </Text>
                <Text style={styles.point}>
                    - Override any security feature or bypass or circumvent any
                    access controls or use limits of the Wallet;
                </Text>
                <Text style={styles.point}>
                    - Copy, use, disclose or distribute any information obtained
                    from the Wallet, whether directly or through third parties,
                    without the consent of Wallet owner;
                </Text>
                <Text style={styles.point}>
                    - Disclose information that you do not have the consent to
                    disclose;
                </Text>
                <Text style={styles.point}>
                    - Violate the intellectual property rights of others,
                    including copyrights, patents, trademarks, trade secrets or
                    other proprietary rights;
                </Text>
                <Text style={styles.point}>
                    - Violate the intellectual property or other rights of VCL,
                    including, without limitation, (i) copying or distributing
                    our technology, unless it is released under open-source
                    licenses; (ii) using our logos or trademarks;
                </Text>
                <Text style={styles.point}>
                    - Reverse engineer, decompile, disassemble, decipher or
                    otherwise attempt to derive the source code for the Wallet
                    or any related technology that is not open source;
                </Text>
                <Text style={styles.point}>
                    - Imply or state that you are affiliated with or endorsed
                    byVCL without our express consent;
                </Text>
                <Text style={styles.point}>
                    - Rent, lease, loan, trade, sell/re-sell or otherwise
                    monetize the Wallet or related data or access to the same,
                    without our express consent;
                </Text>
                <Text style={styles.point}>
                    - Use bots or other automated methods to access the Wallet,
                    claim or share Credentials;
                </Text>
                <Text style={styles.point}>
                    - Overlay or otherwise modify the Wallet or their appearance
                    (such as by inserting elements into the Services or
                    removing, covering, or obscuring an object included on the
                    Wallet);
                </Text>
                <Text style={[styles.point, styles.paragraph]}>
                    - Interfere with the operation of, or place an unreasonable
                    load on, the Wallet (e.g., spam, denial of service attack,
                    viruses, gaming algorithms).
                </Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.bold}>Right to Remove. </Text> We may
                    remove any Credential on the Services that contains,
                    consists of, or comprises immoral, deceptive, or scandalous
                    matter; or matter which may disparage or falsely suggest a
                    connection with persons, living or dead, institutions,
                    beliefs, or national symbols, or bring them into contempt,
                    or disrepute. We reserve the right to take down any
                    Credential that is reasonably alleged by a third party to
                    infringe any intellectual property right.
                </Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.bold}>Feedback.</Text> Comments,
                    suggestions or materials sent or transmitted to VCL
                    (collectively ‘Feedback’), shall be deemed to be
                    non-confidential and the sole property of VCL. VCL shall own
                    exclusive rights, including, without limitation, all
                    intellectual property rights, in and to such Feedback and
                    shall be entitled to the unrestricted use and dissemination
                    of this Feedback for any purpose, commercial or otherwise,
                    without acknowledgment or compensation to you.
                </Text>
                <Text style={[styles.paragraph, styles.bold]}>
                    YOU MAY NOT USE OR OTHERWISE ACCESS THE WALLET, SERVICES OR
                    CONTENT OTHER THAN FOR THEIR INTENDED PURPOSES.
                </Text>
                <Text style={[styles.paragraph, styles.bold, styles.subtitle]}>
                    5. Your Content and Intellectual Property Rights.
                </Text>
                <Text style={styles.paragraph}>
                    You are solely responsible for the content and other
                    materials you post on or through the Wallet or transmit to
                    or share with other users or recipients (collectively “User
                    Content”). You retain ownership of any intellectual property
                    rights that you hold in your User Content. You hereby
                    consent to VCL’s access, use and processing of your User
                    Content solely for the purpose of providing the Wallet and
                    Services to you.
                </Text>
                <Text style={styles.paragraph}>
                    By posting any User Content you hereby grant and will grant
                    to VCL a nonexclusive, worldwide, royalty free, fully paid
                    up, transferable, sub-licensable, perpetual, irrevocable
                    license to copy, display, transmit, distribute, store,
                    modify and otherwise use your User Content in connection
                    with the operation of the Wallet and Services in any form,
                    medium or technology now known or later developed. By
                    electing to share User Content with Relying Parties, you
                    grant those Relying Parties a non-exclusive license to
                    access and use that User Content solely as permitted by the
                    functionality of the Wallet and Services you elect to
                    utilize. You further acknowledge and agree that VCL will not
                    be responsible for the actions of other users or third
                    parties that make use of the User Content you share with
                    them via the Wallet.
                </Text>
                <Text style={styles.paragraph}>
                    VCL is not responsible for performing, and is not liable for
                    any failure to perform, any back-up of any User Content
                    provided, processed, or stored in or through the Wallet and
                    Services. You are solely responsible for your User Content
                    and the consequences of sharing User Content with VCL or
                    other users. By posting or publishing User Content, you
                    affirm, represent, and warrant that: (A) you are the owner
                    of the User Content; and (B) your User Content, and the use
                    of your User Content as contemplated by this Agreement, does
                    not and will not: (i) infringe, violate, or misappropriate
                    any third-party right, including any copyright, trademark,
                    patent, trade secret, moral right, privacy right, right of
                    publicity, or any other intellectual property or proprietary
                    right; (ii) slander, defame, libel, or invade the right of
                    privacy, publicity or other property rights of any other
                    person or organization; or (iii) cause VCL to violate any
                    law or regulation.
                </Text>
                <Text style={styles.paragraph}>
                    VCL may remove, edit, block, and/or monitor User Content at
                    any time for any reason, including activity which, in its
                    sole judgment violates this Agreement; violates applicable
                    laws, rules, or regulations; is abusive, disruptive,
                    offensive, illegal, or otherwise objectionable; or violates
                    the rights of, or harms or threatens the safety of users of
                    the Wallet and Services. You acknowledge and agree that VCL
                    may preserve User Content and may also disclose User Content
                    if required to do so by law or in the good faith belief that
                    such preservation or disclosure is reasonably necessary to:
                    (i) comply with legal process, applicable laws or government
                    requests; (ii) enforce the terms of this Agreement; (iii)
                    respond to claims that any content violates the rights of
                    third parties; or (iv) protect the rights, property, or
                    personal safety of VCL, its users and the public. You
                    understand that the technical processing and transmission of
                    the Wallet and Services, including your content, may involve
                    (i) transmissions over various networks; and (ii) changes to
                    conform and adapt to technical requirements of connecting
                    networks or devices.
                </Text>
                <Text style={[styles.paragraph, styles.bold, styles.subtitle]}>
                    6. Privacy Policy.
                </Text>
                <Text style={styles.paragraph}>
                    The collection, use and sharing of your personal data is
                    subject to our{' '}
                    <Text
                        style={[{color: theme.colors.link}, styles.underlined]}
                        onPress={() =>
                            Linking.openURL(
                                'https://www.velocitycareerlabs.com/data-policy'
                            )
                        }>
                        Privacy Policy
                    </Text>{' '}
                    and updates. Please make sure you read it carefully before
                    you use the Wallet and the Services.
                </Text>
                <Text style={styles.paragraph}>
                    The unique thing about the Wallet is that the Credential are
                    stored on your device and the backup service you use to back
                    up your device. All Your Credentials and profile Information
                    stored in Your Wallet are owned by You, but only to the
                    extent such Information relates to You (and not other
                    individuals or entities).
                </Text>
                <Text style={styles.paragraph}>
                    ALWAYS USE CAUTION WHEN GIVING OUT ANY PERSONALLY
                    IDENTIFIABLE INFORMATION ABOUT YOURSELF. VCL DOES NOT
                    CONTROL OR ENDORSE THE CONTENT, MESSAGES OR INFORMATION
                    FOUND ON THE SERVICES AND, THEREFORE, VCL SPECIFICALLY
                    DISCLAIMS ANY LIABILITY WITH REGARD TO THE SERVICES AND ANY
                    OTHER ACTIONS RESULTING FROM YOUR PARTICIPATION IN THE
                    SERVICES.
                </Text>
                <Text style={[styles.paragraph, styles.bold]}>
                    You are responsible for the backup of your Wallet data
                </Text>
                <Text style={styles.paragraph}>
                    It is your responsibility to back up your Wallet data, so
                    you&apos;ll be able to restore it in case your Device is
                    lost, stolen, or broken. The License we grant you give you
                    the right to make one copy of the content in the Wallet in
                    any machine-readable form solely for back-up purposes.
                </Text>
                <Text style={styles.paragraph}>
                    If your Device has a backup service that is turned on,
                    you&apos;ll automatically have a copy of your Career Wallet
                    data to use in the event your Device is ever replaced,
                    upgraded, lost, or damaged. Make sure that your Device is
                    set to automatically back up in accordance with your
                    preferences.
                </Text>
                <Text style={styles.paragraph}>
                    Please note that: (i) We will not be providing the security
                    for backup; (ii) We cannot guaranty or ensure that the
                    security measures employed by the backup provider will not
                    be breached or that the data in backup will not be accessed
                    or used by third persons who are not authorized to access
                    Your data; and (iii) We will not be responsible for any
                    breach of the security measures employed by the backup
                    provider and/or the unauthorized access or use of the
                    information contained in backup data.
                </Text>
                <Text style={[styles.paragraph, styles.bold, styles.subtitle]}>
                    7. Indemnification.
                </Text>
                <Text style={styles.paragraph}>
                    To the fullest extent permitted by Applicable Law, you agree
                    to indemnify, defend and hold harmless VCL, its officers,
                    directors, employees, agents, subsidiaries, affiliates,
                    representatives and other partners, predecessors, successors
                    and assigns (individually and collectively, the ’VCL
                    Indemnified Parties’), from and against all actual or
                    alleged VCL Party or third-party claims, damages, awards,
                    judgments, losses, liabilities, obligations, penalties,
                    interest, fees, expenses (including, without limitation,
                    attorneys’ fees and expenses) and costs (including, without
                    limitation, court costs, costs of settlement and costs of
                    pursuing indemnification and insurance), of every kind and
                    nature whatsoever, whether known or unknown, foreseen or
                    unforeseen, matured or unmatured, or suspected or
                    unsuspected, in law or equity, whether in tort, contract or
                    otherwise (collectively, “Claims”), including, but not
                    limited to, damages to property or personal injury, that are
                    caused by, arise out of or are related to (a) your use or
                    misuse of the Wallet, Content and /or Services, (b)
                    Credentials posted to or transmitted through the Services or
                    publicly distributed on the internet, (c) your violation of
                    the terms of this Agreement, (d) your violation of the
                    rights of another, (e) any Feedback you provide and/or (f)
                    your violation of any Applicable Law or regulation. You
                    agree to promptly notify VCL of any third-party Claims and
                    cooperate with the VCL Indemnified Parties in defending such
                    Claims. You further agree that the VCL Indemnified Parties
                    shall have control of the defense or settlement of any
                    third-party Claims.
                </Text>
                <Text style={[styles.paragraph, styles.bold, styles.subtitle]}>
                    8. No warranty.
                </Text>
                <Text style={styles.paragraph}>
                    THE WALLET AND THE SERVICES ARE PROVIDED ON AN “AS-IS” AND
                    “AS AVAILABLE” BASIS. VCL EXPRESSLY DISCLAIMS ALL
                    REPRESENTATIONS, WARRANTIES OR GUARANTEES OF ANY KIND,
                    WHETHER EXPRESS, IMPLIED OR STATUTORY, IN CONNECTION WITH
                    YOUR USE OR INABILITY TO USE THE WALLET AND SERVICES
                    INCLUDING, BUT NOT LIMITED TO THE QUALITY, SUITABILITY,
                    TRUTH, ACCURACY OR COMPLETENESS OF ANY INFORMATION OR
                    MATERIAL CONTAINED OR PRESENTED ON THE WALLET AND SERVICES,
                    THAT THE WALLET IS FULLY COMPATIBLE WITH ANY PARTICULAR
                    PLATFORM, MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
                    TITLE AND NON-INFRINGEMENT. SOME JURISDICTIONS DO NOT ALLOW
                    THE WAIVER OR EXCLUSION OF IMPLIED WARRANTIES SO THEY MAY
                    NOT APPLY TO YOU.
                </Text>
                <Text style={styles.paragraph}>
                    VCL DOES NOT WARRANT THAT (I) THE FUNCTIONS CONTAINED IN THE
                    WALLET AND THE SERVICES WILL MEET ANY REQUIREMENTS OR NEEDS
                    YOU MAY HAVE, (II) THE RESULTS THAT MAY BE OBTAINED FROM THE
                    USE OF THE SERVICES WILL BE ACCURATE OR RELIABLE, (III) THE
                    QUALITY OF SERVICES WILL MEET YOUR EXPECTATIONS, (IV)THAT
                    THE WALLET AND SERVICES WILL OPERATE ERROR FREE, TIMELY,
                    SECURE OR IN AN UNINTERRUPTED MANNER, OR (V) THAT ANY
                    DEFECTS OR ERRORS WILL BE CORRECTED, OR THAT THE SERVICES IS
                    FULLY COMPATIBLE WITH ANY PARTICULAR PLATFORM.
                </Text>
                <Text style={styles.paragraph}>
                    YOU EXPRESSLY AGREE THAT YOUR USE OF WALLET AND THE SERVICES
                    AND YOUR RELIANCE UPON ANY OF THE CONTENT IS AT YOUR SOLE
                    RISK.
                </Text>
                <Text style={[styles.paragraph, styles.bold, styles.subtitle]}>
                    9. Limitation of Liability.
                </Text>
                <Text style={styles.paragraph}>
                    YOU EXPRESSLY UNDERSTAND AND AGREE THAT, TO THE FULLEST
                    EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL VCL OR
                    ANY OF THE VCL INDEMNIFIED PARTIES, BE LIABLE FOR ANY
                    DIRECT,INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR
                    EXEMPLARY DAMAGES (INCLUDING, BUT NOT LIMITED TO, DAMAGES
                    FOR LOSS OF PROFITS, GOODWILL, USE, DATA OR OTHER INTANGIBLE
                    LOSSES) ARISING OUT OF OR IN ANY WAY RELATED TO THE ACCESS
                    OR USE OF THE WALLET, SERVICES OR OTHERWISE RELATED TO THIS
                    AGREEMENT (INCLUDING, BUT NOT LIMITED TO, ANY DAMAGES CAUSED
                    BY OR RESULTING FROM RELIANCE BY ANY USER ON ANY INFORMATION
                    OBTAINED FROM THE SERVICES, OR FROM MISTAKES, OMISSIONS,
                    INTERRUPTIONS, DELETIONS OF FILES OR EMAILS, ERRORS,
                    DEFECTS, BUGS, VIRUSES, TROJAN HORSES, DELAYS IN OPERATION
                    OR TRANSMISSION OR ANY FAILURE OF PERFORMANCE, WHETHER OR
                    NOT RESULTING FROM ACTS OF GOD, COMMUNICATIONS FAILURE,
                    THEFT, DESTRUCTION OR UNAUTHORIZED ACCESS TO VCL’S RECORDS,
                    OR SYSTEMS), REGARDLESS OF THE FORM OF ACTION, WHETHER BASED
                    IN CONTRACT, TORT (INCLUDING, BUT NOT LIMITED TO, SIMPLE
                    NEGLIGENCE, WHETHER ACTIVE, PASSIVE OR IMPUTED), STRICT
                    PRODUCT LIABILITY OR ANY OTHER LEGAL OR EQUITABLE THEORY
                    (EVEN IF VCL HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH
                    DAMAGES AND REGARDLESS OF WHETHER SUCH DAMAGES WERE
                    FORESEEABLE).
                </Text>
                <Text style={styles.paragraph}>
                    TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO
                    EVENT WILL VCL&apos;S MAXIMUM AGGREGATE LIABILITY TO YOU
                    ARISING OUT OF OR IN ANY WAY RELATED TO THIS AGREEMENT, THE
                    ACCESS TO AND USE OF THE WALLET, SERVICES AND OUR CONTENT
                    EXCEED THE AMOUNT OF FEES PAID BY YOU TO VCL IN THE TWELVE
                    (12) MONTHS PRECEDING THE EVENT GIVING RISE TO SUCH
                    LIABILITY OR, IF YOU HAVE NOT PAID, $100. THESE LIMITATIONS
                    AND EXCLUSIONS WILL APPLY NOTWITHSTANDING ANY FAILURE OF
                    ESSENTIAL PURPOSE OF ANY LIMITED REMEDY.
                </Text>
                <Text style={styles.paragraph}>
                    IF YOU ARE DISSATISFIED WITH ANY PORTION OF THE WALLET,
                    SERVICES OR WITH THIS AGREEMENT, YOUR SOLE AND EXCLUSIVE
                    REMEDY IS TO DISCONTINUE USE OF THE WALLET AND SERVICES.
                </Text>
                <Text style={styles.paragraph}>
                    YOU AGREE THAT ANY CAUSE OF ACTION ARISING OUT OF OR RELATED
                    TO THIS AGREEMENT, THE WALLET OR THE SERVICES MUST COMMENCE
                    WITHIN ONE (1) YEAR AFTER THE CAUSE OF ACTION ACCRUES,
                    OTHERWISE, SUCH CAUSE OF ACTION IS PERMANENTLY BARRED.
                </Text>
                <Text style={styles.paragraph}>
                    SOME JURISDICTIONS DO NOT ALLOW THE LIMITATIONS OF DAMAGES
                    AND/OR EXCLUSIONS OF LIABILITY FOR INCIDENTAL OR
                    CONSEQUENTIAL DAMAGES. ACCORDINGLY, SOME OF THE ABOVE
                    LIMITATIONS MAY NOT APPLY TO YOU.
                </Text>
                <Text style={[styles.paragraph, styles.bold, styles.subtitle]}>
                    10. Dispute Resolution; Arbitration; Class Action Waiver.
                </Text>
                <Text style={styles.paragraph}>
                    PLEASE READ THE FOLLOWING SECTION CAREFULLY BECAUSE IT
                    REQUIRES YOU TO ARBITRATE CERTAIN DISPUTES AND CLAIMS WITH
                    VCL AND LIMITS THE MANNER IN WHICH YOU CAN SEEK RELIEF FROM
                    US.
                </Text>
                <Text style={styles.paragraph}>
                    (a) You agree that to the fullest extent permitted by
                    Applicable Law, You will resolve any and all disputes You
                    have with Us that arise out of, or in any way relate to,
                    this Agreement and/or any commercial relationship between
                    You and Us through bi-lateral, binding arbitration as Your
                    sole and exclusive remedy. YOU WAIVE YOUR CONSTITUTIONAL
                    RIGHT TO HAVE ANY SUCH DISPUTE DECIDED IN A COURT OF LAW AND
                    BEFORE A JURY AND, INSTEAD, AGREE TO BINDING ARBITRATION
                    PURSUANT TO THE PROCEDURES REFERENCED IN THIS SECTION. This
                    Agreement is governed by the Federal Arbitration Act, 9
                    U.S.C. § 1, et seq., and evidence a transaction in commerce.
                    The Parties acknowledge that Your agreement to arbitrate
                    constitutes good and valuable consideration for Our
                    covenants in this Agreement.
                </Text>
                <Text style={styles.paragraph}>
                    (b) Arbitration shall be conducted pursuant to the American
                    Arbitration Association’s Consumer Arbitration Rules before
                    a single arbitrator licensed to practice law in the state in
                    which We have Our principal place of business and who is
                    familiar with credit reporting law (if such expertise is
                    applicable to the dispute). The arbitrator shall provide
                    written findings of fact and conclusions of law. Each Party
                    shall pay its own costs and attorneys’ fees, if any, unless
                    the arbitrator rules otherwise based on a statute that
                    affords the prevailing party attorneys’ fees and costs, in
                    which case the arbitrator shall apply the same standards a
                    court would apply to such an award. No Party shall be
                    required to pay any fee or cost that such Party would not be
                    required to pay in a state or federal court action. The
                    Parties agree that the decision of the arbitrator shall be
                    final and binding and not subject to appeal, reconsideration
                    or further review, except as specifically provided by 9
                    U.S.C. §§ 10 or 11. An award in one arbitration proceeding
                    shall not be precedential or binding in any way in a
                    subsequent proceeding, unless the subsequent proceeding
                    concerns identical Parties and issues to the prior
                    proceeding. The Parties are entitled to representation by an
                    attorney or other representative of their choosing in any
                    arbitration. The arbitrator shall issue a written award
                    stating the essential findings and conclusions on which such
                    award is based. The Parties agree to abide by and perform
                    any valid award rendered by the arbitrator, and judgment on
                    the award may be entered in any court having jurisdiction
                    thereof.
                </Text>
                <Text style={styles.paragraph}>
                    (c) TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, YOU
                    WAIVE AND AGREE NOT TO BRING ANY RIGHT TO BRING A CLAIM ON
                    BEHALF OF PERSONS OTHER THAN YOURSELF, OR TO OTHERWISE
                    PARTICIPATE WITH OTHER PERSONS IN, ANY CLASS, COLLECTIVE, OR
                    REPRESENTATIVE ACTION. The arbitrator may not certify or
                    otherwise preside over any form of a class, collective, or
                    representative proceeding, nor may the arbitrator
                    consolidate the claims of multiple Persons into one
                    proceeding. You also agree not to assert claims against Us
                    or Our representatives, affiliates, insurers, successors or
                    assigns in the same proceeding as any other Person, whether
                    by joinder or otherwise, and that any proceeding brought on
                    behalf of multiple claimants or plaintiffs shall be severed
                    into individual proceedings. You further agree to
                    affirmatively “opt out” and to take all other reasonable
                    measures to exclude Yourself from any representative
                    proceeding in which You may be invited to join or otherwise
                    permitted to participate.
                </Text>
                <Text style={styles.paragraph}>
                    For a copy of the AAA Rules, to file a claim or for other
                    information about the AAA, contact the AAA at{' '}
                    <Text
                        style={[{color: theme.colors.link}, styles.underlined]}
                        onPress={() => Linking.openURL('https://www.adr.org/')}>
                        www.adr.org
                    </Text>
                    .
                </Text>
                <Text style={styles.paragraph}>
                    This arbitration provision shall survive the termination of
                    the Services or of this Agreement. If any portion of this
                    arbitration provision is deemed invalid or unenforceable,
                    the remaining portions shall remain in force.
                </Text>
                <Text style={[styles.paragraph, styles.bold, styles.subtitle]}>
                    11. Miscellaneous
                </Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.bold}>Force Majeure.</Text> You agree
                    that We will not be liable for any failures or delays
                    resulting from circumstances or causes beyond Our reasonable
                    control, including, without limitation, pandemic or epidemic
                    (or similar regional health crisis; including COVID-19),
                    fire or other casualty, act of God, war or other violence,
                    or any law, order or requirement of any governmental agency
                    or authority.
                </Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.bold}>
                        Entire Agreement/Amendment.{' '}
                    </Text>
                    This Agreement constitutes the entire agreement between Us
                    and You and supersede all prior or contemporaneous, oral or
                    written, representations, understandings or agreements
                    relating to the subject matter hereof.
                </Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.bold}>Termination. </Text> You may
                    terminate this Agreement at any time. You can do so by
                    deleting your Wallet and no longer accessing or using our
                    Services. Notwithstanding anything contained in this
                    Agreement, we reserve the right, without notice and in our
                    sole discretion, to terminate your right to access or use
                    the Services, at any time and for any or no reason, and you
                    acknowledge and agree that we shall have no liability or
                    obligation to you in such event and that you will not be
                    entitled to a refund of any amounts that you have already
                    paid to us, to the fullest extent permitted by Applicable
                    Law.
                </Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.bold}>Survival.</Text> Except for the
                    limited licenses expressly granted hereunder, which shall
                    terminate upon the expiration or termination of these terms
                    and the termination of your Wallet, all other terms herein
                    will survive the expiration or termination of this Agreement
                    and the termination of your Wallet.
                </Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.bold}>Governing Law.</Text> This
                    Agreement and your access to and use of Wallet and Services
                    shall be governed by and construed in accordance with the
                    internal laws of the State of New York, USA (without
                    reference to the conflicts of law provisions thereof that
                    would require the application of the law of any other
                    jurisdiction).
                </Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.bold}>Venue.</Text> Any dispute between
                    the parties hereto that is not subject to arbitration or
                    cannot be heard in small claims court, shall be resolved in
                    the state or federal courts of the State of New York and the
                    United States, respectively, sitting in the State of New
                    York, and you hereby irrevocably submit to personal
                    jurisdiction in such courts, and waive any defense of
                    inconvenient forum.
                </Text>
                <Text style={styles.paragraph}>
                    Notwithstanding the foregoing, VCL may seek injunctive
                    relief in any court of competent jurisdiction.
                </Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.bold}>Waiver.</Text> No waiver of any
                    obligation under this Agreement shall be valid unless in
                    writing and signed by a duly authorized representative of
                    the parties hereto. No delay or omission by either Party in
                    exercising any right or power shall impair such right or
                    power or be construed to be a waiver. A waiver by either
                    party of any of the obligations to be performed by the other
                    party or any breach thereof shall not be construed to be a
                    waiver of any succeeding breach or of any other obligation.
                </Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.bold}>Successors and Assigns. </Text>
                    This Agreement shall be binding upon and inure solely to the
                    benefit of the parties and both of our respective permitted
                    successors and assigns, and nothing in this Agreement shall
                    confer upon any other person any legal or equitable right,
                    benefit or remedy of any nature whatsoever as a third-party
                    beneficiary under or by reason of this agreement, except and
                    unless as specifically provided herein.
                </Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.bold}>Assignment. </Text>
                    You may not assign or transfer your rights and obligations
                    under this Agreement to any third party without the prior
                    written consent of VCL. Any attempt by You to assign or
                    transfer such rights or obligations shall be void and of no
                    force and effect.
                </Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.bold}>Notices. </Text>Whenever under
                    this Agreement, a Party is required or permitted to give
                    notice to the other, such notice shall be given in writing
                    and shall be deemed to be given in the case of (a) Our
                    notice to You three (3) Business Days after we post such
                    notice through your Wallet in-app notifications (b) Your
                    notice to Us after you send such notice to us via our email
                    on{' '}
                    <Text
                        style={[{color: theme.colors.link}, styles.underlined]}
                        onPress={() =>
                            Linking.openURL(
                                'mailto:hello@velocitycareerlabs.com'
                            )
                        }>
                        hello@velocitycareerlabs.com
                    </Text>
                    , upon electronic confirmation of receipt.
                </Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.bold}>Severability. </Text> If any
                    provision of this Agreement is held to be illegal, invalid
                    or unenforceable under present or future Applicable Law
                    while this Agreement or any provision of this Agreement
                    remains in effect: (a) the legality, validity and
                    enforceability of the remaining provisions of this Agreement
                    will not be affected thereby so long as the economic or
                    legal substance of the transactions contemplated by the
                    Agreement are not affected in any manner materially adverse
                    to either Party; and (b) You and We agree that the body
                    making the determination of illegality, invalidity or
                    unenforceability shall have the power to reduce the scope,
                    duration and/or area of the provision, to delete specific
                    words or phrases and to replace any illegal, invalid or
                    unenforceable provision with a provision that is legal,
                    valid and enforceable and that comes closest to expressing
                    the intention of the illegal, invalid or unenforceable
                    provision, and this Agreement shall be enforceable as so
                    modified.
                </Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.bold}>Contact Us.</Text> For general
                    inquiries, you may contact us{' '}
                    <Text
                        style={[{color: theme.colors.link}, styles.underlined]}
                        onPress={() =>
                            Linking.openURL(
                                'https://www.velocitycareerlabs.com/'
                            )
                        }>
                        online
                    </Text>
                    . For legal notices or Services of process, you may write us
                    at:{' '}
                    <Text
                        style={[{color: theme.colors.link}, styles.underlined]}
                        onPress={() =>
                            Linking.openURL(
                                'mailto:admin@velocitycareerlabs.com'
                            )
                        }>
                        admin@velocitycareerlabs.com
                    </Text>
                    . We will make an effort to reply within a reasonable
                    timeframe.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1
    },
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 20
    },
    contentContainer: {paddingBottom: 30, paddingTop: 5},
    title: {
        textAlign: 'center'
    },
    subtitle: {paddingLeft: 20},
    bold: {
        ...fontFamily({size: 15, weight: '800'})
    },
    paragraph: {
        paddingBottom: 10,
        textAlign: 'justify'
    },
    underlined: {textDecorationLine: 'underline'},
    point: {
        textAlign: 'justify'
    }
});
