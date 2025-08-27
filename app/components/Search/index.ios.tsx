import {useNavigation} from '@react-navigation/native';
import {
    VCLCountry,
    VCLService
} from '@velocitycareerlabs/vcl-react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Pressable, SectionList, StyleSheet, Text, View} from 'react-native';
import {Icon, SearchBar, SearchBarProps, useTheme} from 'react-native-elements';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';

import {StackHeaderOptions} from '../../navigation/options';
import {Vendor} from '../../store/types/claim';
import {fontFamily, normalize} from '../../utilities/helpers';
import {IssuerEntry} from './IssuerEntry';
import {Alphabet} from './Alphabet';
import {groupVendorsList} from './groupVendorsList';

export const DISPLAY_BACKGROUND_TIMEOUT = 150;
const ITEM_INDEX = 1;
const IMAGE_HEIGHT = 50;
const ITEM_HEIGHT = 63;
const SECTION_HEADER = 26;

export const SearchScreen: React.FC<
    SearchBarProps & {
        vendors: Vendor[];
        countries: VCLCountry[];
        onClaim: (id: string, service: VCLService) => void;
    }
> = ({onChangeText, value, vendors, countries, onClaim}) => {
    const [searchActive, setSearchActive] = useState(false);
    const [hasBackground, setHasBackground] = useState<boolean | undefined>();
    const timeout = useRef<any>(0);
    const sectionList = useRef<SectionList>(null);
    const navigation = useNavigation();
    const {t} = useTranslation();
    const {top} = useSafeAreaInsets();

    useEffect(() => {
        navigation.setOptions({
            headerStyle: {
                ...StackHeaderOptions.headerStyle,
                height: top + 44
            }
        });
    }, [navigation, top]);

    useEffect(() => {
        if (searchActive) {
            setHasBackground(false);
        } else {
            if (timeout.current) clearTimeout(timeout.current);

            timeout.current = setTimeout(
                () => setHasBackground(true),
                DISPLAY_BACKGROUND_TIMEOUT
            );
        }
    }, [searchActive]);

    const vendorsList = useMemo(
        () => groupVendorsList(vendors, value),
        [vendors, value]
    );

    const onFocusCallback = useCallback(() => {
        setSearchActive(true);
        navigation.setOptions({headerShown: false});
    }, [navigation]);

    const onBlurCallback = useCallback(() => {
        setSearchActive(false);
        navigation.setOptions({headerShown: true});
    }, [navigation]);

    const {
        theme: {
            colors: {primaryBg, secondaryBg, separatingLine, searchText}
        }
    } = useTheme();

    const onLetterClick = useCallback(
        (letter: string) => {
            const sectionIndex = vendorsList.findIndex(
                ({title}) => title === letter.toUpperCase()
            );

            if (sectionIndex === -1) {
                return;
            }

            sectionList.current?.scrollToLocation({
                sectionIndex,
                itemIndex: ITEM_INDEX
            });
        },
        [vendorsList]
    );

    const getItemLayout: any = sectionListGetItemLayout({
        getItemHeight: (rowData) =>
            rowData.logo ? ITEM_HEIGHT + IMAGE_HEIGHT : ITEM_HEIGHT,
        getSectionHeaderHeight: () => SECTION_HEADER
    });

    return (
        <View
            style={[
                styles.flex,
                {
                    backgroundColor: secondaryBg,
                    ...(searchActive ? {paddingTop: top} : {})
                }
            ]}>
            <SearchBar
                onFocus={onFocusCallback}
                onBlur={onBlurCallback}
                platform="ios"
                placeholder={t('Search')}
                onChangeText={onChangeText}
                value={value}
                searchIcon={<Icon name="magnify" type="material-community" />}
                clearIcon={
                    <Pressable onPress={() => onChangeText?.('')}>
                        <Icon name="close" type="material-community" />
                    </Pressable>
                }
                containerStyle={[
                    styles.searchBar,
                    {
                        borderColor: separatingLine,
                        backgroundColor:
                            hasBackground === false ? secondaryBg : primaryBg
                    }
                ]}
                placeholderTextColor={searchText}
            />
            <View style={styles.alphabet}>
                <Alphabet onPress={onLetterClick} />
            </View>
            <SectionList
                onScrollToIndexFailed={() => {}}
                keyboardShouldPersistTaps="handled"
                ref={sectionList}
                sections={vendorsList}
                keyExtractor={(item) => item.id}
                getItemLayout={getItemLayout}
                renderItem={({item}) => (
                    <IssuerEntry
                        countries={countries}
                        onClaim={onClaim}
                        vendor={item}
                    />
                )}
                renderSectionHeader={({section: {title}}) =>
                    !value ? (
                        <Text
                            style={[
                                styles.groupHeader,
                                {
                                    backgroundColor: primaryBg
                                }
                            ]}>
                            {title}
                        </Text>
                    ) : null
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    searchBar: {
        borderBottomWidth: 0.5
    },
    groupHeader: {
        width: '100%',
        height: normalize(26),
        paddingLeft: 17,
        ...fontFamily({size: 15, weight: '500'}),
        lineHeight: normalize(26),
        textAlignVertical: 'center'
    },
    alphabet: {
        position: 'absolute',
        zIndex: 1,
        top: 40,
        right: 2,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    flex: {
        flex: 1
    }
});
