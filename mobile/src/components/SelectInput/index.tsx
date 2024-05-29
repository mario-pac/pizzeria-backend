import React from "react";

import RNPickerSelect, { Item } from "react-native-picker-select";

import * as S from "./styles";
import { useTheme } from "styled-components/native";
import { View } from "react-native";

interface SelectInputProps<T> {
  value?: string;
  disabled?: boolean;
  label?: string;
  labelSecondary?: boolean;
  width?: number;
  onValueChange: (value: T) => void;
  placeholder?: string;
  items: T[];
  keyOfLabel: keyof T;
  keyOfValue: keyof T;
}

function SelectInput<T>({
  value,
  label,
  disabled,
  labelSecondary,
  width,
  onValueChange,
  placeholder,
  items,
  keyOfLabel,
  keyOfValue
}: SelectInputProps<T>) {
  const theme = useTheme();

  const its: Item[] = []

  for (const item of items) {
    its.push({
      label: item[keyOfLabel] as string,
      value: item[keyOfValue] as string
    })
  }

  return (
    <S.Container width={width}>
      <S.Label secondary={labelSecondary}>{!!label ? label : ""}</S.Label>
      <View
        style={{
          backgroundColor: !disabled
            ? theme.colors.input.backgroundColor
            : theme.colors.disabled,
          borderRadius: 4,
        }}
      >
        <RNPickerSelect
          onValueChange={onValueChange}
          disabled={disabled}
          value={value}
          placeholder={{ label: placeholder }}
          items={its}
          useNativeAndroidPickerStyle={true}
        />
      </View>
    </S.Container>
  );
};

export default SelectInput;
