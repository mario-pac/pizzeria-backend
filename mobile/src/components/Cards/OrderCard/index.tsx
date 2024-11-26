import React from "react";
import { View } from "react-native";

import Icon from "components/Icon";
import { Shadows } from "components/Shadows";
import { useTheme } from "styled-components/native";

import { Models } from "api/index";
import * as S from "./styles";

type Props = {
  order: Models.OrderResponse;
  onPress: (item: Models.Order) => void;
  disabled?: boolean;
};

const OrderCard: React.FC<Props> = ({ order, onPress, disabled }) => {
  const theme = useTheme();

  return (
    <Shadows width="auto" height="auto">
      <S.Container onPress={() => onPress(order.self)} enabled={!disabled}>
        <View
          style={{
            width: "25%",
            height: 240,
            paddingVertical: 76,
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
            Pedido #{order.self.id}
          </S.Title>
          <S.Subtitle bold>
            Responsável: <S.Subtitle>{order.employeeName}</S.Subtitle>
          </S.Subtitle>
          <S.Subtitle bold>
            Cliente: <S.Subtitle>{order.self.customerName}</S.Subtitle>
          </S.Subtitle>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <S.Subtitle bold>
              Nº mesa: <S.Subtitle>{order.self.tableNumber}</S.Subtitle>
            </S.Subtitle>
            <S.Subtitle bold>
              Valor:{" "}
              <S.Subtitle>R${order.self.totalValue.toFixed(2)}</S.Subtitle>
            </S.Subtitle>
          </View>
          <S.Subtitle bold>
            Status: <S.Subtitle>{order.status?.description}</S.Subtitle>
          </S.Subtitle>
          <S.Subtitle bold numberOfLines={1}>
            Data Início:{" "}
            <S.Subtitle>
              {order.self.createdAt &&
                new Date(order.self.createdAt)?.toLocaleString("pt-BR", {
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
              {order.self.updatedAt &&
                new Date(order.self.updatedAt)?.toLocaleString("pt-BR", {
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
