import React from "react";
import { Pressable, TouchableOpacity, View } from "react-native";

import Icon from "components/Icon";

import { Models } from "api/index";

import { useTheme } from "styled-components/native";
import * as S from "./styles";

type Props = {
  item: Models.OrderItem;
  description: string;
  status?: string;
  onPress: (item: Models.OrderItem) => void;
  onRemove?: (item: Models.OrderItem) => void;
};

const ItemListCard: React.FC<Props> = ({
  item,
  description,
  status,
  onPress,
  onRemove,
}) => {
  const theme = useTheme();

  return (
    <S.Container>
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
        <Pressable
          style={{ justifyContent: "space-around" }}
          onPress={() => onPress(item)}
        >
          <S.Title numberOfLines={1} ellipsizeMode="tail">
            Item No. {item.position.toString().padStart(3, "0")}
          </S.Title>
          <S.Title numberOfLines={1} ellipsizeMode="tail">
            {description}
          </S.Title>
          <S.Subtitle bold>
            Quantidade: <S.Subtitle>{item.quantity}</S.Subtitle>
          </S.Subtitle>
          {status && (
            <S.Subtitle bold>
              Status do item: <S.Subtitle>{status}</S.Subtitle>
            </S.Subtitle>
          )}
          <S.Subtitle bold>
            Data de criação:{" "}
            <S.Subtitle>
              {item.createdAt
                ? new Date(item.createdAt).toLocaleString("pt-BR", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : new Date().toLocaleString("pt-BR", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
            </S.Subtitle>
          </S.Subtitle>
          {item.updatedAt && (
            <S.Subtitle bold>
              Atualizado em:{" "}
              <S.Subtitle>
                {new Date(item.updatedAt).toLocaleString("pt-BR", {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </S.Subtitle>
            </S.Subtitle>
          )}
        </Pressable>
      </S.Content>
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: 45,
          backgroundColor: theme.colors.status.error,
        }}
        onPress={() => onRemove && onRemove(item)}
      >
        <Icon
          name="trash"
          type="fontAwesome"
          size={40}
          color={theme.colors.text.primary}
          right={false}
          disabled
        />
      </TouchableOpacity>
    </S.Container>
  );
};

export default ItemListCard;
