import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {WelcomeScreen} from 'app/components/WelcomeScreen';
import {useSetUsers} from 'app/utilities/custom-hooks';
import {isSelectPersonaDisabledSelector} from 'app/store/selectors/auth';
import {AuthStackParamList} from 'app/navigation/StackParamsList';

type Props = StackScreenProps<AuthStackParamList, 'Welcome'>;

export const Welcome: React.FC<Props> = ({navigation}) => {
    const isSelectPersonaDisabled = useSelector(
        isSelectPersonaDisabledSelector
    );

    useSetUsers();

    const handleGetStarted = () => {
        navigation.navigate('GetStartedFirstStep');
    };

    return (
        <WelcomeScreen
            onSelectPersona={() => navigation.navigate('SelectPersona')}
            onGetStarted={handleGetStarted}
            onTermsAndConditions={() =>
                navigation.navigate('TermsAndConditions')
            }
            isSelectPersonaDisabled={isSelectPersonaDisabled}
        />
    );
};
