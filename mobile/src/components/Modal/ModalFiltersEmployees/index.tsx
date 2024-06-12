import React, { useEffect, useState } from "react";
import { Modal, View } from "react-native";

import { Gets, Models } from "api/index";
import { useForm } from "react-hook-form";

import Input from "components/Input";
import Spacer from "components/Spacer";
import Loading from "components/Loading";
import SelectInput from "components/SelectInput";

import { useMe } from "providers/user";

import { useTheme } from "styled-components/native";
import Title from "../Title";

interface Props {
  showModal: boolean;
  filter: Models.EmployeeListFilters;
  setFilter: (filter: Models.EmployeeListFilters) => void;
  closeModal?: () => void;
}

const ModalFiltersEmployees: React.FC<Props> = ({
  showModal,
  filter,
  setFilter,
  closeModal,
}) => {
  const theme = useTheme();
  const me = useMe();
  const [employeeLevels, setEmployeeLevels] = useState<Models.EmployeeLevel[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  const getEmployeeLevels = async () => {
    try {
      setLoading(true);
      const res = await Gets.listEmployeeLevels(
        me.user!.token,
        me.user!.idCompany
      );
      if (res) {
        setEmployeeLevels(res);
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

  const form = useForm<Models.EmployeeLevel>();

  const employeeLevel = form.watch();
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
              label="Nome"
              value={filter.name}
              onChangeText={(name) => setFilter({ ...filter, name })}
            />
            <Spacer height={6} />
            <SelectInput
              label="Tipo Usuário"
              value={employeeLevel?.description}
              items={employeeLevels}
              keyOfLabel="description"
              keyOfValue="id"
              onValueChange={(v) => {
                if (v) {
                  form.setValue("id", v.id);
                  form.setValue("description", v.description);
                  setFilter({ ...filter, levelId: v.id });
                }
              }}
              placeholder="Selecione uma opção..."
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalFiltersEmployees;
