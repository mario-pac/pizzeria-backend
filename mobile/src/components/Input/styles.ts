import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View<{ width?: number }>`
  width: ${({ width }) => width ?? 100}%;
`;

export const Label = styled.Text<{ secondary?: boolean }>`
  width: 100%;
  color: ${({ theme, secondary }) =>
    secondary ? theme.colors.text.secondary : theme.colors.text.primary};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(15)}px;
  text-align: left;
`;

interface ContentProps {
  paddingRight: number;
  disabled?: boolean;
  borderRadius?: number;
  observation?: boolean;
}

export const TextInputWrapper = styled.View`
  position: relative;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const TextInput = styled.TextInput.attrs({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
})<ContentProps>`
  width: 100%;
  height: ${({ observation }) => (observation ? 67 : 46)}px;

  border-radius: ${({ borderRadius }) => borderRadius ?? 4}px;
  padding-left: 6px;
  padding-right: ${({ paddingRight }) => paddingRight}px;

  background: ${({ theme, disabled }) =>
    disabled
      ? theme.colors.input.disabled
      : theme.colors.input.backgroundColor};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(13)}px;
  color: ${({ theme }) => theme.colors.input.text};
`;

interface FooterProps {
  color?: string;
}

export const Footer = styled.Text<FooterProps>`
  width: 100%;

  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ color, theme }) => color ?? theme.colors.text.secondary};
`;
