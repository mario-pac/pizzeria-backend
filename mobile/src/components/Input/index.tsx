import React from "react";
import { TextInput, TextInputProps } from "react-native";
import { useTheme } from "styled-components/native";

import Icon, { IconProps } from "../Icon";

import * as S from "./styles";

export interface InputProps extends TextInputProps {
  label?: string;
  secondaryLabel?: boolean;
  value?: string;
  footer?: string;
  iconDisabled?: boolean;
  disabled?: boolean;
  footerColor?: string;
  borderRadius?: number;
  icon?: IconProps;
  observation?: boolean;
  width?: number;
}

const getIcon = (props: IconProps, disabled?: boolean) => {
  return (
    <Icon
      type={props.type}
      name={props.name}
      size={props.size}
      onPress={props.onPress}
      color={props.color}
      right
      disabled={props.disabled || disabled}
      inputDate={props.inputDate}
    />
  );
};

const Input = React.forwardRef(function RenderInput(
  props: InputProps,
  ref: React.ForwardedRef<TextInput>
) {
  const theme = useTheme();

  const icon = !!props.icon ? getIcon(props.icon, props.iconDisabled) : null;

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
          paddingRight={!!props.icon ? props.icon.size + 15 : 6}
          editable={!props.disabled}
          selectTextOnFocus={!props.disabled}
          disabled={props.disabled}
          value={props.value}
          observation={props.observation}
          {...props}
        />
        {icon}
      </S.TextInputWrapper>
      {!!props.footer && (
        <S.Footer color={props.footerColor}>{props.footer}</S.Footer>
      )}
    </S.Container>
  );
});

export default Input;
