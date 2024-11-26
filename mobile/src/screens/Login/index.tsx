/* eslint-disable jsx-a11y/alt-text */
import React, { useRef, useState } from "react";
import { TextInput, View } from "react-native";

import Icon from "components/Icon";
import Input from "components/Input";
import Button from "components/Button";
import Spacer from "components/Spacer";
import Version from "components/Version";
import InputPassword from "components/InputPassword";

import { focusNextInput, ScreenBaseProps } from "utils/index";
import { useTheme } from "styled-components/native";
import { showToast } from "utils/toast";
import { Gets, Posts } from "api/index";
import { addUser } from "storage/user/addUser";
import * as S from "./styles";
import { addCompany } from "storage/company/addCompany";

type Props = ScreenBaseProps<"Login">;

const Login: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();

  const passRef = useRef<TextInput>(null);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    setLoading(true);
    try {
      const resp = await Posts.handleLogin(login, password);
      await addUser(resp.user);
      const company = await Gets.companyById(
        resp.user.token,
        resp.user.idCompany
      );
      await addCompany(company);
      showToast("success", resp.message);
      navigation.replace("Home");
    } catch (error) {
      showToast("error", error as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Container>
      <S.Header>
        <View style={{ position: "absolute" }}>
          <Icon
            name="pizza-slice"
            type="fontAwesome5"
            size={120}
            right={false}
            color={theme.colors.card}
          />
          <S.HeaderText>Pizzeria APP</S.HeaderText>
        </View>
      </S.Header>
      <S.Content>
        <S.GreetingText>Acessar sistema</S.GreetingText>
        <S.LabelText>Insira as informações abaixo para acessar.</S.LabelText>
        <Spacer height={24} />
        <Input
          placeholder="Usuário"
          value={login}
          onChangeText={setLogin}
          autoCapitalize="none"
          autoFocus
          onSubmitEditing={() => focusNextInput(passRef)}
        />
        <Spacer height={16} />
        <InputPassword
          placeholder="Senha"
          ref={passRef}
          value={password}
          autoCapitalize="none"
          onChangeText={setPassword}
          onSubmitEditing={() => {
            return;
          }}
        />
        <Spacer height={10} />
        <Button
          value="Login"
          onPress={() => {
            onLogin();
          }}
          disabled={loading}
        />
        <Spacer height={10} />
        <Button
          value="Configurações"
          outline
          iconOnLeft
          icon={{
            name: "setting",
            size: 24,
            type: "antdesign",
            right: false,
          }}
          onPress={() => navigation.navigate("HomeSetting")}
        />
        <Version />
      </S.Content>
    </S.Container>
  );
};

export default Login;
