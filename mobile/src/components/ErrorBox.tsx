import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface WProps {
  width: string;
}
const Wrapper = styled.View<WProps>`
  border-width: 2px;
  border-style: solid;
  border-color: ${(p) => p.theme.colors.secondary};
  border-radius: 4px;
  background-color: #f66;
  width: ${(p) => p.width};
  padding: 2px 5px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const Text = styled.Text`
  color: ${(p) => p.theme.colors.secondary};
  font-size: ${RFValue(12)}px;
  font-family: "Roboto-Bold";
`;

interface ErrorBoxProps {
  message?: string;
  width?: string;
}
const ErrorBox: React.FC<ErrorBoxProps> = ({ message, width = "100%" }) => {
  if (!message) {
    return null;
  }

  return (
    <Wrapper width={width}>
      <Text>{message}</Text>
    </Wrapper>
  );
};

export default ErrorBox;
