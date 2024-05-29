import React, { useCallback, useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";

import ItemListCard from "components/Cards/ItemListCard";

import { Gets, Models, Puts } from "api/index";
import { showToast } from "utils/toast";
import { ScreenBaseProps } from "utils/index";

import * as S from "./styles";
import { useMe } from "providers/user";
import LoadingPanel from "components/LoadingPanel";

const ItemList: React.FC<ScreenBaseProps<"ItemList">> = () => {
  const [loading, setLoading] = useState(false);

  const [itemList, setItemList] = useState<Models.OrderItemResponse[]>([]);

  const me = useMe();

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
    } catch (error) {
      showToast("error", "Erro ao buscar itens: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getItems();
  }, [getItems]);

  const handleFinalize = async (
    item: Models.OrderItemResponse,
    idStatus: number
  ) => {
    try {
      item.self.idStatus = idStatus;
      const { message } = await Puts.handleUpdateOrderItem(
        me.user!.token,
        item.self
      );
      showToast("success", message);
    } catch (error) {
      const msg = (error as Error).message;
      showToast("error", msg);

      return;
    }
  };

  const finalizeItem = (item: Models.OrderItemResponse) => {
    if (item.self.idStatus === 1) {
      Alert.alert(
        "Confirmar item em preparo",
        `Deseja realmente confirmar que o item #${item.self.id} está sendo preparado?`,
        [
          { text: "Sim", onPress: async () => handleFinalize(item, 2) },
          { text: "Não" },
        ]
      );
    } else if (item.self.idStatus === 2) {
      Alert.alert(
        "Confirmar item feito",
        `Deseja realmente confirmar que o item #${item.self.id} está pronto para ser servido?`,
        [
          { text: "Sim", onPress: async () => handleFinalize(item, 3) },
          { text: "Não" },
        ]
      );
    } else {
      Alert.alert(
        "Confirmar entrega",
        `Deseja realmente confirmar a entrega do item #${item.self.id} à mesa?`,
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
          <ItemListCard item={item} key={index} onPress={finalizeItem} />
        )}
      />
    </S.Container>
  );
};

export default ItemList;
