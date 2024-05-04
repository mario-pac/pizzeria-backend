import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  width: 100%;
  flex: 1;
  padding: 56px;
  align-items: center;
  justify-content: center;
`;

export const HeaderText = styled.Text`
  font-family: ${(p) => p.theme.fonts.bold};
  font-size: ${RFValue(30)}px;
  line-height: ${RFValue(40)}px;
  color: ${(p) => p.theme.colors.card};
  margin-top: 16px;
`;

export const Content = styled.ScrollView`
  width: 100%;
  flex: 1;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  background-color: ${(p) => p.theme.colors.primary};
  padding: 28px 26px;
`;

export const GreetingText = styled.Text`
  font-family: ${(p) => p.theme.fonts.semibold};
  font-size: ${RFValue(20)}px;
  line-height: ${RFValue(24)}px;
  color: ${(p) => p.theme.colors.text.primary};
`;

export const LabelText = styled.Text`
  width: 75%;
  margin-top: 8px;
  font-family: ${(p) => p.theme.fonts.medium};
  font-size: ${RFValue(15)}px;
  line-height: ${RFValue(19)}px;
  color: ${(p) => p.theme.colors.text.primary};
`;
