import React, { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

import { AxiosError } from "axios";

import Button from "components/Button";
import Loading from "components/Loading";
import CountInput from "components/CountInput";

import { showToast } from "utils/toast";
import { ScreenBaseProps } from "utils/index";

import { useMe } from "providers/user";

import * as S from "./styles";
import { Gets } from "api/index";

const Settings: React.FC<ScreenBaseProps<"Settings">> = ({ navigation }) => {
  const me = useMe();

  const [desks, setDesks] = useState(0);
  const [loading, setLoading] = useState(false);

  const getDesks = useCallback(async () => {
    try {
      setLoading(true);
      const cfgs = await Gets.getConfigByIdCompany(
        me.user!.token,
        me.user!.idCompany
      );
      if (cfgs) {
        setDesks(cfgs.numberOfTables);
      }
    } catch (error) {
      showToast(
        "error",
        "Erro ao consultar número de mesas: " +
          (error as AxiosError)?.response?.data
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getDesks();
  }, [getDesks]);

  const handleSaveDesks = async () => {
    try {
      showToast("success", "Configurações salvas com sucesso!");
      navigation.goBack();
    } catch (error) {
      const msg = (error as Error).message;
      showToast("error", msg);
    }
  };

  const onSave = () => {
    Alert.alert(
      "Salvar configurações",
      `Deseja realmente salvar as configurações?`,
      [{ text: "Sim", onPress: handleSaveDesks }, { text: "Não" }]
    );
  };

  if (loading) {
    return <Loading overlap />;
  }

  return (
    <S.Container>
      <CountInput
        label="Número de mesas:"
        value={desks?.toString()}
        onChangeText={(s) => setDesks(Number(s))}
        textAlign="center"
        keyboardType="numeric"
      />
      <S.Footer>
        <Button value="Salvar alterações" onPress={onSave} width="100%" />
      </S.Footer>
    </S.Container>
  );
};

export default Settings;
