import React, { createContext, useContext, useState } from 'react';
import { CompanyDTO } from 'storage/company/companyDTO';
import { SettingDTO } from 'storage/setting/settingDTO';

interface ConfigProps {
    children: JSX.Element;
}

interface Config {
    company: CompanyDTO
    server: SettingDTO
}

interface ConfigData {
    config: Config | undefined
    setConfig: (config: Config) => void;
}

const ConfigContext = createContext({} as ConfigData);

const ConfigProvider: React.FC<ConfigProps> = ({ children }) => {
    const [config, setConfig] = useState<Config | undefined>();

    return (
        <ConfigContext.Provider
            value={{
                config,
                setConfig,
            }}>
            {children}
        </ConfigContext.Provider>
    );
};

const useMe = (): ConfigData => {
    const context = useContext(ConfigContext);

    return context;
};

export { ConfigProvider, useMe };