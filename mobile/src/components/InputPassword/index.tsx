import React, { useState } from "react";
import { TextInput } from "react-native";

import { IconProps } from "../Icon";
import Input, { InputProps } from "../Input";

import * as S from "./styles";

const InputPassword = React.forwardRef(function RenderPassInput(
  { ...rest }: InputProps,
  ref: React.ForwardedRef<TextInput>
) {
  const [hidePass, setHidePass] = useState(true);

  const getShowIcon = () => {
    const iconProps: IconProps = {
      type: "feather",
      name: "eye",
      size: 20,
      onPress: () => setHidePass(false),
    };

    return iconProps;
  };

  const getHideIcon = () => {
    const iconProps: IconProps = {
      type: "feather",
      name: "eye-off",
      size: 20,
      onPress: () => setHidePass(true),
    };

    return iconProps;
  };

  return (
    <S.Container>
      <Input
        secureTextEntry={hidePass}
        icon={hidePass ? getShowIcon() : getHideIcon()}
        ref={ref}
        {...rest}
      />
    </S.Container>
  );
});

export default InputPassword;
