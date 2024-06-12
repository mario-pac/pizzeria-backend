import React from "react";

import * as S from "./styles";
import Icon from "components/Icon";

interface Props {
  title: string;
  closeModal?: () => void;
}

const Title: React.FC<Props> = ({ title, closeModal }) => {
  return (
    <S.Row>
      <S.Label>{title}</S.Label>
      <Icon
        right={false}
        name="squared-cross"
        type="entypo"
        size={28}
        onPress={closeModal}
      />
    </S.Row>
  );
};

export default Title;
