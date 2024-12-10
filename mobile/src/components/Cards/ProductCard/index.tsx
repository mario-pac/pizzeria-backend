import React from "react";
import { View } from "react-native";

import { Shadows } from "components/Shadows";
import Icon from "components/Icon";

import { useTheme } from "styled-components/native";
import * as S from "./styles";
import { Models } from "api/index";

type Props = {
  product: Models.Product;
  onPress?: () => void;
};

const ProductCard: React.FC<Props> = ({ product, onPress }) => {
  const theme = useTheme();

  return (
    <Shadows width="auto" height="auto">
      <S.Container onPress={onPress}>
        <View
          style={{
            width: "25%",
            height: 90,
            paddingVertical: 18,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.colors.primary,
          }}
        >
          <Icon
            name="dollar"
            type="fontisto"
            size={50}
            right={false}
            color={theme.colors.card}
            disabled
          />
        </View>
        <S.Content>
          <S.Title numberOfLines={1} ellipsizeMode="tail">
            {product.description}
          </S.Title>
          <S.Subtitle bold>
            Categoria: <S.Subtitle>{product.category}</S.Subtitle>
          </S.Subtitle>
          <S.Subtitle bold>
            Preço:{" "}
            <S.Subtitle>
              R${product.price.toFixed(2).replace(".", ",")}
            </S.Subtitle>
          </S.Subtitle>
        </S.Content>
      </S.Container>
    </Shadows>
  );
};

export default ProductCard;
