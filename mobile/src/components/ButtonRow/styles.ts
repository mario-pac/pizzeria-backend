import { StyleSheet, TouchableOpacityProps } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface Props extends TouchableOpacityProps {
  isConfirm: boolean;
}

export const OptBtn = styled.TouchableOpacity<Props>`
  width: 40%;

  padding: 5px;

  border-radius: 4px;
  background: ${({ isConfirm, theme, disabled }) =>
    disabled
      ? theme.colors.disabled
      : isConfirm
      ? theme.colors.primary
      : theme.colors.secondary};
`;

export const OptBtnText = styled.Text`
  align-self: center;
  margin: 5px;

  text-align: center;
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Row = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
