import React, { useCallback, useEffect, useState } from "react";

import * as S from "./styles";
import ProductCard from "components/Cards/ProductCard";
import { FlatList } from "react-native";
import { ScreenBaseProps } from "utils/index";
import { Gets, Models } from "api/index";
import { useMe } from "providers/user";
import { showToast } from "utils/toast";
import LoadingPanel from "components/LoadingPanel";

const Menu: React.FC<ScreenBaseProps<"Menu">> = () => {
  const me = useMe();

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Models.Product[]>([]);
  const [filter, _] = useState<Models.ProductListFilters>({
    idCompany: me.user?.idCompany ?? 0,
  });

  const onInit = useCallback(async () => {
    try {
      setLoading(true);
      const list = await Gets.listProducts(me.user?.token ?? "", filter);
      setProducts(list);
    } catch (error) {
      showToast("error", (error as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    onInit();
  }, [onInit]);

  if (loading) return <LoadingPanel loading />;

  return (
    <S.Container>
      <FlatList
        data={products}
        renderItem={(item) => <ProductCard product={item.item} />}
        contentContainerStyle={{
          gap: 16,
          paddingHorizontal: 24,
          paddingVertical: 16,
        }}
      />
    </S.Container>
  );
};

export default Menu;
