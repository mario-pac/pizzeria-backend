CREATE TABLE
    employees_levels (
        id SMALLINT PRIMARY KEY NOT NULL,
        description VARCHAR(20) NOT NULL
    );

CREATE TABLE
    employees (
        id SERIAL PRIMARY KEY NOT NULL UNIQUE,
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
    orders (
        id SERIAL PRIMARY KEY NOT NULL UNIQUE,
        employee_id SERIAL REFERENCES employees(id),
        table_number SERIAL NOT NULL,
        customer_name VARCHAR(255) NOT NULL,
        total_value DECIMAL(10, 2) NOT NULL,
        payment_method VARCHAR(50) NOT NULL,
        id_status VARCHAR(50) NOT NULL,
        note TEXT NULL,
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
        description VARCHAR(24) NOT NULL,
     );


CREATE TABLE
    order_items (
        id SERIAL PRIMARY KEY NOT NULL UNIQUE,
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
        company_name VARCHAR(255) NOT NULL
    );

INSERT INTO employees_levels (id, description) VALUES
(1, 'Chef'),
(2, 'Waiter'),
(3, 'Manager');

INSERT INTO products (id, description, price, category) VALUES 
(1, 'Pizza de Margueritta', 12.99, 'Pizza');

INSERT INTO status (id, description, type) VALUES 
(1, 'Pedido anotado', 'order_item'),
(2, 'Em preparo', 'order_item'),
(3, 'Pronto para retirar', 'order_item'),
(4, 'Pedido em andamento', 'order'),
(5, 'Aguardando pagamento', 'order'),
(6, 'Pedido finalizado', 'order');


INSERT INTO settings (id, number_of_tables, company_name) VALUES 
(1, 10, 'Pizzaria Preço Baixo');
