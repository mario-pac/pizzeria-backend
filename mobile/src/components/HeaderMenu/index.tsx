/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Text, View } from "react-native";

import { RFValue } from "react-native-responsive-fontsize";
import { Menu, MenuItem } from "react-native-material-menu";

import Icon from "../Icon";

import { useTheme } from "styled-components/native";

export type Item = {
  label: string;
  onPress?: () => void;
};

type Props = {
  items: Item[];
  size?: number;
};

const HeaderMenu: React.FC<Props> = ({ items, size }) => {
  const theme = useTheme();

  const [visible, setVisible] = useState(false);
  const [subVisible, setSubVisible] = useState(false);

  const showSubMenu = () => setSubVisible(true);

  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  const executeClick = (onPress: () => void) => {
    hideMenu();
    onPress();
  };

  return (
    <Menu
      visible={visible}
      style={{
        backgroundColor: theme.colors.card,
      }}
      anchor={
        <Icon
          type="material-community"
          name="dots-vertical"
          right={false}
          size={!!size ? size : 30}
          color={theme.colors.text.secondary}
          onPress={showMenu}
        />
      }
      onRequestClose={hideMenu}
    >
      {items.map((item, idx) => (
        <MenuItem
          key={idx}
          textStyle={{
            fontSize: RFValue(13),
            fontFamily: theme.fonts.medium,
            color: theme.colors.text.secondary,
          }}
          onPress={
            !!item.onPress
              ? () => executeClick(item.onPress!)
              : () => showSubMenu()
          }
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: RFValue(13),
                fontFamily: theme.fonts.medium,
                color: theme.colors.text.secondary,
              }}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {item.label}
            </Text>
          </View>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default HeaderMenu;
