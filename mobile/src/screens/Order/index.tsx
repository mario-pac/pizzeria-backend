import React, { useCallback, useEffect, useState } from "react";
import { Alert, BackHandler, FlatList, Text } from "react-native";
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
import { useTheme } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

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
  const theme = useTheme();

  const init = useCallback(async () => {
    try {
      setLoading(true);
      cleanCart();
      if (route.params?.id) {
        const ord = await Gets.orderById(me.user!.token, route.params.id);
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

  const onExit = async () => {
    try {
      setLoading(true);
      if (order) {
        const ret = order.id
          ? await Puts.handleUpdateOrder(me.user!.token, {
              self: order,
              orderItems: items,
              itemsDeleted,
              employeeName: me.user?.name ?? "",
            })
          : await Posts.handleInsertOrder(me.user!.token, {
              self: order,
              orderItems: items,
              employeeName: me.user?.name ?? "",
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
    updateCart(items.filter((i) => i.self.position !== item.position));
  };

  const openExitModal = () => {
    Alert.alert("CANCELAR", "Deseja sair sem salvar a edição do pedido?", [
      { text: "Sim", onPress: navigation.goBack },
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
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <ItemListCard
            item={item.self}
            description={item.description}
            status={item.status?.description}
            key={Math.random() + 97854}
            onPress={(i) =>
              navigation.navigate("ProductForm", {
                id: i.id,
                notToList: true,
              })
            }
            onRemove={removeItemModal}
          />
        )}
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 16,
          gap: 12,
        }}
        ListEmptyComponent={
          <Text
            style={{
              color: theme.colors.text.primary,
              width: "100%",
              textAlign: "center",
              fontFamily: theme.fonts.semibold,
              fontSize: RFValue(14),
            }}
          >
            Nenhum item adicionado...
          </Text>
        }
        ListFooterComponent={
          <S.Footer>
            <Button value="Salvar Pedido" onPress={onExit} />
            <Spacer height={16} />
            <Button
              value="Finalizar Pedido"
              onPress={() => navigation.navigate("FinishOrder")}
            />
            <Spacer height={16} />
            <Button value="Sair" outline onPress={openExitModal} />
          </S.Footer>
        }
      />
    </>
  );
};

export default Order;
