import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled(RectButton).attrs({
  shadowColor: "#000",
  shadowOffset: {
    width: -2,
    height: 4,
  },
  shadowOpacity: 0.36,
  shadowRadius: 1.0,

  elevation: 6,
})`
  width: 98.9%;
  margin-left: 2px;
  padding: 15px 8px;
  background-color: ${(p) => p.theme.colors.card};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
`;

export const Name = styled.Text`
  margin-left: 8px;
  font-family: ${(p) => p.theme.fonts.medium};
  font-size: ${RFValue(20)}px;
  line-height: ${RFValue(26)}px;
  color: ${(p) => p.theme.colors.text.primary};
`;
