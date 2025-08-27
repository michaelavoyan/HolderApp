import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
    SectionList,
    StyleSheet,
    View,
    TextInput,
    Pressable
} from 'react-native';
import {SearchBarProps, useTheme} from 'react-native-elements';
import {
    VCLCountry,
    VCLService
} from '@velocitycareerlabs/vcl-react-native';

import {Vendor} from '../../store/types/claim';
import {fontFamily, normalize} from '../../utilities/helpers';
import {IssuerEntry} from './IssuerEntry';
import {BackButton} from '../common/BackButton';
import {SearchButton} from '../common/SearchButton';
import {groupVendorsList} from './groupVendorsList';
import {MoreButtonContainer} from '../Navigation/MoreButtonContainer';

export const SearchScreen: React.FC<SearchBarProps & {
    vendors: Vendor[];
    countries: VCLCountry[];
    onClaim: (id: string, service: VCLService) => void;
}> = ({onChangeText, value, vendors, countries, onClaim}) => {
    const [searchActive, setSearchActive] = useState(false);
    const sectionList = useRef<SectionList>(null);
    const navigation = useNavigation();
    const {
        theme: {
            colors: {primaryBg, secondaryBg, disabled}
        }
    } = useTheme();

    const vendorsList = useMemo(() => groupVendorsList(vendors, value), [
        vendors,
        value
    ]);

    useEffect(() => {
        if (searchActive) {
            navigation.setOptions({
                title: '',
                headerRight: () => (
                    <TextInput
                        onChangeText={onChangeText}
                        autoFocus
                        style={[styles.inputStyle, {color: secondaryBg}]}
                        onBlur={() => !value && setSearchActive(false)}
                        selectionColor={secondaryBg}
                    />
                )
            });
        } else {
            navigation.setOptions({
                headerLeft: () => (
                    <Pressable
                        onPress={() => {
                            setSearchActive(false);
                            if (onChangeText) onChangeText('');
                        }}
                        style={styles.pressable}
                        android_ripple={{
                            color: disabled,
                            borderless: true,
                            radius: 15
                        }}>
                        <BackButton onPress={() => navigation.goBack()} />
                    </Pressable>
                ),
                headerRight: () => (
                    <View style={styles.topBarIcons}>
                        <SearchButton onPress={() => setSearchActive(true)} />
                        <MoreButtonContainer />
                    </View>
                )
            });
        }
    }, [disabled, navigation, onChangeText, searchActive, secondaryBg, value]);

    return (
        <View style={styles.flex}>
            <SectionList
                onScrollToIndexFailed={() => {
                    // Must be iplemented to avoid a crash
                }}
                keyboardShouldPersistTaps="handled"
                ref={sectionList}
                sections={vendorsList}
                keyExtractor={item => item.id}
                renderItem={({item}) => {
                    return (
                        <IssuerEntry
                            countries={countries}
                            onClaim={onClaim}
                            vendor={item}
                            first={item.first}
                        />
                    );
                }}
                renderSectionHeader={() =>
                    !value ? (
                        <View
                            style={[
                                styles.groupHeader,
                                {
                                    backgroundColor: primaryBg
                                }
                            ]}
                        />
                    ) : null
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    searchBar: {
        borderBottomWidth: 0.5,
        paddingVertical: 0,
        height: 56,
        alignItems: 'center'
    },
    topBarIcons: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    groupHeader: {
        width: '100%',
        height: normalize(10)
    },
    inputContainerStyle: {
        borderBottomWidth: 0
    },
    inputStyle: {
        flex: 1,
        alignSelf: 'flex-start',
        ...fontFamily({size: 18, weight: '500'}),
        letterSpacing: -0.41
    },
    pressable: {
        paddingRight: 15
    },
    flex: {
        flex: 1
    }
});
