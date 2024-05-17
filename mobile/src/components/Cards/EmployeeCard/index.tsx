import React from "react";
import { View } from "react-native";

import Icon from "components/Icon";
import { Shadows } from "components/Shadows";

import { useTheme } from "styled-components/native";

import * as S from "./styles";
import { Employee } from "api/models";

type Props = {
  employee: Employee;
  onPress?: () => void;
};

const EmployeeCard: React.FC<Props> = ({ employee, onPress }) => {
  const theme = useTheme();

  return (
    <Shadows>
      <S.Container onPress={onPress}>
        <View
          style={{
            width: 90,
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.colors.primary,
          }}
        >
          <Icon
            name="user"
            type="feather"
            size={50}
            right={false}
            color={theme.colors.card}
            disabled
          />
        </View>
        <S.Content>
          <S.Title numberOfLines={1} ellipsizeMode="tail">
            {employee.id} - {employee.name}
          </S.Title>
          <S.Subtitle bold>
            Login: <S.Subtitle>{employee.username}</S.Subtitle>
          </S.Subtitle>
          <S.Subtitle bold>
            Tipo Usuário:{" "}
            <S.Subtitle>
              {employee.levelId === 2
                ? "Administrador"
                : employee.levelId === 1
                  ? "Cozinheiro"
                  : "Garçom"}
            </S.Subtitle>
          </S.Subtitle>
        </S.Content>
      </S.Container>
    </Shadows>
  );
};

export default EmployeeCard;
