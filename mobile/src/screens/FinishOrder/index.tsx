import React from "react";
import { Alert } from "react-native";

import Input from "components/Input";
import Spacer from "components/Spacer";
import Button from "components/Button";
import SelectInput from "components/SelectInput";

import { Puts } from "api/index";

import { useCart } from "providers/cart";
import { useMe } from "providers/user";

import { showToast } from "utils/toast";
import { ScreenBaseProps, formatPrice } from "utils/index";

import * as S from "./styles";

const FinishOrder: React.FC<ScreenBaseProps<"FinishOrder">> = ({
  navigation,
}) => {
  const me = useMe();
  const { order, setOrder, cleanCart, items, itemsDeleted } = useCart();

  const handleFinalize = async () => {
    try {
      if (order) {
        const ret = await Puts.handleUpdateOrder(me.user!.token, {
          self: {
            ...order,
            idStatus: 5,
          },
          orderItems: items,
          itemsDeleted,
        });
        cleanCart();
        showToast("success", ret.message);
        navigation.replace("Home");
      }
    } catch (error) {
      const msg = (error as Error).message;
      showToast("error", msg);
      return;
    }
  };

  const onFinish = () => {
    if (order?.id) {
      Alert.alert(
        "Finalizar",
        `Deseja realmente finalizar o pedido #${order.id} e enviar para pagamento?`,
        [
          { text: "Sim", onPress: async () => handleFinalize() },
          { text: "Não" },
        ]
      );
    }
  };

  const disabled = !order?.paymentMethod?.length;

  return (
    <S.Container>
      <Input
        label="Valor total do pedido"
        disabled
        value={order?.totalValue ? formatPrice(order?.totalValue) : ""}
      />
      <Spacer height={12} />
      <SelectInput<{ label: string; value: string }>
        label="Forma de pagamento"
        value={order?.paymentMethod}
        items={[
          { label: "Crédito à vista", value: "credit" },
          { label: "Débito à vista", value: "debit" },
          { label: "Dinheiro à vista", value: "cash" },
        ]}
        keyOfLabel="label"
        keyOfValue="value"
        onValueChange={(v) => {
          if (v) {
            setOrder({ ...order!, paymentMethod: v.value });
            return;
          }
          setOrder({ ...order!, paymentMethod: "" });
        }}
        placeholder="Selecione uma opção..."
      />
      <S.Footer>
        <Button
          value="Confirmar Finalização"
          onPress={onFinish}
          disabled={disabled}
        />
        <Spacer height={16} />
        <Button value="Cancelar" outline />
      </S.Footer>
    </S.Container>
  );
};

export default FinishOrder;
