import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 24px;
  padding-top: 50px;
  align-items: center;
  gap: 20px;
`;

export const Header = styled.View`
  width: 100%;
  margin-top: 124px;
  flex-direction: row;
`;

export const HeaderText = styled.Text<{ secondary?: boolean }>`
  margin-left: 24px;
  width: 100%;
  text-align: center;
  font-family: ${(p) => p.theme.fonts.bold};
  font-size: ${RFValue(30)}px;
  line-height: ${RFValue(34)}px;
  color: ${(p) =>
    p.secondary ? p.theme.colors.secondary : p.theme.colors.primary};
`;

export const Title = styled.Text`
  font-family: ${(p) => p.theme.fonts.semibold};
  font-size: ${RFValue(24)}px;
  line-height: ${RFValue(28)}px;
  color: ${(p) => p.theme.colors.text.secondary};
  text-align: center;
`;

export const User = styled.Text<{ semibold?: boolean }>`
  font-family: ${(p) =>
    p.semibold ? p.theme.fonts.semibold : p.theme.fonts.medium};
  font-size: ${RFValue(15)}px;
  line-height: ${RFValue(24)}px;
  color: ${(p) => p.theme.colors.text.secondary};
`;
