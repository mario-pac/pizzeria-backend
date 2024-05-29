import React, { useCallback, useState } from "react";
import { Alert, ScrollView } from "react-native";

import Input from "components/Input";
import Spacer from "components/Spacer";
import Button from "components/Button";
import CountInput from "components/CountInput";
import SelectInput from "components/SelectInput";

import { Gets, Models } from "api/index";
import { ScreenBaseProps } from "utils/index";

import ProductHeader from "headers/ProductHeader";
import { showToast } from "utils/toast";
import { useCart } from "providers/cart";
import * as S from "./styles";
import { useFocusEffect } from "@react-navigation/native";
import { useMe } from "providers/user";
import { useForm } from "react-hook-form";
import LoadingPanel from "components/LoadingPanel";

const ProductForm: React.FC<ScreenBaseProps<"ProductForm">> = ({
  navigation,
  route,
}) => {
  const { addToCart } = useCart()
  const me = useMe();

  const form = useForm<Models.Product>()
  
  const [quantity, setQuantity] = useState('0')
  const [loading, setLoading] = useState(false)

  const callback = useCallback(async () => {
    try {
      const id = route.params?.id
    if(id && me.user?.token){
      const prod = await Gets.productById(me.user.token, id)
      if(prod) {
        setFormValues(prod)
      }
    }
    } catch (error) {
      showToast('error', 'Erro ao buscar produto: '+(error as Error).message)
    }
  }, [route.params])

  const setFormValues = (prod: Models.Product) => {
    const keys = Object.keys(prod);
    for (const key of keys) {
      form.setValue(key as keyof Models.Product, prod[key as keyof Models.Product])
    }
  }

  useFocusEffect(useCallback(() => {
    callback()
  }, [callback]))

  const notToList = route.params?.notToList ?? false

  const onAdd = (item: Models.Product) => {
    Alert.alert('Adicionar ao carrinho', `Deseja adicionar o produto #${item.id} ao carrinho?`, [
      { text: "Sim", onPress: () => handleAdd(item) },
      { text: "Não" },
    ]);
  }

  const handleAdd = (item: Models.Product) => {
    const orderItem: Models.OrderItem = {
      ...item,
      idStatus: 0,
      quantity: Number(quantity),
      id: 0
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

  const product = form.watch()
  const category = form.watch('category')

  if (loading) return <LoadingPanel loading/>

  return (
    <>
      <ProductHeader onGoBack={navigation.goBack} id={route.params?.id} />
      <S.Container>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <Input label="Nome do Produto" disabled={notToList} />
          <Spacer height={12} />
          <SelectInput<Models.ProductCategory>
            label="Categoria"
            keyOfLabel={"value"}
            keyOfValue={"id"}
            value={category}
            items={[
              
            ]}
            onValueChange={(v) => {
              if (v) {
                form.setValue('category', v.value);
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
