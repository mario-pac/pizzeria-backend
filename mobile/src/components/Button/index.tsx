import React from "react";

import Icon, { IconProps } from "../Icon";

import * as S from "./style";
import { useTheme } from "styled-components/native";

interface ButtonProps {
  value: string;

  width?: string;
  icon?: IconProps;
  outline?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  iconOnLeft?: boolean;
  color?: string;
}

const Button: React.FC<ButtonProps> = (props) => {
  const theme = useTheme();
  return (
    <S.Container
      width={props.width}
      outline={props.outline}
      onPress={props.onPress}
      enabled={!props.disabled}
      color={props.color}
    >
      <S.BorderWrapper outline={props.outline} color={props.color}>
        <S.Value outline={props.outline}>{props.value}</S.Value>
        {!!props.icon && (
          <S.IconView onLeft={props.iconOnLeft}>
            <Icon
              {...props.icon}
              right={false}
              color={
                props.outline
                  ? theme.colors.button.primary
                  : theme.colors.text.primary
              }
            />
          </S.IconView>
        )}
      </S.BorderWrapper>
    </S.Container>
  );
};

export default Button;
