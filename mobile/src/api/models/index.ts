export interface Company {
    id: number;
    company_name: string;
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
    level_id?: number;
    created_at?: Date;
    updated_at?: Date;
    id_company: number;
}

export interface OrderItem {
    Id: number;
    OrderId?: number;
    ProductId?: number;
    Quantity: number;
    IdStatus: number;
    CreatedAt?: Date;
    UpdatedAt?: Date;
}

export interface Order {
    id: number;
    employee_id?: number;
    table_number: number;
    customer_name: string;
    total_value: number;
    payment_method: string;
    id_status: number;
    note?: string;
    created_at?: Date;
    updated_at?: Date;
    id_company: number;
}

export interface Product {
    id: number;
    description: string;
    price: number;
    category: "Pizza" | "Drink";
    created_at?: Date;
    updated_at?: Date;
    id_company: number;
}

export interface Settings {
    Id: number;
    NumberOfTables: number;
    IdCompany: number;
}

export interface Status {
    Id: number;
    Description: string;
    Type: string;
}

//RESPONSES

export interface LoginResponse {
    id: number;
    name: string;
    level_id: number;
    token: string;

}

//FILTERS

export interface EmployeeListFilters {
    name?: string
    level_id?: number
    id_company: number
}

export interface ProductListFilters {
    description?: string
    category?: string
    id_company: number
}

export interface OrderListFilters {
    employee_id?: number
    customer_name?: string
    id_status?: number
    created_at_init?: Date
    created_at_final?: Date
    id_company: number
}