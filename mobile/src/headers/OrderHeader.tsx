import React from "react";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import Icon from "components/Icon";
import { CText } from "components/headers/headerStyle";
import HeaderContainer from "components/headers/headerContainer";

import { useTheme } from "styled-components/native";
import { TouchableOpacity, View } from "react-native";

interface Props {
  id?: number;
  onGoBack?: () => void;
  onAdd?: () => void;
}

const OrderHeader: React.FC<Props> = ({ id, onGoBack, onAdd }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <HeaderContainer
      insetTop={insets.top}
    >
      <View style={{ flexDirection: 'row' }}>
        <Icon
          type="feather"
          name="arrow-left"
          size={30}
          right={false}
          onPress={onGoBack}
          color={theme.colors.text.secondary}
        />
        <CText>{!!id ? "Pedido #" + id : "Novo Pedido"} </CText>
      </View>
      <TouchableOpacity style={{ flexDirection: 'row' }} onPress={onAdd}>
        <CText>Adicionar Produto </CText>
        <Icon
          type="antdesign"
          name="plus"
          size={30}
          disabled
          right={false}
          color={theme.colors.text.secondary}
        />
      </TouchableOpacity>
    </HeaderContainer>
  );
};

export default OrderHeader;
