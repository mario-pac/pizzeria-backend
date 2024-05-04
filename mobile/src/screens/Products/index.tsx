import React, { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";

import ProductCard from "components/Cards/ProductCard";

import { ScreenBaseProps } from "utils/index";

import ProductsHeader from "headers/ProductsHeader";
import * as S from "./styles";
import { Models, Gets } from "api/index";
import Loading from "components/Loading";
import { useMe } from "providers/user";

const Products: React.FC<ScreenBaseProps<"Products">> = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);

  const me = useMe()

  const [filter, setFilter] = useState<Models.ProductListFilters>({
    id_company: 1,
  });

  const [products, setProducts] = useState<Models.Product[]>([])

  const getProducts = useCallback(async () => {
    try {
      setLoading(true)
      const response = await Gets.listProducts(me.user!.token, filter)
      if (response) {
        setProducts(response)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [filter])

  useEffect(() => {
    getProducts()
  }, [getProducts])

  if (loading) {
    return <Loading overlap />
  }

  const notToList = route.params?.notToList ?? false

  return (
    <>
      <ProductsHeader
        onGoBack={navigation.goBack}
        onAdd={() => navigation.navigate("ProductForm")}
        notToList={notToList}
      />
      <S.Container>
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() =>
                navigation.navigate("ProductForm", { id: item.id, notToList })
              }
            />
          )}
          style={{ paddingHorizontal: 24, paddingVertical: 16 }}
        />
      </S.Container>
    </>
  );
};

export default Products;
