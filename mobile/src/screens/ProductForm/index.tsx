import React, { useState } from "react";
import { Alert, ScrollView } from "react-native";

import Input from "components/Input";
import Spacer from "components/Spacer";
import Button from "components/Button";
import CountInput from "components/CountInput";
import SelectInput from "components/SelectInput";

import { ScreenBaseProps } from "utils/index";

import ProductHeader from "headers/ProductHeader";
import { showToast } from "utils/toast";
import { Product } from "definitions/product";
import { useCart } from "providers/cart";
import { OrderItem } from "definitions/order_items";
import * as S from "./styles";

const ProductForm: React.FC<ScreenBaseProps<"ProductForm">> = ({
  navigation,
  route,
}) => {
  const { addToCart } = useCart()

  const [category, setCategory] = useState<string>("");
  const [quantity, setQuantity] = useState('0')
  const [loading, setLoading] = useState(false)

  const notToList = route.params?.notToList ?? false

  const onAdd = (item: Product) => {
    Alert.alert('Adicionar ao carrinho', `Deseja adicionar o produto #${item.Id} ao carrinho?`, [
      { text: "Sim", onPress: () => handleAdd(item) },
      { text: "Não" },
    ]);
  }

  const handleAdd = (item: Product) => {
    const orderItem: OrderItem = {
      ...item,
      IdStatus: 0,
      Quantity: Number(quantity),
      Id: 0
    }
    addToCart(orderItem)
  }

  const onPress = () => {
    const title = route.params?.id ? 'ATUALIZAR' : 'SALVAR'
    const subtitle = route.params?.id ? `Deseja atualizar o cadastro do produto #${route.params.id}?` : 'Deseja cadastrar o novo produto?'
    Alert.alert(title, subtitle, [
      { text: "Sim", onPress: handleConfirm },
      { text: "Não" },
    ]);
  }

  const handleConfirm = async () => {
    setLoading(true)
    try {
      if (route.params?.id) {
        //update
        showToast("success", "Produto atualizado com sucesso!")
      } else {
        //save
        showToast("success", "Produto criado com sucesso!")
      }
      navigation.navigate('Products')
    } catch (error) {
      const msg = (error as Error).message
      showToast("error", msg)
    } finally {
      setLoading(false)
    }
  }

  const product = {} as Product

  return (
    <>
      <ProductHeader onGoBack={navigation.goBack} id={route.params?.id} />
      <S.Container>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <Input label="Nome do Produto" disabled={notToList} />
          <Spacer height={12} />
          <SelectInput
            label="Categoria"
            value={category}
            items={[
              { label: "Pizzas", value: "P" },
              { label: "Bebidas", value: "B" },
            ]}
            onValueChange={(v) => {
              if (v) {
                setCategory(v.value);
              }
            }}
            placeholder="Selecione uma opção..."
            disabled={notToList}
          />
          <Spacer height={12} />
          <Input label="Descrição" disabled={notToList} />
          <Spacer height={12} />
          <Input label="Preço" disabled={notToList} />
          {notToList &&
            <>
              <Spacer height={12} />
              <CountInput label="Quantidade" keyboardType="number-pad" value={quantity} onChangeText={setQuantity} />
              <Spacer height={12} />
              <Input label="Observações" observation />
            </>
          }
          <Spacer height={notToList ? 260 : 470} />
          <S.Footer>
            {notToList ?
              <Button value="Adicionar" onPress={() => onAdd(product)} /> : <Button value="Confirmar" onPress={onPress} />}
            <Spacer height={12} />
            <Button value="Cancelar" outline />
          </S.Footer>
        </ScrollView>
      </S.Container>
    </>
  );
};

export default ProductForm;
