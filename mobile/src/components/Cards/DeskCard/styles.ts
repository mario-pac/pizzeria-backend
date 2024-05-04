import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled(RectButton)<{ active?: boolean }>`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.status.active : theme.colors.disabled};
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  font-family: ${({ theme }) => theme.fonts.semibold};
  font-size: ${RFValue(20)}px;
  line-height: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;
