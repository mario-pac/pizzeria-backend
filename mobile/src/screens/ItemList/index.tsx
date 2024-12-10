import React, { useCallback, useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";

import LoadingPanel from "components/LoadingPanel";
import ItemListCard from "components/Cards/ItemListCard";

import { useMe } from "providers/user";

import { Gets, Models, Puts } from "api/index";

import { showToast } from "utils/toast";
import { ScreenBaseProps } from "utils/index";

import * as S from "./styles";

const ItemList: React.FC<ScreenBaseProps<"ItemList">> = () => {
  const [loading, setLoading] = useState(false);

  const [itemList, setItemList] = useState<Models.OrderItemResponse[]>([]);

  const me = useMe();

  const handleFinalize = async (item: Models.OrderItem, idStatus: number) => {
    try {
      item.idOrderStatus = idStatus;
      const { message } = await Puts.handleUpdateOrderItem(
        me.user!.token,
        item
      );
      showToast("success", message);
      await getItems();
    } catch (error) {
      const msg = (error as Error).message;
      showToast("error", msg);

      return;
    }
  };

  const getItems = useCallback(async () => {
    try {
      setLoading(true);
      const its = await Gets.orderItemByIdsStatus(
        me.user?.token ?? "",
        me.user?.levelId === 1
          ? ["1", "2"]
          : me.user?.levelId === 2
          ? ["3"]
          : []
      );
      if (its) setItemList(its);
      else setItemList([]);
    } catch (error) {
      console.log(error);
      showToast("error", "Erro ao buscar itens: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  }, [handleFinalize]);

  useEffect(() => {
    getItems();
  }, []);

  const finalizeItem = (item: Models.OrderItem) => {
    if (item.idOrderStatus === 1) {
      Alert.alert(
        "Confirmar item em preparo",
        `Deseja realmente confirmar que o item #${item.id} está sendo preparado?`,
        [
          { text: "Sim", onPress: async () => handleFinalize(item, 2) },
          { text: "Não" },
        ]
      );
    } else if (item.idOrderStatus === 2) {
      Alert.alert(
        "Confirmar item feito",
        `Deseja realmente confirmar que o item #${item.id} está pronto para ser servido?`,
        [
          { text: "Sim", onPress: async () => handleFinalize(item, 3) },
          { text: "Não" },
        ]
      );
    } else {
      Alert.alert(
        "Confirmar entrega",
        `Deseja realmente confirmar a entrega do item #${item.id} à mesa?`,
        [
          { text: "Sim", onPress: async () => handleFinalize(item, 6) },
          { text: "Não" },
        ]
      );
    }
  };

  if (loading) return <LoadingPanel loading />;

  return (
    <S.Container>
      <FlatList
        data={itemList}
        renderItem={({ item, index }) => (
          <ItemListCard
            item={item.self}
            status={item.status?.description}
            description={item.description}
            key={index}
            onPress={finalizeItem}
          />
        )}
        contentContainerStyle={{
          gap: 16,
          paddingHorizontal: 24,
          paddingVertical: 16,
        }}
      />
    </S.Container>
  );
};

export default ItemList;
