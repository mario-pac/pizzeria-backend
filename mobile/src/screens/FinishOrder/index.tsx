import React, { useEffect, useState } from "react";
import { Alert } from "react-native";

import Input from "components/Input";
import Spacer from "components/Spacer";
import Button from "components/Button";
import SelectInput from "components/SelectInput";

import { showToast } from "utils/toast";
import { useCart } from "providers/cart";
import { ScreenBaseProps, formatPrice } from "utils/index";

import * as S from './styles';

const FinishOrder: React.FC<ScreenBaseProps<'FinishOrder'>> = ({ navigation, route }) => {
    const { order, setOrder, cleanCart } = useCart()

    const handleFinalize = async () => {
        try {
            //finalizar
            cleanCart()
            showToast('success', 'Pedido finalizado com sucesso!')
            navigation.replace('Home')
        } catch (error) {
            const msg = (error as Error).message
            showToast("error", msg)
            return
        }
    }

    const onFinish = () => {
        if (order?.id) {
            Alert.alert('Finalizar', `Deseja realmente finalizar o pedido #${order.id} e enviar para pagamento?`, [{ text: "Sim", onPress: async () => handleFinalize() },
            { text: "Não" },])
        }
    }

    const disabled = !order?.payment_method?.length

    return (
        <S.Container>
            <Input label="Valor total do pedido" disabled value={order?.total_value ? formatPrice(order?.total_value) : ''} />
            <Spacer height={12} />
            <SelectInput
                label="Forma de pagamento"
                value={order?.payment_method}
                items={[
                    { label: "Crédito a vista", value: "credit" },
                    { label: "Débito a vista", value: "debit" },
                    { label: "Dinheiro a vista", value: "cash" },
                ]}
                onValueChange={(v) => {
                    if (v) {
                        setOrder({ ...order!, payment_method: v });
                        return
                    }
                    setOrder({ ...order!, payment_method: '' });
                }}
                placeholder="Selecione uma opção..."
            />
            <S.Footer>
                <Button value='Confirmar Finalização' onPress={onFinish} disabled={disabled} />
                <Spacer height={16} />
                <Button value='Cancelar' outline />
            </S.Footer>
        </S.Container>
    )
}

export default FinishOrder