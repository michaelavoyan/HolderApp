import {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/core';
import {Platform, StyleSheet, Text} from 'react-native';
import {DisclosureListScreen} from 'app/components/PastDisclosures/PastDisclosureList';
import {RootStackParamList} from 'app/navigation/StackParamsList';
import {getDisclosures, setNoDisclosuresPopup} from 'app/store/actions';
import {
    disclosuresSelector,
    noDisclosuresPopupSelector
} from 'app/store/selectors';
import {AcceptedDisclosureRequestObject} from 'app/store/types/disclosure';
import {openInfoPopup} from '../../utilities/popups';
import {fontFamily, normalize} from '../../utilities/helpers';

const INFO_POPUP = {
    title: 'No disclosure logs yet',
    icon: 'no-disclosures',
    description:
        'When you start sharing your verified credentials with 3rd parties, these disclosures events will be logged here so you can track with whom you have shared private information.'
};

type Props = StackScreenProps<RootStackParamList>;

export const PastDisclosures: React.FC<Props> = ({navigation}) => {
    const disclosures: AcceptedDisclosureRequestObject[] = useSelector(
        disclosuresSelector
    );
    const inFocus = useIsFocused();
    const noDisclosuresPopup: boolean = useSelector(noDisclosuresPopupSelector);
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const getDisclosuresCb = useCallback(() => dispatch(getDisclosures()), [
        dispatch
    ]);

    const onClose = useCallback(() => {
        dispatch(setNoDisclosuresPopup(false));
    }, [dispatch]);

    useEffect(() => {
        // case when we navigate by tap on the notification banner
        if (noDisclosuresPopup && !inFocus) {
            onClose();
        }
    }, [inFocus, onClose, noDisclosuresPopup]);

    useEffect(() => {
        if (noDisclosuresPopup) {
            openInfoPopup({
                params: {
                    title: t(INFO_POPUP.title),
                    icon: INFO_POPUP.icon,
                    children: (
                        <Text style={styles.text}>
                            {t(INFO_POPUP.description)}
                        </Text>
                    ),
                    closeOnBackdropPress: true,
                    onClose
                }
            });
        }
    }, [onClose, noDisclosuresPopup, t]);

    useEffect(() => {
        getDisclosuresCb();
    }, [getDisclosuresCb]);

    return (
        <DisclosureListScreen
            onDisclosurePress={disclosureId =>
                navigation.navigate('PastDisclosureRequestDetails', {
                    disclosureId
                })
            }
            disclosures={disclosures}
        />
    );
};

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        ...fontFamily({size: 14, iosFamily: 'SFProText'}),
        lineHeight: normalize(20),
        paddingBottom: 10,
        ...Platform.select({
            android: {
                letterSpacing: -0.41
            }
        })
    }
});
