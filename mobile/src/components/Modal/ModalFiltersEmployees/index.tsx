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
              value={employeeLevel?.description}
              items={employeeLevels ?? []}
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
