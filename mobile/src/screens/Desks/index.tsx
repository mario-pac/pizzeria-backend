import React, { useCallback, useEffect, useReducer, useState } from "react";

import DeskCard from "components/Cards/DeskCard";
import LoadingPanel from "components/LoadingPanel";

import * as S from "./styles";
import { Gets } from "api/index";
import { useMe } from "providers/user";
import { showToast } from "utils/toast";
import { AxiosError } from "axios";
import { ScreenBaseProps } from "utils/index";

const Desks: React.FC<ScreenBaseProps<"Desks">> = ({ navigation, route }) => {
  const me = useMe();

  const [loading, setLoading] = useState(false);
  const [desks, setDesks] = useState<number[]>([]);
  const [usedDesks, setUsedDesks] = useState<number[]>([]);

  const getDesks = useCallback(async () => {
    try {
      setLoading(true);
      const cfgs = await Gets.getConfigsById(me.user!.token);
      if (cfgs) {
        appendTables(cfgs.numberOfTables);
      }
      if (route.params?.newDesk) {
        const useds = await Gets.listUsedDesks(
          me.user!.token,
          me.user!.idCompany
        );
        if (useds) {
          setUsedDesks(useds);
        }
      }
    } catch (error) {
      showToast(
        "error",
        "Erro ao consultar número de mesas: " +
          (error as AxiosError)?.response?.data
      );
    } finally {
      setLoading(false);
    }
  }, []);

  function appendTables(tablesCount: number) {
    const arr = [];

    for (let i = 1; i <= tablesCount; i++) {
      arr.push(i);
    }

    setDesks(arr);
  }

  useEffect(() => {
    getDesks();
  }, [getDesks]);

  if (loading) return <LoadingPanel loading />;

  return (
    <S.Container>
      {desks.map((item) => (
        <DeskCard
          number={item}
          disabled={usedDesks.includes(item)}
          onPress={(n) =>
            route.params?.newDesk &&
            navigation.navigate("Order", {
              tableNumber: n,
            })
          }
        />
      ))}
    </S.Container>
  );
};

export default Desks;
