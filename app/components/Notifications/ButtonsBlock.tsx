import React, {memo} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {fontFamily, isIOS, normalize} from 'app/utilities/helpers';
import {ClaimCredential} from 'app/store/types/claim';
import {isEmpty} from 'lodash';
import {useCheckCredentialsExpiration} from 'app/utilities/hooks/useCheckCredentialsExpiration';
import {GenericButton} from '../common/GenericButton';

interface Props {
    offers: ClaimCredential[];
    checkedOffers: ClaimCredential[];
    onFinalize: (isAccept?: boolean) => void;
}

export const ButtonsBlock = memo(
    ({offers, checkedOffers, onFinalize}: Props) => {
        const disabledReject = isEmpty(checkedOffers);

        const disabledAccept = useCheckCredentialsExpiration(
            offers.map((item) => item?.offerExpirationDate)
        );
        return (
            <View style={styles.btnContainer}>
                <GenericButton
                    disabled={disabledReject}
                    containerStyle={styles.buttonContainerLeft}
                    title="Reject"
                    type="reject"
                    onPress={() => onFinalize()}
                />
                <GenericButton
                    disabled={disabledReject || disabledAccept}
                    containerStyle={styles.buttonContainerRight}
                    title="Accept"
                    type="primary"
                    onPress={() => onFinalize(true)}
                />
            </View>
        );
    }
);

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 26,
        paddingVertical: 22,
        ...Platform.select({
            android: {paddingHorizontal: 0, paddingTop: 0}
        })
    },
    containerAndroid: {
        ...Platform.select({
            android: {paddingHorizontal: 16, paddingTop: 4}
        })
    },
    listContainer: {
        marginTop: isIOS ? 16 : 10
    },
    buttonContainerLeft: {
        marginRight: 5
    },
    buttonContainerRight: {
        marginLeft: 5
    },
    btnContainer: {
        flexDirection: 'row',
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    revocationsContainer: {
        marginTop: isIOS ? 34 : 29
    },
    textContainer: {
        alignItems: 'center',
        marginTop: isIOS ? 4 : 6
    },
    text: {
        ...fontFamily({size: 13, weight: '500', android: {size: 14}}),
        lineHeight: normalize(17)
    },
    disclosureWrapper: {
        flex: 1,
        marginVertical: 5
    }
});
