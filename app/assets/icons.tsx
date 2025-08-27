import React from 'react';
import {FlexStyle} from 'react-native';
import Settings from 'app/assets/SVG/settings.svg';
import Check from 'app/assets/SVG/check.svg';
import CheckAndroid from 'app/assets/SVG/check-android.svg';
import ChevronDown from 'app/assets/SVG/chevron-down.svg';
import ChevronLeft from 'app/assets/SVG/chevron-left.svg';
import ChevronLeftIos from 'app/assets/SVG/chevron-left-ios.svg';
import ChevronRight from 'app/assets/SVG/chevron-right.svg';
import ChevronUp from 'app/assets/SVG/chevron-up.svg';
import CircleCheck from 'app/assets/SVG/circle-check.svg';
import Cloud from 'app/assets/SVG/cloud.svg';
import Identity from 'app/assets/SVG/identity.svg';
import Logo from 'app/assets/SVG/logo.svg';
import More from 'app/assets/SVG/more.svg';
import Note from 'app/assets/SVG/note.svg';
import Password from 'app/assets/SVG/password.svg';
import QrCode from 'app/assets/SVG/qr-code.svg';
import Reset from 'app/assets/SVG/reset.svg';
import Theme from 'app/assets/SVG/theme.svg';
import Profile from 'app/assets/SVG/profile.svg';
import About from 'app/assets/SVG/about.svg';
import ControlCenter from 'app/assets/SVG/control-center.svg';
import Gallery from 'app/assets/SVG/gallery.svg';
import Delete from 'app/assets/SVG/delete.svg';
import Info from 'app/assets/SVG/info.svg';
import Offers from 'app/assets/SVG/offers.svg';
import Pencil from 'app/assets/SVG/pencil.svg';
import Success from 'app/assets/SVG/success.svg';
import Calendar from 'app/assets/SVG/calendar.svg';
import SuccessAlert from 'app/assets/SVG/success-alert.svg';
import NegativeAlert from 'app/assets/SVG/negative-alert.svg';
import PushNotification from 'app/assets/SVG/push-notification.svg';
import ReceiveOffer from 'app/assets/SVG/receive-offer.svg';
import FaceId from 'app/assets/SVG/face-id.svg';
import Trash from 'app/assets/SVG/trash.svg';
import Revoke from 'app/assets/SVG/revoke.svg';
import Plus from 'app/assets/SVG/plus.svg';
import PlusSmall from 'app/assets/SVG/plus-small.svg';
import Bell from 'app/assets/SVG/bell.svg';
import StatusDone from 'app/assets/SVG/status-done.svg';
import StatusError from 'app/assets/SVG/status-error.svg';
import StatusShared from 'app/assets/SVG/status-shared.svg';
import StatusSuccess from 'app/assets/SVG/status-success.svg';
import Back from 'app/assets/SVG/back.svg';
import BackAndroid from 'app/assets/SVG/back-android.svg';
import Replaced from 'app/assets/SVG/replaced.svg';
import Resend from 'app/assets/SVG/resend.svg';
import ResendAndroid from 'app/assets/SVG/resend-android.svg';
import PlusAndroidSmall from 'app/assets/SVG/plus-android-small.svg';
import ClaimIssuer from 'app/assets/SVG/claim-issuer.svg';
import SelfReport from 'app/assets/SVG/self-report.svg';
import CircleOutlineChecked from 'app/assets/SVG/circle-outline-checked.svg';
import CircleOutline from 'app/assets/SVG/circle-outline.svg';
import Close from 'app/assets/SVG/close.svg';
import Claim from 'app/assets/SVG/claim-credentials.svg';
import NoDisclosures from 'app/assets/SVG/no-disclosures.svg';
import Search from 'app/assets/SVG/search.svg';
import ResetData from 'app/assets/SVG/reset-data.svg';
import Upgrade from 'app/assets/SVG/upgrade.svg';
import PhotoAndroid from 'app/assets/SVG/photo-android.svg';
import GalleryAndroid from 'app/assets/SVG/gallery-android.svg';
import QRAndroid from 'app/assets/SVG/qr-android.svg';
import QRIos from 'app/assets/SVG/qr-ios.svg';
import PlusDisabled from 'app/assets/SVG/plus-disabled.svg';
import PlusAndroidDisabled from 'app/assets/SVG/plus-android-disabled.svg';
import DefaultProfile from 'app/assets/SVG/default_profile.svg';
import TrashAndroid from 'app/assets/SVG/trash-android.svg';
import PencilAndroid from 'app/assets/SVG/pencil-android.svg';
import LinkedIn from 'app/assets/SVG/linkedin.svg';
import LinkedInAccount from 'app/assets/SVG/linkedIn-account.svg';
import Share from 'app/assets/SVG/share.svg';
import Share2 from 'app/assets/SVG/share-2.svg';
import CheckActive from 'app/assets/SVG/check-active.svg';
import ExternalLink from 'app/assets/SVG/link.svg';
import SharedViaLinkIcon from 'app/assets/SVG/shared-via-link.svg';
import SharedViaLinkedinIcon from 'app/assets/SVG/shared-via-linkedin.svg';
import ConnectionBroken from 'app/assets/SVG/connection-broken.svg';
import ConnectionRestored from 'app/assets/SVG/connection-restored.svg';
import NewContent from 'app/assets/SVG/new-content.svg';
import Replay from 'app/assets/SVG/replay.svg';
import ReplayAndroid from './SVG/replay-android.svg';
import VerifyPhone from './SVG/verify-phone.svg';
import CompleteProfile from './SVG/complete-profile.svg';
import WhatsNew from './SVG/whats-new.svg';
import WhatsNewAndroid from './SVG/whats-new-android.svg';
import InfoFilled from './SVG/info-filled.svg';
import Contact from './SVG/contact.svg';
import Debug from './SVG/debug.svg';
import Link2 from './SVG/link-2.svg';
import Question from './SVG/question-fill.svg';
import PDFFile from './SVG/pdf-file.svg';
import PNGFile from './SVG/png-file.svg';
import JPEGFile from './SVG/jpg-file.svg';
import SVGFile from './SVG/svg-file.svg';
import FallbackFile from './SVG/fallback-file.svg';
import SelfReportFileIcon from './SVG/self-report-file-icon.svg';
import OpenInNew from './SVG/open-in-new.svg';
import {isIOS} from '../utilities/helpers';
import {colors} from './colors';

export const SVG = (
    fillIconColor: string = '#fff',
    size: number = 22,
    style: FlexStyle = {},
    strokeIconColor: string = '#000'
): {[key: string]: React.ReactNode} => ({
    about: <About fill={fillIconColor} width={size} height={size} />,
    settings: <Settings fill={fillIconColor} width={size} height={size} />,
    profile: <Profile fill={fillIconColor} width={size} height={size} />,
    'control-center': (
        <ControlCenter fill={fillIconColor} width={size} height={size} />
    ),
    check: <Check stroke={fillIconColor} width={size} height={size} />,
    'check-android': (
        <CheckAndroid fill={fillIconColor} width={size} height={size} />
    ),
    'chevron-down': (
        <ChevronDown fill={fillIconColor} width={size} height={size} />
    ),
    'chevron-left': isIOS ? (
        <ChevronLeftIos fill={fillIconColor} width={size} height={size} />
    ) : (
        <ChevronLeft fill={fillIconColor} width={size} height={size} />
    ),
    'chevron-right': (
        <ChevronRight fill={fillIconColor} width={size} height={size} />
    ),
    'chevron-up': <ChevronUp fill={fillIconColor} width={size} height={size} />,
    'circle-check': (
        <CircleCheck fill={fillIconColor} width={size} height={size} />
    ),
    cloud: <Cloud fill={fillIconColor} width={size} height={size} />,
    identity: <Identity fill={fillIconColor} width={size} height={size} />,
    logo: <Logo fill={fillIconColor} width={size} height={size} />,
    more: <More fill={fillIconColor} width={size} height={size} />,
    note: <Note fill={fillIconColor} width={size} height={size} />,
    password: <Password fill={fillIconColor} width={size} height={size} />,
    'qr-code': <QrCode fill={fillIconColor} width={size} height={size} />,
    reset: <Reset fill={fillIconColor} width={size} height={size} />,
    theme: <Theme fill={fillIconColor} width={size} height={size} />,
    offers: <Offers fill={fillIconColor} width={size} height={size} />,
    gallery: <Gallery fill={fillIconColor} width={size} height={size} />,
    delete: <Delete fill={fillIconColor} width={size} height={size} />,
    info: <Info fill={fillIconColor} width={size} height={size} />,
    pencil: <Pencil fill={fillIconColor} width={size} height={size} />,
    success: <Success fill={fillIconColor} width={size} height={size} />,
    share: (
        <Share
            stroke={strokeIconColor}
            fill={fillIconColor}
            width={size}
            height={size}
        />
    ),
    'share-square': (
        <Share2
            stroke={strokeIconColor}
            fill={fillIconColor}
            width={size}
            height={size}
        />
    ),
    calendar: <Calendar fill={fillIconColor} width={size} height={size} />,
    'success-alert': (
        <SuccessAlert fill={fillIconColor} width={size} height={size} />
    ),
    'push-notification': (
        <PushNotification fill={fillIconColor} width={size} height={size} />
    ),
    'negative-alert': (
        <NegativeAlert fill={fillIconColor} width={size} height={size} />
    ),
    'receive-offer': (
        <ReceiveOffer fill={fillIconColor} width={size} height={size} />
    ),
    'face-id': <FaceId fill={fillIconColor} width={size} height={size} />,
    trash: <Trash fill={fillIconColor} width={size} height={size} />,
    revoke: <Revoke fill={fillIconColor} width={size} height={size} />,
    plus: <Plus fill={fillIconColor} width={size} height={size} />,
    'plus-small': <PlusSmall fill={fillIconColor} width={size} height={size} />,
    'plus-android-small': (
        <PlusAndroidSmall fill={fillIconColor} width={size} height={size} />
    ),
    'plus-disabled': isIOS ? (
        <PlusDisabled fill={fillIconColor} width={size} height={size} />
    ) : (
        <PlusAndroidDisabled fill={fillIconColor} width={size} height={size} />
    ),
    notifications: <Bell fill={fillIconColor} width={size} height={size} />,
    'status-done': <StatusDone width={size} height={size} />,
    'status-error': <StatusError width={size} height={size} />,
    'status-shared': <StatusShared width={size} height={size} />,
    'status-success': <StatusSuccess width={size} height={size} />,
    'status-connection-broken': <ConnectionBroken style={style} />,
    back: <Back fill={fillIconColor} width={size} height={size} />,
    'back-android': (
        <BackAndroid fill={fillIconColor} width={size} height={size} />
    ),
    replaced: <Replaced fill={fillIconColor} width={size} height={size} />,
    resend: (
        <Resend
            fill={fillIconColor || colors.dark}
            width={size || 17}
            height={size || 17}
        />
    ),
    'resend-android': <ResendAndroid width={size || 17} height={size || 17} />,
    'claim-issuer': (
        <ClaimIssuer fill={fillIconColor} width={size} height={size} />
    ),
    'self-report': (
        <SelfReport
            fill={fillIconColor || colors.dark}
            width={size}
            height={size}
        />
    ),
    'self-report-file-icon': (
        <SelfReportFileIcon
            width={size}
            height={size}
            fill={fillIconColor || colors.dark}
        />
    ),
    'circle-outline-checked': (
        <CircleOutlineChecked
            fill={fillIconColor || colors.dark}
            width={size}
            height={size}
        />
    ),
    'circle-outline': (
        <CircleOutline fill={fillIconColor} width={size} height={size} />
    ),
    close: <Close fill={fillIconColor} width={size} height={size} />,
    'claim-credentials': (
        <Claim stroke={strokeIconColor} width={size} height={size} />
    ),
    'no-disclosures': (
        <NoDisclosures
            fill={fillIconColor}
            stroke={strokeIconColor}
            width={size}
            height={size}
        />
    ),
    search: <Search width={size} height={size} />,
    'reset-data': <ResetData fill={fillIconColor} width={size} height={size} />,
    upgrade: <Upgrade width={size} height={size} />,
    'photo-android': <PhotoAndroid width={size} height={size} />,
    'gallery-android': <GalleryAndroid width={size} height={size} />,
    'qr-android': <QRAndroid width={size} height={size} />,
    'qr-ios': <QRIos width={size} height={size} />,
    'default-profile': (
        <DefaultProfile fill={fillIconColor} width={size} height={size} />
    ),
    'trash-android': (
        <TrashAndroid fill={fillIconColor} width={size} height={size} />
    ),
    'pencil-android': (
        <PencilAndroid fill={fillIconColor} width={size} height={size} />
    ),
    'external-link': (
        <ExternalLink stroke={fillIconColor} width={size} height={size} />
    ),
    'check-active': <CheckActive width={size} height={size} />,
    linkedin: <LinkedIn fill={fillIconColor} width={size} height={size} />,
    'linkedin-account': <LinkedInAccount width={size} height={size} />,
    'shared-via-link': <SharedViaLinkIcon style={style} />,
    'shared-via-linkedin': (
        <SharedViaLinkedinIcon style={style} width={size} height={size} />
    ),
    replay: <Replay style={style} />,
    'replay-android': <ReplayAndroid style={style} />,
    'connection-broken': <ConnectionBroken style={style} />,
    'connection-restored': <ConnectionRestored style={style} />,
    'new-content': <NewContent style={style} />,
    'verify-phone': (
        <VerifyPhone stroke={strokeIconColor} fill={fillIconColor} />
    ),
    'complete-profile': (
        <CompleteProfile stroke={strokeIconColor} fill={fillIconColor} />
    ),
    'whats-new': <WhatsNew width={size} height={size} />,
    'whats-new-android': <WhatsNewAndroid width={size} height={size} />,
    'info-filled': <InfoFilled />,
    link: <Link2 />,
    contact: <Contact width={size} height={size} stroke={fillIconColor} />,
    debug: <Debug width={size} height={size} />,
    'question-fill': (
        <Question fill={fillIconColor} width={size} height={size} />
    ),
    'pdf-file': <PDFFile width={size} height={size} />,
    'png-file': <PNGFile width={size} height={size} />,
    'svg-file': <SVGFile width={size} height={size} />,
    'jpeg-file': <JPEGFile width={size} height={size} />,
    'fallback-file': <FallbackFile width={size} height={size} />,
    'open': <OpenInNew fill={fillIconColor} width={size} height={size} />,
});
