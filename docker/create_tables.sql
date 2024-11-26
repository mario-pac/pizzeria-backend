CREATE TABLE
    companies (
        id SMALLINT PRIMARY KEY NOT NULL,
        company_name VARCHAR(255) NOT NULL,
        cnpj VARCHAR(255) NOT NULL
    );

CREATE TABLE
    employees_levels (
        id SMALLINT PRIMARY KEY NOT NULL,
        description VARCHAR(20) NOT NULL,
        id_company SMALLINT REFERENCES companies (id) NOT NULL
    );

CREATE TABLE
    employees (
        id SERIAL PRIMARY KEY NOT NULL UNIQUE,
        id_company SMALLINT REFERENCES companies (id) NOT NULL,
        name VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        level_id INT REFERENCES employees_levels(id),
        created_at TIMESTAMP
        WITH
            TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP
        WITH
            TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    products (
        id SERIAL PRIMARY KEY NOT NULL UNIQUE,
        id_company SMALLINT REFERENCES companies (id) NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        category VARCHAR(255) NOT NULL,
        created_at TIMESTAMP
        WITH
            TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP
        WITH
            TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
     status (
        id SMALLINT PRIMARY KEY NOT NULL,
        description VARCHAR(24) NOT NULL
     );

CREATE TABLE
    orders (
        id SERIAL PRIMARY KEY NOT NULL UNIQUE,
        id_company SMALLINT REFERENCES companies (id) NOT NULL,
        employee_id SERIAL REFERENCES employees(id),
        table_number SERIAL NOT NULL,
        customer_name VARCHAR(255) NOT NULL,
        total_value DECIMAL(10, 2) NOT NULL,
        payment_method VARCHAR(50) NOT NULL,
        id_status SMALLINT DEFAULT 1 REFERENCES status(id),
        note TEXT NULL,
        created_at TIMESTAMP
        WITH
            TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP
        WITH
            TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    order_items (
        id SERIAL PRIMARY KEY NOT NULL UNIQUE,
        position SMALLINT NOT NULL,
        order_id SERIAL REFERENCES orders(id) NOT NULL,
        product_id SERIAL REFERENCES products(id) NOT NULL,
        quantity SERIAL NOT NULL,
        id_order_status SMALLINT DEFAULT 1 REFERENCES status(id),
        created_at TIMESTAMP
        WITH
            TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP
        WITH
            TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    settings (
        id SMALLINT PRIMARY KEY NOT NULL,
        number_of_tables SERIAL NOT NULL,
        id_company SMALLINT REFERENCES companies (id) NOT NULL
    );



INSERT INTO companies (id, company_name, cnpj) VALUES
(1, 'Pizzaria Zé & Zé', '88.999.888/0001-99');

INSERT INTO employees_levels (id, description, id_company) VALUES
(1, 'Chef', 1),
(2, 'Waiter', 1),
(3, 'Manager', 1);

INSERT INTO products (id, description, price, category, id_company) VALUES 
(1, 'Pizza de Margueritta', 42.99, 'Pizza G', 1),
(2, 'Pizza de Calabresa', 46.49, 'Pizza G', 1),
(3, 'Pizza de 4 Queijos', 50.89, 'Pizza G', 1),
(4, 'Coca Cola 2L', 12.39, 'Bebidas', 1),
(5, 'Cerveja Heineken 600ml', 6.90, 'Bebidas', 1),
(6, 'Vinho Tinto Seco Casillera del Diablo', 34.59, 'Bebidas', 1);

INSERT INTO status (id, description) VALUES 
(1, 'Pedido anotado'),
(2, 'Em preparo'),
(3, 'Pronto para retirar'),
(4, 'Pedido em andamento'),
(5, 'Aguardando pagamento'),
(6, 'Finalizado');

INSERT INTO settings (id, number_of_tables, id_company) VALUES 
(1, 10, 1);
