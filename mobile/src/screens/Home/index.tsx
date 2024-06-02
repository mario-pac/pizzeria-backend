/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { useCallback, useEffect } from "react";
import { Alert, View } from "react-native";

import Icon from "components/Icon";
import OptionsCard from "components/Cards/OptionsCard";

import HomeHeader from "headers/HomeHeader";

import { useMe } from "providers/user";

import { useTheme } from "styled-components/native";
import { getUser } from "storage/user/getUser";
import { ScreenBaseProps } from "utils/index";
import * as S from "./styles";
import { removeUser } from "storage/user/removeUser";

const Home: React.FC<ScreenBaseProps<"Home">> = ({ navigation }) => {
  const theme = useTheme();

  const { user, setUser } = useMe();

  const gettingUser = useCallback(async () => {
    const us = await getUser();
    if (us) {
      setUser(us);
    }
  }, []);

  useEffect(() => {
    gettingUser();
  }, []);

  const onLogout = () => {
    Alert.alert("SAIR", "Deseja sair da sua conta?", [
      { text: "Sim", onPress: handleLogout },
      { text: "Não" },
    ]);
  };

  const handleLogout = async () => {
    setUser(undefined);
    await removeUser();
    navigation.navigate("Login");
  };

  return (
    <>
      <HomeHeader
        onExit={() => {
          onLogout();
        }}
      />
      <View
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon
          name="pizza-slice"
          type="fontAwesome5"
          size={400}
          right={false}
          disabled
          color={theme.colors.separator}
        />
      </View>
      <S.Container>
        {!!user && user.levelId === 1 ? (
          <>
            {
              //Garçom
            }
            <OptionsCard
              name="Ver Cardápio"
              icon={{ name: "menu-book", type: "material", size: 24 }}
              onPress={() => navigation.navigate("Menu")}
            />
            <OptionsCard
              name="Ver Pedidos"
              icon={{ name: "cards", type: "material-community", size: 24 }}
              onPress={() => navigation.navigate("Orders")}
            />
            <OptionsCard
              name="Ver Lista de Itens prontos"
              icon={{
                name: "silverware-fork-knife",
                type: "material-community",
                size: 24,
              }}
              onPress={() => navigation.navigate("ItemList")}
            />
            <OptionsCard
              name="Novo Pedido"
              icon={{ name: "plus", type: "fontAwesome", size: 24 }}
              onPress={() => navigation.navigate("Desks", { newDesk: true })}
            />
          </>
        ) : !!user && user.levelId === 2 ? (
          <>
            {
              //Chef
            }
            <OptionsCard
              name="Ver Lista de Itens a fazer / em produção"
              icon={{
                name: "silverware-fork-knife",
                type: "material-community",
                size: 24,
              }}
              onPress={() => navigation.navigate("ItemList")}
            />
          </>
        ) : !!user && user.levelId === 3 ? (
          <>
            {
              //Administrador
            }
            <OptionsCard
              name="Ver Funcionários"
              icon={{ name: "group-add", type: "material", size: 24 }}
              onPress={() => navigation.navigate("Employees")}
            />
            <OptionsCard
              name="Ver Produtos"
              icon={{ name: "library-add", type: "material", size: 24 }}
              onPress={() => navigation.navigate("Products")}
            />
            <OptionsCard
              name="Ver Pedidos"
              icon={{ name: "library-add-check", type: "material", size: 24 }}
              onPress={() => navigation.navigate("Orders")}
            />
            <OptionsCard
              name="Configurações"
              icon={{ name: "gears", type: "fontAwesome", size: 24 }}
              onPress={() => navigation.navigate("Settings")}
            />
          </>
        ) : undefined}
      </S.Container>
    </>
  );
};

export default Home;
