import React from "react";
import Icon from "../Icon";

import * as S from "./styles";

interface Props {
  item: boolean;
  setItem: () => void;
  label: string;
  align?: string;
  size?: number;
}

const CheckBox: React.FC<Props> = (props) => {
  return (
    <S.Container alignItems={props.align}>
      <S.Check isActive={props.item} onPress={() => props.setItem()}>
        {props.item && (
          <Icon
            type="feather"
            name="check"
            size={16}
            color={"#fff"}
            disabled
            right={false}
          />
        )}
      </S.Check>
      <S.CheckText size={props.size}>{props.label}</S.CheckText>
    </S.Container>
  );
};

export default CheckBox;
