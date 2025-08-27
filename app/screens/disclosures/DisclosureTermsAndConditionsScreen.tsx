import React from 'react';
import {Linking, ScrollView, StyleSheet, Text} from 'react-native';
import {useTheme} from 'react-native-elements';

import {useSelector} from 'react-redux';
import {termsAndConditionsLinkSelector} from 'app/store/selectors/appConfig';
import {fontFamily} from '../../utilities/helpers';

export const DisclosureTermsAndConditionsScreen: React.FC = () => {
    const {theme} = useTheme();
    const termsAndConditionsLink = useSelector(termsAndConditionsLinkSelector);

    return (
        <ScrollView
            contentContainerStyle={styles.contentContainer}
            style={styles.container}>
            <Text style={[styles.paragraph, styles.title, styles.bold]}>
                TERMS AND CONDITIONS FOR SHARING CREDENTIALS VIA THE
                VERIFYMYCREDS.COM SERVICE
            </Text>
            <Text style={[styles.paragraph, styles.bold]}>
                Last Updated: December 22, 2022
            </Text>
            <Text style={styles.paragraph}>
                By sharing the Credentials (defined below) stored on your career
                wallet (the <Text style={styles.bold}>“Wallet”</Text>) with
                Relying Parties (defined below) via the VerifyMyCreds.com
                Service offered by Velocity Career Labs, Inc. or its affiliates (
                <Text style={styles.bold}>“VCL”</Text>,
                <Text style={styles.bold}> “Us”</Text>,
                <Text style={styles.bold}> “We”</Text>,
                <Text style={styles.bold}> “Our”</Text>), as may be updated or
                otherwise modified from time to time, and all intellectual
                property contained there in (collectively, the{' '}
                <Text style={styles.bold}>“Service”</Text>), you agree to be
                bound by these Terms and Conditions for Sharing Credentials and
                all terms incorporated here in by reference, including Our{' '}
                <Text
                    style={{color: theme.colors.link}}
                    onPress={() => Linking.openURL(termsAndConditionsLink)}>
                    Privacy Policy{' '}
                </Text>
                (collectively, this
                <Text style={styles.bold}> “Agreement”</Text>).
            </Text>
            <Text style={styles.paragraph}>
                We encourage you to review this Agreement frequently to ensure
                that you understand the terms and conditions that apply when you
                access or use the Service. We reserve all rights to change or
                modify this Agreement at any time and for any reason, at Our
                sole discretion. If we make material changes to this Agreement,
                we will provide you notice of such material changes through a
                push notification to your Wallet, or by other means, to provide
                you the opportunity to review the changes before they become
                effective. We agree that changes cannot be retroactive. If you
                object to any changes, you may terminate this Agreement, at any
                time. You can do so by no longer accessing or using our
                Service. Your continued use of the Service after we publish or
                send a notice about our changes to this Agreement means that you
                are consenting to the updated terms as of their effective date.
            </Text>
            <Text style={styles.paragraph}>
                Unless explicitly stated otherwise, any new features that
                augment or enhance the current Service shall be subject to this
                Agreement. Your continued use of the Service after any such
                changes constitutes your acceptance of the revised Agreement.
            </Text>
            <Text style={styles.paragraph}>
                VCL reserves the right at any time and from time to time to
                modify, discontinue or suspend, temporarily or permanently, its
                offering of the Service (or any part thereof) without notice or
                liability to you or any third party.
            </Text>
            <Text style={styles.paragraph}>
                IF YOU DO NOT AGREE WITH ANY OF THE TERMS AND CONDITIONS OF THIS
                AGREEMENT, YOU MAY NOT ACCESS OR OTHERWISE USE THE SERVICE.
            </Text>
            <Text style={[styles.paragraph, styles.bold, styles.subtitle]}>
                1. General.
            </Text>
            <Text style={[styles.paragraph, styles.bold]}>
                Who can you share your Credentials with?
            </Text>
            <Text style={styles.paragraph}>
                Your Wallet allows you to stack proofs of your employment
                history, educational background, skills, and qualifications,
                collectively to build your verifiable professional profile and
                to store it privately on your device. We call these proofs
                ‘Career Credentials’ (the
                <Text style={styles.bold}> “Credentials”</Text>).
            </Text>
            <Text style={styles.paragraph}>
                The unique thing about the Wallet is that the information stored
                on it is private and not accessible to anyone but you. Only when
                you decide to share your credentials with a third party will a
                copy of the credentials you’ve selected to share travel on a
                peer-to-peer connection to the selected third party. These third
                parties are called
                <Text style={styles.bold}> “Relying Parties”</Text>.
            </Text>
            <Text style={styles.paragraph}>
                By using the Service, you can share your Credentials with any
                Relying Party, even if they are not connected to Velocity
                Network™.
            </Text>
            <Text style={[styles.paragraph, styles.bold]}>
                How to share your Credentials with a Relying Party?
            </Text>
            <Text style={styles.paragraph}>
                To share a Credential with a Relying Party, tap the share icon
                at the top right. Select the Credentials you’d like to share and
                tap Share at the bottom. You can then choose to share via a link
                or a QR code by copying the link/code and sending it via email,
                SMS, LinkedIn message, etc.
            </Text>
            <Text style={styles.paragraph}>
                They can then choose to verify it using Our verification
                website.
            </Text>
            <Text style={[styles.paragraph, styles.bold]}>
                How long are your Credentials stored on the verification server?
            </Text>
            <Text style={styles.paragraph}>
                Credentials are stored on the verification server until you delete 
                them from your wallet, which can be done at any time. 
            </Text>
            <Text style={[styles.paragraph, styles.bold]}>
                What if you no longer want your Credentials stored on the
                verification server?
            </Text>
            <Text style={styles.paragraph}>
                Tap the Disclosures tab, select the disclosed Credential you’d
                like removed from the verification server and tap Revoke.
            </Text>
            <Text style={[styles.paragraph, styles.bold]}>
                A Relying Party says they clicked the link or scanned the QR
                code you gave them, but the verification website says they don’t
                have any Credentials on file for you. What happened?
            </Text>
            <Text style={styles.paragraph}>
                If you revoked your credential or it expired (it’s been six
                months since you shared it/extended the share), it is no longer
                on the verification server. You can simply re-share it and
                generate a new link and QR code from your Wallet.
            </Text>
            <Text style={styles.paragraph}>
                YOU ACKNOWLEDGE AND AGREE THAT WE HAVE NO CONTROL AND MAKE NO
                REPRESENTATION WITH RESPECT TO THE ACTIONS OR ERRORS OF RELYING
                PARTIES OR ANY INFORMATION PROVIDED OR EXCHANGED WITH SUCH
                RELYING PARTIES BY YOU. YOU UNDERSTAND AND AGREE THAT WE OPERATE
                SIMPLY AS A CONDUIT FOR YOU TO SHARE YOUR VERIFIABLE CREDENTIALS
                WITH THEM. WE ARE NOT RESPONSIBLE OR LIABLE IN ANY MANNER FOR
                SUCH RELYING PARTIES, OR FOR ANY LOSS OR DAMAGE OF ANY SORT
                INCURRED BY YOU AS THE RESULT THEREOF, AND WE EXPRESSLY
                DISCLAIM, AND YOU EXPRESSLY RELEASE US AND OUR AFFILIATES AND
                REPRESENTATIVES FROM, ANY AND ALL LIABILITY WHATSOEVER FOR ANY
                CONTROVERSIES, CLAIMS, SUITS, INJURIES, LOSS, HARM AND/OR
                DAMAGES, ARISING FROM AND/OR IN ANY WAY RELATED TO SUCH RELYING
                PARTIES.
            </Text>
            <Text style={styles.paragraph}>
                NOTE THAT THE SERVICE IS NOT A GUARANTEE AGAINST IDENTITY THEFT
                OR ONLINE IDENTITY FRAUD AND IS NOT A SUBSTITUTE FOR ONLINE
                SECURITY SOFTWARE.
            </Text>
            <Text style={[styles.paragraph, styles.bold, styles.subtitle]}>
                2. Eligibility.
            </Text>
            <Text style={styles.paragraph}>
                By using Our Service, you represent and warrant that you (a) are
                Minimum Ageor older, (b) have not been previously suspended or
                removed from using your Walletor Our Service,or engaged in any
                activity that could result in suspension or removal from using
                your Walletor Our Service, (c) do not have more than one Wallet,
                which must be in your real name, and (d) have full power and
                authority to enter into this Agreement and in so doing will not
                violate any other agreement to which you are a party.
            </Text>
            <Text style={styles.paragraph}>
                <Text style={styles.bold}>“Minimum Age”</Text> means 13 years
                old. However, if law requires that you must be older in order
                for VCL to lawfully provide you access to the Wallet without
                parental consent (including using of your personal data) then
                the Minimum Age is such older age.
            </Text>
            <Text style={[styles.paragraph, styles.bold, styles.subtitle]}>
                3. Access to the Service.
            </Text>
            <Text style={styles.paragraph}>
                <Text style={styles.bold}>
                    License to Access and Use the Service.{' '}
                </Text>
                VCL retains all right, title, and interest in and to the
                Service, including without limitation all software used to
                provide the Service, all graphics, user interfaces, logos,
                copyrights, patents and trademarks reproduced through the
                Service, all content and other materials contained therein,
                including, without limitation, all designs, text, pictures,
                information, data, software, sound files, other files and the
                selection and arrangement thereof (collectively,
                <Text style={styles.bold}> “Content”</Text>).
            </Text>
            <Text style={styles.paragraph}>
                You are hereby granted a limited, non-exclusive,
                non-transferable, non-sublicensable license to access and use
                the Service for your own personal use. However, such license is
                subject to the terms of this Agreement. The limited license
                granted herein does not grant you any intellectual property
                license or rights in or to the Service or any of its components
                except as provided in this Agreement. VCL reserves all rights
                not granted in this Agreement.
            </Text>
            <Text style={styles.paragraph}>
                YOU AGREE THAT YOU ARE SOLELY RESPONSIBLE FOR YOUR CONDUCT WHILE
                ACCESSING OR USING THE SERVICE. YOU AGREE THAT YOU WILL PROVIDE
                ACCURATE INFORMATION ON YOUR WALLET AND KEEP IT UPDATED. YOU
                AGREE NOT TO MISUSE THE WALLET AND SERVICE. ANY USE OF THE
                WALLET, SERVICE OR CONTENT OTHER THAN AS SPECIFICALLY AUTHORIZED
                HEREIN, WITHOUT OUR PRIOR WRITTEN PERMISSION, IS STRICTLY
                PROHIBITED AND WILL TERMINATE THE LICENSE GRANTED HEREIN.
            </Text>
            <Text style={styles.paragraph}>
                <Text style={styles.bold}>
                    Compliance with Applicable Laws.
                </Text>
                You may only use the Service in compliance with all Applicable
                Laws, including without limitation privacy laws, intellectual
                property laws and export and re-export control laws and
                regulations.
                <Text style={styles.bold}> “Applicable Law”</Text> or
                <Text style={styles.bold}> “Law” </Text>in this Agreement means
                all local, state, national and international laws, statutes,
                rules, regulations, or common law applicable to you and Us in
                connection with this Agreement and your use of the Service.
            </Text>
            <Text style={[styles.paragraph, styles.bold]}>
                Additional “Dos” and “Don’ts”
            </Text>
            <Text style={styles.paragraph}>
                This list of “Dos” and “Don’ts” limit what you are expected to
                do and what you cannot do when using Our Service:
            </Text>
            <Text style={[styles.paragraph, styles.underlined]}>Do</Text>
            <Text style={styles.point}>
                - Provide accurate information when you share your Credentials
                with Relying Parties;
            </Text>
            <Text style={styles.point}>- Use your real identity;</Text>
            <Text style={[styles.point, styles.paragraph]}>
                - Use the Service in a professional manner.
            </Text>
            <Text style={[styles.paragraph, styles.underlined]}>Don’t</Text>
            <Text style={styles.point}>
                - Create a false identity, misrepresent your identity, create a
                profile for anyone other than yourself (a real person), or use
                or attempt to use another’s wallet or profile;
            </Text>
            <Text style={styles.point}>
                - Use the Service for any purpose other than as described
                herein;
            </Text>
            <Text style={styles.point}>
                - Copy, “frame” or “mirror” the Service;
            </Text>
            <Text style={styles.point}>
                - Sell, assign, transfer, lease, rent, sublicense, or otherwise
                distribute or make available the Service to any third party;
            </Text>
            <Text style={styles.point}>
                - Modify, alter, adapt, arrange, or translate the Service
            </Text>
            <Text style={styles.point}>
                - Systematically collect any data from the Service (by scraping
                or otherwise), attempt to re-identify deidentified data from the
                Service, decompile, disassemble, decrypt, reverse engineer,
                extract, or otherwise attempt to discover the source code or
                non-literal aspects (such as the underlying structure, sequence,
                organization, file formats, non-public APIs, ideas, or
                algorithms) of the Service;
            </Text>
            <Text style={styles.point}>
                - Remove, alter, or conceal any copyright, trademark, or other
                proprietary rights notices displayed on or in the Service;
            </Text>
            <Text style={styles.point}>
                - Circumvent, disable or otherwise interfere with
                security-related or technical features or protocols of the
                Service;
            </Text>
            <Text style={styles.point}>
                - Make a derivative work of the Service, or use it to develop
                any service or product that is the same as (or substantially
                similar to) it;
            </Text>
            <Text style={styles.point}>
                - Store or transmit any robot, malware, Trojan horse, spyware,
                or similar malicious item intended (or that has the potential)
                to damage or disrupt the Service;
            </Text>
            <Text style={styles.point}>
                - Employ any hardware, software, device, or technique to pool
                connections or reduce the number of licenses, servers, nodes, or
                users that directly access or use the Service (sometimes
                referred to as ‘virtualization’, ‘multiplexing’ or ‘pooling’) in
                order to circumvent the restrictions on use contained herein;
            </Text>
            <Text style={styles.point}>
                - Forge or manipulate identifiers in order to disguise the
                origin of any data or content inputted or uploaded to, or
                transmitted through, the Service;
            </Text>
            <Text style={styles.point}>
                - Take any action that imposes or may impose (as determined in
                VCL’s reasonable discretion) an unreasonable or
                disproportionately large load on the servers, network,
                bandwidth, or other cloud infrastructure which operate or
                support the Service, or otherwise systematically abuse or
                disrupt the integrity of such servers, network, bandwidth, or
                infrastructure; and/or
            </Text>
            <Text style={[styles.point, styles.paragraph]}>
                - Access or use the Service other than as expressly permitted
                herein.
            </Text>
            <Text style={styles.paragraph}>
                <Text style={styles.bold}>Right to Remove.</Text> We may remove
                any Credential on the Service that contains, consists of, or
                comprises immoral, deceptive, or scandalous matter; or matter
                which may disparage or falsely suggest a connection with
                persons, living or dead, institutions, beliefs, or national
                symbols, or bring them into contempt, or disrepute. We reserve
                the right to take down any Credential that is reasonably alleged
                by a third party to infringe any intellectual property right.
            </Text>
            <Text style={styles.paragraph}>
                <Text style={styles.bold}>Feedback.</Text> Comments, suggestions
                or materials sent or transmitted to VCL (collectively{' '}
                <Text style={styles.bold}>“Feedback”</Text>), shall be deemed to
                be non-confidential and the sole property of VCL. VCL shall own
                exclusive rights, including, without limitation, all
                intellectual property rights, in and to such Feedback and shall
                be entitled to the unrestricted use and dissemination of this
                Feedback for any purpose, commercial or otherwise, without
                acknowledgment or compensation to you.
            </Text>
            <Text style={[styles.paragraph, styles.bold]}>
                YOU MAY NOT USE OR OTHERWISE ACCESS THE SERVICE OR CONTENT OTHER
                THAN FOR THEIR INTENDED PURPOSES.
            </Text>
            <Text style={[styles.paragraph, styles.bold, styles.subtitle]}>
                4. Your Content and Intellectual Property Rights
            </Text>
            <Text style={styles.paragraph}>
                You are solely responsible for the content and other materials
                (including, without limitation, your Credentials) you post on or
                through the Service or transmit to or share with other users or
                recipients (collectively
                <Text style={styles.bold}> “User Content”</Text>). You retain
                ownership of any intellectual property rights that you hold in
                your User Content. You hereby consent to VCL’s access, use and
                processing of your User Content solely for the purpose of
                providing the Service to you.
            </Text>
            <Text style={styles.paragraph}>
                By posting any User Content you hereby grant and will grant to
                VCL a non-exclusive, worldwide, royalty free, fully paid up,
                transferable, sub-licensable, perpetual, irrevocable license to
                copy, display, transmit, distribute, store, modify and otherwise
                use your User Content in connection with the Service in any
                form, medium or technology now known or later developed.
            </Text>
            <Text style={styles.paragraph}>
                BY ELECTING TO SHARE USER CONTENT WITH RELYING PARTIES USING THE
                SERVICE, YOU GRANT THOSE RELYING PARTIES A NON-EXCLUSIVE LICENSE
                TO ACCESS AND USE THAT USER CONTENT SOLELY AS PERMITTED BY THE
                FUNCTIONALITY OF THE WALLET AND SERVICE YOU ELECT TO UTILIZE.
                YOU FURTHER ACKNOWLEDGE AND AGREE THAT VCL WILL NOT BE
                RESPONSIBLE FOR THE ACTIONS OF RELYING PARTIES THAT MAKE USE OF
                THE USER CONTENT YOU SHARE WITH THEM VIA THE SERVICE.
            </Text>
            <Text style={styles.paragraph}>
                VCL is not responsible for performing, and is not liable for any
                failure to perform, any back-up of any User Content provided,
                processed, or stored in or through the Wallet and Service. You
                are solely responsible for your User Content and the
                consequences of sharing User Content with VCL or other users. By
                posting or publishing User Content, you affirm, represent, and
                warrant that: (A) you are the owner of the User Content; and (B)
                your User Content, and the use of your User Content as
                contemplated by this Agreement, does not and will not: (i)
                infringe, violate, or misappropriate any third-party right,
                including any copyright, trademark, patent, trade secret, moral
                right, privacy right, right of publicity, or any other
                intellectual property or proprietary right; (ii) slander,
                defame, libel, or invade the right of privacy, publicity or
                other property rights of any other person or organization; or
                (iii) cause VCL to violate any law or regulation.
            </Text>
            <Text style={styles.paragraph}>
                VCL may remove, edit, block, and/or monitor User Content at any
                time for any reason, including activity which, in its sole
                judgment violates this Agreement; violates applicable laws,
                rules, or regulations; is abusive, disruptive, offensive,
                illegal, or otherwise objectionable; or violates the rights of,
                or harms or threatens the safety of users of the Wallet and
                Service. You acknowledge and agree that VCL may preserve User
                Content and may also disclose User Content if required to do so
                by law or in the good faith belief that such preservation or
                disclosure is reasonably necessary to: (i) comply with legal
                process, applicable laws or government requests; (ii) enforce
                the terms of this Agreement; (iii) respond to claims that any
                content violates the rights of third parties; or (iv) protect
                the rights, property, or personal safety of VCL, its users and
                the public. You understand that the technical processing and
                transmission of the Wallet and Service, including your content,
                may involve (i) transmissions over various networks; and (ii)
                changes to conform and adapt to technical requirements of
                connecting networks or devices.
            </Text>
            <Text style={styles.paragraph}>
                VCL OFFERS NO REPRESENTATION, WARRANTY OR GUARANTEE THAT USER
                CONTENT WILL NOT BE EXPOSED OR DISCLOSED THROUGH ERRORS OR THE
                ACTIONS OF RELYING PARTIES.
            </Text>
            <Text style={[styles.paragraph, styles.bold, styles.subtitle]}>
                5. Privacy Policy
            </Text>
            <Text style={styles.paragraph}>
                The collection, use and sharing of your personal data is subject
                to Our{' '}
                <Text
                    style={{color: theme.colors.link}}
                    onPress={() => Linking.openURL(termsAndConditionsLink)}>
                    Privacy Policy
                </Text>{' '}
                and updates. Please make sure you read it carefully before you
                use the Service.
            </Text>
            <Text style={styles.paragraph}>
                ALWAYS USE CAUTION WHEN GIVING OUT ANY PERSONALLY IDENTIFIABLE
                INFORMATION ABOUT YOURSELF. VCL DOES NOT CONTROL OR ENDORSE THE
                CONTENT, MESSAGES OR INFORMATION FOUND ON THE SERVICE AND,
                THEREFORE, VCL SPECIFICALLY DISCLAIMS ANY LIABILITY WITH REGARD
                TO THE SERVICE AND ANY OTHER ACTIONS RESULTING FROM YOUR
                PARTICIPATION IN THE SERVICE.
            </Text>
            <Text style={[styles.paragraph, styles.bold]}>
                You are responsible for the backup of your Wallet data
            </Text>
            <Text style={styles.paragraph}>
                It is your responsibility to back up your Wallet data, so you’ll
                be able to restore it in case your device is lost, stolen, or
                broken. The License we grant you give you the right to make one
                copy of the content in the Wallet in any machine-readable form
                solely for back-up purposes.
            </Text>
            <Text style={styles.paragraph}>
                If your device has a backup service that is turned on, you’ll
                automatically have a copy of your Wallet data to use in the
                event your device is ever replaced, upgraded, lost, or damaged.
                Make sure that your device is set to automatically back up in
                accordance with your preferences.
            </Text>
            <Text style={styles.paragraph}>
                Please note that: (i) We will not be providing the security for
                backup; (ii) We cannot guaranty or ensure that the security
                measures employed by the backup provider will not be breached or
                that the data in backup will not be accessed or used by third
                persons who are not authorized to access Your data; and (iii) We
                will not be responsible for any breach of the security measures
                employed by the backup provider and/or the unauthorized access
                or use of the information contained in backup data.
            </Text>
            <Text style={[styles.paragraph, styles.bold, styles.subtitle]}>
                6. Indemnification
            </Text>
            <Text style={styles.paragraph}>
                To the fullest extent permitted by Applicable Law, you agree to
                indemnify, defend and hold harmless VCL, its officers,
                directors, employees, agents, subsidiaries, affiliates,
                representatives and other partners, predecessors, successors and
                assigns (individually and collectively, the
                <Text style={styles.bold}> “VCL Indemnified Parties”</Text>),
                from and against all actual or alleged VCL Party or third-party
                claims, damages, awards, judgments, losses, liabilities,
                obligations, penalties, interest, fees, expenses (including,
                without limitation, attorneys” fees and expenses) and costs
                (including, without limitation, court costs, costs of settlement
                and costs of pursuing indemnification and insurance), of every
                kind and nature whatsoever, whether known or unknown, foreseen
                or unforeseen, matured or unmatured, or suspected or
                unsuspected, in law or equity, whether in tort, contract or
                otherwise (collectively,
                <Text style={styles.bold}> “Claims”</Text>), including, but not
                limited to, damages to property or personal injury, that are
                caused by, arise out of or are related to (a) your use or misuse
                of the Wallet, Content and/or Service, (b) Credentials posted
                to or transmitted through the Service or publicly distributed on
                the internet, (c) your violation of the terms of this Agreement,
                (d) your violation of the rights of another, (e) any Feedback
                you provide and/or (f) your violation of any Applicable Law or
                regulation. You agree to promptly notify VCL of any third-party
                Claims and cooperate with the VCL Indemnified Parties in
                defending such Claims. You further agree that the VCL
                Indemnified Parties shall have control of the defense or
                settlement of any third-party Claims.
            </Text>
            <Text style={[styles.paragraph, styles.bold, styles.subtitle]}>
                7. No warranty
            </Text>
            <Text style={styles.paragraph}>
                THE SERVICE IS PROVIDED ON AN “AS-IS” AND “AS AVAILABLE” BASIS.
                VCL EXPRESSLY DISCLAIMS ALL REPRESENTATIONS, WARRANTIES OR
                GUARANTEES OF ANY KIND, WHETHER EXPRESS, IMPLIED OR STATUTORY,
                IN CONNECTION WITH YOUR USE OR INABILITY TO USE THE SERVICE
                INCLUDING, BUT NOT LIMITED TO THE QUALITY, SUITABILITY, TRUTH,
                ACCURACY OR COMPLETENESS OF ANY INFORMATION OR MATERIAL
                CONTAINED OR PRESENTED ON THE SERVICE, MERCHANTABILITY, FITNESS
                FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. SOME
                JURISDICTIONS DO NOT ALLOW THE WAIVER OR EXCLUSION OF IMPLIED
                WARRANTIES SO THEY MAY NOT APPLY TO YOU.
            </Text>
            <Text style={styles.paragraph}>
                VCL DOES NOT WARRANT THAT (I) THE FUNCTIONS CONTAINED IN THE
                SERVICE WILL MEET ANY REQUIREMENTS OR NEEDS YOU MAY HAVE, (II)
                THE RESULTS THAT MAY BE OBTAINED FROM THE USE OF THE SERVICE
                WILL BE ACCURATE OR RELIABLE, (III) THE QUALITY OF SERVICE WILL
                MEET YOUR EXPECTATIONS, (IV) THAT THE SERVICE WILL OPERATE ERROR
                FREE, TIMELY, SECURE OR IN AN UNINTERRUPTED MANNER, OR (V) THAT
                ANY DEFECTS OR ERRORS WILL BE CORRECTED, OR THAT THE SERVICE IS
                FULLY COMPATIBLE WITH ANY PARTICULAR PLATFORM.
            </Text>
            <Text style={styles.paragraph}>
                YOU EXPRESSLY AGREE THAT YOUR USE OF THE SERVICE AND YOUR
                RELIANCE UPON ANY OF THE CONTENT IS AT YOUR SOLE RISK.
            </Text>
            <Text style={[styles.paragraph, styles.bold, styles.subtitle]}>
                8. Limitation of Liability
            </Text>
            <Text style={styles.paragraph}>
                YOU EXPRESSLY UNDERSTAND AND AGREE THAT, TO THE FULLEST EXTENT
                PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL VCL OR ANY OF THE
                VCL INDEMNIFIED PARTIES, BE LIABLE FOR ANY DIRECT,INDIRECT,
                INCIDENTAL, SPECIAL, CONSEQUENTIAL OR EXEMPLARY DAMAGES
                (INCLUDING, BUT NOT LIMITED TO, DAMAGES FOR LOSS OF PROFITS,
                GOODWILL, USE, DATA OR OTHER INTANGIBLE LOSSES) ARISING OUT OF
                OR IN ANY WAY RELATED TO THE ACCESS OR USE OF THE SERVICE OR
                OTHERWISE RELATED TO THIS AGREEMENT (INCLUDING, BUT NOT LIMITED
                TO, ANY DAMAGES CAUSED BY OR RESULTING FROM RELIANCE BY ANY USER
                ON ANY INFORMATION OBTAINED FROM THE SERVICE, OR FROM MISTAKES,
                OMISSIONS, INTERRUPTIONS, DELETIONS OF FILES OR EMAILS, ERRORS,
                DEFECTS, BUGS, VIRUSES, TROJAN HORSES, DELAYS IN OPERATION OR
                TRANSMISSION OR ANY FAILURE OF PERFORMANCE, WHETHER OR NOT
                RESULTING FROM ACTS OF GOD, COMMUNICATIONS FAILURE, THEFT,
                DESTRUCTION OR UNAUTHORIZED ACCESS TO VCL’S RECORDS, OR
                SYSTEMS), REGARDLESS OF THE FORM OF ACTION, WHETHER BASED IN
                CONTRACT, TORT (INCLUDING, BUT NOT LIMITED TO, SIMPLE
                NEGLIGENCE, WHETHER ACTIVE, PASSIVE OR IMPUTED), STRICT PRODUCT
                LIABILITY OR ANY OTHER LEGAL OR EQUITABLE THEORY (EVEN IF VCL
                HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES AND
                REGARDLESS OF WHETHER SUCH DAMAGES WERE FORESEEABLE).
            </Text>
            <Text style={styles.paragraph}>
                TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT
                WILL VCL’S MAXIMUM AGGREGATE LIABILITY TO YOU ARISING OUT OF OR
                IN ANY WAY RELATED TO THIS AGREEMENT, THE ACCESS TO AND USE OF
                THE SERVICE AND OUR CONTENT EXCEED THE AMOUNT OF FEES PAID BY
                YOU TO VCL IN THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING
                RISE TO SUCH LIABILITY OR, IF YOU HAVE NOT PAID, $100. THESE
                LIMITATIONS AND EXCLUSIONS WILL APPLY NOTWITHSTANDING ANY
                FAILURE OF ESSENTIAL PURPOSE OF ANY LIMITED REMEDY.
            </Text>
            <Text style={styles.paragraph}>
                IF YOU ARE DISSATISFIED WITH ANY PORTION OF THE SERVICE OR WITH
                THIS AGREEMENT, YOUR SOLE AND EXCLUSIVE REMEDY IS TO DISCONTINUE
                USE OF THE WALLET AND/OR SERVICE.
            </Text>
            <Text style={styles.paragraph}>
                YOU AGREE THAT ANY CAUSE OF ACTION ARISING OUT OF OR RELATED TO
                THIS AGREEMENT OR THE SERVICE MUST COMMENCE WITHIN ONE (1) YEAR
                AFTER THE CAUSE OF ACTION ACCRUES, OTHERWISE, SUCH CAUSE OF
                ACTION IS PERMANENTLY BARRED.
            </Text>
            <Text style={styles.paragraph}>
                SOME JURISDICTIONS DO NOT ALLOW THE LIMITATIONS OF DAMAGES
                AND/OR EXCLUSIONS OF LIABILITY FOR INCIDENTAL OR CONSEQUENTIAL
                DAMAGES. ACCORDINGLY, SOME OF THE ABOVE LIMITATIONS MAY NOT
                APPLY TO YOU.
            </Text>
            <Text style={[styles.paragraph, styles.bold, styles.subtitle]}>
                9. Dispute Resolution; Arbitration; Class Action Waiver.
            </Text>
            <Text style={styles.paragraph}>
                PLEASE READ THE FOLLOWING SECTION CAREFULLY BECAUSE IT REQUIRES
                YOU TO ARBITRATE CERTAIN DISPUTES AND CLAIMS WITH VCL AND LIMITS
                THE MANNER IN WHICH YOU CAN SEEK RELIEF FROM US.
            </Text>
            <Text style={styles.paragraph}>
                (a) You agree that to the fullest extent permitted by Applicable
                Law, you will resolve any and all disputes you have with Us that
                arise out of, or in any way relate to, this Agreement and/or any
                commercial relationship between you and Us through bi-lateral,
                binding arbitration as Your sole and exclusive remedy. YOU WAIVE
                YOUR CONSTITUTIONAL RIGHT TO HAVE ANY SUCH DISPUTE DECIDED IN A
                COURT OF LAW AND BEFORE A JURY AND, INSTEAD, AGREE TO BINDING
                ARBITRATION PURSUANT TO THE PROCEDURES REFERENCED IN THIS
                SECTION. This Agreement is governed by the Federal Arbitration
                Act, 9 U.S.C. § 1, et seq., and evidence a transaction in
                commerce. The Parties acknowledge that your agreement to
                arbitrate constitutes good and valuable consideration for Our
                covenants in this Agreement.
            </Text>
            <Text style={styles.paragraph}>
                (b) Arbitration shall be conducted pursuant to the American
                Arbitration Association’s Consumer Arbitration Rules before a
                single arbitrator licensed to practice law in the state in which
                We have Our principal place of business and who is familiar with
                credit reporting law (if such expertise is applicable to the
                dispute). The arbitrator shall provide written findings of fact
                and conclusions of law. Each Party shall pay its own costs and
                attorneys’ fees, if any, unless the arbitrator rules otherwise
                based on a statute that affords the prevailing party attorneys’
                fees and costs, in which case the arbitrator shall apply the
                same standards a court would apply to such an award. No Party
                shall be required to pay any fee or cost that such Party would
                not be required to pay in a state or federal court action. The
                Parties agree that the decision of the arbitrator shall be final
                and binding and not subject to appeal, reconsideration or
                further review, except as specifically provided by 9 U.S.C. §§
                10 or 11. An award in one arbitration proceeding shall not be
                precedential or binding in any way in a subsequent proceeding,
                unless the subsequent proceeding concerns identical Parties and
                issues to the prior proceeding. The Parties are entitled to
                representation by an attorney or other representative of their
                choosing in any arbitration. The arbitrator shall issue a
                written award stating the essential findings and conclusions on
                which such award is based. The Parties agree to abide by and
                perform any valid award rendered by the arbitrator, and judgment
                on the award may be entered in any court having jurisdiction
                thereof.
            </Text>
            <Text style={styles.paragraph}>
                (c) TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, YOU WAIVE
                AND AGREE NOT TO BRING ANY RIGHT TO BRING A CLAIM ON BEHALF OF
                PERSONS OTHER THAN YOURSELF, OR TO OTHERWISE PARTICIPATE WITH
                OTHER PERSONS IN, ANY CLASS, COLLECTIVE, OR REPRESENTATIVE
                ACTION. The arbitrator may not certify or otherwise preside over
                any form of a class, collective, or representative proceeding,
                nor may the arbitrator consolidate the claims of multiple
                Persons into one proceeding. You also agree not to assert claims
                against Us or Our representatives, affiliates, insurers,
                successors or assigns in the same proceeding as any other
                Person, whether by joinder or otherwise, and that any proceeding
                brought on behalf of multiple claimants or plaintiffs shall be
                severed into individual proceedings. You further agree to
                affirmatively “opt out” and to take all other reasonable
                measures to exclude yourself from any representative proceeding
                in which you may be invited to join or otherwise permitted to
                participate.
            </Text>
            <Text style={styles.paragraph}>
                For a copy of the AAA Rules, to file a claim or for other
                information about the AAA, contact the AAA at{' '}
                <Text
                    style={{color: theme.colors.link}}
                    onPress={() => Linking.openURL('https://www.adr.org/')}>
                    www.adr.org
                </Text>
                .
            </Text>
            <Text style={styles.paragraph}>
                This arbitration provision shall survive the termination of the
                Service or of this Agreement. If any portion of this arbitration
                provision is deemed invalid or unenforceable, the remaining
                portions shall remain in force.
            </Text>
            <Text style={[styles.paragraph, styles.bold, styles.subtitle]}>
                10. Miscellaneous
            </Text>
            <Text style={styles.paragraph}>
                <Text style={styles.bold}>Force Majeure</Text>. You agree that
                We will not be liable for any failures or delays resulting from
                circumstances or causes beyond Our reasonable control,
                including, without limitation, pandemic or epidemic (or similar
                regional health crisis; including COVID-19), fire or other
                casualty, act of God, war or other violence, or any law, order
                or requirement of any governmental agency or authority.
            </Text>
            <Text style={styles.paragraph}>
                <Text style={styles.bold}>Entire Agreement/Amendment.</Text>
                This Agreement constitutes the entire agreement between Us and
                You and supersede all prior or contemporaneous, oral or written,
                representations, understandings or agreements relating to the
                subject matter hereof.
            </Text>
            <Text style={styles.paragraph}>
                <Text style={styles.bold}>Termination.</Text> You may terminate
                this Agreement at any time. You can do so by deleting your
                Wallet or by no longer accessing or using our Service.
                Notwithstanding anything contained in this Agreement, we reserve
                the right, without notice and in our sole discretion, to
                terminate your right to access or use the Service, at any time
                and for any or no reason, and you acknowledge and agree that we
                shall have no liability or obligation to you in such event and
                that you will not be entitled to a refund of any amounts that
                you have already paid to us, to the fullest extent permitted by
                Applicable Law.
            </Text>
            <Text style={styles.paragraph}>
                <Text style={styles.bold}>Survival.</Text> Except for the
                limited licenses expressly granted hereunder, which shall
                terminate upon the expiration or termination of these terms and
                the termination of your Wallet, all other terms herein will
                survive the expiration or termination of this Agreement and the
                termination of your Wallet.
            </Text>
            <Text style={styles.paragraph}>
                <Text style={styles.bold}>Governing Law.</Text> This Agreement
                and your access to and use of the Service shall be governed by
                and construed in accordance with the internal laws of the State
                of New York, USA (without reference to the conflicts of law
                provisions thereof that would require the application of the law
                of any other jurisdiction).
            </Text>
            <Text style={styles.paragraph}>
                <Text style={styles.bold}>Venue.</Text> Any dispute between the
                parties hereto that is not subject to arbitration or cannot be
                heard in small claims court, shall be resolved in the state or
                federal courts of the State of New York and the United States,
                respectively, sitting in the State of New York, and you hereby
                irrevocably submit to personal jurisdiction in such courts, and
                waive any defense of inconvenient forum.
            </Text>
            <Text style={styles.paragraph}>
                Notwithstanding the foregoing, VCL may seek injunctive relief in
                any court of competent jurisdiction.
            </Text>
            <Text style={styles.paragraph}>
                <Text style={styles.bold}>Waiver.</Text> No waiver of any
                obligation under this Agreement shall be valid unless in writing
                and signed by a duly authorized representative of the parties
                hereto. No delay or omission by either Party in exercising any
                right or power shall impair such right or power or be construed
                to be a waiver. A waiver by either party of any of the
                obligations to be performed by the other party or any breach
                thereof shall not be construed to be a waiver of any succeeding
                breach or of any other obligation.
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
                You may not assign or transfer your rights and obligations under
                this Agreement to any third party without the prior written
                consent of VCL. Any attempt by you to assign or transfer such
                rights or obligations shall be void and of no force and effect.
            </Text>
            <Text style={styles.paragraph}>
                <Text style={styles.bold}>Notices. </Text> Whenever under this
                Agreement, a Party is required or permitted to give notice to
                the other, such notice shall be given in writing and shall be
                deemed to be given in the case of (a) Our notice to You three
                (3) Business Days after we post such notice through your Wallet
                in-app notifications (b) Your notice to Us after you send such
                notice to us via our email at:{' '}
                <Text
                    style={{color: theme.colors.link}}
                    onPress={() =>
                        Linking.openURL('mailto:admin@velocitycareerlabs.com')
                    }>
                    admin@velocitycareerlabs.com
                </Text>
                , upon electronic confirmation of receipt.
            </Text>
            <Text style={styles.paragraph}>
                <Text style={styles.bold}>Severability. </Text> If any provision
                of this Agreement is held to be illegal, invalid or
                unenforceable under present or future Applicable Law while this
                Agreement or any provision of this Agreement remains in effect:
                (a) the legality, validity and enforceability of the remaining
                provisions of this Agreement will not be affected thereby so
                long as the economic or legal substance of the transactions
                contemplated by the Agreement are not affected in any manner
                materially adverse to either Party; and (b) You and We agree
                that the body making the determination of illegality, invalidity
                or unenforceability shall have the power to reduce the scope,
                duration and/or area of the provision, to delete specific words
                or phrases and to replace any illegal, invalid or unenforceable
                provision with a provision that is legal, valid and enforceable
                and that comes closest to expressing the intention of the
                illegal, invalid or unenforceable provision, and this Agreement
                shall be enforceable as so modified.
            </Text>
            <Text style={styles.paragraph}>
                <Text style={styles.bold}>Contact Us.</Text> If you have
                questions or comments about this Agreement, please contact us
                at:{' '}
                <Text
                    style={{color: theme.colors.link}}
                    onPress={() =>
                        Linking.openURL('mailto:admin@velocitycareerlabs.com')
                    }>
                    admin@velocitycareerlabs.com
                </Text>
                . We will make an effort to reply within a reasonable timeframe.
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
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
