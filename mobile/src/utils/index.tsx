import { MutableRefObject } from "react";
import { TextInput } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppNavigationProps, RootStackParamList } from "../routes/stack";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getSetting } from "storage/setting/getSetting";

type fn = () => void;

export type ScreenBaseProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

/**
 * Hook customizado que retorna os hooks useNavigation e useRoute da stack
 * @returns as propriedades navigation e route da tela pai
 */
export function useStack() {
  const navigation = useNavigation<AppNavigationProps>();
  const route = useRoute();
  return { navigation, route };
}

export function formatNumber(num: number, casas = 2) {
  return Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: casas,
    minimumFractionDigits: casas,
  }).format(num);
}

export const getBackendUrl = async () => {
  const setting = await getSetting();
  if (!setting?.server) {
    return undefined;
  }
  return `http://${setting?.server}`;
};

/**
 * Avança para o próximo input
 */
export function focusNextInput(
  nextInputRef: MutableRefObject<TextInput | null>
) {
  if (nextInputRef.current) {
    setTimeout(() => nextInputRef.current?.focus(), 250);
  }
}

export function isNumberValid(value: string) {
  // Expressão regular para verificar se a string contém apenas dígitos
  const regex = /^\d+$/;

  const isNumberValid = regex.test(value);
  if (isNumberValid) {
    return parseInt(value);
  } else {
    return value;
  }
}

export const formatPrice = (price: number, style: string = "currency") => {
  if (!price && price != 0) {
    return "";
  }
  let fmt = new Intl.NumberFormat("pt-br", {
    style: style as unknown as undefined,
    currency: "BRL",
  });
  return fmt.format(price);
};
