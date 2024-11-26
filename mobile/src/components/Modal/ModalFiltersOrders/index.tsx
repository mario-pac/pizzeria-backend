import React, { useEffect, useState } from "react";
import { Modal, View } from "react-native";

import { Gets, Models } from "api/index";

import Input from "components/Input";
import Spacer from "components/Spacer";
import Loading from "components/Loading";
import DateInput from "components/DateInput";
import SelectInput from "components/SelectInput";

import { useMe } from "providers/user";

import { useTheme } from "styled-components/native";
import Title from "../Title";

interface Props {
  showModal: boolean;
  filter: Models.OrderListFilters;
  setFilter: (filter: Models.OrderListFilters) => void;
  closeModal?: () => void;
}

const ModalFiltersOrders: React.FC<Props> = ({
  showModal,
  filter,
  setFilter,
  closeModal,
}) => {
  const theme = useTheme();

  const me = useMe();
  const [statusList, setStatusList] = useState<Models.Status[]>([]);
  const [loading, setLoading] = useState(false);

  const getListStatuses = async () => {
    try {
      setLoading(true);
      const res = (await Gets.listStatus(me.user!.token)).filter(
        (status) => status.id >= 4
      );
      if (res) {
        setStatusList(res);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListStatuses();
  }, []);

  const value =
    statusList.find((st) => st.id === filter.idStatus)?.description ?? "";

  return (
    <View>
      <Modal transparent={true} visible={showModal}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            opacity: 1,
            backgroundColor: "#0000008f",
            padding: 16,
          }}
        >
          <View
            style={{
              backgroundColor: theme.colors.background,
              padding: 20,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Title title="Filtros:" closeModal={closeModal} />
            <Spacer height={6} />
            <Input
              label="Nome Cliente"
              value={filter.customerName}
              onChangeText={(customerName) =>
                setFilter({ ...filter, customerName })
              }
            />
            <Spacer height={6} />
            {loading ? (
              <Loading />
            ) : (
              <SelectInput
                label="Status"
                value={value}
                items={statusList}
                keyOfLabel="description"
                keyOfValue="id"
                onValueChange={(v) => {
                  if (v) {
                    setFilter({ ...filter, idStatus: v });
                  }
                }}
                placeholder="Selecione uma opção..."
              />
            )}
            <Spacer height={6} />
            <DateInput
              date={filter.createdAtInit}
              onDateChange={(createdAtInit) =>
                setFilter({ ...filter, createdAtInit })
              }
              label="Iniciados em"
              width={100}
            />
            <Spacer height={6} />
            <DateInput
              date={filter.createdAtFinal}
              onDateChange={(createdAtFinal) =>
                setFilter({ ...filter, createdAtFinal })
              }
              label="Iniciados até"
              width={100}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalFiltersOrders;
