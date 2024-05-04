import React from "react";

import { EdgeInsets } from "react-native-safe-area-context";
import { BorderlessButton } from "react-native-gesture-handler";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

import Icon from "../Icon";

import * as S from "./styles";

const createHeader = (insets: EdgeInsets) => {
  return ({ options, navigation }: NativeStackHeaderProps) => {
    return (
      <S.Container insetTop={insets.top}>
        <BorderlessButton
          style={{ marginRight: 8 }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon
            type="feather"
            name="arrow-left"
            size={30}
            right={false}
            color={options.headerTintColor}
          />
        </BorderlessButton>
        <S.Text>{options.headerTitle?.toString()}</S.Text>
      </S.Container>
    );
  };
};

export default createHeader;
