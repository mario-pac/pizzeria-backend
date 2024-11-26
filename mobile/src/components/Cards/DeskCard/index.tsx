import React from "react";

import { Shadows } from "components/Shadows";

import * as S from "./styles";

interface Props {
  number: number;
  disabled?: boolean;
  onPress?: (number: number) => void;
  onError?: () => void;
}

const DeskCard: React.FC<Props> = ({ number, disabled, onPress, onError }) => {
  return (
    <S.Container
      onPress={() =>
        onPress && !disabled ? onPress(number) : onError && onError()
      }
      active={!disabled}
    >
      <S.Text>{number}</S.Text>
    </S.Container>
  );
};

export default DeskCard;
