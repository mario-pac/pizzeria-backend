import React from "react";
import { TextInput, TextInputProps } from "react-native";
import { useTheme } from "styled-components/native";

import Icon, { IconProps } from "../Icon";

import * as S from "./styles";

export interface InputProps extends TextInputProps {
  label?: string;
  secondaryLabel?: boolean;
  value?: string;
  disabled?: boolean;
  borderRadius?: number;
  width?: number;
}

const CountInput = React.forwardRef(function RenderInput(
  props: InputProps,
  ref: React.ForwardedRef<TextInput>
) {
  const theme = useTheme();

  const disableMinus = Number(props.value) <= 0

  const size = 30

  const onAdd = () => {
    if (props.value) {

      props.onChangeText!((Number(props.value) + 1).toString())
    } else {
      props.onChangeText!('1')
    }
  }

  const onRemove = () => {
    if (props.value) {
      props.onChangeText!((Number(props.value) - 1).toString())
    } else {
      props.onChangeText!('1')
    }
  }

  return (
    <S.Container removeClippedSubviews={true} width={props.width}>
      {!!props.label && (
        <S.Label secondary={props.secondaryLabel}>{props.label}</S.Label>
      )}
      <S.TextInputWrapper>
        <S.TextInput
          ref={ref}
          contextMenuHidden={true}
          borderRadius={props.borderRadius}
          cursorColor={theme.colors.primary}
          placeholderTextColor={theme.colors.input.placeholder}
          editable={!props.disabled}
          selectTextOnFocus={!props.disabled}
          disabled={props.disabled}
          value={props.value}
          {...props}
        />
        <S.IconWrapper position="left">
          <Icon right={false} name="minus" type="antdesign" size={size} onPress={onRemove} color={disableMinus ? theme.colors.disabled : theme.colors.text.primary} disabled={disableMinus} />
        </S.IconWrapper>
        <S.IconWrapper position="right">
          <Icon right={false} name="plus" type="antdesign" size={size} onPress={onAdd} color={theme.colors.text.primary} />
        </S.IconWrapper>
      </S.TextInputWrapper>
    </S.Container>
  );
});

export default CountInput;
