import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {SelectUserScreen} from 'app/components/SelectPersona';
import {AuthStackParamList} from 'app/navigation/StackParamsList';

type Props = StackScreenProps<AuthStackParamList, 'SelectPersona'>;

export const SelectPersona: React.FC<Props> = () => {
    return <SelectUserScreen />;
};
