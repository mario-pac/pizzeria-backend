import React, { useCallback, useEffect, useState } from "react";
import { Alert, BackHandler, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import Button from "components/Button";
import Spacer from "components/Spacer";
import LoadingPanel from "components/LoadingPanel";
import ItemListCard from "components/Cards/ItemListCard";

import { Gets, Models, Posts, Puts } from "api/index";

import { useCart } from "providers/cart";
import { useMe } from "providers/user";

import { ScreenBaseProps } from "utils/index";
import { showToast } from "utils/toast";

import OrderHeader from "headers/OrderHeader";
import * as S from "./styles";
import { AxiosError } from "axios";

const Order: React.FC<ScreenBaseProps<"Order">> = ({ navigation, route }) => {
  const {
    order,
    setOrder,
    items,
    updateCart,
    cleanCart,
    itemsDeleted,
    addItemDeleted,
  } = useCart();
  const [loading, setLoading] = useState(false);
  const me = useMe();

  const init = useCallback(async () => {
    try {
      setLoading(true);
      console.warn("get in");
      if (route.params?.id) {
        console.warn(route.params.id);
        const ord = await Gets.orderById(me.user!.token, route.params.id);
        console.warn(ord);
        setOrder(ord.self);
        if (ord.orderItems) {
          updateCart(ord.orderItems);
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
    } catch (error) {
      console.error(error);
      showToast("error", (error as AxiosError).response?.data as string);
    } finally {
      setLoading(false);
    }
  }, [route.params]);

  useEffect(() => {
    init();
  }, []);

  const onGoBack = async () => {
    try {
      setLoading(true);
      if (order) {
        const ret = order.id
          ? await Puts.handleUpdateOrder(me.user!.token, {
              self: order,
              orderItems: items,
              itemsDeleted,
            })
          : await Posts.handleInsertOrder(me.user!.token, {
              self: order,
              orderItems: items,
            });
        showToast("success", ret.message);
        setOrder(undefined);
        cleanCart();
        navigation.goBack();
      }
    } catch (error) {
      console.error(error);
      showToast("error", (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

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

  const removeItemModal = (item: Models.OrderItem) => {
    Alert.alert(
      "REMOVER",
      `Deseja remover o item No. ${item.position} do pedido?`,
      [{ text: "Sim", onPress: () => removeItem(item) }, { text: "Não" }]
    );
  };

  const removeItem = (item: Models.OrderItem) => {
    if (item.id) {
      addItemDeleted(item.id);
    }
    updateCart(items.filter((i) => i.position !== item.position));
  };

  const openExitModal = () => {
    Alert.alert("CANCELAR", "Deseja sair e salvar a edição do pedido?", [
      { text: "Sim", onPress: onGoBack },
      { text: "Não" },
    ]);
  };

  if (loading) return <LoadingPanel loading />;

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
            <ItemListCard
              item={item}
              key={index}
              onPress={(i) =>
                navigation.navigate("ProductForm", {
                  id: i.id,
                  notToList: true,
                })
              }
              onRemove={removeItemModal}
            />
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
          <Button value="Sair" outline onPress={openExitModal} />
        </S.Footer>
      </S.Container>
    </>
  );
};

export default Order;
