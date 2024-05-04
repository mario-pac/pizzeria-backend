import React from "react";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import Icon from "components/Icon";
import { CText } from "components/headers/headerStyle";
import HeaderContainer from "components/headers/headerContainer";

import { useTheme } from "styled-components/native";

interface Props {
  id?: number;
  onGoBack?: () => void;
}

const ProductHeader: React.FC<Props> = ({ id, onGoBack }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <HeaderContainer
      insetTop={insets.top}
      style={{ justifyContent: "flex-start" }}
    >
      <Icon
        type="feather"
        name="arrow-left"
        size={24}
        right={false}
        onPress={onGoBack}
        color={theme.colors.text.secondary}
      />
      <CText>{!!id ? "Produto #" + id : "Novo Produto"} </CText>
    </HeaderContainer>
  );
};

export default ProductHeader;
