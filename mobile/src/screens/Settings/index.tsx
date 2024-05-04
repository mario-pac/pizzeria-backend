import React, { useCallback, useEffect, useState } from "react";

import Spacer from "components/Spacer";
import Button from "components/Button";
import Loading from "components/Loading";
import CountInput from "components/CountInput";

import { showToast } from "utils/toast";
import { ScreenBaseProps } from "utils/index";

import * as S from "./styles";
import { Alert } from "react-native";

const Settings: React.FC<ScreenBaseProps<"Settings">> = ({
  navigation,
}) => {

  const [desks, setDesks] = useState(0);
  const [loading, setLoading] = useState(false);

  const getDesks = useCallback(async () => { }, []);

  useEffect(() => {
    getDesks();
  }, [getDesks]);

  const handleSaveDesks = async () => {
    setLoading(true);
    try {
      showToast('success', "Configurações salvas com sucesso!");
      navigation.goBack();
    } catch (error) {
      const msg = (error as Error).message
      showToast('error', msg);
    }
  };

  const onSave = () => {
    Alert.alert('Salvar configurações', `Deseja realmente salvar as configurações?`, [
      { text: "Sim", onPress: handleSaveDesks },
      { text: "Não" },
    ]);
  }

  if (loading) {
    return <Loading overlap />;
  }

  return (
    <S.Container>
      <CountInput
        label="Número de mesas:"
        value={desks.toString()}
        onChangeText={(s) => setDesks(Number(s))}
        textAlign="center"
        keyboardType="numeric"
      />
      <S.Footer>
        <Button value="Salvar alterações" onPress={onSave} />
      </S.Footer>
    </S.Container>
  );
};

export default Settings;
