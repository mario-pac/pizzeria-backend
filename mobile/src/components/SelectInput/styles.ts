import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View<{ width?: number }>`
  width: ${(p) => p.width ?? 100}%;
`;

export const Label = styled.Text<{ secondary?: boolean }>`
  width: 100%;
  color: ${({ theme, secondary }) =>
    secondary ? theme.colors.text.secondary : theme.colors.text.primary};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(15)}px;
  text-align: left;
`;
