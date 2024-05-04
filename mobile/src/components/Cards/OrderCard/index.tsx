import React from "react";
import { View } from "react-native";

import Icon from "components/Icon";
import { Shadows } from "components/Shadows";
import { useTheme } from "styled-components/native";

import { Models } from "api/index";
import * as S from "./styles";

type Props = {
  order: Models.Order;
  onPress: (item: Models.Order) => void;
  disabled?: boolean
};

const OrderCard: React.FC<Props> = ({ order, onPress, disabled }) => {
  const theme = useTheme();

  return (
    <Shadows>
      <S.Container onPress={() => onPress(order)} enabled={!disabled}>
        <View
          style={{
            width: 90,
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.colors.primary,
          }}
        >
          <Icon
            name="book"
            type="fontAwesome5"
            size={50}
            right={false}
            color={theme.colors.card}
            disabled
          />
        </View>
        <S.Content>
          <S.Title numberOfLines={1} ellipsizeMode="tail">
            Pedido #{order.id}
          </S.Title>
          <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <S.Subtitle bold>
              Responsável: <S.Subtitle>{order.employee_id}</S.Subtitle>
            </S.Subtitle>
            <S.Subtitle bold>
              Cliente: <S.Subtitle>{order.customer_name}</S.Subtitle>
            </S.Subtitle>
          </View>
          <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <S.Subtitle bold>
              Nº mesa: <S.Subtitle>{order.table_number}</S.Subtitle>
            </S.Subtitle>
            <S.Subtitle bold>
              Valor: <S.Subtitle>{order.total_value}</S.Subtitle>
            </S.Subtitle>
          </View>
          <S.Subtitle bold>
            Status: <S.Subtitle>{order.id_status}</S.Subtitle>
          </S.Subtitle>
          <S.Subtitle bold>
            Data Início:{" "}
            <S.Subtitle>
              {order.created_at?.toLocaleString("pt-BR", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </S.Subtitle>
          </S.Subtitle>
          <S.Subtitle bold>
            Últ. Alteração:{" "}
            <S.Subtitle>
              {order.updated_at?.toLocaleString("pt-BR", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </S.Subtitle>
          </S.Subtitle>
        </S.Content>
      </S.Container>
    </Shadows>
  );
};

export default OrderCard;
