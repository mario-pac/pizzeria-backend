import React from 'react'
import { Alert, FlatList } from 'react-native'

import ItemListCard from 'components/Cards/ItemListCard'

import { OrderItem } from 'definitions/order_items'

import { showToast } from 'utils/toast'
import { ScreenBaseProps } from 'utils/index'

import * as S from './styles'

const ItemList: React.FC<ScreenBaseProps<'ItemList'>> = () => {
    const itemList: OrderItem[] = [{
        Id: 190,
        Quantity: 2.0,
        OrderId: 2,
        ProductId: 13,
        IdStatus: 1,
        CreatedAt: new Date(),
        UpdatedAt: new Date(),

    }]

    const handleFinalize = async (item: OrderItem) => {
        try {
            //alterar status
            showToast('success', 'Item confirmado com sucesso!')
        } catch (error) {
            const msg = (error as Error).message
            showToast('error', msg)

            return
        }
    }

    const finalizeItem = (item: OrderItem) => {
        if (item.IdStatus === 1) {
            Alert.alert('Confirmar item feito', `Deseja realmente confirmar que o item #${item.Id} está pronto para ser servido?`, [{ text: "Sim", onPress: async () => handleFinalize(item) },
            { text: "Não" },])
        } else {
            Alert.alert('Confirmar entrega', `Deseja realmente confirmar a entrega do item #${item.Id} à mesa?`, [{ text: "Sim", onPress: async () => handleFinalize(item) },
            { text: "Não" },])
        }
    }

    return (
        <S.Container>
            <FlatList
                data={itemList}
                renderItem={({ item, index }) => (
                    <ItemListCard item={item} key={index} onPress={finalizeItem} />
                )}
            />
        </S.Container>
    )
}

export default ItemList