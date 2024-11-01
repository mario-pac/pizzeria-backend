import React, { useCallback, useEffect, useState } from "react";

import { AxiosError } from "axios";

import DeskCard from "components/Cards/DeskCard";
import LoadingPanel from "components/LoadingPanel";
import ModalConfirmCustomerName from "components/Modal/ModalConfirmCustomerName";

import { Gets } from "api/index";

import { useMe } from "providers/user";

import { showToast } from "utils/toast";
import { ScreenBaseProps } from "utils/index";

import * as S from "./styles";

const Desks: React.FC<ScreenBaseProps<"Desks">> = ({ navigation, route }) => {
  const me = useMe();

  const [loading, setLoading] = useState(false);
  const [desks, setDesks] = useState<number[]>([]);
  const [desk, setDesk] = useState<number>();
  const [usedDesks, setUsedDesks] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);

  const getDesks = useCallback(async () => {
    try {
      setLoading(true);
      const cfgs = await Gets.getConfigByIdCompany(
        me.user!.token,
        me.user!.idCompany
      );
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

  const onError = () => {
    showToast(
      "error",
      "Confira se esse atendimento é seu, olhe na sua tela de Pedidos."
    );
    navigation.navigate("Orders");
  };

  if (loading) return <LoadingPanel loading />;

  const createNewOrder = (clientName: string) => {
    setShowModal(false);
    navigation.navigate("Order", {
      tableNumber: desk ?? 1,
      customerName: clientName,
    });
  };

  return (
    <S.Container>
      <ModalConfirmCustomerName
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        onClose={createNewOrder}
      />
      {desks.map((item) => (
        <DeskCard
          number={item}
          disabled={usedDesks.includes(item)}
          onPress={(n) => {
            if (route.params?.newDesk) {
              setDesk(n);
              setShowModal(true);
            }
          }}
          onError={onError}
          key={item + 90}
        />
      ))}
    </S.Container>
  );
};

export default Desks;
