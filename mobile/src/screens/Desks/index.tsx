import React, { useCallback, useEffect, useState } from "react";

import {  LogBox } from "react-native";

import DeskCard from "components/Cards/DeskCard";

import * as S from "./styles";

const Desks: React.FC = () => {
  LogBox.ignoreAllLogs();
  const [deskNumber, setDeskNumber] = useState(0);
  const desks: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
  ];

  const getDesks = useCallback(async () => {}, []);

  useEffect(() => {
    getDesks();
  }, [getDesks]);

  useEffect(() => {
    if (deskNumber) {
      for (let i = 1; i <= deskNumber; i++) {
        desks.push(i);
      }
    }
  }, [deskNumber]);

  return (
    <S.Container>
      {desks.map((item) => (
        <DeskCard number={item} />
      ))}
    </S.Container>
  );
};

export default Desks;
