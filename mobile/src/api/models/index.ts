export interface Company {
  id: number;
  companyName: string;
  cnpj: string;
}

export interface EmployeeLevel {
  id: number;
  description?: string;
}

export interface Employee {
  id: number;
  name: string;
  username: string;
  password: string;
  levelId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  idCompany: number;
}

export interface EmployeeResponse {
  self: Employee;
  employeeLevel?: EmployeeLevel;
}

export interface OrderItem {
  id: number;
  orderId?: number;
  productId?: number;
  quantity: number;
  position: number;
  idOrderStatus: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface OrderItemResponse {
  self: OrderItem;
  status?: Status;
  description: string;
}

export interface Order {
  id: number;
  employeeId?: number;
  tableNumber: number;
  customerName: string;
  totalValue: number;
  paymentMethod: string;
  idStatus: number;
  note?: string;
  createdAt?: Date;
  updatedAt?: Date;
  idCompany: number;
}

export interface OrderResponse {
  self: Order;
  orderItems?: OrderItemResponse[];
  status?: Status;
  itemsDeleted?: number[];
  employeeName: string;
}

export interface Product {
  id: number;
  description: string;
  price: number;
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
  idCompany: number;
}

export interface Settings {
  id: number;
  numberOfTables: number;
  idCompany: number;
}

export interface Status {
  id: number;
  description: string;
  type: string;
}

//RESPONSES

export interface LoginResponse {
  id: number;
  name: string;
  levelId: number;
  token: string;
}

//FILTERS

export interface EmployeeListFilters {
  name?: string;
  levelId?: number;
  idCompany: number;
}

export interface ProductListFilters {
  description?: string;
  category?: string;
  idCompany: number;
}

export interface OrderListFilters {
  employeeId?: number;
  customerName?: string;
  idStatus?: number;
  createdAtInit?: Date;
  createdAtFinal?: Date;
  idCompany: number;
}
