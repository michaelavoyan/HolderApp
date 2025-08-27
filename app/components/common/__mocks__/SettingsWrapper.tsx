import React, {ReactNode} from 'react';

const DEFAULT_LOCALE = 'en-US';
export const SettingsContext = React.createContext(DEFAULT_LOCALE);

export const SettingsWrapper: React.FC<{children: ReactNode}> = ({
    children
}) => {
    return (
        <SettingsContext.Provider value={DEFAULT_LOCALE}>
            {children}
        </SettingsContext.Provider>
    );
};
