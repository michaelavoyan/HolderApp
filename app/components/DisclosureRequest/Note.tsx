import React from 'react';
import {View, StyleSheet} from 'react-native';

import {InfoBlock} from '../common/InfoBlock';

interface InstrustionsProps {
    description: string;
}

export const Instructions: React.FC<InstrustionsProps> = ({description}) => {
    return (
        <View style={styles.infoBlock}>
            <InfoBlock title="Instructions" value={description} />
        </View>
    );
};

const styles = StyleSheet.create({
    infoBlock: {
        marginTop: 24
    }
});
