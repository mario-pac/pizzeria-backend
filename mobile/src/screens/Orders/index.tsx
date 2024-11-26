import React, { useCallback, useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";

import Loading from "components/Loading";
import OrderCard from "components/Cards/OrderCard";
import ModalFiltersOrders from "components/Modal/ModalFiltersOrders";

import { ScreenBaseProps } from "utils/index";

import { useMe } from "providers/user";
import { useConfigs } from "providers/config";

import { Gets, Models, Puts } from "api/index";

import * as S from "./styles";
import Button from "components/Button";
import { log } from "../../log";
import { useFocusEffect } from "@react-navigation/native";
import { showToast } from "utils/toast";

const Orders: React.FC<ScreenBaseProps<"Orders">> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const me = useMe();
  const { config } = useConfigs();

  const [filter, setFilter] = useState<Models.OrderListFilters>({
    idCompany: config?.company.id ?? 1,
    employeeId: me.user!.id,
  });

  const [orders, setOrders] = useState<Models.OrderResponse[]>([]);
  const [showModal, setShowModal] = useState(false);

  const getOrders = async () => {
    try {
      setLoading(true);
      const response = await Gets.listOrders(me.user!.token, filter);
      if (response) {
        setOrders(response);
      }
    } catch (error) {
      log.debug(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getOrders();
    }, [filter])
  );

  const handleConfirmPayment = async (or: Models.Order) => {
    try {
      setLoading(true);
      await Puts.handleUpdateOrder(me!.user?.token ?? "", {
        self: { ...or, idStatus: 6 },
        employeeName: me.user?.name ?? "",
        itemsDeleted: [],
        orderItems: [],
      });
      showToast("success", "Pedido finalizado com sucesso!");
    } catch (error) {
      showToast("error", (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const onPressCard = (or: Models.Order) => {
    if (or.idStatus !== 5) {
      navigation.navigate("Order", { id: or.id });
      return;
    }
    Alert.alert(
      "CONFIRMAR PAGAMENTO",
      "Deseja confirmar o pagamento do pedido e finalizá-lo?",
      [
        {
          text: "Sim",
          onPress: () => handleConfirmPayment(or),
        },
        {
          text: "Não",
        },
      ]
    );
  };

  return (
    <S.Container>
      <ModalFiltersOrders
        filter={filter}
        setFilter={setFilter}
        showModal={showModal}
        closeModal={() => setShowModal(false)}
      />
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={orders}
          ListHeaderComponent={
            <Button value="Ver filtros" onPress={() => setShowModal(true)} />
          }
          renderItem={({ item }) => (
            <OrderCard order={item} onPress={onPressCard} />
          )}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingVertical: 16,
            gap: 16,
          }}
        />
      )}
    </S.Container>
  );
};

export default Orders;
