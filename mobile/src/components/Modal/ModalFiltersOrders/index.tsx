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
  const [status, setStatus] = useState<Models.Status>();
  const [loading, setLoading] = useState(false);

  const getEmployeeLevels = async () => {
    try {
      setLoading(true);
      const res = await Gets.listStatus(me.user!.token);
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
    getEmployeeLevels();
  }, []);

  if (loading) {
    return <Loading overlap />;
  }

  return (
    <View>
      <Modal transparent={true} visible={showModal}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            opacity: 0.4,
            backgroundColor: "#242424",
          }}
        >
          <View
            style={{
              backgroundColor: theme.colors.background,
              padding: 20,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
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
            <SelectInput<Models.Status>
              label="Status"
              value={status?.description}
              items={statusList}
              keyOfLabel="description"
              keyOfValue="id"
              onValueChange={(v) => {
                if (v) {
                  setFilter({ ...filter, idStatus: v.id });
                  setStatus(v);
                }
              }}
              placeholder="Selecione uma opção..."
            />
            <Spacer height={6} />
            <DateInput
              date={filter.createdAtInit}
              onDateChange={(createdAtInit) =>
                setFilter({ ...filter, createdAtInit })
              }
              label="Iniciados em"
            />
            <Spacer height={6} />
            <DateInput
              date={filter.createdAtFinal}
              onDateChange={(createdAtFinal) =>
                setFilter({ ...filter, createdAtFinal })
              }
              label="Iniciados até"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalFiltersOrders;
