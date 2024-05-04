import React from "react";

import Icon, { IconProps } from "components/Icon";

import { useTheme } from "styled-components/native";
import * as S from "./styles";

interface Props {
  onPress?: () => void;
  name: string;
  icon: IconProps;
}

const OptionsCard: React.FC<Props> = ({ icon, name, onPress }) => {
  const theme = useTheme();
  return (
    <S.Container onPress={onPress}>
      <Icon
        type={icon.type}
        name={icon.name}
        size={26}
        right={false}
        color={theme.colors.text.primary}
        disabled
      />
      <S.Name>{name}</S.Name>
    </S.Container>
  );
};

export default OptionsCard;
