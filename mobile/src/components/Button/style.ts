import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

interface Props {
  width?: string;
  outline?: boolean;
  disabled?: boolean;
  color?: string;
}

export const Container = styled(RectButton).attrs({
  elevation: 3,
  shadowOffset: { width: -2, height: 4 },
  shadowOpacity: 0.2,
  shadowColor: "#171717",
})<Props>`
  width: ${({ width }) => width ?? "100%"};
  height: 45px;

  align-items: center;
  justify-content: center;

  border-radius: 4px;
  background: ${({ theme, outline, enabled, color }) =>
    outline
      ? "transparent"
      : color ?? enabled
      ? theme.colors.button.primary
      : theme.colors.disabled};
`;

export const BorderWrapper = styled.View<Props>`
  flex: 1;
  width: 100%;
  position: relative;

  align-items: center;
  justify-content: center;

  border-radius: 4px;
  border: ${({ theme, outline, color }) =>
    outline ? `2px solid ${color ?? theme.colors.button.primary}` : "none"};
`;

export const Value = styled.Text<Props>`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme, outline }) =>
    outline ? theme.colors.button.primary : theme.colors.text.primary};
`;

interface IconProps {
  onLeft?: boolean;
}

export const IconView = styled.View<IconProps>`
  ${({ onLeft }) => (onLeft ? "left: 36px;" : "right: 15px;")}
  position: absolute;
`;
