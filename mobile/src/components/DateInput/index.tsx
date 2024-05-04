/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState } from "react";

import Toast from "react-native-root-toast";

import Input from "../Input";

import { useTheme } from "styled-components/native";
import * as S from "./styles";

interface Props {
  date?: Date;
  label?: string;
  secondaryLabel?: boolean;
  secondaryIcon?: boolean;
  showDatePicker?: boolean;
  onDateChange: (newDate: Date | undefined) => void;
  onClick?: () => void;
  minimumDate?: Date;
  maximumDate?: Date;
  disabled?: boolean;
  width?: number;
}

const DateInput: React.FC<Props> = ({
  label,
  secondaryLabel,
  date,
  onDateChange,
  showDatePicker,
  secondaryIcon,
  onClick,
  maximumDate,
  minimumDate,
  disabled,
  width,
}) => {
  const theme = useTheme();
  const [strDate, setStrDate] = useState(
    date?.toLocaleString("pt-BR", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    })
  );

  useEffect(() => {
    regexDate(setStrDate, strDate);
  }, [strDate]);

  function regexDate(setStr: (s: string) => void, str?: string) {
    if (!!str) {
      const formattedDate = str.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
      setStr(formattedDate);
    }
  }

  function stringToDate(dateString: string) {
    let [day, month, year] = dateString.split("/");
    day = String(Number(day) + 1);
    return new Date(`${year}-${month}-${day}`);
  }

  function setDate(v?: Date) {
    if (!!v) {
      if (isNaN(Date.parse(v.toDateString()))) {
        Toast.show("Data inválida!", {
          backgroundColor: theme.colors.secondary,
        });
        setStrDate("");
      } else {
        onDateChange(new Date(v));
        setStrDate(
          v.toLocaleString("pt-BR", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
          })
        );
      }
    } else {
      onDateChange(v);
    }
  }
  return (
    <S.Container width={width}>
      <Input
        label={label}
        value={strDate}
        onChangeText={setStrDate}
        secondaryLabel={secondaryLabel}
        icon={{
          type: "entypo",
          name: "calendar",
          size: 16,
          color: disabled
            ? theme.colors.disabled
            : secondaryIcon
            ? theme.colors.text.secondary
            : theme.colors.primary,
          onPress: onClick,
          disabled,
        }}
        onSubmitEditing={
          !!strDate
            ? () => setDate(new Date(stringToDate(strDate)))
            : () => setDate(undefined)
        }
        maxLength={10}
        keyboardType="phone-pad"
        disabled={disabled}
      />
      {showDatePicker && (
        <S.Picker
          value={!!date ? date : new Date()}
          mode="date"
          display="calendar"
          onChange={(_event, newDate) => {
            onDateChange(newDate);
            if (!!newDate) {
              setDate(newDate);
            }
          }}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}
    </S.Container>
  );
};

export default DateInput;
