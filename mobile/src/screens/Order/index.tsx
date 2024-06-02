import React, { useCallback, useEffect } from "react";
import { Alert, BackHandler, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import Button from "components/Button";
import Spacer from "components/Spacer";
import ItemListCard from "components/Cards/ItemListCard";

import { useCart } from "providers/cart";
import { ScreenBaseProps } from "utils/index";

import OrderHeader from "headers/OrderHeader";
import * as S from "./styles";
import { Gets } from "api/index";
import { useMe } from "providers/user";

const Order: React.FC<ScreenBaseProps<"Order">> = ({ navigation, route }) => {
  const { order, setOrder, items, addToCart } = useCart();
  const me = useMe();

  const init = useCallback(async () => {
    if (route.params?.id) {
      const ord = await Gets.orderById(me.user!.token, route.params.id);
      setOrder(ord.self);
      if (ord.orderItems) {
        for (const it of ord.orderItems) {
          addToCart(it);
        }
      }
    } else if (route.params?.tableNumber && route.params?.customerName) {
      setOrder({
        id: 0,
        customerName: route.params.customerName,
        idCompany: me.user!.idCompany,
        employeeId: me.user?.id,
        idStatus: 4,
        paymentMethod: "",
        tableNumber: route.params.tableNumber,
        totalValue: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        note: "",
      });
    }
  }, [route.params]);

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
        <FlatList
          data={items}
          renderItem={({ item, index }) => (
            <ItemListCard item={item} key={index} onPress={(i) => {}} />
          )}
        />
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
