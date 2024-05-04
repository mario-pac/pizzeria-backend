import React, { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";

import EmployeeCard from "components/Cards/EmployeeCard";

import { ScreenBaseProps } from "utils/index";

import EmployeesHeader from "headers/EmployeesHeader";
import * as S from "./styles";
import Loading from "components/Loading";
import { Gets, Models } from "api/index";
import { useMe } from "providers/user";

const Employees: React.FC<ScreenBaseProps<"Employees">> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const me = useMe()

  const [filter, setFilter] = useState<Models.EmployeeListFilters>({
    id_company: 1,
  });

  const [employees, setEmployees] = useState<Models.Employee[]>([])

  const getEmployees = useCallback(async () => {
    try {
      setLoading(true)
      const response = await Gets.listEmployees(me.user!.token, filter)
      if (response) {
        setEmployees(response)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [filter])

  useEffect(() => {
    getEmployees()
  }, [getEmployees])

  if (loading) {
    return <Loading overlap />
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
