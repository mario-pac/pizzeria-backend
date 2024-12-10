import React from "react";
import { Modal, View } from "react-native";

import { Models } from "api/index";
import { useForm } from "react-hook-form";

import Input from "components/Input";
import Spacer from "components/Spacer";
import SelectInput from "components/SelectInput";

import { useTheme } from "styled-components/native";
import Title from "../Title";

interface Props {
  showModal: boolean;
  filter: Models.EmployeeListFilters;
  setFilter: (filter: Models.EmployeeListFilters) => void;
  employeeLevels?: Models.EmployeeLevel[];
  closeModal?: () => void;
}

const ModalFiltersEmployees: React.FC<Props> = ({
  showModal,
  filter,
  setFilter,
  closeModal,
  employeeLevels,
}) => {
  const theme = useTheme();

  const form = useForm<Models.EmployeeLevel>({
    defaultValues: employeeLevels?.find((el) => el.id === filter.levelId),
  });

  const employeeLevel = form.watch();

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
              label="Nome"
              value={filter.name}
              onChangeText={(name) => setFilter({ ...filter, name })}
            />
            <Spacer height={6} />
            <SelectInput
              label="Tipo Usuário"
              value={
                employeeLevels?.find(
                  (el) => el.description === employeeLevel?.description
                )?.description ?? undefined
              }
              items={employeeLevels ?? []}
              keyOfLabel="description"
              keyOfValue="id"
              onValueChange={(v) => {
                if (v) {
                  form.setValue("id", v);
                  form.setValue("description", v);
                  setFilter({ ...filter, levelId: v });
                }
                form.setValue("id", 0);
                form.setValue("description", "");
                setFilter({ ...filter, levelId: undefined });
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
