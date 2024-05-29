import React, { useCallback } from "react";
import { Alert, BackHandler } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import Button from "components/Button";
import Spacer from "components/Spacer";

import { useCart } from "providers/cart";
import { ScreenBaseProps } from "utils/index";

import OrderHeader from "headers/OrderHeader";
import * as S from "./styles";

const Order: React.FC<ScreenBaseProps<"Order">> = ({ navigation }) => {
  const { order } = useCart();

  //Intercept back button behavior
  useFocusEffect(
    useCallback(() => {
      const handler = () => {
        openExitModal();
        return true;
      };

      const event = BackHandler.addEventListener("hardwareBackPress", handler);

      return () => event.remove();
    }, [])
  );

  const openExitModal = () => {
    Alert.alert("CANCELAR", "Deseja cancelar a edição do pedido?", [
      { text: "Sim", onPress: () => navigation.goBack() },
      { text: "Não" },
    ]);
  };

  return (
    <>
      <OrderHeader
        id={order?.id ?? 0}
        onGoBack={openExitModal}
        onAdd={() =>
          navigation.navigate("Products", {
            notToList: true,
          })
        }
      />
      <S.Container>
        <S.Footer>
          <Button value="Salvar Pedido" />
          <Spacer height={16} />
          <Button
            value="Finalizar Pedido"
            onPress={() => navigation.navigate("FinishOrder")}
          />
          <Spacer height={16} />
          <Button value="Sair" outline />
        </S.Footer>
      </S.Container>
    </>
  );
};

export default Order;
