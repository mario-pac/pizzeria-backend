import React, { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";

import Loading from "components/Loading";
import EmployeeCard from "components/Cards/EmployeeCard";

import { ScreenBaseProps } from "utils/index";
import { showToast } from "utils/toast";

import { useMe } from "providers/user";
import { useConfigs } from "providers/config";

import { isAxiosError } from "axios";
import { Gets, Models } from "api/index";

import EmployeesHeader from "headers/EmployeesHeader";
import * as S from "./styles";

const Employees: React.FC<ScreenBaseProps<"Employees">> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const me = useMe();
  const { config } = useConfigs();

  const [filter, setFilter] = useState<Models.EmployeeListFilters>({
    idCompany: config?.company.id ?? 1,
  });

  const [employees, setEmployees] = useState<Models.Employee[]>([]);

  const getEmployees = useCallback(async () => {
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
  }, [filter]);

  useEffect(() => {
    getEmployees();
  }, [getEmployees]);

  if (loading) {
    return <Loading overlap />;
  }

  return (
    <>
      <EmployeesHeader
        onGoBack={navigation.goBack}
        onAdd={() => navigation.navigate("EmployeeForm")}
      />
      <S.Container>
        <FlatList
          data={employees}
          renderItem={({ item }) => (
            <EmployeeCard
              employee={item}
              onPress={() =>
                navigation.navigate("EmployeeForm", { id: item.id })
              }
            />
          )}
          style={{ paddingHorizontal: 24, paddingVertical: 16 }}
        />
      </S.Container>
    </>
  );
};

export default Employees;
