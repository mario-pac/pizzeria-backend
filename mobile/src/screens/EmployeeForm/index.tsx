import React, { useState } from "react";
import { Alert, View } from "react-native";

import Input from "components/Input";
import Spacer from "components/Spacer";
import Button from "components/Button";
import SelectInput from "components/SelectInput";

import { showToast } from "utils/toast";
import { ScreenBaseProps } from "utils/index";

import EmployeeHeader from "headers/EmployeeHeader";
import * as S from "./styles";

const EmployeeForm: React.FC<ScreenBaseProps<"EmployeeForm">> = ({
  navigation,
  route,
}) => {
  const [userType, setUserType] = useState("");
  const [loading, setLoading] = useState(false)

  const onPress = () => {
    const title = route.params?.id ? 'ATUALIZAR' : 'SALVAR'
    const subtitle = route.params?.id ? `Deseja atualizar o cadastro do funcionário #${route.params.id}?` : 'Deseja cadastrar o novo funcionário?'
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
        showToast("success", "Funcionário atualizado com sucesso!")
      } else {
        //save
        showToast("success", "Funcionário criado com sucesso!")
      }
      navigation.navigate('Employees')
    } catch (error) {
      const msg = (error as Error).message
      showToast("error", msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <EmployeeHeader onGoBack={navigation.goBack} id={route.params?.id} />
      <S.Container>
        <Input label="Nome Completo" />
        <Spacer height={12} />
        <Input label="Login" />
        <Spacer height={12} />
        <Input label="Senha" />
        <Spacer height={12} />
        <SelectInput
          label="Tipo Usuário"
          value={userType}
          items={[
            { label: "Administrador", value: "ADMSYS" },
            { label: "Funcionário", value: "EMPLOY" },
          ]}
          onValueChange={(v) => {
            if (v) {
              setUserType(v.value);
            }
          }}
          placeholder="Selecione uma opção..."
        />
        <Spacer height={28} />
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}
        >
          <Button value="Salvar" onPress={onPress} />
          <Spacer height={12} />
          <Button value="Cancelar" outline />
        </View>
      </S.Container>
    </>
  );
};

export default EmployeeForm;
