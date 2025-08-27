import {getConsentLatestVersion} from 'app/api/consents.service';
import {getOauthTokens} from 'app/storage/oauth';
import {saveLatestTermsAndConditionsVersion} from 'app/store/actions';
import {configSelector} from 'app/store/selectors';
import {
    termsAndConditionsAgreedVersionSelector,
    termsAndConditionsLatestVersionSelector
} from 'app/store/selectors/auth';
import {IConfig} from 'app/store/types/appConfig';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'app/navigation/StackParamsList';
import {vclLogger} from '../logger';

export const useCheckConsentVersion = () => {
    const termsAndConditionsAgreedVersion: number | undefined = useSelector(
        termsAndConditionsAgreedVersionSelector
    );
    const termsAndConditionsLatestVersion: number | undefined = useSelector(
        termsAndConditionsLatestVersionSelector
    );

    const navigation: StackNavigationProp<RootStackParamList> = useNavigation();

    const dispatch = useDispatch();
    const config: IConfig = useSelector(configSelector);

    useEffect(() => {
        const checkIsLatestVersionAccepted = async () => {
            const {accessToken} = await getOauthTokens();

            if (accessToken && config) {
                try {
                    const {consent} = await getConsentLatestVersion(
                        config,
                        accessToken
                    );

                    dispatch(
                        saveLatestTermsAndConditionsVersion(consent?.version)
                    );
                } catch (error) {
                    vclLogger.error('get latest consent version', error);
                }
            }
        };

        checkIsLatestVersionAccepted();
    }, [termsAndConditionsAgreedVersion, config, dispatch]);

    useEffect(() => {
        if (
            termsAndConditionsAgreedVersion &&
            termsAndConditionsLatestVersion &&
            termsAndConditionsAgreedVersion !== termsAndConditionsLatestVersion
        ) {
            navigation.navigate('TermsAndConditionsUpdate');
        }
    }, [
        termsAndConditionsAgreedVersion,
        termsAndConditionsLatestVersion,
        navigation
    ]);
};
