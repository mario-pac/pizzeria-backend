import React from "react";
import Constants from "expo-constants";

import * as S from "./styles";

const Version: React.FC = () => {
  const version = Constants.expoConfig?.version;

  return (
    <S.Container>
      <S.Text>Versão: {version}</S.Text>
    </S.Container>
  );
};

export default Version;
