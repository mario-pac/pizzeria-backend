import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { LayoutChangeEvent, TextInput } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppNavigationProps, RootStackParamList } from "../routes/stack";
import { useNavigation, useRoute } from "@react-navigation/native";

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

export function useInterval(callback: fn, delay: number | null) {
  const savedCallback = useRef<fn>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      savedCallback.current!();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

type Dimensions = {
  width: number;
  height: number;
};

export function useComponentSize(): [
  Dimensions | null,
  (e: LayoutChangeEvent) => void
] {
  const [size, setSize] = useState<Dimensions | null>(null);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  }, []);

  return [size, onLayout];
}

export function formatNumber(num: number, casas = 2) {
  return Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: casas,
    minimumFractionDigits: casas,
  }).format(num);
}

export function getBackendUrl() {
  return "https://localhost:5194/api";
}

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

export const formatPrice = (price: number, style: string = 'currency') => {
  if (!price && price != 0) {
    return '';
  }
  let fmt = new Intl.NumberFormat('pt-br', {
    style: style,
    currency: 'BRL',
  });
  return fmt.format(price);
};