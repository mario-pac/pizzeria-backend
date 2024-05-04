import React from "react";
import { View } from "react-native";

import { Shadows } from "components/Shadows";
import Icon, { IconProps } from "components/Icon";

import { OrderItem } from "definitions/order_items";

import { useTheme } from "styled-components/native";
import * as S from "./styles";

type Props = {
  item: OrderItem;
  onPress: (item: OrderItem) => void;
};

const ItemListCard: React.FC<Props> = ({ item, onPress }) => {
  const theme = useTheme();

  return (
    <Shadows>
      <S.Container onPress={() => onPress(item)}>
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
            name='pizza-slice'
            type='fontAwesome5'
            size={50}
            right={false}
            color={theme.colors.card}
            disabled
          />
        </View>
        <S.Content>
          <S.Title numberOfLines={1} ellipsizeMode="tail">
            Item #{item.Id} do Pedido #{item.OrderId}
          </S.Title>
          <S.Subtitle bold>
            Quantidade: <S.Subtitle>{item.Quantity}</S.Subtitle>
          </S.Subtitle>
          <S.Subtitle bold>
            Data de criação: <S.Subtitle>{item.CreatedAt?.toLocaleString("pt-BR", {
              day: "numeric",
              month: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}</S.Subtitle>
          </S.Subtitle>
          <S.Subtitle bold>
            Atualizado em: <S.Subtitle>{item.UpdatedAt?.toLocaleString("pt-BR", {
              day: "numeric",
              month: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}</S.Subtitle>
          </S.Subtitle>
        </S.Content>
      </S.Container>
    </Shadows>
  );
};

export default ItemListCard;
