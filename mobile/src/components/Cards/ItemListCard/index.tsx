import React from "react";
import { View } from "react-native";

import Icon from "components/Icon";
import { Shadows } from "components/Shadows";

import { Models } from "api/index";

import { useTheme } from "styled-components/native";
import * as S from "./styles";

type Props = {
  item: Models.OrderItem;
  onPress: (item: Models.OrderItem) => void;
  onRemove?: (item: Models.OrderItem) => void;
};

const ItemListCard: React.FC<Props> = ({ item, onPress, onRemove }) => {
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
            name="pizza-slice"
            type="fontAwesome5"
            size={50}
            right={false}
            color={theme.colors.card}
            disabled
          />
        </View>
        <S.Content>
          <Icon
            name="trash"
            type="antdesign"
            size={28}
            color={theme.colors.text.primary}
            onPress={() => onRemove && onRemove(item)}
          />
          <S.Title numberOfLines={1} ellipsizeMode="tail">
            Item No. {item.position.toString().padStart(3, "0")} do Pedido #
            {item.orderId}
          </S.Title>
          <S.Subtitle bold>
            Quantidade: <S.Subtitle>{item.quantity}</S.Subtitle>
          </S.Subtitle>
          <S.Subtitle bold>
            Data de criação:{" "}
            <S.Subtitle>
              {item.createdAt?.toLocaleString("pt-BR", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </S.Subtitle>
          </S.Subtitle>
          <S.Subtitle bold>
            Atualizado em:{" "}
            <S.Subtitle>
              {item.updatedAt?.toLocaleString("pt-BR", {
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

export default ItemListCard;
