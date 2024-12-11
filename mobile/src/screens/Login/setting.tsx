import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";

import Input from "components/Input";
import Spacer from "components/Spacer";
import { useForm } from "react-hook-form";
import { showToast } from "utils/toast";
import LoadingPanel from "components/LoadingPanel";
import Button from "components/Button";
import { addSetting } from "storage/setting/addSetting";
import { ScreenBaseProps } from "utils/index";
import { getSetting } from "storage/setting/getSetting";

interface Form {
  server?: string;
}

const HomeSetting: React.FC<ScreenBaseProps<"HomeSetting">> = ({
  navigation,
}) => {
  const [loading, setLoading] = useState(false);

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const setting = await getSetting();
      if (setting?.server) {
        form.setValue("server", setting.server);
      }
    } catch (error) {
      showToast(
        "error",
        "Erro ao buscar servidor cadastrado: " + (error as Error).message
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const form = useForm<Form>();

  const handleSalvar = async () => {
    try {
      setLoading(true);
      const server = form.watch("server");

      if (server) {
        await addSetting({
          server,
        });
      }

      showToast("success", "Alterações salvas com sucesso!");
      navigation.goBack();
    } catch (error) {
      showToast(
        "error",
        "Erro ao salvar os dados: " + (error as Error).message
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingPanel loading />;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Input
        label="Servidor"
        value={form.watch("server")}
        placeholder="192.168.1.3"
        onChangeText={(s) => form.setValue("server", s)}
      />
      <Spacer height={20} />
      <Button value="Salvar" onPress={handleSalvar} />
    </View>
  );
};

export default HomeSetting;
