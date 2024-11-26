import "react-native-url-polyfill/auto";

import React from "react";

import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import "intl";
import "intl/locale-data/jsonp/pt-BR";

import { theme } from "styles/theme";

import { StackRoutes } from "routes/stack.routes";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import LoadingPanel from "components/LoadingPanel";
import ErrorPage from "components/ErrorPage";
import { CartProvider } from "providers/cart";
import { UserProvider } from "providers/user";
import { ConfigProvider } from "providers/config";
import { log } from "./log";

export default function App() {
  const [fontsLoaded, err] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (err) {
    log.error(err);
    return (
      <ThemeProvider theme={theme}>
        <ErrorPage message={err.message} />
      </ThemeProvider>
    );
  }

  if (!fontsLoaded) {
    return (
      <ThemeProvider theme={theme}>
        <LoadingPanel loading />
      </ThemeProvider>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <StatusBar style="light" backgroundColor="transparent" />
        <SafeAreaProvider>
          <ConfigProvider>
            <UserProvider>
              <CartProvider>
                <NavigationContainer>
                  <StackRoutes />
                </NavigationContainer>
              </CartProvider>
            </UserProvider>
          </ConfigProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
