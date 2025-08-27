import React, {useEffect} from 'react';
import {Alert, ImageBackground, StyleSheet} from 'react-native';
import i18n from '../../i18n';
import {vclLogger} from '../logger';

/** Catches critical (white screen) errors */
export class ErrorBoundary extends React.Component<
    any,
    {
        hasError: boolean;
    }
> {
    constructor(props: any) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError() {
        return {hasError: true};
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        vclLogger.error(`Error boundary error - ${JSON.stringify(error)}`);
        vclLogger.error(
            `Error boundary errorInfo - ${JSON.stringify(errorInfo)}`
        );
    }

    render() {
        const {hasError} = this.state;
        const {children} = this.props;

        if (hasError) {
            return <ErrorPlaceholder />;
        }

        return children;
    }
}

const ErrorPlaceholder: React.FC = () => {
    useEffect(() => {
        Alert.alert(
            i18n.t('Error'),
            i18n.t('Please close the app and try again')
        );
    }, []);

    return (
        <ImageBackground
            source={{uri: 'splash-screen'}}
            resizeMode="center"
            style={styles.image}
        />
    );
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%'
    }
});
