import React, { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";

import Loading from "components/Loading";
import OrderCard from "components/Cards/OrderCard";
import ModalFiltersOrders from "components/Modal/ModalFiltersOrders";

import { ScreenBaseProps } from "utils/index";

import { useMe } from "providers/user";
import { useConfigs } from "providers/config";

import { Gets, Models } from "api/index";

import * as S from "./styles";
import Button from "components/Button";

const Orders: React.FC<ScreenBaseProps<"Orders">> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const me = useMe();
  const { config } = useConfigs();

  const [filter, setFilter] = useState<Models.OrderListFilters>({
    idCompany: config?.company.id ?? 1,
    employeeId: me.user!.id,
  });

  const [orders, setOrders] = useState<Models.Order[]>([]);
  const [showModal, setShowModal] = useState(false);

  const getOrders = useCallback(async () => {
    try {
      setLoading(true);
      const response = await Gets.listOrders(me.user!.token, filter);
      if (response) {
        setOrders(response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    getOrders();
  }, []);

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
            <OrderCard
              order={item}
              onPress={(it) => navigation.navigate("Order", { id: it.id })}
            />
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
