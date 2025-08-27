import React, {useCallback} from 'react';
import {View, Text, StyleSheet, Pressable, Linking} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from 'react-native-elements';
import {RelatedResource} from 'app/store/types/claim';
import {fontFamily, isIOS, normalize} from 'app/utilities/helpers';
import {openAttachmentsPopup} from 'app/utilities/popups';
import {SVG} from '../../assets/icons';
import {colors} from '../../assets/colors';

export const getFileName = (resource: RelatedResource) => {
    if (resource.name) {
        return resource.name;
    }
    const urlSplit = resource.id.split('/');
    const fileName = urlSplit[urlSplit.length - 1];
    const fileExtension = resource.mediaType.split('/')[1];

    if (/^data:/.test(resource.id)) {
        return `base64 File(${fileExtension})`;
    }
    if (/\/[^/]+\.[a-zA-Z0-9]+$/.test(resource.id)) {
        return fileName;
    }
    return `File(${fileName}).${fileExtension}`;
};

export const getIcon = (mediaType: string) => {
    switch (mediaType) {
        case 'application/pdf':
            return SVG('', 53)['pdf-file'];
        case 'image/jpeg':
            return SVG('', 53)['jpeg-file'];
        case 'image/png':
            return SVG('', 53)['png-file'];
        case 'image/svg+xml':
            return SVG('', 53)['svg-file'];
        default:
            return SVG('', 53)['fallback-file'];
    }
};

export const RelatedResources = ({
    resources = []
}: {
    resources: RelatedResource[];
}) => {
    const {t} = useTranslation();
    const {
        theme: {
            colors: {primaryAndroid, separatingLine, separatingLineAndroid}
        }
    } = useTheme();

    const handlePress = useCallback(async (resource: RelatedResource) => {
        if (/^data:/.test(resource.id)) {
            openAttachmentsPopup({
                params: {
                    base64: resource.id,
                    fileName: getFileName(resource),
                    mediaType: resource.mediaType
                }
            });
        } else {
            Linking.openURL(resource.id).catch((err) =>
                console.error('Failed to open URL:', err)
            );
        }
    }, []);
    return (
        <View
            style={[
                styles.container,
                {borderColor: isIOS ? separatingLine : separatingLineAndroid}
            ]}>
            <Text style={styles.sectionTitle}>{t('Attachments')}</Text>
            {resources.map((resource) => (
                <View key={resource.id}>
                    <Pressable
                        onPress={() => {
                            handlePress(resource);
                        }}
                        style={({pressed}) => [
                            styles.touchableContainer,
                            isIOS ? {opacity: pressed ? 0.5 : 1} : {}
                        ]}
                        android_ripple={{
                            color: primaryAndroid,
                            borderless: false
                        }}>
                        {getIcon(resource.mediaType || '')}
                        <Text style={styles.fileName}>
                            {getFileName(resource)}
                        </Text>
                    </Pressable>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginBottom: 10,
        paddingBottom: 12,
        borderBottomWidth: 0.5
    },
    sectionTitle: {
        fontWeight: '400',
        color: colors.secondary,
        marginBottom: 10,
        lineHeight: normalize(isIOS ? 18 : 13),
        ...fontFamily({size: 13}),
        letterSpacing: 0.2
    },
    touchableContainer: {
        flexDirection: 'row',
        borderRadius: 5,
        marginBottom: 16
    },
    fileName: {
        marginLeft: 20,
        ...fontFamily({size: 15, weight: '400'}),
        lineHeight: normalize(17),
        textAlignVertical: 'center',
        flexWrap: 'wrap',
        width: '75%'
    }
});
