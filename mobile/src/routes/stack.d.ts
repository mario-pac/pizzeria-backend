import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Desks: undefined | { newDesk?: boolean };
  EmployeeForm: { id?: number } | undefined;
  Employees: undefined;
  FinishOrder: undefined;
  Home: undefined;
  HomeSetting: undefined;
  ItemList: undefined;
  Login: undefined;
  Menu: undefined;
  Order:
    | { id?: number; tableNumber?: number; customerName?: string }
    | undefined;
  Orders: undefined;
  ProductForm: { id?: number; notToList?: boolean } | undefined;
  Products: { notToList?: boolean } | undefined;
  Settings: undefined;
};

export type AppNavigationProps = NativeStackNavigationProp<RootStackParamList>;
