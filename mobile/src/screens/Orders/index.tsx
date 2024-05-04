import React, { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";

import OrderCard from "components/Cards/OrderCard";

import { ScreenBaseProps } from "utils/index";

import * as S from "./styles";
import { useCart } from "providers/cart";
import { Gets, Models } from "api/index";
import { useMe } from "providers/user";
import Loading from "components/Loading";

const Orders: React.FC<ScreenBaseProps<"Orders">> = ({ navigation }) => {
  const { setOrder } = useCart()

  const [loading, setLoading] = useState(false);

  const me = useMe()

  const [filter, setFilter] = useState<Models.OrderListFilters>({
    id_company: 1,
  });

  const [orders, setOrders] = useState<Models.Order[]>([])

  const getOrders = useCallback(async () => {
    try {
      setLoading(true)
      const response = await Gets.listOrders(me.user!.token, filter)
      if (response) {
        setOrders(response)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [filter])

  useEffect(() => {
    getOrders()
  }, [getOrders])

  if (loading) {
    return <Loading overlap />
  }

  const onClick = (order: Models.Order) => {
    setOrder(order)
    navigation.navigate("Order")
  }

  return (
    <S.Container>
      <FlatList
        data={orders}
        renderItem={({ item }) => (
          <OrderCard
            order={item}
            onPress={onClick}
          />
        )}
        style={{ paddingHorizontal: 24, paddingVertical: 16 }}
      />
    </S.Container>
  );
};

export default Orders;
