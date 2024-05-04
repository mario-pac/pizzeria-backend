import React from "react";

import Icon, { IconProps } from "../Icon";

import * as S from "./style";

interface ButtonProps {
  value: string;

  width?: string;
  icon?: IconProps;
  outline?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  iconOnLeft?: boolean;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <S.Container
      width={props.width}
      outline={props.outline}
      onPress={props.onPress}
      enabled={!props.disabled}
    >
      <S.BorderWrapper outline={props.outline}>
        <S.Value outline={props.outline}>{props.value}</S.Value>
        {!!props.icon && (
          <S.IconView onLeft={props.iconOnLeft}>
            <Icon {...props.icon} />
          </S.IconView>
        )}
      </S.BorderWrapper>
    </S.Container>
  );
};

export default Button;
