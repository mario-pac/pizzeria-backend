import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { useForm } from 'react-hook-form'

import Input from "components/Input";
import Spacer from "components/Spacer";
import Button from "components/Button";
import Loading from "components/Loading";
import SelectInput from "components/SelectInput";
import InputPassword from "components/InputPassword";

import { useMe } from "providers/user";
import { showToast } from "utils/toast";
import { Gets, Models } from "api/index";
import { ScreenBaseProps } from "utils/index";

import EmployeeHeader from "headers/EmployeeHeader";
import * as S from "./styles";

const EmployeeForm: React.FC<ScreenBaseProps<"EmployeeForm">> = ({
  navigation,
  route,
}) => {
  const me = useMe()

  const form = useForm<Models.EmployeeResponse>()

  const [loading, setLoading] = useState(false)
  const [novaSenha, setNovaSenha] = useState("")

  const [employeeLevels, setEmployeeLevels] = useState<Models.EmployeeLevel[]>([])

  const getEmployeeById = async (id: number) => {
    try {
      setLoading(true)
      const res = await Gets.employeeById(me.user!.token, id)
      if (res) {
        setFormValues(res)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (route.params?.id) {
      getEmployeeById(route.params.id)
    }
  }, [route.params])

  const setFormValues = (value: Models.EmployeeResponse) => {
    form.setValue('employeeLevel', value.employeeLevel);
    form.setValue('self', value.self);
  }

  const getEmployeeLevels = async () => {
    try {
      setLoading(true)
      const res = await Gets.listEmployeeLevels(me.user!.token, 1)
      if (res) {
        setEmployeeLevels(res)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getEmployeeLevels()
  }, [])

  const onPress = () => {
    const title = route.params?.id ? 'ATUALIZAR' : 'SALVAR'
    const subtitle = route.params?.id ? `Deseja atualizar o cadastro do funcionário #${route.params.id}?` : 'Deseja cadastrar o novo funcionário?'
    Alert.alert(title, subtitle, [
      { text: "Sim", onPress: handleConfirm },
      { text: "Não" },
    ]);
  }

  const onCancel = () => {
    const title = "Aviso"
    const subtitle = "Deseja realmente cancelar o envio do formulário de funcionário?"
    Alert.alert(title, subtitle, [
      {
        text: "Sim", onPress: () => {
          showToast('success', 'Cancelado com sucesso.')
          navigation.goBack();
        }
      },
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

  const employeeLevel = form.watch('employeeLevel')
  const nomeCompleto = form.watch('self.name')
  const login = form.watch('self.username')
  const senha = form.watch('self.password')

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <EmployeeHeader onGoBack={navigation.goBack} id={route.params?.id} />
      <S.Container>
        <Input label="Nome Completo" value={nomeCompleto} onChangeText={(s) => form.setValue('self.name', s)} />
        <Spacer height={12} />
        <Input label="Login" value={login} onChangeText={(s) => form.setValue('self.username', s)} />
        <Spacer height={12} />
        {route.params?.id
          ?
          <InputPassword label="Senha" value={senha} onChangeText={(s) => form.setValue('self.password', s)} />
          :
          <InputPassword label="Senha" value={novaSenha} onChangeText={setNovaSenha} />
        }
        <Spacer height={12} />
        <SelectInput
          label="Tipo Usuário"
          value={employeeLevel?.description}
          items={employeeLevels}
          keyOfLabel="description"
          keyOfValue="id"
          onValueChange={(v) => {
            if (v) {
              form.setValue('self.levelId', v.id)
              form.setValue('employeeLevel', v)
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
          <Button value="Cancelar" outline onPress={onCancel} />
        </View>
      </S.Container>
    </>
  );
};

export default EmployeeForm;
