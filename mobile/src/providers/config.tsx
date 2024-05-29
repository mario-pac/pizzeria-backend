import { Models } from "api/index";
import React, { createContext, useContext, useState } from "react";
import { SettingDTO } from "storage/setting/settingDTO";

interface ConfigProps {
  children: JSX.Element;
}

interface Config {
  company: Models.Company;
  server: SettingDTO;
}

interface ConfigData {
  config: Config | undefined;
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
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

const useConfigs = (): ConfigData => {
  const context = useContext(ConfigContext);

  return context;
};

export { ConfigProvider, useConfigs };
