import React from "react";

import RNPickerSelect from "react-native-picker-select";

import * as S from "./styles";
import { useTheme } from "styled-components/native";
import { View } from "react-native";

interface Item {
  label: string;
  value: string;
}

interface SelectInputProps {
  value?: any;
  disabled?: boolean;
  label?: string;
  labelSecondary?: boolean;
  width?: number;
  onValueChange: (value: any) => void;
  placeholder?: string;
  items: Item[];
}

const SelectInput: React.FC<SelectInputProps> = ({
  value,
  label,
  disabled,
  labelSecondary,
  width,
  onValueChange,
  placeholder,
  items,
}) => {
  const theme = useTheme();
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
          placeholder={placeholder}
          items={items}
        />
      </View>
    </S.Container>
  );
};

export default SelectInput;
