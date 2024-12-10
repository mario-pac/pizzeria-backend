import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";

import Icon from "components/Icon";
import Button from "components/Button";
import Loading from "components/Loading";
import EmployeeCard from "components/Cards/EmployeeCard";
import ModalFiltersEmployees from "components/Modal/ModalFiltersEmployees";

import { ScreenBaseProps } from "utils/index";
import { showToast } from "utils/toast";

import { useMe } from "providers/user";
import { useConfigs } from "providers/config";

import { isAxiosError } from "axios";
import { Gets, Models } from "api/index";

import { useTheme } from "styled-components/native";
import * as S from "./styles";
import EmployeeHeader from "headers/EmployeeHeader";
import EmployeesHeader from "headers/EmployeesHeader";

const Employees: React.FC<ScreenBaseProps<"Employees">> = ({ navigation }) => {
  const theme = useTheme();

  const [loading, setLoading] = useState(false);

  const me = useMe();
  const { config } = useConfigs();

  const [filter, setFilter] = useState<Models.EmployeeListFilters>({
    idCompany: config?.company.id ?? 1,
    levelId: undefined,
    name: "",
  });

  const [employees, setEmployees] = useState<Models.Employee[]>([]);
  const [employeeLevels, setEmployeeLevels] = useState<Models.EmployeeLevel[]>(
    []
  );
  const [showModal, setShowModal] = useState(false);

  const getEmployees = async () => {
    try {
      setLoading(true);
      const response = await Gets.listEmployees(me.user!.token, filter);
      if (response) {
        setEmployees(response);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        showToast("error", error.response?.data);
      }
    } finally {
      setLoading(false);
    }
  };

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
    getEmployees();
    getEmployeeLevels();
  }, [filter]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Icon
            type="antdesign"
            name="plus"
            size={30}
            onPress={() => navigation.navigate("EmployeeForm")}
            right={false}
            color={theme.colors.text.primary}
          />
        );
      },
    });
  }, [navigation]);

  return (
    <S.Container>
      <EmployeesHeader
        onGoBack={navigation.goBack}
        onAdd={() => navigation.navigate("EmployeeForm")}
      />
      <ModalFiltersEmployees
        filter={filter}
        setFilter={setFilter}
        showModal={showModal}
        employeeLevels={employeeLevels}
        closeModal={() => setShowModal(false)}
      />
      {loading ? (
        <Loading />
      ) : (
        <FlatList<Models.Employee>
          data={employees}
          ListHeaderComponent={
            <Button value="Ver filtros" onPress={() => setShowModal(true)} />
          }
          renderItem={({ item }) => (
            <EmployeeCard
              employee={item}
              onPress={() =>
                navigation.navigate("EmployeeForm", { id: item.id })
              }
            />
          )}
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingVertical: 16,
            gap: 16,
          }}
        />
      )}
    </S.Container>
  );
};

export default Employees;
